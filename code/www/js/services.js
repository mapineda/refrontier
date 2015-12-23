angular.module('refrontier.services', []);

	.factory('User', function(){
		var o = {
			favorites: []
		}

		o.addApartmentToFavorites = function(apartment){
			if (!apartment) return false;

			o.favorites.unshift(apartment);
		}

		o.removeAparmentFromFavorites = function(apartment, index) {
			if (!apartment) return false;
		}

		return o;

	});