var jsPlumb = document.createElement("script");
jsPlumb.type = "text/javascript";
jsPlumb.src = "./jsplumb.min.js";
var json=0;
var frontEndUrl;
function loadJson(){
    let compaignNumber = $('#number').find(":selected").val();
    //if user selected any campaign Number
    if(compaignNumber !='2'){
        prepareOneBoxJSON('00','0')
    }
    $.getJSON('../../config.json',function(data){
        frontEndUrl=data.frontEndUrl;
    })
}
var counter=0;
var addNewBox=0;
var addFallBack=0;
var totalBoxes=0;
var JsonArray=[];
// button drop down
$(".dropdown").dropdown();
// collapase UserSays Body
$('#UserSays').collapse('show')
$('#dynamicUserSays').collapse('show')
//User Responses Body
$('#responses').collapse('show')
//User Input Body
$('#userInput').collapse('show')
//Collapse button of User Says
$('#colapse').click(function(){
    $('#UserSays').collapse('toggle')
    Refresh();
})
$('#dynamicColapse').click(function(){
    $('#dynamicUserSays').collapse('toggle');
    Refresh();
})
// collapse Responses Button
$('#colapseResponses').click(function(){
    $('#responses').collapse('toggle');
    Refresh();
})
// collapse User Input Button
$('#colapseUserInputs').click(function(){
    $('#userInput').collapse('toggle')
  
})
//adding new traning phase
function addnewTraningPhaseCard(e){
    counter++;
    var boxOldCounter=$(`#child${e.classList[1]}`).data('text');
    var boxNewCounter=parseInt(boxOldCounter+1);
    var  row=e.classList[2];
    $(`#child${e.classList[1]}`).data('text',boxNewCounter);
    $(`#UserSaysBody${e.classList[1]}`).append(`
    <div class="col-md-12 ${counter}"  style="margin-top:3%;" id='div${counter}'>
       <div class="hypermodel-item ui-sortable-handle">
           <div style="float:left; width:80%;" class='TraningPhaseSpan ${e.classList[1]} ${row}' id="TraningPhasediv${e.classList[1]}${boxNewCounter}" onclick="onClick(this)" data-text="Sample text">
               <span id='TraningPhasediv${e.classList[1]}${boxNewCounter}Span' style="font-size: 90%;" data-text='Add text here' >Add text here</span>
           </div>
           <div class="buttonClass btn ${counter} ${e.classList[1]} ${row}"  style="width:5%;color:#CD5C5C;float: right;" onclick="Remove(this)">
               <i class="fa fa-times fa-xs" aria-hidden="true"></i>
           </div>
       </div>
    </div>
    `
    );
   
prepareOneBoxJSON(e.classList[1],row);
Refresh();
}

// when user click on tranning phase traning phase on click
function onClick(e) {
    // toggle Model
    jQuery('#modal-trainingPhase').modal('toggle');
    //empty old text
    $('#addTraningPhase').text('')
    //getting span id
    var id=e.id+'Span';
    //setting data-text in div text
    $("#text").data('text',id)
    //setting value in modal
    $('#addTraningPhase').val($('#'+id).data('text'));
    $('#modal-trainingPhase').data('text',e.classList[1]);
    $('#modalContent').data('text',e.classList[2]);
}
// Adding text on Traning Phase Span
$('#addTraning').click(function(){
    var boxNo=$('#modal-trainingPhase').data('text');
    var row=$('#modalContent').data('text');
    //getting value from modal
    var id=$('#text').data('text');
    //setting  div data-text
    $('#'+id).data('text',$('.trainingPhase').val())
    //getting data-text value
    var text=$('#'+id).data('text');
    //checking length
    if(text.length >0){
        if(text.length >25){
        $('#'+id).text(text.slice(0,22)+(' . . .'));
    }
    else{
        $('#'+id).text(text);
    }
    }
    else{
        var text=$('#'+id).data('text','Add text here');
        $('#'+id).text('Add text here')
    }
    prepareOneBoxJSON(boxNo,row);
    Refresh();
    // jsPlumb.repaintEverything();
})
// Remove Code
function Remove(e) {
    var row=e.classList[4];
    $('#'+"div"+e.classList[2]).remove();
    prepareOneBoxJSON(e.classList[3],row);
    Refresh();
    // jsPlumb.repaintEverything();
}
// //////////////////////////////////////////////////////////////////////////////////
//                                 Responses                                      //
///////////////////////////////////////////////////////////////////////////////////
function textFunction(e){
    //toggle the text modal
    jQuery('#modal-text').modal('toggle');
    //emtpy old text from text area
    $('#addTextArea').val('')
    //adding row into the modal text
    $('#modal-text').data('text',e.classList[1])
    $('#modalContent').data('text',e.classList[2]);
    $(".dropdown").dropdown('toggle');
    $('#length').text('SMS (0/0)');
}
function imageFunction(e){
    //if user select the image from dropdown
    $('#img').val('')
    //toggle image modal
    jQuery('#modal-slideright').modal('toggle');
    $('#addImage').addClass('disabled');
    //output div load selected Image
    //first of all empty old loaded image from output div
    $('#output').attr('src','')
    $('#modal-slideright').data('text',e.classList[1])
    $('#modalContent').data('text',e.classList[2]);
    $(".dropdown").dropdown('toggle');

}
function delayFunction(e){
    //toggle the delay dropdown
    jQuery('#modal-delay').modal('toggle');
    //input delay empty
    $('#delayInput').val('')
    //selecting the default value secounds from dropdown
    $('#unit').val('Seconds')
    $('#modal-delay').data('text',e.classList[1]);
    //setting row no
    $('#modalContent').data('text',e.classList[2]);
    $(".dropdown").dropdown('toggle');

}
// adding text on the  responses span
$('#addText').click(function(){
  counter++;
  //getting row number
  var rowNo=$('#modal-text').data('text');
  var row=$('#modalContent').data('text');
  var oldCounter;
  var newCounter;
  // checking if user input something in the text area
  if($('#addTextArea').val() !== ''){
     oldCounter=$(`#responsesChilds${rowNo}`).data('text');
     newCounter=parseInt(oldCounter+1);
    $(`#responsesChilds${rowNo}`).data('text',newCounter);
    //appending responses body with new card
    $('#responsesBody'+rowNo).append(`
    <div class="col-md-12 ${counter}"  style="margin-top:3%;" id='div${counter}'>
        <div class="hypermodel-item ui-sortable-handle">
            <div style="float:left; width:70%;" class='${rowNo} ${row}' id="ResponseDiv${rowNo}${newCounter}" onclick="ResponseModal(this)" data-text="Sample text">
                <span id='ResponseDiv${rowNo}${newCounter}Span' style="font-size: 90%;" ></span>
            </div>
            <div class="buttonClass btn ${counter} ${rowNo} ${row}" style="width:5%;color:#CD5C5C;  float: right;" onclick="Remove(this)">
                <i class="fa fa-times fa-xs" aria-hidden="true"></i>
            </div>
        </div>
     </div>
    `
    )
    //adding text on the responses card
    $(`#ResponseDiv${rowNo}${newCounter}Span`).data('text',$('#addTextArea').val());
    //user input text length
    var textLength=$(`#ResponseDiv${rowNo}${newCounter}Span`).data('text');
    //checking if user input more than 25 characters
    if(textLength.length > 25){
        //adding 22 characters on the card and 3 dots
        $(`#ResponseDiv${rowNo}${newCounter}Span`).text(textLength.slice(0,22)+(' . . .'));
    }else{
        //if text is less than 25 characters seetting the same text 
        $(`#ResponseDiv${rowNo}${newCounter}Span`).text($('#addTextArea').val())
    }
}
prepareOneBoxJSON(rowNo,row);
Refresh();
// jsPlumb.repaintEverything();
})
//when user click on the add image button 
//from jquery modal
$('#addImage').click(function(e){
  counter++;
  var rowNo=$('#modal-slideright').data('text');
  var row=$('#modalContent').data('text');
  var oldCounter;
  var newCounter;
  //getting image source from the image modal 
  //source set in the loadfile() function
  var source=$('#footer').data('text');
  //checking if user load image 
  if(source !='')
  {
    oldCounter=$(`#responsesChilds${rowNo}`).data('text');
    newCounter=parseInt(oldCounter+1);
    $(`#responsesChilds${rowNo}`).data('text',newCounter);
    //appending the response body with the image card
    $('#responsesBody'+rowNo).append(`
    <div class="col-md-12 ${counter}"  style="margin-top:3%;" id='div${counter}'>
        <div class="hypermodel-item ui-sortable-handle">
            <div style="float:left; width:70%;" class='${rowNo} ${row}' id="imagediv${rowNo}${newCounter}" onclick="updateImage(this)" data-text="Sample text">
                <span id='imagediv${rowNo}${newCounter}Span' data-text(${source})>  <img src=${source} width='25'  class="rounded" id='imagediv${counter}SpanImage'></span>
            </div>
            <div class="buttonClass btn ${counter} ${rowNo} ${row}" style="width:5%; color:#CD5C5C; float: right;" onclick="Remove(this)">
                <i class="fa fa-times fa-xs" aria-hidden="true"></i>
            </div>
        </div>
     </div>
    `
    )
    $(`#imagediv${rowNo}${newCounter}Span`).data('text',source)
  }
  prepareOneBoxJSON(rowNo,row);
  Refresh();
//   jsPlumb.repaintEverything();
})
//when user click on add delay jquery modal button
//add time Delay on the span
$('#addDelay').click(function(){
counter++;
var rowNo=$('#modal-delay').data('text');
var row=$('#modalContent').data('text');
var oldCounter;
var newCounter;
// checking if user input some time
  if($('#delayInput').val() !='')
  {
    oldCounter=$(`#responsesChilds${rowNo}`).data('text');
    newCounter=parseInt(oldCounter+1);
    $(`#responsesChilds${rowNo}`).data('text',newCounter);
    //appending the responses body with delay card
    $('#responsesBody'+rowNo).append(`
    <div class="col-md-12 ${counter}"  style="margin-top:3%;" id='div${counter}'>
        <div class="hypermodel-item ui-sortable-handle">
            <div style="float:left; width:10%;">
                <i class="fa fa-fw fa-clock-o fa-lg" aria-hidden="true"></i>
            </div>
            <div style="float:left; width:70%;" class='${rowNo} ${row}' id="delayDiv${rowNo}${newCounter}" onclick="updateDelayModel(this)" data-text="Sample text">
                <span id='delayDiv${rowNo}${newCounter}Span' style="font-size: 90%; padding-left:25%;" > </span>
            </div>
            <div class="buttonClass btn ${counter} ${rowNo} ${row}" style="width:5%;color:#CD5C5C; float: right;" onclick="Remove(this)">
                <i class="fa fa-times fa-xs" aria-hidden="true"></i>
            </div>
        </div>
     </div>
    `
    )
    //getting delay input + selected unit
    var delay=$('#delayInput').val()+" "+$('#unit').val();
    //setting data text time and unit
    $(`#delayDiv${rowNo}${newCounter}Span`).data('text',delay)
    //setting time and unit on the span of responses
    $(`#delayDiv${rowNo}${newCounter}Span`).text(delay)
  }
  prepareOneBoxJSON(rowNo,row);
  Refresh();
//   jsPlumb.repaintEverything();
})  

                                                    ///////////////////
                                                   //  UPDATE TEXT  //
                                                  ///////////////////

