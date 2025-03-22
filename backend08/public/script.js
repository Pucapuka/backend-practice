// Função para carregar os itens da API
async function loadItems() {
    const response = await fetch('http://localhost:3000/items');
    const items = await response.json();
    const itemList = document.getElementById('item-list');//é uma tag ul, para criar li dentro dela

    itemList.innerHTML = ''; // Limpa a lista antes de adicionar os itens
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `ID: ${item.id}, Nome: ${item.name}`;
        itemList.appendChild(li);
    });
}

// Função para adicionar um novo item
async function addItem(event) {
    event.preventDefault();
    const itemName = document.getElementById('item-name').value;

    const response = await fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: itemName }),
    });

    if (response.ok) {
        loadItems(); // Recarrega a lista de itens
        document.getElementById('item-name').value = ''; // Limpa o campo de input
    }
}

// Função para atualizar um item
async function updateItem(event) {
    event.preventDefault();
    const itemId = document.getElementById('update-item-id').value;
    const itemName = document.getElementById('update-item-name').value;

    const response = await fetch(`http://localhost:3000/items/${itemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: itemName }),
    });

    if (response.ok) {
        loadItems(); // Recarrega a lista de itens
        document.getElementById('update-item-id').value = ''; // Limpa o campo de input
        document.getElementById('update-item-name').value = ''; // Limpa o campo de input
    }
}

// Função para deletar um item
async function deleteItem(event) {
    event.preventDefault();
    const itemId = document.getElementById('delete-item-id').value;

    const response = await fetch(`http://localhost:3000/items/${itemId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        loadItems(); // Recarrega a lista de itens
        document.getElementById('delete-item-id').value = ''; // Limpa o campo de input
    }
}

// Carrega os itens quando a página é carregada
document.addEventListener('DOMContentLoaded', loadItems);

// Adiciona um l    istener para o formulário de adicionar item
document.getElementById('add-item-form').addEventListener('submit', addItem);

// Adiciona um listener para o formulário de atualizar item
document.getElementById('update-item-form').addEventListener('submit', updateItem);

// Adiciona um listener para o formulário de deletar item
document.getElementById('delete-item-form').addEventListener('submit', deleteItem);