'use strict';
/**
 * @ngdoc function
 * @name chartsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chartsApp
 */


angular.module('chartsApp').controller('MainCtrl', ['$scope', '$http', function($scope, $http) {

    	// Line Chart Demo

    $scope.load = function (r) {

	    $http.get("http://api.socialight.io/posts?created_year_g", {
	        params: {
	            token: "gUkmID0zQkXNTwvz7qLdb2BX7H4e5eGf",
	            uid: "70",
	            limit: r
	        }
	    }).success(function(response) {
	    	new Charts.line(response, { 
				dom: "#line",
				timeseries: false,
		        stack: [{
		            key: "count",
		            label: function (d) { return d.count + " Posts"; },
		            color: "#006699",
		            legend: "Posts"
		        }, {
		            key: "likes",
		            label: function (d) { return d.likes + " Likes"; },
		            color: "#996600",
		            legend: "Comments"
		        }, {
		            key: "comments",
		            label: function (d) { return d.comments + " Comments"; },
		            color: "#FF0099",
		           	legend: "Likes"
		        }],
		        sort: function (d, e) { 
		        	return String(d.label.date.substr(0, 4)) > String(e.label.date.substr(0, 4)); 
		        },
		        axis: {
		            x: {
		                show: true,
		                label: function (d) {
		                	return String(d.label.date.substr(0, 4)); 
		               	}
		            },
		            y: { 
		            	show: true
		            }
		        },
			});


	    	// Bar Chart Demo
			new Charts.bar(response, { 
				dom: "#bar",
		        stack: [{
		            key: "count",
		            label: function (d) { return d.value + " Posts"; },
		            color: "#006699",
		            legend: "Posts"
		        }, {
		            key: "likes",
		            label: function (d) { return d.value + " Likes"; },
		            color: "#996600",
		            legend: "Comments"
		        }, {
		            key: "comments",
		            label: function (d) { return d.value + " Comments"; },
		            color: "#FF0099",
		           	legend: "Likes"
		        }],
			});


			// Column Charts Demo
			new Charts.column(response, { 
				dom: "#column", 
		        stack: [{
		            key: "count",
		            label: function (d) { return d.value + " Posts"; },
		            color: "#006699",
		            legend: "Posts"
		        }, {
		            key: "likes",
		            label: function (d) { return d.value + " Likes"; },
		            color: "#996600",
		            legend: "Comments"
		        }, {
		            key: "comments",
		            label: function (d) { return d.value + " Comments"; },
		            color: "#FF0099",
		           	legend: "Likes"
		        }],
			});



			// Pie Chart Demo with custom Colors
			response = response.map(function (d) { 
				d.color = '#'+Math.floor(Math.random()*16777215).toString(16);
				return d;
			});



			new Charts.pie(response, { 
				dom: "#pie",
				radius: .75,
				innerRadius: .3,
				stack: [
					{
						label: function (d) { return d.data.label._id.created.year+": "+d.data.total + " Posts"; },
		            	key: function (d) { return d.label ? d.label.count : d.count; },
		            	color: function (d) { return d.data.color; }
					}
				],
		        margin: {
		            top: 0,
		            right: 0,
		            bottom: 0,
		            left: 0
		        },
			});		
	    });



	    $http.get("http://api.socialight.io/posts?date_sd&created_g", {
	        params: {
	            token: "gUkmID0zQkXNTwvz7qLdb2BX7H4e5eGf",
	            uid: "70",
	  			created_gt: new Date((new Date()).getTime() - 30*24*60*60*1000),
	  			created_lt: new Date()
	        }
	    }).success(function(response) {
	    	// Line Chart Demo
			new Charts.line(response, { 
				dom: "#timeline",
				timeseries: true,
				interpolate: "line",
				sort: function (d, e) { 
					return new Date(d.label.date.substr(0, 10)) - new Date(e.label.date.substr(0, 10));
				},
		        stack: [{
		            key: "count",
		            label: function (d) { return d.count + " Posts"; },
		            color: "#006699",
		            legend: "Posts"
		        }, {
		            key: "likes",
		            label: function (d) { return d.likes + " Likes"; },
		            color: "#996600",
		            legend: "Comments"
		        }, {
		            key: "comments",
		            label: function (d) { return d.comments + " Comments"; },
		            color: "#FF0099",
		           	legend: "Likes"
		        }],
		        axis: {
		            x: {
		                show: true,
		                label: function (d) { 
		                	return new Date(d.label.date.substr(0, 10)); 
		               	}
		            },
		            y: { 
		            	show: true
		            }
		        },
			});
		});
	}

	$scope.load(3);
	window.setTimeout(function () { $scope.load(6); }, 4000);
}]);