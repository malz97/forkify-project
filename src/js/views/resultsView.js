'use strict';
import PreviewView from './previewView.js';

class ResultsView extends PreviewView {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No results found for your query! Please try again!';
  _message = '';
}

export default new ResultsView();
