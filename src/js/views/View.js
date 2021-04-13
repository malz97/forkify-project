'use strict';
import icons from 'url:../../img/icons.svg';
/**
 * @classdesc An abstraction class from which all other views inherit from.
 */
export default class View {
  _parentElement = document.querySelector('.recipe');
  _data;
  /**
   * Renders data passed in to the DOM
   * @param {Object} data An object that is to be rendered, e.g. recipe object, bookmark, etc.
   * @this {View} Refers to instance of View object

   */
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Creates a new DOM with passed in data. New DOM is compared to current DOM, current DOM is
   * changed to update it according to differences from new DOM.
   * @param {Object} data Object that provides data, e.g. recipe object
   */
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = [...newDOM.querySelectorAll('*')];
    const currentElements = [...this._parentElement.querySelectorAll('*')];

    newElements.forEach((newElement, i) => {
      const currentElement = currentElements[i];
      if (
        !newElement.isEqualNode(currentElement) &&
        newElement.firstChild?.nodeValue.trim() !== ''
      ) {
        currentElement.textContent = newElement.textContent;
      }

      if (!newElement.isEqualNode(currentElement))
        [...newElement.attributes].forEach(attribute =>
          currentElement.setAttribute(attribute.name, attribute.value)
        );
    });
  }

  renderSpinner() {
    const html = `
  <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}
