/**
 * Observable array wrapper object prototype, provides
 * a default fetch method to retrieve data from server
 */
define(function (require) {

  var $ = require('jquery');
  var ko = require('knockout');
  ko.mapping = require('koMapping');

  function ArrayBase() {
    this.baseURL = '';
    this.resource = '';

    this.data = ko.observableArray();
  }

//Every instance that inherits from ArrayBase will share these functions------------------------------------------------
  ArrayBase.prototype.fetch = function (mid, mapping) {
    var self = this;

    //return a jQuery.Deferred object, so additional actions can be performed by derived objects
    return $.getJSON(self.baseURL + mid + self.resource, function (response) {
      // use the knockout mapping plugin to automatically create observables from raw JS object
      // pass a mapping options object for custom mapping
      ko.mapping.fromJS(response, mapping || {}, self.data);
    });
  };

  //return a 'constructor' function, which can be inherited from
  return ArrayBase;
});
