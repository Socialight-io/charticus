"use strict";angular.module("chartsApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("chartsApp").controller("MainCtrl",["$scope","$http",function(a,b){a.load=function(){b.get("http://api.socialight.io/posts?created_day_g&created_gt=2014-09-08&date_sd&limit=100",{params:{token:"gUkmID0zQkXNTwvz7qLdb2BX7H4e5eGf",uid:"92"}}).success(function(a){var b=new Charts.line(a,{dom:"#line",create:!0,timeseries:!0,legend:!0,area:!1,height:400,stack:[{key:"count",label:function(a){return a.count+" Posts"},color:function(){return"#006699"},legend:function(){return"Posts"}},{marker:function(){return 10},key:"likes",label:function(a){return a.likes+" Likes"},color:function(){return"#0099CC"},legend:function(){return"Likes"}}],axis:{x:{show:!0,extent:[new Date("2014-09-08"),new Date],label:function(a){return new Date(a.date.substr(0,10))}},y:{show:!0}},sort:function(a,b){return new Date(a.date.substr(0,10))-new Date(b.date.substr(0,10))}}),c={dom:"#pie1",create:!0,legend:!0,height:400,innerRadius:.5,radius:1,stack:[{key:function(a){return a.count||0},label:function(a){return a.data.count+" Posts"},color:function(){return"rgba(255,100,0,"+Math.random()+")"},legend:"Posts"}],axis:{x:{show:!0,label:function(a){return new Date(a.date.substr(0,10))}},y:{show:!1}},sort:function(a,b){return new Date(a.date.substr(0,10))-new Date(b.date.substr(0,10))}},d={dom:"#pie2",create:!0,legend:!0,height:400,innerRadius:.5,radius:1,stack:[{key:function(a){return a.count||0},label:function(a){return a.data.count+" Posts"},color:function(){return"#006699"},legend:"Posts"}],axis:{x:{show:!0,label:function(a){return new Date(a.date.substr(0,10))}},y:{show:!1}},sort:function(a,b){return new Date(a.date.substr(0,10))-new Date(b.date.substr(0,10))}},e={dom:"#pie3",create:!0,legend:!0,height:400,innerRadius:.5,radius:1,stack:[{key:function(a){return a.count||0},label:function(a){return a.data.count+" Posts"},color:function(){return"#006699"},legend:"Posts"}],axis:{x:{show:!0,label:function(a){return new Date(a.date.substr(0,10))}},y:{show:!1}},sort:function(a,b){return new Date(a.date.substr(0,10))-new Date(b.date.substr(0,10))}},f=new Charts.pie(a,c),g=new Charts.pie(a,d),h=new Charts.pie(a,e),i=new Charts.column(a,{dom:"#column",create:!0,height:300,stack:[{key:"count",label:function(a){return a.count+" Posts"},color:function(){return"#006699"},legend:"Posts"},{key:"likes",label:function(a){return a.likes+" Likes"},color:function(){return"#996600"},legend:"Comments"},{key:"comments",label:function(a){return a.comments+" Comments"},color:function(){return"#FF0099"},legend:"Likes"}],axis:{y:{show:!0},x:{show:!0,label:function(a){return String(a.date.substr(0,7))}}},sort:function(a,b){return a.date.substr(0,10)-b.date.substr(0,10)}});$(window).on("resize",function(){i.resize(),b.resize(),f.resize(),g.resize(),h.resize()})})},a.load(3),window.setTimeout(function(){a.load(6)},4e3)}]);