//adding text on modal when user click on the card of text response
function ResponseModal(e) {
    //toggle the update text modal
    jQuery('#modal-update').modal('toggle');
    //empty old text from modal
    $('#updateTextArea').text('')
    //getting id on which card user click
    var id=e.id+'Span';
    $("#updateRes").data('text',id)
    //setting value on the jquery modal text area
    $('#updateTextArea').val($('#'+id).data('text'))
    
    $('#modal-update').data('text',e.classList[0])
    $('#modalContent').data('text',e.classList[1]);
    var length=parseInt($('#updateTextArea').val().length)+1;
    $('#updateLength').text(`SMS (${length} /${Math.ceil(length/160)})`)
}
//when user click on the update Text button from jquery modal
$('#updateText').click(function(e){
    var rowNo=$('#modal-update').data('text');
    var row=$('#modalContent').data('text');
    //getting card id on which user click
    var spanId= $("#updateRes").data('text');
    $('#'+spanId).data('text',$('#updateTextArea').val())
    //setting the data text of the card what user update
    var updateText=$('#'+spanId).data('text');
    //checking user enter text length
    if(updateText.length >0){
        if(updateText.length > 25){
            $('#'+spanId).text(updateText.slice(0,22)+(' . . .'));
        }else{
            $('#'+spanId).text(updateText)
        }
    }else{
    $('#'+spanId).text('Add text here');
    }
    prepareOneBoxJSON(rowNo,row);
    // jsPlumb.repaintEverything();
})
                                                    /////////////////
                                                   // UPDATE DELAY//
                                                  /////////////////

//when user click on the card of delay
function updateDelayModel(e){
    //toggle the update dealy jquery modal
    jQuery('#modal-updateDelay').modal('toggle');
    $('#delayInput').text('');
    //getting id on which span user click
    var id=e.id+'Span';
    //set the id on the jquery modal div #delaydiv
    $('#delayDiv').data('text',id);
    //getting text from card
    var string=$('#'+id).data('text');
    //spliting unit and the time dalay
    var splitText = string.split(" ");
    //time
    var time=splitText[0];
    //unit like minut sec and days
    var unit=splitText[1];
    //setting the input field value 
    $('#updateUnit').val(unit)
    //setting unit value on the jquery modal
    $('#updateDelayInput').val(time);
    $('#modal-updateDelay').data('text',e.classList[0]);
    $('#modalContent').data('text',e.classList[1]);
}
//when user click on the update delay button from jquery modal
$('#updateDelay').click(function(e){
    //getting boxNo
    var rowNo=$('#modal-updateDelay').data('text');
    //getting row
    var row=$('#modalContent').data('text');
    //getting the card id on which user click
    var spanId= $("#delayDiv").data('text');
    //getting the user input and user selected unit
    $('#'+spanId).data('text',($('#updateDelayInput').val()+" "+$('#updateUnit').val()))
    //setting updated text on the span data text
    var updateText=$('#'+spanId).data('text');
    //setting the value on the span card
    $('#'+spanId).text(updateText)
    prepareOneBoxJSON(rowNo,row);
    // jsPlumb.repaintEverything();
})
//load image in modal
function loadFile(e) {
    //getting img from form
    var img = new FormData();
    //getting file from the form data
    var file = (e.target.files[0]);
    img.append('img',file);
    //uploading image on the server
    $("#footer").data("text"," ");
    $.ajax({
        url: destination+'/campaigns/'+myId+'/uploads',
        type: 'post',
        headers: {"Authorization": "Bearer "+localStorage.getItem("token"),"Accept":"text"},
        data: img,
        contentType: false,
        processData: false,
        success: function(response){
            $('#output').attr('src',response.imageUrl);
            $("#footer").data("text",response.imageUrl);
            $('#addImage').removeClass('disabled');
            $('#updateImageBtn').removeClass('disabled')
        },
    });
};
                                                    /////////////////
                                                   // UPDATE IMAGE//
                                                  /////////////////
//when user click on the image card
function updateImage(e){
    //toggle the update image modal
    jQuery('#modal-updateImage').modal('toggle');
    $('#updateImageBtn').addClass('disabled');
    //removing old loaded values from jQuery modal
    $('#updateOutput').attr('src','')
    $('#updateImage').val('')
    var id=e.id+'Span';
    // var src=$('#'+id).text();
    $('#updateImageBlock').data('text',id);
    $('#modal-updateImage').data('text',e.classList[0]);
    $('#modalContent').data('text',e.classList[1]);
}
//loading value in Update JQUery modal 
function loadUpdatedImage(e){
        //getting img from form
        var img = new FormData();
        //getting file from the form data
        var file = (e.target.files[0]);
        img.append('img',file);
        //uploading image on the server
        $("#updateImageFooter").data("text"," ")
        $.ajax({
            url: destination+'/campaigns/'+myId+'/uploads',
            type: 'post',
            headers: {"Authorization": "Bearer "+localStorage.getItem("token"),"Accept":"text"},
            data: img,
            contentType: false,
            processData: false,
            success: function(response){
                $('#updateOutput').attr('src',response.imageUrl);
                $("#updateImageFooter").data("text",response.imageUrl);
                $('#updateImageBtn').removeClass('disabled')
            },
        });
}

