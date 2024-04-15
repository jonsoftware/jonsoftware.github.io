// inicio do codigo de transição dos slides

let count = 1;
const totalImages = 4; // Atualize este valor conforme o número total de imagens

document.getElementById("radio1").checked = true;

setInterval(function () {
    nextImage();
}, 5000);

function nextImage() {
    count++;
    if (count > totalImages) {
        count = 1;
    }

    document.getElementById("radio" + count).checked = true;
}

/* fim do codigo de transição dos slides */

// Função para redirecionar para a página de resultados de pesquisa



document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("searchInput").addEventListener("input", searchItems);
    // Verifica se o botão de pesquisa existe antes de adicionar o evento de clique
    const searchButton = document.getElementById("searchButton");
    if (searchButton) {
        searchButton.addEventListener("click", searchItemsButtonClick);
    }

    function searchItems() {
        const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
        const searchResults = document.getElementById('searchResults');
        searchResults.innerHTML = '';

        if (searchTerm.length >= 3) {
            const productItems = document.querySelectorAll('.products .product-item');
            let found = false;

            productItems.forEach(item => {
                const productName = item.querySelector('h3').innerText.trim().toLowerCase();
                if (productName.includes(searchTerm)) {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = "#" + item.closest('.products').id;
                    link.textContent = productName;
                    listItem.appendChild(link);
                    searchResults.appendChild(listItem);
                    found = true;
                }
            });

            if (!found) {
                const noResultsItem = document.createElement('li');
                noResultsItem.textContent = 'Produto não encontrado';
                searchResults.appendChild(noResultsItem);
            }
        } else {
            const messageItem = document.createElement('li');
            messageItem.textContent = 'Por favor, insira pelo menos três caracteres para buscar um produto.';
            searchResults.appendChild(messageItem);
        }
    }

    function searchItemsButtonClick() {
        searchItems();
    }

    document.getElementById("searchInput").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            searchItems();
        }
    });
});

const items = []; // Array para armazenar os nomes dos produtos

fetch("fast%20&%20fair%201.1/produtos.html") // Substitua pelo caminho correto do arquivo produtos.html
  .then((response) => response.text())
  .then((html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const productItems = doc.querySelectorAll(".product-item h3");

    productItems.forEach((item) => {
      const productName = item.textContent.trim();
      items.push(productName); // Adiciona o nome do produto ao array
    });

    console.log(items); // Exibe os itens carregados no console para verificar
  })
  .catch((error) => console.error("Erro ao carregar o arquivo HTML:", error));

  
  
  // script do carrinho de compras 
  
// Função para adicionar produto ao carrinho
function addToCart(productName) {
    // Verificar se já existe o carrinho no localStorage
    let cart = localStorage.getItem('cart');
    if (!cart) {
        // Se não existir, criar um carrinho vazio
        cart = {};
    } else {
        // Se existir, converter de string JSON para objeto JavaScript
        cart = JSON.parse(cart);
    }

    // Verificar se o produto já está no carrinho
    if (cart[productName]) {
        // Se sim, incrementar a quantidade
        cart[productName]++;
    } else {
        // Se não, adicionar o produto ao carrinho com quantidade 1
        cart[productName] = 1;
    }

    // Salvar o carrinho atualizado no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Atualizar a quantidade de itens no carrinho na página
    updateCartCount();
}

// Função para atualizar a quantidade de itens no carrinho na página
function updateCartCount() {
    // Obter o elemento que mostra a quantidade de itens no carrinho
    const cartCountElement = document.getElementById('cartCount');

    // Obter o carrinho do localStorage
    const cart = JSON.parse(localStorage.getItem('cart'));

    // Inicializar a contagem de itens no carrinho
    let totalCount = 0;

    // Percorrer cada produto no carrinho e somar as quantidades
    for (const productName in cart) {
        totalCount += cart[productName];
    }

    // Atualizar o conteúdo do elemento que mostra a quantidade de itens no carrinho
    cartCountElement.textContent = totalCount;
}

