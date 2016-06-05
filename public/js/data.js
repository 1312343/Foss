var myApp = angular.module('myApp', ['firebase']);
myApp.controller("Writer",function($scope,$firebaseObject){ 
	var ref = new Firebase("https://dack-a55e3.firebaseio.com/User");
 
	var syncObject = $firebaseObject(ref);
	syncObject.$bindTo($scope, 'User');
	$scope.click = function() {
			$scope.checked = !$scope.checked;
		};
	$scope.Game = function() {
			$scope.Writer = !$scope.Writer;
		};
	$scope.Menu = function() {
		if($scope.Writer == true)
			$scope.Writer = !$scope.Writer;
		};
});

myApp.controller("Question",function($scope,$timeout){ 
	$scope.counter = 30;
	var stopped;
    $scope.countdown = function() {
		$scope.checkedTest = true;
		if($scope.counter == 0)
		{
			$timeout.cancel(counter); 
		}
		else
		{
			stopped = $timeout(function() {
			   console.log($scope.counter);
			 $scope.counter--;   
			 $scope.countdown();  
				
			}, 1000);
		}
	  };
});

myApp.controller("Result",function($scope){ 
	$scope.result = function(){
		$scope.Answer = $scope.User.Question ;
		$scope.ans = [];
		var keys = Object.keys($scope.Answer);
		$scope.len = keys.length;
	};
});