//when  user click on the jquery modal
$('#updateImageBtn').click(function(e){
    //getting boxNo
    var rowNo=$('#modal-updateImage').data('text');
    //getting row 
    var row=$('#modalContent').data('text');
    //getting clicked span id
    var id=$('#updateImageBlock').data('text');
    //getting updated image source from the jquery modal
    var source=$('#updateImageFooter').data('text');
    //setting new image
    $(`#${id} img`).attr('src',source)
    // $('#'+id+'Image').attr('src',source)
    prepareOneBoxJSON(rowNo,row);
    // jsPlumb.repaintEverything();
})
/////////////////////////////////////////////////////////////////////////////////////
//                         USER INPUTS                                            //           
///////////////////////////////////////////////////////////////////////////////////
// When user select Fall Back option from dropdown button
function addFirstFallback(e){
    var boxCounter=$(`#${e.id}`).data('text');
    jQuery('#modal-fallBack').modal('toggle');
    $('#fallbackName').val('');
    $('#modal-fallBack').data('text',e.classList[1]);
    $('#fallbackCounter').data('text',-1);
    //sending 0 fall back
    $('#createdFallback').data('text',0)
    //fallbackParentDivid
    $('#fallbackParentDivid').data('text',e.classList[4]);
    //getting old counter
    var oldCounter=$(`#ChildCounter${e.classList[2]}`).data('text');
    //new counter
    var newCounter=parseInt(oldCounter+1);
    //modal child counter setting data text new counter after adding one 
    $('#childCounter').data('text',newCounter);
    //again updating child counter
    $(`#ChildCounter${e.classList[2]}`).data('text',newCounter);
    $('#blockContent').data('text',boxCounter)

}
function addFallback(e){
    var id=e.id;
    var boxCounter=$(`#${e.id}`).data('text');
    $('#blockContent').data('text',boxCounter)
    jQuery('#modal-fallBack').modal('toggle');
    $('#fallbackName').val('');
    $('#modal-fallBack').data('text',e.classList[1]);
    $('#fallbackCounter').data('text',e.classList[2]);
    //checking if 2 classes have same name
    if(e.classList[4] != 'btn'){   
        $('#createdFallback').data('text',e.classList[3])
        $('#fallbackParentDivid').data('text',e.classList[4])
    }
    else{
        //if 2 classes have same name send the first one class
        $('#createdFallback').data('text',e.classList[1])
        $('#fallbackParentDivid').data('text',e.classList[3])
       
    }
       //getting the old counter
       var oldCounter= $(`#ChildCounter${e.classList[2]}`).data('text');
       //increasing the counter
       var newCounter=parseInt(oldCounter+1);
       //updating counter
       $(`#ChildCounter${e.classList[2]}`).data('text',newCounter);
       //jQuery modal childcounter adding
       $('#childCounter').data('text',newCounter); 
    // $('#fallbackParentDivid').data('text',e.classList[5])
        //setting the parent div root1..etc in the parent div id 
        
    
}
//when user click on add fallback button
$('#addFallback').click(function(){
    // increasing counter
    counter++;
    //getting the row
    var btnClass=$('#modal-fallBack').data('text');
    //next row
    var row=parseInt(btnClass)+1;
    //getting fall back name
    var fallBackName=$('#fallbackName').val();
    //user clicked fallback 
     var fallbackCounter=$('#fallbackCounter').data('text')
    //checking user enter fall back name or not
    var parent=$('#fallbackParentDivid').data('text');
    var childCounter=$('#childCounter').data('text');
    if(childCounter >9){
        childCounter='a'+childCounter;
    }
    //getting box counter
    var boxCounter=$('#blockContent').data('text')
    if(fallBackName != ''  ){
        addFallBack++;
        totalBoxes++;
        //checking if first fall back 
        if( fallbackCounter != -1){appendFallback(fallbackCounter, addNewBox,totalBoxes,counter,parent,childCounter)}
        else{appendFallback(btnClass, addNewBox,totalBoxes,counter,parent,childCounter)}
        if( btnClass== addNewBox){createNewBoxRow(parent,childCounter)}
        else{createNewBox(parseInt(btnClass)+1,parent,childCounter);}
        $(`#title${addNewBox}${totalBoxes}`).text(fallBackName);
        $(`#title${addNewBox}${totalBoxes}`).data('text',fallBackName);
        Refresh();
        //getting delay input + selected unit
        var name=$('#fallbackName').val();
        //setting data text time and unit
        $(`#fallbackDiv${counter}Span`).data('text',name)
        //setting time and unit on the span of responses
        $(`#fallbackDiv${counter}Span`).text(name)
       if($(`#fallbackDiv${counter}Span`).length){
        var id=($(`#fallbackDiv${counter}Span`).parent().parent().parent().parent().parent().children()[1].children.dropdown.children[1].children[0].id);
        //disable the fall back button
        $('#'+id).addClass('disabled');
       }
       else{
        $(`#fallDropdown${boxCounter}`).addClass('disabled')
       }
        // $(`#fallbackDiv${counter}Span`).parent().parent().parent().parent().parent().children()[1].children.dropdown.children[1].children[0]('a').addClass('disabled')
        //puting name on the box
        $('.modelTitle').text(name);
        //add class in fallDropdown
        $(`#fallDropdown${totalBoxes}`).addClass(parent+counter);
        //add class on general dropdown
        $(`#genDropdown${addNewBox}`).addClass(parent+counter);
        $(`#parent${addNewBox}${totalBoxes}`).data('text',parent);
        $(`#id${addNewBox}${totalBoxes}`).data('text',parent+childCounter)
    }
    prepareOneBoxJSON(addNewBox+""+totalBoxes,row);
    // jsPlumb.repaintEverything();
})


                                                    ////////////////////
                                                   // UPDATE FALLBACK//
                                                  ////////////////////
//adding text on modal when user click on the card of text fallBack
function updateFallbackName(e) {
    //toggle the update text modal
    jQuery('#modal-updateFallBack').modal('toggle');
    //empty old text from modal
    $('#updateFallbackName').val('')
    //getting id on which card user click
    var id=e.id+'Span';
    $('#modal-updateFallBack').data('text',e.classList[0]);
    $("#fallback").data('text',id)
    //setting value on the jquery modal text area
    $('#updateFallbackName').val($('#'+id).data('text'))
}
//when user click on the update Text button from jquery modal
$('#updateFallback').click(function(e){
    //getting card id on which user click
    var spanId= $("#fallback").data('text');
    var boxTitleid=$('#modal-updateFallBack').data('text');

    $('#'+spanId).data('text',$('#updateFallbackName').val())
    //setting the data text of the card what user update
    var updateText=$('#'+spanId).data('text');
    //Adding Span Text 
    $('#'+spanId).text(updateText)
    $('.modelTitle').text(updateText);
    $(`#title${boxTitleid}`).data('text',$('#updateFallbackName').val());
    $(`#title${boxTitleid}`).text($('#updateFallbackName').val());
    prepareOneBoxJSON(boxTitleid);
    // jsPlumb.repaintEverything();
})

