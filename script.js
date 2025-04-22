const form = document.getElementById('product-form');
const formContainer = document.getElementById('form-container');
const listContainer = document.getElementById('list-container');
const tableBody = document.querySelector('#product-table tbody');

let products = JSON.parse(localStorage.getItem('products')) || [];

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const nome = document.getElementById('nome').value;
  const descricao = document.getElementById('descricao').value;
  const valor = parseFloat(document.getElementById('valor').value);
  const disponivel = document.getElementById('disponivel').value;

  if (isNaN(valor) || valor <= 0) {
    alert('O valor deve ser maior que zero.');
    return;
  }

  if (form.dataset.editIndex !== undefined) {
    // Atualizar produto
    const index = parseInt(form.dataset.editIndex);
    products[index] = { nome, descricao, valor, disponivel };
    delete form.dataset.editIndex;
    alert('Produto atualizado com sucesso!');
  } else {
    // Novo produto
    products.push({ nome, descricao, valor, disponivel });
    alert('Produto cadastrado com sucesso!');
  }

  products.sort((a, b) => a.valor - b.valor);
  localStorage.setItem('products', JSON.stringify(products));
  showList();
});

function showList() {
  tableBody.innerHTML = '';
  products.forEach((prod, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${prod.nome}</td>
      <td>R$ ${prod.valor.toFixed(2)}</td>
      <td>
        <button onclick="editProduct(${index})">Editar</button>
        <button onclick="deleteProduct(${index})">Excluir</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
  formContainer.style.display = 'none';
  listContainer.style.display = 'block';
}

function showForm() {
  form.reset();
  delete form.dataset.editIndex;
  formContainer.style.display = 'block';
  listContainer.style.display = 'none';
}

function deleteProduct(index) {
  if (confirm('Tem certeza que deseja excluir este produto?')) {
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    alert('Produto excluído com sucesso!');
    showList();
  }
}

function editProduct(index) {
  const prod = products[index];
  document.getElementById('nome').value = prod.nome;
  document.getElementById('descricao').value = prod.descricao;
  document.getElementById('valor').value = prod.valor;
  document.getElementById('disponivel').value = prod.disponivel;
  form.dataset.editIndex = index;
  showForm();
}

// Mostrar lista ao iniciar se já houver produtos
if (products.length > 0) {
  showList();
}
