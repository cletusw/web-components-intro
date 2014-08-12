var FilterByTextElement = (function() {

  var template = document.currentScript.previousElementSibling;
  var FilterByTextProto = Object.create(HTMLElement.prototype, {
    filterText: {
      get: function() {
        return this._filterText;
      },
      set: function(newValue) {
        this._filterText = newValue;

        this.filter(newValue);
      },
      enumerable: true,
      configurable: true
    }
  });

  FilterByTextProto.attachedCallback = function() {
    this.setupDom();

    this.filterText = this.getAttribute('filterText') || '';
  };

  FilterByTextProto.setupDom = function() {
    var fragment = document.createDocumentFragment();

    while (this.childNodes.length > 0) {
      fragment.appendChild(this.childNodes[0]);
    }

    var clone = template.content.cloneNode(true);
    this.matchCountElement = clone.querySelector('.matchCount');
    this.optionsContainer = clone.querySelector('.options');

    this.optionsContainer.appendChild(fragment);
    this.appendChild(clone);
  };

  FilterByTextProto.filter = function(filterText) {
    var matches = 0;

    Array.prototype.forEach.call(this.optionsContainer.children, function(child) {
      var isMatch = child.textContent.indexOf(filterText) !== -1;
      matches += isMatch ? 1 : 0;
      child.classList.toggle('match', isMatch);
    });

    this.matchCountElement.textContent = matches;
  };

  return document.registerElement('filter-by-text', {
    prototype: FilterByTextProto
  });

})();