/////////////////////////////////
// Creating a new general box //
///////////////////////////////
function addFirstGenral(e){
    //toggle the jquery modal
    jQuery('#modal-general').modal('toggle');
    //empty the name of general
    $('#generalName').val('');
    //setting the row number
    $('#modal-general').data('text',e.classList[1]);
    //for first row setting data text
    $('#generalCounter').data('text',-1)
    //setting the Root div in parent div
    $('#parentDivid').data('text',e.classList[3]) 
    //getting the old counter 
    //e.class list[2] gives us the rownumber and counter
    var oldCounter=$(`#ChildCounter${e.classList[2]}`).data('text');
    //new counter
    var newCounter=parseInt(oldCounter+1);
    //modal child counter setting data text new counter after adding one 
    $('#childCounter').data('text',newCounter);
    //again updating child counter
    $(`#ChildCounter${e.classList[2]}`).data('text',newCounter);
}
function addGenral(e){
    //toggle the JQuery modal
    jQuery('#modal-general').modal('toggle');
    //empty the general name
    $('#generalName').val('');
    //setting the row number in jQuery modal
    $('#modal-general').data('text',e.classList[1]);
    //setting the addNewbox and counter in generalCounter
    $('#generalCounter').data('text',e.classList[2])
    //getting the old counter
    var oldCounter= $(`#ChildCounter${e.classList[2]}`).data('text');
    //increasing the counter
    var newCounter=parseInt(oldCounter+1);
    //updating counter
    $(`#ChildCounter${e.classList[2]}`).data('text',newCounter);
    //jQuery modal childcounter adding
    $('#childCounter').data('text',newCounter); 
    //setting the parent div root1..etc in the parent div id 
    $('#parentDivid').data('text',e.classList[3])
}
$('#addGeneral').click(function(e){
    counter++;
    //getting the btn class 
    var btnClass=$('#modal-general').data('text');
    //getting the generalname
    //setting next row
    var row=parseInt(btnClass)+1;
    var generalName=$('#generalName').val();
    //getting the addnew box and counter 
    var generalCounter=$('#generalCounter').data('text');
    //getting the parent
    var parent=$('#parentDivid').data('text');
    //getting the child counter from JQuery modal
    var childCounter=$('#childCounter').data('text');
    if(childCounter >9){
        childCounter='a'+childCounter;
    }
    var oldCounter;
    var newCounter;
    if(generalName != ''){
        //getting the old counter
        oldCounter=$(`#userInputChilds${generalCounter}`).data('text');
        //increasing the old counter
        newCounter=parseInt(oldCounter+1);
        //setting the userInputChilds data new counter
        $(`#userInputChilds${generalCounter}`).data('text',newCounter);
        //increasing total boxes
        var p;
        var child;
        totalBoxes++;
 
        if(generalCounter != -1){
            appendGeneral(generalCounter, addNewBox,totalBoxes,counter,newCounter,btnClass,childCounter,parent)
        }
        else if(generalCounter == -1 && totalBoxes != 1){
          appendGeneral(btnClass, addNewBox,totalBoxes,counter,newCounter,childCounter,parent)
        }
        else{
            appendGeneral(btnClass, addNewBox+1,totalBoxes,counter,newCounter,childCounter,parent)
        }
        if( btnClass== addNewBox){
            createNewGenralRow(parent,childCounter);
        }
        else{createNewGenralBox(parseInt(btnClass)+1,parent,childCounter);
        }

        $(`#title${addNewBox}${totalBoxes}`).data('text',generalName);
        $(`#title${addNewBox}${totalBoxes}`).text(generalName);
        //getting delay input + selected unit
        var name=$('#generalName').val();
        //setting data text time and unit
        $(`#generalDiv${addNewBox}${totalBoxes}Span`).data('text',name)
        //setting time and unit on the span of responses
        $(`#generalDiv${addNewBox}${totalBoxes}Span`).text(name)

        //puting name on the box
        // $('.generalTitleName').text(name);
        // $(`#genDropdown${addNewBox}`).addClass(parent+counter);
        $(`#genDropdown${totalBoxes}`).addClass(parent+counter);
        $(`#fallDropdown${totalBoxes}`).addClass(parent+counter);
        $(`#parent${addNewBox}${totalBoxes}`).data('text',parent);
        $(`#id${addNewBox}${totalBoxes}`).data('text',parent+childCounter)
    }
    Refresh();
    prepareOneBoxJSON(addNewBox+""+totalBoxes,row);
    // jsPlumb.repaintEverything();
  
})
                                                    ////////////////////
                                                   // UPDATE GENERAL //
                                                  ////////////////////
//when user click on the card
function updateGeneralName(e) {
    //toggle the update text modal
    jQuery('#modal-updateGeneral').modal('toggle');
    //empty old text from modal
    $('#updateGeneralName').val('')
    //getting id on which card user click
    var id=e.id+'Span';
   $('#modal-updateGeneral').data('text',e.classList[0])
    $("#generaldiv").data('text',id)
    //setting value on the jquery modal text area
    $('#updateGeneralName').val($('#'+id).data('text'))
    // $(`#title${e.classList[0]}`).data('text')
}
///when user click on the update general button from the j query modal
$('#updateGeneral').click(function(e){
    //getting card id on which user click
    var spanId= $("#generaldiv").data('text');
    var boxTitleid=$('#modal-updateGeneral').data('text');
    $('#'+spanId).data('text',$('#updateGeneralName').val())
    //setting the data text of the card what user update
    var updateText=$('#'+spanId).data('text');
    //Adding Span Text 
    $('#'+spanId).text(updateText)
    $('.generalTitleName').text(updateText);
    $(`#title${boxTitleid}`).data('text',$('#updateGeneralName').val());
    $(`#title${boxTitleid}`).text($('#updateGeneralName').val());
    prepareOneBoxJSON(boxTitleid);
    // jsPlumb.repaintEverything();

})

