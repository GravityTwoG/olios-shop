import React from 'react';
import Link from 'next/link';
import classes from './basket.module.sass';

function Basket(props) {
  const renderProducts = () => {
    if (props.products) {
      return props.products.map((product) => {
        return (
          <div className={classes['basket-item']} key={product.productId}>
            <img
              src={product.imgUrl}
              alt={product.name}
              className={classes['basket-item__img']}
            />
            <div className="basket-item__inner">
              <Link
                to={`/product/${product.productId}`}
                className={classes['basket-item__name']}
              >
                {product.name}
              </Link>
              <div className={classes['basket-item__quantity']}>
                Qty: {product.quantity}
              </div>
              <div className={classes['basket-item__price']}>
                {product.price}
              </div>
              <button
                className={classes['basket-item__delete']}
                onClick={() => {
                  props.deleteItem(product.productId);
                }}
              />
            </div>
          </div>
        );
      });
    }
  };

  return (
    <div className={classes['basket-page']}>
      <div className={classes['basket-page__title']}>Basket</div>
      <div className={classes['basket']}>{renderProducts()}</div>
      <div className={classes['order']}/>
    </div>
  );
}

export default Basket;
