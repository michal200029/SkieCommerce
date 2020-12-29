package pl.opalka.SkieCommerce.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import pl.opalka.SkieCommerce.dao.ProductRepository;
import pl.opalka.SkieCommerce.entity.Product;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
public class ProductController {

    private final ProductRepository productRepository;



    @Autowired
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("/distinct")
    public List<String> FindDistinctProducts(){
        return productRepository.findDistinctByName();
    }

}
