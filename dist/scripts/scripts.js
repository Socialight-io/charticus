"use strict";if(!_charticusAppConfig)var _charticusAppConfig={};_charticusAppConfig.templatePath=_charticusAppConfig.templatePath||"http://static.socialight.io/public/libs/charticus/0.1.6/views/",angular.module("chartsApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider","$sceDelegateProvider",function(a,b){a.when("/",{templateUrl:_charticusAppConfig.templatePath+"main.html",controller:"MainCtrl"}).when("/about",{templateUrl:_charticusAppConfig.templatePath+"about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"}),b.resourceUrlWhitelist(["self","http://static.socialight.io/public/libs/**"])}]),angular.module("chartsApp").controller("MainCtrl",["$scope","$http",function(a,b){var c={};a.load=function(){b.get("http://api.socialight.io/posts?created_day_g&date_sd&limit=100",{params:{token:"gUkmID0zQkXNTwvz7qLdb2BX7H4e5eGf",uid:"92"}}).success(function(b){var d=(new Charts.line(b,{dom:"#line",create:!0,timeseries:!0,legend:!0,height:400,interpolate:"linear",stack:[{key:"count",label:function(a){return a.count+" Posts"},color:"#006699",legend:"Posts"},{key:"likes",label:function(a){return a.likes+" Likes"},color:"#996600",legend:"Comments"},{key:"comments",label:function(a){return a.comments+" Comments"},color:"#FF0099",legend:"Likes"}],axis:{x:{show:!0,label:function(a){return new Date(a.date.substr(0,10))}},y:{show:!1}},sort:function(a,b){return new Date(a.date.substr(0,10))-new Date(b.date.substr(0,10))}}),function(a){$("body").append("<div class='label-hover'>"+a.label+"</div>"),$(document).mousemove(function(a){$(".label-hover").css({top:a.pageY+"px",left:a.pageX+"px"})})}),e=function(){$(".label-hover").remove()};a.chart?c.update(b):c=new Charts.column(b,{dom:"#bar",create:!0,height:300,stack:[{key:"count",label:function(a){return a.count+" Posts"},color:function(){return"#006699"},legend:"Posts",mouseover:d,mouseout:e},{key:"likes",label:function(a){return a.likes+" Likes"},color:function(){return"#996600"},legend:"Comments",mouseover:d,mouseout:e},{key:"comments",label:function(a){return a.comments+" Comments"},color:function(){return"#FF0099"},legend:"Likes",mouseover:d,mouseout:e}],axis:{y:{show:!0},x:{show:!0,label:function(a){return String(a.date.substr(0,4))}}},sort:function(a,b){return a.date.substr(0,4)-b.date.substr(0,4)}})})},$(window).on("resize",function(){c.resize()}),a.load(3),window.setTimeout(function(){a.load(6)},4e3)}]);