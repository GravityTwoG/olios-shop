import {createEffect, createEvent, createStore} from "effector";
import {IProduct} from "./types";
import {fetchProducts} from "../api";

const PAGE_SIZE = 24;

export const $products = createStore<IProduct[]>([]);

export const setProducts = createEvent<IProduct[]>('set products');

export const fetchProductsFx = createEffect<void, IProduct[]>(async () => {
    return fetchProducts();
});
fetchProductsFx.done.watch(({result}) => {
    setProducts(result);
})
fetchProductsFx.fail.watch(({error, params}) => {
    console.log(error, params);
})

$products.on(setProducts, (_, payload) => payload);


export const $pageSize = createStore<number>(PAGE_SIZE);

export const setPageSize = createEvent<number>('set page size');

$pageSize.on(setPageSize, (_, payload) => payload);


export const $productsCategory = createStore<string>('');

export const setCategory = createEvent<string>('set Category');

$productsCategory.on(setCategory, (_, payload) => payload);

