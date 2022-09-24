export const buckets = ['product-categories'] as const;

export type BucketName = typeof buckets[number];
