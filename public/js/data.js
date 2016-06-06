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
	$scope.Sa = [];
	$scope.pick = function(){
		$scope.mform.a = 'C';
		$scope.Sa.push($scope.mform.a);
	};
	$scope.result = function(){
		var d = 0;
		$scope.Answer = $scope.User.Question;
		var keys = Object.keys($scope.User.Question);
		var len = keys.length;
		$scope.l = len;
		for(var i = 0 ; i < len ; i++)
		{
			//if($scope.Answer[0].Ans == $scope.mform.Ans){
				//d++;
			//}
		}
		$scope.Sum = d;
	};
});