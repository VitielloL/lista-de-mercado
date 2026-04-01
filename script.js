const defaultItems = [
  // AÇOUGUE / CARNES
  "Contra filé",
  "Alcatra, músculo, acém ou patinho moída 1kg",
  "Filé mignon suíno",
  "Linguiça toscana",
  // "Salsicha",
  "Calabresa",
  "Peito de frango",

  // PEIXES
  "Filé de tilápia",
  "Salmão",

  // HORTIFRUTI
  "Alface",
  "Tomate",
  "Cebola",
  "Batata",
  "Abobrinha",
  "Pepino",
  "Alho",
  "Alho poró",
  "Limão",
  "Banana da terra",
  "Uva",
  "Morango",
  "Mamão",

  // OVOS
  "Ovos",

  // LATICÍNIOS / GELADEIRA
  "Leite",
  "Iogurte integral",
  "Requeijão",
  "Queijo mussarela",
  // "Manteiga",
  "Creme de leite",
  "Leite condensado",
  "Creme Cheese",

  // PADARIA
  "Pão de forma",
  "Bisnaguinha",
  "Levs Magic Toast",
  "Levs Magic Toast Cacau",

  // MERCEARIA
  "Maionese",
  "Maionese premium",
  "Ketchup",
  "Molho premium",
  "Chimichurri",
  "Pimenta do Reino",
  "Curry",
  // "Óleo",
  // "Vinagre",
  // "Alho torrado",
  "Atum em lata",
  "Sucrilhos",
  "Pipoca de microondas",
  // "Milho de pipoca",
  "Farinha para empanar",
  "Toddy",

  // CONGELADOS
  "Morango congelado",
  "Nuggets",
  "Anel de cebola",
  "Bolinho de bacalhau",

  // BEBIDAS
  "Refrigerante",
  "Coca Zero",
  "Sprite Zero 2L",

  // HIGIENE PESSOAL
  // "Sabonete",
  // "Desodorante",
  "Sabonete líquido",
  // "Pasta de dente",
  // "Enxaguante bucal",

  // LIMPEZA
  // "Detergente",
  "Bucha de vasilha",
  // "Sabão em pó",
  // "Amaciante",
  // "Desinfetante",
  "Multiuso",
  // "Pastilha de vaso",

  // PAPELARIA / DESCARTÁVEIS
  "Papel higiênico",
  // "Papel toalha",

  // BEBIDA ALCOÓLICA
  "Aperol",
];

function createItem(name) {
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

  document.getElementById("shoppingList").appendChild(li);

  sortList();
}

function toggleItem(checkbox) {
  const li = checkbox.parentElement;

  const price = parseFloat(li.querySelector(".price").value);
  const qty = parseInt(li.querySelector(".qty").value);

  // Segurança extra
  if (!(price > 0 && qty >= 1)) {
    checkbox.checked = false;
    return;
  }

  li.classList.toggle("checked", checkbox.checked);

  sortList();
}

function addItem() {
  const input = document.getElementById("itemInput");
  const itemName = input.value.trim();
  if (!itemName) return;

  createItem(itemName);
  input.value = "";
}

function removeItem(button) {
  button.parentElement.remove();
  calculateTotal();
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
}

// 🔥 ORDENAÇÃO
function sortList() {
  const list = document.getElementById("shoppingList");
  const items = Array.from(list.querySelectorAll("li"));

  items.sort((a, b) => {
    const aChecked = a.querySelector("input[type='checkbox']").checked;
    const bChecked = b.querySelector("input[type='checkbox']").checked;

    // Não marcados primeiro
    if (aChecked !== bChecked) {
      return aChecked - bChecked;
    }

    // Marcados em ordem alfabética
    if (aChecked && bChecked) {
      const nameA = a.querySelector(".item-name").textContent.toLowerCase();
      const nameB = b.querySelector(".item-name").textContent.toLowerCase();
      return nameA.localeCompare(nameB);
    }

    return 0;
  });

  items.forEach(item => list.appendChild(item));
}

// Inicializa lista
defaultItems.forEach(item => createItem(item));
