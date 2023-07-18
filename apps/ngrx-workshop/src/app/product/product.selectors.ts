import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

import * as routerSelectors from '../router/router.selectors';

const productFeatureSelector = createFeatureSelector<ProductState>('product');

export const getCurrentProductId = routerSelectors.getRouterParams('productId');

/**
 * Selector for products data
 */
export const getProducts = createSelector(
  productFeatureSelector,
  (productState) => productState.products
);

export const getCurrentProduct = createSelector(
  getProducts,
  getCurrentProductId,
  (products, id) => {
    if (id == null || !products) return undefined;
    return products.find((product) => product.id === id);
  }
);
