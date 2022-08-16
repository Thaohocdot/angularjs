app.controller("ctrl_listQuiz", function($scope, $http){
    const subject = $scope.getJsonSessionStorage("choiceSubject");
    $scope.quiz = {
        Answers : [
            {Id : 1, Text},
            {Id : 2, Text},
            {Id : 3, Text},
            {Id : 4, Text}
        ]
    };

    /* $scope.answer.Text1 = "";
    $scope.answer.Text2 = "";
    $scope.answer.Text3 = "";
    $scope.answer.Text4 = ""; */

    $scope.listQuiz = [];
    $scope.isLoading = false;
    const url = 'https://621384a3f43692c9c6079d63.mockapi.io/subjects/'+subject.id+'/quizs';
    $scope.isLoading = true;
    $http.get(url).then(
        function(response){
            $scope.isLoading = false;
            $scope.listQuiz = response.data;
        }
    ).catch(function (error) {
        console.log(error);
        $scope.isLoading = false;
    });

    $scope.saveQuiz = function(){
        $scope.copyAnswer();
        $scope.isLoading = true;
        if (typeof $scope.quiz.id === 'undefined') {
            $http.post(url, $scope.quiz).then(function(response){
                $scope.loadingTable();
                $scope.isLoading = false;
                /* $scope.listQuiz.push(angular.copy($scope.quiz)); */
                Swal.fire({
                    title : 'Thành công!',
                    icon : 'success'
                });
            }).catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
            });
        } else {
            const urlUpdate = url+'/'+$scope.listQuiz[$scope.index].id;
            $http.put(urlUpdate, $scope.quiz).then(function(response){
                $scope.isLoading = false;
                $scope.listQuiz[$scope.index] = angular.copy($scope.quiz);
                Swal.fire({
                    title : 'Thành công!',
                    icon : 'success'
                });
            }).catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
            });
        }
    };

    $scope.delete = function(index){
        Swal.fire({
            icon : 'question',
            title: 'Xác nhận xóa môn này!',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            confirmButtonColor: 'green'
        }).then((result) => {
            if (result.isConfirmed) {
                const urlDelete = url+'/'+$scope.listQuiz[index].id;
                $scope.isLoading = true;
                $http.delete(urlDelete).then(function(response){
                    $scope.isLoading = false;
                    $scope.listQuiz.splice(index, 1);
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
    $scope.index = -1;
    $scope.update = function(index){
        $scope.index = index;
        $scope.quiz = angular.copy($scope.listQuiz[index]);
        $scope.loadAnswerForm($scope.quiz);
    };

    $scope.copyAnswer = function(){
        for (let i = 0; i < $scope.quiz.Answers.length; i++) {
            if (i === 0) {
                $scope.quiz.Answers[0].Text = $scope.answerText1;
            } else if (i === 1) {
                $scope.quiz.Answers[1].Text = $scope.answerText2;
            } else if (i === 2) {
                $scope.quiz.Answers[2].Text = $scope.answerText3;
            } else if (i === 3) {
                $scope.quiz.Answers[3].Text = $scope.answerText4;
            }
        }
    };

    $scope.loadAnswerForm = function(quiz){
        for (let i = 0; i < quiz.Answers.length; i++) {
            if (i === 0) {
                $scope.answerText1 = quiz.Answers[0].Text;
            } else if (i === 1) {
                $scope.answerText2 = quiz.Answers[1].Text;
            } else if (i === 2) {
                $scope.answerText3 = quiz.Answers[2].Text;
            } else if (i === 3) {
                $scope.answerText4 = quiz.Answers[3].Text;
            }         
        }
    };

    $scope.loadingTable = function(){
        $http.get(url).then(
            function(response){
                $scope.listQuiz = response.data;
            }
        ).catch(function (error) {
            console.log(error);
            $scope.isLoading = false;
        });
    }

    $scope.setJsonSessionStorage = function(key,Object){
        const setNewJson = JSON.stringify(Object); 
        sessionStorage.setItem(key, setNewJson);
    } /* đẩy Lên sessionStorage */

    $scope.getJsonSessionStorage = function(key){
        const getJson = JSON.parse(sessionStorage.getItem(key)); 
        return getJson;
    } /* lấy list sessionStorage */
});