package ultrix.ecommerce.service.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ultrix.ecommerce.service.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

	//only fetch products that are not deleted
	List<Product> findByIsDeletedFalse();
}
