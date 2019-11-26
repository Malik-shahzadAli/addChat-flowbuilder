    var destination = "";
    loadConfigJson(); // Load JSON

    $(function(){
        let userName = localStorage.getItem("userName");
        let userId = localStorage.getItem("userId");

        if(!userId){
            window.location.replace("../../");
        }
        else{
            document.getElementById("user_name").innerHTML = localStorage.getItem("userName");
        }
        
        $("#companynamewarn").hide();  // Existing Company name warning Message

        // $("#companynamewarn").css('visibility','hidden')

        // getCompaniesList(); // Function calling, get Companies List

        $("#emailrequiredwarn").hide(); // EMAIL REQUIRED WARNING MESSAGE 

        $("#send-mail-btn").prop("disabled",false);

           
        
    });

    // Get Companies List
    function getCompaniesList ()
    {
        let rows = "";
        $.ajax({
                    url: destination+"/companies",
                    type:"GET",
                    headers: {"Authorization": "Bearer "+localStorage.getItem("token")},
                    dataType: 'json',
                    contentType: "application/json",
                    success : function(data)
                    {
                        console.log(data);

                        for(let i = 0; i< data.companies.length; i++)
                        {
                            let item = data.companies[i];
                            rows += "<tr role='row' class='odd'>";
                            rows+="<td >" + item.name+ "</td>"
                            + "<td>" + item.city + "</td>"
                            + "<td>" + item.state + "</td>"
                            + "<td>"
                                +"<div class='dropdown show'>"
                                    +"<a class='btn btn-info dropdown-toggle' href='#' role='button' id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Action</a>"
                                    +"<div class='dropdown-menu' aria-labelledby='dropdownMenuLink'>"
                                        // +"<a class='dropdown-item' onclick='viewCompany(\""+item._id+"\")'>VIEW</a>" OK- working
                                        // +"<a class='dropdown-item' onclick='editCompany(\""+item._id+"\")'>EDIT</a>"
                                        +"<a class='dropdown-item'style='cursor: pointer;' onclick='viewCompany(\""+item._id+"\")'><i class='fa fa-fw fa-pencil mr-5'></i>Edit</a>"   
                                        +"<div class='dropdown-divider'></div>" 
                                        +"<a class='dropdown-item' style='cursor: pointer;' onclick='viewCredential(\""+item.users[0].user+"\")'><i class='fa fa-fw fa-eye mr-5'></i>View Credentials</a>"
                                        +"<a class='dropdown-item' style='cursor: pointer;' onclick='emailCredential(\""+item.users[0].user+"\")'><i class='fa fa-fw fa-envelope-o mr-5'></i>Email Credentials</a>"
                                                    
                                    +"</div>"
                                +"</div>"
                                
                            +"</td>"
                            + "</tr>";
                        }

                        $('#data').append(rows);

                        jQuery('#table_id').dataTable({
                            columnDefs: [ { orderable: false, targets: [ 0 ] } ],
                            pageLength: 8,
                            lengthMenu: [[5, 8, 15, 20], [5, 8, 15, 20]],
                            autoWidth: false,
                            responsive: true
                        });

                        



                    }
            
                });
    }

    //Signout
    $("#signout").click(function(e) 
    {
        localStorage.clear();
        window.location.href="../../";
    })


    // View Modal & Company Details
    function viewCompany(id)
    {
        let table = "";

        $.ajax({
            url: destination+"/companies/"+id,
            type:"GET",
            headers: {"Authorization": "Bearer "+localStorage.getItem("token")},
            dataType: 'json',
            contentType: "application/json",
            success : function(status){

                console.log(status)
                let data = status.company;

                
            table+='<table class="table table-bordered table-striped table-vcenter">'
                    +'<tr id="hiddenrow"><td class="lefttd"></td><td id="idtoupdate" class="righttd">'+data._id+'</td></tr>'
                    +'<tr><td class="lefttd">Name</td><td class="righttd"><input type="text" id="modalname" class="form-control" value="'+data.name+'"/><p id="companynamewarn" style="color:red;"></p></td></tr>'     
                    +'<tr><td class="lefttd">Description</td><td class="righttd"><textarea id="modaldescription" class="form-control" rows="2" cols="50">'+data.description+'</textarea></td></tr>'     
                    +'<tr><td class="lefttd">Address 1</td><td class="righttd"><textarea id="modaladdress1" class="form-control" rows="2" cols="50">'+data.address1+'</textarea></td></tr>'    
                    +'<tr><td class="lefttd">Address 2</td><td class="righttd"><textarea id="modaladdress2" class="form-control" rows="2" cols="50">'+data.address2+'</textarea></td></tr>'
                    +'<tr><td class="lefttd">City</td><td class="righttd"><input type="text" id="modalcity" class="form-control" value="'+data.city+'"/></td></tr>'
                    +'<tr><td class="lefttd">State</td><td class="righttd"><input type="text" id="modalstate" class="form-control" value="'+data.state+'"/></td></tr>'
                    +'<tr><td class="lefttd">Zip Code</td><td class="righttd"><input type="number" id="modalzip" class="form-control" value="'+data.zipCode+'"/></td></tr>'
                    +'<tr><td class="lefttd">Phone</td><td class="righttd"><input type="text" id="modalphone" class="form-control" value="'+data.contact.phone+'"/></td></tr>'
                    +'<tr><td class="lefttd">Email</td><td class="righttd"><input type="email" id="modalemail" class="form-control" value="'+data.contact.email+'"/></td></tr>'
                    +'<tr><td class="lefttd">Contact Person</td><td class="righttd"><input type="text" id="modalcontactname" class="form-control" value="'+data.contact.name+'"/></td></tr>'
                    +'<tr><td class="lefttd">Update Key File</td><td class="righttd"><input type="file" id="modalfile" accept="application/json"></td></tr>'
                    +'</table>';

            $('#data1').html(table);
            companyNameValidation();
            
                
            }

            

            
        });







        
        $('#exampleModalCenter').modal('toggle');
        $('#exampleModalCenter').modal('show');

        

    }


    // UPDATE Company using same Modal
    function updateCompany(){

            var formData = new FormData();
            formData.append('name',$("#modalname").val());
            formData.append('description', $("#modaldescription").val());
            formData.append('address1',  $("#modaladdress1").val());
            formData.append('address2',  $("#modaladdress2").val());
            formData.append('city',  $("#modalcity").val());
            formData.append('state',  $("#modalstate").val());
            formData.append('zipCode',  $("#modalzip").val());
            formData.append('contactName',  $("#modalcontactname").val());
            formData.append('contactPhone',  $("#modalphone").val());
            formData.append('contactEmail',  $("#modalemail").val());
            

            // Attach file
            formData.append('serviceKeyFile', $('input[type=file]')[0].files[0]); 

            let id = $("#idtoupdate").text();
            // let description = $("#modaldescription").val();
            // let dialogflowServiceFile = $("#modalfile").val();
            // console.log(dialogflowServiceFile)
            // let address1 = $("#modaladdress1").val();
            // let address2 = $("#modaladdress2").val();
            // let city = $("#modalcity").text();
            // let state = $("#modalstate").text();
            // let zip = $("#modalzip").text();
            // let contactName = $("#modalcontactname").text();
            // let phone = $("#modalphone").text();
            // let email = $("#modalemail").text();

            // let body = {
                
            //     description : description,
            //     address1 : address1,
            //     address2 : address2,
            //     city : city,
            //     state : state,
            //     zipCode : zip,
            //     contactName : contactName,
            //     contactPhone : phone,
            //     contactEmail : email,
            //     serviceKeyFile : dialogflowServiceFile
                
            // }

            var s = confirm("ARE YOU SURE YOU WANT TO UPDATE THE RECORD?");

                if (s == true) {
                    $.ajax({
                        url: destination+'/companies/'+id,
                        data: formData,
                        type:"PATCH",
                        headers: {"Authorization": "Bearer "+localStorage.getItem("token")},
                        contentType: false,
                        processData: false,
                        
                        success : function(response)
                        {
                            console.log(response);
                            alert("RECORD UPDATED SUCCESSFULLY!")
            
                            window.location.reload();
                
                            
                                
                            
                
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                                console.log(errorThrown);
                
                            
                            
                
                        }
                        
                    });
                
                }
    }

    // Load JSON, config file
    function loadConfigJson ()
    {

        $.getJSON('../../config.json',function(data){
            // console.log('success',data.baseurl);
            destination = data.baseurl;

            getCompaniesList();


            
        })
    }

    function companyNameValidation(){
         // Validate Company Name
         $("#companynamewarn").hide();

         $("#modalname").focusout(function() 
         {
             console.log("Validate Company Name HIT");

             let company = $("#modalname").val();

             console.log("Company Name : ",company)

             let body = {
                 name : company
             }
             
                 $("#btnupdate").prop("disabled", false);
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
                         
                             $("#btnupdate").prop("disabled", false);
                             $("#companynamewarn").hide();

         
                             
                         

                     },
                     error: function(XMLHttpRequest, textStatus, errorThrown) {
                         $("#companynamewarn").text("Company name already exists.");
                         $("#companynamewarn").show();
                         $("#btnupdate").prop("disabled", true);

                         

                         

                     }
                     
                 });  
                         
     
         });
    }

   
    // View Credentials

    function viewCredential(userid)
    {
        console.log("User ID :",userid);

        $.ajax({
            url: destination+"/users/"+userid+"/credentials",
            type:"GET",
            headers: {"Authorization": "Bearer "+localStorage.getItem("token")},
            dataType: 'json',
            contentType: "application/json",
            success : function(data)
            {
                console.log(data);

                $("#credential-email").val(data.userCredentials.email);
                $("#credential-password").val(data.userCredentials.password);
                

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
               console.log(errorThrown);          
            }
    
        });

        $('#copyModalCenter').modal('toggle');
        $('#copyModalCenter').modal('show');
    }


    $('#copy-btn').tooltip({
        trigger: 'manual'
      });

    $("#copy-btn").click(function(e) {
        e.preventDefault();
        // let email = document.getElementById("credential-email");
        // let pwd = document.getElementById("credential-password");

        
            var copyText = document.getElementById("credential-email");
            copyText.select();
              document.execCommand("copy");
            var that = $(this)
            that.tooltip('show');
            setTimeout(function() {
              that.tooltip('hide');
            }, 2000);
          
    }); 
    
    $('#copy-btn-pwd').tooltip({
        trigger: 'manual'
    });

    $("#copy-btn-pwd").click(function(e) {
        e.preventDefault();
        // let email = document.getElementById("credential-email");
        // let pwd = document.getElementById("credential-password");

        
            var copyText = document.getElementById("credential-password");
            copyText.select();
              document.execCommand("copy");
            var that = $(this)
            that.tooltip('show');
            setTimeout(function() {
              that.tooltip('hide');
            }, 2000);
          
    }); 


    // EMAIL CREDENTIALS

    function emailCredential(userId){
        
        // let senderEmail = $("#sender-email").val();

        $("#send-mail-btn").val(userId);

        $('#emailModalCenter').modal('toggle');
        $('#emailModalCenter').modal('show');
    }

    // SEND EMAIL BUTTON

    $("#send-mail-btn").click(function(){

        let userId = $("#send-mail-btn").val();
        let senderEmail = $("#sender-email").val();

        if( !validateEmail(senderEmail)) {
            $("#emailrequiredwarn").text("Invalid Email Address");
            $("#emailrequiredwarn").show();
        }
        else
        {
            $('#img').show();
            $("#emailrequiredwarn").hide();

            let body = {
                emailAddress : senderEmail
            }

            // $("#send-mail-btn").prop("disabled",true);

            $.ajax({
                url: destination+'/users/'+userId+'/emailusercredentials',
                type:"POST",
                headers: {"Authorization": "Bearer "+localStorage.getItem("token")},
                dataType: 'json',
                contentType: "application/json",
                data: JSON.stringify(body),
                success : function(response)
                {
                    console.log(response);
                    $("#sender-email").val(""); 
                    $('#img').hide();
                    // $("#send-mail-btn").prop("disabled",false);
                    alert("EMAIL SEND SUCCESSFULLY");
                    $('#emailModalCenter').modal('toggle');
                    
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
                
            });  


        }
       
    })

    // Email validation function 

    function validateEmail($email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test( $email );
      }