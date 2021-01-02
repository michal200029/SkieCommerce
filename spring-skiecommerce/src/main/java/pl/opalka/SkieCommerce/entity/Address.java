package pl.opalka.SkieCommerce.entity;

import lombok.Getter;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "address")
@Getter
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "city")
    @Size(min = 2)
    private String city;

    @Column(name = "street")
    @Size(min = 4)
    private String street;

    @Column(name = "country")
    private String country;

    @Column(name = "zip_code")
    @Length(min = 5)
    private String zipCode;

    @OneToOne
    @PrimaryKeyJoinColumn
    private OrderDetail orderDetail;
}
