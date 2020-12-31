package pl.opalka.SkieCommerce.entity;


import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;

@Entity
@Table(name = "delivery_method")
@Getter
@Setter
public class ShippingMethod {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "deliveryMethodKey")
    private int id;

    @Column(name = "deliveryMethodName")
    private String name;
}
