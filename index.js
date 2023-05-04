const displayContainer = document.getElementById('display-container');
const apiUrl = 'http://localhost:1337/articles';
const localStorageKey = 'myItems';

async function getData(url) {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

function generateHtml(data) {
  const items = JSON.parse(localStorage.getItem(localStorageKey)) || [];

  data.forEach(function (item) {
    const isItemInLocalStorage = items.some ( (storageItem) => storageItem.id === item.id);

    displayContainer.innerHTML += `
      <div>
        <div>Post item ${item.id}</div>
        <div>${item.title}</div>
        <div>${item.summary}</div>
        <button data-id="${item.id}"data-title="${item.title}" data-in-local-storage="${isItemInLocalStorage}">${isItemInLocalStorage ? 'Remove' : 'Save'}</button>
      </div>
      <hr />
    `;
  });

  displayContainer.addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
      const itemID = parseInt(event.target.dataset.id);
      const iteTitle = event.target.dataset.title;
      const isInLocalStorage = event.target.dataset.inLocalStorage === 'true';

      if (isInLocalStorage) {
        const index = items.findIndex ( (item) => item.id === itemId);
        if (index !== -1) {
          items.splice(index, 1);
        }
      } else {
        items.push({ id: itemId, title: itemTitle });
      }

      localStorage.setItem(localStorageKey, JSON.stringify(items));
      event.target.dataset.inLocalStorage = !isInLocalStorage;
      event.target.textContent = isInLocalStorage ? 'Save' : 'Remove';
    }
  });
}

async function main() { 
  const data = await getData(apiUrl);
  generateHtml(data);
}

main();

