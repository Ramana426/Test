angular.module('vplan-app').controller("CollaborateModifySectionController", function ($state,$scope,$filter,$window,$interval,uiGridConstants,$uibModal,
		ModifySectionService) {
	
	
	var regionA ='';
	var countryA ='';
	var stateA ='';
	var cityA ='';
	var locA ='';
	var regionZ ='';
	var countryZ ='';
	var stateZ ='';
	var cityZ ='';
	var locZ='';
	var sectionId=sessionStorage.getItem("sectionidfromsearch1");
	console.log(sectionId);
	    $scope.changeElemnetActive='N';

	$scope.selectedDemandId = '';
	//$scope.selectedSectionId="CPA-2017-0001-26.2017";
	$scope.selectedPlanningGrp = '';
	$scope.selectedMuxLevel = '';
	$scope.demandCategory = '';
	
	$scope.selectedRegA = '';
	$scope.selectedCountryA = '';
	$scope.selectedRegZ = '';
	$scope.selectedCountryZ = '';
	$scope.selectedStateA = '';
	$scope.selectedCityA = '';
	$scope.selectedStateZ = '';
	$scope.selectedCityZ = '';
	$scope.selectedlocA = '';
	$scope.selectedlocZ = '';
	$scope.modifyData = [];
	
	$scope.aLocVal = '';
	$scope.zLocVal = '';
	$scope.locARows= 1;
	$scope.maxLocARows =1;
	$scope.locZRows= 1;
	$scope.maxLocZRows =1;
	$scope.typeAFlag = false;
	$scope.typeZFlag = false;
	$scope.typeSearchA='';
	$scope.typeSearchZ='';
	$scope.showIndex = false;
	
	$scope.secid1='';
	
	$scope.demandStatus='';
	$scope.sectionStatus='';
	 

	 var transport=sessionStorage.getItem("transport");
		$scope.transportfl=transport;
		var Bplanner=sessionStorage.getItem("Bplanner");
		$scope.Bplannerfl=Bplanner;
		
		var secStatusBp= sessionStorage.getItem("secStatusBp");
		$scope.secStatusBpfl=secStatusBp;
	 $scope.toggleScreens = function(input) {
			
			console.log("Input:", input);	
			$state.go(input);
			
		}
	 
	 
	 
	 

		// ID Map
		$scope.idMap = {
			 'demandId'              	:           { 'modelType' : 'array', 'id':'demandId','value':'Demand Id','model' :'demandId','label':'demandId','selected':'selectedDemandId'},
			 'sectionId'             	:           { 'modelType' : 'array', 'id':'sectionId','value':'Section Id','model' :'sectionId','label':'sectionId','selected':'selectedSectionId'},
			 'planningGrp'           	: 			{ 'modelType' : 'array', 'id':'planningGroup','value':'Planning Group','model' :'planningGrps','label':'planningGrp','selected':'selectedPlanningGrp'},
			 'demandStatus' 			: 			{ 'modelType' : 'array', 'id': 'demandStatus', 'value': 'Demand Status' , 'model' : 'demandStatuses' , 'label' : 'demandStatus' , 'selected' : 'selectedDemandStatus' }, 
			 'sectionStatus' 			: 			{ 'modelType' : 'array', 'id': 'sectionStatus', 'value': 'Section Status' , 'model' : 'sectionStatuses' , 'label' : 'sectionStatus' , 'selected' : 'selectedsectionStatus' }, 

			 'demandCategory' 			: 			{ 'modelType' : 'array', 'id': 'demnadCategory', 'value': 'Demand Category' , 'model' : 'demandCategories' , 'label' : 'demandCategory' , 'selected' : 'selectedDemandCategory' },
			 'driver' 					: 			{ 'modelType' : 'array', 'id': 'driver', 'value': 'Driver' , 'model' : 'drivers' , 'label' : 'driver' , 'selected' : 'selectedDriver' },
			 'demandType' 				: 			{ 'modelType' : 'array', 'id': 'demandType', 'value': 'Demand Type' , 'model' : 'demandTypes' , 'label' : 'demandType' , 'selected' : 'selectedDemanType'},
			 'planYear' 				: 			{ 'modelType' : 'array', 'id': 'planYear', 'value': 'Plan Year' , 'model' : 'planYears' , 'label' : 'planYear' , 'selected' : 'selectedPlanYear'},
			 'rftDate' 					: 			{ 'modelType' : 'array', 'id': 'rftDate', 'value': 'RFT Date' , 'label' : 'rftDate' },
			 'qty'          			:			{ 'modelType' : 'array', 'id': 'qty', 'value': 'Quantity' , 'model' : 'quantities' , 'label' : 'qty' , 'selected' : 'selectedQuantity'},
			 'muxLevel'          		:			{ 'modelType' : 'array', 'id': 'muxLevel', 'value': 'Mux Level' , 'model' : 'muxLeveles', 'label' : 'muxLevel', 'selected': 'selectedMuxLevel' },
			 'equipmentType'          	:			{ 'modelType' : 'array', 'id': 'equipmentType', 'value': 'Equipment Type' , 'model' : 'eqpTypes' , 'label' : 'equipmentType' , 'selected' : 'selectedEqpType'},
			 'equipmentModel'          	:			{ 'modelType' : 'array', 'id': 'equipmentVendor', 'value': 'Equipment Model' , 'model' : 'eqpModels' , 'label' : 'equipmentVendor' , 'selected' : 'selectedEqpModel'},
			 'regA'          			:			{ 'modelType' : 'array', 'id': 'regionA', 'value': 'Region A' , 'model' : 'regAs' , 'label' : 'regionA' , 'selected' : 'selectedRegA'},
			 'countryA'          		:			{ 'modelType' : 'array', 'id': 'countryA', 'value': 'Country A' , 'model' : 'countryAs' , 'label' : 'countryA' , 'selected' : 'selectedCountryA'},
			 'stateA'          			:			{ 'modelType' : 'array', 'id': 'stateA', 'value': 'State A' , 'model' : 'stateAs' , 'label' : 'stateA' , 'selected' : 'selectedStateA'},
			 'cityA'          			:			{ 'modelType' : 'array', 'id': 'cityA', 'value': 'City A' , 'model' : 'cityAs' , 'label' : 'cityA' , 'selected' : 'selectedCityA'},
			 'locationA'          		:			{ 'modelType' : 'array', 'id': 'siteCodeA', 'value': 'Location A' , 'model' : 'locAs' , 'label' : 'siteCodeA' , 'selected' : 'selectedlocA'},
		     
			 
			 'regZ'          			:			{ 'modelType' : 'array', 'id': 'regionZ', 'value': 'Region Z' , 'model' : 'regZs' , 'label' : 'regionZ' , 'selected' : 'selectedRegZ'},
			 'countryZ'          		:			{ 'modelType' : 'array', 'id': 'countryZ', 'value': 'Country Z' , 'model' : 'countryZs' , 'label' : 'countryZ' , 'selected' : 'selectedCountryZ'},
			 'stateZ'          			:			{ 'modelType' : 'array', 'id': 'stateZ', 'value': 'State Z' , 'model' : 'stateZs' , 'label' : 'stateZ' , 'selected' : 'selectedStateZ'},
			 'cityZ'          			:			{ 'modelType' : 'array', 'id': 'cityZ', 'value': 'City Z' , 'model' : 'cityZs' , 'label' : 'cityZ' , 'selected' : 'selectedCityZ'},
			 'locationZ'          		:			{ 'modelType' : 'array', 'id': 'siteCodeZ', 'value': 'Location Z' , 'model' : 'locZs' , 'label' : 'siteCodeZ' , 'selected' : 'selectedlocZ'},
			 'businessCase'	            :           { 'modelType' : 'array', 'id':'businessCase','value':'Business Case','model' :'businessCases','label':'businessCase','selected':'selectedBusinessCase'},
             'budgetOwner'              :           { 'modelType' : 'array', 'id':'budgetOwner','value':'Budget Owner','model' :'budgetOwner','label':'budgetOwner','selected':'selectedBudgetOwner'},
             'aLocAddressVal'			:			{ 'modelType' : 'string', 'id': 'aLocAddress',  'model' : 'aLocAddressVal' },
			 'zLocAddressVal'			:			{ 'modelType' : 'string', 'id': 'zLocAddress', 'model' : 'zLocAddressVal' }
  		};
	 
	
	$scope.onInit = function()
	{
		$scope.secid();
	
		$window.scrollTo(0, 0);
		
		//$scope.getDemandId();
		//$scope.getSectionId();
		$scope.getSectionDetailsById();
		
		
	 	
	 	//$scope.getSectionSearchResults();
	 
	}
	
	$scope.open = function () {
		var modalInstance = $uibModal.open({
		  templateUrl: 'myModalContent.html', //refers to modal content
		  controller: 'modalInstanceCtrl', //inner controller
		  scope: $scope, //scope elements
		  ariaLabelledBy: 'modal-title',
		  ariaDescribedBy: 'modal-body',
		});

	}; 

	$scope.secid=function()
     
     {
           
		 //alert("insidesecid=====");
         var url = window.location.search.substring(1); 
            
	
         //var url ="http://localhost:7001/transport-collaborate/sections.html?user_id=2267&roles=BudgetPlanner_DemandSubmitter_GeneralUser_Engineer";
		 //_Transport Engineer_Budget Planner";
		 var result = {};
		 var count=0;
		 var roles2={};
		//debugger;
		  result=  url.split("&").forEach(function(part) {
			 
		    var item = part.split("=");
		    result[count] = decodeURIComponent(item[1]);
		    count++;
		    $scope.secid1=result[0];
		   resultroles=result[1];
		  });
		  
		  if(resultroles.match("Engineer")|| resultroles.match("BudgetPlanner") )
			 {
			    
			 // alert("iside===");
			 $scope.te=$scope.secid1;
			 }
		  else
			  {
			  $scope.te='';
			 // alert("else===");
			  }
		 // alert("resulroloescar==="+resultroles);,  , Engineering Admin
		  if(resultroles.match("BudgetPlanner") && resultroles.match("Engineer"))
			 {
			  $scope.transport=true;
				 $scope.Bplanner=true;
			 }
		  
		  else if(resultroles.match("Engineer") )
			 {
			    
			 // alert("iside===");
			 $scope.transport=true;
			 $scope.Bplanner=false;

			 }
		  
		  else  if(resultroles.match("BudgetPlanner") )
			 {
			    
			 // alert("iside===");
			 $scope.Bplanner=true;
			 $scope.transport=false;
			 }
		  else
			  {
			  $scope.Bplanner=false;
			  $scope.transport=false;
			 // alert("else===");
			  }
		  
		  $scope.roles=resultroles.split("_");
		 // alert("$SCIOPRROLES"+$scope.roles);
		  
		  //alert("result====="+$scope.secid1);
		  //alert("result====="+ $scope.roles);
		 // $scope.secid1=result.0;
		  
		  //alert($scope.secid1+"secid====");
		  
		  
		} ;
	
	
	
	
	
	$scope.transportCost = 0;
	$scope.switchCost = 0;
	$scope.otherCost = 0;
	$scope.totalCost = 0;
	$scope.ccr = '';
	$scope.submarine = '';
	$scope.secDetails = '';
	$scope.engCmnts='';
	
	$scope.total = function() { 
	    $scope.changeElemnetActive='Y';
	    /*if(isNaN($scope.transportCost) ||isNaN($scope.switchCost) ||isNaN($scope.otherCost) |isNaN($scope.totalCost))
	    	{
	    	alert("please enter numeric values only");
	    	return;
	    	}*/
	    if($scope.transportCost === undefined || $scope.transportCost ==="" ||$scope.transportCost ===''||$scope.transportCost ==='0' ||$scope.transportCost ===null)
		{
				var transportCost=0;

	    	}
	    else if($scope.transportCost != '0'|| $scope.transportCost != '' || $scope.transportCost != null ||$scope.transportCost != ""){
	    
	    var transportCost = parseInt($scope.transportCost.replace(/[$,]+/g, ''));

	   // alert(transportCost+"===floatvalue");
	    }
	    else{
	    	var transportCost=$scope.transportCost;

	    }
	    if($scope.switchCost === undefined || $scope.switchCost ==="" ||$scope.switchCost ===''||$scope.switchCost ==='0' ||$scope.switchCost ===null )
		{
				var switchCost=0;

	    	}
	    else if($scope.switchCost != '0'|| $scope.switchCost != '' || $scope.switchCost != null || $scope.switchCost != "" ){
	    var switchCost = parseInt($scope.switchCost.replace(/[$,]+/g, ''));
	    //alert(switchCost+"===floatvalue");
	    }
	    else{
	    	var switchCost=$scope.switchCost;
	    }
	    if($scope.otherCost === undefined || $scope.otherCost ==="" ||$scope.otherCost ===''||$scope.otherCost ==='0' ||$scope.otherCost ===null)
		{
				var otherCost=0;

	    	}
	    else if($scope.otherCost != '0'|| $scope.otherCost != '' || $scope.otherCost != null || $scope.otherCost != ""){
	    var otherCost = parseInt($scope.otherCost.replace(/[$,]+/g, ''));
	   // alert(otherCost+"===floatvalue");
	    }
	    else{
	    	var otherCost=$scope.otherCost;
	    }
	    
	    $scope.totalCost = parseInt(transportCost) + parseInt(switchCost) + parseInt(otherCost);
	    if($scope.totalCost === undefined ||$scope.totalCost === null){
	    	$scope.totalCost=totalCost;
	    }
	    else {
	    $scope.totalCost ="$" +($scope.totalCost).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
	    	}
	    if(transportCost === undefined || switchCost === null)
		{
			$scope.transportCost=transportCost;


	    	}
	    else{
	    $scope.transportCost ="$" +(transportCost).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');

	    }
	    if(switchCost === undefined ||switchCost === null )
		{
			$scope.switchCost=switchCost;

	    	}
	    else{
	    $scope.switchCost ="$" +(switchCost).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
	    }
	    if(otherCost === undefined || otherCost === null)
		{
			$scope.otherCost=otherCost;

	    	}
	    else{
	    $scope.otherCost ="$" +(otherCost).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
	    }
	    
	    

	}
	
	$scope.dollerChange=function()
	{
		if($scope.originalBudget === undefined || $scope.originalBudget === null
				|| $scope.originalBudget ===''   || $scope.originalBudget ==="")
	{
			var originalBudget=null;

    	}
    else if($scope.originalBudget != '0'|| $scope.originalBudget != '' || $scope.originalBudget != null ){
		    var originalBudget = parseInt($scope.originalBudget.replace(/[$,]+/g, ''));
		    //alert(originalBudget+"===floatvalue");
		    }
		    else{
		    	var originalBudget=null;
		    }
		if($scope.approvedBudget === undefined || $scope.approvedBudget === null
				|| $scope.approvedBudget ===''   || $scope.approvedBudget ==="")
		{
			var approvedBudget=null;

	    	}
	    else if($scope.approvedBudget != '0'|| $scope.approvedBudget != '' || $scope.approvedBudget != null ){
		    var approvedBudget = parseInt($scope.approvedBudget.replace(/[$,]+/g, ''));
		    //alert(approvedBudget+"===floatvalue");
		    }
		    else{
		    	var approvedBudget=null;
		    }
		if($scope.approvedFund === undefined || $scope.approvedFund === null
				|| $scope.approvedFund ===''   || $scope.approvedFund ==="")
		{
			var approvedFund=null;

	    	}
	    else if($scope.approvedFund != '0'|| $scope.approvedFund != '' ||$scope.approvedFund != null ){
		    var approvedFund = parseInt($scope.approvedFund.replace(/[$,]+/g, ''));
		   // alert(approvedFund+"===floatvalue");
		    }
		    else{
		    	var approvedFund=$scope.approvedFund;
		    }
		if(originalBudget === undefined || originalBudget === null
				|| originalBudget ===''   || originalBudget ==="")
		{
			$scope.originalBudget=originalBudget;

	    	}
	    else
	    	{
		    $scope.originalBudget ="$" +(originalBudget).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
	}
	if(approvedBudget === undefined || approvedBudget === null
			|| approvedBudget ===''   || approvedBudget ==="")
	{
		$scope.approvedBudget=approvedBudget;

    	}
    else{
		    $scope.approvedBudget ="$" +(approvedBudget).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    }
	if(approvedFund === undefined || approvedFund === null
			|| approvedFund ===''   || approvedFund ==="")
	{
		$scope.approvedFund=approvedFund;

    	}
    else{
		    $scope.approvedFund ="$" +(approvedFund).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    }

	}
	
	$scope.bpFeildsChangeElemnetActive = function() { 
	    $scope.changeElemnetActive='N';

	}
	
	
	// Emptying ''
	var emptyOptionalFields = function(obj, fields, suffix) {
		
		for(var i = 0; i < 2; i++) { 
			fields.forEach(function(element) {
				if(obj[element + suffix[i]] === 'Select') {
					obj[element + suffix[i]] = '';
				}
			});
		}
		
		
		//debugger;
		return obj;
	};
	
	
	
	var checkRequiredFields  = function(obj, fields, finalText){
		
		
		debugger;
		var count = 0;
		fields.forEach(function(element){
			if(obj[element.id] === 'Select' || obj[element.id] === ''){
				
				finalText.push(element.value);
			}
		});
		return finalText;
		
	}
	
	
	$scope.userRequest =  function(){
		console.log($scope.selectedlocA);
		console.log($scope.selectedCityA);
			
		return{
			
			 'demandId' 				: 			$scope.demandId,
			 'planningGroup' 				: 			$scope.planningGrp,
			 'transportEngineer'          :$scope.te,
			 'muxLevel'                  :$scope.muxLevel,
			 'sectionStatus':$scope.sectionStatus,
			/* 'budgetOwner'                :'test',
			 'businessCase'               :   'testing',*/
			 'budgetOwner'                : $scope.budgetOwner,
			 'businessCase'               :   $scope.businessCase,
			 'fundingFlag':$scope.fundFlag,
			 'regionA'					:			$scope.selectedRegA,
			 'countryA'					:			$scope.selectedCountryA,
			 'demandCategory'        :$scope.demandCategory, 
			 'stateA'					:			$scope.selectedStateA,
			 'cityA'					:			$scope.selectedCityA,
			 'siteCodeA'				:			$scope.selectedLocA,
			 'regionZ'					:			$scope.selectedRegZ,
			 'stateA'					:			$scope.selectedStateA,
			 'cityA'					:			$scope.selectedCityA,
			 'countryZ'					:			$scope.selectedCountryZ,
			 'stateZ'					:			$scope.selectedStateZ,
			 'cityZ'					:			$scope.selectedCityZ,
			 'siteCodeZ'				:			$scope.selectedLocZ,
			 'sectionId'                :           $scope.sectionId,
			 'ccr'						:			$scope.ccr,
			 'transportCost'			:			$scope.transportCost,
			 'switchCost'				: 			$scope.switchCost,
			 'otherCost'				: 			$scope.otherCost,
			 'totalCost'				: 			$scope.totalCost,
			 'engCmnts'					: 			$scope.engCmnts,
			 'secDetails'				: 		$scope.secDetails,
			 'originalBudget'           :          $scope.originalBudget ,
			 'approvedBudget'           :          $scope.approvedBudget , 
			 'approvedFund'             :         $scope.approvedFund ,  
			 'afeNbr'                :           $scope.afeNbr,
			 'changeElemnetActive'	    :$scope.changeElemnetActive,

			 
		}
			
	 };
	 
	/* $scope.userRequest1 =  {
			
			 'sectionId'                :           $scope.selectedSectionId
				
							
		 };*/
		 
	 $scope.userRequest1 = {
		    	sectionId : sectionId
		    };
		    
	
	
	
	$scope.removeElement = function(modelName) {
						debugger;
						var sectionStatus = $scope.sectionStatus;
						var model = $scope[modelName];
						
						if(sectionStatus.toUpperCase() !== "DRAFT") {
							for(var i = 0; i < model.length; i++) {
								if(model[i].toUpperCase() === "OTHER") {
									model.splice(i, 1);
								}
							}
						}
						//debugger;
	};
	
	
	
	$scope.formInput = function() {
	
		$scope.successFlag = false;
		$scope.errorFlag = false;
	    
		console.log("Initial Req Object:", reqObj);
	
		var reqObj = $scope.userRequest();
		
		if(reqObj.demandCategory === 'BUNDLE' || reqObj.demandCategory === 'EQUIPMENT'){
			
			reqObj.muxLevel = '';
			
			
			
		}
		
if(reqObj.businessCase === 'Select' ){
			
			reqObj.businessCase = '';
			
			
			
		}
if(reqObj.budgetOwner === 'Select' ){
	
	reqObj.budgetOwner = '';
	
	
	
}
		

		
		//var reqFields = [$scope.idMap['demandId'], $scope.idMap['planningGrp']];
		
		var reqFields = [ $scope.idMap['planningGrp'],$scope.idMap['sectionStatus'] ];
		
		/*if($scope.Bplannerfl === 'true' && $scope.transportfl === 'false'){
			reqFields.push( $scope.idMap['businessCase']);
			reqFields.push( $scope.idMap['budgetOwner']);
		}*/
		//var reqFields = [ $scope.idMap['planningGrp'], $scope.idMap['businessCase'], $scope.idMap['budgetOwner'] ];

	
		//console.log("Selected Category:", $scope.selectedDemandCategory);
		
		//Required fields checking
		/* if($scope.demandCategory === 'EQUIPMENT'){
		
			reqFields.push($scope.idMap['locA']);
					
		}else*/ 
		
		if($scope.demandCategory === 'LINK'){
			reqFields.push($scope.idMap['muxLevel']);

			reqFields.push($scope.idMap['locationA']);
			reqFields.push($scope.idMap['locationZ']);
			
		}
		
		var finalText = [];
		var alertText = checkRequiredFields(reqObj, reqFields, finalText);
		if(alertText != '')
		{
			alert("Please Select "+ alertText.join(", "));
			return ;
		}
		 
			
		var optionalFields = ['region', 'city', 'state', 'country', 'siteCode'];
		var suffix = ['A', 'Z'];
		var optionalCheckedObj = emptyOptionalFields(reqObj, optionalFields, suffix);
		
		if(optionalCheckedObj.transportCost === undefined)
    	{
    	optionalCheckedObj.transportCost=optionalCheckedObj.transportCost;

    	}
    else if(optionalCheckedObj.transportCost != '0' || optionalCheckedObj.transportCost != '' ||optionalCheckedObj.transportCost != null){
			     optionalCheckedObj.transportCost = parseInt(optionalCheckedObj.transportCost.replace(/[$,]+/g, ''));
			    //alert(optionalCheckedObj.transportCost+"===floatvalue");
			    }
			    else{
			    	optionalCheckedObj.transportCost=optionalCheckedObj.transportCost;
			    }
		if(optionalCheckedObj.switchCost === undefined)
    	{
    	optionalCheckedObj.switchCost=optionalCheckedObj.switchCost;

    	}
    else if(optionalCheckedObj.switchCost != '0' || optionalCheckedObj.switchCost != '' ||optionalCheckedObj.switchCost != null){
			    	optionalCheckedObj.switchCost = parseInt(optionalCheckedObj.switchCost.replace(/[$,]+/g, ''));
			    //alert(optionalCheckedObj.switchCost+"===floatvalue");
			    }
			    else{
			    	optionalCheckedObj.switchCost=optionalCheckedObj.switchCost;
			    }
		if(optionalCheckedObj.otherCost === undefined)
    	{
    	optionalCheckedObj.otherCost=optionalCheckedObj.otherCost;

    	}
    else if(optionalCheckedObj.otherCost != '0' || optionalCheckedObj.otherCost != '' ||optionalCheckedObj.otherCost != null){
			    	optionalCheckedObj.otherCost = parseInt(optionalCheckedObj.otherCost.replace(/[$,]+/g, ''));
			   // alert(optionalCheckedObj.otherCost+"===floatvalue");
			    }
			    else{
			    	 optionalCheckedObj.otherCost=optionalCheckedObj.otherCost;
			    }
		
		if(optionalCheckedObj.totalCost === undefined)
    	{
    	optionalCheckedObj.totalCost=optionalCheckedObj.totalCost;

    	}
    else if(optionalCheckedObj.totalCost != '0' || optionalCheckedObj.totalCost != '' ||optionalCheckedObj.totalCost != null){
			    	optionalCheckedObj.totalCost = parseInt(optionalCheckedObj.totalCost.replace(/[$,]+/g, ''));
			   // alert(optionalCheckedObj.otherCost+"===floatvalue");
			    }
			    else{
			    	 optionalCheckedObj.totalCost=optionalCheckedObj.totalCost;
			    }
			    if(optionalCheckedObj.originalBudget === undefined || optionalCheckedObj.originalBudget === null
						|| optionalCheckedObj.originalBudget ===''   || optionalCheckedObj.originalBudget ==="")
		    	{
		    	optionalCheckedObj.originalBudget=optionalCheckedObj.originalBudget;

		    	}
		    else if(optionalCheckedObj.originalBudget != '0'|| optionalCheckedObj.originalBudget != '' ||optionalCheckedObj.originalBudget != null ){
			    	optionalCheckedObj.originalBudget = parseInt(optionalCheckedObj.originalBudget.replace(/[$,]+/g, ''));
				   // alert(optionalCheckedObj.originalBudget+"===floatvalue");
				    }
				    else{
				    	optionalCheckedObj.originalBudget=optionalCheckedObj.originalBudget;
				    }
			    if(optionalCheckedObj.approvedBudget === undefined || optionalCheckedObj.approvedBudget === null
						|| optionalCheckedObj.approvedBudget ===''   || optionalCheckedObj.approvedBudget ==="")
			    	{
			    	optionalCheckedObj.approvedBudget=optionalCheckedObj.approvedBudget;

			    	}
			    else if(optionalCheckedObj.approvedBudget != '0'|| optionalCheckedObj.approvedBudget != '' ||optionalCheckedObj.approvedBudget != null ){
				    	optionalCheckedObj.approvedBudget = parseInt(optionalCheckedObj.approvedBudget.replace(/[$,]+/g, ''));
				    //alert(optionalCheckedObj.approvedBudget+"===floatvalue");
				    }
				    else{
				    	optionalCheckedObj.approvedBudget=optionalCheckedObj.approvedBudget;
				    }
			    if(optionalCheckedObj.approvedFund === undefined || optionalCheckedObj.approvedFund === null
						|| optionalCheckedObj.approvedFund ===''   || optionalCheckedObj.approvedFund ==="")
		    	{
		    	optionalCheckedObj.approvedFund=optionalCheckedObj.approvedFund;

		    	}
		    else if(optionalCheckedObj.approvedFund != '0' || optionalCheckedObj.approvedFund != '' ||optionalCheckedObj.approvedFund != null ){
				    	optionalCheckedObj.approvedFund = parseInt(optionalCheckedObj.approvedFund.replace(/[$,]+/g, ''));
				   // alert(optionalCheckedObj.approvedFund+"===floatvalue");
				    }
				    else{
				    	optionalCheckedObj.approvedFund=optionalCheckedObj.approvedFund;
				    }
				    
		if($scope.sectionStatus.toUpperCase() !== "DRAFT") {
			if(optionalCheckedObj.totalCost <=0){
				alert("Total Cost Shouldn't be  0");
				return ;
			}
		}
			var text='';
			if(optionalCheckedObj.engCmnts!=null || optionalCheckedObj.engCmnts !=undefined)
				{
			if(optionalCheckedObj.engCmnts.length >=1024)
			{
				text=text + "  Engineering comments ";
			
			}
				}
			if(optionalCheckedObj.secDetails !=null || optionalCheckedObj.secDetails !=undefined)
				{
			if(optionalCheckedObj.secDetails.length >=1024)
			{
				text=text + "  BudgetPlanner Comments "
			
			}
				}
			
		if(text === null ||text === ''){
			
		}else{
			alert(text + " should not be more than 1024 charecters");
			return ;
		}
		
		
		console.log("User Request::::", optionalCheckedObj);
	
		ModifySectionService.saveAddSectionValues(optionalCheckedObj).then(function(data){
				
				//alert("inside====");
				 
				//$scope.messages = data;
				 
				
				//error handling 
				if(data.statusCode === '0')
				{
					$scope.successFlag = true;
					$scope.responseSectionId = data.sectionId;
					console.log($scope.responseSectionId);
				
				}else if(data.statusCode === '1')
				{
					$scope.errorFlag =  true;
					$scope.errorMsg = data.msg; 
				}
		      
			 $window.scrollTo(0, 0);	
	        $scope.isResultOpen=true;
	        $scope.errors = data;
			 
			 
			 });
		
	 }

	
	
	
	/*//adding costs to Total Cost
	$scope.addTpCost = function(){
		//console.log("Value", value);
		
		console.log("Type:", typeof $scope.totalCost);
		console.log(typeof parseInt($scope.transportCost));
		
		$scope.totalCost = $scope.totalCost + parseInt($scope.transportCost);
		console.log("Total", $scope.totalCost);
	}*/
	
	$scope.filterSearch = function(name) {
        if (!$scope.search) return true;
        var regex = new RegExp('\\b' + escRegExp($scope.search), 'i');
        return regex.test(name.split(' ')[0]);
    };  
  
    
    function escRegExp(string){
        return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }
    
    // Mode type
					$scope.serviceMode = {
						"initial": "onInit",
						"intermediate": "onSelect"
					};
  
   $scope.getSectionDetailsById=function(){
    	
    	  //console.log($scope.userRequest1);
    	
    	ModifySectionService.getSectionSearchResults($scope.userRequest1).then(function(data){
    		// Assigning to global modify data holder                                                        
    
    		//$scope.modifyData = data;
    		console.log("Response Data:", data);
    		$scope.modifyData = data;
    		//addDataToModel(data, reqFields);
    		$scope.demandId = data[0].demandId;
    		/*$scope.planningGrp = data[0].planningGroup;
    		$scope.selectedPlanningGrp = data[0].planningGroup;*/
    		
    		$scope.getPlanningGrp();
    	 	$scope.getBusinessCase();
    	 	$scope.getBudgetOwner();
    	 	$scope.getMuxLevel();
    	 	$scope.getSectionStatus();

    		$scope.sectionId = $scope.userRequest1.sectionId;	
    		//$scope.sectionStatus = data[0].sectionStatus;	
    		$scope.demandStatus = data[0].demandStatus;
    		$scope.demandCategory = data[0].demandCategory;
    		//$scope.transportCost = data[0].transportCost;
    		//$scope.switchCost= data[0].switchCost;
    		//$scope.otherCost = data[0].otherCost;
    		//$scope.totalCost = data[0].totalCost;

    		$scope.totalCost ="$" +(data[0].totalCost).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');

    	    $scope.transportCost ="$" +(data[0].transportCost).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    	    $scope.switchCost ="$" +(data[0].switchCost).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    	    $scope.otherCost ="$" +(data[0].otherCost).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');

    		$scope.ccr = data[0].ccr;
    		$scope.engCmnts = data[0].engCmnts;
    		$scope.secDetails=data[0].secDetails;
    		$scope.fundFlag = data[0].fundingFlag;
    		
    		$scope.getRegionA($scope.serviceMode.initial);
			$scope.getRegionZ($scope.serviceMode.initial);
     	  	
    		/*$scope.businessCase =data[0].businessCase;
    		$scope.selectedBusinessCase =data[0].businessCase;
    		$scope.budgetOwner =data[0].budgetOwner;
    		$scope.selectedBudgetOwner =data[0].budgetOwner;*/
    		//$scope.originalBudget = data[0].originalBudget;
    		//$scope.approvedBudget =data[0].approvedBudget;
    		//$scope.approvedFund = data[0].approvedFund;
			//alert(data[0].originalBudget+"original====="+data[0].approvedBudget+"approved=="+data[0].approvedFund+"apprvdfund======");
			if(data[0].originalBudget === undefined || data[0].originalBudget === null
					|| data[0].originalBudget ===''   || data[0].originalBudget ==="")
	    	{
				data[0].originalBudget=null;

	    	}
			else if(data[0].originalBudget != null  ||data[0].originalBudget !='')
				{
    		 $scope.originalBudget ="$" +(data[0].originalBudget).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
				}else{
					$scope.originalBudget = null;
				}
			if(data[0].approvedBudget === undefined || data[0].approvedBudget === null  || data[0].approvedBudget ==='' ||data[0].approvedBudget === null  || data[0].approvedBudget ==="")
	    	{
				data[0].approvedBudget=null;

	    	}
			else if(data[0].approvedBudget != null  || data[0].approvedBudget !='')

			{
				$scope.approvedBudget ="$" +(data[0].approvedBudget).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');

			}
			
			else{
	    		$scope.approvedBudget =null;

			}
			if(data[0].approvedFund === undefined || data[0].approvedFund === null  || data[0].approvedFund ==='' ||data[0].approvedFund === null  || data[0].approvedFund ==="")
	    	{
				data[0].approvedFund=null;

	    	}
			else if(data[0].approvedFund != null  || data[0].approvedFund !='')

			{
			
     	    $scope.approvedFund ="$" +(data[0].approvedFund).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
			}
			else{
	    		$scope.approvedFund = null;

			}
    		$scope.afeNbr = data[0].afeNbr;
    		

    		
    	});
    
     }
   
  
  /*  $scope.getSectionDetailsById=function()
    {

    	ModifySectionService.getSectionSearchResults($scope.userRequest1).then(function(data) {
       	   	
		
			 
       	  	 console.log("View Data:", data);
       	  	 //console.log(data.demandId);
       	  	 $scope.demandId=data[0].demandId;
       	  	 $scope.sectionId=data[0].sectionId;
       	  	 $scope.demandStatus=data[0].demandStatus;
       	  	 $scope.demandCategory=data[0].demandCategory;
       	  	 $scope.planningGroup=data[0].planningGroup;
       	  	 $scope.tpCost=data[0].transportCost;
       	  	 $scope.swCost=data[0].switchCost;
       	  	 $scope.otherCost=data[0].otherCost;
       	  	 $scope.totalCost=data[0].totalCost;
       	  	 $scope.ccr=data[0].ccr;
       	  	 $scope.cmnts=data[0].engCmnts;
       	  	 $scope.secDetails=data[0].secDetails;
       	  	 $scope.busCase=data[0].businessCase;
       	  	 $scope.budgetOwner=data[0].budgetOwner;
       	  	 $scope.orginalBudget=data[0].originalBudget;
       	  	 $scope.approvedBudget=data[0].approvedBudget;
       	  	 $scope.approvedFund=data[0].approvedFund;
       	  	 $scope.afe=data[0].afeNbr;
       	  	 
       	  	 
       	 });
    }*/;
	
  

	$scope.getDemandId=function()
    {
       
		ModifySectionService.getDemandId().then(function(data) {
			//debugger;
       	   $scope.demandIds= data;
       	   $scope.demandIds.unshift('Select');
              $scope.demandId = $scope.demandIds[0];
              $scope.selectedDemandId = $scope.demandIds[0];
              $scope.statusDemandId = {
                       isopen: false
              };  
              
              $scope.toggleDropdown = function($event) {
           	   $event.preventDefault();
           	   $event.stopPropagation();
           	   $scope.statusDemandId.isopen = !$scope.statusDemandId.isopen;
              
              };

              $scope.selectItemDemandIdMethod = function( item ) {
               	    //console.log("Item:"+item);
            	  	
            	  	$scope.getDemandDetailsById(item);
               	    $scope.selectedDemandId = item;
               	    $scope.demandId = item;
               	    
               	    
              };
              console.log("Selected Demand Id:", $scope.selectedDemandId);
                  
			});
    };
    
    $scope.getSectionId=function()
    {
       
		ModifySectionService.getSectionId().then(function(data) {
			//debugger;
       	   $scope.sectionIds= data;
       	   $scope.sectionIds.unshift('Select');
              $scope.sectionId = $scope.sectionIds[0];
              $scope.selectedSectionId = $scope.sectionIds[0];
              $scope.statusSectionId = {
                       isopen: false
              };  
              
              $scope.toggleDropdown = function($event) {
           	   $event.preventDefault();
           	   $event.stopPropagation();
           	   $scope.statusSectionId.isopen = !$scope.statusSectionId.isopen;
              
              };

              $scope.selectItemSectionIdMethod = function( item ) {
               	    //console.log("Item:"+item);
            	  	
            	  	$scope.getSectionDetailsById(item);
               	    $scope.selectedSectionId = item;
               	    $scope.sectionId = item;
               	    
               	    
              };
              console.log("Selected Section Id:", $scope.selectedSectionId);
                  
			});
    };
    
    $scope.getDemandDetailsById = function(demandId){
    	
    	ModifySectionService.getDemandDetailsById(demandId).then(function(data) {
    		
    		console.log("Data", data);
    		
    		$scope.demandCategory = data.demandCategory;
    		$scope.demandStatus = data.demandStatus;
    		
    		console.log("Demand Category", $scope.demandCategory);
    		
    	});
    	
    	
    };
    
    
    $scope.getMuxLevel=function()
    {
       
    	ModifySectionService.getMuxLevel().then(function(data) {
    		
    	console.log("MuxLevel Data:", data);	
       	   $scope.muxLeveles= data;
       	   $scope.muxLeveles.unshift('Select');
       	   $scope.muxLevel = $scope.modifyData[0].muxLevel;
       	 $scope.selectedMuxLevel = $scope.modifyData[0].muxLevel;
              //$scope.planningGrp = $scope.planningGrps[0];
              //$scope.selectedPlanningGrp = $scope.planningGrps[0];
              $scope.statusMuxLevel = {
                       isopen: false
              };  
              
              $scope.toggleDropdown = function($event) {
           	   $event.preventDefault();
           	   $event.stopPropagation();
           	   $scope.statusMuxLevel.isopen = !$scope.statusMuxLevel.isopen;
              
              };

              $scope.selectItemMuxLevelMethod = function( item ) {
               	    //console.log("Item:"+item);
            	  	debugger;
               	    $scope.selectedMuxLevel = item;
               	    $scope.muxLevel = item;
            	    $scope.changeElemnetActive='Y';
               	    
              };
             
                  
			});
    };
    

    $scope.getPlanningGrp=function()
    {
       
    	ModifySectionService.getPlanningGroupValues().then(function(data) {
    		
    	console.log("Planning Data:", data);	
       	   $scope.planningGrps= data;
       	   $scope.planningGrps.unshift('Select');
       	   $scope.planningGrp = $scope.modifyData[0].planningGroup;
       	 $scope.selectedPlanningGrp = $scope.modifyData[0].planningGroup;
              //$scope.planningGrp = $scope.planningGrps[0];
              //$scope.selectedPlanningGrp = $scope.planningGrps[0];
              $scope.statusPlanningGrp = {
                       isopen: false
              };  
              
              $scope.toggleDropdown = function($event) {
           	   $event.preventDefault();
           	   $event.stopPropagation();
           	   $scope.statusPlanningGrp.isopen = !$scope.statusPlanningGrp.isopen;
              
              };

              $scope.selectItemPlanningGrpMethod = function( item ) {
               	    //console.log("Item:"+item);
            	  	debugger;
               	    $scope.selectedPlanningGrp = item;
               	    $scope.planningGrp = item;
               	    $scope.changeElemnetActive='Y';
               	    
              };
             
                  
			});
    };
     $scope.getSectionStatus=function()
    {
       
    	ModifySectionService.getSectionStatusBp().then(function(data) {
    		
    	console.log("SectionStatus Data:", data);	
       	   $scope.sectionStatuses= data;
       	   $scope.sectionStatuses.unshift('Select');
       	   $scope.sectionStatus = $scope.modifyData[0].sectionStatus;
       	 $scope.selectedSectionStatus = $scope.modifyData[0].sectionStatus;
              //$scope.planningGrp = $scope.planningGrps[0];
              //$scope.selectedPlanningGrp = $scope.planningGrps[0];
              $scope.statusSStatus = {
                       isopen: false
              };  
              
              $scope.toggleDropdown = function($event) {
           	   $event.preventDefault();
           	   $event.stopPropagation();
           	   $scope.statusSStatus.isopen = !$scope.statusSStatus.isopen;
              
              };
              $scope.selectItemSecStatusMethod = function( item ) {
               	    //console.log("Item:"+item);
            	  	debugger;
               	    $scope.selectedSectionStatus = item;
               	    $scope.sectionStatus = item;
               	    
               	    $scope.changeElemnetActive='N';

              };
             
                  
			});
    };
    
    $scope.getSiteA=function()
    {
       
    	ModifySectionService.getCategoryValues().then(function(data) {
       	   $scope.siteAs= data;
       	   $scope.siteAs.unshift('Select');
              $scope.demandCategory = $scope.siteAs[0];
              $scope.selectedSiteA = $scope.siteAs[0];
              $scope.statusSiteA = {
                       isopen: false
              };  
              
              $scope.toggleDropdown = function($event) {
           	   $event.preventDefault();
           	   $event.stopPropagation();
           	   $scope.statusSiteA.isopen = !$scope.statusSiteA.isopen;
              
              };

              $scope.selectItemSiteAMethod = function( item ) {
               	    //console.log("Item:"+item);
               	    $scope.selectedSiteA = item;
               	    $scope.siteA = item;
               	    
               	    
              };
              console.log("Selected Category:", $scope.selectedSiteA);
                  
			});
    };
    
    $scope.getSiteZ=function()
    {
       
    	ModifySectionService.getCategoryValues().then(function(data) {
       	   $scope.siteZs= data;
       	   $scope.siteZs.unshift('Select');
              $scope.demandCategory = $scope.siteZs[0];
              $scope.selectedSiteA = $scope.siteZs[0];
              $scope.statusSiteZ = {
                       isopen: false
              };  
              
              $scope.toggleDropdown = function($event) {
           	   $event.preventDefault();
           	   $event.stopPropagation();
           	   $scope.statusSiteZ.isopen = !$scope.statusSiteA.isopen;
              
              };

              $scope.selectItemSiteZMethod = function( item ) {
               	    //console.log("Item:"+item);
               	    $scope.selectedSiteZ = item;
               	    $scope.siteZ = item;
               	    
               	    
              };
              console.log("Selected Category:", $scope.selectedSiteZ);
                  
			});
    };
    

	function isSelect(value){
		
		if(value === 'Select')
			value = '';
		
		return value;
		
	}
	
    
    function checkADropDowns()
	{
		  $scope.selectedRegA = isSelect($scope.selectedRegA);
          $scope.selectedCountryA = isSelect($scope.selectedCountryA);
          $scope.selectedStateA = isSelect($scope.selectedStateA);
          $scope.selectedCityA = isSelect($scope.selectedCityA);
          $scope.selectedlocA = isSelect($scope.selectedlocA);
          //$scope.selectedSiteClliA = isSelect($scope.selectedSiteClliA);
		
	}
	
	function checkZDropDowns()
	{
		  $scope.selectedRegZ = isSelect($scope.selectedRegZ);
          $scope.selectedCountryZ = isSelect($scope.selectedCountryZ);
          $scope.selectedStateZ = isSelect($scope.selectedStateZ);
          $scope.selectedCityZ = isSelect($scope.selectedCityZ);
          $scope.selectedlocZ = isSelect($scope.selectedlocZ);
          //$scope.selectedSiteClliZ = isSelect($scope.selectedSiteClliZ);
		
	}
	
	

	 function resetSelectedItems(resetList) {
			
			resetList.forEach(function(element) {
				if(element.modelType === "array") {
						$scope[element.model] = [];
						$scope[element.label] = '';
						$scope[element.selected] = '';
				} else if(element.modelType === "string") {
						$scope[element.model] = "";
				}
			});
			
			
		};	
   
    // RegionA() - New
					$scope.getRegionA = function(mode) {
						ModifySectionService.getRegAList().then(function(data) {
							$scope.regAs = data;
							
							var regionData = $scope.modifyData[0].regionA;
			    			 if(mode === "onInit") {
			    				 if(regionData === '0'){
			    					 $scope.regionA = '';
				        			 $scope.selectedRegA = '';
				        			 $scope.getCountryA(mode, $scope.selectedRegA); // trigger getCountryA 
			    				 }else{
			    					 $scope.regionA = regionData;
				        			 $scope.selectedRegA = regionData;
				        			 $scope.getCountryA(mode, regionData); // trigger getCountryA 
			    				 }
			    				
			    			 } else {
			    				 $scope.getCountryA(mode, regionData);
			    			 }
							
						});
						
						
						$scope.statusRegA = {
							isopen : false
						};

						$scope.toggleDropdown = function($event) {
							$event.preventDefault();
							$event.stopPropagation();
							$scope.statusRegA.isopen = !$scope.statusRegA.isopen;
						};

						$scope.selectRegA = function(item) {

							$scope.selectedRegA = item;
							$scope.regionA = item;

							var resetList = [ $scope.idMap['countryA'],
									$scope.idMap['stateA'],
									$scope.idMap['cityA'],
									$scope.idMap['locationA'], 
									$scope.idMap['aLocAddressVal'] ];

							if ($scope.selectedRegA === 'Select') {

								resetSelectedItems(resetList);
							} else {
								resetSelectedItems(resetList);
								//$scope.getCountryA($scope.selectedRegA, $scope.selectedCountryA);
								$scope.getCountryA($scope.serviceMode.onSelect, $scope.selectedRegA);
								$scope.typeSearchA=''; 
		    	                 $scope.getLocAValuesByPredTyping($scope.typeSearchA);
							}

						};

					}

			
					//getCountryA() - New
					$scope.getCountryA = function(mode, regA) {
						// debugger;
						// console.log("Region for Country:", regA);
						ModifySectionService
								.getCountryAList(regA)
								.then(
										function(data) {

											console.log("Country List:", data);

											$scope.countryAs = data;
											
											var countryData = $scope.modifyData[0].countryA;
											if(mode === "onInit") {
												if(countryData === '0'){
													$scope.countryA = '';
													$scope.selectedCountryA = '';
													$scope.getStateA(mode, regA, $scope.selectedCountryA); // triggers getStateA() with init mode
												}else{
													$scope.countryA = countryData;
													$scope.selectedCountryA = countryData;
													$scope.getStateA(mode, regA, countryData); // triggers getStateA() with init mode
												}
												
												
											} else {
												$scope.countryAs.unshift('Select');
												$scope.countryA = $scope.countryAs[0];
												$scope.selectedCountryA = $scope.countryAs[0];
												//$scope.getStateA(mode, regA, countryData); // triggers getStateA() with intermediate mode
											}
											

										});

						$scope.statusCountryA = {
							isopen : false
						};

						$scope.toggleDropdown = function($event) {
							$event.preventDefault();
							$event.stopPropagation();
							$scope.statusCountryA.isopen = !$scope.statusCountryA.isopen;
						};

						$scope.selectCountryA = function(item) {
							$scope.selectedCountryA = item;
							$scope.countryA = item;

							var resetList = [ $scope.idMap['stateA'],
									$scope.idMap['cityA'],
									$scope.idMap['locationA'], 
									$scope.idMap['aLocAddressVal'] ];
							
							if ($scope.selectedCountryA === 'Select') {

								resetSelectedItems(resetList);
							} else {
								resetSelectedItems(resetList);
								$scope.getStateA($scope.serviceMode.intermediate, $scope.selectedRegA, $scope.selectedCountryA);
								$scope.typeSearchA=''; 
		    	                 $scope.getLocAValuesByPredTyping($scope.typeSearchA);
							}

						};

					}

					//getStateA() - New
					$scope.getStateA = function(mode, regA, ctryA) {

						// console.log("RegA:",regA, "CtryA:",ctryA);

						ModifySectionService
								.getStateAList(regA, ctryA)
								.then(
										function(data) {

											// console.log(" State List:",
											// data);

											$scope.stateAs = data;
											var stateData = $scope.modifyData[0].stateA;
											if(mode === "onInit") {
												if(stateData === '0'){
													$scope.stateA = '';
												$scope.selectedStateA = '';
												$scope.getCityA(mode, regA, ctryA, $scope.selectedStateA);
												}else{
													$scope.stateA = stateData;
												$scope.selectedStateA = stateData;
												$scope.getCityA(mode, regA, ctryA, stateData);
												}
												
											} else {
												$scope.stateAs.unshift('Select');
												$scope.stateA = $scope.stateAs[0];
												$scope.selectedStateA = $scope.stateAs[0];
											}

											
											
											$scope.statusStateA = {
												isopen : false
											};

											$scope.toggleDropdown = function(
													$event) {
												$event.preventDefault();
												$event.stopPropagation();
												$scope.statusStateA.isopen = !$scope.statusStateA.isopen;
											};

											$scope.selectStateA = function(item) {
												$scope.selectedStateA = item;
												$scope.stateA = item;

												var resetList = [
														$scope.idMap['cityA'],
														$scope.idMap['locationA'], 
														$scope.idMap['aLocAddressVal'] ];
												if ($scope.selectedStateA === 'Select') {

													resetSelectedItems(resetList);
												} else {
													resetSelectedItems(resetList);
													$scope.getCityA($scope.serviceMode.intermediate, $scope.selectedRegA, $scope.selectedCountryA, $scope.selectedStateA);
													$scope.typeSearchA=''; 
							    	                 $scope.getLocAValuesByPredTyping($scope.typeSearchA);
												}
												$scope.search = '';

											};

										});

					}
	
					//getCityA() - New
					$scope.getCityA = function(mode, regA, ctryA, stateA) {
						// debugger;
						
						ModifySectionService
								.getCityAList(regA, ctryA, stateA)
								.then(
										function(data) {
											debugger;
											console.log(" City List:", data);

											$scope.cityAs = data;
											var cityData = $scope.modifyData[0].cityA;
							 				if(mode === "onInit") {
							 					if(cityData === '0'){
							 						$scope.cityA = '';
							 	 				$scope.selectedCityA = '';
							 	 				$scope.getLocA(mode, regA, ctryA, stateA,$scope.selectedCityA); // triggers getLocA()
							 					}else{
							 						$scope.cityA = cityData;
							 	 				$scope.selectedCityA = cityData;
							 	 				$scope.getLocA(mode, regA, ctryA, stateA,cityData); // triggers getLocA()
							 					}
							 					
							 				} else {
							 					$scope.cityAs.unshift('Select');
												$scope.cityA = $scope.cityAs[0];
												$scope.selectedCityA = $scope.cityAs[0];
							 				}
											
											

											$scope.statusCityA = {
												isopen : false
											};

											$scope.toggleDropdown = function(
													$event) {
												$event.preventDefault();
												$event.stopPropagation();
												$scope.statusCityA.isopen = !$scope.statusCityA.isopen;
											};

											$scope.selectCityA = function(item) {
												$scope.selectedCityA = item;
												$scope.cityA = item;

												// checkADropDowns();

												var resetList = [ $scope.idMap['locationA'], 
																  $scope.idMap['aLocAddressVal'] ];
												if ($scope.selectedCityA === 'Select') {

													resetSelectedItems(resetList);
												} else {
													resetSelectedItems(resetList);
													//$scope.getLocA($scope.serviceMode.intermediate, $scope.selectedRegA, $scope.selectedCountryA, $scope.selectedStateA, $scope.selectedCityA);
													$scope.typeSearchA=''; 
							    	                 $scope.getLocAValuesByPredTyping($scope.typeSearchA);
												}
												$scope.search = '';

											};

										});

					}

					//getLocA() - New
					$scope.getLocA = function(mode, regA, ctryA, stateA, cityA) {
						// debugger;
						ModifySectionService
								.getLocAList(regA, ctryA, stateA, cityA)
								.then(
										function(data) {

											$scope.locAs = data;
											var locAData = $scope.modifyData[0].siteCodeA;
							  				if(mode === "onInit") {
							  					if(locAData === '0'){
							  						$scope.siteCodeA = '';
							  						$scope.selectedLocA = '';
							  						$scope.getLocAddress('A', $scope.selectedLocA); //triggers getLocAddress()
							  					}else{
							  						$scope.siteCodeA = locAData;
							  						$scope.selectedLocA = locAData;
							  						$scope.getLocAddress('A', locAData); //triggers getLocAddress()
							  					}
							  					//$scope.locAs.unshift('Select');
							  					
							  	  				
							  				} else {
							  					$scope.locAs.unshift('Select');
												$scope.siteCodeA = $scope.locAs[0];
												$scope.selectedLocA = $scope.locAs[0];
							  				}
											
											
											$scope.statuslocA = {
												isopen : false
											};

											$scope.toggleDropdown = function(
													$event) {
												$event.preventDefault();
												$event.stopPropagation();
												$scope.statuslocA.isopen = !$scope.statuslocA.isopen;
											};

											$scope.selectlocA = function(item) {
												$scope.selectedLocA = item;
												$scope.siteCodeA = item;
											    $scope.changeElemnetActive='Y';

												var resetList = [ $scope.idMap['aLocAddressVal'] ];
							                    
							    				if($scope.selectedLocA === 'Select'){
							    					resetSelectedItems(resetList);
							    				} else {
							    					resetSelectedItems(resetList);
							    					$scope.getLocAddress('A', $scope.selectedLocA);
							    				}

											};

										});

					}
					
					 // Getting address for Loc A and Loc Z
				     $scope.getLocAddress = function(loc, locVal) {
				    	 ModifySectionService.getAddress(locVal).then(function(resp) {
				    		 if(loc === 'A') {
				    			 $scope.aLocAddressVal = resp[0];
				    		 } else if(loc === 'Z') {
				    			 $scope.zLocAddressVal = resp[0];
				    		 }
				    	 });
				     };
				     
				     
				   //Emptying the Drop Down if Select for Region Hierarchy
				     $scope.checkDropDownsForLoc = function(list){
				    	 
				    	 list.forEach(function(value){
				    		
				    		 if($scope['selected'+value] === 'Select'){
				    			 $scope['toBeSent'+value] = '';
				    		 }else{
				    			 $scope['toBeSent'+value] = $scope['selected'+value];
				    		 }
				    		 
				    	 });
				     };
				     
				   //Getting the Location A Values By Predictive Typing
				     $scope.getLocAValuesByPredTyping = function(typeSearchA)
					 {	
							 debugger;
				    	 	/*if(typeSearchA.length>0){
				    	 		$scope.showIndex = true;
				    	 	}*/
							    $scope.changeElemnetActive='Y';
				    	 	$scope.typeAFlag = true;
						     $scope.aLocVal = typeSearchA;
						     console.log("RegionA:",$scope.selectedRegA, "CountryA:",$scope.selectedCountryA, "StateA:",$scope.selectedStateA,"CityA:",$scope.selectedCityA);
						     var checkList = [ 'RegA', 'CountryA', 'StateA', 'CityA' ];
						     $scope.checkDropDownsForLoc (checkList);
						     ModifySectionService.getLocAValuesByPredTyping($scope.toBeSentRegA,
						     						 $scope.toBeSentCountryA,
						     						 $scope.toBeSentStateA,
						     						 $scope.toBeSentCityA,
						     						 $scope.aLocVal).then(function(data){
						     							 
						     		console.log("Loc A Data:", data);	
						     		debugger;
						     		var resetList = [  $scope.idMap['locationA'] ];
						     		resetSelectedItems(resetList);
						     		if(typeSearchA === ''){
						     			$scope.locAs=data.results;
						     			$scope.locARows = data.rows;
						     			$scope.maxLocARows = data.maxRows;
						     			//console.log("Rows:",$scope.rows,"Max:",$scope.maxRows);
						     			$scope.locAs.unshift('Select');
						     			$scope.siteCodeA = $scope.locAs[0];
						     			$scope.selectedLocA = $scope.locAs[0];
						     			
						     		}else{
						     			$scope.locAs=data.results; 
						     			//$scope.siteCodeA = $scope.locAs[0];
						     			//$scope.selectedLocA = $scope.locAs[0];
						     			$scope.locARows = data.rows;
						     			$scope.maxLocARows = data.maxRows;
						     			//console.log("Rows:",$scope.rows,"Max:",$scope.maxRows);
						     			//$scope.locAs.unshift('Select');
						     		}
						     		
						     	
						     });
				         
					  };
					  
				     
					  $scope.selectLocAByPred = function(item){
					    	 debugger;
					    	 //console.log("Test");
					    	 if($scope.typeAFlag){
					    		 $scope.selectedLocA = item;
					             $scope.siteCodeA = item;
					             $scope.showIndex = false;
					     	    $scope.changeElemnetActive='Y';

					             var resetList = [  $scope.idMap['aLocAddressVal'] ];
					             if($scope.selectedLocA === 'Select') {
					             	resetSelectedItems(resetList);
					             }else{
					          	   resetSelectedItems(resetList);
					          	   $scope.getLocAddress('A', $scope.selectedLocA);
					             }
					    	 }
					  };
				     
				     

					// RegionA() - New
					$scope.getRegionZ = function(mode) {
						ModifySectionService.getRegZList().then(function(data) {
							$scope.regZs = data;
							
							var regionData = $scope.modifyData[0].regionZ;
			    			 if(mode === "onInit") {
									if(regionData === '0'){
			    					 $scope.regionZ = '';
				        			 $scope.selectedRegZ = '';
				        			 $scope.getCountryZ(mode, $scope.selectedRegZ); // trigger getCountryA 
			    				 }else{
			    					 $scope.regionZ = regionData;
				        			 $scope.selectedRegZ = regionData;
				        			 $scope.getCountryZ(mode, regionData); // trigger getCountryA 
			    				 }		    			 	
				    			
			    				 
			    			 } else {
			    				 $scope.getCountryZ(mode, regionData);
			    			 }
							
						});
						
						
						$scope.statusRegZ = {
							isopen : false
						};

						$scope.toggleDropdown = function($event) {
							$event.preventDefault();
							$event.stopPropagation();
							$scope.statusRegZ.isopen = !$scope.statusRegZ.isopen;
						};

						$scope.selectRegZ = function(item) {

							$scope.selectedRegZ = item;
							$scope.regionZ = item;

							var resetList = [ $scope.idMap['countryZ'],
									$scope.idMap['stateZ'],
									$scope.idMap['cityZ'],
									$scope.idMap['locationZ'],
									$scope.idMap['zLocAddressVal'] ];

							if ($scope.selectedRegZ === 'Select') {

								resetSelectedItems(resetList);
							} else {
								resetSelectedItems(resetList);
								//$scope.getCountryA($scope.selectedRegA, $scope.selectedCountryA);
								$scope.getCountryZ($scope.serviceMode.onSelect, $scope.selectedRegZ);
								$scope.typeSearchZ=''; 
		    	                 $scope.getLocZValuesByPredTyping($scope.typeSearchZ);
							}

						};

					}

					
					//getCountryZ() - New	
					$scope.getCountryZ = function(mode, regZ) {

						ModifySectionService.getCountryZList(regZ).then(function(data) {

									console.log("Country List:", data);

									$scope.countryZs = data;
									
									var countryData = $scope.modifyData[0].countryZ;
									if(mode === "onInit") {
										
										if(countryData === '0'){
											$scope.countryZ = '';
										$scope.selectedCountryZ = '';
										$scope.getStateZ(mode, regZ, $scope.selectedCountryZ); // triggers getStateA() with init mode
										}else{
											$scope.countryZ = countryData;
										$scope.selectedCountryZ = countryData;
										$scope.getStateZ(mode, regZ, countryData); // triggers getStateA() with init mode
										}
										
									} else {
										$scope.countryZs.unshift('Select');
										$scope.countryZ = $scope.countryZs[0];
										$scope.selectedCountryZ = $scope.countryZs[0];
										//$scope.getStateA(mode, regA, countryData); // triggers getStateA() with intermediate mode
									}
									

						});
	
						$scope.statusCountryZ = {
								isopen : false
						};

						$scope.toggleDropdown = function(
											$event) {
											$event.preventDefault();
											$event.stopPropagation();
											$scope.statusCountryZ.isopen = !$scope.statusCountryZ.isopen;
						};

						$scope.selectCountryZ = function(item) {
											$scope.selectedCountryZ = item;
											$scope.countryZ = item;

											var resetList = [
												$scope.idMap['stateZ'],
												$scope.idMap['cityZ'],
												$scope.idMap['locationZ'],
												$scope.idMap['zLocAddressVal'] ];
											if ($scope.selectedCountryZ === 'Select') {
												resetSelectedItems(resetList);
											} else {
												resetSelectedItems(resetList);
												 $scope.getStateZ($scope.serviceMode.intermediate, $scope.selectedRegZ, $scope.selectedCountryZ);
												 $scope.typeSearchZ=''; 
						    	                 $scope.getLocZValuesByPredTyping($scope.typeSearchZ);
											}

						};

						

					};
					
				
				//getStateZ() - New	
				$scope.getStateZ = function(mode, regZ, ctryZ) {
					

					ModifySectionService.getStateZList(regZ, ctryZ).then(function(data) {

								// console.log(" State List:",
								// data);

								$scope.stateZs = data;
								var stateData = $scope.modifyData[0].stateZ;
								if(mode === "onInit") {
									
									if(stateData === '0'){
											$scope.stateZ = '';
									$scope.selectedStateZ = '';
									$scope.getCityZ(mode, regZ, ctryZ, $scope.selectedStateZ);
									}else{
										$scope.stateZ = stateData;
									$scope.selectedStateZ = stateData;
									$scope.getCityZ(mode, regZ, ctryZ, stateData);
									}
									
								} else {
									$scope.stateZs.unshift('Select');
									$scope.stateZ = $scope.stateZs[0];
									$scope.selectedStateZ = $scope.stateZs[0];
								}


										$scope.statusStateZ = {
											isopen : false
										};

										$scope.toggleDropdown = function(
												$event) {
											$event.preventDefault();
											$event.stopPropagation();
											$scope.statusStateZ.isopen = !$scope.statusStateZ.isopen;
										};

										$scope.selectStateZ = function(item) {
											$scope.selectedStateZ = item;
											$scope.stateZ = item;

											var resetList = [
													$scope.idMap['cityZ'],
													$scope.idMap['locationZ'],
													$scope.idMap['zLocAddressVal'] ];
											if ($scope.selectedStateZ === 'Select') {

												resetSelectedItems(resetList);
											} else {
												resetSelectedItems(resetList);
												$scope.getCityZ($scope.serviceMode.intermediate, $scope.selectedRegZ, $scope.selectedCountryZ, $scope.selectedStateZ);
												$scope.typeSearchZ=''; 
						    	                 $scope.getLocZValuesByPredTyping($scope.typeSearchZ);
											}
											$scope.search = '';
										};

									});

				}

				
				
				//getCityZ() - New	
				$scope.getCityZ = function(mode, regZ, ctryZ, stateZ) {

					ModifySectionService
							.getCityZList(regZ, ctryZ, stateZ)
							.then(
									function(data) {

										// console.log("Model List:", data);

										$scope.cityZs = data;
										var cityData = $scope.modifyData[0].cityZ;
						  				if(mode === "onInit") {
						  					if(cityData === '0'){
						  						$scope.cityZ = '';
						  	 				$scope.selectedCityZ = '';
						  	 				$scope.getLocZ(mode, regZ, ctryZ, stateZ,$scope.selectedCityZ); // triggers getLocA()
						  					}else{
						  							$scope.cityZ = cityData;
						  	 				$scope.selectedCityZ = cityData;
						  	 				$scope.getLocZ(mode, regZ, ctryZ, stateZ,cityData); // triggers getLocA()
						  					}	
						  					
						  				} else {
						  					$scope.cityZs.unshift('Select');
						 					$scope.cityZ = $scope.cityZs[0];
						 					$scope.selectedCityZ = $scope.cityZs[0];
						  				}

										$scope.statusCityZ = {
											isopen : false
										};

										$scope.toggleDropdown = function(
												$event) {
											$event.preventDefault();
											$event.stopPropagation();
											$scope.statusCityZ.isopen = !$scope.statusCityZ.isopen;
										};

										$scope.selectCityZ = function(item) {
											$scope.selectedCityZ = item;
											$scope.cityZ = item;

											var resetList = [ $scope.idMap['locationZ'],
															  $scope.idMap['zLocAddressVal']];
											if ($scope.selectedCityZ === 'Select') {

												resetSelectedItems(resetList);
											} else {
												resetSelectedItems(resetList);
												//$scope.getLocZ($scope.serviceMode.intermediate, $scope.selectedRegZ, $scope.selectedCountryZ, $scope.selectedStateZ, $scope.selectedCityZ);
												$scope.typeSearchZ=''; 
						    	                 $scope.getLocZValuesByPredTyping($scope.typeSearchZ);
											}
											$scope.search = '';

										};

									});

				}
				
					
				
				//getLocZ() - New
				$scope.getLocZ = function(mode, regZ, ctryZ, stateZ, cityZ) {

					ModifySectionService
							.getlocZList(regZ, ctryZ, stateZ, cityZ)
							.then(
									function(data) {

										$scope.locZs = data;
										var locZData = $scope.modifyData[0].siteCodeZ;
					    				if(mode === "onInit") {
					    					if(locZData === '0'){
					    						//$scope.locZs.unshift('Select');
					    					$scope.siteCodeZ = '';
					    	  				$scope.selectedLocZ = '';
					    	  				$scope.getLocAddress('Z', $scope.selectedLocZ);
					    					}else{
					    						//$scope.locZs.unshift('Select');
					    					$scope.siteCodeZ = locZData;
					    	  				$scope.selectedLocZ = locZData;
					    	  				$scope.getLocAddress('Z', locZData);
					    					}
					    					
					    	  				
					    				} else {
					    					$scope.locZs.unshift('Select');
					    					$scope.siteCodeZ = $scope.locZs[0];
					    					$scope.selectedLocZ = $scope.locZs[0];
					    				}
										
										
										
										$scope.statuslocZ = {
											isopen : false
										};

										$scope.toggleDropdown = function(
												$event) {
											$event.preventDefault();
											$event.stopPropagation();
											$scope.statuslocZ.isopen = !$scope.statuslocZ.isopen;
										};

										$scope.selectlocZ = function(item) {
											$scope.selectedLocZ = item;
											$scope.siteCodeZ = item;
										    $scope.changeElemnetActive='Y';

											 var resetList = [ $scope.idMap['zLocAddressVal'] ];
						                      
						      				  if($scope.selectedLocZ === 'Select'){
						      					 resetSelectedItems(resetList);
						      				  } else {
						      					 resetSelectedItems(resetList);
						      					 $scope.getLocAddress('Z', $scope.selectedLocZ);
						      				  }

										};

									});

				};
				
				
				 //Getting the Location Z Values By Predictive Typing
			     $scope.getLocZValuesByPredTyping = function(typeSearchZ)
				 {	
						 //debugger;
			    	 	/*if(typeSearch.length>0){
			    	 		$scope.showIndex = true;
			    	 	}*/
			    	 	$scope.typeZFlag = true;
			    	    $scope.changeElemnetActive='Y';

					     $scope.zLocVal = typeSearchZ;
					     console.log("RegionZ:",$scope.selectedRegZ, "CountryZ:",$scope.selectedCountryZ, "StateZ:",$scope.selectedStateZ,"CityZ:",$scope.selectedCityZ);
					     var checkList = [ 'RegZ', 'CountryZ', 'StateZ', 'CityZ' ];
					     $scope.checkDropDownsForLoc (checkList);
					     ModifySectionService.getLocZValuesByPredTyping($scope.toBeSentRegZ,
					     						 $scope.toBeSentCountryZ,
					     						 $scope.toBeSentStateZ,
					     						 $scope.toBeSentCityZ,
					     						 $scope.zLocVal).then(function(data){
					     							 
					     		console.log("Loc Z Data:", data);	
					     		debugger;
					     		var resetList = [  $scope.idMap['locationZ'] ];
					     		resetSelectedItems(resetList);
					     		if(typeSearchZ === ''){
					     			$scope.locZs=data.results;
					     			$scope.locZRows = data.rows;
					     			$scope.maxLocZRows = data.maxRows;
					     			//console.log("Rows:",$scope.rows,"Max:",$scope.maxRows);
					     			$scope.locZs.unshift('Select');
					     			$scope.siteCodeZ = $scope.locZs[0];
					     			$scope.selectedLocZ = $scope.locZs[0];
					     			
					     		}else{
					     			$scope.locZs=data.results; 
					     			//$scope.siteCodeA = $scope.locAs[0];
					     			//$scope.selectedLocA = $scope.locAs[0];
					     			$scope.locZRows = data.rows;
					     			$scope.maxLocZRows = data.maxRows;
					     			//console.log("Rows:",$scope.rows,"Max:",$scope.maxRows);
					     			//$scope.locAs.unshift('Select');
					     		}
					     		
					     	
					     });
			         
				  };
		  
		  
				  $scope.selectLocZByPred = function(item){
				    	 debugger;
				    	 //console.log("Test");
				    	 if($scope.typeZFlag){
				    		 $scope.selectedLocZ = item;
				             $scope.siteCodeZ = item;
				             $scope.showIndex = false;
				     	    $scope.changeElemnetActive='Y';

				             var resetList = [  $scope.idMap['zLocAddressVal'] ];
				             if($scope.selectedLocZ === 'Select') {
				             	resetSelectedItems(resetList);
				             }else{
				          	   resetSelectedItems(resetList);
				          	   $scope.getLocAddress('Z', $scope.selectedLocZ);
				             }
				    	 }
				   };
    
				$scope.removeZero = function(modelName) {
					debugger;
					var model = $scope[modelName];
					for(var i = 0; i < model.length; i++) {
							if(model[i].toUpperCase() === "-" || model[i].toUpperCase() === "0") {
								model.splice(i, 1);
							}
					}
					
				};			
				
		$scope.getBusinessCase=function()
	    {
	       
			ModifySectionService.getBusinessCase().then(function(data) {
				//debugger;
	       	   $scope.businessCases= data;
	       	   console.log("Business Data", data);
	       	 $scope.businessCases.unshift('Select');
	              /*$scope.businessCase = $scope.businessCases[0];
	              $scope.selectedBusinessCase = $scope.businessCases[0];*/
	       	 if($scope.modifyData[0].businessCase === '-' || $scope.modifyData[0].businessCase === '0' ){
	       		$scope.removeZero('businessCases');
	       		$scope.businessCase = $scope.businessCases[0];
	            $scope.selectedBusinessCase = $scope.businessCases[0];
	       	 }else{
	       		$scope.removeZero('businessCases');
	       		$scope.businessCase = $scope.modifyData[0].businessCase;
	            $scope.selectedBusinessCase = $scope.modifyData[0].businessCase; 
	       	 }
	       	
	         $scope.statusBusinessCase = {
	                       isopen: false
	         };  
	              
	              $scope.toggleDropdown = function($event) {
	           	   $event.preventDefault();
	           	   $event.stopPropagation();
	           	   $scope.statusBusinessCase.isopen = !$scope.statusBusinessCase.isopen;
	              
	              };

	              $scope.selectItemBusinessCaseMethod = function( item ) {
	               	    //console.log("Item:"+item);
	            	  	
	            	  	//$scope.getBusinessCaseDetailsById(item);
	               	    $scope.selectedBusinessCase = item;
	               	    $scope.businessCase = item;
	               	   // $scope.changeElemnetActive='N';

	               	    
	              };
	              //console.log("Selected Business Case:", $scope.selectedBusinessCase);
	                  
				});
	    };
	    
	    $scope.getBudgetOwner=function()
  	    {
  	       
  			ModifySectionService.getBudgetOwner().then(function(data) {
  				//debugger;
  	       	   $scope.budgetOwners= data;
  	       	   $scope.budgetOwners.unshift('Select');
  	             /* $scope.budgetOwner = $scope.budgetOwners[0];
  	              $scope.selectedBudgetOwner = $scope.budgetOwners[0];*/
  	       	if($scope.modifyData[0].budgetOwner === '-' ||$scope.modifyData[0].budgetOwner === '0' ){
	       		$scope.removeZero('budgetOwners');
	       		$scope.budgetOwner = $scope.budgetOwners[0];
	            $scope.selectedBudgetOwner = $scope.budgetOwners[0];
	       	 }else{
	       		$scope.removeZero('budgetOwners');
	       		$scope.budgetOwner = $scope.modifyData[0].budgetOwner;
	            $scope.selectedBudgetOwner = $scope.modifyData[0].budgetOwner; 
	       	 }
  	       	   	 
  	          $scope.statusBudgetOwner = {
  	                       isopen: false
  	              };  
  	              
  	              $scope.toggleDropdown = function($event) {
  	           	   $event.preventDefault();
  	           	   $event.stopPropagation();
  	           	   $scope.statusBudgetOwner.isopen = !$scope.statusBudgetOwner.isopen;
  	              
  	              };

  	              $scope.selectItemBudgetOwnerMethod = function( item ) {
  	               	    //console.log("Item:"+item);
  	            	  	
  	            	  	//$scope.getDemandDetailsById(item);
  	               	    $scope.selectedBudgetOwner = item;
  	               	    $scope.budgetOwner = item;
  	               	   // $scope.changeElemnetActive='N';

  	               	    
  	              };
  	              //console.log("Selected Budget Owner:", $scope.selectedBudgetOwner);
  	                  
  				});
  	    };
	    
})



//inner controller
.controller('modalInstanceCtrl', function ($scope,$uibModalInstance){
	
	  $scope.ok = function () {
		  
		  
		 
		$uibModalInstance.close();
		$scope.formInput();

		
		//$scope.formInput();
		//$scope.getAll();
		 //$scope.getSummaryLevel();
	  };

	  $scope.cancel = function () {
		 
		 // $scope.defaultdate();
		$uibModalInstance.dismiss('cancel');
		
	  };

});