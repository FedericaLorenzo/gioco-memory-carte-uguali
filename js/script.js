function checkCouple(element1, element2) {
  if (element1.innerHTML === element2.innerHTML) {
    return true;
  } else {
    return false;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".memory-container");

  // array di immagini
  const cards = [
    "./img/memory-1.jpg",
    "./img/memory-2.jpg",
    "./img/memory-3.jpg",
    "./img/memory-4.jpg",
    "./img/memory-1.jpg",
    "./img/memory-2.jpg",
    "./img/memory-3.jpg",
    "./img/memory-4.jpg",
    "./img/memory-5.jpg",
    "./img/memory-6.jpg",
    "./img/memory-7.jpg",
    "./img/memory-8.jpg",
    "./img/memory-5.jpg",
    "./img/memory-6.jpg",
    "./img/memory-7.jpg",
    "./img/memory-8.jpg",
  ];

  function random() {
    // Math.random() genera un numero casuale tra 0 e 1 eliminando -0.5 abbiamo un numero casuale tra -0.5 e 0.5
    return Math.random() - 0.5;
  }

  // sort ordina un array usando una nostra funzione
  cards.sort(random);

  // array che conterrà gli elementi del DOM
  const cardDOM = [];

  // creiamo gli elementi nel DOM
  for (let index = 0; index < cards.length; index++) {
    const element = cards[index];
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = '<img src="' + element + '" alt="">';
    container.append(card);

    //salviamo gli elementi del DOM nell'array per riutilizzarli
    cardDOM.push(card);
  }

  //controllate in console il risultato
  console.log(cardDOM);

  const message = document.querySelector(".message");

  message.innerHTML = "Tra 3 inizierà il gioco";

  //countdown per l'inizio del gioco
  let countDown = 2;

  const setTimerID = setInterval(function () {
    message.innerHTML = "Tra " + countDown + " inizierà il gioco";
    if (countDown === 1) {
      clearInterval(setTimerID);
    }
    countDown--;
  }, 1000);

  //dopo 3 secondi, a CountDown esaurito, si mostrano le foto
  const showCardsID = setTimeout(function () {
    message.innerHTML = "";
    for (let index = 0; index < cardDOM.length; index++) {
      cardDOM[index].classList.add("active");
    }
  }, 3000);

  let cardSelected = undefined;
  let countCouples = 0;
  let counter = 0;
  //dopo 10 secondi si rimuovono le foto e a quel punto si attiva l'addEventListener per scoprire ogni coppia
  for (let index = 0; index < cardDOM.length; index++) {
    const hideCardsID = setTimeout(function () {
      cardDOM[index].classList.remove("active");

      cardDOM[index].addEventListener("click", function () {
        if (this.classList.contains("active") === false) {
          // counter++;
          if (cardSelected === undefined) {
            cardSelected = this;
            this.classList.add("active");
            message.innerHTML = "";
          } else if (checkCouple(cardSelected, this)) {
            this.classList.add("active");
            countCouples++;
            cardSelected = undefined;
            console.log(countCouples);
          } else if (!checkCouple(cardSelected, this)) {
            for (let index = 0; index < cardDOM.length; index++) {
              cardDOM[index].classList.remove("active");
            }
            cardSelected = undefined;
            message.innerHTML =
              "Prova ancora! Hai selezionato " + countCouples + " coppie";
            // counter = 0;
            countCouples = 0;
          }
          if (countCouples == 8) {
            message.innerHTML = "Hai vinto!! Gioca una nuova mano";
            //ho creato il bottone direttamente qui dentro invece che nel foglio HTML per provare createElement
            const resetButton = document.createElement("button");
            resetButton.setAttribute("id", "resetButton");
            resetButton.innerHTML = "RESET";
            container.append(resetButton);

            resetButton.addEventListener("click", function () {
              window.location.reload();
            });
          }
        }
      });
    }, 10000);
  }
});
