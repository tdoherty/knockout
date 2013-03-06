/**
 * Merchant Contact Information View
 */
define(function (require) {

  var $ = require('jquery');
  var ko = require('knockout');
  var pubSub = require('ThirdParty/koPostbox');
  var ViewModelBase = require('./viewModelBase');
  var ContactInfo = require('../Models/contactInfo');
  var cTemplate = require('text!Templates/contactInfo.html');

  //use stringTemplateEngine to manage templates as strings vs. script tags
  ko.templates['contactInfo'] = cTemplate;

  //constructor function to return from module
  function ContactInfoView(options) {
    var self = this;

    self.model = new ContactInfo();

    //inherited from ViewModelBase
    self.initialize(options);

//--Event handlers------------------------------------------------------------------------------------------------------
    self.onMerchantInfoChanged = function (newValue) {
      //merge MerchantInfo model
      ko.mapping.fromJS(newValue, {}, self.model);
      pubSub.notifySubscribers('merchantInfoFetched', 'onDataMerged');
    };

    //subscribe to change notification to merge in contact info data
    pubSub.subscribe(self.onMerchantInfoChanged, self, 'onMerchantInfoFetched');
  }

  //inherit from the ViewModelBase object
  ContactInfoView.prototype = Object.create(ViewModelBase.prototype);

  //return a 'constructor' function, which can be instantiated
  return ContactInfoView;
});