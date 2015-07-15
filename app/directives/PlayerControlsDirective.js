(function() {

  "use strict";

  var app = angular.module("HeadsupPokerBotApp");

  app.directive("playerControls", [
    function() {
      
      function link($scope, $element, $attrs) {
        // console.log("it works");
        var box = new PIXI.Rectangle(10, 10, 200, 200);
        $scope.container.addChild(box);
        // $scope.renderer.render($scope.stage);
      }

      return {
        restrict: "E",
        // transclude: true,
        scope: {
          container: "=",
          renderer: "="
        },
        link: link,
        templateUrl: "app/templates/_player_controls.html"
      };

    }
  ]);
  
})();
