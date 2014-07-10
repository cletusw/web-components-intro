Polymer('filter-by-text-styled', {

  filter: function(filterText) {
    this.super(arguments);

    this.$.filterText.textContent = filterText;
  }

});
