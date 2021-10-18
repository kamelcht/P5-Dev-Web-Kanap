const responseId = localStorage.getItem("responseId");
console.log(`responseId : ${responseId}`);

const priceTotal = localStorage.getItem("priceTotal");
console.log(`priceTotal : ${priceTotal}`);

const positionElement5 = document.querySelector(
    ".confirmation"
  );
  
  //La structure du code HTML
  const structureConfirmationCommande = `
  <p>Commande validée ! <br>Votre numéro de commande est : <span id="orderId">${responseId}</span> <br> <br>
    Le montant de votre commande est de :
    <span class="gras">${priceTotal}</span>€
  </p>`;

//Injection du HTML dans la pageconfirmation-commande.html
positionElement5.insertAdjacentHTML(
    "afterbegin",
    structureConfirmationCommande
  );

  if (responseId == null || priceTotal == null) {
    window.location.href = "index.html";
  }
  