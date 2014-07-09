var FilterByTextStyledElement = (function() {

  var template = document.currentScript.previousElementSibling;
  var FilterByTextStyledProto = Object.create(FilterByTextElement.prototype);

  FilterByTextStyledProto.setupDom = function() {
    FilterByTextElement.prototype.setupDom.call(this);

    var clone = document.importNode(template.content, true);
    this.filterTextElement = clone.querySelector('.filterText');

    this.insertBefore(clone, this.firstChild);
  };

  FilterByTextStyledProto.filter = function(filterText) {
    FilterByTextElement.prototype.filter.call(this, filterText);

    this.filterTextElement.textContent = filterText;
  }

  return document.registerElement('filter-by-text-styled', {
    prototype: FilterByTextStyledProto
  });

})();
