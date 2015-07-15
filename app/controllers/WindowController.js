(function() {

  "use strict";

  var app = angular.module("HeadsupPokerBotApp");

  app.controller("WindowController", [
    "$scope",
    "HandRankingService",
    function($scope, HandRankingService) {

    $scope.renderer = new PIXI.CanvasRenderer(800, 600);

    document.body.appendChild($scope.renderer.view);

    $scope.stage = new PIXI.Container();

    var backgroundTexture = PIXI.Texture.fromImage("app/images/red-gradient.jpg");
    var background = new PIXI.Sprite(backgroundTexture);
    var cardTexture = new PIXI.Texture.fromImage("app/images/pokercard.png");
    var card = new PIXI.Sprite(cardTexture);
    // var box = new PIXI.Rectangle(100, 100, 300, 300);
    // var boxTexture = new PIXI.Texture.fromCanvas(box);
    // var b = new PIXI.Sprite(boxTexture);

    var graphicsObj = new PIXI.Graphics();
    var rect = graphicsObj.beginFill(2, 1).drawRect(25, 25, 100, 100);
    var txt = rect.generateTexture();
    var box = new PIXI.Sprite(txt);

    card.position.x = 400;
    card.position.y = 300;

    card.scale.x = 0.1;
    card.scale.y = 0.1;

    $scope.stage.addChild(background);
    $scope.stage.addChild(card);
    $scope.stage.addChild(box);

    card.interactive = true;
    card.click = function() {
      console.log('ssss');
    };

    $scope.deck = createDeck();
    shuffleDeck();

    var player = {
      button: true,
      cards: []
    };
    var computer = {
      button: false,
      cards: []
    };

    newHand();

    console.log(player.cards);
    console.log(computer.cards);

    HandRankingService.figureOutWinner("a", "b", "c");

    var rankings = {

    };

    function newHand() {
      shuffleDeck();

      computer.button = !computer.button;
      player.button = !player.button;

      var firstPosition = _.findWhere([computer, player], {button: true});
      var secondPosition = _.findWhere([computer, player], {button: false});

      _(2).times(function() {
        secondPosition.cards.push(dealCard());
        firstPosition.cards.push(dealCard());
      });
    }

    function createDeck() {
      var ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
      var suits = ["h", "s", "d", "c"];
      var deck = [];

      _.each(ranks, function(rank) {
        _.each(suits, function(suit) {
          deck.push(rank+suit);
        });
      });

      return deck;
    }


    // Fisher-Yates Shuffle
    function shuffleDeck() {
      $scope.deck = _.shuffle($scope.deck);
      // var currentIndex = $scope.deck.length;
      // var tempValue;
      // var randomIndex;

      // // while cards left to shuffle
      // while(currentIndex !== 0) {

      //   // pick a random card
      //   randomIndex = Math.floor(Math.random() * currentIndex);
      //   currentIndex -= 1;

      //   // swap it with the current card location
      //   tempValue = $scope.deck[currentIndex];
      //   $scope.deck[currentIndex] = $scope.deck[randomIndex];
      //   $scope.deck[randomIndex] = tempValue;

      // }
    }

    function dealCard() {
      return $scope.deck.pop();
    }

    function resetDeck() {
      $scope.deck = createDeck();
    }
    
    // TOP LEVEL KNOWLEDGE
    // the deck of cards
    // the players cards
    // whose turn it is
    // whose 

    // animate();
    show();

    function show() {
      requestAnimationFrame(show);
      $scope.renderer.render($scope.stage);
    }

    function animate() {
      requestAnimationFrame(animate);

      card.rotation += 0.01;

      $scope.renderer.render($scope.stage);
    }


  }]);
  
})();
