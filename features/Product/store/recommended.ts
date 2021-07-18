import {createEffect, createEvent, createStore} from "effector";
import {IProduct} from "./types";
import {fetchRecommendedProducts} from "../api";

export const $recommendedProducts = createStore<IProduct[]>([]);

export const setRecommendedProducts = createEvent<IProduct[]>('set products');

export const fetchRecommendedProductsFx = createEffect<void, IProduct[]>(async () => {
    return fetchRecommendedProducts();
});
fetchRecommendedProductsFx.done.watch(({result}) => {
    setRecommendedProducts(result);
})
fetchRecommendedProductsFx.fail.watch(({error, params}) => {
    console.log(error, params);
})

$recommendedProducts.on(setRecommendedProducts, (_, payload) => payload);
