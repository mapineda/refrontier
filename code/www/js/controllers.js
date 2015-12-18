angular.module('refrontier.controllers', ['ionic', 'refrontier.services'])


/*
Controller for the discover page
*/
.controller('DiscoverCtrl', function($scope) {
	// adding first three apartments
	  $scope.apartments = [
     {
        "name":"Whitley",
        "description":"Luxury",
//         "Address":"301 Brazos St
// Austin, TX  78701",
        "image_small":"http://s3-media4.fl.yelpcdn.com/bphoto/QEbK7NE8sUnr4cbC6TUxqg/ls.jpg",
        "image_large":"http://www.whitleyaustin.com/p/apartments/photo_tour_10657/austin-tx-78701/whitley-apartments-10657"
     },
     {
        "name":"AMLI Downtown",
        "description":"Luxury",
        // "Address":"201 Lavaca St, Austin, TX 78701"

        "image_small":"http://www.amli.com/AMLIContent/Files/apartments/austin/300/apartment-interior/300-apartment-interior-living-room1.jpg.ashx??w=320&h=237",
        "image_large":"https://www.google.com/maps/uv?hl=en&pb=!1s0x8644b508b0482a55:0xc97080422533015!2m5!2m2!1i80!2i80!3m1!2i100!3m1!7e1!4s//plus.google.com/photos/photo/105482590014692010934/6140125120869826146!5s+-+Google+Search"
     },
     {
        "name":"The Catherine",
        "description":"Luxury",
        // "Address":"214 Barton Springs Road, TX 78704"

        "image_small":"http://thecatherineaustin.com/assets/images/rendering-wide.jpg",
        "image_large":"http://thecatherineaustin.com/assets/images/rendering-wide-2.jpg"
     }
  ];

    // fired when we favorite / skip a song.
  $scope.sendFeedback = function (bool) {

    // set the current song to one of our three songs
    var randomApartment = Math.round(Math.random() * ($scope.songs.length - 1));

    // update current song in scope
    $scope.currentApartment = angular.copy($scope.apartmentss[randomApartment]);

  }

})


/*
Controller for the favorites page
*/
.controller('FavoritesCtrl', function($scope) {

})


/*
Controller for our tab bar
*/
.controller('TabsCtrl', function($scope) {

});