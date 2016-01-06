angular.module('refrontier.controllers', ['ionic', 'refrontier.services'])

/* Controller for the discover page */
.controller('DiscoverCtrl', function($scope, $timeout, $ionicLoading, User, Recommendations) {
  var showLoading = function() {
    $ionicLoading.show({
      template: '<i class="ion-loading-c"></i>',
      noBackdrop: true,
    })
  }

  var hideLoading = function() {
    $ionicLoading.hide();
  }

  showLoading();


  // get first apartments
  Recommendations.getNextApartments()
    .then(function() {
      $scope.currentApartment = Recommendations.queue[0];

      hideLoading();
    });

    // fired when we favorite / skip a song.
 	$scope.sendFeedback = function(bool) {
    if (bool) User.addApartmentToFavorites($scope.currentApartment);

    // set variable for the correct animation sequence
    $scope.currentApartment.rated = bool;
    $scope.currentApartment.hide = true;

    //prepare the next apartment
    Recommendations.nextApartment();

    $timeout(function() {
       //$timeout to allow animation to complete
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

  $scope.openApartment = function(apartment) {
    $window.open(apartment.open_url, "_system");

  }
})


/* Controller for our tab bar */
.controller('TabsCtrl', function($scope, User, Recommendations) {
  $scope.enteringFavorites = function() {
    User.newFavorites = 0;

  }

  $scope.leavingFavorites = function() {
    Recommendations.init();
  }
  $scope.favCount = User.favoriteCount

});