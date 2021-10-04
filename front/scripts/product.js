let params = new URL(document.location).searchParams;
let id = params.get("id");

const productCardName = document.querySelector(".title-product");

main();

function main() {
  getArticles();
  addToCart();
}

// Récupérer l'article depuis l'API
function getArticles() {
  fetch(`http://localhost:3000/api/products/${id}`)
    .then(function (res) {
      return res.json();
    })
    .catch((error) => {
      let productsContainer = document.querySelector(".items");
      productsContainer.innerHTML =
        "Nous n'avons pas réussi à afficher nos nounours. Avez vous bien lancé le serveur local (Port 3000) ? <br>Si le problème persiste, contactez-nous.";
    })

        // Dispatcher les données de chaque produit (prix, nom...) dans le DOM
        .then(function (resultatAPI) {
            // On place les données reçues via l'API aux bons endroits sur la page
            let container = document.getElementById("items-product");
            article = resultatAPI;
              console.log(article);
            productCardName.innerHTML = article.name;
            container.innerHTML += `            
            <article>
            <div class="item__img">
              <img src="${article.imageUrl}" alt="${article.altTxt}">
            </div>
            <div class="item__content">

              <div class="item__content__titlePrice">
                <h1 id="title">${article.name}</h1>
                <p>Prix : <span id="price">${article.price}</span>€</p>
              </div>

              <div class="item__content__description">
                <p class="item__content__description__title">Description :</p>
                <p id="description">${article.description}</p>
              </div>

              <div class="item__content__settings">
                <div class="item__content__settings__color">
                  <label for="color-select">Choisir une couleur :</label>
                  <select name="color-select" id="items-color">
                  </select>
                </div>

                <div class="item__content__settings__quantity">
                  <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                  <input type="number" id ="kanapNumber" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                </div>
              </div>

              <div class="item__content__addButton">
                <button id="addToCart">Ajouter au panier</button>
              </div>

            </div>
          </article>`

          let colorcontainer = document.getElementById("items-color");
          for (let i = 0; i < article.colors.length; i++) {
            colorcontainer.innerHTML += 
            `<option value="${article.colors[i]}">${article.colors[i]}</option>`;
            console.log(article.colors.length);
            ;}

              
            });
        }

function addToCart() {
  const addToCartBtn = document.querySelector("#addToCart");
  const kanapNum = document.querySelector("#kanapNumber");

  addToCartBtn.addEventListener('click', () => {
    if (kanapNum.value > 0 && kanapNum.value < 100){
      // ------ Création du produit qui sera ajouté au panier
      let productAdded = {
        name: kanap,
        price: 100,
        quantity: parseFloat(kanapNum.value),
        _id: id,
      };
  }
  // ----------------- Gestion du localStorage
  let arrayProductsInCart = [];

  // Si le localStorage existe, on récupère son contenu, on l'insère dans le tableau arrayProductsInCart, puis on le renvoit vers le localStorage avec le nouveau produit ajouté.
    if (localStorage.getItem("products") !== null) {
    arrayProductsInCart = JSON.parse(localStorage.getItem("products"));
    }
  // Si le LS est vide, on le crée avec le produit ajouté

  arrayProductsInCart.push(productAdded);
        localStorage.setItem("products", JSON.stringify(arrayProductsInCart));

  
}
  )}
