package pl.opalka.SkieCommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pl.opalka.SkieCommerce.dao.CustomerRepository;
import pl.opalka.SkieCommerce.dto.Purchase;
import pl.opalka.SkieCommerce.dto.PurchaseResponse;
import pl.opalka.SkieCommerce.entity.*;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private final CustomerRepository customerRepository;
    @Autowired
    public CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }


    @Override
    @Transactional
    public PurchaseResponse placeOrderToDataBase(Purchase purchase) {


        OrderDetail order = purchase.getOrderInfo();

        String orderTrackingNumber = UUID.randomUUID().toString();
        order.setOrderTrackingNumber(orderTrackingNumber);

        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

       // order.setOrderItems();

        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());


        order.setShippingMethod(purchase.getShippingMethod());
        order.setPaymentMethod(purchase.getPaymentMethod());

        Customer customer = purchase.getCustomer();
        customer.add(order);

        order.getOrderItems().forEach(item -> System.out.print(item+" "));

        order.setStatus("NEW");
        System.out.println("--------------------");
        customer.getOrders().forEach(item -> System.out.print(item+" "));
       customerRepository.save(customer);

        return new PurchaseResponse(orderTrackingNumber);
    }
}
