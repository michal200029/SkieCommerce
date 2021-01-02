package pl.opalka.SkieCommerce.entity;


import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "customer")
@Getter
@Setter
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="first_name")
    @Size(min = 2)
    private String firstName;

    @Column(name="last_name")
    @Size(min = 2)
    private String lastName;

    @Column(name="email")
    @Email
    private String email;

    @Column(name="phoneNumer")
    @Length(min = 9)
    private int phoneNumber;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "customer")
    private Set<OrderDetail> orderDetails = new HashSet<>();

    public void addNewOrderDetial(OrderDetail orderDetail){
        if(orderDetail != null){
            if(orderDetails == null)
                orderDetails = new HashSet<>();
            orderDetails.add(orderDetail);
            orderDetail.setCustomer(this);
        }
    }

}
