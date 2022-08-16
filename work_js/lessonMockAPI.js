app.controller("ctrl_LessonAPI", function($scope, $http){
    $scope.isLoading = false;
    $scope.subjects = [];
    const url = "https://621384a3f43692c9c6079d63.mockapi.io/subjects";
    $scope.isLoading = true;
    $http.get(url).then(function(response){
        $scope.isLoading = false;
        $scope.subjects = response.data;
        $scope.begin = 0;
        $scope.pageCount = Math.ceil($scope.subjects.length / 4);
        $scope.maxpro = $scope.subjects.length;
        $scope.first = function(){
            $scope.begin = 0;
        }

        $scope.prev = function(){
            if ($scope.begin > 0) {
                $scope.begin -= 4;
            }
        }
        $scope.next = function(){
            if ($scope.begin < (($scope.pageCount - 1) * 4)) {
                $scope.begin += 4;
            }
        }
        $scope.last = function(){
            $scope.begin = ($scope.pageCount - 1) * 4;
        }

       /*  $scope.loadToTest = function(linkToTest){
            if (!sessionStorage["accountLogin"]) {
                alert("Bạn chưa đăng nhâp");
                $scope.linkTest = "";
            } else {
                $scope.linkTest = "test.html";
                sessionStorage.setItem("linkToTest", linkToTest);
            }
            
        } */
    });

});