/////////////////////////////////////////////////////////////////////
//              FUNCTION CREATE NEW FALLBACK ROW                  //
///////////////////////////////////////////////////////////////////
function createNewBoxRow(parent,childCounter){
    addNewBox++;
    var a=parent+''+childCounter;
    $('#AppendDiv').append(`
    <div id='tgen'></div>
    <div id='responsesChilds${addNewBox}${totalBoxes}' data-text='0'></div>
    <div id='isFallback${addNewBox}${totalBoxes}' data-text='true'></div>
    <div id='id${addNewBox}${totalBoxes}'></div>
    <div id='parent${addNewBox}${totalBoxes}'></div>
    <div id='${a}' data-text='${addNewBox}${totalBoxes}'></div>
    <div class="hypermodel-column " id='colum${addNewBox}'>
    <div  class="hypermodel-grid ${a}" >
    <div class="hypermodel-header" style="background:#60a3bc;" id='a${a}'>
        <h3 style="margin-left:-5%;color:white;" id='title${addNewBox}${totalBoxes}'>Property</h3>
    </div>
    <!-- Responses Part -->
    <div class="hypermodel-body">
        <div  id='block${addNewBox}' style="margin-left:-10px;margin-right:-10px;margin-top:-5px;">
            <div class="block-header" style="padding-top:5%;padding-bottom:0%; background:#bbdcf7;">
                <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;;"><b>Responses</b></p>
                <i class="fa fa-caret-down fa-sm ${addNewBox}${counter}" aria-hidden="true"  style="margin-top: -10%;"  data-target='#responsesBody${addNewBox}' onclick='responsesCollapse(this)'></i>
            </div>
            <div id='responses${addNewBox}${counter}'class='responses${addNewBox}${counter}' style="background: #FFFFFF; margin-top: -5%;">
                <div id="responsesBody${addNewBox}${totalBoxes}" style="padding-top:1%;"></div>
                <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%;"  >
                    <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${totalBoxes}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='btnGroupVerticalDrop4' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='dropdownBtn(this)'>
                        <i class="fa fa-plus"></i>
                        <div class="dropdown-menu drop${addNewBox}${totalBoxes} " aria-labelledby="btnGroupVerticalDrop2">
                        <a class='dropdown-item ${addNewBox}${totalBoxes} ${addNewBox}' onclick='textFunction(this)'>
                            <i class="fa fa-fw fa-envelope-o mr-5"></i>Text
                        </a>
                        <div class="dropdown-divider"></div>
                            <a class="dropdown-item ${addNewBox}${totalBoxes} ${addNewBox}" onclick='imageFunction(this)'>
                                <i class="fa fa-file-image-o mr-5" aria-hidden="true"></i> Picture
                            </a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item ${addNewBox}${totalBoxes} ${addNewBox}" onclick='delayFunction(this)'>
                            <i class="fa fa-fw fa-clock-o fa-lg" aria-hidden="true"></i> Delay
                        </a>                                                         
                    </div>      
                </div>
            </div>
        </div> 
    </div>
    </div>
    <!--User says -->
    <div class="hypermodel-body" id='userInputModal'>
    <div id='ChildCounter${addNewBox}${counter}' data-text='0'></div>
        <div  id="block"style="margin-left:-10px;margin-right:-10px;margin-top:-5px;">
            <div class="block-header" style="padding-top:5%;padding-bottom:0%; background:#bbdcf7;">
                <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;;"><b>User Inputs</b></p>
                <i class="fa fa-caret-down fa-sm ${counter}" aria-hidden="true"  style="margin-top: -10%;"  data-target="#userInput" onclick='colapseUserInputs(this)'></i>
            </div>
            <div id='userInput${counter}' style="background: #FFFFFF; margin-top: -5%;">
                <div id="userInputBody${addNewBox}${counter}" style="padding-top:1%;"></div>
                <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%; ">
                    <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${counter}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='dropdown' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='userInputDropdownBtn(this)'>
                        <i class="fa fa-plus"></i>
                        <div class="dropdown-menu dropdown${addNewBox}${counter}" aria-labelledby="btnGroupVerticalDrop2">
                            <a id='fallDropdown${totalBoxes}' data-text=${totalBoxes} class="dropdown-item ${addNewBox} ${addNewBox}${counter} ${totalBoxes} ${a} btn" onclick='addFallback(this)'>
                                FallBack
                            </a>
                            <div id='falling${totalBoxes}'>
                            <div class="dropdown-divider " id='generalCounter'></div>
                            </div>
                            <a id='genDropdown${totalBoxes}' class="dropdown-item ${addNewBox} ${addNewBox}${counter} ${a}" onclick='addGenral(this)'>
                                General
                            </a>                                             
                        </div> 
                        <div class='f1' id='createdFallback'></div>     
                    </div>
                </div>
            </div> 
        </div>
    </div>
</div>
    </div>
  `)
  var pare=`Remove${a}`;
  var chil=`a${a}`
   createLine(pare,chil)
  $('#tgen').data('text',($('#fallCount').data('text')+addNewBox))


}
//////////////////////////////////////////////////////////
//        FUNCTION CREATES NEW FALL BACK BOX           //
////////////////////////////////////////////////////////
function createNewBox(number,parent,childCounter){
    var a=parent+''+childCounter;
    $('#colum'+number).append(`
    <div id='tgen'></div>
    <div id='responsesChilds${addNewBox}${totalBoxes}' data-text='0'></div>
    <div id='isFallback${addNewBox}${totalBoxes}' data-text='true'></div>
    <div id='id${addNewBox}${totalBoxes}'></div>
    <div id='parent${addNewBox}${totalBoxes}'></div>
    <div id='${a}' data-text='${addNewBox}${totalBoxes}'></div>
    <div class="hypermodel-grid ${a}"  >
        <div class="hypermodel-header" style="background:#60a3bc;" id='a${a}'>
            <h3 style="margin-left:-5%;color:white;" id='title${addNewBox}${totalBoxes}'>Property</h3>
        </div>
        <!-- Responses Part -->
        <div class="hypermodel-body">
            <div  id='block${addNewBox}' style="margin-left:-10px;margin-right:-10px;margin-top:-5px;">
                <div class="block-header" style="padding-top:5%;padding-bottom:0%; background:#bbdcf7;">
                    <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;;"><b>Responses</b></p>
                    <i class="fa fa-caret-down fa-sm ${addNewBox}${counter}" aria-hidden="true"  style="margin-top: -10%;"  data-target='#responsesBody${addNewBox}' onclick='responsesCollapse(this)'></i>
                </div>
                <div id='responses${addNewBox}${counter}'class='responses${addNewBox}${counter}' style="background: #FFFFFF; margin-top: -5%;">
                    <div id="responsesBody${addNewBox}${totalBoxes}" style="padding-top:1%;"></div>
                    <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%;"  >
                        <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${totalBoxes}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='btnGroupVerticalDrop4' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='dropdownBtn(this)'>
                            <i class="fa fa-plus"></i>
                            <div class="dropdown-menu drop${addNewBox}${totalBoxes} " aria-labelledby="btnGroupVerticalDrop2">
                            <a class='dropdown-item ${addNewBox}${totalBoxes} ${number}' onclick='textFunction(this)'>
                                <i class="fa fa-fw fa-envelope-o mr-5"></i>Text
                            </a>
                            <div class="dropdown-divider"></div>
                                <a class="dropdown-item ${addNewBox}${totalBoxes} ${number}" onclick='imageFunction(this)'>
                                    <i class="fa fa-file-image-o mr-5" aria-hidden="true"></i> Picture
                                </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item ${addNewBox}${totalBoxes} ${number}" onclick='delayFunction(this)'>
                                <i class="fa fa-fw fa-clock-o fa-lg" aria-hidden="true"></i> Delay
                            </a>                                                         
                        </div>      
                    </div>
                </div>
            </div> 
        </div>
        </div>
        <!--User says -->
        <div class="hypermodel-body" id='userInputModal'>
        <div id='ChildCounter${addNewBox}${counter}' data-text='0'></div>
            <div  id="block"style="margin-left:-10px;margin-right:-10px;margin-top:-5px;">
                <div class="block-header" style="padding-top:5%;padding-bottom:0%; background:#bbdcf7;">
                    <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;;"><b>User Inputs</b></p>
                    <i class="fa fa-caret-down fa-sm ${counter}" aria-hidden="true"  style="margin-top: -10%;"  data-target="#userInput" onclick='colapseUserInputs(this)'></i>
                </div>
                <div id='userInput${counter}' style="background: #FFFFFF; margin-top: -5%;">
                    <div id="userInputBody${addNewBox}${counter}" style="padding-top:1%;"></div>
                    <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%; ">
                        <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${counter}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='dropdown' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='userInputDropdownBtn(this)'>
                            <i class="fa fa-plus"></i>
                            <div class="dropdown-menu dropdown${addNewBox}${counter}" aria-labelledby="btnGroupVerticalDrop2">
                                <a id='fallDropdown${totalBoxes}' data-text=${totalBoxes}  class="dropdown-item ${number} ${addNewBox}${counter} ${totalBoxes} ${a} btn" data-text(${counter})  onclick='addFallback(this)'>
                                    FallBack
                                </a>
                                <div class="dropdown-divider" id='generalCounter'></div>
                                <a id='genDropdown${totalBoxes}' class="dropdown-item ${number} ${addNewBox}${counter} ${a}" onclick='addGenral(this)'>
                                    General
                                </a>
                                <div id='createdFallback'></div>                                                
                            </div>      
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    </div>
    `)
    var pare=`Remove${a}`;
    var chil=`a${a}`
     createLine(pare,chil)
    $('#tgen').data('text',($('#fallCount').data('text')+addNewBox));
   
}
////////////////////////////////////////////////////////////
//                  FUNCTION CREATES NEW GENRAL ROW       //
////////////////////////////////////////////////////////////
function createNewGenralRow(parent,childCounter){
    addNewBox++;
    var a=parent+''+childCounter;
    $('#AppendDiv').append(`
    <div id='child${addNewBox}${totalBoxes}' data-text='1'></div>
    <div id='isFallback${addNewBox}${totalBoxes}' data-text='false'></div>
    <div id='id${addNewBox}${totalBoxes}'></div>
    <div id='parent${addNewBox}${totalBoxes}'></div>
    <div id='${a}' data-text='${addNewBox}${totalBoxes}'></div>
    <div class="hypermodel-column" id='colum${addNewBox}' >
        <div  class="hypermodel-grid ${a} child generalDiv${addNewBox}${totalBoxes}" >
            <div class="hypermodel-header" style="background:#3f9ce8;" id='a${a}'>
                <h3 style="margin-left:-5%;color:white;" id='title${addNewBox}${totalBoxes}'>Property</h3>
            </div>
        <div class="hypermodel-body" id='mainModel${addNewBox}'>
            <!-- User Says -->
            <div  id="block"style="margin-left:-10px;margin-right:-10px;margin-top:-5px;">
                <div class="block-header" style="padding-top:5%;padding-bottom:0%; background:#bbdcf7;">
                    <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;"><b>User Says</b></p>
                    <i class="fa fa-caret-down fa-sm ${addNewBox}${counter}" aria-hidden="true"  style="margin-top: -10%;"  data-target="#dynamicUserSays" onclick='userSaysCollapse(this)'></i>
                </div>
            <div id='collapse${addNewBox}${counter}' style="background:white;margin-top: -5%;margin-bottom: -5%;">
                <div id='UserSaysBody${addNewBox}${totalBoxes}'>
                    <div class="col-md-12 " id='TraningPhasediv${counter}'  style="padding-top: 3%;">
                        <div class="hypermodel-item">
                            <div class="TraningPhaseSpan ${addNewBox}${totalBoxes} ${addNewBox}" id='TraningPhasediv${addNewBox}${totalBoxes}1' style="float:left; width:80%;" onclick="onClick(this)">
                                <span style="font-size: 90%;" id='TraningPhasediv${addNewBox}${totalBoxes}1Span' data-text='Add text here'>Add text here</span>
                            </div>
                        </div>
                    </div>   
                </div>
                <div id="model-n1000" style="margin-top: 3%; margin-bottom: 3%; padding-bottom: 3%;">
                    <div class="col-md-12">
                        <div class="hypermodel-item">
                            <div class="row ${addNewBox}${totalBoxes} ${addNewBox}" style="padding-bottom: 5%;" id='plus' onclick='addnewTraningPhaseCard(this)' >
                                <button type="button" class="btn btn-xs btn-alt-default"  style="margin-left:40%;color: #3f9ce8;">
                                    <span class="fa fa-plus"></span>
                                </button>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <!-- Responses Part -->
        <div class="hypermodel-body">
        <div id='responsesChilds${addNewBox}${totalBoxes}' data-text='0'></div>
            <div  id='block${addNewBox}' style="margin-left:-10px;margin-right:-10px;margin-top:-5px;">
                <div class="block-header" style="padding-top:5%;padding-bottom:0%;background:#bbdcf7;">
                    <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;;"><b>Responses</b></p>
                    <i class="fa fa-caret-down fa-sm ${addNewBox}${counter}" aria-hidden="true"  style="margin-top: -10%;"  data-target='#responsesBody${addNewBox}' onclick='responsesCollapse(this)'></i>
                </div>
                <div id='responses${addNewBox}${counter}'class='responses${addNewBox}${counter}' style="background: #FFFFFF; margin-top: -5%;">
                    <div id="responsesBody${addNewBox}${totalBoxes}" style="padding-top:1%;"></div>
                    <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%;"  >
                        <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${totalBoxes}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='btnGroupVerticalDrop4' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='dropdownBtn(this)'>
                            <i class="fa fa-plus"></i>
                            <div class="dropdown-menu drop${addNewBox}${totalBoxes} " aria-labelledby="btnGroupVerticalDrop2">
                            <a class='dropdown-item ${addNewBox}${totalBoxes} ${addNewBox}' onclick='textFunction(this)'>
                                <i class="fa fa-fw fa-envelope-o mr-5"></i>Text
                            </a>
                            <div class="dropdown-divider"></div>
                                <a class="dropdown-item ${addNewBox}${totalBoxes} ${addNewBox}" onclick='imageFunction(this)'>
                                    <i class="fa fa-file-image-o mr-5" aria-hidden="true"></i> Picture
                                </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item ${addNewBox}${totalBoxes} ${addNewBox}" onclick='delayFunction(this)'>
                                <i class="fa fa-fw fa-clock-o fa-lg" aria-hidden="true"></i> Delay
                            </a>                                                         
                        </div>      
                    </div>
                </div>
            </div> 
        </div>
        </div>
        <!--User says -->
        <div class="hypermodel-body" id='userInputModal'>
        <div id='ChildCounter${addNewBox}${counter}' data-text='0'></div>
        <div id='userInputChilds${addNewBox}${totalBoxes}' data-text='0'></div>
            <div  id="block"style="margin-left:-10px;margin-right:-10px;margin-top:-5px;">
                <div class="block-header" style="padding-top:5%;padding-bottom:0%; background:#bbdcf7;">
                    <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;;"><b>User Inputs</b></p>
                    <i class="fa fa-caret-down fa-sm ${counter}" aria-hidden="true"  style="margin-top: -10%;"  data-target="#userInput" onclick='colapseUserInputs(this)'></i>
                </div>
                <div id='userInput${counter}' style="background: #FFFFFF; margin-top: -5%;">
                    <div id="userInputBody${addNewBox}${counter}" style="padding-top:1%;"></div>
                    <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%; ">
                        <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${counter}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='dropdown' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='userInputDropdownBtn(this)'>
                            <i class="fa fa-plus"></i>
                            <div class="dropdown-menu dropdown${addNewBox}${counter}" aria-labelledby="btnGroupVerticalDrop2">
                                <a id='fallDropdown${totalBoxes}' data-text=${totalBoxes}  class="dropdown-item ${addNewBox} ${addNewBox}${counter} ${totalBoxes} ${a} btn" data-text(${counter})  onclick='addFallback(this)'>
                                    FallBack
                                </a>
                                <div class="dropdown-divider" id='generalCounter'></div>
                                <a id='genDropdown${totalBoxes}' class="dropdown-item ${addNewBox} ${addNewBox}${counter} ${a}" onclick='addGenral(this)'>
                                    General
                                </a>                                                 
                            </div>      
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    </div>

    `)
    var pare=`Remove${a}`;
    var chil=`a${a}`
     createLine(pare,chil)
}
/////////////////////////////////////////////////////////////
//                     CREATE NEW GENRAL BOX              //
///////////////////////////////////////////////////////////
function createNewGenralBox(number,parent,childCounter){
    var b=$('#gCount').data('text');
    var a=parent+''+childCounter;
    $('#colum'+number).append(`
    <div id='child${addNewBox}${totalBoxes}' data-text='1'></div>
    <div id='isFallback${addNewBox}${totalBoxes}' data-text='false'></div>
    <div id='id${addNewBox}${totalBoxes}' data-text=${a}></div>
    <div id='parent${addNewBox}${totalBoxes}' data-text=${b}></div>
    <div id='${a}' data-text='${addNewBox}${totalBoxes}'></div>
    <div class="hypermodel-grid ${a}" >
    <div class="hypermodel-header" style="background:#3f9ce8;" id='a${a}'>
        <h3 style="margin-left:-5%;color:white;" id='title${addNewBox}${totalBoxes}'>Property</h3>
    </div>
<div class="hypermodel-body" id='mainModel${addNewBox}'>
    <!-- User Says -->
    <div  id="block"style="margin-left:-10px;margin-right:-10px;margin-top:-5px;">
        <div class="block-header" style="padding-top:5%;padding-bottom:0%; background:#bbdcf7;">
            <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;"><b>User Says</b></p>
            <i class="fa fa-caret-down fa-sm ${addNewBox}${counter}" aria-hidden="true"  style="margin-top: -10%;"  data-target="#dynamicUserSays" id='dynamicColapse' onclick='userSaysCollapse(this)'></i>
        </div>
    <div id='collapse${addNewBox}${counter}' style="background:white;margin-top: -5%;margin-bottom: -5%;">
        <div id='UserSaysBody${addNewBox}${totalBoxes}'>
            <div class="col-md-12 " id='TraningPhasediv${counter}'  style="padding-top: 3%;">
                <div class="hypermodel-item">
                    <div class="TraningPhaseSpan ${addNewBox}${totalBoxes} ${number}" id='TraningPhasediv${addNewBox}${totalBoxes}1' style="float:left; width:80%;" onclick="onClick(this)">
                        <span style="font-size: 90%;" id='TraningPhasediv${addNewBox}${totalBoxes}1Span' data-text='Add text here'>Add text here</span>
                    </div>
                </div>
            </div>   
        </div>
        <div id="model-n1000" style="margin-top: 3%; margin-bottom: 3%; padding-bottom: 3%;">
            <div class="col-md-12">
                <div class="hypermodel-item" >
                    <div class="row ${addNewBox}${totalBoxes} ${number}" style="padding-bottom: 5%;" id='plus' onclick='addnewTraningPhaseCard(this)' >
                        <button type="button" class="btn btn-xs btn-alt-default"  style="margin-left:40%;color: #3f9ce8;">
                            <span class="fa fa-plus"></span>
                        </button>
                    </div> 
                </div>
            </div>
        </div>
    </div>
</div>
</div>
<!-- Responses Part -->
<div class="hypermodel-body">
    <div id='responsesChilds${addNewBox}${totalBoxes}' data-text='0'></div>
    <div  id='block${addNewBox}' style="margin-left:-10px;margin-right:-10px;margin-top:-5px;">
        <div class="block-header" style="padding-top:5%;padding-bottom:0%; background:#bbdcf7;">
            <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;;"><b>Responses</b></p>
            <i class="fa fa-caret-down fa-sm ${addNewBox}${counter}" aria-hidden="true"  style="margin-top: -10%;"  data-target='#responsesBody${addNewBox}' onclick='responsesCollapse(this)'></i>
        </div>
        <div id='responses${addNewBox}'class='responses${addNewBox}${counter}'style="background: #FFFFFF; margin-top: -5%;">
            <div id="responsesBody${addNewBox}${totalBoxes}" style="padding-top:1%;"></div>
            <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%;"  >
                <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${totalBoxes}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='btnGroupVerticalDrop4' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='dropdownBtn(this)'>
                    <i class="fa fa-plus"></i>
                    <div class="dropdown-menu drop${addNewBox}${totalBoxes} " aria-labelledby="btnGroupVerticalDrop2">
                    <a class='dropdown-item ${addNewBox}${totalBoxes} ${number}' onclick='textFunction(this)'>
                        <i class="fa fa-fw fa-envelope-o mr-5"></i>Text
                    </a>
                    <div class="dropdown-divider"></div>
                        <a class="dropdown-item ${addNewBox}${totalBoxes} ${number}" onclick='imageFunction(this)'>
                            <i class="fa fa-file-image-o mr-5" aria-hidden="true"></i> Picture
                        </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item ${addNewBox}${totalBoxes} ${number}" onclick='delayFunction(this)'>
                        <i class="fa fa-fw fa-clock-o fa-lg" aria-hidden="true"></i> Delay
                    </a>                                                         
                </div>      
            </div>
        </div>
    </div> 
</div>
</div>
<!--User says -->
<div class="hypermodel-body" id='userInputModal'>
<div id='ChildCounter${addNewBox}${totalBoxes}' data-text='0'></div>
<div  id="block"style="margin-left:-10px;margin-right:-10px;margin-top:-5px;">
    <div class="block-header" style="padding-top:5%;padding-bottom:0%; background:#bbdcf7;">
        <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;;"><b>User Inputs</b></p>
        <i class="fa fa-caret-down fa-sm ${counter}" aria-hidden="true"  style="margin-top: -10%;"  data-target="#userInput" onclick='colapseUserInputs(this)'></i>
    </div>
    <div id='userInput${counter}' style="background: #FFFFFF; margin-top: -5%;">
        <div id="userInputBody${addNewBox}${totalBoxes}" style="padding-top:1%;"></div>
        <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%; ">
            <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${totalBoxes}" id='dropdown' style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='btn${addNewBox}' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='userInputDropdownBtn(this)'>
                    <i class="fa fa-plus"></i>
                <div class="dropdown-menu dropdown${addNewBox}${totalBoxes}" aria-labelledby="btnGroupVerticalDrop2" >
                    <a id='fallDropdown${totalBoxes}' data-text=${totalBoxes}  class="dropdown-item ${number} ${addNewBox}${totalBoxes} ${totalBoxes} ${a} btn"  onclick='addFallback(this)'>
                        FallBack
                    </a>
                    <div class="dropdown-divider"></div>
                    <a id='genDropdown${totalBoxes}' class="dropdown-item ${number} ${addNewBox}${totalBoxes} ${a}" onclick='addGenral(this)'>
                        General
                    </a>
                                                                        
                </div>      
            </div>
        </div>
    </div> 
</div>
</div>

      `)
      var pare=`Remove${a}`;
      var chil=`a${a}`;
      createLine(pare,chil)
}
////////////////////////////////////////////////////////////
//         FUNCTION REFRESH DOM                          //
//////////////////////////////////////////////////////////

