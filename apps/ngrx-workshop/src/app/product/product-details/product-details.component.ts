import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Rating } from '@ngrx-nx-workshop/api-interfaces';
import { RatingService } from '../rating.service';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  ReplaySubject,
  filter,
  map,
  switchMap,
  takeUntil,
} from 'rxjs';

import * as actions from './product-details.actions';
import * as selectors from '../product.selectors';

@Component({
  selector: 'ngrx-nx-workshop-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnDestroy {
  readonly product$ = this.store.select(selectors.getCurrentProduct);

  protected customerRating$ = new BehaviorSubject<number | undefined>(
    undefined
  );

  private readonly destroyed$ = new ReplaySubject<void>(1);

  constructor(
    private readonly ratingService: RatingService,
    private readonly location: Location,
    private readonly store: Store
  ) {
    this.store.dispatch(actions.productDetailsOpened());

    this.store
      .select(selectors.getCurrentProductId)
      .pipe(
        filter((id): id is string => id != null),
        switchMap((id) => this.ratingService.getRating(id)),
        takeUntil(this.destroyed$)
      )
      .subscribe((productRating) =>
        this.customerRating$.next(productRating && productRating.rating)
      );
  }

  setRating(productId: string, rating: Rating) {
    this.ratingService
      .setRating({ productId, rating })
      .pipe(
        map((arr) =>
          arr.find((productRating) => productId === productRating.productId)
        ),
        filter(
          (productRating): productRating is NonNullable<typeof productRating> =>
            productRating != null
        ),
        map((productRating) => productRating.rating)
      )
      .subscribe((newRating) => this.customerRating$.next(newRating));
  }

  addToCart(productId: string) {
    const payload = { productId };
    this.store.dispatch(actions.addToCart(payload));
  }

  back() {
    this.location.back();
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
