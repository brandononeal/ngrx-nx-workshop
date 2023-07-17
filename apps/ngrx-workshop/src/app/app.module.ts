import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import { CartIconModule } from './cart/cart-icon/cart-icon.module';
import { RoutingModule } from './router/routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { productsReducer } from './product/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './product/product.effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CartModule } from './cart/cart.module';
import { ErrorEffects } from './error.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    RoutingModule,
    CartIconModule,
    CartModule,
    MatToolbarModule,
    MatSnackBarModule,
    EffectsModule.forRoot([ProductEffects, ErrorEffects]),
    StoreModule.forRoot({ product: productsReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 50 }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
