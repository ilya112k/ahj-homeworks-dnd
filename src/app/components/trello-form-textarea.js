import Button from "../shared/button";
import Div from "../shared/div";
import Form from "../shared/form";
import Textarea from "../shared/textarea";
import TrelloCard from "./trello-card";

export default class TrelloFormTextarea {
  constructor(parentEl, stateApp, columnTitle) {
    this.parentEl = parentEl;
    this.stateApp = stateApp;
    this.columnTitle = columnTitle;

    this.onSubmit = this.onSubmit.bind(this);
  }

  bindToDOM() {
    this.form = new Form({
      classes: ["trello-form", "trello-form_hidden"],
    }).element;
    this.textarea = new Textarea({
      class: "trello-textarea",
      placeholder: "Enter a title for this card...",
    }).element;
    this.containerBtns = new Div({ class: "btns-container" }).element;
    this.btnAdd = new Button({
      class: "btn-add",
      text: "Add card",
      type: "submit",
    }).element;
    this.btnReset = new Button({
      class: "btn-reset",
      text: "X",
      type: "reset",
    }).element;

    this.containerBtns.append(this.btnAdd, this.btnReset);
    this.form.append(this.textarea, this.containerBtns);

    this.parentEl.appendChild(this.form);

    this.btnReset.addEventListener("click", this.onClick);
    this.form.addEventListener("submit", this.onSubmit);
  }

  onSubmit(e) {
    e.preventDefault();
    const trelloCard = new TrelloCard(
      this.parentEl.previousSibling,
      this.textarea.value,
      this.stateApp,
      this.columnTitle,
    );
    trelloCard.bindToDOM();
    e.target.reset();
  }

  onClick(e) {
    const form = e.target.closest(".trello-form");
    const addBtn = form.previousSibling;

    addBtn.classList.toggle("btn-add-form_hidden");
    form.classList.toggle("trello-form_hidden");
  }
}
