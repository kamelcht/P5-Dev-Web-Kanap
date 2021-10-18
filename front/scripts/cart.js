let cart = document.querySelector("#cart__items");
let copyOfLS = JSON.parse(localStorage.getItem("products"));

let products = [];
for (o = 0; o < copyOfLS.length; o++) {
  let productsId =
  copyOfLS[o].id_product;
  products.push(productsId);
}

console.log("products");
console.log(products);


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
    localStorage.setItem("priceTotal", JSON.stringify(arrayOfPrice));

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


    submit.addEventListener("click", (e) => {

      let inputName = document.querySelector("#firstName").value;
      let inputLastName = document.querySelector("#lastName").value;
      let inputCity = document.querySelector("#city").value;
      let inputAddress = document.querySelector("#address").value;
      let inputMail = document.querySelector("#email").value;
  
       if (
        !inputName ||
        !inputLastName ||
        !inputCity ||
        !inputAddress ||
        !inputMail 
      ) {
        erreur.innerHTML = "Vous devez renseigner tous les champs !";
        e.preventDefault();
      } else {

          const contact = {
            firstName : inputName,
            lastName: inputLastName,
            address: inputAddress,
            city: inputCity,
            email: inputMail,
          }


      const aEnvoyer = {
        contact,
        products,
      };

      envoieVersServeur(aEnvoyer);

    }


        
    });

    function envoieVersServeur(aEnvoyer) {
      //Envoie de l'objet "aEnvoyer" vers le serveur
      const promise01 = fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(aEnvoyer),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      //Pour voir le résultat du serveur dans la console
      promise01.then(async (response) => {
        //Si la promesse n'est pas résolu, si elle est rejeté - gestions des erreurs
        try {
          const contenu = await response.json();
          console.log("contenu de response");
          console.log(contenu);
  
          if (response.ok) {
            console.log(`Resultat de response.ok : ${response.ok}`);
  
            //Récupération de l'id de la response du serveur
            console.log("id de response");
            console.log(contenu.orderId);
  
            //Mettre l'id dans le local storage
            localStorage.setItem("responseId", contenu.orderId);
  
            //Aller vers la page confirmation-commande
            window.location = "confirmation.html";
          } else {
            console.log(`Réponse du serveur : ${response.status}`);
            alert(`Problème avec le serveur : erreur ${response.status}`);
          }
        } catch (e) {
          console.log("ERREUR qui vient du catch()");
          console.log(e);
          alert(`ERREUR qui vient du catch() ${e}`);
        }
      });
    }

  }



  
