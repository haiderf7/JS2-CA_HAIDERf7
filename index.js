const displayContainer = document.getElementById('display-container');
const apiUrl = 'http://localhost:1337/articles';


async function getData(url) {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

function generateHtml(data) {
  data.forEach(function (item) {
    displayContainer.innerHTML += `
    <div>
      <div>Post item ${item.id}</div>
      <div>${item.title}</div>
      <button>Click me</button>
    <div>
    <hr />
  `;
  });
}

async function main() { 
  const data = await getData(apiUrl);
  generateHtml(data);
}

main();