// From https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob, needed for Safari:
// polyfill
function polyfillToBlob() {
  if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
      value: function (
        callback: (blob: Blob) => void,
        type: string,
        quality: number,
      ) {
        const binStr = atob(
            (this as { toDataURL: (type: string, quality: number) => string })
              .toDataURL(type, quality)
              .split(',')[1],
          ),
          len = binStr.length,
          arr = new Uint8Array(len);

        for (let i = 0; i < len; i++) {
          arr[i] = binStr.charCodeAt(i);
        }

        callback(new Blob([arr], { type: type || 'image/png' }));
      },
    });
  }

  window.URL = window.URL || window.webkitURL;
}

// Modified from https://stackoverflow.com/a/32490603, cc by-sa 3.0
// -2 = not jpeg, -1 = no data, 1..8 = orientations
function getExifOrientation(file: File, callback: (n: number) => void) {
  // Suggestion from http://code.flickr.net/2012/06/01/parsing-exif-client-side-using-javascript-2/:
  let blob: File | Blob | null = null;
  if (file.slice) {
    blob = file.slice(0, 131072);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  } else if (file.webkitSlice) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    blob = (
      file as unknown as {
        webkitSlice: (a: number, b: number) => File | Blob | null;
      }
    ).webkitSlice(0, 131072);
  }

  if (!blob) return;

  const reader = new FileReader();
  reader.onload = function (e: ProgressEvent<FileReader>) {
    const view = new DataView(e.target?.result as ArrayBuffer);
    if (view.getUint16(0, false) != 0xffd8) {
      callback(-2);
      return;
    }
    const length = view.byteLength;
    let offset = 2;

    while (offset < length) {
      const marker = view.getUint16(offset, false);
      offset += 2;
      if (marker == 0xffe1) {
        if (view.getUint32((offset += 2), false) != 0x45786966) {
          callback(-1);
          return;
        }
        const little = view.getUint16((offset += 6), false) == 0x4949;
        offset += view.getUint32(offset + 4, little);
        const tags = view.getUint16(offset, little);
        offset += 2;
        for (let i = 0; i < tags; i++)
          if (view.getUint16(offset + i * 12, little) == 0x0112) {
            callback(view.getUint16(offset + i * 12 + 8, little));
            return;
          }
      } else if ((marker & 0xff00) != 0xff00) break;
      else offset += view.getUint16(offset, false);
    }
    callback(-1);
  };
  reader.readAsArrayBuffer(blob);
}

// Derived from https://stackoverflow.com/a/40867559, cc by-sa
function imgToCanvasWithOrientation(
  img: HTMLImageElement,
  rawWidth: number,
  rawHeight: number,
  orientation: number,
) {
  const canvas = document.createElement('canvas');
  if (orientation > 4) {
    canvas.width = rawHeight;
    canvas.height = rawWidth;
  } else {
    canvas.width = rawWidth;
    canvas.height = rawHeight;
  }

  if (orientation > 1) {
    console.log('EXIF orientation = ' + orientation + ', rotating picture');
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }

  switch (orientation) {
    case 2:
      ctx.transform(-1, 0, 0, 1, rawWidth, 0);
      break;
    case 3:
      ctx.transform(-1, 0, 0, -1, rawWidth, rawHeight);
      break;
    case 4:
      ctx.transform(1, 0, 0, -1, 0, rawHeight);
      break;
    case 5:
      ctx.transform(0, 1, 1, 0, 0, 0);
      break;
    case 6:
      ctx.transform(0, 1, -1, 0, rawHeight, 0);
      break;
    case 7:
      ctx.transform(0, -1, -1, 0, rawHeight, rawWidth);
      break;
    case 8:
      ctx.transform(0, -1, 1, 0, 0, rawWidth);
      break;
  }
  ctx.drawImage(img, 0, 0, rawWidth, rawHeight);
  return canvas;
}

export function reduceFileSize(
  file: File,
  maxFileSize: number,
  maxWidth: number,
  maxHeight: number,
  quality: number,
) {
  return new Promise<Blob>((resolve, reject) => {
    if (file.size <= maxFileSize) {
      resolve(file);
      return;
    }

    polyfillToBlob();

    const img = new Image();

    img.onerror = function () {
      URL.revokeObjectURL(this.src);
      reject('');
    };
    img.onload = function () {
      URL.revokeObjectURL((this as unknown as { src: string }).src);

      getExifOrientation(file, function (orientation: number) {
        let w = img.width,
          h = img.height;
        const scale =
          orientation > 4
            ? Math.min(maxHeight / w, maxWidth / h, 1)
            : Math.min(maxWidth / w, maxHeight / h, 1);
        h = Math.round(h * scale);
        w = Math.round(w * scale);

        const canvas = imgToCanvasWithOrientation(img, w, h, orientation);

        if (!canvas) {
          return;
        }

        canvas.toBlob(
          function (blob) {
            if (blob) {
              console.log(
                'Resized image to ' +
                  w +
                  'x' +
                  h +
                  ', ' +
                  (blob.size >> 10) +
                  'kB',
              );
              resolve(blob);
            } else {
              reject('');
            }
          },
          'image/jpeg',
          quality,
        );
      });
    };
    img.src = URL.createObjectURL(file);
  });
}
