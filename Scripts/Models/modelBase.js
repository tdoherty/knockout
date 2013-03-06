/**
 * Observable model prototype
 */
define(function (require) {

  var $ = require('jquery');
  var ko = require('knockout');
  ko.mapping = require('koMapping');

  //base constructor
  function ModelBase() {
    this.baseURL = '';
    this.resource = '';
  }

  //Every object that inherits from ModelBase will share this function
  ModelBase.prototype.fetch = function (mid) {
    var self = this;

    //return a jQuery.Deferred object so we can perform additional actions in the inheriting object
    return $.getJSON(self.baseURL + mid + self.resource, function (response) {
      //use the knockout mapping plugin to automatically create observables from the raw JS response
      ko.mapping.fromJS(response, {}, self);
    });
  };

  //return a 'constructor' function, which can be inherited from
  return ModelBase;
});
