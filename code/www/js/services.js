angular.module('refrontier.services', [])
.factory('User', function() {

  var o = {
    favorites: []
  }

   o.addApartmentToFavorites = function(apartment) {
    // make sure there's a song to add
    if (!apartment) return false;

    // add to favorites array
    o.favorites.unshift(apartment);
  }

  	o.removeApartmentFromFavorites = function(apartment, index){
  		if (!apartment) return false;

  		o.favorites.splice(index, 1);
  	}

  return o;
});