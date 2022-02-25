export class Modal {
  constructor(contentId, fallbackTxt) {
    this.contentTemplateEl = document.getElementById(contentId); //selects the content to be displayed in the modal
    this.modalTemplateEl = document.getElementById('modal-template'); //selects the modal template itself
    this.fallbackTxt = fallbackTxt;
  }

  show() {
    if ('content' in document.createElement('template')) {
      //checks if the browser supports the template tag (the 'in' keyword checks if the property 'content' exists in the template object created)
      const modalElements = document.importNode(
        this.modalTemplateEl.content,
        true
      ); //use importNode to get use the content of a template and create a node based on it (true to make a deep clone "clone childs");
      this.modalEl = modalElements.querySelector('.modal');
      this.backdropEl = modalElements.querySelector('.backdrop');
      const contentElement = document.importNode(
        this.contentTemplateEl.content,
        true
      ); //Creates a deep clone of a node based on the content of the template
      this.modalEl.appendChild(contentElement); //appendChild for better browser support
      document.body.insertAdjacentElement('afterbegin', this.modalEl); //inserts both the modal and the backdrop adjacent to the body
      document.body.insertAdjacentElement('afterbegin', this.backdropEl);
    } else {
      //fallback code
      alert(this.fallbackTxt);
    }
  }

  hide() {
  if (this.modalEl) {
      document.body.removeChild(this.modalEl); //removeChild for better browser support
    //   this.modalEl.remove();
    document.body.removeChild(this.backdropEl);
    this.modalEl = null;
    this.backdropEl = null; //Setting properties to null so it can be "garbage collected"
  }
  }
}
