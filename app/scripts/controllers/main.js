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

	    $http.get("http://api.socialight.io/posts?created_year_g", {
	        params: {
	            token: "gUkmID0zQkXNTwvz7qLdb2BX7H4e5eGf",
	            uid: "92",
	            limit: r
	        }
	    }).success(function(response) {

	    	var line = new Charts.line(response, { 
				dom: "#line",
				create: true,
				timeseries: true,
				legend: true,
				height: 400,
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
		                	return new Date(d._id.created.year+"-12-31"); 
		               	}
		            },
		            y: { 
		            	show: false
		            }
		        },
		        sort: function (d, e) { return d._id.created.year - e._id.created.year;}
			});


	    	// Bar Chart Demo

	    	var labelOver = function (d) { 
            	$("body").append("<div class='label-hover'>" + d.label + "</div>");
			    $(document).mousemove(function(event) {
	            	$('.label-hover').css({
	            		top: event.pageY+"px",
	            		left: event.pageX+"px"
	            	});
			    });


	    	}

	    	var labelOut = function (d) { 
			    $(".label-hover").remove();
	    	}

		    if (!$scope.chart) { 
				chart = new Charts.column(response, { 
					dom: "#bar",
					create: true,
					height: 300,
			        stack: [{
			            key: "count",
			            label: function (d) { return d.count + " Posts"; },
			            color: function (d) { return "#006699"; },
			            legend: "Posts",
			            mouseover: labelOver,
			           	mouseout: labelOut
			        }, {
			            key: "likes",
			            label: function (d) { return d.likes + " Likes"; },
			            color: function (d) { return "#996600"; },
			            legend: "Comments",
			            mouseover: labelOver,
			           	mouseout: labelOut
			        }, {
			            key: "comments",
			            label: function (d) { return d.comments + " Comments"; },
			            color: function (d) { return "#FF0099"; },
			           	legend: "Likes",
			            mouseover: labelOver,
			           	mouseout: labelOut
			        }],
			        axis: {
			            y: {
			                show: true
			            },
			            x: { 
			            	show: true,
			                label: function (d) {
			                	return String(d.date.substr(0, 4)); 
			               	}
			            }
			        },
			        sort: function (d, e) { return d.date.substr(0,4) - e.date.substr(0,4); }
				});
			} else { 
				chart.update(response);
			}


			// // Column Charts Demo
			// new Charts.column(response, { 
			// 	dom: "#column", 
		 //        stack: [{
		 //            key: "count",
		 //            label: function (d) { return d.value + " Posts"; },
		 //            color: "#006699",
		 //            legend: "Posts"
		 //        }, {
		 //            key: "likes",
		 //            label: function (d) { return d.value + " Likes"; },
		 //            color: "#996600",
		 //            legend: "Comments"
		 //        }, {
		 //            key: "comments",
		 //            label: function (d) { return d.value + " Comments"; },
		 //            color: "#FF0099",
		 //           	legend: "Likes"
		 //        }],
			// });



			// Pie Chart Demo with custom Colors
			// response = response.map(function (d) { 
			// 	d.color = '#'+Math.floor(Math.random()*16777215).toString(16);
			// 	return d;
			// });



			// new Charts.pie(response, { 
			// 	dom: "#pie",
			// 	radius: .75,
			// 	innerRadius: .3,
			// 	stack: [
			// 		{
			// 			label: function (d) { return d.data.label._id.created.year+": "+d.data.total + " Posts"; },
		 //            	key: function (d) { return d.label ? d.label.count : d.count; },
		 //            	color: function (d) { return d.data.color; }
			// 		}
			// 	],
		 //        margin: {
		 //            top: 0,
		 //            right: 0,
		 //            bottom: 0,
		 //            left: 0
		 //        },
			// });		
	  //   });



	 //    $http.get("http://api.socialight.io/posts?date_sd&created_g", {
	 //        params: {
	 //            token: "gUkmID0zQkXNTwvz7qLdb2BX7H4e5eGf",
	 //            uid: "70",
	 //  			created_gt: new Date((new Date()).getTime() - 30*24*60*60*1000),
	 //  			created_lt: new Date()
	 //        }
	 //    }).success(function(response) {
	 //    	// Line Chart Demo
		// 	new Charts.line(response, { 
		// 		dom: "#timeline",
		// 		timeseries: true,
		// 		interpolate: "line",
		// 		sort: function (d, e) { 
		// 			return new Date(d.label.date.substr(0, 10)) - new Date(e.label.date.substr(0, 10));
		// 		},
		//         stack: [{
		//             key: "count",
		//             label: function (d) { return d.count + " Posts"; },
		//             color: "#006699",
		//             legend: "Posts"
		//         }, {
		//             key: "likes",
		//             label: function (d) { return d.likes + " Likes"; },
		//             color: "#996600",
		//             legend: "Comments"
		//         }, {
		//             key: "comments",
		//             label: function (d) { return d.comments + " Comments"; },
		//             color: "#FF0099",
		//            	legend: "Likes"
		//         }],
		//         axis: {
		//             x: {
		//                 show: true,
		//                 label: function (d) { 
		//                 	return new Date(d.label.date.substr(0, 10)); 
		//                	}
		//             },
		//             y: { 
		//             	show: true
		//             }
		//         },
		// 	});
		});
	}

	$(window).on("resize", function () { 
		chart.resize();
	});

	$scope.load(3);
	window.setTimeout(function () { $scope.load(6); }, 4000);

}]);