    var destination = "";
    loadJson();


    $(function(){


            

                let userName = localStorage.getItem("userName");
                let userId = localStorage.getItem("userId");
                let role = localStorage.getItem("role");

                
                    // window.location.replace("../auth/");
                
                    if(userId != '' && role == 'SU')
                    { // Redirect to Super User Dashboard
                        window.location.replace("../company/list/");

                    }
                    if(userId != '' && role == 'Admin')
                    { // Redirect to Admin in future

                        window.location.replace("../campaign/list/");

                    }

                
        
    });


    function login (){

        let password = $('#password').val();
        let email = $('#email').val();

        console.log(email +'   --   '+password);
        if(password.length < 0 || password == ''){
        alert("Password is required");
        return;
        }

        $("#img").show();
        let body = {
            "email" : email,
            "password" : password
        }
        
        $.ajax({
            url: destination+'/auth',
            type:"POST",
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify(body),
            success : function(person)
            {
                console.log(person);

                localStorage.setItem("token",person.token);
                
                
                validateToken(person.token);
                    
                    
                    
                
                
                
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert('INVALID EMAIL OR PASSWORD');
                $("#img").hide();
                    // window.location.reload();
            }
        });
        
        
    }


    function validateToken(token){
        // if(token != ''){
        //     window.location.replace('../company/view/list.html');
        // }
        $("#img").show();
        $.ajax({
            url: destination+"/validate/token",
            type:"GET",
            headers: {"Authorization": "Bearer "+localStorage.getItem("token")},
            dataType: 'json',
            contentType: "application/json",
            success : function(data)
            {
                $("#img").hide();

                console.log(data);
                localStorage.setItem("email",data.token.email);
                localStorage.setItem("userName",data.token.userName);
                localStorage.setItem("userId",data.token._id);
                localStorage.setItem("role",data.token.systemRole);

                if(data.token.systemRole == 'SU')
                {

                window.location.replace('../company/list/');
                
                }
                else if(data.token.systemRole == 'Admin')
                {

                window.location.replace('../campaign/list/');
                
                }


            }
            
    });

    }







    (function ($) {
        "use strict";

        var input = $('.validate-input .input100');

        $('.validate-form').on('submit',function(){
            var check = true;

            for(var i=0; i<input.length; i++) {
                if(validate(input[i]) == false){
                    showValidate(input[i]);
                    check=false;
                }
            }

            return check;
        });

    })(jQuery);

    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });


    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    

    function loadJson (){

        $.getJSON('../config.json',function(data){
            // console.log('success',data.baseurl);
            destination = data.baseurl;


            
        })
    }


    $("input").keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            $("#login-button").click();
        }
    });
    
    


