/**
 * Main application viewmodel - entry point
 */
define(function (require) {

  var $ = require('jquery');
  var ko = require('knockout');
  var pubSub = require('ThirdParty/koPostbox');
  var pView = require('Views/principalsView');
  var cView = require('Views/contactInfoView');
  var mView = require('Views/merchantHeaderView');
  var Sammy = require('sammy');

  function AppView() {
    var self = this;

//--Properties----------------------------------------------------------------------------------------------------------

    //we'll use this to observe the 'Load Merchant' text box
    self.mid = ko.observable();

    self.contactInfoFetched = false;
    self.merchantInfoFetched = false;

    /** child viewmodels **/
    self.principalsVM = new pView({
      element: document.getElementById('pFieldSet')
    });
    //we can bind the principals viewmodel immediately
    ko.applyBindings(self.principalsVM, self.principalsVM.element);

    self.contactInfoVM = new cView({
      element: document.getElementById('mFieldSet')
    });

    self.merchantInfoVM = new mView({
      element: document.getElementById('profileContainer')
    });

//--Event handlers------------------------------------------------------------------------------------------------------

    //notification handler, wait until both the contact info viewmodel and merchant info viewmodel
    //have fetched their data and merged the results into an aggregate viewmodel on each
    self.onDataMerged = function (value) {
      self[value] = true;
      console.log(value + ' - fetched');
      if (this.contactInfoFetched && this.merchantInfoFetched) {
        console.log('All data fetched');
        //apply bindings when all data has been fetched and merged
        ko.applyBindings(self.contactInfoVM, self.contactInfoVM.element);
        ko.applyBindings(self.merchantInfoVM, self.merchantInfoVM.element);
        self.contactInfoVM.spin(false);
        self.merchantInfoVM.spin(false);
      }
    };

    self.onLoadMerchant = function () {
      document.location.hash = '#' + self.mid();
    };

    //subscribe to data merged event
    pubSub.subscribe(self.onDataMerged, self, 'onDataMerged');

//--Methods-------------------------------------------------------------------------------------------------------------
    self.loadMerchant = function (mid) {
        //reset flags
        self.contactInfoFetched = false;
        self.merchantInfoFetched = false;

        $.when(self.principalsVM.fetch(mid)).then(function () {
          self.principalsVM.spin(false);
        });
        self.merchantInfoVM.fetch(mid);
        self.contactInfoVM.fetch(mid);
    };

//--Helpers-------------------------------------------------------------------------------------------------------------
    // Client-side routes with Sammy.js
    this.app = Sammy(function () {
      this.get('#:mid', function () {
        self.loadMerchant(this.params.mid);
      });
    });

    //start monitoring client-side routes
    self.app.run('#1');

    //use event delegation for efficiency
    $(document).on('keyup', '#txtMID', function (e) {
      if (e.which !== 13) { return; }
      document.location.hash = '#' + self.mid();
    });

    $(document).on('click', '#headingBottom', function (e) {
      $('#profileContainer').slideToggle(function () {
        var $toggle = $(toggle);
        if ($toggle.attr('src') === 'images/uparrow.png') {
          $toggle.attr('src', 'images/downarrow.png');
        } else {
          $toggle.attr('src', 'images/uparrow.png');
        }
      });
    });
  }

  //return a 'constructor' function which can be instantiated
  return AppView;
});