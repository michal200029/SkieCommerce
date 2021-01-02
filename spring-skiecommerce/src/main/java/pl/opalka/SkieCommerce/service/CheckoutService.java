package pl.opalka.SkieCommerce.service;

import pl.opalka.SkieCommerce.dto.Purchase;
import pl.opalka.SkieCommerce.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrderToDataBase(Purchase purchase);
}
