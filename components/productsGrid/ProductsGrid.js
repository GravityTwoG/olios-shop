import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './products-grid.module.sass';

function ProductsGrid(props) {
  return (
    <TransitionGroup className="products-grid">
      {props.children &&
        props.children.map((item) => {
          return (
            <CSSTransition key={item.key} classNames="grid-item" timeout={300}>
              {item}
            </CSSTransition>
          );
        })}
    </TransitionGroup>
  );
}

export default ProductsGrid;
