var myApp = angular.module('myApp', ['ngAnimate','firebase']);
myApp.controller("Writer",function($scope,$firebaseObject,Data){ 
	var ref = new Firebase("https://dack-a55e3.firebaseio.com/User");
	var syncObject = $firebaseObject(ref);
	syncObject.$bindTo($scope, 'User');
	
	$scope.click = function() {
			$scope.checked = !$scope.checked;
		};
	$scope.Game = function() {
			if(Data.getMem() != null)
			{
				$scope.Writer = true;
				$scope.Info = true;
				$scope.Point = false;
			}
			else
				alert("Bạn phải đăng nhập để thực hiện chức năng này");
		};
	$scope.Menu = function() {
		if($scope.Writer == true)
		{
			$scope.Writer = !$scope.Writer;
			$scope.Info = false;
		}
		if($scope.Point == true)
		{
			$scope.Point = !$scope.Point;
			$scope.Info = false;
		}
		};
	$scope.result = function(){
		$scope.Writer = !$scope.Writer;
		$scope.Point = true;
		$scope.checkedTest = false;
		};
});

myApp.controller("Question",function($scope,$timeout,Data){ 
	var stopped;
	$scope.counter = 30;
    $scope.countdown = function() {
		$scope.checkedTest = true;
		if($scope.counter == 0)
		{
			$scope.checkedTest = false;	
			$timeout.cancel(0);	
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

myApp.controller("Result",function($scope,Data){ 
	var len;
	//$scope.result = function(){
		//$scope.Writer = !$scope.Writer;
		//$scope.Point = !$scope.Point;
		//$scope.Answer = $scope.User.Question;
		
		
	//};
});

myApp.controller("Checkbox",function($scope,Data){ 
	$scope.pick = function(id){
		if($scope.User.Question[id].Ans == $scope.mform.a )
		{
			Data.set(1,id);
		}
		var keys = Object.keys($scope.User.Question);
		len = keys.length;
		Data.setQ(len);
	};	
});

myApp.controller("Comment",function($scope,Data){ 
	var Comment =["Không ngờ bạn yếu như vậy !","Về học lại đi nha ! Chưa được đâu","Cũng được đấy ! Cần cố gắng","Giỏi quá ta !","Bạn quá Pro ! Xin thua !"];
	$scope.equal = function()
	{
		$scope.Sum = Data.get();
		$scope.Leng = Data.getQ();
		if($scope.Sum  <= 3)
		{
			$scope.comment = Comment[0];
		}
		else
		{
			if( $scope.Sum  <= 5)
				$scope.comment = Comment[1];
			else
			{
				if($scope.Sum  <= 7)
					$scope.comment = Comment[2];
				else
				{	
					if($scope.Sum  <= 9)
						$scope.comment = Comment[3];
					else
						$scope.comment = Comment[4];					
				}
			}

		}
	}
});

myApp.controller("FaceBook", ["$scope", "Auth","Data",
	  function($scope, Auth,Data) {
		$scope.auth = Auth;
		// any time auth status updates, add the user data to scope
		$scope.auth.$onAuth(function(authData) {
		  $scope.authData = authData;	
		  
		  $scope.name = authData.facebook.email;
			Data.setMem($scope.name);
		});
		
		$scope.Register = function()
		{
			$scope.AuthEmail = true;
		};	
		$scope.RegisterEmail = function(){
			var strEmail = $scope.txtEmail;
			var strPass = $scope.txtPass;
			if(strEmail.search("@gmail.com") != -1 && strPass.length > 6)
			{
				
				var ref = new Firebase("https://fb-login-loc.firebaseio.com/");
				ref.createUser({
				  email    : $scope.txtEmail,
				  password : $scope.txtPass
				}, function(error, userData) {
				  if (error) {
					console.log("Error creating user:", error);
				  } else {
					console.log("Successfully created user account with uid:", userData.uid);
				  }
				});
				$scope.AuthEmail = false;
			}
			else{
				alert("Tài khoàn hoặc mật khẩu đăng ký không hợp lệ");
			}
		};	
		$scope.Cancel = function(){
			$scope.AuthEmail = false;
		};
	  }
]);


myApp.factory('Data', function(){
    var point = [];
	var Admin = "trandinhloc1312343@gmail.com";
	var Member = null;
	var time = 30;
	var Q ;
	return {
		getMem: function(){
			return Member;
		},
		setMem: function(value){
			Member = value;
		},
		getAdmin: function(){
			return Admin;
		},
		setQ: function(value){
			Q = value;
		},
		getQ: function(){
			return Q;
		},
		setTime: function(value){
			time = value;
		},
		getTime: function(){
			return time;
		},
        set: function ( value,id) {
            point[id] = 1; 
        },
        get: function () {
			var sum = 0;
			for(var i in point)
			{
				sum += !isNaN(parseInt(i));
			}
            return sum;
        }
    };
});

	myApp.factory("Auth", ["$firebaseAuth",
	  function($firebaseAuth) {
		var ref = new Firebase("https://fb-login-loc.firebaseio.com/");
		return $firebaseAuth(ref);
	  }
	]);
	

	