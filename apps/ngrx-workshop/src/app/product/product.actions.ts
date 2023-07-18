import { BasicProduct, Product } from '@ngrx-nx-workshop/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const productsFetchedSuccess = createAction(
  '[Product API] Products fetched success',
  props<{ products: BasicProduct[] }>()
);

export const productsFetchedError = createAction(
  '[Product API] Products fetched error',
  props<{ errorMessage: string }>()
);

export const productFetchedSuccess = createAction(
  '[Product API] Product fetched success',
  props<{ product: Product }>()
);

export const productFetchedError = createAction(
  '[Product API] Product fetched error',
  props<{ errorMessage: string }>()
);
