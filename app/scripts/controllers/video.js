angular.module('weatherAppApp')
  .controller('VideosCtrl', function ($scope,$http,$location, getVideos,$rootScope) {

    getVideos.getVideos().then(function(data){
      console.log("videos data",data);
      $scope.videos = data.data;
    });

    $scope.deleteVideo = function(id){
      if(!confirm("press ok to delete"))
      return;

      getVideos.deleteVideo(id);
      var videos = [];
      $scope.videos.forEach(function(video){
        if(video._id != id){
          videos.push(video);
        }
      });
      alert("deleted successfully!");
      $scope.videos = videos;
    }

    $scope.playvideo = function(id){
      var video = document.getElementById("video");
      video.src = $rootScope.rootUrl+"/videos/"+id;
    }

    $scope.mergeVideos = function(){
      getVideos.mergeVideo();
    }

    function tick(){
      getVideos.getVideos().then(function(data){
        console.log("videos data",data);
        $scope.videos = data.data;
        if(data.status!=200){
          tick();
        }
      });
    }

  })
  .factory('getVideos',function($http,$rootScope,$cookies){
    return {
      nodeUrl:$rootScope.rootUrl+"/videos",
      getVideos:function(data){
        var url = this.nodeUrl;
        return $http({method:"GET",url:this.nodeUrl}).success(function(data){
          return data;
        }).error(function(err){
          return (err);
        });
      },
      
      deleteVideo : function(id){
        var url = $rootScope.rootUrl + '/videos/';
        $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
        console.log("this is csrf token",$cookies.csrftoken);
        $http.defaults.headers['X-CSRFToken'] = $cookies.csrftoken;
        return $http({method:"DELETE",url:url+id}).success(function(data){
          return data
        }).error(function(err){
          return err;
        })
      },

      mergeVideo : function(){
        var url = $rootScope.rootUrl + '/merge';
        return $http({method:'GET',url:url}).success(function(data){
          return data;
        }).error(function(err){
          return err;
        })
      }
    };
  })
