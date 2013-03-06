/**
 * Merchant MerchantInformation model
 */
define(function (require) {

  var $ = require('jquery');
  var ko = require('knockout');
  var pubSub = require('ThirdParty/koPostbox');
  var utils = require('core/Utilities/utils');
  var ModelBase = require('./modelBase');

  //model constructor
  function MerchantInfo() {
    var self = this;

    this.baseURL = '/merchants/';
    this.resource = '/merchantinfo';

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
  MerchantInfo.prototype = Object.create(ModelBase.prototype);

  //override the fetch() method
  MerchantInfo.prototype.fetch = function (mid) {
    var self = this;

    //call the base fetch method, the notify subscribers
    $.when(ModelBase.prototype.fetch.call(self, mid)).then(
      function (data, textStatus, jqXHR) {
        pubSub.notifySubscribers(data, 'onMerchantInfoFetched');
      }
    );
  };

  //return a 'constructor' function, which can be instantiated
  return MerchantInfo;
});