/**
 * Principal information observable array
 */
define(function (require) {

  // module dependencies
  var $ = require('jquery');
  var ko = require('knockout');
  var ArrayBase = require('./observableArrayBase');
  var Principal = require('../Models/principal');

  //array constructor
  function PrincipalsArray() {
    var self = this;

    self.data = ko.observableArray();

    self.baseURL = '/merchants/';
    self.resource = '/principles';
  }

  //inherit from observableArrayBase object
  PrincipalsArray.prototype = Object.create(ArrayBase.prototype);

  //all instances will share this method
  PrincipalsArray.prototype.add = function () {
    var self = this;
    var p = new Principal({});
    self.data.push(p);
    return p;
  };

  //override the prototype's fetch method to provide mapping options
  PrincipalsArray.prototype.fetch = function (mid) {
    var self = this;

    //custom mapping options, create a Principal model for each array element
    var mapping = {
      create: function (options) {
        return new Principal(options.data);
      }
    };

    //call the base fetch method, with custom mappings
    return ArrayBase.prototype.fetch.call(self, mid, mapping);
  };

  //return a 'constructor' function, which can be instantiated
  return PrincipalsArray;
});