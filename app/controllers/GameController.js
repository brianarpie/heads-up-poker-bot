(function() {

  "use strict";

  var app = angular.module("HeadsupPokerBotApp");

  app.controller("GameController", [
    "$scope",
    "$rootScope",
    "$timeout",
    function($scope, $rootScope, $timeout) {


      $scope.$on("Window::StartHand", startHand);

      // $scope.$on()

      $scope.player = {
        button: true,
        isComputer: false,
        cards: []
      };
      $scope.computer = {
        button: false,
        isComputer: true,
        cards: []
      };


      function startHand() {
        $scope.deck = createDeck();
        shuffleDeck();
        dealCards();

        console.log($scope.computer.cards);
        console.log('vs')
        console.log($scope.player.cards);
        console.log('fired!')
        $scope.$emit("Game::HandDealt", [$scope.player, $scope.computer]);
      }


      function burnCard() {
        $scope.deck.pop();
      }

      function dealCard() {
        return $scope.deck.pop();
      }

      function shuffleDeck() {
        $scope.deck = _.shuffle($scope.deck);
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

      function dealCards() {
        $scope.computer.button = !$scope.computer.button;
        $scope.player.button = !$scope.player.button;

        var firstPosition = _.findWhere([$scope.computer, $scope.player], {button: true});
        var secondPosition = _.findWhere([$scope.computer, $scope.player], {button: false});

        _(2).times(function(idx) {
          secondPosition.cards[idx] = dealCard();
          firstPosition.cards[idx] = dealCard();
        });
      }
      
      $scope.$on("Window::DealFlop", dealFlop);
      $scope.$on("Window::DealTurn", dealTurn);
      $scope.$on("Window::DealRiver", dealRiver);

      function dealFlop() {
        // burn card
        dealCard();
        $scope.flop = [dealCard(), dealCard(), dealCard()];
        $scope.$emit("Game::FlopDealt", $scope.flop);
      }

      function dealTurn() {
        // burn card
        dealCard();
        $scope.turn = [dealCard()];
        $scope.$emit("Game::TurnDealt", $scope.turn);
      }

      function dealRiver() {
        // burn card
        dealCard();
        $scope.river = [dealCard()];
        $scope.$emit("Game::RiverDealt", $scope.river);
      }
      
      function init() {

      }

      init();

    }
  ]);

})();
