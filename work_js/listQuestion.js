app.controller("ctrl_listQuestion", function($scope, $http){
    $scope.isLoading  = false;
    $scope.subject = {};
    const url = "https://621384a3f43692c9c6079d63.mockapi.io/subjects";
    $scope.isLoading = true;
    $scope.listSubject = [];
    $http.get(url).then(
        function(response){
            $scope.isLoading = false;
            $scope.listSubject = response.data;
        }
    ).catch(function (error) {
        console.log(error);
        $scope.isLoading = false;
    });

    $scope.loadingTable = function(){
        $http.get(url).then(
            function(response){
                $scope.listSubject = response.data;
            }
        ).catch(function (error) {
            console.log(error);
            $scope.isLoading = false;
        });
    }

    $scope.saveSubject = function(){
        $scope.isLoading = true;
        if (typeof $scope.subject.id === 'undefined') {
            $http.post(url, $scope.subject).then(function(response){
                $scope.loadingTable();
                $scope.isLoading = false;
                /* $scope.listSubject.push($scope.subject); */
                Swal.fire({
                    title : 'Thành công!',
                    icon : 'success'
                });
            });
        } else {
            const urlUpdate = url+'/'+$scope.listSubject[$scope.index].id;
            $http.put(urlUpdate, $scope.subject).then(function(response){
                $scope.isLoading = false;
                $scope.listSubject[$scope.index] = angular.copy($scope.subject);
                Swal.fire({
                    title : 'Thành công!',
                    icon : 'success'
                });
            });
        }
    };

    $scope.index = -1;
    $scope.update = function(index){
        $scope.index = index;
        $scope.subject = angular.copy($scope.listSubject[index]);
    };

    $scope.listQuizs = [];

    $scope.delete = function(index){
        Swal.fire({
            icon : 'question',
            title: 'Xác nhận xóa môn này!',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            confirmButtonColor: 'green'
        }).then((result) => {
            if (result.isConfirmed) {
                const urlDelete = url+'/'+$scope.listSubject[index].id;
                $scope.isLoading = true;
                const urlQuiz = 'https://621384a3f43692c9c6079d63.mockapi.io/subjects/'+$scope.listSubject[index].id+'/quizs';
                    $http.get(urlQuiz).then(function(response){
                         console.log(response.data); 
                        $scope.listQuizs = response.data;
                        for (let i = 0; i < $scope.listQuizs.length; i++) {
                            const urlQuizDelete = urlQuiz+'/'+$scope.listQuizs[i].id;
                            $http.delete(urlQuizDelete).then(function(response){
                                
                            }).catch(function (error) {
                                console.log(error);
                            });
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });

                $http.delete(urlDelete).then(function(response){
                    /* const urlQuiz = url+'/'+$scope.listSubject[index].id+'/quizs'; */
                    
                    $scope.isLoading = false;
                    $scope.listSubject.splice(index, 1);
                    Swal.fire({
                        title : 'Thành công!',
                        icon : 'success'
                    });
                }).catch(function (error) {
                    console.log(error);
                    $scope.isLoading = false;
                });

                
            }
        });
    };

    $scope.goToQuiz = function(index){
        $scope.setJsonSessionStorage("choiceSubject", angular.copy($scope.listSubject[index]));
    };

    $scope.setJsonSessionStorage = function(key,Object){
        const setNewJson = JSON.stringify(Object); 
        sessionStorage.setItem(key, setNewJson);
    } /* đẩy Lên sessionStorage */

    $scope.getJsonSessionStorage = function(key){
        const getJson = JSON.parse(sessionStorage.getItem(key)); 
        return getJson;
    } /* lấy list sessionStorage */
});