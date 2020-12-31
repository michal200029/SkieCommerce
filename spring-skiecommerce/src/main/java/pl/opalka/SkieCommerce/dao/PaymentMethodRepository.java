package pl.opalka.SkieCommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import pl.opalka.SkieCommerce.entity.PaymentMethod;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "payment",path = "payment")
public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Integer> {
}
