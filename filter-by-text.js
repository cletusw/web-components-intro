var FilterByText = (function() {

  function create() {
    Object.defineProperty(this, 'filterText', {
      get: function() {
        return this._filterText;
      },
      set: function(newValue) {
        this._filterText = newValue;

        filter.call(this, newValue);
      },
      enumerable: true,
      configurable: true
    });

    setupDom.call(this);

    this.filterText = this.getAttribute('filterText') || '';
  }

  function setupDom() {
    var fragment = document.createDocumentFragment();

    while (this.childNodes.length > 0) {
      fragment.appendChild(this.childNodes[0]);
    }

    this.innerHTML = '<div><span class="matchCount">0</span> matches</div><section class="options"></section>';
    this.matchCountElement = this.querySelector('.matchCount');
    this.optionsContainer = this.querySelector('.options');

    this.optionsContainer.appendChild(fragment);
  }

  function filter(filterText) {
    var matches = 0;

    Array.prototype.forEach.call(this.optionsContainer.children, function(child) {
      var isMatch = child.textContent.indexOf(filterText) !== -1;
      matches += isMatch ? 1 : 0;
      child.classList.toggle('match', isMatch);
    });

    this.matchCountElement.textContent = matches;
  }

  return function(element) {
    create.call(element);
  };

})();
