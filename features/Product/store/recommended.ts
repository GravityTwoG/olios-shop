import {createEffect, createEvent, createStore} from "effector";
import {IProduct} from "./types";
import {fetchRecommendedProducts} from "../api";

export const $recommendedProducts = createStore<IProduct[]>([]);

export const setRecommendedProducts = createEvent<IProduct[]>('set recommended products');

export const fetchRecommendedProductsFx = createEffect<string, IProduct[]>(async (productCategory) => {
    return fetchRecommendedProducts();
});
fetchRecommendedProductsFx.done.watch(({result}) => {
    setRecommendedProducts(result);
})
fetchRecommendedProductsFx.fail.watch(({error, params}) => {
    console.log(error, params);
})

$recommendedProducts.on(setRecommendedProducts, (_, payload) => payload);
