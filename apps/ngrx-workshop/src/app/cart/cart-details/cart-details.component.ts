import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartProduct } from '../../model/product';
import { ProductService } from '../../product/product.service';
import { CartService } from '../cart.service';
import { Store } from '@ngrx/store';

import * as selectors from '../cart.selectors';
import * as actions from './cart-details.actions';

@Component({
  selector: 'ngrx-nx-workshop-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
})
export class CartDetailsComponent {
  cartProducts$: Observable<CartProduct[] | undefined> = combineLatest([
    this.store.select(selectors.getCartItems),
    this.productService.getProducts(),
  ]).pipe(
    map(([cartItems, products]) => {
      if (!cartItems || !products) return undefined;
      return Object.entries(cartItems)
        .map(([productId, quantity]): CartProduct | undefined => {
          const product = products.find((p) => p.id === productId);
          if (!product) return undefined;
          return {
            ...product,
            quantity,
          };
        })
        .filter((cartProduct): cartProduct is CartProduct => !!cartProduct);
    })
  );

  total$ = this.cartProducts$.pipe(
    map(
      (cartProducts) =>
        cartProducts &&
        cartProducts.reduce(
          (acc, product) => acc + product.price * product.quantity,
          0
        )
    )
  );

  constructor(
    private readonly cartService: CartService,
    private readonly productService: ProductService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly store: Store
  ) {
    this.store.dispatch(actions.cartDetailsOpened());
  }

  removeOne(id: string) {
    this.cartService.removeProduct(id);
  }

  removeAll() {
    this.cartService.removeAll();
  }

  purchase(products: CartProduct[]) {
    this.cartService
      .purchase(
        products.map(({ id, quantity }) => ({ productId: id, quantity }))
      )
      // 👇 really important not to forget to subscribe
      .subscribe((isSuccess) => {
        if (isSuccess) {
          this.store.dispatch(actions.purchaseSuccess());
          this.router.navigateByUrl('');
        } else {
          this.snackBar.open('Purchase error', 'Error', {
            duration: 2500,
          });
        }
      });
  }
}
