import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CART_FEATURE_KEY, CartState } from './cart.reducer';

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
