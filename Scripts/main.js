require.config({
  priority:['polyFill'],
  paths:{
    'jquery':'thirdParty/jQuery/1.7.1/jquery-1.7.1.min',
    'ThirdParty':'thirdParty',
    'knockout':'thirdParty/knockout-2.1.0',
    'koMapping':'ThirdParty/knockout.mapping-latest',
    'core':"//localhost/ipayment.core.javascript/Scripts/Core",
    'sammy':'ThirdParty/sammy'
  },
  shim:{ //for libraries that do not implement AMD
    'sammy':{
      deps:['jquery'],
      exports:'Sammy'
    }
  }
});

// application entry point
require(
  [   //direct dependencies
    'jquery',
    'knockout',
    'Views/appView',
    'thirdParty/stringTemplateEngine',
    'polyFill'
  ],
  function ($, ko, AppView) {
    $(function () {
      var appView = new AppView();
      //specify the element to which bindings should be applied (default is entire document)
      ko.applyBindings(appView, document.getElementById('headingContainer'));
    });
  }
);