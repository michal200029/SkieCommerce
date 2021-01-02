package pl.opalka.SkieCommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.opalka.SkieCommerce.entity.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Long> {
}
