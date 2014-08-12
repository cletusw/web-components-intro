var FilterByTextStyledElement = (function() {

  var FilterByTextStyledProto = Object.create(FilterByTextElement.prototype);

  FilterByTextStyledProto.setupDom = function() {
    FilterByTextElement.prototype.setupDom.call(this);

    var div = document.createElement('div');
    div.innerHTML = 'Searching for "<span class="filterText"></span>"';
    this.filterTextElement = div.querySelector('.filterText');

    this.insertBefore(div, this.firstChild);
  };

  FilterByTextStyledProto.filter = function(filterText) {
    FilterByTextElement.prototype.filter.call(this, filterText);

    this.filterTextElement.textContent = filterText;
  }

  return document.registerElement('filter-by-text-styled', {
    prototype: FilterByTextStyledProto
  });

})();
