
main();

function main() {
  getArticles();
}

// Récupérer les articles depuis l'API
function getArticles() {
  fetch("http://localhost:3000/api/products")
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
    let container = document.getElementById("items");
      const articles = resultatAPI;
      console.log(articles);
      for (let article in articles) {
    container.innerHTML += `
            <a class="productLink" href="./product.html?id=${resultatAPI[article]._id}">
                <article>
                    <img class="productImg" src="${resultatAPI[article].imageUrl}" alt="${resultatAPI[article].altTxt}">
                    <h3 class="productName">${resultatAPI[article].name}</h3>
                    <p class="productDescription">${resultatAPI[article].description}</p>
                </article>
          </a>`
      }
    });
}