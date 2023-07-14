import { BasicProduct } from '@ngrx-nx-workshop/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const productsFetchedSuccess = createAction(
  '[Product API] Products fetched success',
  props<{ products: BasicProduct[] }>()
);

export const productsFetchedError = createAction(
  '[Product API] Products fetched error'
);
