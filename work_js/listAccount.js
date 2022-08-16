app.controller("ctrl_listAccount", function($scope, $http){
    $scope.isLoading = false;
    $scope.accountLoginNow = $scope.getJsonSessionStorage("accountLogin");
    const url = 'https://620e0b94585fbc3359d4d271.mockapi.io/User';
    $scope.listAccount = [];
    $scope.isLoading = true;
    $http.get(url).then(function(response){
        $scope.listAccount = response.data;
        $scope.isLoading = false;
    }).catch(function (error) {
        console.log(error);
        $scope.isLoading = false;
    });

    $scope.loadingTable = function(){
        $http.get(url).then(function(response){
            $scope.listAccount = response.data;
        }).catch(function (error) {
            console.log(error);
            $scope.isLoading = false;
        });
    };

    $scope.index = -1;
    $scope.accountAdmin = {};
    $scope.accountAdmin.gender = "true";
    $scope.accountAdmin.access = "false";
    $scope.update = function(index){
        $scope.index = index;
        $scope.accountAdmin = angular.copy($scope.listAccount[index]);
    }

    $scope.delete = function(index){
        Swal.fire({
            icon : 'question',
            title: 'Xác nhận xóa học sinh này!',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            confirmButtonColor: 'green'
        }).then((result) => {
            if (result.isConfirmed) {
                const student = angular.copy($scope.listAccount[index]);
                if ($scope.accountLoginNow.id === student.id) {
                    Swal.fire({
                        title : 'Bạn không được xóa chính bạn!',
                        icon : 'warning'
                    });
                    return;
                }
                const urlDelete = url+'/'+student.id;
                $scope.isLoading = true;
                $http.delete(urlDelete).then(function(response){
                    $scope.isLoading = false;
                    $scope.listAccount.splice(index,1);
                    $scope.clear();
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
    }

    $scope.onSubmitFormAdmin = function(){
        $scope.isLoading = true;
        if (typeof $scope.accountAdmin.id === 'undefined') {
            $http.post(url, $scope.accountAdmin).then(function(response){
                $scope.loadingTable();
                $scope.isLoading = false;
                /* $scope.listAccount.push(angular.copy($scope.accountAdmin)); */
                $scope.clear();
                Swal.fire({
                    title : 'Thành công!',
                    icon : 'success'
                });
            }).catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
            });
        } else {
            const urlUpdate = url+'/'+$scope.accountAdmin.id;
            $http.put(urlUpdate, $scope.accountAdmin).then(
                function(response){
                    if ($scope.accountLoginNow.id === $scope.accountAdmin.id) {
                        $scope.setJsonSessionStorage("accountLogin", $scope.accountAdmin);
                        if (localStorage["reAccountLogin"]) {
                            $scope.setJsonLocalStorage("reAccountLogin", $scope.accountAdmin);
                        }
                    }
                    $scope.isLoading = false;
                    $scope.listAccount[$scope.index] = angular.copy($scope.accountAdmin);
                    $scope.clear();
                    Swal.fire({
                        title : 'Thành công!',
                        icon : 'success'
                    });
                }
            ).catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
            });
        }
    }

    $scope.clear = function(){
        $scope.index = -1;
        $scope.accountAdmin = {};
    }

    $scope.setJsonSessionStorage = function(key,Object){
        const setNewJson = JSON.stringify(Object); 
        sessionStorage.setItem(key, setNewJson);
    } /* đẩy Lên sessionStorage */

    $scope.getJsonSessionStorage = function(key){
        const getJson = JSON.parse(sessionStorage.getItem(key)); 
        return getJson;
    } /* lấy list sessionStorage */

    $scope.setJsonLocalStorage = function(key,Object){
        const setNewJson = JSON.stringify(Object); 
        localStorage.setItem(key, setNewJson);
    } /* đẩy Lên localStorage */

    $scope.getJsonLocalStorage = function(key){
        const getJson = JSON.parse(localStorage.getItem(key)); 
        return getJson;
    } /* lấy list */
});