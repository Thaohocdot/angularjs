app.controller("ctrl_setQuestion", function($scope){
    $scope.send = function(){
        if (typeof $scope.phone === 'undefined') {
            return;
        }
        if (typeof $scope.email === 'undefined') {
            return;
        }
        if (typeof $scope.fullname === 'undefined') {
            return;
        }
        Swal.fire(
            'Gửi thành công!',
            'Chúng tôi đã nhận được câu hỏi từ bạn',
            'success'
        );
    }
});