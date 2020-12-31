import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductMenuComponent } from './components/product-menu/product-menu.component';
import { ProductSearchComponent } from './components/product-search/product-search.component'
import { RouterModule, Routes } from '@angular/router';
import { CartInfoComponent } from './components/cart-info/cart-info.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component'
import {  ReactiveFormsModule } from '@angular/forms';
import { DetailsDirective } from './directives/details.directive';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  {path: 'products',component: ProductListComponent},
  {path: 'cartDetails',component: CartDetailsComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
]
  



@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductMenuComponent,
    ProductSearchComponent,
    CartInfoComponent,
    CartDetailsComponent,
    DetailsDirective,
    CartDetailsComponent,
    CheckoutComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
