const defaultItems = [
  "Alcatra, músculo, acém ou patinho moída 1kg",
  "Contra filé",
  "Filé mignon suíno",
  "Peito de frango",
  "Suco em pó",
  "Filé de tilápia",
  "Alface",
  "Tomate",
  "Cebola",
  "Batata",
  "Abobrinha",
  "Uva",
  "Morango",
  "Mamão",
  "Limão",
  "Ovos",
  "Farinha para empanar",
  "Leite",
  "Queijo mussarela",
  "Iogurte integral",
  "Requeijão",
  "Manteiga",
  "Toddy",
  "Pão de forma",
  "Levs Magic Toast",
  "Maionese",
  "Ketchup",
  "Morango congelado",
  "Óleo",
  "Batata frita",
  "Cebola para fritar",
  "Vinagre",
  "Sabonete",
  "Sabonete líquido",
  "Sabão em pó",
  "Bucha de vasilha",
  "Pasta de dente",
  "Detergente",
  "Refrigerante",
  "Pastilha de vaso",
  "Aperol",
  "Coca Zero",
  "Sprite Zero 2L"
];

function createItem(name) {
  const li = document.createElement("li");

  li.innerHTML = `
    <input type="checkbox" onchange="toggleItem(this); calculateTotal()">
    
    <input 
      type="number" 
      class="price" 
      placeholder="R$" 
      step="0.01" 
      min="0"
      onchange="calculateTotal()"
    >

    <input 
      type="number" 
      class="qty" 
      value="1"
      min="1"
      onchange="calculateTotal()"
    >

    <span class="item-name">${name}</span>

    <button class="remove-btn" onclick="removeItem(this)">X</button>
  `;

  document.getElementById("shoppingList").appendChild(li);
}

function toggleItem(checkbox) {
  const li = checkbox.parentElement;
  li.classList.toggle("checked", checkbox.checked);
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

defaultItems.forEach(item => createItem(item));