package ultrix.ecommerce.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import ultrix.ecommerce.service.model.User;

public interface UserRepository extends JpaRepository<User, Long>{

}
