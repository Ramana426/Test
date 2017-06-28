
      var vzApp = angular.module("vzApp", ['ngAnimate', 'ui.bootstrap','ngTable']);
      
      vzApp.filter('unique', function () {
     	 return function ( collection, keyname) {
     	     var output = [],
     	         keys = []
     	         found = [];

     	     if (!keyname) {

     	         angular.forEach(collection, function (row) {
     	             var is_found = false;
     	             angular.forEach(found, function (foundRow) {

     	                 if (foundRow == row) {
     	                     is_found = true;                            
     	                 }
     	             });

     	             if (is_found) { return; }
     	             found.push(row);
     	             output.push(row);

     	         });
     	     }
     	     else {

     	         angular.forEach(collection, function (row) {
     	             var item = row[keyname];
     	             if (item === null || item === undefined) return;
     	             if (keys.indexOf(item) === -1) {
     	                 keys.push(item);
     	                 output.push(row);
     	             }
     	         });
     	     }

     	     return output;
     	 };
     	 });
      
      
         vzApp.controller('selectListCtrl', function ($scope, $log,$http, NgTableParams) {
        	 
        		$scope.submittedError =0;
			
				$scope.submittedSuccess = 0;
        	 $scope.loading = 0;
        	 $scope.companycodes = [];
        	 $scope.dropsdowns = [];
        	 $scope.obj = [];
        	 $scope.stateValues = [];
        	 $scope.necaValues = [];
        	 $scope.stateValuesOriginal = [];
        	 $scope.necaValuesOriginal = [];
		
        	 
        	 $http({
     			method : "GET",
     			url : "/getDropDownsEthernet",		
     	        headers: { 'Content-Type': 'application/json' }
     			}).success(function (data, status, headers, config) {
     				 
     				console.log("length is "+JSON.stringify( data));
     				
     				$scope.obj = data;
     				for (var i=0; i <  $scope.obj.length; i++)
      			   {        			      
     				$scope.companycodes[i] =  $scope.obj[i].carrierAbbr;
     				
     				for(var j=0; j <  $scope.obj[i].list1Exists.length; j++)
     					
     					$scope.necaValues.push($scope.obj[i].list1Exists[j]);
     				
     				for(var k=0; k <  $scope.obj[i].list2Exists.length; k++)
     					$scope.stateValues.push($scope.obj[i].list2Exists[k]);
     				}
     				console.log("successfully received the drop downs" + JSON.stringify( $scope.companycodes)); 

        			$scope.stateValuesOriginal = $scope.stateValues;
        			$scope.necaValuesOriginal = $scope.necaValues;
        			$scope.loading = 1;
     			
     	   }).error(function (data, status, headers, config) {
     			console.log("failure getting drop downs")
     		});
     	    
        	
		 $scope.requestjson = {};
		 
         $scope.submitted = 0;  
		 $scope.selectedInputOption = null;  
		 
		 $scope.buttonCarrierIdLabel = 'Select Item';
		 $scope.buttonStateLabel = 'Select Item';	 
		 $scope.buttonNecaIdLabel = 'Select Item';	 
		
		 $scope.selectedItem="1";
         $scope.items = [
         'Fahim',
         'Gopi',
         'Rachel',
         'Ronald',
         'Lara',
         'Louise',
         'Cesar',
         'Henry',
         'Mike',
         'Marie',
         ];
         
    
		 
		 
		 
		 $scope.carrierid =["101","102","103","104","105"]
		 
		 
		 $scope.state =["NJ", "WV", "MN", "OK", "SD", "AL", "ND", "WY", "CA", "VA", "AR", "WI", "NM", "MA", "TN", "OH",
            "NE", "MD", "MI", "GA", "ME", "IL", "KS", "UT", "NH", "NY", "SC", "IA", "DC", "CO",
            "MT", "RI", "DE", "FL", "LA", "MS", "IN", "MO", "CT", "TX", "NV", "ID", "WA", "VT", "HI", "PA", "NC", "AZ", "OR", "KY"];
		 $scope.necaid =["7241","7242","7243","7244","7245"]
		 
		 
		 $scope.oneAtATime = true;
		    $scope.groups = [{
		      title: 'Cameo Ruggadization ',      
		      isFirstOpen:true	
		    }];
		    
		    
		    $scope.submitted = 0;
		    $scope.status = {
		      isCustomHeaderOpen: false,
		      isFirstOpen: true,
		      isFirstDisabled: false
		    };
		    
			$scope.oneAtATime1= true;
		    $scope.groups1 = [{
		      title: 'Results',		      
		      isFirstOpen:true	
		    }];
		    $scope.status1 = {
		      isCustomHeaderOpen: false,
		      isFirstOpen: true,
		      isFirstDisabled: true
		    };
		
		 
         $scope.status = {
         isopen: false
         };
		 
		 
		 $scope.carrieridStatus = {
         isopen: false
         };
		 
          
		 $scope.necaidStatus = {
         isopen: false
         };
		 
		 $scope.stateStatus = {
         isopen: false
         };
		 
		 
         $scope.selectItem = function( item ) {
		 
		 $scope.myclear();
         $scope.selectedItem = item.id;
         $scope.buttonLabel = item.name;
         };
        
         $scope.selectCarrierId = function( item ) {
             $scope.requestjson.carrierId = item;
             $scope.buttonCarrierIdLabel = item;
             $scope.buttonNecaIdLabel = "Select Item";
             $scope.requestjson.necaId = "";
             $scope.requestjson.state = "";
             $scope.buttonStateLabel = "Select Item";

             for (var i=0; i < $scope.obj.length; i++){
            	
            	    if ($scope.obj[i].carrierAbbr == item)
            	     {
            	    	 $scope.necaValues =  $scope.obj[i].list1Exists;
            	    	 $scope.stateValues =  $scope.obj[i].list2Exists;
          				console.log("successfully received the drop downs" + JSON.stringify( $scope.necaValues));   
         				console.log("successfully received the drop downs" + JSON.stringify( $scope.stateValues));   	 
            	     }
             }
             
             };
     
		 
		  $scope.selectNecaId = function( item ) {
         $scope.requestjson.necaId= item;
         $scope.buttonNecaIdLabel = item;
         };
		 
		 $scope.selectState = function( item ) {
         $scope.requestjson.state= item;
         $scope.buttonStateLabel = item;
         };
         $scope.asg=0;
		
		 $scope.mysavefunc = function() {	

     		$scope.submittedError = 0;
			
				$scope.submittedSuccess = 0;
	
		  if( $scope.requestjson.necaId != ""   &&   $scope.requestjson.carrierId != ""   && $scope.requestjson.state != "" ){
				console.log($scope.requestjson); 
					console.log("entered 1 st http call- this inserts the data"+JSON.stringify($scope.requestjson));	   
			
			$http({
	 			method : "POST",
	 			data :  $scope.requestjson,
	 			url : "/getEthernetValues",
	 			headers:{'Content-Type': 'application/json'}
				}).success(function (data, status, headers, config) {
	    			
	    			if(data == "Failed. Try Again."){
	    				console.log("error try again");
	    				   			}
	    			else{  
	    				var json = {};
	    				if( (data.ratesVOList).length == 0)
	    				{
	    					$scope.submittedError = 1;
	    					$scope.noVal = "No values to display";
	    				}
	    				else{
	    					$scope.submittedSuccess = 1;
	    					//$scope.status1[0].isFirstOpen = true;
	    				$scope.tableParams = new NgTableParams({}, { dataset: data.ratesVOList});	  
	    				}
	    			}
	        }).error(function (data, status, headers, config) {

				console.log("error try again");
	 		});
		  }
		}; 
		
		
		 $scope.myclear = function() {        
      
   	  $scope.stateValues = $scope.stateValuesOriginal;
	  $scope.necaValues = $scope.necaValuesOriginal;
	  
		 $scope.selectedInputOption = null;  
		 
		 $scope.buttonCarrierIdLabel = 'Select Item';
		 $scope.selectedCarrierId = "";
		 
		 $scope.buttonNecaIdLabel = 'Select Item';
		 $scope.selectedNecaId = "";
		  
		 $scope.buttonStateLabel = 'Select Item';
		 $scope.selectedState = "";
		 
		 $scope.submittedError = 0;
		
			$scope.submittedSuccess = 0;
		   }; 
		   
		
		 
         });
         
