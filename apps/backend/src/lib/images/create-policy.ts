export const createPolicy = (bucketName: string) => {
  const policy = {
    Version: '2012-10-17',
    Statement: [
      {
        Sid: `${bucketName}-1`,
        Effect: 'Allow',
        Principal: {
          AWS: '*',
        },
        Action: [
          's3:GetBucketLocation',
          // 's3:PutBucketAcl',
          // 's3:ListBuckets',
          's3:PutObject',
          's3:AbortMultipartUpload',
          's3:DeleteObject',
          's3:GetObject',
        ],
        Resource: [
          `arn:aws:s3:::${bucketName}`,
          `arn:aws:s3:::${bucketName}/*`,
        ],
      },
    ],
  };

  return policy;
};
