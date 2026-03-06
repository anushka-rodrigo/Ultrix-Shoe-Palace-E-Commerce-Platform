// Main page JavaScript

document.addEventListener('DOMContentLoaded', async () => {
    await loadFeaturedProducts();
    setupCategoryNavigation();
});

// Load featured products
async function loadFeaturedProducts() {
    const featuredGrid = document.getElementById('featuredProducts');
    
    try {
        const products = await apiCall(API_ENDPOINTS.getAllProducts);
        
        if (!products || products.length === 0) {
            featuredGrid.innerHTML = '<p style="text-align: center; width: 100%;">No products available at the moment.</p>';
            return;
        }
        
        // Show only first 6 products
        const featuredProducts = products.slice(0, 6);
        
        featuredGrid.innerHTML = featuredProducts.map(product => `
            <div class="product-card" onclick="viewProduct(${product.id})">
                <img src="${product.imgURL}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/300x250?text=No+Image'">
                <div class="product-info">
                    <p class="product-brand">${product.brand}</p>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">Rs. ${product.price.toFixed(2)}</p>
                    <span class="product-category">${formatCategory(product.cat)}</span>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading featured products:', error);
        featuredGrid.innerHTML = '<p style="text-align: center; width: 100%; color: red;">Error loading products. Please try again later.</p>';
    }
}

// Setup category navigation
function setupCategoryNavigation() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            window.location.href = `products.html?category=${category}`;
        });
    });
}

// View product details
function viewProduct(productId) {
    window.location.href = `products.html?productId=${productId}`;
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
