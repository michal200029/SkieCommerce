package pl.opalka.SkieCommerce.entity;


import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="customer")
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

    @Column(name="phoneNumber")
    private int phoneNumber;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.MERGE)
    private Set<OrderDetail> orders = new HashSet<>();

    public void add(OrderDetail order) {

        if (order != null) {
            if (orders == null) {
                orders = new HashSet<>();
            }
            orders.add(order);
            order.setCustomer(this);
        }
    }

}
