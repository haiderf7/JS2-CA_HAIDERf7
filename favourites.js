const displayContainer = document.getElementById('display-favourites');
const clearAllButton = document.getElementById('clear-all-button');
const localStorageKey = 'myItems';

function generateHtml(items) {
  if (!items.length) {
    displayContainer.innerHTML = "No items found in localStorage";
    return;
  }

  displayContainer.innerHTML = '';
  items.forEach(function (item) {
    displayContainer.innerHTML += `
      <div>
        <div>Post item ${item.id}</div>
        <div>${item.title}</div>
        <div>${item.summary}</div>
      </div>
      <hr />
    `;
  });
}

function clearLocalStorage() {
  localStorage.removeItem(localStorageKey);
  generateHtml([]);
}

function loadItemsFromLocalStorage() {
  const items = JSON.parse(localStorage.getItem(localStorageKey)) || [];
  generateHtml(items);
}

clearAllButton.addEventListener('click', function() {
  clearLocalStorage();
});

loadItemsFromLocalStorage();
