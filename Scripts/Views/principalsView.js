/**
 * Principals ViewModel
 */
define(function (require) {

  //module dependencies
  var $ = require('jquery');
  var ko = require('knockout');
  ko.mapping = require('ThirdParty/knockout.mapping-latest');
  var ViewModelBase = require('./viewModelBase');
  var Principals = require('../Collections/principalCollection');
  var pTemplate = require('text!Templates/principal.html');
  var pAETemplate = require('text!Templates/principalAddEdit.html');

  //use stringTemplateEngine to manage templates as strings vs. script tags
  ko.templates['principals'] = pTemplate;
  ko.templates['principalAE'] = pAETemplate;

  //constructor function for our view model
  function PrincipalsViewModel(options) {
    var self = this;
    var revertPrincipal = ko.observable();

//--Properties----------------------------------------------------------------------------------------------------------
    self.sortField = '';
    self.isAdd = false;
    self.model = new Principals();
    self.currentPrincipal = ko.observable();

    //inherited from ViewModelBase
    self.initialize(options);

//--Event handlers------------------------------------------------------------------------------------------------------

    //callback for post-render functionality
    self.onAfterRender = function (elements) {
      normalizeWidths();
    };

    self.onAddPrincipal = function () {
      self.isAdd = true;
      self.currentPrincipal(self.model.add());
    };

    self.onEditPrincipal = function (principal) {
      //clone the observable for reverting on cancel
      revertPrincipal(ko.mapping.fromJS(ko.toJS(principal)));
      self.currentPrincipal(principal);
    };

    self.onRemovePrincipal = function (principal) {
      if (confirm('Are you sure?')) {
        //annotates the model with a '_destroy' property set to true,
        //intended to allow bulk submission then deletion on server
        self.model.data.destroy(principal);
      }
    };

    self.onCancel = function (principal) {
      var pArray = self.model.data;
      var pIndex = pArray.indexOf(principal);

      if (self.isAdd) {
        //this was an add operation, remove the new array member
        pArray.remove(principal);
        self.isAdd = false;
      } else {
        //revert to previous values
        pArray.replace(pArray()[pIndex], ko.mapping.fromJS(ko.toJS(revertPrincipal)));
      }
      self.currentPrincipal(null);
    };

    self.onSaveClick = function () {
      self.currentPrincipal(null);
      self.isAdd = false;
    };

    self.onSort = function (data, event) {
      var $target = $(event.currentTarget);
      var $sortIndicator = $target.find('.sort-indicator');
      var sortDir = $sortIndicator.hasClass('sort-indicator-asc') ? 'asc' : 'desc';
      var sortFunction = $sortIndicator.hasClass('sort-indicator-asc') ? sortDesc : sortAsc;
      var aClass = sortDir === 'asc' ? 'sort-indicator-desc' : 'sort-indicator-asc';
      var rClass = sortDir === 'asc' ? 'sort-indicator-asc' : 'sort-indicator-desc';

      self.sortField = $target.attr('class');
      self.model.data.sort(sortFunction);

      self.$element.find('.sort-indicator').removeClass('sort-indicator-desc').removeClass('sort-indicator-asc');
      $sortIndicator.addClass(aClass);
      $sortIndicator.removeClass(rClass);
    };

//--Methods-------------------------------------------------------------------------------------------------------------
    self.doDefaultSort = function () {
      self.sortField = 'FirstName';
      self.model.data.sort(sortAsc);
      self.$element.find('.sort-indicator').removeClass('sort-indicator-desc').removeClass('sort-indicator-asc');
      self.$element.find('.sort-indicator').first().addClass('sort-indicator-asc');
    };

//--Helpers-------------------------------------------------------------------------------------------------------------
    //resize all field divs to max width for each field
    function normalizeWidths() {
      var maxWidth = 0;
      var totalWidth = 0;
      var $principal = $('.principal:first');
      var className;
      var $className;

      $principal.find('div').each(function (index, value) {
        className = $(value).attr('class');
        $className = $("." + className);
        maxWidth = 0;
        $className.each(function () {
          if ($(this).width() > maxWidth) {
            maxWidth = $(this).width();
          }
        });
        $className.width(maxWidth);
        totalWidth += $className.outerWidth();
      });
      $('#pList').width(totalWidth);
    }

    function sortAsc(left, right) {
      var fieldName = self.sortField;
      return left[fieldName]() === right[fieldName]() ? 0 : (left[fieldName]() < right[fieldName]() ? -1 : 1);
    }

    function sortDesc(left, right) {
      var fieldName = self.sortField;
      return left[fieldName]() === right[fieldName]() ? 0 : (left[fieldName]() < right[fieldName]() ? 1 : -1);
    }
  }

  //inherit from the ViewModelBase object
  PrincipalsViewModel.prototype = Object.create(ViewModelBase.prototype);

  //override fetch to sort response
  PrincipalsViewModel.prototype.fetch = function (mid) {
      var self = this;

      //call the base fetch method
      return $.when(ViewModelBase.prototype.fetch.call(self, mid)).then(self.doDefaultSort);
    };

  //return a 'constructor' function, which can be instantiated
  return PrincipalsViewModel;
});