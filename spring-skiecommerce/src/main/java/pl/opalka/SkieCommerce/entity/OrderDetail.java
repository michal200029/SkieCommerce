package pl.opalka.SkieCommerce.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "orderdetail")
@Getter
@Setter
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="order_tracking_number")
    private String orderTrackingNumber;

    @Column(name = "total_price")
    private BigDecimal totalPrice;

    @Column(name="total_quantity")
    private int totalQuantity;

    @Column(name="status")
    private String status;

    @Column(name="date_created")
    @CreationTimestamp
    private Date dateCreated;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "orderDetail")
    private Set<OrderItem> orderItems = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "shipping_address_id", referencedColumnName = "id")
    private Address shippingAddress;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "billing_address_id", referencedColumnName = "id")
    private Address billingAddress;

    public void add(OrderItem item) {

        if (item != null) {
            if (orderItems == null) {
                orderItems = new HashSet<>();
            }
            orderItems.add(item);
            item.setOrderDetail(this);
        }
    }

    @ManyToOne
    @JoinColumn(name = "delivery_method_id")
    private ShippingMethod shippingMethod;

    @ManyToOne
    @JoinColumn(name = "payment_method_id")
    private PaymentMethod paymentMethod;

}
