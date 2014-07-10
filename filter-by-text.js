Polymer('filter-by-text', {

  matchCount: 0,

  attached: function() {
    this.cachedListener = this.onListBoxSelect.bind(this);
    this.$.options.addEventListener('core-select', this.cachedListener);

    this.filterText = this.getAttribute('filterText') || '';
  },

  detached: function() {
    this.$.options.removeEventListener('core-select', this.cachedListener);
  },

  filter: function(filterText) {
    var matches = 0;

    Array.prototype.forEach.call(this.children, function(child) {
      var isMatch = child.textContent.indexOf(filterText) !== -1;
      matches += isMatch ? 1 : 0;
      child.classList.toggle('match', isMatch);
    });

    this.matchCount = matches;
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
