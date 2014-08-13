Polymer('filter-by-text', {

  attached: function() {
    this.cachedListener = this.onListBoxSelect.bind(this);
    this.optionsContainer.addEventListener('core-select', this.cachedListener);

    this.filterText = this.getAttribute('filterText') || '';
  },

  ready: function() {
    this.matchCountElement = this.shadowRoots['filter-by-text'].querySelector('#matchCount');
    this.optionsContainer = this.shadowRoots['filter-by-text'].querySelector('#options');
  },

  detached: function() {
    this.optionsContainer.removeEventListener('core-select', this.cachedListener);
  },

  filter: function(filterText) {
    var matches = 0;

    Array.prototype.forEach.call(this.children, function(child) {
      var isMatch = child.textContent.indexOf(filterText) !== -1;
      matches += isMatch ? 1 : 0;
      child.classList.toggle('match', isMatch);
    });

    this.matchCountElement.textContent = matches;
  },

  filterTextChanged: function(oldValue, newValue) {
    this.filter(newValue);
  },

  onListBoxSelect: function(event) {
    if (event.detail.isSelected) {
      this.dispatchEvent(new CustomEvent('change', { detail: event.detail.item }));
    }
  }

});
