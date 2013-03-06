/**
 * Base viewmodel object from which we can inherit generic functionality like spinner, etc
 */
define(function (require) {

  //module dependencies
  var $ = require('jquery');
  var ko = require('knockout');

  //non-module dependencies
  require('ThirdParty/Spin/spinjQueryRequire');

  function ViewModelBase() {
    var $element;
    this.element = undefined;

    this.$element = function () {
      if (!$element) {
        $element = $(this.element);
      }
      return $element;
    }
  }

//Every instance that inherits from ViewModelBase will share these functions--------------------------------------------
  ViewModelBase.prototype.initialize = function (options) {
    var self = this;
    self.element = (options ? options.element ? options.element : undefined : undefined);
    self.$element = (options ? options.element ? $(options.element) : undefined : undefined);
  };

  ViewModelBase.prototype.spin = function (spin) {
    var self = this;

    if (self.element === undefined) {
      return;
    }
    if (spin === undefined) {
      spin = true;
    }
    //use Spin.js to render a CSS3 spinner
    self.$element.spin(spin ? { color: '#196BAF', bgColor: 'gray', opacity: 4 } : false);
  };

  ViewModelBase.prototype.fetch = function (mid) {
    var self = this;
    if (!self.model) {
      return;
    }

    self.spin();
    return self.model.fetch(mid);
  };

  //return a 'constructor' function, which can be inherited from
  return ViewModelBase;
});
