import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  Search(value: string){
    this.router.navigateByUrl(`/search/${value}`);
  }

}
