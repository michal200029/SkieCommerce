package pl.opalka.SkieCommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import pl.opalka.SkieCommerce.entity.ShippingMethod;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "shipping",path = "shipping")
public interface ShippingMethodRepository extends JpaRepository<ShippingMethod, Integer> {
}
