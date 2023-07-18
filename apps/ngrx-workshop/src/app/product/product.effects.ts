import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';

import * as apiActions from './product.actions';
import * as productListActions from './product-list/product-list.actions';
import * as productDetailsActions from './product-details/product-details.actions';
import * as cartDetailsActions from '../cart/cart-details/cart-details.actions';
import * as selectors from './product.selectors';

@Injectable()
export class ProductEffects {
  readonly fetchProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        productListActions.productsOpened,
        cartDetailsActions.cartDetailsOpened
      ),
      map(() => apiActions.productsFetch())
    );
  });

  readonly fetchingProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(apiActions.productsFetch),
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

  readonly fetchProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productDetailsActions.productDetailsOpened),
      concatLatestFrom(() => this.store.select(selectors.getCurrentProductId)),
      switchMap(([, id]) =>
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.productService.getProduct(id!).pipe(
          map((product) => apiActions.productFetchedSuccess({ product })),
          catchError(() =>
            of(
              apiActions.productFetchedError({
                errorMessage: `Product with id ${id} fetch failed`,
              })
            )
          )
        )
      )
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService,
    private readonly store: Store
  ) {}
}
