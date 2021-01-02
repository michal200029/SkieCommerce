package pl.opalka.SkieCommerce.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import pl.opalka.SkieCommerce.dto.Purchase;
import pl.opalka.SkieCommerce.dto.PurchaseResponse;
import pl.opalka.SkieCommerce.service.CheckoutService;

@Controller
@CrossOrigin("http://localhost:4200")
@RequestMapping("/checkout")
public class CheckoutController {
    private final CheckoutService checkoutService;

    @Autowired
    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){

        PurchaseResponse purchaseResponse = checkoutService.placeOrderToDataBase(purchase);
        return purchaseResponse;
    }
}
