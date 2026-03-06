package ultrix.ecommerce.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import ultrix.ecommerce.service.model.OrderItems;

public interface OrderItemsRepository extends JpaRepository<OrderItems, Long>{

}
