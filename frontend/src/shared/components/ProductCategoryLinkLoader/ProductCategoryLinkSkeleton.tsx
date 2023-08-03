import { Skeleton } from '@/src/ui/atoms/Skeleton';

export const ProductCategoryLinkSkeleton = () => {
  return (
    <div className="h-[60px] flex items-center gap-8">
      <Skeleton width={150} height={30} />
      <Skeleton width={50} height={50} />
    </div>
  );
};
