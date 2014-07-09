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
    this.cachedListener = this.onListBoxSelect.bind(this);
    this.optionsContainer.addEventListener('core-select', this.cachedListener);

    this.filterText = this.getAttribute('filterText') || '';
  };

  FilterByTextProto.createdCallback = function() {
    var clone = document.importNode(template.content, true);
    this.matchCountElement = clone.querySelector('.matchCount');
    this.optionsContainer = clone.querySelector('.options');

    this.createShadowRoot().appendChild(clone);
  };

  FilterByTextProto.detachedCallback = function() {
    this.optionsContainer.removeEventListener('core-select', this.cachedListener);
  };

  FilterByTextProto.filter = function(filterText) {
    var matches = 0;

    Array.prototype.forEach.call(this.children, function(child) {
      var isMatch = child.textContent.indexOf(filterText) !== -1;
      matches += isMatch ? 1 : 0;
      child.classList.toggle('match', isMatch);
    });

    this.matchCountElement.textContent = matches;
  };

  FilterByTextProto.onListBoxSelect = function(event) {
    if (event.detail.isSelected) {
      this.dispatchEvent(new CustomEvent('change', { detail: event.detail.item }));
    }
  };

  return document.registerElement('filter-by-text', {
    prototype: FilterByTextProto
  });

})();
