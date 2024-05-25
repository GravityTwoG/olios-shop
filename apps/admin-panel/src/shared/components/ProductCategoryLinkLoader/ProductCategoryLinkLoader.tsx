import { ProductCategoryLink } from '../ProductCategoryLink';
import { ProductCategoryLinkSkeleton } from './ProductCategoryLinkSkeleton';
import { useProductCategory } from './useProductCategory';

export type ProductCategoryLinkLoaderProps = {
  categoryId: number | null;
};

export const ProductCategoryLinkLoader = (
  props: ProductCategoryLinkLoaderProps,
) => {
  const productCategory = useProductCategory(props.categoryId);

  if (!productCategory) {
    return <ProductCategoryLinkSkeleton />;
  }

  return <ProductCategoryLink category={productCategory} />;
};
