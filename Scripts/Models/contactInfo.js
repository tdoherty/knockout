/**
 * Merchant ContactInformation model
 */
define(function (require) {

  var $ = require('jquery');
  var ko = require('knockout');
  var pubSub = require('ThirdParty/koPostbox');
  var ModelBase = require('./modelBase');
  var utils = require('core/Utilities/utils');

  //model constructor
  function ContactInfo() {
    var self = this;

    this.baseURL = '/merchants/';
    this.resource = '/contactinfo';

    //computed observables, with deferred evaluation - computed properties
    // don't exist until first returned from server
    this.OpenDate = ko.computed({
      read: function () {
        var output = null;
        if (self.DateOpened()) {
          output = utils.shortDate(utils.parseDotNetJSONDate(self.DateOpened()));
        }
        return output;
      },
      deferEvaluation: true
    });
    this.CloseDate = ko.computed({
      read: function () {
        var output = null;
        if (self.DateClosed()) {
          output = utils.shortDate(utils.parseDotNetJSONDate(self.DateClosed()));
        }
        return output;
      },
      deferEvaluation: true
    });
  }

  //inherit from ModelBase
  ContactInfo.prototype = Object.create(ModelBase.prototype);

  //override fetch method
  ContactInfo.prototype.fetch = function (mid) {
    var self = this;

    //call the parent fetch method, then notify subscribers
    $.when(ModelBase.prototype.fetch.call(self, mid)).then(
      function (data, textStatus, jqXHR) {
        pubSub.notifySubscribers(data, 'onContactInfoFetched');
      }
    );
  };

  //return a 'constructor' function, which can be instantiated
  return ContactInfo;
});