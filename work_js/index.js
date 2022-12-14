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

    $scope.hideChoice = true;/* ???n ch???c n??ng */

    $scope.home = ""; /* link index */
    const url = 'https://620e0b94585fbc3359d4d271.mockapi.io/User';
    $http.get(url).then(function(response){
        $scope.students = response.data; /* truy???n list t??i kho???n */
        console.log($scope.students);
        /* if (!localStorage["setJson"]) {
            for (let index = 0; index < $scope.students.length; index++) {
                $scope.students[index].birthday =  (new Date($scope.students[index].birthday)).getTime();
                $scope.students[index].schoolfee = Number($scope.students[index].schoolfee);
                $scope.students[index].marks = Number($scope.students[index].marks);
            }
            const setJson = JSON.stringify($scope.students); 
            localStorage.setItem("setJson", setJson); 
        } */ /* kh??ng d??ng chuy???n sang mockAPI ????? l??u tr??c DB */

        if (localStorage["reAccountLogin"]) {
            const reAccountLogin = $scope.getJsonLocalStorage("reAccountLogin");
            $scope.usernameLogin = reAccountLogin.username;
            $scope.passwordLogin = reAccountLogin.password;
        }

        if (sessionStorage["accountLogin"]) {
            $scope.hideChoice = false;
            $scope.accLoginAccess = $scope.getJsonSessionStorage("accountLogin");
        }
        /* duy???t t??i kho???n khi ????ng nh???p */
        $scope.loginAccount = function(){
            if (typeof(Storage) !== "undefined") {
                /* const studentsGetJson = $scope.getJsonLocalStorage("setJson"); *//* L???y danh s??ch ?????y l??n v??? so s??nh v?? khi ?????i m???t kh???u hay l?? t???o t??i kho???n local l?? kho l??u tr??? */

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
                        /* alert("th??nh c??ng: "+$scope.account.username); */
                        break;
                    }
                }
                if (Object.keys($scope.account).length !== 0) {
                    $scope.home = "index.html";
                    /* alert("th??nh c??ng "+$scope.account); */
                } else {
                    $scope.home = "";
                    /* alert("Kh??ng th??nh c??ng" + $scope.passwordLogin); */
                    Swal.fire({
                        title : 'kh??ng ????ng m???t kh???u ho???c t??i kho???n!',
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
            alert('M???t kh???u x??c nh???n kh??ng kh???p');
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
                title : 'M???t kh???u x??c nh???n kh??ng kh???p',
                icon : 'warning'
            });
            return;
        }
        $http.post(url, $scope.accountCreate).then(function(response){
            Swal.fire({
                icon : 'success',
                title: '????ng k?? th??nh c??ng!',
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
        sessionStorage.removeItem("usernameLogin");/* Chuy???n sang d???ng JSon */
        sessionStorage.removeItem("passwordLogin");/* ?????y l??n localStorage */
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
                title : 'kh??ng ????ng m???t kh???u!',
                icon : 'warning'
            });
            return;
        }  
        if ($scope.newPasswordChange !== $scope.confirmPasswordChange){
            Swal.fire({
                title : 'M???t kh???u m???i v?? x??c nh???n m???t kh???u kh??ng gi???ng nhau!',
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
                title : '?????i m???t kh???u th??nh c??ng!',
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
                        /* alert("M???t kh???u: "+listStudents[index].password); */
                        Swal.fire({
                            title: 'M???t kh???u: '+listStudents[index].password,
                            text: 'C?? c??i m???t kh???u c??ng kh??ng nh???!',
                        })
                        break;
                    }
                }
            }
            
        }
        if (flagEmail !== true || flagUser !== true) {
            Swal.fire({
                title: "kh??ng t??m th???y t??i kho???n",
                text: 'Vui l??ng nh???p ch??nh x??c th??ng tin!',
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
                alert("th??nh c??ng!"); 
                
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
    } /* ?????y L??n localStorage */

    $scope.getJsonLocalStorage = function(key){
        const getJson = JSON.parse(localStorage.getItem(key)); 
        return getJson;
    } /* l???y list */

    $scope.removeJsonLocalStorage = function(key){
        localStorage.removeItem(key);
    } /* x??a */

    $scope.setJsonSessionStorage = function(key,Object){
        const setNewJson = JSON.stringify(Object); 
        sessionStorage.setItem(key, setNewJson);
    } /* ?????y L??n sessionStorage */

    $scope.getJsonSessionStorage = function(key){
        const getJson = JSON.parse(sessionStorage.getItem(key)); 
        return getJson;
    } /* l???y list sessionStorage */

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