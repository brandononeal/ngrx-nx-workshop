import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CART_FEATURE_KEY, CartState } from './cart.reducer';
import { CartProduct } from '../model/product';

import * as productSelectors from '../product/product.selectors';

const cartFeature = createFeatureSelector<CartState>(CART_FEATURE_KEY);

export const getCartItems = createSelector(
  cartFeature,
  (cartState) => cartState.cartItems
);

export const getCartItemsCount = createSelector(getCartItems, (cartItems) =>
  cartItems
    ? Object.values(cartItems).reduce((acc, quantity) => acc + quantity, 0)
    : 0
);

export const getCartProducts = createSelector(
  getCartItems,
  productSelectors.getProducts,
  (cartItems, products) => {
    if (!cartItems || !products) return undefined;
    return Object.entries(cartItems)
      .map(([productId, quantity]): CartProduct | undefined => {
        const product = products.find((p) => p.id === productId);
        if (!product) return undefined;
        return {
          ...product,
          quantity,
        };
      })
      .filter((cartProduct): cartProduct is CartProduct => !!cartProduct);
  }
);

export const getCartTotal = createSelector(
  getCartProducts,
  (cartProducts) =>
    cartProducts &&
    cartProducts.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    )
);
