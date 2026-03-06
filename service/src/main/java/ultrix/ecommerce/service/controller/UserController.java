package ultrix.ecommerce.service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ultrix.ecommerce.service.model.User;
import ultrix.ecommerce.service.repo.UserRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/users")
public class UserController {
	@Autowired
	private UserRepository repository;
	
	@GetMapping("/allUsers")
	public List<User> getAllUsers(){
		return repository.findAll();
	}
	
	@GetMapping("/{id}")
	public User getUser(@PathVariable Long id) {
		return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

	}
	
	@PostMapping("/addUser")
	public User addUser(@RequestBody User user) {
		return repository.save(user);
	}
	
	@PostMapping("/addAllUsers")
	public List<User> addAllUsers(@RequestBody List<User> user) {
		return repository.saveAll(user);
	}
	
	@PutMapping("/updateUser")
	public User updateUser(@RequestBody User user) {
		return repository.save(user);
	}
	
	@PutMapping("/updateUser/{id}")
	public User updateUserById(@PathVariable Long id, @RequestBody User userDetails) {
		User existingUser = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

		existingUser.setName(userDetails.getName());
		existingUser.setEmail(userDetails.getEmail());
		existingUser.setPassword(userDetails.getPassword());
		existingUser.setRole(userDetails.getRole());
		existingUser.setPhone(userDetails.getPhone());
        existingUser.setAddress(userDetails.getAddress());

        return repository.save(existingUser);
	}
	
	@DeleteMapping("/deleteUser/{id}")
	public void deleteUser(@PathVariable Long id) {
		User existingUser = repository.findById(id)
	            .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
	    repository.delete(existingUser);
	}
}
