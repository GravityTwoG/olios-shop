import toastlib, { Toaster } from 'react-hot-toast';

export const AppToaster = () => (
  <Toaster
    position="top-center"
    toastOptions={{
      duration: 3000000,
      style: {
        minWidth: '120px',
        padding: '8px 12px',
        borderRadius: '16px',
        boxShadow: '0px 5px 30px 0px rgba(219, 219, 219, 0.6)',
      },
    }}
  />
);

type Renderable = JSX.Element | string | null;
type ToastId = string;

export const toast = {
  loading: (message: Renderable, toastId?: ToastId) =>
    toastlib.loading(() => message, { id: toastId }),

  error: (message: Renderable, toastId?: ToastId) =>
    toastlib.error(() => message, { id: toastId }),

  success: (message: Renderable, toastId?: ToastId) =>
    toastlib.success(() => message, { id: toastId }),

  promise: function <T>(
    promise: Promise<T>,
    {
      toastId,
      ...options
    }: {
      loading: Renderable;
      error: Renderable;
      success: Renderable;
      toastId?: ToastId;
    },
  ) {
    return toastlib.promise(promise, options, { id: toastId });
  },

  hide: (toastId: ToastId) => toastlib.dismiss(toastId),
};
