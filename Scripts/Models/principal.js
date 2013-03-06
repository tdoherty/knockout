/**
 * Merchant PrincipalInformation model
 */
define(function (require) {

  // module dependencies
  var ko = require('knockout');
  var utils = require('core/Utilities/utils');

  //model constructor, pass an empty object ({}) for a blank model
  return function (data) {
    this.PrincipleID = ko.observable(data.PrincipleID || null);
    this.FirstName = ko.observable(data.FirstName || null);
    this.LastName = ko.observable(data.LastName || null);
    this.Address = ko.observable(data.Address || null);
    this.City = ko.observable(data.City || null);
    this.State = ko.observable(data.State || null);
    this.Zip = ko.observable(data.Zip || null);
    this.PhoneNumber = ko.observable(data.PhoneNumber || null);
    //convert .NET "JSON-ized" dates to date string, using ipayment.core.javascript utils module
    this.BirthDate = ko.observable(data.BirthDate ? utils.shortDate(utils.parseDotNetJSONDate(data.BirthDate)) : data.BirthDate || null);
    this.JobTitle = ko.observable(data.JobTitle || null);
    this.DriversLicenseNumber = ko.observable(data.DriversLicenseNumber || null);
    this.DriversLicenseState = ko.observable(data.DriversLicenseState || null);
    this.SocialSecurityNumber = ko.observable(data.SocialSecurityNumber || null);
    this.OwnershipPercentage = ko.observable(data.OwnershipPercentage || null);
    this.AuthorizedSigner = ko.observable(data.AuthorizedSigner || null);
    this.Active = ko.observable(data.Active || null);
  };

});