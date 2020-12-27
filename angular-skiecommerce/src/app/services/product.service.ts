import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../classes/product';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../classes/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8888/api/products';
  private categoryUrl = 'http://localhost:8888/api/product-category';

  constructor(private httpClient: HttpClient ) { }

  getProducts(categoryId: number) : Observable<Product[]>{

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products));
    
  }

  getAllCategories(): Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseProductCategories>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory));
  }

  getSearchProducts(typeWord :string): Observable<Product[]>{

    const searchUrl =`${this.baseUrl}/search/findByNameContaining?name=${typeWord}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products));
  }
}
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
}
interface GetResponseProductCategories {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
