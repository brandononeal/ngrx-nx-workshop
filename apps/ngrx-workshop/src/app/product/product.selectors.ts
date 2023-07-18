import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';
import { productAdapter } from './product.reducer';

import * as routerSelectors from '../router/router.selectors';

const productFeatureSelector = createFeatureSelector<ProductState>('product');

/**
 * Selects current product id
 */
export const getCurrentProductId = routerSelectors.getRouterParams('productId');

const { selectAll, selectEntities } = productAdapter.getSelectors();

const getProductsEntityState = createSelector(
  productFeatureSelector,
  (productState) => productState.products
);

/**
 * Selector for products data
 */
export const getProducts = createSelector(getProductsEntityState, selectAll);

const getProductsDictionary = createSelector(
  getProductsEntityState,
  selectEntities
);

export const getCurrentProduct = createSelector(
  getProductsDictionary,
  getCurrentProductId,
  (productDictionary, id) => {
    if (id == null) return undefined;
    return productDictionary[id];
  }
);
