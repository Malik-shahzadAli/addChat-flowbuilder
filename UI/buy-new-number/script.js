    var companyID = "";
    loadConfigJson(); // Load JSON 
    
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

        const urlParams = new URLSearchParams(window.location.search);
        companyID = urlParams.get('cid');
        console.log("COMPANY-ID :", companyID);



        $("#searchResult").attr("placeholder", "Search by digits or phrases (Optional)").val("").focus().blur();
        $("#number-sub-details").show();
        $("#list-of-available-numbers").hide();
        // $("#search-number-btn").attr("disabled", true);
    });  
    
    
    //Default placeholders
    function dynamicPlaceholder(){
        let response = $('#numberORlocation').find(":selected").val();

        if(response == 'number'){
            
            $("#searchResult").attr("placeholder", "Search by digits or phrases (Optional)").val("").focus().blur();
            $("#number-sub-details").show();
        }
        if(response == "location"){
            $("#searchResult").attr("placeholder", "Search by location e.g Boston (Optional)").val("").focus().blur();
            $("#number-sub-details").hide();
        }

    }

    // Get list of available numbers from twilio

    function getListOfNumbersFromTwilio()
    {
        $("#img").show();
        
        let rows = "";
        let URL = "";
        
        let whichOptionIsSelect = "";
        let whichNumberPositionSelected = "";
        let bySearch = $("#searchResult").val();

        whichOptionIsSelect = $('#numberORlocation').find(":selected").val();

        if(whichOptionIsSelect == 'number')
        {
            
            whichNumberPositionSelected = $('#number-choose-option').find(":selected").val();

            if(bySearch != "")
            {
                URL = destination+"/companies/"+companyID+"/availablenumbers?digits="+bySearch+"&filter="+whichNumberPositionSelected;
                
            }
            else
            {
                URL = destination+"/companies/"+companyID+"/availablenumbers";
               
            }
            
        }
        else if(whichOptionIsSelect == 'location')
        {
            URL = destination+"/companies/"+companyID+"/availablenumbers?location="+bySearch;
            
        }
        else
        {
            URL = destination+"/companies/"+companyID+"/availablenumbers";
            
        }



        $.ajax({
                url: URL,
                type:"GET",
                headers: {"Authorization": "Bearer "+localStorage.getItem("token")},
                success : function(data)
                {
                    $("#img").hide();
                    console.log("Available Numbers : ",data);

                     for(let i = 0; i< data.availableNumbers.length; i++)
                        {
                            let item = data.availableNumbers[i];
                            rows += "<tr role='row' class='odd'>";
                            rows+="<td><b>" + item+ "<b></td>"
                            + "<td><button type='button' class ='btn btn-outline-danger'onclick='purchaseNumber(\""+item+"\")'>Buy</button></td>"
                            + "</tr>";
                        }

                        $('#data').html(rows);
                        $("#list-of-available-numbers").show();


                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log(errorThrown)
                }
    
            });








        
       
        
        
        
    }


    

        //Search button ENABLE/DISABLE 
   
        // $('#searchResult').on('input', function() {
        //     let resultToSearch = $("#searchResult").val();
        //     if(resultToSearch == ""){
        //         $("#search-number-btn").attr("disabled", true);
        //     }
        //     else
        //     {
        //         $("#search-number-btn").attr("disabled", false);

        //     }
        // });

        // $('#searchResult').focusout(function(){
        //     let resultToSearch = $("#searchResult").val();
        //     if(resultToSearch == ""){
        //         $("#search-number-btn").attr("disabled", true);
        //     }
        //     else
        //     {
        //         $("#search-number-btn").attr("disabled", false);

        //     }
        // })
       
    


    // Signout
    $("#signout").click(function(e) {
        localStorage.clear();
        window.location.href="../../";
    })


    function loadConfigJson (){

        $.getJSON('../../config.json',function(data){
            console.log('success',data.baseurl);
            destination = data.baseurl;

            
        })
    }



   


        function purchaseNumber(numberToBuy){

            var s = confirm("ARE YOU SURE YOU WANT TO BUY THIS NUMBER?");

            let body = {
                phoneNumber : numberToBuy
            }

            if (s == true) {
                $.ajax({

                    url: destination+"/companies/"+companyID+"/purchasenumber",
                    type:"POST",
                    headers: {"Authorization": "Bearer "+localStorage.getItem("token")},
                    dataType: 'json',
                    contentType: "application/json",
                    data: JSON.stringify(body),
                    success : function(data)
                    {
                        console.log("NUMBER PURCHASE SUCCESSFULLY : ",data);

                        if(data.hasError == false){
                            alert("NUMBER PURCHASE SUCCESSFULLY");
                            window.top.close();
                        }
    
                         
    
    
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        console.log(errorThrown)
                    }
        
                });
            }
            else
            {
                return false;
            }
        }