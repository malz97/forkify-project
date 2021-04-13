'use strict';
import View from './View.js';
import { RESULTS_PER_PAGE } from '../config.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(this._data.results.length / RESULTS_PER_PAGE);
    const currentPage = this._data.page;
    // Page 1 and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateNextButtonMarkup(currentPage);
    }
    // Last page
    if (currentPage === numPages && numPages > 1) {
      return this._generatePrevButtonMarkup(currentPage);
    }
    // Other page
    if (currentPage < numPages) {
      return `
        ${this._generatePrevButtonMarkup(currentPage)}
        ${this._generateNextButtonMarkup(currentPage)}
          `;
    }
    // Page 1 and there are NO other pages
    return '';
  }

  _generatePrevButtonMarkup(currentPage) {
    return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>
        `;
  }

  _generateNextButtonMarkup(currentPage) {
    return `
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
        `;
  }
}

export default new PaginationView();
