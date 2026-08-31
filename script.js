// script.js – data & UI logic (demo only)

// ----- sample inventory data -----
const inventoryItems = [
  { id: 1, name: 'Wireless Mouse', category: 'electronics', qty: 42, price: 29.99 },
  { id: 2, name: 'Mechanical Keyboard', category: 'electronics', qty: 18, price: 89.50 },
  { id: 3, name: 'USB-C Hub', category: 'electronics', qty: 7, price: 45.00 },
  { id: 4, name: 'Office Chair', category: 'furniture', qty: 5, price: 219.00 },
  { id: 5, name: 'Desk Lamp', category: 'furniture', qty: 12, price: 34.90 },
  { id: 6, name: 'Bookshelf', category: 'furniture', qty: 3, price: 129.00 },
  { id: 7, name: 'Cotton T-Shirt', category: 'clothing', qty: 28, price: 19.99 },
  { id: 8, name: 'Hoodie (grey)', category: 'clothing', qty: 9, price: 49.95 },
  { id: 9, name: 'Sneakers', category: 'clothing', qty: 14, price: 79.00 },
  { id: 10, name: 'Bluetooth Speaker', category: 'electronics', qty: 6, price: 59.00 },
  { id: 11, name: 'Monitor Stand', category: 'furniture', qty: 8, price: 39.00 },
  { id: 12, name: 'Backpack', category: 'clothing', qty: 11, price: 65.00 }
];

// ----- DOM refs -----
const tbody = document.getElementById('inventoryBody');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const totalItemsSpan = document.getElementById('totalItems');
const totalCategoriesSpan = document.getElementById('totalCategories');
const lowStockSpan = document.getElementById('lowStockCount');
const totalValueSpan = document.getElementById('totalValue');
const showingCountSpan = document.getElementById('showingCount');

let currentFilter = 'all';
let searchTerm = '';

// ----- helpers -----
function formatCurrency(amount) {
  return '$' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function getCategoryIcon(category) {
  const map = {
    electronics: 'fa-microchip',
    furniture: 'fa-chair',
    clothing: 'fa-tshirt'
  };
  return map[category] || 'fa-tag';
}

// ----- render table -----
function render() {
  // filter logic
  let filtered = inventoryItems.filter(item => {
    const matchCategory = currentFilter === 'all' || item.category === currentFilter;
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  // update stats (based on full inventory, not filtered)
  const totalItems = inventoryItems.length;
  const categories = new Set(inventoryItems.map(i => i.category));
  const lowStock = inventoryItems.filter(i => i.qty < 10).length;
  const totalVal = inventoryItems.reduce((sum, i) => sum + (i.qty * i.price), 0);

  totalItemsSpan.textContent = totalItems;
  totalCategoriesSpan.textContent = categories.size;
  lowStockSpan.textContent = lowStock;
  totalValueSpan.textContent = formatCurrency(totalVal);
  showingCountSpan.textContent = filtered.length;

  // build rows
  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 2.5rem 0; color: #6f8fa8;">No items match your filter</td></tr>`;
    return;
  }

  let html = '';
  filtered.forEach(item => {
    const value = item.qty * item.price;
    html += `
      <tr>
        <td>
          <div class="item-cell">
            <div class="item-avatar"><i class="fas ${getCategoryIcon(item.category)}"></i></div>
            <span class="item-name">${item.name}</span>
          </div>
        </td>
        <td><span class="category-badge">${item.category}</span></td>
        <td>${item.qty}</td>
        <td>${formatCurrency(item.price)}</td>
        <td>${formatCurrency(value)}</td>
        <td style="text-align: center;">
          <div class="actions-cell">
            <button class="action-btn edit" title="Edit"><i class="fas fa-edit"></i></button>
            <button class="action-btn delete" title="Delete"><i class="fas fa-trash-alt"></i></button>
          </div>
        </td>
      </tr>
    `;
  });
  tbody.innerHTML = html;
}

// ----- event listeners (UI demo) -----

// search
searchInput.addEventListener('input', (e) => {
  searchTerm = e.target.value;
  render();
});

// filter buttons
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });
});

// initial render
render();

// (optional) dummy console log to show it's alive
console.log('📦 Inventory UI demo – multi-file setup ready');