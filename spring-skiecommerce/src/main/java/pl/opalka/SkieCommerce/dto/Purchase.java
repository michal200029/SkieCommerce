package pl.opalka.SkieCommerce.dto;

import lombok.Getter;
import lombok.Setter;
import pl.opalka.SkieCommerce.entity.*;

import java.util.Set;

@Getter
@Setter
public class Purchase {
    private Customer customer;
    private Address billingAddress;
    private Address shippingAddress;
    private Set<OrderItem> orderItems;
    private OrderDetail orderInfo;
    private PaymentMethod paymentMethod;
    private ShippingMethod shippingMethod;
}
