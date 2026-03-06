package ultrix.ecommerce.service.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import ultrix.ecommerce.service.model.Cart;
import ultrix.ecommerce.service.model.Product;
import ultrix.ecommerce.service.model.User;

public interface CartRepository extends JpaRepository<Cart, Long>{
	 // Get all cart items of a user
    List<Cart> findByUser(User user);
    
    void deleteByUser(User user);
    Optional<Cart> findByUserAndProduct(User user, Product product); // <-- add this

}
