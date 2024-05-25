import Head from 'next/head';

import { useRouter } from 'next/router';
import { getURL } from '../lib/getURL';
import { toDollars } from '@olios-shop/ui/atoms/MonetaryValue';

export type MetaTagsProps = {
  title: string;
  description?: string;
  imageURL?: string;
  price?: {
    amount: number;
    currency: string;
  };
};

export const MetaTags = (props: MetaTagsProps) => {
  const router = useRouter();

  return (
    <Head>
      <title key="title">Olios Shop | {props.title}</title>
      <meta
        property="og:title"
        content={`Olios Shop | ${props.title}`}
        key="og:title"
      />
      {props.description ? (
        <meta
          name="description"
          property="og:description"
          content={props.description}
          key="og:description"
        />
      ) : (
        <meta
          name="description"
          property="og:description"
          content="Newest furniture shop"
          key="og:description"
        />
      )}
      <meta
        property="og:site_name"
        content="Olios - Newest furniture shop"
        key="og:site_name"
      />
      <meta property="og:locale" content="en_US" key="og:locale" />
      <meta property="og:type" content="og:product" key="og:type" />
      <meta property="og:url" content={getURL(router.asPath)} key="og:url" />
      <meta
        property="og:image"
        content={props.imageURL || '/bg.jpg'}
        key="og:image"
      />
      <meta property="og:image:alt" content={props.title} key="og:image:alt" />
      {props.price ? (
        <>
          <meta
            property="product:price:amount"
            content={toDollars(props.price.amount)}
            key="product:price:amount"
          />
          <meta
            property="product:price:currency"
            content={props.price.currency}
            key="product:price:currency"
          />
        </>
      ) : null}
      <meta property="twitter:card" content="summary" key="twitter:card" />
      <meta
        property="twitter:title"
        content={props.title}
        key="twitter:title"
      />
      <meta
        property="twitter:description"
        content={props.description}
        key="twitter:description"
      />
      <meta
        property="twitter:image"
        content={props.imageURL || '/bg.jpg'}
        key="twitter:image"
      />
      <meta
        property="twitter:image:alt"
        content={props.title}
        key="twitter:image:alt"
      />
    </Head>
  );
};
