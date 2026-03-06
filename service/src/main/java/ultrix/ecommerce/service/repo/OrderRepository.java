package ultrix.ecommerce.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import ultrix.ecommerce.service.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{

}
