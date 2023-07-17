import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, defer, map, of, switchMap, timer } from 'rxjs';
import { CartService } from './cart.service';

import * as actions from './cart.actions';
import * as cartDetailsActions from './cart-details/cart-details.actions';

const REFRESH_CART_ITEMS_INTERVAL_MS = 20_000;

@Injectable()
export class CartEffects {
  readonly fetchCartItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        actions.timerTick,
        cartDetailsActions.cartDetailsOpened,
        cartDetailsActions.purchaseSuccess
      ),
      switchMap(() =>
        this.cartService.getCartProducts().pipe(
          map((cartItems) => actions.fetchCartItemsSuccess({ cartItems })),
          catchError(() =>
            of(
              actions.fetchCartItemsError({
                errorMessage: 'Fetching cart items failed',
              })
            )
          )
        )
      )
    );
  });

  readonly init$ = createEffect(() => {
    return defer(() =>
      timer(0, REFRESH_CART_ITEMS_INTERVAL_MS).pipe(
        map(() => actions.timerTick())
      )
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly cartService: CartService
  ) {}
}