// Atualizar a quantidade de itens no carrinho quando a página é carregada
updateCartCount();

    // script do carrinho de compras      
    document.addEventListener("DOMContentLoaded", function() {
        const carrinhoBtn = document.getElementById('carrinho');
        const adicionarBtns = document.querySelectorAll('.adicionar');
        const quantidadeInputs = document.querySelectorAll('.quantidade input');
    
        
        // Função para atualizar a quantidade e o preço total no botão do carrinho
        function atualizarCarrinho() {
            let itemCount = 0;
            let totalPrice = 0;
            quantidadeInputs.forEach(input => {
                const quantidade = parseInt(input.value);
                const precoUnitario = parseFloat(input.parentElement.previousElementSibling.textContent.replace('R$ ', '').replace(',', '.'));
                totalPrice += quantidade * precoUnitario;
                itemCount += quantidade;
            });
            carrinhoBtn.innerHTML = `Carrinho <span>(${itemCount}) - Total: R$ ${totalPrice.toFixed(2)}</span>`;
        }
    
        // Adiciona evento de clique aos botões "Adicionar ao Carrinho"
        adicionarBtns.forEach((btn, index) => {
            btn.addEventListener('click', function() {
                const quantidadeInput = quantidadeInputs[index];
                quantidadeInput.value = parseInt(quantidadeInput.value) + 1;
                atualizarCarrinho();
            });
        });
    
        // Adiciona evento de clique aos botões de incremento
        const maisBtns = document.querySelectorAll('.mais');
        maisBtns.forEach((btn, index) => {
            btn.addEventListener('click', function() {
                const quantidadeInput = quantidadeInputs[index];
                quantidadeInput.value = parseInt(quantidadeInput.value) + 1;
                atualizarCarrinho();
            });
        });
    
        // Adiciona evento de clique aos botões de decremento
        const menosBtns = document.querySelectorAll('.menos');
        menosBtns.forEach((btn, index) => {
            btn.addEventListener('click', function() {
                const quantidadeInput = quantidadeInputs[index];
                if (parseInt(quantidadeInput.value) > 0) {
                    quantidadeInput.value = parseInt(quantidadeInput.value) - 1;
                    atualizarCarrinho();
                }
            });
        });
    
        // Adiciona evento de clique ao botão do carrinho para redirecionar para carrinho.html
        carrinhoBtn.addEventListener('click', function() {
            window.location.href = 'carrinho.html';
        });
    });
    
    document.addEventListener("DOMContentLoaded", function() {
        const tbody = document.querySelector('#itens-carrinho tbody');
        const totalSpan = document.getElementById('total');
    
        // Função para adicionar um item ao carrinho
        function adicionarItemAoCarrinho(produto, imagem, quantidade, precoUnitario, total) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${produto}</td>
                <td><img src="${imagem}" alt="${produto}" style="width: 50px;"></td>
                <td>${quantidade}</td>
                <td>R$ ${precoUnitario.toFixed(2)}</td>
                <td>R$ ${total.toFixed(2)}</td>
            `;
            tbody.appendChild(tr);
        }
    
    
    
       
       
       
       
        // a partir daqui cria tabela 
    
    
      // Função para calcular e exibir o total do carrinho
      function calcularTotalCarrinho() {
        let total = 0;
        document.querySelectorAll('#itens-carrinho tbody tr').forEach(tr => {
            total += parseFloat(tr.children[4].textContent.replace('R$ ', ''));
        });
        totalSpan.textContent = total.toFixed(2);
    }
    
    // Função para adicionar um item ao carrinho
    function adicionarItemAoCarrinho(produto, imagem, precoUnitario) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${produto}</td>
            <td><img src="${imagem}" alt="${produto}" style="width: 50px;"></td>
            <td>
                <input type="number" class="quantidade" value="0">
                <button class="menos">-</button>
                <button class="mais">+</button>
            </td>
            <td>R$ ${precoUnitario.toFixed(2)}</td>
            <td>R$ <span class="total-item">0.00</span></td>
        `;
    
        tbody.appendChild(tr);
    
        // Adiciona eventos de clique aos botões de incremento e decremento
        const maisBtn = tr.querySelector('.mais');
        const menosBtn = tr.querySelector('.menos');
        const quantidadeInput = tr.querySelector('.quantidade');
        const totalItemSpan = tr.querySelector('.total-item');
    
        maisBtn.addEventListener('click', function() {
            quantidadeInput.value = parseInt(quantidadeInput.value) + 1;
            atualizarTotalItem();
        });
    
        menosBtn.addEventListener('click', function() {
            if (parseInt(quantidadeInput.value) > 0) {
                quantidadeInput.value = parseInt(quantidadeInput.value) - 1;
                atualizarTotalItem();
            }
        });
    
        quantidadeInput.addEventListener('input', function() {
            if (parseInt(quantidadeInput.value) < 0) {
                quantidadeInput.value = 0;
            }
            atualizarTotalItem();
        });
    
        // Função para atualizar o total do item
        function atualizarTotalItem() {
            const quantidade = parseInt(quantidadeInput.value);
            const totalItem = quantidade * precoUnitario;
            totalItemSpan.textContent = totalItem.toFixed(2);
            calcularTotalCarrinho();
        }
    }
    
    // Exemplo de adicionar itens ao carrinho
    adicionarItemAoCarrinho('Maçã', 'imagens/maca.jpeg', 2.00);
    adicionarItemAoCarrinho('Laranja', 'imagens/laranja.jpg', 3.37);
    });
    