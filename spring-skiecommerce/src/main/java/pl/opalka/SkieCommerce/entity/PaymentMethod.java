package pl.opalka.SkieCommerce.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "payment_method")
@Getter
@Setter
public class PaymentMethod {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "paymentMethodKey")
    private int id;

    @Column(name = "paymentMethodName")
    private String name;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "paymentMethod")
    private Set<OrderDetail> orderDetails = new HashSet<>();

}
