import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShippingMethod } from '../classes/shipping-method';
import { map } from 'rxjs/operators';
import { PaymentMethod } from '../classes/payment-method';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormService {

  private shippingUrl = 'http://localhost:8888/api/shipping';
  private paymentUrl = ' http://localhost:8888/api/payment';
 
  constructor(private httpClient: HttpClient) { }

  getAllShippingMethods(): Observable<ShippingMethod[]>{
    return this.httpClient.get<GetResponseShippingMethods>(this.shippingUrl).pipe(
      map(response => response._embedded.shipping)
    ) 
  }

  getAllPaymentMethods(): Observable<PaymentMethod[]>{
    return this.httpClient.get<GetResponsePaymentMethods>(this.paymentUrl).pipe(
      map(response => response._embedded.payment)
    ) 
  }

}

interface GetResponseShippingMethods{
  _embedded: {
    shipping: ShippingMethod[];
  }
}

interface GetResponsePaymentMethods{
  _embedded: {
    payment: PaymentMethod[];
  }
}