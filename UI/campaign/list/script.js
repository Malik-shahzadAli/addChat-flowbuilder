var destination = "";
loadJson(); // Load JSON

var companyID = ""; // Global scope companyID
var JsonObject={};

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

    // getCompaniesListAgainstAPerticularUser(); // Get Companies List -- for a specific user

    // getCampaignList(); // Function calling, get Companies List

       
    
});

// Get Compaigns List
function getCampaignList ()
{
    let strdate = "";
    let sdate = "";
    let rows = "";
    let startDate="";
    let enddate = "";
    let edate = "";
    let end_Date="";
    


            $.ajax({
                url: destination+"/companies/"+companyID+"/campaigns",  // Get campaigns against company id
                type:"GET",
                headers: {"Authorization": "Bearer "+localStorage.getItem("token")},
                success : function(data)
                {
                    console.log("Here are the company campaigns : ",data);

                   for(let i = 0; i< data.campaigns.length; i++)
                    {
                        let item = data.campaigns[i];
                            
                                rows += "<tr role='row' class='odd'>";
                                rows+="<td >" + item.name+ "</td>"
                                + "<td>" + item.status + "</td>";
                                // Handle Start Date
                                strdate = item.startDate;
                                sdate = moment(strdate);
                                startDate = sdate.utc().format('DD-MM-YYYY');
                                rows+="<td>" + startDate + "</td>";

                                // Handle End Date

                                enddate = item.endDate;
                                edate = moment(enddate);
                                end_Date = edate.utc().format('DD-MM-YYYY');

                                rows+="<td>" + end_Date + "</td>";

                                
                                rows+= "<td>"
                                    +"<div class='dropdown show'>"
                                        +"<a class='btn btn-info dropdown-toggle' href='#' role='button' id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Action</a>"
                                        +"<div class='dropdown-menu' aria-labelledby='dropdownMenuLink'>"
                                            // +"<a class='dropdown-item' onclick='viewCompany(\""+item._id+"\")'>VIEW</a>" OK- working
                                            // +"<a class='dropdown-item' onclick='editCompany(\""+item._id+"\")'>EDIT</a>"
                                            // +"<a class='dropdown-item'style='cursor: pointer;' onclick='viewCampaign(\""+item._id+"\")'><i class='fa fa-fw fa-pencil mr-5'></i>Edit</a>" -- Working, but not for phase 1
                                            +"<a class='dropdown-item'style='cursor: pointer;'  onclick='campaignEdit(\""+item._id+"\")'><i class='fa fa-fw fa-pencil mr-5'></i>Edit</a>"   
                                            +"<div class='dropdown-divider'></div>" 
                                            +"<a class='dropdown-item' style='cursor: pointer;'><i class='fa fa-fw fa-archive mr-5'></i>Archive</a>"
                                            // +"<a class='dropdown-item' style='cursor: pointer;'><i class='fa fa-fw fa-envelope-o mr-5'></i>Email Credentials</a>"
                                                        
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

                    



                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log(errorThrown)
                        
                }
        
            });


            



}



//Signout
$("#signout").click(function(e) 
{
        localStorage.clear();
        window.location.href="../../";
})



// View Modal & Campaign Details
function viewCampaign(id)
{
    let table = "";

    $.ajax({
        url: destination+"/campaigns/"+id,
        type:"GET",
        headers: {"Authorization": "Bearer "+localStorage.getItem("token")},
        dataType: 'json',
        contentType: "application/json",
        success : function(status){
            console.log(status)
            let data = status.campaign;
        table+='<table class="table table-bordered table-striped table-vcenter">'
                +'<tr id="hiddenrow"><td class="lefttd"></td><td id="idtoupdate" class="righttd">'+data._id+'</td></tr>'
                +'<tr><td class="lefttd">Name</td><td class="righttd"><input type="text" id="modalname" class="form-control" value="'+data.name+'"/><p id="companynamewarn" style="color:red;"></p></td></tr>'     
                +'<tr><td class="lefttd">Description</td><td class="righttd"><textarea id="modaldescription" class="form-control" rows="2" cols="50">'+data.description+'</textarea></td></tr>'     
                +'<tr><td class="lefttd">Status</td><td class="righttd"><input type="text" id="modalstatus" class="form-control" value="'+data.status+'"/></td></tr>'
                +'<tr><td class="lefttd">Start Date</td><td class="righttd"><input type="text" id="modalenddate" class="form-control" value="'+data.endDate+'"/></td></tr>'
                +'<tr><td class="lefttd">Agent JSON</td><td class="righttd"><textarea id="modaljson" class="form-control" rows="3" cols="50">'+JSON.stringify(data.agentJSON)+'</textarea></td></tr>'     
                +'</table>';

        $('#data1').html(table);
        // campaignNameValidation();
        
            
        }

        

        
    });







    
    $('#exampleModalCenter').modal('toggle');
    $('#exampleModalCenter').modal('show');

    

}


// UPDATE Campaign using same Modal
function updateCampaign(){

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
function loadJson ()
{

    $.getJSON('../../config.json',function(data){
        // console.log('success',data.baseurl);
        destination = data.baseurl;

        getCompaniesListAgainstAPerticularUser();


        
    })
}


// Campaign Name Validation
function campaignNameValidation(){
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



// Get List of companies against a perticular user

function getCompaniesListAgainstAPerticularUser()
{
    
    //******************** NOTE ************************

    $.ajax({
                url: destination+"/users/"+localStorage.getItem("userId")+"/companies", // Get all companies list against a user id
                type:"GET",
                headers: {"Authorization": "Bearer "+localStorage.getItem("token")},
                success : function(data)
                {
                    console.log("Companies: ",data);

                    companyID = data.companies[0]._id;
                    getCampaignList();

                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log(errorThrown)
                }

            });
}



// 
function campaignEdit(myid){
    localStorage.setItem('id',myid);
    window.location.replace("http://localhost:3000/campaign/edit/");
// console.log(JSONArray);
}
