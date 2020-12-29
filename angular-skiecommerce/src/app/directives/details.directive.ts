import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { Product } from '../classes/product';


@Directive({
  selector: '[appDetails]'
})
export class DetailsDirective {

  private window; //<p>
  private windowCopy; //<p>
  @Input()
  public product!: Product;
  constructor(private el: ElementRef, private renderer: Renderer2) { 
    this.window = this.renderer.createElement('p');
  }
  
  @HostListener(`mouseenter`)
  showDetials(){
  
    this.window.innerHTML = 
      //"Brand : " + this.product.brand  + "<br/>" +
      //"Model : " + this.product.name + "<br/>" +
     // "Condition : " + this.product.condition + "<br/>" +
     // "Size : " + this.product.size + "<br/>" +
      "Radius : " + this.product.special + "<br/>" +
      "Units in stock : " + this.product.unitsInStock;

   // this.el.nativeElement.innerHTML = "";
    this.renderer.setStyle(this.window, 'background-color','#FFDFDD' );
    this.renderer.setStyle(this.window, 'font-size','25px' );
    this.renderer.appendChild(this.el.nativeElement, this.window); 
    
  }

  @HostListener('mouseleave')
  hideDetials(){
    this.renderer.removeChild(this.el.nativeElement, this.window);
  }
}
