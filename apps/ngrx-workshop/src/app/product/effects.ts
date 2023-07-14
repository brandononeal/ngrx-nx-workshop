import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as apiActions from './actions';
import * as productListActions from './product-list/actions';

@Injectable()
export class ProductEffects {
  readonly fetchProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productListActions.productsOpened),
      exhaustMap(() =>
        this.productService.getProducts().pipe(
          map((products) => apiActions.productsFetchedSuccess({ products })),
          catchError(() => of(apiActions.productsFetchedError()))
        )
      )
    );
  });

  readonly handleFetchProductsError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(apiActions.productsFetchedError),
        tap(() => {
          this.snackBar.open('Fetching products failed', 'Error', {
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
    private readonly productService: ProductService,
    private readonly snackBar: MatSnackBar
  ) {}
}
