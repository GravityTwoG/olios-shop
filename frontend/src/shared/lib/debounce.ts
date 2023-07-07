type Callback = (...args: any[]) => void;

export function debounce<T extends Callback>(cb: T, wait = 20): T {
  let h: number = 0;
  const debounced = (...args: any[]) => {
    clearTimeout(h);
    h = window.setTimeout(() => cb(...args), wait);
  };

  return debounced as T;
}
