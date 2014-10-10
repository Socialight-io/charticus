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

    var chart = {};

    $scope.load = function (r) {

	    $http.get("http://api.socialight.io/posts?created_day_g&created_gt=2014-09-08&date_sd&limit=100", {
	        params: {
	            token: "gUkmID0zQkXNTwvz7qLdb2BX7H4e5eGf",
	            uid: "92"
	        }
	    }).success(function(response) {

	    	var line = new Charts.line(response, { 
				dom: "#line",
				create: true,
				timeseries: true,
				legend: true,
				height: 400,
				interpolate: "linear",
		        stack: [{
		            key: "count",
		            label: function (d) { return d.count + " Posts"; },
		            color: function (d) { return "#006699" },
		            legend: function (d) { return "Posts"; }
		        },
		         {
		            key: "likes",
		            label: function (d) { return d.likes + " Likes"; },
		            color: function (d) { return "#0099CC"; },
		            legend: function (d) { return "Likes"; }
		        }], 
		        axis: {
		            x: {
		                show: true,
		                extent: [new Date("2014-09-08"), new Date()],
		                label: function (d) {
		                	return new Date(d.date.substr(0,10)); 
		               	}
		            },
		            y: { 
		            	show: true
		            }
		        },
		        sort: function (d, e) { return new Date(d.date.substr(0,10)) - new Date(e.date.substr(0,10)); }
			});

			var pie1Options = { 
				dom: "#pie1",
				create: true,
				legend: true,
				height: 400,
				innerRadius: .5,
				radius: 1,
		        stack: [{
		            key: function (d) { return d.count || 0; },
		            label: function (d) { return d.data.count + " Posts"; },
		            color: function (d) { return "rgba(255,100,0,"+Math.random()+")" },
		            legend: "Posts"
		        }],
		        axis: {
		            x: {
		                show: true,
		                label: function (d) {
		                	return new Date(d.date.substr(0,10)); 
		               	}
		            },
		            y: { 
		            	show: false
		            }
		        },
		        sort: function (d, e) { return new Date(d.date.substr(0,10)) - new Date(e.date.substr(0,10)); }
			};

			var pie2Options = { 
				dom: "#pie2",
				create: true,
				legend: true,
				height: 400,
				innerRadius: .5,
				radius: 1,
		        stack: [{
		            key: function (d) { return d.count || 0; },
		            label: function (d) { return d.data.count + " Posts"; },
		            color: function (d) { return "#006699"; },
		            legend: "Posts"
		        }],
		        axis: {
		            x: {
		                show: true,
		                label: function (d) {
		                	return new Date(d.date.substr(0,10)); 
		               	}
		            },
		            y: { 
		            	show: false
		            }
		        },
		        sort: function (d, e) { return new Date(d.date.substr(0,10)) - new Date(e.date.substr(0,10)); }
			};

			var pie3Options = { 
				dom: "#pie3",
				create: true,
				legend: true,
				height: 400,
				innerRadius: .5,
				radius: 1,
		        stack: [{
		            key: function (d) { return d.count || 0; },
		            label: function (d) { return d.data.count + " Posts"; },
		            color: function (d) { return "#006699" },
		            legend: "Posts"
		        }],
		        axis: {
		            x: {
		                show: true,
		                label: function (d) {
		                	return new Date(d.date.substr(0,10)); 
		               	}
		            },
		            y: { 
		            	show: false
		            }
		        },
		        sort: function (d, e) { return new Date(d.date.substr(0,10)) - new Date(e.date.substr(0,10)); }
			};

	    	var pie1 = new Charts.pie(response, pie1Options);
	    	var pie2 = new Charts.pie(response, pie2Options);
	    	var pie3 = new Charts.pie(response, pie3Options);

			var bar = new Charts.column(response, { 
				dom: "#column",
				create: true,
				height: 300,
		        stack: [{
		            key: "count",
		            label: function (d) { return d.count + " Posts"; },
		            color: function (d) { return "#006699" },
		            legend: "Posts"
		        }, {
		            key: "likes",
		            label: function (d) { return d.likes + " Likes"; },
		            color: function (d) { return "#996600" },
		            legend: "Comments"
		        }, {
		            key: "comments",
		            label: function (d) { return d.comments + " Comments"; },
		            color: function (d) { return "#FF0099" },
		           	legend: "Likes"
		        }],
		        axis: {
		            y: {
		                show: true
		            },
		            x: { 
		            	show: true,
		                label: function (d) {
		                	return String(d.date.substr(0, 7)); 
		               	}
		            }
		        },
		        sort: function (d, e) { return d.date.substr(0,10) - e.date.substr(0,10); }
			});

			$(window).on("resize", function () { 
				bar.resize();
				line.resize();
				pie1.resize();
				pie2.resize();
				pie3.resize();
			});
		});
	}

	$scope.load(3);
	window.setTimeout(function () { $scope.load(6); }, 4000);

}]);