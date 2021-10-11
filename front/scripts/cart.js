let cart = document.querySelector("#cart__items");
let copyOfLS = JSON.parse(localStorage.getItem("products"));


console.log(copyOfLS)

main();

function main() {
  displayCart();
  countTotalInCart();
  checkFormAndPostRequest();
}

function displayCart() {
    for (let products in copyOfLS) {
        cart.innerHTML += `<article class="cart__item" data-id="${copyOfLS[products].id}">
        <div class="cart__item__img">
          <img src="${copyOfLS[products].imageUrl}" alt="${copyOfLS[products].altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__titlePrice">
            <h2>${copyOfLS[products].name}</h2>
            <p class="price">${copyOfLS[products].price*copyOfLS[products].quantity} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${copyOfLS[products].quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`
}}

function countTotalInCart() {
    let arrayOfPrice = [];
    let totalPrice = document.querySelector("#totalPrice");
  
    // On push chaque prix du DOM dans un tableau
    let productPriceAccordingToQuantity = document.querySelectorAll(".price");
    for (let price in productPriceAccordingToQuantity) {
      arrayOfPrice.push(productPriceAccordingToQuantity[price].innerHTML);
    }
  
    // On enlève les undefined du tableau
    arrayOfPrice = arrayOfPrice.filter((el) => {
      return el != undefined;
    });
  
    // Transformer en nombre chaque valeur du tableau
    arrayOfPrice = arrayOfPrice.map((x) => parseFloat(x));
  
    // Additionner les valeurs du tableau pour avoir le prix total
    const reducer = (acc, currentVal) => acc + currentVal;
    arrayOfPrice = arrayOfPrice.reduce(reducer);
  
    // Affichage du prix avec formatage €
    totalPrice.innerText = `Total : ${(arrayOfPrice = new Intl.NumberFormat(
      "fr-FR",
      {
        style: "currency",
        currency: "EUR",
      }
    ).format(arrayOfPrice))}`;
  }
