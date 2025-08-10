import Button from "../shared/button";
import Div from "../shared/div";
import Heading from "../shared/heading";

export default class TrelloCardsLoad {
  constructor(parentEl, stateApp, columnTitle) {
    this.parentEl = parentEl;
    this.stateApp = stateApp;
    this.columnTitle = columnTitle;

    this.delCard = this.delCard.bind(this);
  }

  bindToDOMLoad() {
    if (this.stateApp.load(this.columnTitle)) {
      this.stateApp.load(this.columnTitle).forEach((elem) => {
        this.trelloCard = new Div({ class: "trello-card" }).element;
        this.trelloCard.id = elem.id;
        this.trelloCard.setAttribute("draggable", true);
        this.trelloCardTitle = new Heading({
          class: "trello-card-title",
          text: elem.title,
          level: "3",
        }).element;
        this.btnDel = new Button({
          class: "btn-del",
          text: "X",
          type: "button",
        }).element;

        this.trelloCard.append(this.trelloCardTitle, this.btnDel);
        this.parentEl.appendChild(this.trelloCard);

        this.btnDel.addEventListener("click", this.delCard);
      });
    }
  }

  delCard(e) {
    const card = e.target.closest(".trello-card");

    this.stateApp.delete(this.columnTitle, card.id);
    this.stateApp.save();
    card.remove();
  }
}
