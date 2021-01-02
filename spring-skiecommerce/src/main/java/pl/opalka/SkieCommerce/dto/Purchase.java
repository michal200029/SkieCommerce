package pl.opalka.SkieCommerce.dto;

import lombok.Getter;
import lombok.Setter;
import pl.opalka.SkieCommerce.entity.Address;
import pl.opalka.SkieCommerce.entity.Customer;
import pl.opalka.SkieCommerce.entity.OrderDetail;
import pl.opalka.SkieCommerce.entity.OrderItem;

import java.util.Set;

@Getter
@Setter
public class Purchase {
    private Customer customer;
    private Address billingAddress;
    private Address shippingAddress;
    private Set<OrderItem> orderItem;
    private OrderDetail orderDetail;
}
