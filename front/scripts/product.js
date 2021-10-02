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
              console.log(article);
            productCardName.innerHTML = article.name;
            let colorSelect = document.getElementById("color-select");
              for (let i = 0; i < article.colors.length; i++) {
              let option = document.createElement("option");
              option.innerText = article.colors[i];
              ;}
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
                  <label for="color-select">Choisir une taille :</label>
                  <select name="color-select" id="colors">
                      <option value="">--SVP, choisissez une couleur --</option>                       <option value="vert">$colorSelect.appendChild(option)</option>
                      <option value="blanc">blanc</option> -->
                  </select>
                </div>

                <div class="item__content__settings__quantity">
                  <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                  <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                </div>
              </div>

              <div class="item__content__addButton">
                <button id="addToCart">Ajouter au panier</button>
              </div>

            </div>
          </article>`
              
            });
        }

