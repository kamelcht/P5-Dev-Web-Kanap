let cart = document.querySelector("#cart__items");
let copyOfLS = JSON.parse(localStorage.getItem("products"));



console.log(copyOfLS)

main();

function main() {
  displayCart();
  countTotalInCart();
  checkFormAndPostRequest()
}

function displayCart() {
    if (copyOfLS === null || copyOfLS == 0){
      cart.innerHTML += `Votre panier est vide !`
        }


    for (let products in copyOfLS) {
        cart.innerHTML += `<article class="cart__item" data-id="${copyOfLS[products].id}">
        <div class="cart__item__img">
          <img src="${copyOfLS[products].imageUrl}" alt="${copyOfLS[products].altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__titlePrice">
            <h2>${copyOfLS[products].name}</h2>
            <p class="color">${copyOfLS[products].id_product_color}</p>
            <p class="price">${copyOfLS[products].price*copyOfLS[products].quantity} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${copyOfLS[products].quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem"><button class="btn_supr"> Supprimer</button></p>
            </div>
          </div>
        </div>
      </article>`
    }
  // gerer le bouton suppr
  let btnsupprime = document.getElementsByClassName("btn_supr");
  arrayProductsInCart = JSON.parse(localStorage.getItem("products"));
  console.log(btnsupprime)
  for (let l = 0; l < btnsupprime.length; l++){
    btnsupprime[l].addEventListener('click', () =>{

      let id_selection_suppr = copyOfLS[l];
      console.log(id_selection_suppr.id_product)
      for (index = 0; index < arrayProductsInCart.length; index++) {
        const element = arrayProductsInCart[index];
        if (element.id_product === id_selection_suppr.id_product && element.id_product_color === id_selection_suppr.id_product_color){
          arrayProductsInCart.splice(index, 1);

        }
      

      }

      localStorage.setItem("products", JSON.stringify(arrayProductsInCart));
      window.location.reload();
      
  })

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


  function checkFormAndPostRequest() {

    // On récupère les inputs depuis le DOM.
    const submit = document.querySelector("#order");
    let inputName = document.querySelector("#firstName");
    let inputLastName = document.querySelector("#lastName");
    let inputCity = document.querySelector("#city");
    let inputAdress = document.querySelector("#address");
    let inputMail = document.querySelector("#email");
    submit.addEventListener("click", (e) => {
       if (
        /* !inputName.value ||
        !inputLastName.value ||
        !inputCity.value ||
        !inputAddress.value ||
        !inputMail.value */
        1 === 2
      ) {
        erreur.innerHTML = "Vous devez renseigner tous les champs !";
        e.preventDefault();
      } else {
  
        // Si le formulaire est valide, le tableau productsBought contiendra un tableau d'objet qui sont les produits acheté, et infoclient contiendra ce tableau ainsi que l'objet qui contient les infos de l'acheteur
        let productsBought = [];
        productsBought.push(copyOfLS);
  
        const infoclient = {
          contact: {
            firstName: inputName.value,
            lastName: inputLastName.value,
            city: inputCity.value,
            address: inputAdress.value,
            email: inputMail.value,
          },
          products: productsBought,
        };

        
  


      }
    });
  }
