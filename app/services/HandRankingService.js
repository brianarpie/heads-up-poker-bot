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

      var rankOrder = [
        "A", "2", "3", "4", "5", 
        "6", "7", "8", "9", "T", 
        "J", "Q", "K", "A"
      ];

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

      function getRanks(cards) {
        return _.map(cards, function(card) {
          return card.charAt(0);
        });
      }

      function sortByRank(cards) {
        return _.sortBy(cards, function(card) {
          return rankOrder.indexOf(card.charAt(0));
        });
      }

      function checkFullHouse(cards) {
        var threeOfAkinds = [];
        var pairs = [];

        // console.log('hmm',checkXNumOfSameCard(cards, 2));
        cards = sortByRank(cards);

        var ranksOfCards = getRanks(cards).reverse();
        var cardCount = _.countBy(ranksOfCards, function(c) {
          return c;
        });
        console.log('cc', cardCount)
        // var cardCount = _.reduce(ranksOfCards, function(memo, cardRank) {
        //   if(!memo[cardRank]) memo[cardRank] = 0;

        //   memo[cardRank]++;

        //   return memo;
        // }, {});

        // _.

        _.each(cardCount, function(rankCount, rank) {
          
          if (rankCount >= 3) threeOfAkinds.push(rank);
          if (rankCount >= 2) pairs.push(rank);

        });
        console.log(threeOfAkinds, pairs)
        // if (threeOfAkinds.length && pairs.length) {
          // return [threeOfAkinds[0], pairs[0]]
        // }



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
        console.log('fullhouse', checkFullHouse(twoBoats));
      };
    }
  ]);
  
})();