function Refresh(){
    $('.hypermodel-container').hypermodel({
        time: {
            animate: 300,    // The line animation time when either window resize event be fired or user playing with drag&drop.
            frame: 3000      // The dash line's dash moving total seconds.
        },
        grad: 1,             // The gradient of line 0.1(curve), 10(straight).
        strokeSpeed: 500,    // How many dash line moves one second.
        strokeColor: 'rgba(192, 192, 192, .5)',     // Default line color (rgba, rgb, hash color).
        strokeDashColor: 'rgba(60, 180, 148, .65)', // Dash line color (rgba, rgb, hash color).
        strokeWidth: 1,      // Default line thickness (px).
        strokeDashWidth: 1,  // Dash line thickness (px).
        strokeDashWeight: 8, // Each of dash dottes's length (px).
        strokeDashMargin: 6  // Gap about each of dash line's dottes (px).
    });
    jsPlumb.repaintEverything();
}

function dropdownBtn(e){
    $('.drop'+e.classList[5]).collapse('toggle')
    Refresh();
}
function userInputDropdownBtn(e){
    $('.dropdown'+e.classList[5]).collapse('toggle')
    Refresh();
}
function userSaysCollapse(e){
    $('#collapse'+e.classList[3]).collapse('toggle')
    Refresh();

}
function responsesCollapse(e){
    $('.responses'+e.classList[3]).collapse('toggle')
    Refresh();

}
function colapseUserInputs(e){
    $('#userInput'+e.classList[3]).collapse('toggle')
    Refresh();
}
function fallBackToggle(e){
    $('#fallUserInputDropdown'+e.classList[4]).collapse('toggle');
}
function appendGeneral(genCounter, addnewBox,totalboxes,count,newCounter,btnclass,childCounter,parent){
    var gen=0;
    if(genCounter==0){
        //in this case childcounter is parent actually
        //in this case btnClass is child counter Actually
        gen=childCounter+''+btnclass;
    }
    
    else{
       //parent is the parent class
       //child counter is the appended child number
       gen=parent+''+childCounter;
    }
   if(addNewBox != btnclass){
    $('#userInputBody'+genCounter).append(`
    <div class="col-md-12 ${addnewBox}"  style="margin-top:3%;" id='div${count}' >
        <div class="hypermodel-item ui-sortable-handle" data-target='${totalboxes}'>
            <div style="float:left; width:80%;" id="generalDiv${addnewBox}${totalboxes}" class='${addnewBox}${totalboxes} parent' onclick="updateGeneralName(this)" data-text="Sample text">
                <span id='generalDiv${addnewBox}${totalboxes}Span' style="font-size: 90%; " > </span>
            </div>
            <div class="buttonClass btn ${count} btnbtn ${gen} ${addNewBox} genral" id='Remove${gen}' style="width:5%;color:#CD5C5C; float: right;" onclick="RemoveFallback(this)">
                <i class="fa fa-times fa-xs" aria-hidden="true"></i>
            </div>
        </div>
     </div>
     <div id='parentSpanId${genCounter}'></div>
     <div id='gCount${genCounter}'></div>
     <div id='gCount${btnclass}${newCounter}'></div>
    `
    )
    Refresh();  
   }
   else{
       var newBox=parseInt(addnewBox+1)
        $('#userInputBody'+genCounter).append(`
        <div class="col-md-12 ${addnewBox}"  style="margin-top:3%;" id='div${count}' >
            <div class="hypermodel-item ui-sortable-handle" data-target='${totalboxes}'>
                <div style="float:left; width:80%;" id="generalDiv${newBox}${totalboxes}" class='${newBox}${totalboxes} parent' onclick="updateGeneralName(this)" data-text="Sample text">
                    <span id='generalDiv${newBox}${totalboxes}Span' style="font-size: 90%; " > </span>
                </div>
                <div class="buttonClass btn ${count} btnbtn ${gen} ${newBox} genral" id="Remove${gen}" style="width:5%;color:#CD5C5C; float: right;" onclick="RemoveFallback(this)">
                    <i class="fa fa-times fa-xs" aria-hidden="true"></i>
                </div>
            </div>
        </div>
        <div id='parentSpanId${addNewBox}${newCounter}'></div>
        <div id='gCount${genCounter}'></div>
        <div id='gCount${btnclass}${newCounter}'></div>
        `
        )
   }
   $(`parentSpanId${addNewBox}${newCounter}`).data('text',gen);
   $(`#gCount${genCounter}`).data('text',gen);
   $(`#gCount${btnclass}${newCounter}`).data('text',totalBoxes)

}
function appendFallback(fallCounter, addnewBox,totalboxes,count,parent,childCounter){
    var c=parent+''+childCounter;
    $('#userInputBody'+fallCounter).append(`
    <div class="col-md-12 ${addnewBox}"  style="margin-top:3%;" id='div${count}' >
        <div class="hypermodel-item ui-sortable-handle" data-target='${totalboxes}'>
            <div style="float:left; width:80%;" id="fallbackDiv${count}" class='${addnewBox+1}${totalBoxes}' onclick="updateFallbackName(this)" data-text="Sample text">
                <span id='fallbackDiv${count}Span' style="font-size: 90%; " > </span>
            </div>
            <div class="buttonClass btn ${count} ${addnewBox} ${c} fallback" id='Remove${c}' style="width:5%;color:#CD5C5C; float: right;" onclick="RemoveFallback(this)">
                <i class="fa fa-times fa-xs" aria-hidden="true"></i>
            </div>
        </div>
     </div>
     <div id='fallCount'></div>
    `
    )
    $('#fallCount').data('text',c);
}
function RemoveFallback(e){
    //getting all hypermodal appended classes
    var classarray = $('.hypermodel-grid')
    .map(function() { return this.classList[1];  })
    .get(); //ToArray
    //checking on which class user click 
    //classes start with this class
    var removeClasses=classarray.filter(num=>num.startsWith(e.classList[4]));
    //getting parent id 
     var parentId=e.parentNode.parentNode.parentNode.id;
    //removing elements
    var id=(e.parentNode.children[0].id);
    var secoundId=($(`#${id}Span`).parent().parent().parent().parent().parent().children()[1].children.dropdown.children[1].children[0].id)
    $(`#${secoundId}`).removeClass('disabled');
    var oldDeleteCount=localStorage.getItem('DeleteChilds');
    var newDeleteCount=parseInt(oldDeleteCount)+removeClasses.length;
    localStorage.setItem('DeleteChilds',newDeleteCount);
    for(var i=0; i<removeClasses.length; i++){
        deleteJson(removeClasses[i]);
        jsPlumb.remove(`Remove${removeClasses[i]}`);
        $('.'+removeClasses[i]).remove();
        //getting disable button id
    }
    $('#'+"div"+e.classList[2]).remove();
    Refresh();
    // jsPlumb.repaintEverything();
}
//prepare json
function prepareOneBoxJSON(boxno,row){
    //sending row no
    var totalChilds=$(`#colum${row}`).children()
    var boxNo = []
    for (const i of totalChilds) {
        if(i.classList.length !== 0){
            boxNo.push(i.classList)
        }
    }
    var counts=0;
    var responses=0;
    var id='';
    var parent='';
    var isFallback='';
    var trainingPhrase=[];
    var response=[];
    var name='';
    var obj={}
    var responsesObject=[];
    var payload=[];
    //total appended child counts
    var counts=$(`#child${boxno}`).data('text');
    //getting responses childs
    responses=($(`#responsesChilds${boxno}`).data('text'));
    //getting box id
    id=$(`#id${boxno}`).data('text');
    //getting box parent
    parent=$(`#parent${boxno}`).data('text');
    //getting is fallback
    isFallback=$(`#isFallback${boxno}`).data('text');
    //getting box title
    name=$(`#title${boxno}`).data('text');
    //traning phases data
    for(var traningPhase=0; traningPhase<=counts;traningPhase++){
        //checking if given traning phase id exists
         if($(`#TraningPhasediv${boxno}${traningPhase}Span`).length){
             //pushing traning phrases into the traningPhrase array
            trainingPhrase.push($(`#TraningPhasediv${boxno}${traningPhase}Span`).data('text'));
         }
    }
    //responses 
    for(var res=0; res<=responses; res++){
        //creating new response Object
        responsesObject[res]=new Object();
        //creating new pay load object
        payload[res]=new Object();
        //checking if response div id exists
        if($(`#ResponseDiv${boxno}${res}Span`).length){
            //setting response data type text
            responsesObject[res].type='text'
            //responses data pushing
            responsesObject[res].payload=$(`#ResponseDiv${boxno}${res}Span`).data('text');
            //pushing data into the response array
            response.push(responsesObject[res])
        }
        //cehcking if given id exists or not 
        if($(`#imagediv${boxno}${res}Span`).length){
            //setting the pay load type
            responsesObject[res].type='image'
            //getting the image source
            responsesObject[res].payload=$(`#imagediv${boxno}${res}Span`).data('text');
            //pushing data into the response array
            response.push(responsesObject[res])
        }
        //checking delay div
        if($(`#delayDiv${boxno}${res}Span`).length){
            //setting delay type
            responsesObject[res].type='delay'
            //getting text of delay
            var string=$(`#delayDiv${boxno}${res}Span`).data('text');
            //splitting text on the base of space ...
            var splitText = string.split(" ");
            //getting unit
            var unit=splitText[1];
            //getting duration
            var duration=splitText[0];
            payload[res].duration=duration;
            payload[res].unit=unit[0];
            responsesObject[res].payload=payload[res];
            response.push(responsesObject[res]);
        }
    }
    parent=parent.toString();
    obj.trainingPhrases=trainingPhrase;
    obj.responses=response;
    obj.id=id
    obj.parent=parent;
    obj.isFallback=isFallback;
    obj.name=name;
    obj.boxNo=boxno;
    obj.row=row;
    //finding the array index
    var foundIndex = JsonArray.findIndex(x => obj.id == x.id);
    //if no index found push the object at new index
    if(foundIndex == -1){
        JsonArray.push(obj)
    }
    //if object found than pushing object at the index
    else{
        JsonArray[foundIndex]=obj;
    }
    if(json == '0'){
        createFirstCampaign();
    }
    else{
        createCampaign1();
    }
   
}
function deleteJson(id){
    //finding the object index
    var foundIndex = JsonArray.findIndex(x => id == x.id);
    //if index found
    if(foundIndex != -1){
        //deleting the object
        JsonArray.splice(foundIndex,1);
    }
    createCampaign1();
}
var myId;
function createFirstCampaign(){
    json++;
    let campaignName = $('#campaign-name').val();
    let description = $("#description").val();
    let startDate1 = $("#start-date").val();
    let endDate1 = $("#end-date").val();

    let startDate = moment(moment(startDate1, 'DD-MM-YYYY')).format('YYYY-MM-DD');
    let endDate = moment(moment(endDate1, 'DD-MM-YYYY')).format('YYYY-MM-DD');
    let status = $('#status').find(":selected").text();   
    let platform = $('#platform').find(":selected").text();    
    let compaignNumber = $('#number').find(":selected").val();
    let body = {
        name : campaignName,
        description : description,
        startDate : startDate,
        endDate : endDate,
        status : status,
        platform:platform,
        company:companyID,
        twilioNumber : compaignNumber,
        flowJSON : JsonArray
    }
    $.ajax({
        url: destination+'/campaigns',
        type:"POST",
        headers: {"Authorization": "Bearer "+localStorage.getItem("token")},
        data: JSON.stringify(body),
        dataType: 'json',
        contentType: "application/json",
        success : function(response){
            myId=response.campaign._id;
            // window.location.replace('../list/');
            $('#display').removeClass('hide');
            $('#spinner').addClass('hide');
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
        }
        
    });
}
function createCampaign1(){
    let body = {
        flowJSON : JsonArray
    }
    $.ajax({
        url: destination+'/campaigns/'+myId+'/update',
        type:"PATCH",
        headers: {"Authorization": "Bearer "+localStorage.getItem("token")},
        data: JSON.stringify(body),
        dataType: 'json',
        contentType: "application/json",
        success : function(response){
            console.log(response);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
        }
        
    });
}
function Finish(){
    let body = {
        flowJSON : JsonArray
    }
    console.log('front End Url :'+frontEndUrl);
    $.ajax({
        url: destination+'/campaigns/'+myId,
        type:"PATCH",
        headers: {"Authorization": "Bearer "+localStorage.getItem("token")},
        data: JSON.stringify(body),
        dataType: 'json',
        contentType: "application/json",
        success : function(response){
            console.log(response);
            window.location.replace(frontEndUrl+"/campaign/list/");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
        }
        
    });
    

}
var zoom=0;
function zoomInFunction(){
    if(zoom <0){
        zoom++;
        $('.hypermodel-column').width(
            $(".hypermodel-column").width() / 0.8
        )
        Refresh();
    }
}
function  zoomOutFunction() {
    if(zoom > -2){
        zoom--;
        $('.hypermodel-column').width(
            $(".hypermodel-column").width() * 0.8
        )
        Refresh();
    }

}
function wordCounter(){
    var length=$('#addTextArea').val().length;
    var newLength=parseInt(length)+1;
    var total=160;
    $('#length').text(`SMS (${newLength} / ${Math.ceil(newLength/total)})`);
}

function updateWordCounter(){
    var length=$('#updateTextArea').val().length;
    var newLength=parseInt(length)+1;
    var total=160;
    $('#updateLength').text(`SMS (${newLength} / ${Math.ceil(newLength/total)})`);
}
   function createLine(parent,child){
       if($(`#${parent}`).length && $(`#${child}`).length){
            var container = $("#AppendDiv");
            jsPlumb.setContainer(container);
            var e1 = jsPlumb.addEndpoint(child, {
                connectionType:"basic",
                width:5,
                isSource:true,
                anchor: "LeftMiddle",
                endpoint:[ "Dot", { radius:2}],
                connector: ["Bezier", { curviness: 90 }]
                }); 
                
                var e2 = jsPlumb.addEndpoint(parent, {
                isTarget:true,
                anchor:"Right",
                endpoint:[ "Dot", { radius:2 }],
                connector: ["Bezier", { curviness: 90 }]
                });

            jsPlumb.connect({ source:e1, target:e2 });
            jsPlumb.setDraggable([e1,e2]);
       }
       else{
           console.log('ID not found')
       }
  
}
