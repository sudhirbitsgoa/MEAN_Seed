/**
 * Created by venkat on 5/12/14.
 */
'use strict';
angular.module('weatherAppApp')
//        $scope.city = "";
    .controller('LoginCtrl', function ($scope,$location,loginService,googleOauth,$auth) {
        console.log("in dot square");
        $scope.logIn = function (model, form) {
            console.log(model, form);
            console.log("model,form");
            loginService.loginUser(form).then(function(data){
                if(data.data.error){
                    console.log(data.data.error);
                }else{
                    $location.path("/loginsuccess");
                }
            },function(err){
                console.log(err);
            })
        };
        $scope.googleOauth = function(){
            googleOauth.loginUser();
        }
        $scope.authenticate = function(provider) {
            $auth.authenticate(provider);
        };
    })
    .factory("googleOauth", function ($http) {
        return {
            nodeUrl: "http://localhost:3000/auth/google",
            loginUser: function (data) {
                var url = this.nodeUrl;
                return $http({method: "GET", url: this.nodeUrl}).success(function (data) {
                    console.log("after login error",data);
                    return data;
                }).error(function (err) {
                    console.log(err);
                    return (err);
                });
            }
        }
    })
    .factory("loginService", function ($http) {
        return {
            nodeUrl: "http://localhost:3000/api/loginUser",
            loginUser: function (data) {
                var url = this.nodeUrl;
                return $http({method: "POST", url: this.nodeUrl, data: data}).success(function (data) {
                    console.log("after login error",data);
                    return data;
                }).error(function (err) {
                    console.log(err);
                    return (err);
                });
            }
        }
    })
    .controller('VideosCtrl', function ($scope,$http,$location, getVideos) {

      getVideos.getVideos().then(function(data){
        console.log("videos data",data);
        $scope.videos = data.data;
      })
    })
    .factory('getVideos',function($http){
      return {
        nodeUrl:"http://localhost:3000/videos",
        getVideos:function(data){
          var url = this.nodeUrl;
          return $http({method:"GET",url:this.nodeUrl}).success(function(data){
            return data;
          }).error(function(err){
            return (err);
          });
        }
      };
    })
