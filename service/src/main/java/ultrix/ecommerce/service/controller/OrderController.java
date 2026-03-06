package ultrix.ecommerce.service.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.transaction.Transactional;
import ultrix.ecommerce.service.model.Cart;
import ultrix.ecommerce.service.model.Order;
import ultrix.ecommerce.service.model.OrderItems;
import ultrix.ecommerce.service.model.User;
import ultrix.ecommerce.service.repo.CartRepository;
import ultrix.ecommerce.service.repo.OrderItemsRepository;
import ultrix.ecommerce.service.repo.OrderRepository;
import ultrix.ecommerce.service.repo.UserRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/orders")
public class OrderController {
	@Autowired
    private UserRepository userRepo;

    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private OrderItemsRepository orderItemRepo;

    //checkout
    @Transactional
    @PostMapping("/checkout/{userId}")
    	public String checkout(@PathVariable Long userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Cart> cartItems = cartRepo.findByUser(user);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        //total calc
        double total = 0;
        for (Cart item : cartItems) {
            total += item.getProduct().getPrice() * item.getQuantity();
        }

        //saving order
        Order order = new Order();
        order.setUser(user);
        order.setTotal(total);
        order.setOrderDate(LocalDateTime.now());

        Order savedOrder = orderRepo.save(order);

        //save order items
        for (Cart item : cartItems) {
            OrderItems orderItem = new OrderItems();
            orderItem.setOrder(savedOrder);
            orderItem.setProduct(item.getProduct());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setPrice(item.getProduct().getPrice());

            orderItemRepo.save(orderItem);
        }

        //clearing cart
        cartRepo.deleteByUser(user);

        return "Order placed successfully. Payment on delivery.";
    }
}
