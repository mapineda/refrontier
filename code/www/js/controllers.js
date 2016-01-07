angular.module('refrontier.controllers', ['ionic', 'refrontier.services'])


/* Controller for the discover page */
.controller('DiscoverCtrl', function($scope, $timeout, User) {
	// adding first three apartments
	  $scope.apartments = [
     {
        "name":"Whitley",
        "description":"Luxury",
//         "Address":"301 Brazos St
// Austin, TX  78701",
        "image_small":"http://s3-media4.fl.yelpcdn.com/bphoto/QEbK7NE8sUnr4cbC6TUxqg/ls.jpg",
        "image_large":"http://cdn11.g5search.com/assets/283943/huge-roof-top-terrace-and-swimming-pool-at-apartments-in-austin.jpg?1407280878"
     },
     {
        "name":"AMLI Downtown",
        "description":"Luxury",
        // "Address":"201 Lavaca St, Austin, TX 78701"

        "image_small":"http://www.amli.com/AMLIContent/Files/apartments/austin/300/apartment-interior/300-apartment-interior-living-room1.jpg.ashx??w=320&h=237",
        "image_large":"http://www.benkendorfer-associates.com/_assets/img/work/multifamily/AmliDowntown-1.jpg"
     },
     {
        "name":"The Catherine",
        "description":"Luxury",
        // "Address":"214 Barton Springs Road, TX 78704"

        "image_small":"http://thecatherineaustin.com/assets/images/rendering-wide.jpg",
        "image_large":"http://thecatherineaustin.com/assets/images/rendering-wide-2.jpg"
     }
  ];

  $scope.currentApartment = angular.copy($scope.apartments[0]);

    // fired when we favorite / skip a song.
 	$scope.sendFeedback = function(bool) {

    // set variable for the correct animation sequence
    $scope.currentApartment.rated = bool;
    $scope.currentApartment.hide = true;

    $timeout(function() {
      // $timeout to allow animation to complete before changing to next song
      // set the current song to one of our three songs
      var randomApartment = Math.round(Math.random() * ($scope.apartments.length - 1));

      // update current song in scope
      $scope.currentApartment = angular.copy($scope.apartments[randomApartment]);

    }, 250);
  }

})


/* Controller for the favorites page */
.controller('FavoritesCtrl', function($scope, User) {
  $scope.favorites = User.favorites;

})


/* Controller for our tab bar */
.controller('TabsCtrl', function($scope) {

});