import { Product } from '@ngrx-nx-workshop/api-interfaces';
import { createReducer, on } from '@ngrx/store';

import * as apiActions from './product.actions';

export interface ProductState {
  products?: Product[];
}

const initState: ProductState = {
  products: undefined,
};

export const productsReducer = createReducer(
  initState,
  on(apiActions.productsFetchedSuccess, (state, { products }) => ({
    ...state,
    products: [...products],
  })),
  on(apiActions.productsFetchedError, (state) => ({
    ...state,
    products: [],
  })),
  on(apiActions.productFetchedSuccess, (state, { product }) => {
    const productsClone = state.products ? [...state.products] : [];
    const indexOfProduct = productsClone.findIndex((p) => p.id === product.id);
    productsClone.splice(indexOfProduct, 1, product);
    return {
      ...state,
      products: productsClone,
    };
  })
);
