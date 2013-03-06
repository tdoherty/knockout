/**
 * Merchant Header ViewModel
 */
define(function (require) {

  //module dependencies
  var $ = require('jquery');
  var ko = require('knockout');
  ko.mapping = require('koMapping');
  var pubSub = require('ThirdParty/koPostbox');
  var ViewModelBase = require('./viewModelBase');
  var MerchantInfo = require('../Models/merchantInfo');
  var mTemplate = require('text!Templates/merchantHeader.html');
  var toolTipTemplate = require('text!Templates/addressToolTip.html');

  //non-module dependencies
  require('ThirdParty/jQuery/plugins/jquery.tools.min.require');

  //use stringTemplateEngine to manage templates as strings vs. script tags
  ko.templates['merchantInfo'] = mTemplate;
  ko.templates['addressToolTip'] = toolTipTemplate;

  //constructor function to return from module
  function MerchantHeaderView(options) {
    var self = this;

    //create new model instance (observables)
    self.model = new MerchantInfo();

    //inherited from ViewModelBase
    self.initialize(options);

//--Event handlers------------------------------------------------------------------------------------------------------
    self.onAfterRender = doToolTip;

    //event handler for pub/sub subscription
    self.onContactInfoChanged = function (newValue) {
      //merge incoming data with the object's own model
      ko.mapping.fromJS(newValue, {}, self.model);
      pubSub.notifySubscribers('contactInfoFetched', 'onDataMerged');
    };

    //subscribe to change notification to merge in contact info data
    pubSub.subscribe(self.onContactInfoChanged, self, 'onContactInfoFetched');

//--Helpers-------------------------------------------------------------------------------------------------------------
    function doToolTip() {
      //call the jQuery.tools plugin
      self.$element.find('.toolTip').tooltip({
        offset: [0, 0],
        position: 'bottom center',
        effect: 'fade'
      }).dynamic({
        left: {
          direction: 'right',
          bounce: true
        },
        right: {
          direction: 'left',
          bounce: true
        },
        top: {
          direction: 'bottom',
          bounce: true
        },
        bottom: {
          direction: 'top',
          bounce: true
        }
      });
    }

  }

  //inherit from the ViewModelBase object
  MerchantHeaderView.prototype = Object.create(ViewModelBase.prototype);

  //return a 'constructor' function, which can be instantiated
  return MerchantHeaderView;
});