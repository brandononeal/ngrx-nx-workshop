import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { Rating } from '@ngrx-nx-workshop/api-interfaces';
import { RatingService } from '../rating.service';
import { Store, createSelector } from '@ngrx/store';
import { productsOpened } from './product-list.actions';
import { LoadingState } from '../../shared/call-state';

import * as selectors from '../product.selectors';

const selectProductsListVm = createSelector(
  selectors.getProducts,
  selectors.getProductsCallState,
  (products, callState) => ({ products, callState })
);

@Component({
  selector: 'ngrx-nx-workshop-home',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  readonly vm$ = this.store.select(selectProductsListVm);
  readonly LoadingState = LoadingState;

  customerRatings$?: Observable<{ [productId: string]: Rating }>;

  constructor(
    private readonly store: Store,
    private readonly ratingService: RatingService
  ) {
    this.store.dispatch(productsOpened());
  }

  ngOnInit() {
    this.customerRatings$ = this.ratingService.getRatings().pipe(
      map((ratingsArray) =>
        // Convert from Array to Indexable.
        ratingsArray.reduce(
          (acc: { [productId: string]: Rating }, ratingItem) => {
            acc[ratingItem.productId] = ratingItem.rating;
            return acc;
          },
          {}
        )
      ),
      shareReplay({
        refCount: true,
        bufferSize: 1,
      })
    );
  }
}
