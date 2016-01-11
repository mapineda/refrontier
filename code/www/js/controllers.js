angular.module('refrontier.controllers', ['ionic', 'ionic.contrib.ui.tinderCards', 'refrontier.services'])


/*
Controller for the discover page
*/
.controller('DiscoverCtrl', function($scope, $timeout, $ionicLoading, User, Recommendations) {
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
// get our first songs
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
   $scope.sendFeedback = function (bool) {
   	// first, add to favorites if they favorited
    if (bool) User.addApartmentToFavorites($scope.currentApartment);

    // set variable for the correct animation sequence
    $scope.currentApartment.rated = bool;
    $scope.currentApartment.hide = true;

     // prepare the next song
    Recommendations.nextApartment();

    $timeout(function() {
      // $timeout to allow animation to complete
      $scope.currentApartment = Recommendations.queue[0];
      $scope.currentApartment.loaded = false;
    }, 250);

    Recommendations.playCurrentApartment().then(function() {
      $scope.currentApartment.loaded = true;
    })

  }

  $scope.nextAlbumImage = function() {
  	if (Recommendations.queue.length > 1) {
  		return Recommendations.queue[1].image_large;
  	}

  	return '';
  }

})


/*
Controller for the favorites page
*/
.controller('FavoritesCtrl', function($scope, User) {
	// get the list of our favorites from the user service
	$scope.favorites = User.favorites;
	$scope.username = User.username;

	$scope.removeApartment = function(apartment, index) {
    	User.removeApartmentFromFavorites(apartment, index);
  }

  $scope.openApartment = function(apartment) {
    $window.open(apartment.open_url, "_system");
  }

})


/*
Controller for our tab bar
*/
.controller('TabsCtrl', function($scope, $window, User, Recommendations) {
// stop audio when going to favorites page
$scope.enteringFavorites = function() {
    Recommendations.haltAudio();
    User.newFavorites = 0;
  }

$scope.leavingFavorites = function() {
    Recommendations.init();
  }

  $scope.logout = function() {
  	User.destroySession();

  	// instead of using $state.go, we're going to redirect.
    // reason: we need to ensure views aren't cached.
    $window.location.href = 'index.html';


  } 

  // expose the number of new favorites to the scope
  $scope.favCount = User.favoriteCount;

})

.controller('SplashCtrl', function($scope, $state, User) {
	// attempt to signup/login via User.auth
  $scope.submitForm = function(username, signingUp) {
    User.auth(username, signingUp).then(function() {
      // session is now set, so lets redirect to discover page
      $state.go('tab.discover');

    }, function() {
      // error handling here
      alert('Hmmm... try another username.');
    });
  }

});