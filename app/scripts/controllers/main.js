'use strict';
/**
 * @ngdoc function
 * @name chartsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chartsApp
 */


angular.module('chartsApp').controller('MainCtrl', ['$scope', '$http', function($scope, $http) {

    $http.get("http://api.socialight.io/posts?created_year_g", {
        params: {
            token: "gUkmID0zQkXNTwvz7qLdb2BX7H4e5eGf",
            uid: "70",
            limit: 10
        }
    }).success(function(response) {


    	// Line Chart Demo
		new Charts.line(response, { 
			dom: "#line",
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

}]);