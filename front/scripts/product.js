let params = new URL(document.location).searchParams;
let id = params.get("id");

const productCardName = document.querySelector(".title-product");

main();

function main() {
  getArticles();
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
                  <input type="number" id ="kanapNumber" name="itemQuantity" min="1" max="100" value="1" id="quantity">
                </div>
              </div>

              <div class="item__content__addButton">
                <button id="addToCart">Ajouter au panier</button>
              </div>
              <div class="added-to-cart-confirmation">
                        <p class="confirmation-text">
                        </p>
              </div>

            </div>
          </article>`

          let colorcontainer = document.getElementById("items-color");
          for (let i = 0; i < article.colors.length; i++) {
            colorcontainer.innerHTML += 
            `<option id="colorvalue" value="${article.colors[i]}">${article.colors[i]}</option>`;

         
            }

            

            addToCart(article);

            });

        }


function addToCart(exemple) {
              // mettre le choix de l'utilisateur dans une variable 
              let idvalue = document.getElementById("items-color");
 
  const addToCartBtn = document.querySelector("#addToCart");
  const kanapNum = document.querySelector("#kanapNumber");
  const confirmation = document.querySelector(".added-to-cart-confirmation");
  const textConfirmation = document.querySelector(".confirmation-text");

  addToCartBtn.addEventListener('click', () => {
    

    
    let productAdded = {
      name: exemple.name,
      price: exemple.price,
      quantity: parseFloat(kanapNum.value),
      id_product: exemple._id,
      id_product_color : idvalue.value,
      imageUrl: exemple.imageUrl,
      altTxt: exemple.altTxt,


    };
    if (kanapNum.value <= 0 && kanapNum.value >= 100){
      // ------ Création du produit qui sera ajouté au panier
      // evenment innerhtml quantité  ecvt 
      console.log('pas de 0')
      return;
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

  console.log(productAdded)

  confirmation.style.visibility = "visible";
      textConfirmation.innerHTML = `Vous avez ajouté ce produit à votre panier !`;
      setTimeout("location.reload(true);", 120000);
  

  
}
  )}
