angular.module('weatherAppApp')
  .controller('VideosCtrl', function ($scope,$http,$location, getVideos) {

    getVideos.getVideos().then(function(data){
      console.log("videos data",data);
    })
  })
  .factory('getVideos',function($http){
    return {
      nodeUrl:"http://localhost:8000/videos",
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
