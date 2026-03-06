package ultrix.ecommerce.service.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ultrix.ecommerce.service.model.Cart;
import ultrix.ecommerce.service.model.Product;
import ultrix.ecommerce.service.model.User;
import ultrix.ecommerce.service.repo.CartRepository;
import ultrix.ecommerce.service.repo.ProductRepository;
import ultrix.ecommerce.service.repo.UserRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/cart")
public class CartController {
	
	@Autowired
	CartRepository cartRepo;
	

	@Autowired
	UserRepository userRepo;
	

	@Autowired
	ProductRepository productRepo;
	
	// Add a product to cart
    @PostMapping("/addToCart")
    public Cart addToCart(@RequestParam Long userId,
                          @RequestParam Long productId,
                          @RequestParam int quantity) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Optional<Cart> existingCartItem = cartRepo.findByUserAndProduct(user, product);
        
        if (existingCartItem.isPresent()) {
        	Cart item = existingCartItem.get();
            item.setQuantity(item.getQuantity() + quantity);
            return cartRepo.save(item);
        }
        else {
	        Cart cartItem = new Cart();
	        cartItem.setUser(user);
	        cartItem.setProduct(product);
	        cartItem.setQuantity(quantity);
	        return cartRepo.save(cartItem);
        }
    }

    // Get all cart items for a user
    @GetMapping("/user/{userId}")
    public List<Cart> getCartItems(@PathVariable Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return cartRepo.findByUser(user);
    }

    // Update quantity of a cart item
    @PutMapping("/updateCart/{cartId}")
    public Cart updateCartItem(@PathVariable Long cartId, @RequestParam int quantity) {
        Cart cartItem = cartRepo.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        cartItem.setQuantity(quantity);
        return cartRepo.save(cartItem);
    }

    // Delete a cart item
    @DeleteMapping("/delete/{cartId}")
    public void deleteCartItem(@PathVariable Long cartId) {
        Cart cartRepoItem = cartRepo.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        cartRepo.delete(cartRepoItem);
    }

    // Clear cart for a user (e.g., after checkout)
    @DeleteMapping("/clear/{userId}")
    public void clearCart(@PathVariable Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        cartRepo.deleteByUser(user);
    }
	
}
