angular.module('refrontier.services', [])

.factory('User', function() {
	var o = {
		favorites: []
	}

	o.addApartmentToFavorites = function() {
		if (!apartment) return false;


		//add favorite to front of array 
		o.favorites.unshift(apartment);
	}

	return o;
});