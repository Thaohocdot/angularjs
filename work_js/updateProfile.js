app.controller("ctrl_updateProfile", function($scope, $http, $interval){
    $scope.account = $scope.getJsonSessionStorage("accountLogin");
    /* update Account */
    const urls = "https://620e0b94585fbc3359d4d271.mockapi.io/User/"+$scope.account.id;
    /* $scope.updateAccount = function(){ */
        /* $scope.setJsonSessionStorage("accountLogin",$scope.account);
        const accountLogin = $scope.getJsonSessionStorage("accountLogin");
        const listStudents = $scope.getJsonLocalStorage("setJson");
        for (let index = 0; index < listStudents.length; index++) {
            if (listStudents[index].username === accountLogin.username) {
                listStudents[index] = $scope.account;
                $scope.setJsonLocalStorage("setJson", listStudents); 
                alert("thành công!"); 
                break;
            }
        } */
       /*  $http.post(url, $scope.account).then(function(response){
            $scope.setJsonSessionStorage("accountLogin",$scope.account);
        });
    } */
    $scope.isLoading = false;
    $scope.saveUser = function(){
        $scope.isLoading = true;
        $http.put(urls, $scope.account).then(function(response){
            $scope.isLoading = false;
            $scope.setJsonSessionStorage("accountLogin",$scope.account);
            if (localStorage["reAccountLogin"]) {
                $scope.setJsonLocalStorage("reAccountLogin", $scope.account);
            }
            const Toast = Swal.mixin({                       
                position: 'center',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            });
            Toast.fire(
                'Updated Information!',
                'Save',
                'success'
            );
        });
    };

    /* cancel update account */
    $scope.cancel =function(){
        $scope.account = $scope.getJsonSessionStorage("accountLogin");
    }

    $scope.setJsonLocalStorage = function(key,Object){
        const setNewJson = JSON.stringify(Object); 
        localStorage.setItem(key, setNewJson);
    } /* đẩy Lên localStorage */

    $scope.getJsonLocalStorage = function(key){
        const getJson = JSON.parse(localStorage.getItem(key)); 
        return getJson;
    } /* lấy list */

    $scope.removeJsonLocalStorage = function(key){
        localStorage.removeItem(key);
    } /* xóa */

    $scope.setJsonSessionStorage = function(key,Object){
        const setNewJson = JSON.stringify(Object); 
        sessionStorage.setItem(key, setNewJson);
    } /* đẩy Lên sessionStorage */

    $scope.getJsonSessionStorage = function(key){
        const getJson = JSON.parse(sessionStorage.getItem(key)); 
        return getJson;
    } /* lấy list sessionStorage */

});