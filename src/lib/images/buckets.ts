export const buckets = ['product-categories', 'product-images'] as const;

export type BucketName = (typeof buckets)[number];
