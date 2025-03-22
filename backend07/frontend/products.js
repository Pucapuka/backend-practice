const host = `http://localhost:3000/products`;

//Carregando produtos da API
async function loadProducts(){
    const response = await fetch(host);
    const products = await response.json();
    const productsList = document.getElementById('products-list');

    productsList.innerHTML = '';
    products.forEach((product)=>{
        const li = document.createElement('li');
        li.textContent = `ID: ${product.id} , Nome: ${product.name}`;
        productsList.appendChild(li);
    })
}

async function addProduct(event){
    event.preventDefault();
    const productName = document.getElementById('add-product-name').value;

    const response = await fetch(host, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({name: productName})
    });

    if(response.ok){
        loadProducts();
        document.getElementById('add-product-name').value = '';
    }
}

async function editProduct(event){
    event.preventDefault();
    const productId = document.getElementById('edit-product-id').value;
    const productName = document.getElementById('edit-product-name').value;

    const response = await fetch(`${host}/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: productName}),
    });

    if(response.ok){
        loadProducts();
        document.getElementById('edit-product-id').value = '';
        document.getElementById('edit-product-name').value = '';
    }
}

async function deleteProduct(event){
    event.preventDefault();
    const productId = document.getElementById('delete-product-id').value;

    const response = await fetch(`${host}/${productId}`, {
        method: 'DELETE',
    });
    
    if(response.ok){
        loadProducts()
        document.getElementById('delete-product-id').value = '';
    }
}

document.addEventListener('DOMContentLoaded', loadProducts);

document.getElementById('add-product-form').addEventListener('submit', addProduct);

document.getElementById('edit-product-form').addEventListener('submit', editProduct);

document.getElementById('delete-product-form').addEventListener('submit', deleteProduct);