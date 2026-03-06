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

import ultrix.ecommerce.service.model.Product;
import ultrix.ecommerce.service.repo.ProductRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/products")
public class ProductController {
	
	@Autowired
	private ProductRepository repository;
	
	@GetMapping("/allProduct")
	public List<Product> getAllProducts(){
		return repository.findByIsDeletedFalse();
	}
	
	@GetMapping("/{id}")
	public Product getProduct(@PathVariable Long id) {
		return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

	}
	
	@PostMapping("/addProduct")
	public Product addProduct(@RequestBody Product product) {
		return repository.save(product);
	}
	
	@PostMapping("/addAllProducts")
	public List<Product> addAllProduct(@RequestBody List<Product> product) {
		return repository.saveAll(product);
	}
	
	@PutMapping("/updateProduct")
	public Product updateProduct(@RequestBody Product product) {
		return repository.save(product);
	}
	
	@PutMapping("/updateProduct/{id}")
	public Product updateProductById(@PathVariable Long id, @RequestBody Product productDetails) {
		Product existingProduct = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        existingProduct.setName(productDetails.getName());
        existingProduct.setBrand(productDetails.getBrand());
        existingProduct.setPrice(productDetails.getPrice());
        existingProduct.setSize(productDetails.getSize());
        existingProduct.setCat(productDetails.getCat());
        existingProduct.setImgURL(productDetails.getImgURL());
        existingProduct.setStock(productDetails.getStock());
        existingProduct.setDescription(productDetails.getDescription());

        return repository.save(existingProduct);
	}
	
	@DeleteMapping("/deleteProduct/{id}")
	public Product softDeleteProduct(@PathVariable Long id) {
	    Product product = repository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Product not found"));

	    product.setIsDeleted(true);
	    return repository.save(product);
	}
	
	
	
}
