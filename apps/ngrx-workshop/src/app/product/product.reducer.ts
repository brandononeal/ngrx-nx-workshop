import { Product } from '@ngrx-nx-workshop/api-interfaces';
import { createReducer, on } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

import * as apiActions from './product.actions';

export interface ProductState {
  products: EntityState<Product>;
}

export const productAdapter: EntityAdapter<Product> = createEntityAdapter({
  selectId: (product: Product) => product.id,
});

const initState: ProductState = {
  products: productAdapter.getInitialState(),
};

export const productsReducer = createReducer(
  initState,
  on(apiActions.productsFetchedSuccess, (state, action) => ({
    ...state,
    products: productAdapter.upsertMany(action.products, state.products),
  })),
  on(apiActions.productsFetchedError, (state) => ({
    ...state,
  })),
  on(apiActions.productFetchedSuccess, (state, { product }) => {
    return {
      ...state,
      products: productAdapter.upsertOne(product, state.products),
    };
  })
);
