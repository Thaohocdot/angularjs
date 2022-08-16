var app = angular.module('myApp',['ngRoute']);


app.config(function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider
    .when("/", {
        templateUrl : "layout/layoutIndex.html"
    })
    .when("/JpIndex", {
        templateUrl : "layout/layoutIndex.html"
    })
    .when("/Lesson", {
        templateUrl : "Lesson.html",
        controller : "ctrl_Lesson"
    })
    .when("/LessonMockAPI", {
        templateUrl : "LessonMockAPI.html",
        controller : "ctrl_LessonAPI"
    })
    .when("/Feedback", {
        templateUrl : "Feedback.html"
    })
    .when("/Question", {
        templateUrl : "Question.html"
    })
    .when("/UpdateUser", {
        templateUrl : "UpdateUser.html",
        controller : "ctrl_updateProfile"
    })
    .when("/UserTested", {
        templateUrl : "UserTestedInfor.html"
    })
    .when("/ListAccount", {
        templateUrl : "ListAccount.html"
    })
    .when("/ListQuestion", {
        templateUrl : "ListQuestion.html"
    })
    .when("/listQuiz", {
        templateUrl : "ListQuiz.html"
    })
    .when("/test/:idQuiz", {
        templateUrl : "test.html",
        controller : "ctrl_Exam"
    })
    .when("/testAPI/:idQuiz", {
        templateUrl : "testMockAPI.html",
        controller : "ctrl_ExamAPI"
    })
    .otherwise({
        redirectTo : "/JpIndex"
    });
});

app.directive('firebaseDate', function(){
    return {
      require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
        ngModel.$formatters.push(function(fromModel){
        fromModel = new Date(fromModel);
        return fromModel;
      });
      ngModel.$parsers.push(function(fromField){
        fromField = fromField.getTime();
        return fromField;
      });
    }
  }
});

