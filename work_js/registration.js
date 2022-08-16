var app = angular.module("myApp",[]);
app.controller("ctrl_checkIn", function($scope, $http){
    $scope.accountCreate = {};
    $scope.listAccount = [];
    $scope.accountCreate.gender = "true";
    $scope.accountCreate.access = "false";
    $scope.accountCreate.password = "";
    $scope.isLoading = false;
    const url = "https://620e0b94585fbc3359d4d271.mockapi.io/User";
    $scope.isLoading = true;
    $http.get(url).then(function(response){
        $scope.isLoading = false;
        $scope.listAccount = response.data;
        console.log($scope.listAccount);
    }).catch(function (error) {
        console.log(error);
        $scope.isLoading = false;
    });
    $scope.onSubmitForm = function(even){
        even.preventDefault();
        if (typeof $scope.accountCreate.fullname === 'undefined') {
            return;
        }
        if (typeof $scope.accountCreate.birthday === 'undefined') {
            return;
        }
        if (typeof $scope.accountCreate.gender === 'undefined') {
            return;
        }
        if (typeof $scope.accountCreate.username === 'undefined') {
            return;
        }
        if (typeof $scope.accountCreate.password === 'undefined') {
            return;
        }
        if (typeof $scope.accountCreate.email === 'undefined') {
            return;
        }

        if ($scope.accountCreate.password !== $scope.confirmPassword) {
            Swal.fire({
                title : 'Mật khẩu xác nhận không khớp',
                icon : 'warning'
            });
            return;
        }

        for (let index = 0; index < $scope.listAccount.length; index++) {
            if ($scope.accountCreate.username === $scope.listAccount[index].username) {
                Swal.fire({
                    title : 'Tài khoản bạn đăng kí đã tồn tại!',
                    icon : 'warning'
                });
                return;
            }
        }
        $scope.isLoading = true;
        $http.post(url, $scope.accountCreate).then(function(response){
            $scope.isLoading = false;
            Swal.fire({
                icon : 'success',
                title: 'Đăng kí thành công!',
                showCancelButton: true,
                showDenyButton: true,
                confirmButtonText: 'Login',
                confirmButtonColor: 'green',
                denyButtonText: 'List account',
                denyButtonColor: 'green'
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    location.replace('login.html');
                } else if (result.isDenied) {
                    location.replace('login.html');
                }
            });
        }).catch(function (error) {
            console.log(error);
            $scope.isLoading = false;
        });
    }
});