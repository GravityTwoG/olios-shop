import {IProduct} from "./types";
import {createEffect, createEvent, createStore} from "effector";
import {fetchProduct} from "../api";

const emptyProduct: IProduct = {
    id: 0,
    name: 'Product name',
    desc: 'Product description',
    price: 0,
    lastPrice: 0,
    imgUrl: 'https://via.placeholder.com/200',
    imgSize: '200'
}

export const $product = createStore<IProduct>(emptyProduct);

export const setProduct = createEvent<IProduct>('set products');

export const fetchProductFx = createEffect<void, IProduct>(async () => {
    return fetchProduct();
});
fetchProductFx.done.watch(({result}) => {
    setProduct(result);
})
fetchProductFx.fail.watch(({error, params}) => {
    console.log(error, params);
})

export const $productCategory = createStore<IProduct>(emptyProduct);

export const setProductCategory = createEvent<IProduct>('set product Category');
