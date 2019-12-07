
    var destination = "";
    loadConfigJson(); // Load JSON 

    var companyID = ""; // Global scope companyID

    let checkCampaignName = false;
    let checkStartDate = false;
    let checkEndDate = false;
    let compaignNumber = false;
    


    $(function(){
        let userName = localStorage.getItem("userName");
        let userId = localStorage.getItem("userId");

        if(!userId){
            // window.location.replace("/bookingbot/profile/dashboard.html");
            window.location.replace("../../");
        }
        else{
            // console.log(localStorage.getItem("userName"))
            document.getElementById("user_name").innerHTML = localStorage.getItem("userName");
        }

        // getCompaniesListAgainstAPerticularUser();

        $( "#start-date" ).datepicker({
            dateFormat: 'dd-mm-yy',
            changeMonth: true,
            changeYear: true,
            minDate: 0
    
        });
        $('#start-date').datepicker('setDate', 'today');
        // $("#datepicker").datepicker({ dateFormat: "yy-mm-dd" }).val();

        $( "#end-date" ).datepicker({
            dateFormat: 'dd-mm-yy',
            changeMonth: true,
            changeYear: true,
            minDate: 0
    
        });
        $('#end-date').datepicker('setDate', 'today');




        $("#campaignnamewarn").hide(); // Campaign Name Warning
        $("#startdatewarn").hide();  // Start Date Warning
        $("#enddatewarn").hide();   // End Date Warning
        $("#selectnumberwarn").hide(); // Campaign number Warning
        

        
    

        // $("#tab_second").addClass('disabled'); // Disable Second Tab
        


        

        $(".next").prop("disabled", false);
        // $(".submit-button").prop("disabled",true);

        


        
        
    });

    
    
    // Validate Campaign Name

        // $("#campaign-name").focusout(function() 
        // {
        //         let name = $("#campaign-name").val();
        //         $("#campaignnamewarn").hide();

        //         let body = {
        //             name : name,
        //             company : companyID
        //         }

        //         if(name.length > 0)
        //         {

        //             $.ajax({
        //                 url: destination+'/validate/campaign',
        //                 type:"POST",
        //                 headers: {"Authorization": "Bearer "+localStorage.getItem("token")},
        //                 dataType: 'json',
        //                 contentType: "application/json",
        //                 data: JSON.stringify(body),
        //                 success : function(response)
        //                 {
        //                     console.log(response);

        //                         $("#campaignnamewarn").hide();
        //                         checkCampaignName = true;
        //                         if(checkCampaignName && checkStartDate && checkStartDate)
        //                         {
        //                             // $(".submit-button").prop("disabled",false);
        //                             $(".next").prop("disabled", false);
        //                             $("#tab_second").removeClass('disabled');

                                    
        //                         }
        //                         else if(checkCampaignName && checkStartDate && checkStartDate && compaignNumber)
        //                         {
        //                             $(".submit-button").prop("disabled",false);
                                    

                                    
        //                         }
        //                         else
        //                         {
        //                             $("#tab_second").addClass('disabled'); 
        //                             $(".next").prop("disabled", true);
        //                             $(".submit-button").prop("disabled",true);
        //                         }
                            

        //                 },
        //                 error: function(XMLHttpRequest, textStatus, errorThrown) {
        //                     console.log(errorThrown)
        //                     $("#campaignnamewarn").text("Campaign Name Already Exist");
        //                     $("#campaignnamewarn").show();
        //                     // $(".next").prop("disabled", true);
        //                 }
                        
        //             });
        //         }    
                
        // });
    
    // Validate Start Date

        $("#start-date").change(function() 
        {
            $("#enddatewarn").hide();

            let startDate = $('#start-date').val();
            let endDate = $('#end-date').val();
            
            let start = moment(moment(startDate, 'DD-MM-YYYY')).format('YYYY-MM-DD');
            let end = moment(moment(endDate, 'DD-MM-YYYY')).format('YYYY-MM-DD');
            
            if((moment(end).isBefore(start))){
                

                $("#startdatewarn").text("End date must be after start date");
                $("#startdatewarn").show();
                ////////////////
                // $("#tab_second").addClass('disabled'); 
                // $(".next").prop("disabled", true);
                // $(".submit-button").prop("disabled",true);
            }
            else
            {
                $("#startdatewarn").hide();
                checkStartDate = true;
                                if(checkCampaignName && checkStartDate && checkStartDate)
                                {
                                    // $(".submit-button").prop("disabled",false);
                                    $(".next").prop("disabled", false);
                                    // $("#tab_second").removeClass('disabled');

                                    
                                }
                                else if(checkCampaignName && checkStartDate && checkStartDate && compaignNumber)
                                {
                                    // $(".submit-button").prop("disabled",false);
                                    

                                    
                                }
            }

            

                
                
        });

        $("#start-date").focusout(function() 
        {
            $("#enddatewarn").hide();

            let startDate = $('#start-date').val();
            let endDate = $('#end-date').val();
            
            let start = moment(moment(startDate, 'DD-MM-YYYY')).format('YYYY-MM-DD');
            let end = moment(moment(endDate, 'DD-MM-YYYY')).format('YYYY-MM-DD');
            
            if((moment(end).isBefore(start))){
                

                $("#startdatewarn").text("End date must be after start date");
                $("#startdatewarn").show();
                ////////////////
                // $("#tab_second").addClass('disabled'); 
                // $(".next").prop("disabled", true);
                // $(".submit-button").prop("disabled",true);
            }
            else
            {
                $("#startdatewarn").hide();
                checkStartDate = true;
                                if(checkCampaignName && checkStartDate && checkStartDate)
                                {
                                    // $(".submit-button").prop("disabled",false);
                                    $(".next").prop("disabled", false);
                                    // $("#tab_second").removeClass('disabled');

                                    
                                }
                                else if(checkCampaignName && checkStartDate && checkStartDate && compaignNumber)
                                {
                                    // $(".submit-button").prop("disabled",false);
                                    // 

                                    
                                }
            }

            

                
                
        });


        


    // Validate End Date

    $("#end-date").change(function() 
    {
        $("#startdatewarn").hide();
        let startDate = $('#start-date').val();
        let endDate = $('#end-date').val();
        
        let start = moment(moment(startDate, 'DD-MM-YYYY')).format('YYYY-MM-DD');
        let end = moment(moment(endDate, 'DD-MM-YYYY')).format('YYYY-MM-DD');
        
        if((moment(end).isBefore(start))){
            // $("#startdatewarn").hide();

            $("#enddatewarn").text("End date must be after start date");
            $("#enddatewarn").show();
            

            /////////////
            // $("#tab_second").addClass('disabled'); 
            // $(".next").prop("disabled", true);
            // $(".submit-button").prop("disabled",true);
        }
        else
        {
            $("#enddatewarn").hide();
            checkEndDate = true;
                            if(checkCampaignName && checkStartDate && checkStartDate)
                            {
                                // $(".submit-button").prop("disabled",false);
                                $(".next").prop("disabled", false);
                                // $("#tab_second").removeClass('disabled');

                                
                            }
                            else if(checkCampaignName && checkStartDate && checkStartDate && compaignNumber)
                                {
                                    // $(".submit-button").prop("disabled",false);
                                    

                                    
                                }
        }

        

            
            
    });

    $("#end-date").focusout(function() 
    {
        $("#startdatewarn").hide();
        let startDate = $('#start-date').val();
        let endDate = $('#end-date').val();
        
        let start = moment(moment(startDate, 'DD-MM-YYYY')).format('YYYY-MM-DD');
        let end = moment(moment(endDate, 'DD-MM-YYYY')).format('YYYY-MM-DD');
        
        if((moment(end).isBefore(start))){
            // $("#startdatewarn").hide();

            $("#enddatewarn").text("End date must be after start date");
            $("#enddatewarn").show();
            

            /////////////
            // $("#tab_second").addClass('disabled'); 
            // $(".next").prop("disabled", true);
            // $(".submit-button").prop("disabled",true);
        }
        else
        {
            $("#enddatewarn").hide();
            checkEndDate = true;
                            if(checkCampaignName && checkStartDate && checkStartDate)
                            {
                                // $(".submit-button").prop("disabled",false);
                                $(".next").prop("disabled", false);
                                // $("#tab_second").removeClass('disabled');

                                
                            }
                            else if(checkCampaignName && checkStartDate && checkStartDate && compaignNumber)
                                {
                                    // $(".submit-button").prop("disabled",false);
                                    

                                    
                                }
        }

        

            
            
    });


    // Validate user selected a number for campaign or not

    $("#number").change(function(){
        let campaignNumber = $('#number').find(":selected").val();

        console.log("Selected Item : ",campaignNumber);
        if(campaignNumber == '2'){
            $("#selectnumberwarn").text("Please choose a number");
            $("#selectnumberwarn").show();
        }
        else if(campaignNumber == "getnewnumber"){
            
                window.open('../../buy-new-number/index.html?cid='+companyID,'_blank');
            
        }
        else{
            // $(".submit-button").prop("disabled",false);
            $("#selectnumberwarn").hide();

        }

    })

    
    // Get list of available numbers
    
    function getListOfAvailableNumbers()
    {
        $.ajax({
            url: destination+"/companies/"+companyID+"/activenumbers", // Get all available numbers for this company
            type:"GET",
            headers: {"Authorization": "Bearer "+localStorage.getItem("token")},
            success : function(data)
            {
                // console.log("Available Numbers : ",data);

                if(data.activeNumbers.length > 0){

                    for(let i = 0; i<data.activeNumbers.length; i++){
                        let number = data.activeNumbers[i];
                        
                        $('#number').append( `<option value="${number}">${number}</option>` );
                    }
                    $('#number').append( `<option value="getnewnumber">Buy New Number</option>` );

                }
                // else{
                    

                // }
                
                

                

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(errorThrown)
                $('#number').append( `<option value="getnewnumber">Buy New Number</option>` );

            }

        });
    }
    
    
    
    
    
    
    
    
    
    // Signout
    $("#signout").click(function(e) {
        localStorage.clear();
        window.location.href="../../";
    })

    
    
    
    
    
    // Get List of companies against a perticular user

    function getCompaniesListAgainstAPerticularUser()
    {
        
        $.ajax({
            url: destination+"/users/"+localStorage.getItem("userId")+"/companies", // Get all companies list against a user id
            type:"GET",
            headers: {"Authorization": "Bearer "+localStorage.getItem("token")},
            success : function(data)
            {
                // console.log("Companies: ",data);

                companyID = data.companies[0]._id;
                // console.log("Company ID : ",companyID);
                getListOfAvailableNumbers(); // Get List of available numbers

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(errorThrown)
            }

        });
    }


    function loadConfigJson (){

        $.getJSON('../../config.json',function(data){
            console.log('success',data.baseurl);
            destination = data.baseurl;
            getCompaniesListAgainstAPerticularUser();

            
        })
    }