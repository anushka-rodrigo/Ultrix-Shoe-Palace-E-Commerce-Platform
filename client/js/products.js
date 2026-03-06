// Products page JavaScript

let allProducts = [];
let filteredProducts = [];

document.addEventListener('DOMContentLoaded', async () => {
    await loadProducts();
    setupFilters();
    setupModal();
    
    // Check if there's a specific product to show from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    if (productId) {
        showProductModal(parseInt(productId));
    }
});

// Load all products
async function loadProducts() {
    try {
        allProducts = await apiCall(API_ENDPOINTS.getAllProducts);
        
        // Apply category filter from URL if present
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        
        if (categoryParam && categoryParam !== 'all') {
            filteredProducts = allProducts.filter(p => p.cat === categoryParam);
            // Update the category checkbox
            document.querySelectorAll('input[name="category"]').forEach(cb => {
                if (cb.value === categoryParam) {
                    cb.checked = true;
                } else if (cb.value === 'all') {
                    cb.checked = false;
                }
            });
        } else {
            filteredProducts = [...allProducts];
        }
        
        displayProducts();
    } catch (error) {
        console.error('Error loading products:', error);
        document.getElementById('productGrid').innerHTML = 
            '<p style="text-align: center; width: 100%; color: red;">Error loading products. Please try again later.</p>';
    }
}

// Display products
function displayProducts() {
    const productGrid = document.getElementById('productGrid');
    const productCount = document.getElementById('productCount');
    
    if (!filteredProducts || filteredProducts.length === 0) {
        productGrid.innerHTML = '<p style="text-align: center; width: 100%;">No products found.</p>';
        productCount.textContent = 'No products found';
        return;
    }
    
    productCount.textContent = `Showing ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`;
    
    productGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="showProductModal(${product.id})">
            <img src="${product.imgURL}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/300x250?text=No+Image'">
            <div class="product-info">
                <p class="product-brand">${product.brand}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">Rs. ${product.price.toFixed(2)}</p>
                <span class="product-category">${formatCategory(product.cat)}</span>
            </div>
        </div>
    `).join('');
}

// Setup filters
function setupFilters() {
    // Category filter
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    // Price filter
    document.getElementById('applyPrice').addEventListener('click', applyFilters);
    
    // Sort filter
    document.getElementById('sortSelect').addEventListener('change', applySorting);
    
    // Clear filters
    document.getElementById('clearFilters').addEventListener('click', clearFilters);
}

// Apply filters
function applyFilters() {
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
        .map(cb => cb.value);
    
    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
    
    filteredProducts = allProducts.filter(product => {
        // Category filter
        const categoryMatch = selectedCategories.includes('all') || 
                            selectedCategories.length === 0 || 
                            selectedCategories.includes(product.cat);
        
        // Price filter
        const priceMatch = product.price >= minPrice && product.price <= maxPrice;
        
        return categoryMatch && priceMatch;
    });
    
    applySorting();
}

// Apply sorting
function applySorting() {
    const sortValue = document.getElementById('sortSelect').value;
    
    switch(sortValue) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-az':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-za':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            // Default sorting (by id)
            filteredProducts.sort((a, b) => a.id - b.id);
    }
    
    displayProducts();
}

// Clear filters
function clearFilters() {
    // Reset category checkboxes
    document.querySelectorAll('input[name="category"]').forEach(cb => {
        cb.checked = cb.value === 'all';
    });
    
    // Reset price inputs
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    
    // Reset sort
    document.getElementById('sortSelect').value = 'default';
    
    // Reset filtered products
    filteredProducts = [...allProducts];
    applySorting();
}

// Setup modal
function setupModal() {
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.close');
    const addToCartBtn = document.getElementById('addToCartBtn');
    
    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };
    
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
    
    addToCartBtn.onclick = addToCart;
}

// Show product modal
async function showProductModal(productId) {
    const modal = document.getElementById('productModal');
    
    try {
        const product = await apiCall(API_ENDPOINTS.getProduct(productId));
        
        document.getElementById('modalProductImage').src = product.imgURL;
        document.getElementById('modalProductName').textContent = product.name;
        document.getElementById('modalProductBrand').textContent = product.brand;
        document.getElementById('modalProductPrice').textContent = `Rs. ${product.price.toFixed(2)}`;
        document.getElementById('modalProductDescription').textContent = product.description;
        document.getElementById('modalProductCategory').textContent = formatCategory(product.cat);
        document.getElementById('modalProductStock').textContent = product.stock;
        
        // Set size select to product's size
        document.getElementById('sizeSelect').value = product.size;
        
        // Store product id in modal
        modal.dataset.productId = product.id;
        
        // Update max quantity based on stock
        const quantityInput = document.getElementById('quantityInput');
        quantityInput.max = product.stock;
        quantityInput.value = 1;
        
        modal.style.display = 'block';
    } catch (error) {
        console.error('Error loading product details:', error);
        alert('Error loading product details. Please try again.');
    }
}

// Add to cart
async function addToCart() {
    if (!isLoggedIn()) {
        alert('Please login to add items to cart.');
        window.location.href = 'customer-login.html';
        return;
    }
    
    if (!isCustomer()) {
        alert('Only customers can add items to cart.');
        return;
    }
    
    const modal = document.getElementById('productModal');
    const productId = parseInt(modal.dataset.productId);
    const quantity = parseInt(document.getElementById('quantityInput').value);
    const user = getCurrentUser();
    
    try {
        await apiCall(
            `${API_ENDPOINTS.addToCart}?userId=${user.id}&productId=${productId}&quantity=${quantity}`,
            'POST'
        );
        
        alert('Product added to cart successfully!');
        modal.style.display = 'none';
        updateCartCount();
    } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Error adding product to cart. Please try again.');
    }
}

// Format category name
function formatCategory(cat) {
    const categories = {
        'men': "Men's",
        'woman': "Women's",
        'kids': "Kids'",
        'sports': 'Sports',
        'casual': 'Casual',
        'formal': 'Formal'
    };
    return categories[cat] || cat;
}
