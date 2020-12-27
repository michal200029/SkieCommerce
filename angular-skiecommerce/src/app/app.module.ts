import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductMenuComponent } from './components/product-menu/product-menu.component';
import { ProductSearchComponent } from './components/product-search/product-search.component'
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'products',component: ProductListComponent},
 // {path: 'products/:id',component: ProductDetailsComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
]




@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductMenuComponent,
    ProductSearchComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
