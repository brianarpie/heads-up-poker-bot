(function() {

  "use strict";

  var app = angular.module("HeadsupPokerBotApp");

  app.service("HandRankingService", [
    function() {
      var rankings = {
        royal_flush: {
          verify: function(cards) {

          }
        }
      };

      var rankOrder = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];

      function checkStraight(cards) {
        var ranks = [];
        var straightHighCard = undefined;

        ranks = _.map(cards, function(card) {
          return card.charAt(0);
        });

        _(10).times(function(n) {
          if (
            _.contains(ranks, rankOrder[n]) &&
            _.contains(ranks, rankOrder[n + 1]) &&
            _.contains(ranks, rankOrder[n + 2]) &&
            _.contains(ranks, rankOrder[n + 3]) &&
            _.contains(ranks, rankOrder[n + 4])
             ) {
            straightHighCard = rankOrder[n + 4];
          }
        });

        return straightHighCard;
      }

      function madeHandHighCard(hand) {

      }

      function checkXNumOfSameCard(cards, x) {
        var ranks = _.map(cards, function(card) {
          return card.charAt(0);
        });
        var cardCounter = {};
        var xNumOfCardsRanks = [];

        _.each(ranks, function(rank) {
          if (!cardCounter[rank])
            cardCounter[rank] = 0;

          cardCounter[rank]++;
        });

        _.each(cardCounter, function(count, rank) {
          if (count === x)
            xNumOfCardsRanks.push(rank);
        });

        return xNumOfCardsRanks;
      }

      function check3OfAKind(cards) {

      }

      // function check4OfAKind(cards) {
      //   var ranks = _.map(cards, function(card) {
      //     return card.charAt(0);
      //   });
      //   var fourOfAKindRank = undefined;
      //   var rankCounter = {};
      //   _.each(ranks, function(rank) {
      //     if(!rankCounter[rank])
      //       rankCounter[rank] = 0;

      //     rankCounter[rank]++; 
      //   });
      //   _.each(rankCounter, function(count, rank) {
      //     if (count === 4) {
      //       fourOfAKindRank = rank;
      //     }
      //   });

      //   return fourOfAKindRank;
      // }

      function checkFlush(cards) {
        var suitCounter = {
          s: 0,
          h: 0,
          c: 0,
          d: 0
        };

        _.each(cards, function(card) {
          suitCounter[card.charAt(1)]++;
        });

        return _.find(suitCounter, function(suit) {
          return suit >= 5;
        });
      }
 
      // returns 
      this.figureOutWinner = function(handA, handB, board) {
        // these functions should return the cards that make up the 
        // hand so that the hand can be further processed
        // or.. need to figure out a way to handle edge cases
        // with boats and/or straightflushes (combo hands)
        var flushHand = ["As", "Jc", "Kc", "Kc", "Td", "9c", "2c"];
        var straightHand = ["7s", "4c", "2s", "5d", "3h", "6d", "Ks"];
        var fourOfAKind = ["4s", "4c", "4d", "4h", "5h", "6d"];
        var twoPair = ["3s", "3d", "Ah", "As"];
        // var straightFlush = ["2s", "3s", ""];
        var twoBoats = ["Ac", "Ad", "As", "6d", "6c", "6s"];
        // console.log(checkFlush(flushHand));
        // console.log(checkStraight(straightHand));
        console.log(checkXNumOfSameCard(fourOfAKind, 4));
        console.log(checkXNumOfSameCard(twoPair, 2));
        console.log(checkXNumOfSameCard(twoBoats, 3));
      };
    }
  ]);
  
})();
