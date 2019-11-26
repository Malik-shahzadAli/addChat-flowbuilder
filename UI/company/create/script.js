
    var destination = "";
    loadJson(); // Load JSON 

    let checkCompanyName = false;
    let checkFile = false;


    let checkUserName = false;
    let checkUserEmail = false;
    let checkUserPassword = false;


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

        $("#companynamewarn").hide();  // Existing Company name warning Message
        $("#keyfilewarn").hide();  // File Selection Warning Message
        
        $("#usernamewarn").hide();
        $("#useremailwarn").hide();
        $("#passwordwarn").hide();

        
    

        $("#tab_second").addClass('disabled');
        $("#tab_third").addClass('disabled');
        $("#tab_fourth").addClass('disabled');


        

        $(".next").prop("disabled", true);
        $(".submit-button").prop("disabled",true);

        


        
        
    });

    // Validate User Email 


        $("#user-email").focusout(function() 
        {
                let email = $("#user-email").val();
                $("#useremailwarn").hide();

                let body = {
                    email : email
                }
                
                if(email.length > 0)
                {
                    $.ajax({
                        url: destination+'/validate/email',
                        type:"POST",
                        headers: {"Authorization": "Bearer "+localStorage.getItem("token")},
                        dataType: 'json',
                        contentType: "application/json",
                        data: JSON.stringify(body),
                        success : function(response)
                        {
                            console.log(response);

                                $("#useremailwarn").hide();
                                checkUserEmail = true;
                                // $(".next").prop("disabled", false);
                                if(checkUserName && checkUserEmail && checkUserPassword)
                                {
                                    $(".submit-button").prop("disabled",false);

                                    // $(".next").prop("disabled", false);
                                    // $("#tab_second").removeClass('disabled');
                                    // $("#tab_third").removeClass('disabled');
                                    // $("#tab_fourth").removeClass('disabled');
                                }
                            

                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            $("#useremailwarn").text("This email is already in use ");
                            $("#useremailwarn").show();
                            // $(".next").prop("disabled", true);
                        }
                        
                    });
                }    
                
        });
    
    // Validate User Name

        $("#user-name").focusout(function() 
        {
                let name = $("#user-name").val();
                $("#usernamewarn").hide();

                let body = {
                    userName : name
                }

                if(name.length > 0)
                {

                    $.ajax({
                        url: destination+'/validate/username',
                        type:"POST",
                        headers: {"Authorization": "Bearer "+localStorage.getItem("token")},
                        dataType: 'json',
                        contentType: "application/json",
                        data: JSON.stringify(body),
                        success : function(response)
                        {
                            console.log(response);

                                $("#usernamewarn").hide();
                                checkUserName = true;
                                if(checkUserName && checkUserEmail && checkUserPassword)
                                {
                                    $(".submit-button").prop("disabled",false);

                                    // $(".next").prop("disabled", false);
                                    // $("#tab_second").removeClass('disabled');
                                    // $("#tab_third").removeClass('disabled');
                                    // $("#tab_fourth").removeClass('disabled');
                                }
                                // $(".next").prop("disabled", false);
                            

                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            $("#usernamewarn").text("User Name Already Exist");
                            $("#usernamewarn").show();
                            // $(".next").prop("disabled", true);
                        }
                        
                    });
                }    
                
        });
    
    // Validate Password

        $("#password").focusout(function() 
        {
                let password = $("#password").val();
                $("#passwordwarn").hide();

                if(password == '')
                {
                    $("#passwordwarn").text("Password is required");
                    $("#passwordwarn").show();
                }
                else
                {
                    checkUserPassword = true;
                    if(checkUserName && checkUserEmail && checkUserPassword)
                    {
                        $("#passwordwarn").hide();
                        $(".submit-button").prop("disabled",false);

                    }
                }

                
                
        });


    // Validate Company Name

        $("#company-name").focusout(function() 
        {
            let company = $("#company-name").val();
            $("#emailwarn").hide();

            let body = {
                name : company
            }
            if(company.length > 0)
            {
                $.ajax({
                    url: destination+'/validate/company',
                    type:"POST",
                    headers: {"Authorization": "Bearer "+localStorage.getItem("token")},
                    dataType: 'json',
                    contentType: "application/json",
                    data: JSON.stringify(body),
                    success : function(response)
                    {
                        console.log(response);

                            $("#companynamewarn").hide();
                            checkCompanyName = true;

                            if(checkFile && checkCompanyName)
                            {
                                $(".next").prop("disabled", false);
                                $("#tab_second").removeClass('disabled');
                                $("#tab_third").removeClass('disabled');
                                $("#tab_fourth").removeClass('disabled');
                            }
        
                            
                        

                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        $("#companynamewarn").text("Company name already exists.");
                        $("#companynamewarn").show();
                        $(".next").prop("disabled", true);

                        // $("#tab_second").removeAttr("href");
                        // $("#tab_third").removeAttr("href");
                        // $("#tab_fourth").removeAttr("href");

                        

                    }
                    
                });  
            }               
      
        });


    // Validate File Exist or NOT

        $("#file").on('change',function(){
            if ($('#file').get(0).files.length === 0) {
                $("#keyfilewarn").text("Please choose a file");
                    $("#keyfilewarn").show();
                    $(".next").prop("disabled", true);

                    $("#tab_second").addClass('disabled');
                    $("#tab_third").addClass('disabled');
                    $("#tab_fourth").addClass('disabled');
            }
            else
            {
                    checkFile = true;
                    if(checkFile && checkCompanyName)
                    {
                        $("#keyfilewarn").hide();

                        $(".next").prop("disabled", false);
                        $("#tab_second").removeClass('disabled');
                        $("#tab_third").removeClass('disabled');
                        $("#tab_fourth").removeClass('disabled');
                    }
                    else
                    {
                        $(".next").prop("disabled", true);

                        $("#tab_second").addClass('disabled');
                        $("#tab_third").addClass('disabled');
                        $("#tab_fourth").addClass('disabled');
                    }
                    
                    
            }
        });


    // Create Compaign

    function createCompaign()
    {

        console.log("createCompaign() HIT")
        /*
        let companyName = $('#company-name').val();
        let description = $("#description").val();
        let dialogflowServiceFile = $("#file").val();
        let address1 = $("#address1").val();
        let address2 = $("#address2").val();
        let city = $("#city").val();
        let state = $("#state").val();
        let zip = $("#zip").val();
        let contactName = $("#contact-name").val();
        let phone = $("#phone").val();
        let email = $("#email").val();


        let userName = $("#user-name").val();
        let userEmail = $("#user-email").val();
        let password = $("#password").val();

        let body = {
            name : companyName,
            description : description,
            address1 : address1,
            address2 : address2,
            city : city,
            state : state,
            zipCode : zip,
            contactName : contactName,
            contactPhone : phone,
            contactEmail : email,
            serviceKeyFile : dialogflowServiceFile,
            userName : userName,
            email : userEmail,
            password : password
        }
        */
       var formData = new FormData();

       formData.append('name', $('#company-name').val());
        formData.append('description', $("#description").val());
        formData.append('address1',  $("#address1").val());
        formData.append('address2',  $("#address2").val());
        formData.append('city', $("#city").val());
        formData.append('state',  $("#state").val());
        formData.append('zipCode',  $("#zip").val());
        formData.append('contactName',  $("#contact-name").val());
        formData.append('contactPhone', $("#phone").val());
        formData.append('contactEmail',   $("#email").val());

        formData.append('userName',   $("#user-name").val());
        formData.append('email',  $("#user-email").val());
        formData.append('password',  $("#password").val());
        

        // Attach file
        formData.append('serviceKeyFile', $('input[type=file]')[0].files[0]); 

        $.ajax({
            url: destination+'/companies/create',
            data: formData,
            type:"POST",
            headers: {"Authorization": "Bearer "+localStorage.getItem("token")},
            contentType: false,
            processData: false,
            
            success : function(response)
            {
                console.log(response);
                

                window.location.replace('../list/');
    
                   
                    
                
    
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log(errorThrown);
    
                
                
    
             }
            
        });

        

    }

    // Signout
    $("#signout").click(function(e) {
        localStorage.clear();
        window.location.href="../../";
    })



    function loadJson (){

        $.getJSON('../../config.json',function(data){
            // console.log('success',data.baseurl);
            destination = data.baseurl;


            
        })
    }