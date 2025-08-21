import "../../css/trello-card.css";

import Button from "../shared/button";
import Div from "../shared/div";
import Heading from "../shared/heading";

export default class TrelloCard {
  constructor(parentEl, textTextarea, stateApp, columnTitle) {
    this.parentEl = parentEl;
    this.textTextarea = textTextarea;
    this.stateApp = stateApp;
    this.columnTitle = columnTitle;

    this.delCard = this.delCard.bind(this);
  }

  bindToDOM() {
    this.trelloCard = new Div({ class: "trello-card" }).element;

    this.trelloCard.id = Math.round(performance.now());
    this.trelloCard.setAttribute("draggable", true);

    this.trelloCardTitle = new Heading({
      class: "trello-card-title",
      text: this.textTextarea,
      level: "3",
    }).element;
    this.btnDel = new Button({
      class: "btn-del",
      text: "X",
      type: "button",
    }).element;

    this.trelloCard.append(this.trelloCardTitle, this.btnDel);

    this.parentEl.append(this.trelloCard);

    this.stateApp.addCard(this.columnTitle, {
      id: this.trelloCard.id,
      title: this.trelloCardTitle.textContent,
    });
    this.stateApp.save();

    this.btnDel.addEventListener("click", this.delCard);
  }

  delCard(e) {
    const card = e.target.closest(".trello-card");

    this.stateApp.delete(this.columnTitle, card.id);
    this.stateApp.save();
    card.remove();
  }
}
