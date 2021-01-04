package pl.opalka.SkieCommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.opalka.SkieCommerce.entity.Customer;


public interface CustomerRepository extends JpaRepository<Customer, Long>{
}
