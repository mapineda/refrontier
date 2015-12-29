angular.module('refrontier.controllers', ['ionic', 'refrontier.services'])


/*
Controller for the discover page
*/
.controller('DiscoverCtrl', function($scope, $timeout, $ionicLoading, User, Recommendations) {

  var showLoading = function(){
    $ionicLoading.show({
      template: '<i class="ion-loading-c"></i>',
      noBackdrop: true
    })

  }

  var hideLoading = function(){
    $ionicLoading.hide();
  }
// show loading icon when calling on server
  showLoading();

  Recommendations.getNextApartments()
    .then(function(){
      $scope.currentApartment = Recommendations.queue[0];
      Recommendations.playCurrentApartment();
      
// hide loading icon after recommendations icons are called
      hideLoading();
    })

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