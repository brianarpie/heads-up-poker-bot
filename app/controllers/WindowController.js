(function() {

  "use strict";

  var app = angular.module("HeadsupPokerBotApp");

  app.controller("WindowController", ["$scope", function($scope) {

    var renderer = new PIXI.WebGLRenderer(800, 600);

    document.body.appendChild(renderer.view);

    var stage = new PIXI.Container();

    var cardTexture = PIXI.Texture.fromImage("../images/pokercard.png");
    var card = new PIXI.Sprite(cardTexture);

    card.position.x = 400;
    card.position.y = 300;

    card.scale.x = 0.2;
    card.scale.y = 0.2;

    stage.addChild(card);

    animate();

    function animate() {
      requestAnimationFrame(animate);

      card.rotation += 0.01;

      renderer.render(stage);
    }


  }]);
  
})();
