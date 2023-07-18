import { CartItem } from '@ngrx-nx-workshop/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const timerTick = createAction('[Cart Effects] Periodic timer tick');

export const fetchCartItemsSuccess = createAction(
  '[Cart API] Fetch items success',
  props<{ cartItems: CartItem[] }>()
);

export const fetchCartItemsError = createAction(
  '[Cart API] Fetch items error',
  props<{ errorMessage: string }>()
);

export const addToCartSuccess = createAction('[Cart API] Add product success');

export const addToCartError = createAction(
  '[Cart API] Add product error',
  props<{ productId: string; errorMessage: string }>()
);