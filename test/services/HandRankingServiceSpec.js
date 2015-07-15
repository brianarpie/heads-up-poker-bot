(function() {

  "use strict";

  describe('Hand Ranking Service Unit Tests', function() {

    var $rootScope, $scope;
    beforeEach(module('HeadsupPokerBotApp'));
    beforeEach(inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
    }));

    it('should pass it\'s first test', function() {
      expect(true).toBe(true);
    });

  });

})();
