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

 Recommendations.init()
    .then(function(){

      $scope.currentApartment = Recommendations.queue[0];

      return Recommendations.playCurrentApartment();

    })
    .then(function(){
      // turn loading off
      hideLoading();
      $scope.currentApartment.loaded = true;
    });

    // fired when we favorite / skip a song.
 	$scope.sendFeedback = function(bool) {
    if (bool) User.addApartmentToFavorites($scope.currentApartment);

    // set variable for the correct animation sequence
    $scope.currentApartment.rated = bool;
    $scope.currentApartment.hide = true;

    Recommendations.nextApartment();

    $timeout(function() {
      // $timout to allow animation to compelete
       $scope.currentApartment = Recommendations.queue[0];

    }, 250);
  }

  $scope.nextApartmentIMG = function(){
    if (Recommendation.queue.length > 1) {
      return Recommendations.queue[1].image_large;
    }
    return '';
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