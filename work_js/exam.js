/* var app = angular.module("myApp", []); */
app.controller("ctrl_Exam", function($scope, $http, $interval, $location, $window, $routeParams){
    $scope.quiz = [];
    $scope.b = "alo";
    /* const getLink = sessionStorage.getItem("linkToTest"); */
    $scope.getLink = $routeParams.idQuiz;
    $http.get("db/Quizs/"+$scope.getLink+".js").then(function(response){
        $scope.quizList = response.data;
        $scope.quiz = angular.copy($scope.quizList);
        $scope.totalQuiz = $scope.quiz.length-1;
        $scope.indexQuiz = 0; 
        $scope.markQuiz = 0;
        /* var answerQuiz = {
            index : "-1",
            answer : ""
        };  */
        var answerQuizS = []; 

        $scope.prev = function(){
            if ($scope.indexQuiz > 0) {
                $scope.indexQuiz -= 1;
               
                $interval(function(){        
                    if (answerQuizS.indexOf($scope.indexQuiz) !== -1) {
                        /* if ($scope.indexQuiz === parseInt(answerQuizS[$scope.indexQuiz].index)) { */
                            document.getElementById("anwser").disabled = true;
                        /* }   */
                    } 
                }, 1000);
            }
             
        };/* prev */
        $scope.next = function(){
            if ($scope.indexQuiz < $scope.totalQuiz) {
                $scope.indexQuiz += 1;
                $interval(function(){        
                    if (answerQuizS.indexOf($scope.indexQuiz) !== -1) {
                        /* if ($scope.indexQuiz === parseInt(answerQuizS[$scope.indexQuiz].index)) { */
                            document.getElementById("anwser").disabled = true;
                        /* }   */
                    } 
                }, 1000);
            }
            
        };/* next */
        $scope.start = function(){
            $scope.indexQuiz = 0;
            $interval(function(){        
                if (answerQuizS.indexOf($scope.indexQuiz) !== -1) {
                    /* if ($scope.indexQuiz === parseInt(answerQuizS[$scope.indexQuiz].index)) { */
                        document.getElementById("anwser").disabled = true;
                    /* }   */
                } 
            }, 1000);
        };
        $scope.last = function(){
            $scope.indexQuiz = $scope.totalQuiz;
            $interval(function(){        
                if (answerQuizS.indexOf($scope.indexQuiz) !== -1) {
                    /* if ($scope.indexQuiz === parseInt(answerQuizS[$scope.indexQuiz].index)) { */
                        document.getElementById("anwser").disabled = true;
                    /* }   */
                } 
            }, 1000);
        };
        $scope.a = "0";
        $scope.submit = function(){
           /*  $scope.hideBtn = true; */
            var dapAn =  $scope.quiz[$scope.indexQuiz].AnswerId;/* dap an trong list quiz */
           /*  $scope.b = $scope.quiz[$scope.indexQuiz].a;  */
            var dapAn2 =  parseInt($scope.quiz[$scope.indexQuiz].a); /* dap an user chon */
           /*  $scope.number =  parseInt($scope.; */
            if (typeof $scope.quiz[$scope.indexQuiz].a === 'undefined') {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                  });
                Toast.fire(
                'The Answer?',
                'That thing is still around?',
                'question'
                );
                return;
                /* alert("thành công "+$scope.account); */
            }else{
                if (dapAn === dapAn2) {
                    $scope.quiz[$scope.indexQuiz].choice1 = true;
                    /* alert("thanh cong"+$scope.quiz[$scope.indexQuiz].a + dapAn); */
                    $scope.markQuiz += 1;
                    document.getElementById("anwser").disabled = true;

                    const Toast = Swal.mixin({                       
                        position: 'center',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                    });
                    Toast.fire(
                        'Good job!',
                        'Ờ mây zing gút chóp em',
                        'success'
                    );
                } else {
                    $scope.quiz[$scope.indexQuiz].choice2 = true;
                   /*  alert("Khong thanh cong"+$scope.quiz[$scope.indexQuiz].a + dapAn); */
                    document.getElementById("anwser").disabled = true;

                    const Toast = Swal.mixin({                       
                        position: 'center',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                    });
                    Toast.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    });
                }
                /* answerQuiz.index = $scope.indexQuiz;
                answerQuiz.answer = dapAn2; */
                answerQuizS.push($scope.indexQuiz);
                answerQuizS.sort(function(a,b){return a - b});
                /* $scope.po = answerQuizS[answerQuizS.length-1].index; */
                $scope.okk = answerQuizS;
            }
        };

        $scope.finishTest = function(){
            if ($scope.indexQuiz === $scope.totalQuiz) {
                return true;
            }else{
                return false;
            }
        }
    });

    $scope.ok = function(){
        $scope.qo = $scope.okla;
    }/* demo */

    $scope.m = 30;
    $scope.s = 0;

    $interval(function(){        
            if ($scope.m === 0 && $scope.s === 0) {
                Swal.fire({
                    title: 'Time Out!',
                    text: $scope.markQuiz+"/"+$scope.totalQuiz,
                    imageUrl: "https://i.pinimg.com/originals/bc/ee/bf/bceebfa72d3a5933cb0e9cf319bb67ae.gif",
                    imageWidth: 450,
                    imageHeight: 200,
                    imageAlt: 'Custom image',
                    confirmButtonText : "Ok",
                    confirmButtonColor : "green"
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.replace("index.html");
                    }else{
                        location.replace("index.html");
                    }
                });
            }
            if ($scope.s == 0) {
                $scope.m -= 1;
                $scope.s = 59;
            } else {
                $scope.s -= 1;
            }
    }, 1000);
    $scope.number = 500;/* demo */
    $scope.InformationTested = {};
    $scope.endTest = function(){
        Swal.fire({
            icon : 'question',
            title: 'Xác nhận hoàn thành!',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            confirmButtonColor: 'green'
          }).then((result) => {
            if (result.isConfirmed) {
                const accountLoginTest = $scope.getJsonSessionStorage('accountLogin');/* lấy tài khoản */
                $scope.InformationTested.lesson = $scope.getLink;
                $scope.InformationTested.marks = $scope.markQuiz;
                const url = 'https://620e0b94585fbc3359d4d271.mockapi.io/User/'+accountLoginTest.id+'/Test';
                $http.post(url, $scope.InformationTested).then(
                    function(response){
                        console.log('finished');
                    }
                );/* thêm vào lịch sử */
                
                Swal.fire({
                    title: 'Finished!',
                    text: $scope.markQuiz+"/"+$scope.totalQuiz,
                    imageUrl: "https://genk.mediacdn.vn/k:2016/6-1474109930503/15tamanhgifphananhhoanhaocamgiaccuafanhammoanime.gif",
                    imageWidth: 450,
                    imageHeight: 200,
                    imageAlt: 'Custom image',
                    confirmButtonText : "Ok",
                    confirmButtonColor : "green",
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.replace("index.html");
                    } else if (result.isDenied) {
                        location.replace("ListUserAnswer.html");
                    }else{
                        location.replace("index.html");
                    }
                });
            } 
        });
        
    }

    $scope.getJsonSessionStorage = function(key){
        const getJson = JSON.parse(sessionStorage.getItem(key)); 
        return getJson;
    } /* lấy list sessionStorage */
});