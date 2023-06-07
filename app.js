//Selecciones
const productsContainer = document.querySelector(".products-container");
const form = document.querySelector(".input-form");
const input = document.querySelector(".search-input");
const companiesContainer = document.querySelector(".companies");

let filteredArray = [...products]; //Copia con spread operator

// Buscador
form.addEventListener("keyup", () => {
  const inputValue = input.value;
  filteredArray = products.filter((element) => {
    return element.title.toLowerCase().includes(inputValue);
  });
  displayProducts();
});

// Muestra los productos de forma dinamica
const displayProducts = () => {
  //Si hay 0 productos con ese nombre
  if (filteredArray.length === 0) {
    productsContainer.innerHTML = "Sorry, no products match the query";
    return;
  }
  productsContainer.innerHTML = filteredArray
    .map(({ id, title, image, price }) => {
      return ` <article class="product" data-id=${id}>
        <img src="${image}" class="product-img img">
        <footer>
          <h4 class="product-name">${title}</h4>
          <span class="product-price">$${price}</span>
        </footer>
      </article>`;
    })
    .join("");
};

// Muestra los botones de forma dinamica
const displayButtons = () => {
  const uniqueCompanies = [
    "all",
    ...new Set(products.map((product) => product.company)),
  ];
  companiesContainer.innerHTML = uniqueCompanies
    .map(
      (company) =>
        `<button class="company-btn" data-id=${company}>${company}</button>`
    )
    .join("");
};

//Filtrar segun el boton que se haga click
companiesContainer.addEventListener("click", (e) => {
  const el = e.target;
  if (el.classList.contains("company-btn")) {
    console.log(el.dataset.id);
    if (el.dataset.id === "all") {
      filteredArray = [...products];
    } else {
      filteredArray = products.filter((product) => {
        return product.company === el.dataset.id;
      });
    }
    input.value = "";
    displayProducts();
  }
});

//Llamadas
displayButtons();
displayProducts();
