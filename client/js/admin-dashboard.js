// Admin Dashboard JavaScript

let allProducts = [];
let currentProductId = null;

document.addEventListener('DOMContentLoaded', async () => {
    // Protect admin page
    protectAdminPage();
    
    // Display admin name
    const user = getCurrentUser();
    document.getElementById('adminName').textContent = user.name;
    
    // Setup logout
    document.getElementById('logoutLink').addEventListener('click', (e) => {
        e.preventDefault();
        logout();
    });
    
    // Load products
    await loadProducts();
    
    // Setup modals
    setupProductFormModal();
    setupDeleteModal();
    
    // Add product button
    document.getElementById('addProductBtn').addEventListener('click', showAddProductModal);
});

// Load all products
async function loadProducts() {
    try {
        allProducts = await apiCall(API_ENDPOINTS.getAllProducts);
        displayProducts();
    } catch (error) {
        console.error('Error loading products:', error);
        alert('Error loading products. Please refresh the page.');
    }
}

// Display products in table
function displayProducts() {
    const tbody = document.getElementById('productsTableBody');
    
    if (!allProducts || allProducts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align: center;">No products available</td></tr>';
        return;
    }
    
    tbody.innerHTML = allProducts.map(product => `
        <tr>
            <td>${product.id}</td>
            <td><img src="${product.imgURL}" alt="${product.name}" class="product-thumbnail" onerror="this.src='https://via.placeholder.com/60?text=No+Image'"></td>
            <td>${product.name}</td>
            <td>${product.brand}</td>
            <td>${formatCategory(product.cat)}</td>
            <td>${product.size}</td>
            <td>Rs. ${product.price.toFixed(2)}</td>
            <td>${product.stock}</td>
            <td>
                <button class="action-btn edit-btn" onclick="showEditProductModal(${product.id})">Edit</button>
                <button class="action-btn delete-btn" onclick="showDeleteModal(${product.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Setup product form modal
function setupProductFormModal() {
    const modal = document.getElementById('productFormModal');
    const closeBtn = modal.querySelector('.close');
    const cancelBtn = document.getElementById('cancelBtn');
    const form = document.getElementById('productForm');
    
    closeBtn.onclick = () => {
        modal.style.display = 'none';
        resetForm();
    };
    
    cancelBtn.onclick = () => {
        modal.style.display = 'none';
        resetForm();
    };
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            resetForm();
        }
    });
    
    form.addEventListener('submit', handleProductSubmit);
}

// Show add product modal
function showAddProductModal() {
    currentProductId = null;
    resetForm();
    document.getElementById('modalTitle').textContent = 'Add New Product';
    document.getElementById('saveBtn').textContent = 'Add Product';
    document.getElementById('productFormModal').style.display = 'block';
}

// Show edit product modal
async function showEditProductModal(productId) {
    currentProductId = productId;
    
    try {
        const product = await apiCall(API_ENDPOINTS.getProduct(productId));
        
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productBrand').value = product.brand;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productSize').value = product.size;
        document.getElementById('productCategory').value = product.cat;
        document.getElementById('productStock').value = product.stock;
        document.getElementById('productImageURL').value = product.imgURL;
        document.getElementById('productDescription').value = product.description;
        
        document.getElementById('modalTitle').textContent = 'Edit Product';
        document.getElementById('saveBtn').textContent = 'Update Product';
        document.getElementById('productFormModal').style.display = 'block';
        
    } catch (error) {
        console.error('Error loading product:', error);
        alert('Error loading product details. Please try again.');
    }
}

// Handle product submit (add or update)
async function handleProductSubmit(e) {
    e.preventDefault();
    
    const errorMessage = document.getElementById('formErrorMessage');
    const successMessage = document.getElementById('formSuccessMessage');
    
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
    
    const productData = {
        name: document.getElementById('productName').value,
        brand: document.getElementById('productBrand').value,
        price: parseFloat(document.getElementById('productPrice').value),
        size: parseInt(document.getElementById('productSize').value),
        cat: document.getElementById('productCategory').value,
        stock: parseInt(document.getElementById('productStock').value),
        imgURL: document.getElementById('productImageURL').value,
        description: document.getElementById('productDescription').value
    };
    
    try {
        if (currentProductId) {
            // Update existing product
            productData.id = currentProductId;
            await apiCall(API_ENDPOINTS.updateProductById(currentProductId), 'PUT', productData);
            successMessage.textContent = 'Product updated successfully!';
        } else {
            // Add new product
            await apiCall(API_ENDPOINTS.addProduct, 'POST', productData);
            successMessage.textContent = 'Product added successfully!';
        }
        
        successMessage.style.display = 'block';
        
        // Reload products
        await loadProducts();
        
        // Close modal after 1 second
        setTimeout(() => {
            document.getElementById('productFormModal').style.display = 'none';
            resetForm();
        }, 1000);
        
    } catch (error) {
        console.error('Error saving product:', error);
        errorMessage.textContent = 'Error saving product. Please try again.';
        errorMessage.style.display = 'block';
    }
}

// Reset form
function resetForm() {
    document.getElementById('productForm').reset();
    document.getElementById('formErrorMessage').style.display = 'none';
    document.getElementById('formSuccessMessage').style.display = 'none';
    currentProductId = null;
}

// Setup delete modal
function setupDeleteModal() {
    const modal = document.getElementById('deleteModal');
    const cancelBtn = document.getElementById('cancelDeleteBtn');
    const confirmBtn = document.getElementById('confirmDeleteBtn');
    
    cancelBtn.onclick = () => {
        modal.style.display = 'none';
        currentProductId = null;
    };
    
    confirmBtn.onclick = async () => {
        await deleteProduct();
        modal.style.display = 'none';
    };
    
    window.addEventListener('click',(event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            currentProductId = null;
        }
    });
}

// Show delete modal
function showDeleteModal(productId) {
    currentProductId = productId;
    document.getElementById('deleteModal').style.display = 'block';
}

// Delete product
async function deleteProduct() {
    try {
        await apiCall(API_ENDPOINTS.deleteProduct(currentProductId), 'DELETE');
        
        // Reload products
        await loadProducts();
        
        alert('Product deleted successfully!');
        currentProductId = null;
        
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product. Please try again.');
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
