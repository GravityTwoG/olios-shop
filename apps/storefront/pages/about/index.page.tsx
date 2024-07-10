import React from 'react';

import { Container } from '@olios-shop/ui/atoms/Container';
import { H1, H2 } from '@olios-shop/ui/atoms/Typography';
import { MetaTags } from '@olios-shop/storefront/shared/components/MetaTags';

export default function AboutPage() {
  return (
    <Container className="my-20">
      <MetaTags title="About" />

      <H1>About</H1>

      <H2>Design</H2>
      <p>
        Template from <a>www.symu.co</a>
      </p>

      <H2>Backend</H2>
      <p>TypeScript</p>
      <p>Nest.js</p>
      <p>Prisma ORM</p>
      <p>PostreSQL, Redis</p>
      <p>S3 Compatible Object Storage (Minio)</p>

      <H2>Storefront</H2>
      <p>TypeScript</p>
      <p>Next.js, React, react-hook-form</p>
      <p>Tailwind.css, scss modules</p>
      <p>Effector, patronum</p>
      <p>Axios, zod</p>
    </Container>
  );
}
