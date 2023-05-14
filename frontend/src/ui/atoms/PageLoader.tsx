import { Spinner } from './Spinner';

export const PageLoader = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <Spinner />
      <p className="text-xl">Loading...</p>
    </div>
  );
};
