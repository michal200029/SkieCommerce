import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentMethod } from 'src/app/classes/payment-method';
import { ShippingMethod } from 'src/app/classes/shipping-method';
import { CheckoutFormService } from 'src/app/services/checkout-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  shippingMethods: ShippingMethod[] = [];
  paymentMethods: PaymentMethod[] = [];

  checkoutFormGroup: FormGroup
  constructor(private formBuilder: FormBuilder,
              private checkoutService: CheckoutFormService) { }

  
  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',[Validators.required,Validators.minLength(2)]),
        lastName: new FormControl('',[Validators.required,Validators.minLength(2)]),
        email: new FormControl('',[Validators.required,Validators.email]),
        phoneNumber: new FormControl('',[Validators.required,Validators.pattern('[0-9]'),Validators.minLength(9)])
      }),
      shippingAddress: this.formBuilder.group({
        country : new FormControl('',[Validators.required]),
        city : new FormControl('',[Validators.required,Validators.minLength(2)]),
        street : new FormControl('',[Validators.required,Validators.minLength(4)]),
        zipCode : new FormControl('',[Validators.required,Validators.minLength(2)]),
      }),
      billingAddress: this.formBuilder.group({
        country : new FormControl('',[Validators.required]),
        city : new FormControl('',[Validators.required,Validators.minLength(2)]),
        street : new FormControl('',[Validators.required,Validators.minLength(4)]),
        zipCode : new FormControl('',[Validators.required,Validators.minLength(2)]),
      }),
      paymentMethod: this.formBuilder.group({
        type: new FormControl('',[Validators.required])
      }),
      shippingMethod: this.formBuilder.group({
        type: new FormControl('',[Validators.required])
      }),
    })

    this.checkoutService.getAllPaymentMethods().subscribe(
      data => { this.paymentMethods = data});

      
    this.checkoutService.getAllShippingMethods().subscribe(
      data => { this.shippingMethods = data});



  }
  onSubmit(){
    
  }

  copyShippingAddressToBillingAddress(event){
    if(event.target.checked){
      this.checkoutFormGroup.controls.billingAddress
        .setValue(this.checkoutFormGroup.controls.shippingAddress.value)
    }
    else this.checkoutFormGroup.controls.billingAddress.reset();
  }


}
