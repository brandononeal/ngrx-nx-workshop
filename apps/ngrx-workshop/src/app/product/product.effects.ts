import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { catchError, exhaustMap, map, of } from 'rxjs';

import * as apiActions from './product.actions';
import * as productListActions from './product-list/product-list.actions';

@Injectable()
export class ProductEffects {
  readonly fetchProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productListActions.productsOpened),
      exhaustMap(() =>
        this.productService.getProducts().pipe(
          map((products) => apiActions.productsFetchedSuccess({ products })),
          catchError(() =>
            of(
              apiActions.productsFetchedError({
                errorMessage: 'Fetching products failed',
              })
            )
          )
        )
      )
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService
  ) {}
}
