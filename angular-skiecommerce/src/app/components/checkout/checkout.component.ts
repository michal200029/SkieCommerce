import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { Country } from 'src/app/classes/country';
import { OrderInfo } from 'src/app/classes/order-info';
import { OrderItem } from 'src/app/classes/order-item';
import { PaymentMethod } from 'src/app/classes/payment-method';
import { Purchase } from 'src/app/classes/purchase';
import { ShippingMethod } from 'src/app/classes/shipping-method';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutFormService } from 'src/app/services/checkout-form.service';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  shippingMethods: ShippingMethod[] = [];
  paymentMethods: PaymentMethod[] = [];
  countries: Country[] = [];

  totalValue: number;
  totalQuantity: number;

  checkoutFormGroup!: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private cartService: CartService,
              private checkoutFromService: CheckoutFormService,
              private checkoutService: CheckoutService,
              private router: Router) { }

  
  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',[Validators.required,Validators.minLength(2)]),
        lastName: new FormControl('',[Validators.required,Validators.minLength(2)]),
        email: new FormControl('',[Validators.required,Validators.email]),
        phoneNumber: new FormControl('',[Validators.required,Validators.minLength(9)])
      }),
      shippingAddress: this.formBuilder.group({
        country : new FormControl('',[Validators.required]),
        city : new FormControl('',[Validators.required,Validators.minLength(2)]),
        street : new FormControl('',[Validators.required,Validators.minLength(4)]),
        zipCode : new FormControl('',[Validators.required,Validators.minLength(5)]),
      }),
      billingAddress: this.formBuilder.group({
        country : new FormControl('',[Validators.required]),
        city : new FormControl('',[Validators.required,Validators.minLength(2)]),
        street : new FormControl('',[Validators.required,Validators.minLength(4)]),
        zipCode : new FormControl('',[Validators.required,Validators.minLength(5)]),
      }),
      paymentMethod: this.formBuilder.group({
        id: new FormControl('',[Validators.required])
        //id: new FormControl('')
      }),
      shippingMethod: this.formBuilder.group({
        id: new FormControl('',[Validators.required])
      })
    })

    this.checkoutFromService.getAllPaymentMethods().subscribe(
      data => { this.paymentMethods = data});

    this.checkoutFromService.getAllShippingMethods().subscribe(
      data => { this.shippingMethods = data});

    this.checkoutFromService.getAllCountries().subscribe(
      data => { this.countries = data});
    
    this.cartService.totalQuantity.subscribe(
      data => { this.totalQuantity = data});
      
    this.cartService.totalValue.subscribe(
      data => { this.totalValue = data});
    
      console.log(this.paymentMethods)

  };
  onSubmit(){
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return ;
    }

    let orderInfo = new OrderInfo;
      orderInfo.totalPrice = this.totalValue;
      orderInfo.totalQuantity = this.totalQuantity;

    const cartItems = this.cartService.productsInCart;

    let orderItems: OrderItem[] = cartItems.map(item => new OrderItem(item));
    let purchase = new Purchase;

    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.country = shippingCountry.name;

    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.country = billingCountry.name;

    purchase.shippingMethod = this.checkoutFormGroup.controls['shippingMethod'].value;
    const shippingId: ShippingMethod = JSON.parse(JSON.stringify(purchase.shippingMethod.id));
    purchase.shippingMethod.id = shippingId.id;

    purchase.paymentMethod = this.checkoutFormGroup.controls['paymentMethod'].value;
    const paymentId: PaymentMethod = JSON.parse(JSON.stringify(purchase.paymentMethod.id));
    purchase.paymentMethod.id = paymentId.id;

    purchase.orderInfo = orderInfo;
    purchase.orderItems = orderItems;

    this.checkoutService.placeOrder(purchase).subscribe({
      next: response => {
        alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);
        this.resetCart();
        // this.router.navigateByUrl("/products");
      },
      error: err => {
        alert(`There was an error: ${err.message}`);
      }
    });
  }

  resetCart(){
    this.cartService.productsInCart = [];
    this.cartService.totalValue.next(0);
    this.cartService.totalQuantity.next(0);
    
    this.checkoutFormGroup.reset();

    this.router.navigateByUrl("/products");
  }

  copyShippingAddressToBillingAddress(event){
    if(event.target.checked){
      this.checkoutFormGroup.controls.billingAddress
        .setValue(this.checkoutFormGroup.controls.shippingAddress.value)
    }
    else this.checkoutFormGroup.controls.billingAddress.reset();
  }

  get firstName(){  return this.checkoutFormGroup.get('customer.firstName') }
  get lastName(){  return this.checkoutFormGroup.get('customer.lastName') }
  get email(){  return this.checkoutFormGroup.get('customer.email') }
  get phoneNumber(){  return this.checkoutFormGroup.get('customer.phoneNumber') }

  get shippingAddressStreet(){  return this.checkoutFormGroup.get('shippingAddress.street') }
  get shippingAddressCity(){  return this.checkoutFormGroup.get('shippingAddress.city') }
  get shippingAddressCountry(){  return this.checkoutFormGroup.get('shippingAddress.country') }
  get shippingAddressZipCode(){  return this.checkoutFormGroup.get('shippingAddress.zipCode') }
  
  get billingAddressStreet(){  return this.checkoutFormGroup.get('shippingAddress.street') }
  get billingAddressCity(){  return this.checkoutFormGroup.get('billingAddress.city') }
  get billingAddressCountry(){  return this.checkoutFormGroup.get('billingAddress.country') }
  get billingAddressZipCode(){  return this.checkoutFormGroup.get('billingAddress.zipCode') }

  get paymentMethodType(){  return this.checkoutFormGroup.get('paymentMethod.type') }
  get shippingMethodType(){  return this.checkoutFormGroup.get('shippingMethod.type') }


}
