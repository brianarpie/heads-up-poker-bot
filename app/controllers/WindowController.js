(function() {

  "use strict";

  var app = angular.module("HeadsupPokerBotApp");

  app.controller("WindowController", [
    "$scope",
    "$rootScope",
    "HandRankingService",
    function($scope, $rootScope, HandRankingService) {

    $scope.renderer = new PIXI.CanvasRenderer(800, 600);

    document.body.appendChild($scope.renderer.view);

    $scope.stage = new PIXI.Container();

    var backgroundTexture = PIXI.Texture.fromImage("app/images/red-gradient.jpg");
    var background = new PIXI.Sprite(backgroundTexture);
    var cardTexture = new PIXI.Texture.fromImage("app/images/pokercard.png");
    var deckTexture = new PIXI.Texture.fromImage("app/images/deck-of-cards.png");
    var card = new PIXI.Sprite(cardTexture);
    var card2 = new PIXI.Sprite(cardTexture);
    // var deck = new PIXI.Sprite(deckTexture);
    var text = new PIXI.Text('Raise',{font : '24px Arial', fill : 0xdd2210, align : 'center'});
    // _.each(function())
    // var 

    var computersCards = [
      new PIXI.Sprite(new PIXI.Texture.fromImage("app/images/card-blue.png")),
      new PIXI.Sprite(new PIXI.Texture.fromImage("app/images/card-blue.png")),
    ];
    var playerCards = [
      new PIXI.Sprite(new PIXI.Texture.fromImage("app/images/card-blue.png")),
      new PIXI.Sprite(new PIXI.Texture.fromImage("app/images/card-blue.png")),
    ];

    // var box = new PIXI.Rectangle(100, 100, 300, 300);
    // var boxTexture = new PIXI.Texture.fromCanvas(box);
    // var b = new PIXI.Sprite(boxTexture);

    // var graphicsObj = new PIXI.Graphics();
    var rect = new PIXI.Rectangle();
    rect.x = 550;
    rect.y = 550;
    rect.width = 100;
    rect.height = 100;
    // rect.beginFill(2, 1).drawRect(500, 200, 150, 150);
    // var foldButtonGraphic = new PIXI.Graphics();
    // foldButtonGraphic.beginFill(2, 1).drawRect(600, 500, 100, 100);

    // var foldButtonTexture = foldButtonGraphic.generateTexture();
    // var foldButtonSprite = new PIXI.Sprite(foldButtonTexture);
    // var txt = rect.generateTexture();
    // var box = new PIXI.Sprite(txt);
    // box.text = text;

    card.position.x = 400;
    card.position.y = 300;

    card2.position.x = 310;
    card2.position.y = 300;

    card.scale.x = 0.35;
    card.scale.y = 0.35;

    card2.scale.x = 0.35;
    card2.scale.y = 0.35;

    $scope.stage.addChild(background);
    $scope.stage.addChild(card);
    $scope.stage.addChild(card2);
    // $scope.stage.addChild(box);
    // $scope.stage.addChild(foldButtonSprite);
    $scope.stage.addChild(text);

    // $scope.$watch('computer')
    updateCards();

    function updateCards() {
      _.each(computersCards, function(card, index) {
        card.position.x = (index + 1) * 80;
        card.position.y = 50;
        card.scale.x = 1;
        card.scale.y = 1;
        $scope.stage.addChild(card);
      });

      _.each(playerCards, function(card, index) {
        card.position.x = (index + 1) * 80;
        card.position.y = 150;
        card.scale.x = 1;
        card.scale.y = 1;
        $scope.stage.addChild(card);
      });
    }
    

    rect.interactive = true;
    rect.click = function() {
      console.log('ssss');
      $scope.$broadcast("Window::StartHand");
    };

    card.interactive = true;
    card.click = function() {
      $scope.$broadcast("Window::StartHand");
      $scope.$broadcast("Window::DealFlop");
      $scope.$broadcast("Window::DealTurn");
      $scope.$broadcast("Window::DealRiver");
    };

    $scope.$on("Game::HandDealt", function(evt, players) {
      _.each(players, function(player) {
        if (player.isComputer) {
          computersCards = [
            new PIXI.Sprite(new PIXI.Texture.fromImage("app/images/"+player.cards[0]+".png")),
            new PIXI.Sprite(new PIXI.Texture.fromImage("app/images/"+player.cards[1]+".png"))
          ];
        } else {
          playerCards = [
            new PIXI.Sprite(new PIXI.Texture.fromImage("app/images/"+player.cards[0]+".png")),
            new PIXI.Sprite(new PIXI.Texture.fromImage("app/images/"+player.cards[1]+".png"))
          ];
        }
      });

      updateView();
    });

    $scope.$on("Game::FlopDealt", function(evt, cards) {
      showFlop(cards);
    });

    $scope.$on("Game::TurnDealt", function(evt, card) {
      showTurn(card);
    });

    $scope.$on("Game::RiverDealt", function(evt, card) {
      showRiver(card);
    });
    
    function showFlop(cards) {
      _.each(cards, function(card, index) {
        card = new PIXI.Sprite(new PIXI.Texture.fromImage("app/images/"+card+".png"));
        card.position.x = (index + 1) * 80;
        card.position.y = 250;
        card.scale.x = 1;
        card.scale.y = 1;
        $scope.stage.addChild(card);
      });
    }

    function showTurn(card) {
      var turn = new PIXI.Sprite(new PIXI.Texture.fromImage("app/images/"+card+".png"));
      turn.position.x = 320;
      turn.position.y = 250;
      turn.scale.x = 1;
      turn.scale.y = 1;
      $scope.stage.addChild(turn);
    }

    function showRiver(card) {
      var river = new PIXI.Sprite(new PIXI.Texture.fromImage("app/images/"+card+".png"));
      river.position.x = 400;
      river.position.y = 250;
      river.scale.x = 1;
      river.scale.y = 1;
      $scope.stage.addChild(river);
    }

    function updateView() {
      console.log('update that shit!');
      updateCards();
    }

    // foldButtonSprite.click = function() {
      // console.log('something diff');
    // };

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

    // HandRankingService.figureOutWinner("a", "b", "c");

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
    }

    function dealCard() {
      return $scope.deck.pop();
    }

    function resetDeck() {
      $scope.deck = createDeck();
    }
    
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
