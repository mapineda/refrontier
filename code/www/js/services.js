angular.module('refrontier.services', [])

.factory('User', function() {

	var o = {
		favorites: []
	}

	o.addApartmentToFavorites = function(apartment) {
		if (!apartment) return false;

		o.favorites.unshift(apartment);
	}

	o.removeApartmentFromFavorites = function(apartment, index) {
		if (!apartment) return false;

		o.favorites.splice(index, 1);

	}

	return o;
});