Polymer('filter-by-text', {

  matchCount: 0,

  attached: function() {
    this.filterText = this.getAttribute('filterText') || '';
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
