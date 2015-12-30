angular.module('refrontier.controllers', ['ionic', 'refrontier.services'])


/*
Controller for the discover page
*/
.controller('DiscoverCtrl', function($scope, $ionicLoading, $timeout, User, Recommendations) {
  // helper functions for loading
  var showLoading = function() {
    $ionicLoading.show({
      template: '<i class="ion-loading-c"></i>',
      noBackdrop: true
    });
  }

  var hideLoading = function() {
    $ionicLoading.hide();
  }

  // set loading to true first time while we retrieve songs from server.
  showLoading();

  Recommendations.getNextApartments()
    .then(function(){
      $scope.currentApartment = Recommendations.queue[0];
      return Recommendations.playCurrentApartment();

    })
    .then(function(){
      // hide loading icon after recommendations icons are called
      hideLoading();
      //TODO
      $scope.currentApartment.loaded = 

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

})


/*
Controller for the favorites page
*/
.controller('FavoritesCtrl', function($scope, User) {
  $scope.favorites = User.favorites;

  $scope.removeApartment = function(apartment, index) {
//TODO loading indicator
    User.removeApartmentFromFavorites(apartment, index);
  }
})


/*
Controller for our tab bar
*/
.controller('TabsCtrl', function($scope) {

});