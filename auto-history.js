Polymer('auto-history', {

  publish: {
    track: null
  },

  created: function() {
    this.history = [];
  },

  trackChanged: function(oldValue, newValue) {
    this.history.unshift(newValue);
  }

});
