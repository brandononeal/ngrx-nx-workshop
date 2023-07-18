import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';

import * as productApiActions from './product/product.actions';
import * as cartApiActions from './cart/cart.actions';

@Injectable()
export class ErrorEffects {
  readonly handleFetchProductsError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          productApiActions.productsFetchedError,
          productApiActions.productFetchedError,
          cartApiActions.fetchCartItemsError,
          cartApiActions.addToCartError
        ),
        tap(({ errorMessage }) => {
          this.snackBar.open(errorMessage, 'Error', {
            duration: 2500,
          });
        })
      );
    },
    {
      dispatch: false,
    }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly snackBar: MatSnackBar
  ) {}
}
