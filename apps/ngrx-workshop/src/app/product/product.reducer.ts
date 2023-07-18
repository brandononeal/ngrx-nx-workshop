import { Product } from '@ngrx-nx-workshop/api-interfaces';
import { createReducer, on } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

import * as apiActions from './product.actions';
import { CallState, LoadingState } from '../shared/call-state';

export interface ProductState {
  products: EntityState<Product>;
  productsCallState: CallState;
}

export const productAdapter: EntityAdapter<Product> = createEntityAdapter({
  selectId: (product: Product) => product.id,
});

const initState: ProductState = {
  products: productAdapter.getInitialState(),
  productsCallState: LoadingState.INIT,
};

export const productsReducer = createReducer(
  initState,
  on(apiActions.productsFetch, (state) => ({
    ...state,
    productsCallState: LoadingState.LOADING,
  })),
  on(apiActions.productsFetchedSuccess, (state, action) => ({
    ...state,
    productsCallState: LoadingState.LOADED,
    products: productAdapter.upsertMany(action.products, state.products),
  })),
  on(apiActions.productsFetchedError, (state, { errorMessage }) => ({
    ...state,
    productsCallState: { errorMessage },
  })),
  on(apiActions.productFetchedSuccess, (state, { product }) => {
    return {
      ...state,
      products: productAdapter.upsertOne(product, state.products),
    };
  })
);
