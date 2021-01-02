package pl.opalka.SkieCommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import pl.opalka.SkieCommerce.dao.CustomerRepository;
import pl.opalka.SkieCommerce.dto.Purchase;
import pl.opalka.SkieCommerce.dto.PurchaseResponse;
import pl.opalka.SkieCommerce.entity.Customer;
import pl.opalka.SkieCommerce.entity.OrderDetail;
import pl.opalka.SkieCommerce.entity.OrderItem;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.UUID;

public class CheckoutServiceImpl implements CheckoutService {

    private final CustomerRepository customerRepository;
    @Autowired
    public CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }


    @Override
    @Transactional
    public PurchaseResponse placeOrderToDataBase(Purchase purchase) {

        OrderDetail orderDetail = purchase.getOrderDetail();

        String orderTrackingNumber = UUID.randomUUID().toString();
        orderDetail.setOrderTrackingNumber(orderTrackingNumber);

        Set<OrderItem> orderItemSet = purchase.getOrderItem();
        orderItemSet.forEach(item -> orderDetail.addNewItem(item));

        orderDetail.setBillingAddress(purchase.getBillingAddress());
        orderDetail.setShippingAddress(purchase.getShippingAddress());

        Customer customer = purchase.getCustomer();
        customer.addNewOrderDetial(orderDetail);

        customerRepository.save(customer);

        return new PurchaseResponse(orderTrackingNumber);
    }
}
