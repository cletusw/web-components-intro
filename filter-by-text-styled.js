Polymer('filter-by-text-styled', {

  ready: function() {
    this.super();

    this.filterTextElement = this.shadowRoots['filter-by-text-styled'].querySelector('#filterText');
  },

  filter: function(filterText) {
    this.super(arguments);

    this.filterTextElement.textContent = filterText;
  }

});
