angular.module('refrontier.controllers', ['ionic', 'refrontier.services'])



/* Controller for the discover page */
.controller('DiscoverCtrl', function($scope, $timeout, User, Recommendations) {
  Recommendations.getNextApartments()
    .then(function() {
      $scope.currentApartment = Recommendations.queue[0];
    });

    // fired when we favorite / skip a song.
 	$scope.sendFeedback = function(bool) {
    if (bool) User.addApartmentToFavorites($scope.currentApartment);

    // set variable for the correct animation sequence
    $scope.currentApartment.rated = bool;
    $scope.currentApartment.hide = true;

    Recommendations.nextApartment();

    $timeout(function() {

      $scope.currentApartment = Recommendations.queue[0];
    

    }, 250);
  }

  $scope.nextApartmentImg = function() {
    if (Recommendations.queue.length > 1) {
      return Recommendations.queue[1].image_large;
    }

    return '';
  }

})


/* Controller for the favorites page */
.controller('FavoritesCtrl', function($scope, User) {
  $scope.favorites = User.favorites;

  $scope.removeApartment = function(apartment, index) {
    User.removeApartmentFromFavorites(apartment, index); 
  }
})


/* Controller for our tab bar */
.controller('TabsCtrl', function($scope) {

});