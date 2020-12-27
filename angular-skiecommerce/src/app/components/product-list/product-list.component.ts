import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/classes/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1 ; 
  previousCategoryId: number = 1;
  searchMode: boolean = false;
  constructor(private productService: ProductService,
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(() => {
      this.logicalGateway();
    });
  }

  logicalGateway(){
    this.searchMode = this.activeRoute.snapshot.paramMap.has('keyword');
    if(!this.searchMode){
      this.handleListProduct();
    }else
     this.handleSearchListProduct();
    
  }

  handleListProduct(){
    const hasCategoryId: boolean = this.activeRoute.snapshot.paramMap.has('id');

    if(hasCategoryId){
      this.currentCategoryId = Number(this.activeRoute.snapshot.paramMap.get('id'));
    }else 
      this.currentCategoryId = 1

     this.previousCategoryId = this.currentCategoryId;

  this.productService.getProducts(this.currentCategoryId)
  .subscribe(data => {
    this.products = data;
  }); 
  }

  handleSearchListProduct(){

  }
    
  

}
