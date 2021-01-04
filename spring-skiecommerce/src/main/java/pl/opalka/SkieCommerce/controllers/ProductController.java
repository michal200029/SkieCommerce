package pl.opalka.SkieCommerce.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.opalka.SkieCommerce.dao.ProductRepository;

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
