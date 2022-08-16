app.controller("ctrl_tested", function($scope, $http){
    $scope.accountLoginInformation = $scope.getJsonSessionStorage('accountLogin'); 
    const urlTested = 'https://620e0b94585fbc3359d4d271.mockapi.io/User/'+$scope.accountLoginInformation.id+'/Test';
    $scope.userTested = [];
    $http.get(urlTested).then(function(response){
        $scope.userTested = response.data;
    });
    $scope.getJsonSessionStorage = function(key){
        const getJson = JSON.parse(sessionStorage.getItem(key)); 
        return getJson;
    } /* lấy list sessionStorage */
});