package pl.opalka.SkieCommerce.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="country")
@Data
public class Country {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="code")
    private String code;

    @Column(name="name")
    private String name;
}
