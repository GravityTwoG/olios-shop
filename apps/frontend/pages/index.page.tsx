import React from 'react';
import classes from './index.module.scss';

import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

import { allSettled, fork, serialize } from 'effector';
import { useUnit } from 'effector-react';
import {
  $categoryId,
  $isPending,
  $pageNumber,
  $pageSize,
  $products,
  $productsCount,
  $searchQuery,
  loadPage,
  pageStarted,
  searchQueryChanged,
} from './index.model';

import { Container } from '@/src/ui/atoms/Container';
import { Paginator } from '@/src/ui/molecules/Paginator';
import { Preloader } from '@/src/ui/molecules/Preloader';
import { MetaTags } from '@/src/shared/components/MetaTags';
import { ProductsGrid } from '@/src/features/Product/components/molecules/productsGrid/ProductsGrid';
import { ProductCard } from '@/src/features/Product/components/molecules/productCard/ProductCard';
import { ProductCategoriesTree } from '@/src/features/ProductCategory/components/organisms/ProductCategoriesTree';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const scope = fork();

  await allSettled(pageStarted, {
    scope,
    params: Number(ctx.query.categoryId),
  });

  return {
    props: {
      values: serialize(scope),
    },
  };
};

export function HomePage() {
  const [
    products,
    productsCount,
    pageSize,
    pageNumber,
    isPending,
    searchQuery,
    categoryId,
  ] = useUnit([
    $products,
    $productsCount,
    $pageSize,
    $pageNumber,
    $isPending,
    $searchQuery,
    $categoryId,
  ]);

  const [searchQueryChangedEvent, loadPageEvent] = useUnit([
    searchQueryChanged,
    loadPage,
  ]);

  const router = useRouter();

  return (
    <div className={classes['MainPage']}>
      <MetaTags title="Home" />

      <Container>
        <section className={classes.HeroSection}>
          <div className={classes['main-text-title']}>OLIOS</div>
          <div className={classes['main-text-subtitle']}>
            NEWEST FURNITURE SHOP
          </div>
        </section>
      </Container>

      <Container className={classes['products']}>
        <div className={classes['products__header']}>
          <div className={classes['products__title']}>Products</div>
        </div>
        <form
          className={classes.SearchForm}
          onSubmit={(e) => {
            e.preventDefault();
            searchQueryChanged(searchQuery);
          }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => searchQueryChangedEvent(e.target.value)}
            placeholder="Type product that you are looking for!"
          />
          <div className={classes.Underline} />

          <button
            className={classes.ResetButton}
            onClick={() => searchQueryChangedEvent('')}
            title="Clear"
            aria-label="Clear"
          />
          <button
            className={classes.SearchButton}
            type="submit"
            title="Search"
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
            >
              <path
                id="Search"
                className="cls-1"
                d="M76,457a11.985,11.985,0,0,0-9.471,19.349l-10.09,10.09a1.5,1.5,0,1,0,2.121,2.121l10.09-10.089A12,12,0,1,0,76,457Zm0,21a9,9,0,1,1,9-9A9.01,9.01,0,0,1,76,478Z"
                transform="translate(-56 -457)"
              />
            </svg>
          </button>
        </form>

        <ProductCategoriesTree
          onCategorySelect={(categoryId) => {
            if (categoryId === null) {
              router.replace('/');
            } else {
              router.replace(`/?categoryId=${categoryId || 'null'}`);
            }
          }}
          selectedCategoryId={categoryId || null}
        />

        <Preloader isLoading={isPending}>
          <ProductsGrid>
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </ProductsGrid>
        </Preloader>

        {pageNumber + 1 < Math.ceil(productsCount / pageSize) && (
          <button
            className={classes['more-products']}
            onClick={() => loadPageEvent(pageNumber + 1)}
          >
            Show more products
          </button>
        )}

        <Paginator
          pageSize={pageSize}
          currentPage={pageNumber}
          count={productsCount}
          onPageSelect={loadPageEvent}
        />
      </Container>
    </div>
  );
}

export default HomePage;
