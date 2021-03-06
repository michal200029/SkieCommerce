package pl.opalka.SkieCommerce.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;


@Entity
@Data
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "brand")
    private String brand;

    @Column(name = "name")
    private String name;


    @Column(name = "condition")
    private String condition;

    @Column(name = "unit_price")
    private BigDecimal unitPrice;

    @Column(name = "units_in_stock")
    private int unitsInStock;

    @Column(name = "special")
    private String special;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "size")
    private double size;

    @Column(name = "product_key")
    private String productKey;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private ProductCategory category;
}
