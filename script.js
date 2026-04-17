const defaultItems = [
  "Abobrinha",
  "Alcatra, músculo, acém ou patinho moída 1kg",
  "Alface",
  "Alho",
  "Alho poró",
  "Anel de cebola",
  "Aperol",
  "Atum em lata",
  "Banana da terra",
  "Barra de chocolate",
  "Batata",
  "Bisnaguinha",
  "Bolinho de bacalhau",
  "Bucha de vasilha",
  "Calabresa",
  "Cebola",
  "Chimichurri",
  "Coca Zero",
  "Contra filé",
  "Creme Cheese",
  "Creme de leite",
  "Curry",
  "Farinha para empanar",
  "Filé de tilápia",
  "Filé mignon suíno",
  "Inseticida",
  "Iogurte integral",
  "Ketchup",
  "Leite",
  "Leite condensado",
  "Leite em pó",
  "Levs Magic Toast",
  "Levs Magic Toast Cacau",
  "Linguiça toscana",
  "Limão",
  "Maionese",
  "Maionese premium",
  "Mamão",
  "Molho premium",
  "Morango",
  "Morango congelado",
  "Multiuso",
  "Nuggets",
  "Ovos",
  "Pão de forma",
  "Papel higiênico",
  "Peito de frango",
  "Pepino",
  "Pimenta do Reino",
  "Pipoca de microondas",
  "Pizza",
  "Queijo mussarela",
  "Refrigerante",
  "Repolho",
  "Repelente",
  "Requeijão",
  "Salmão",
  "Sabonete líquido",
  "Sprite Zero 2L",
  "Sucrilhos",
  "Toddy",
  "Tomate",
  "Uva"
];

const STORAGE_KEY = "shoppingListData";

function createItem(itemData = {}) {
  const { name, price = "", qty = 1, checked = false } = itemData;
  const li = document.createElement("li");

  li.innerHTML = `
    <input type="checkbox" disabled onchange="toggleItem(this); calculateTotal()">
    
    <input 
      type="number" 
      class="price" 
      placeholder="R$" 
      step="0.01" 
      min="0"
      oninput="handleInputChange(this)"
    >

    <input 
      type="number" 
      class="qty" 
      value="1"
      min="1"
      oninput="handleInputChange(this)"
    >

    <span class="item-name">${name}</span>

    <button class="remove-btn" onclick="removeItem(this)">X</button>
  `;

  const priceInput = li.querySelector(".price");
  const qtyInput = li.querySelector(".qty");
  const checkbox = li.querySelector("input[type='checkbox']");

  priceInput.value = price;
  qtyInput.value = qty;
  checkbox.checked = checked;

  document.getElementById("shoppingList").appendChild(li);

  validateItem(li);
  li.classList.toggle("checked", checkbox.checked);
  sortList();
}

function toggleItem(checkbox) {
  const li = checkbox.parentElement;

  const price = parseFloat(li.querySelector(".price").value);
  const qty = parseInt(li.querySelector(".qty").value);

  if (!(price > 0 && qty >= 1)) {
    checkbox.checked = false;
    return;
  }

  li.classList.toggle("checked", checkbox.checked);

  sortList();
  calculateTotal();
  saveList();
}

function addItem() {
  const input = document.getElementById("itemInput");
  const itemName = input.value.trim();
  if (!itemName) return;

  createItem({ name: itemName });
  input.value = "";
  saveList();
}

function removeItem(button) {
  button.parentElement.remove();
  calculateTotal();
  saveList();
}

function calculateTotal() {
  const items = document.querySelectorAll("#shoppingList li");
  let total = 0;

  items.forEach(item => {
    const checkbox = item.querySelector("input[type='checkbox']");
    const priceInput = item.querySelector(".price");
    const qtyInput = item.querySelector(".qty");

    if (checkbox.checked && priceInput.value) {
      const price = parseFloat(priceInput.value);
      const qty = parseInt(qtyInput.value) || 1;
      total += price * qty;
    }
  });

  document.getElementById("totalValue").textContent = total.toFixed(2);
}

function getListData() {
  return Array.from(document.querySelectorAll("#shoppingList li")).map(item => {
    const checkbox = item.querySelector("input[type='checkbox']");
    const priceInput = item.querySelector(".price");
    const qtyInput = item.querySelector(".qty");
    const name = item.querySelector(".item-name").textContent;

    return {
      name,
      price: priceInput.value,
      qty: qtyInput.value,
      checked: checkbox.checked
    };
  });
}

function saveList() {
  const listData = getListData();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(listData));
}

function loadList() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    try {
      const savedItems = JSON.parse(saved);
      if (Array.isArray(savedItems) && savedItems.length) {
        savedItems.forEach(item => createItem(item));
        calculateTotal();
        return;
      }
    } catch (err) {
      console.warn("Erro ao carregar lista do localStorage:", err);
    }
  }

  defaultItems
    .sort((a, b) => a.localeCompare(b, "pt-BR"))
    .forEach(item => createItem({ name: item }));
}

function clearAll() {
  if (!confirm("Deseja limpar todos os valores e reiniciar a lista?")) {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
  document.getElementById("shoppingList").innerHTML = "";
  document.getElementById("searchInput").value = "";
  document.getElementById("totalValue").textContent = "0.00";
  loadList();
}

// 🔥 VALIDAÇÃO
function validateItem(li) {
  const checkbox = li.querySelector("input[type='checkbox']");
  const priceInput = li.querySelector(".price");
  const qtyInput = li.querySelector(".qty");

  const price = parseFloat(priceInput.value);
  const qty = parseInt(qtyInput.value);

  const isValid = price > 0 && qty >= 1;

  checkbox.disabled = !isValid;

  if (!isValid) {
    checkbox.checked = false;
    li.classList.remove("checked");
  }
}

// 🔥 DISPARA VALIDAÇÃO
function handleInputChange(input) {
  const li = input.parentElement;

  validateItem(li);
  calculateTotal();
  saveList();
}

function filterItems() {
  const search = document
    .getElementById("searchInput")
    .value.toLowerCase();

  const items = document.querySelectorAll("#shoppingList li");

  items.forEach(item => {
    const name = item
      .querySelector(".item-name")
      .textContent
      .toLowerCase();

    if (name.includes(search)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}


// 🔥 ORDENAÇÃO MELHORADA
function sortList() {
  const list = document.getElementById("shoppingList");
  const items = Array.from(list.querySelectorAll("li"));

  items.sort((a, b) => {
    const aChecked = a.querySelector("input[type='checkbox']").checked;
    const bChecked = b.querySelector("input[type='checkbox']").checked;

    const nameA = a.querySelector(".item-name").textContent.toLowerCase();
    const nameB = b.querySelector(".item-name").textContent.toLowerCase();

    // Não marcados primeiro
    if (aChecked !== bChecked) {
      return aChecked - bChecked;
    }

    // Ordem alfabética
    return nameA.localeCompare(nameB, "pt-BR");
  });

  items.forEach(item => list.appendChild(item));
}

// 🔥 Inicializa já carregando do localStorage
loadList();
