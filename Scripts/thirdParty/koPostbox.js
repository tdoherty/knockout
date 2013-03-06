/**
 * Knockout subscribable, more or less analogous to Backbone.Events
 */
define(function (require) {

    //module dependencies
    var ko = require('knockout');

    //since this module will only be evaluated once, this should effectively
    //result in a singleton object we can use throughout the app.
    return new ko.subscribable();
});
