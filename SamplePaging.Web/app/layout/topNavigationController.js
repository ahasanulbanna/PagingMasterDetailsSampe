
(function () {
  "use strict";
  var controllerId = 'TopNavigationController';

  angular
    .module("app")
    .controller(controllerId, [TopNavigationController]);

  function TopNavigationController() {
    var vm = this;
  }

}());