app.controller("ctrl", function($scope, $http, $interval){
    $scope.account = {};
    
    /* $scope.account.gender = "true"; */
    $scope.equal = true;
    $scope.rememberPassword = false;
    $scope.students = [];

    $scope.usernameLogin = sessionStorage.getItem("usernameLogin");
    $scope.passwordLogin = sessionStorage.getItem("passwordLogin");

    $scope.hideChoice = true;/* ẩn chức năng */

    $scope.home = ""; /* link index */
    const url = 'https://620e0b94585fbc3359d4d271.mockapi.io/User';
    $http.get(url).then(function(response){
        $scope.students = response.data; /* truyền list tài khoản */
        console.log($scope.students);
        /* if (!localStorage["setJson"]) {
            for (let index = 0; index < $scope.students.length; index++) {
                $scope.students[index].birthday =  (new Date($scope.students[index].birthday)).getTime();
                $scope.students[index].schoolfee = Number($scope.students[index].schoolfee);
                $scope.students[index].marks = Number($scope.students[index].marks);
            }
            const setJson = JSON.stringify($scope.students); 
            localStorage.setItem("setJson", setJson); 
        } */ /* không dùng chuyển sang mockAPI để lưu trưc DB */

        if (localStorage["reAccountLogin"]) {
            const reAccountLogin = $scope.getJsonLocalStorage("reAccountLogin");
            $scope.usernameLogin = reAccountLogin.username;
            $scope.passwordLogin = reAccountLogin.password;
        }

        if (sessionStorage["accountLogin"]) {
            $scope.hideChoice = false;
            $scope.accLoginAccess = $scope.getJsonSessionStorage("accountLogin");
        }
        /* duyệt tài khoản khi đăng nhập */
        $scope.loginAccount = function(){
            if (typeof(Storage) !== "undefined") {
                /* const studentsGetJson = $scope.getJsonLocalStorage("setJson"); *//* Lấy danh sách đẩy lên về so sánh vì khi đổi mật khẩu hay là tạo tài khoản local là kho lưu trữ */

                sessionStorage.setItem("usernameLogin", $scope.usernameLogin);
                sessionStorage.setItem("passwordLogin", $scope.passwordLogin);

                for (let i = 0; i < $scope.students.length; i++) {
                    /* $scope.aa = studentsGetJson; */
                    if (sessionStorage.getItem("usernameLogin") === $scope.students[i].username 
                    && sessionStorage.getItem("passwordLogin") === $scope.students[i].password) 
                    {
                        $scope.account = angular.copy($scope.students[i]);
                        if ($scope.rememberPassword === true) {
                            $scope.setJsonLocalStorage("reAccountLogin",$scope.account);
                        } else {
                            $scope.removeJsonLocalStorage("reAccountLogin");
                        }
                        $scope.setJsonSessionStorage("accountLogin", $scope.account);
                        /* alert("thành công: "+$scope.account.username); */
                        break;
                    }
                }
                if (Object.keys($scope.account).length !== 0) {
                    $scope.home = "index.html";
                    /* alert("thành công "+$scope.account); */
                } else {
                    $scope.home = "";
                    /* alert("Không thành công" + $scope.passwordLogin); */
                    Swal.fire({
                        title : 'không đúng mật khẩu hoặc tài khoản!',
                        icon : 'warning'
                    });
                    sessionStorage.removeItem("usernameLogin");
                    sessionStorage.removeItem("passwordLogin");
                }
            } else {
                alert("SessionStorage don't support!");
            }
        };

        
    });
    
    /* create Account */
    /* $scope.accountCreate = {};
    $scope.accountCreate.gender = "true";
    $scope.accountCreate.password = ""; */
    /* $scope.createAccount = function(){
    
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
            alert('Mật khẩu xác nhận không khớp');
            return;
        }
        const studentsGetJson = $scope.getJsonLocalStorage("setJson");
        studentsGetJson.push($scope.accountCreate); 
        $scope.setJsonLocalStorage("setJson", studentsGetJson); 
        $scope.home = "Login.html";
    }; */

    /* $scope.onSubmitForm = function(even){
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
        $http.post(url, $scope.accountCreate).then(function(response){
            Swal.fire({
                icon : 'success',
                title: 'Đăng kí thành công!',
                showCancelButton: true,
                confirmButtonText: 'Login',
                confirmButtonColor: 'green'
              }).then((result) => {
                
                if (result.isConfirmed) {
                  location.replace('login.html');
                } 
            });
        });
    } */

    /* Log out */
    $scope.logOut = function($scope){
        sessionStorage.removeItem("usernameLogin");/* Chuyển sang dạng JSon */
        sessionStorage.removeItem("passwordLogin");/* đẩy lên localStorage */
        sessionStorage.removeItem("accountLogin");

        /* $scope.hideChoice = true; */
    };

    /* Reset Password */
    $scope.passwordChange = "";
    $scope.newPasswordChange = "";
    $scope.confirmPasswordChange = "";
    /* $scope.resetPass = function(){
        
    } */
    /* $scope.mess = false; */
    $scope.onSubmitChange = function(even){
      
        const accountLogin = $scope.getJsonSessionStorage("accountLogin");
        /* const listStudents = $scope.getJsonLocalStorage("setJson"); */
        const listStudents = $scope.students;
        if ($scope.passwordChange !== accountLogin.password) {
            Swal.fire({
                title : 'không đúng mật khẩu!',
                icon : 'warning'
            });
            return;
        }  
        if ($scope.newPasswordChange !== $scope.confirmPasswordChange){
            Swal.fire({
                title : 'Mật khẩu mới và xác nhận mật khẩu không giống nhau!',
                icon : 'warning'
            });
            return;
        }
        const urlDelete = url + "/" + accountLogin.id;
        accountLogin.password = $scope.confirmPasswordChange;
        $http.put(urlDelete, accountLogin).then(function(response){
            /* $scope.mess = true; */
            $scope.setJsonSessionStorage("accountLogin",accountLogin);
            if (localStorage["reAccountLogin"]) {
                $scope.setJsonLocalStorage("reAccountLogin", accountLogin);
            }
            Swal.fire({
                title : 'Đổi mật khẩu thành công!',
                icon : 'success'
            });
           /*  $interval(function(){
                $scope.mess = false;
            },2000); */
        });
        /* location.replace("index.html"); */
        
    };

    /* show password */
    $scope.emailForget = "";
    $scope.usernameForget = "";
    $scope.showPass = function(){
        const listStudents = $scope.students;
        var flagEmail = false;
        var flagUser = false;
        for (let index = 0; index < listStudents.length; index++) {           
            if (listStudents[index].email === $scope.emailForget) {
                flagEmail = true;
                if (listStudents[index].username === $scope.usernameForget) {
                    flagUser = true;
                    if (flagEmail === true) {
                        /* alert("Mật khẩu: "+listStudents[index].password); */
                        Swal.fire({
                            title: 'Mật khẩu: '+listStudents[index].password,
                            text: 'Có cái mật khẩu cũng không nhớ!',
                        })
                        break;
                    }
                }
            }
            
        }
        if (flagEmail !== true || flagUser !== true) {
            Swal.fire({
                title: "không tìm thấy tài khoản",
                text: 'Vui lòng nhập chính xác thông tin!',
            })
        }
    }

    /* update Account */
    /* $scope.updateAccount = function(){
        $scope.setJsonSessionStorage("accountLogin",$scope.account);
        const accountLogin = $scope.getJsonSessionStorage("accountLogin");
        const listStudents = $scope.getJsonLocalStorage("setJson");
        for (let index = 0; index < listStudents.length; index++) {
            
            if (listStudents[index].username === accountLogin.username) {
                listStudents[index] = $scope.account;
                $scope.setJsonLocalStorage("setJson", listStudents); 
                alert("thành công!"); 
                
                break;
            }
        }
    } */

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

    if (sessionStorage["accountLogin"]) {
        $scope.account = $scope.getJsonSessionStorage("accountLogin");
    }
});



/* app.controller("ctrl_Exam", function($scope, $http, $interval){
    $scope.quiz = [];
    $http.get("db/Quizs/ADAV.js").then(function(response){
        $scope.quiz = response.data;
        $scope.totalQuiz = $scope.quiz.length;
        $scope.indexQuiz = 0; 
        $scope.prev = function(){
            if ($scope.indexQuiz > 0) {
                $scope.indexQuiz -= 1;
            }
        };
        $scope.next = function(){
            if ($scope.indexQuiz < $scope.totalQuiz) {
                $scope.indexQuiz += 1;
            }
        };
        $scope.submit = function(){
            var dapAn =  $scope.quiz[$scope.indexQuiz].AnswerId;
            var dapAn2 =  $scope.a;
            
            if (dapAn == dapAn2) {
                $scope.choice1 = true;
            } else {
                $scope.choice2 = true;
            }
        };
    });
    
    $scope.m = 15;
    $scope.s = 0;
    $interval(function(){
        if ($scope.m > 0) {
            if ($scope.s == 0) {
                $scope.m -= 1;
                $scope.s = 59;
            } else {
                $scope.s -= 1;
            }
        }
    }, 1000);

    $scope.aaa = $('input[name = a]:checked').val();
}); */