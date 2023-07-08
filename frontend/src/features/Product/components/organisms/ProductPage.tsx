import React from 'react';
import classes from '@/pages/product/product-page.module.sass';

import { CTAButton } from '@/src/ui/atoms/CTAButton';
import Category from '@/src/ui/molecules/Category';
import { ProductCard } from '../molecules/productCard/ProductCard';
import { IProduct } from '../../store';
import { paths } from '@/src/paths';

class ProductPage extends React.Component<{
  product: IProduct;
  categoryIcon: string;
  recommendedProducts: IProduct[];
  inCart: boolean;
}> {
  quantity = React.createRef<HTMLInputElement>();

  addToCart = () => {
    // this.props.addToCart(this.props.productId, this.quantity.current.value);
  };

  renderButton = () => {
    if (this.props.inCart) {
      return (
        <CTAButton color="secondary" onClick={this.addToCart}>
          In cart
        </CTAButton>
      );
    }

    return (
      <CTAButton color="primary" onClick={this.addToCart}>
        Add to cart
      </CTAButton>
    );
  };

  getLastPrice = () => {
    if (this.props.product.oldPrice !== this.props.product.realPrice) {
      return (
        <span className={classes['product__price-prev']}>
          {this.props.product.oldPrice}
        </span>
      );
    }
  };

  renderRecomendedProducts = () => {
    return this.props.recommendedProducts.map((product) => {
      return <ProductCard product={product} key={product.id} />;
    });
  };

  render() {
    return (
      <div className={classes['product']}>
        <div className={classes['product__preview']}>
          <img src={this.props.product.thumbUrl} alt="" />
          <div className={classes['product__preview-like']}>
            <span>409</span> ❤
          </div>
          <div className={classes['product__preview-arrows']}>
            <button>prev</button>
            <button>next</button>
          </div>
        </div>
        <div className={classes['product__right']}>
          <div className={classes['product__right-inner']}>
            <div className={classes['product__header']}>
              <Category
                name={this.props.product.categoryName}
                href={
                  paths.products({}) +
                  '?categoryId=' +
                  this.props.product.categoryId
                }
              >
                <img src={this.props.categoryIcon} alt="" />
              </Category>
            </div>
            <div className={classes['product__info']}>
              <div className={classes['product__name']}>
                {this.props.product.name}
              </div>
              <div className={classes['product__desc']}>
                {this.props.product.description}
              </div>
              <div className={classes['product__line']}>
                <div className={classes['product__price']}>
                  <div className={classes['product__price-label']}>Cost</div>
                  <span>
                    <span className={classes['product__price-curr']}>
                      {this.props.product.realPrice}
                    </span>
                    {this.getLastPrice()}
                  </span>
                </div>
                <div className={classes['product__quantity']}>
                  <div className={classes['product__quantity-label']}>
                    Quantity
                  </div>
                  <input
                    className={classes['product__quantity-input']}
                    ref={this.quantity}
                    type="number"
                    defaultValue="1"
                  />
                </div>
                {this.renderButton()}
              </div>
            </div>
          </div>
          <div className={classes['product__recomended']}>
            <div className={classes['product__recomended-title']}>
              Recomended
            </div>
            <div className={classes['product__recomended-cont']}>
              {this.renderRecomendedProducts()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductPage;
