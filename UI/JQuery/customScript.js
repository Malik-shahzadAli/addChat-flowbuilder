$(document).ready(function() {;
    prepareOneBoxJSON('00')
});
// counter
var counter=0;
var addNewBox=0;
var addFallBack=0;
var totalBoxes=0;
var Gcount=0;
var JsonObject=new Object();
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
    $('#dynamicUserSays').collapse('toggle')
    Refresh();
})
// collapse Responses Button
$('#colapseResponses').click(function(){
    $('#responses').collapse('toggle')
    Refresh();
})
// collapse User Input Button
$('#colapseUserInputs').click(function(){
    $('#userInput').collapse('toggle')
  
})
function addnewTraningPhaseCard(e){
    counter++;
    var boxOldCounter=$(`#child${e.classList[1]}`).data('text');
    // console.log("This is the Class :"+e.classList[1])
    var boxNewCounter=parseInt(boxOldCounter+1);
    $(`#child${e.classList[1]}`).data('text',boxNewCounter);
    $(`#UserSaysBody${e.classList[1]}`).append(`
    <div class="col-md-12 ${counter}"  style="margin-top:3%;" id='div${counter}'>
       <div class="hypermodel-item ui-sortable-handle">
           <div style="float:left; width:80%;" class='TraningPhaseSpan ${e.classList[1]}' id="TraningPhasediv${e.classList[1]}${boxNewCounter}" onclick="onClick(this)" data-text="Sample text">
               <span id='TraningPhasediv${e.classList[1]}${boxNewCounter}Span' style="font-size: 90%;" data-text='Add text here' >Add text here</span>
           </div>
           <div class="buttonClass btn ${counter}" style="width:5%;color:#CD5C5C;float: right;" onclick="Remove(this)">
               <i class="fa fa-times fa-xs" aria-hidden="true"></i>
           </div>
       </div>
    </div>
    `
    );
// console.log('add Traning Phrases :'+ e.classList[1]);
prepareOneBoxJSON(e.classList[1]);
}
// traning phase on click
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
}
// Adding text on Traning Phase Span
$('#addTraning').click(function(){
    var boxNo=$('#modal-trainingPhase').data('text');
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
    prepareOneBoxJSON(boxNo);
})
// Remove Code
function Remove(e) {
    $('#'+"div"+e.classList[2]).remove();
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

    $(".dropdown").dropdown('toggle');
}
function imageFunction(e){
    //if user select the image from dropdown
    $('#img').val('')
    //toggle image modal
    jQuery('#modal-slideright').modal('toggle');
    //output div load selected Image
    //first of all empty old loaded image from output div
    $('#output').attr('src','')
    $('#modal-slideright').data('text',e.classList[1])
    $(".dropdown").dropdown('toggle');

}
function delayFunction(e){
    //toggle the delay dropdown
    jQuery('#modal-delay').modal('toggle');
    //input delay empty
    $('#delayInput').val('')
    //selecting the default value secounds from dropdown
    $('#unit').val('Seconds')
    $('#modal-delay').data('text',e.classList[1])
    $(".dropdown").dropdown('toggle');

}
// adding text on the  responses span
$('#addText').click(function(){
  counter++;
  //getting row number
  var rowNo=$('#modal-text').data('text');
  var oldCounter;
  var newCounter;
  console.log('this is the clicked id :'+rowNo);
  // checking if user input something in the text area
  if($('#addTextArea').val() !== ''){
     oldCounter=$(`#responsesChilds${rowNo}`).data('text');
     newCounter=parseInt(oldCounter+1);
    $(`#responsesChilds${rowNo}`).data('text',newCounter);
    console.log(`This is a Child new counter :`+newCounter);
    //appending responses body with new card
    $('#responsesBody'+rowNo).append(`
    <div class="col-md-12 ${counter}"  style="margin-top:3%;" id='div${counter}'>
        <div class="hypermodel-item ui-sortable-handle">
            <div style="float:left; width:70%;" class='${rowNo}' id="ResponseDiv${rowNo}${newCounter}" onclick="ResponseModal(this)" data-text="Sample text">
                <span id='ResponseDiv${rowNo}${newCounter}Span' style="font-size: 90%;" ></span>
            </div>
            <div class="buttonClass btn ${counter}" style="width:5%;color:#CD5C5C;  float: right;" onclick="Remove(this)">
                <i class="fa fa-times fa-xs" aria-hidden="true"></i>
            </div>
        </div>
     </div>
    `
    )
    //adding text on the responses card
    $(`#ResponseDiv${rowNo}${newCounter}Span`).data('text',$('#addTextArea').val())
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
prepareOneBoxJSON(rowNo)
})
//when user click on the add image button 
//from jquery modal
$('#addImage').click(function(e){
  counter++;
  var rowNo=$('#modal-slideright').data('text');
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
    console.log(`This is a Child new counter :`+newCounter);
    //appending the response body with the image card
    $('#responsesBody'+rowNo).append(`
    <div class="col-md-12 ${counter}"  style="margin-top:3%;" id='div${counter}'>
        <div class="hypermodel-item ui-sortable-handle">
            <div style="float:left; width:70%;" class='${rowNo}' id="imagediv${rowNo}${newCounter}" onclick="updateImage(this)" data-text="Sample text">
                <span id='imagediv${rowNo}${newCounter}Span' data-text(${source})>  <img src=${source} width='25'  class="rounded" id='imagediv${counter}SpanImage'></span>
            </div>
            <div class="buttonClass btn ${counter}" style="width:5%; color:#CD5C5C; float: right;" onclick="Remove(this)">
                <i class="fa fa-times fa-xs" aria-hidden="true"></i>
            </div>
        </div>
     </div>
    `
    )
    // source='';
    $(`#imagediv${rowNo}${newCounter}Span`).data('text',source)
    // console.log('In function :'+ $(`#imagediv${rowNo}${newCounter}Span`).data('text'));

  }
  prepareOneBoxJSON(rowNo)
})
//when user click on add delay jquery modal button
//add time Delay on the span
$('#addDelay').click(function(){
counter++;
var rowNo=$('#modal-delay').data('text');
var oldCounter;
var newCounter;
// checking if user input some time
  if($('#delayInput').val() !='')
  {
    oldCounter=$(`#responsesChilds${rowNo}`).data('text');
    newCounter=parseInt(oldCounter+1);
    $(`#responsesChilds${rowNo}`).data('text',newCounter);
    console.log(`This is a Child new counter :`+newCounter);
    //appending the responses body with delay card
    $('#responsesBody'+rowNo).append(`
    <div class="col-md-12 ${counter}"  style="margin-top:3%;" id='div${counter}'>
        <div class="hypermodel-item ui-sortable-handle">
            <div style="float:left; width:10%;">
                <i class="fa fa-fw fa-clock-o fa-lg" aria-hidden="true"></i>
            </div>
            <div style="float:left; width:70%;" class='${rowNo}' id="delayDiv${rowNo}${newCounter}" onclick="updateDelayModel(this)" data-text="Sample text">
                <span id='delayDiv${rowNo}${newCounter}Span' style="font-size: 90%; padding-left:25%;" > </span>
            </div>
            <div class="buttonClass btn ${counter}" style="width:5%;color:#CD5C5C; float: right;" onclick="Remove(this)">
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
    // console.log("IN FUNCTIOn"+ $(`#delayDiv${rowNo}${newCounter}Span`).data('text'))
  }
  prepareOneBoxJSON(rowNo)
})  

                                                    ///////////////////
                                                   //  UPDATE TEXT  //
                                                  ///////////////////

//adding text on modal when user click on the card of text response
function ResponseModal(e) {
    // console.log(e);
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
}
//when user click on the update Text button from jquery modal
$('#updateText').click(function(e){
    var rowNo=$('#modal-update').data('text');
    //getting card id on which user click
    var spanId= $("#updateRes").data('text');
    // console.log(e)
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
    prepareOneBoxJSON(rowNo)
})
                                                    /////////////////
                                                   // UPDATE DELAY//
                                                  /////////////////

//when user click on the card of delay
function updateDelayModel(e){
    // console.log(e);
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
    $('#modal-updateDelay').data('text',e.classList[0])
}
//when user click on the update delay button from jquery modal
$('#updateDelay').click(function(e){
    var rowNo=$('#modal-updateDelay').data('text');
    //getting the card id on which user click
    var spanId= $("#delayDiv").data('text');
    //getting the user input and user selected unit
    $('#'+spanId).data('text',($('#updateDelayInput').val()+" "+$('#updateUnit').val()))
    //setting updated text on the span data text
    var updateText=$('#'+spanId).data('text');
    //setting the value on the span card
    $('#'+spanId).text(updateText)
    prepareOneBoxJSON(rowNo)
})
//load image in modal
function loadFile(e) {
    $('#footer').data('text','');
    //getting image source
    var src= URL.createObjectURL(e.target.files[0]);
    //display user selected image
    $('#output').attr('src',src);
    //setting image source in the div footer
    $("#footer").data("text",src);
};
                                                    /////////////////
                                                   // UPDATE IMAGE//
                                                  /////////////////
//when user click on the image card
function updateImage(e){
    //toggle the update image modal
    jQuery('#modal-updateImage').modal('toggle');
    //removing old loaded values from jQuery modal
    $('#updateOutput').attr('src','')
    $('#updateImage').val('')
    var id=e.id+'Span';
    // var src=$('#'+id).text();
    $('#updateImageBlock').data('text',id);
    $('#modal-updateImage').data('text',e.classList[0]);
}
//loading value in Update JQUery modal 
function loadUpdatedImage(e){
    //getting image source
    var src= URL.createObjectURL(e.target.files[0]);
    //showing image in jquery modal
    $('#updateOutput').attr('src',src)
    //setting image source in JQuery modal
    $("#updateImageFooter").data("text",src);
}

//when  user click on the jquery modal
$('#updateImageBtn').click(function(e){
    var rowNo=$('#modal-updateImage').data('text')
    //getting clicked span id
    var id=$('#updateImageBlock').data('text');
    //getting updated image source from the jquery modal
    var source=$('#updateImageFooter').data('text');
    //setting new image
    $('#'+id+'Image').attr('src',source)
    prepareOneBoxJSON(rowNo)
})
/////////////////////////////////////////////////////////////////////////////////////
//                         USER INPUTS                                            //           
///////////////////////////////////////////////////////////////////////////////////
// When user select Fall Back option from dropdown button
function addFirstFallback(e){
    jQuery('#modal-fallBack').modal('toggle');
    $('#fallbackName').val('');
    $('#modal-fallBack').data('text',e.classList[1]);
        //sending 0 fall back
    $('#createdFallback').data('text',0)
    //fallbackParentDivid
    $('#fallbackParentDivid').data('text',e.classList[4])

}
function addFallback(e){
    jQuery('#modal-fallBack').modal('toggle');
    $('#fallbackName').val('');
    $('#modal-fallBack').data('text',e.classList[1]);
    $('#fallbackCounter').data('text',e.classList[2]);
    //checking if 2 classes have same name
    if(e.classList[3] != 'btn'){
        $('#createdFallback').data('text',e.classList[3])
    }
    else{
        //if 2 classes have same name send the first one class
        $('#createdFallback').data('text',e.classList[1])
        if(e.classList[1] != e.classList[3]){
            console.log(e);
            $('#fallbackParentDivid').data('text',e.classList[4])
        }
        else{
            $('#fallbackParentDivid').data('text',e.classList[4])
        }
    }
    // $('#fallbackParentDivid').data('text',e.classList[5])
}
//when user click on add fallback button
$('#addFallback').click(function(){
    // increasing counter
    counter++;
    //getting the row
    var btnClass=$('#modal-fallBack').data('text');
    //getting fall back name
    var fallBackName=$('#fallbackName').val();
    //user clicked fallback 
     var fallbackCounter=$('#fallbackCounter').data('text')
    //checking user enter fall back name or not
    var parent=$('#fallbackParentDivid').data('text');
    if(fallBackName != ''  ){
        // var c=parseInt(addNewBox+1)
       // console.log('FallBack Name Function::'+counter)
        addFallBack++;
        totalBoxes++;
        //checking if first fall back 
        if( fallbackCounter != -1){appendFallback(fallbackCounter, addNewBox,totalBoxes,counter)}
        else{appendFallback(btnClass, addNewBox,totalBoxes,counter)}
        if( btnClass== addNewBox){createNewBoxRow();}
        else{createNewBox(parseInt(btnClass)+1);}
        $(`#title${addNewBox}${totalBoxes}`).text(fallBackName);
        Refresh();
        //getting delay input + selected unit
        var name=$('#fallbackName').val();
        //setting data text time and unit
        $(`#fallbackDiv${counter}Span`).data('text',name)
        //setting time and unit on the span of responses
        $(`#fallbackDiv${counter}Span`).text(name)
        //puting name on the box
        $('.modelTitle').text(name);
        var n=$('#createdFallback').data('text');
        //disable the fall back
        $('#fall'+n).addClass('disabled');
        $(`#fallDropdown${addNewBox}`).addClass(parent+counter);
        $(`#genDropdown${addNewBox}`).addClass(parent+counter);
        $(`#parent${addNewBox}${totalBoxes}`).data('text',parent);
        $(`#id${addNewBox}${totalBoxes}`).data('text',parent+counter)

    }
    prepareOneBoxJSON(addNewBox+""+totalBoxes);
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
    $("#fallback").data('text',id)
    //setting value on the jquery modal text area
    $('#updateFallbackName').val($('#'+id).data('text'))
}
//when user click on the update Text button from jquery modal
$('#updateFallback').click(function(e){
    //getting card id on which user click
    var spanId= $("#fallback").data('text');
    
    $('#'+spanId).data('text',$('#updateFallbackName').val())
    //setting the data text of the card what user update
    var updateText=$('#'+spanId).data('text');
    //Adding Span Text 
    $('#'+spanId).text(updateText)
    $('.modelTitle').text(updateText);

})

/////////////////////////////////
// Creating a new general box //
///////////////////////////////
function addFirstGenral(e){
    jQuery('#modal-general').modal('toggle');
    $('#generalName').val('');
    $('#modal-general').data('text',e.classList[1]);
    $('#generalCounter').data('text',-1)
    $('#parentDivid').data('text',e.classList[3])

}
function addGenral(e){
    jQuery('#modal-general').modal('toggle');
    $('#generalName').val('');
    $('#modal-general').data('text',e.classList[1]);
    $('#generalCounter').data('text',e.classList[2])
    if(e.classList[5]){    
        $('#parentDivid').data('text',e.classList[5])
    }
    else{
        $('#parentDivid').data('text',e.classList[3])
    }
    //console.log('This is the parent classs :',e.classList[3]);
}
$('#addGeneral').click(function(e){
    counter++;
    var btnClass=$('#modal-general').data('text');
    var generalName=$('#generalName').val();
    var generalCounter=$('#generalCounter').data('text');
    var parent=$('#parentDivid').data('text');
    var oldCounter;
    var newCounter;
    if(generalName != ''){
        oldCounter=$(`#userInputChilds${generalCounter}`).data('text');
        newCounter=parseInt(oldCounter+1);
        $(`#userInputChilds${generalCounter}`).data('text',newCounter);
        totalBoxes++;
        console.log('genCounter :'+generalCounter+' addNewBox :'+addNewBox+' totalBoxes '+totalBoxes)
        if( generalCounter != -1){appendGeneral(generalCounter, addNewBox,totalBoxes,counter,newCounter,btnClass)}
        else if(generalCounter == -1 && totalBoxes != 1){appendGeneral(btnClass, addNewBox,totalBoxes,counter,newCounter)}
        else{appendGeneral(btnClass, addNewBox+1,totalBoxes,counter,newCounter)}
        if( btnClass== addNewBox){
            createNewGenralRow();
        }
        else{createNewGenralBox(parseInt(btnClass)+1);}
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
        $(`#genDropdown${addNewBox}`).addClass(parent+counter);
        $(`#fallDropdown${addNewBox}`).addClass(parent+counter);
        $(`#parent${addNewBox}${totalBoxes}`).data('text',parent);
        $(`#id${addNewBox}${totalBoxes}`).data('text',parent+counter)
    }
    Refresh();
    $('.hypermodel-container').hypermodel('repaint');
  
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
    $("#generaldiv").data('text',id)
    //setting value on the jquery modal text area
    $('#updateGeneralName').val($('#'+id).data('text'))
}
///when user click on the update general button from the j query modal
$('#updateGeneral').click(function(e){
    //getting card id on which user click
    var spanId= $("#generaldiv").data('text');
    
    $('#'+spanId).data('text',$('#updateGeneralName').val())
    //setting the data text of the card what user update
    var updateText=$('#'+spanId).data('text');
    //Adding Span Text 
    $('#'+spanId).text(updateText)
    $('.generalTitleName').text(updateText);

})

/////////////////////////////////////////////////////////////////////
//              FUNCTION CREATE NEW FALLBACK ROW                  //
///////////////////////////////////////////////////////////////////
function createNewBoxRow(){
    addNewBox++;
    var a=$('#fallCount').data('text')+addNewBox
    $('#AppendDiv').append(`
    <div id='tgen'></div>
    <div id='responsesChilds${addNewBox}${totalBoxes}' data-text='0'></div>
    <div id='isFallback${addNewBox}${totalBoxes}' data-text='true'></div>
    <div id='id${addNewBox}${totalBoxes}'></div>
    <div id='parent${addNewBox}${totalBoxes}'></div>

    <div class="hypermodel-column " id='colum${addNewBox}'>
    <div id='model-n${totalBoxes}' class="hypermodel-grid ${a}" >
    <div class="hypermodel-header" style="background:#3f9ce8; ">
        <h3 style="margin-left:-5%;color:white;" id='title${addNewBox}${totalBoxes}'>Property</h3>
    </div>
    <!-- Responses Part -->
    <div class="hypermodel-body">
        <div  id='block${addNewBox}' style="margin-left:-10px;margin-right:-10px;margin-top:-5px;">
            <div class="block-header" style="background:#bbdcf7;">
                <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;;"><b>Responses</b></p>
                <i class="fa fa-caret-down fa-sm ${addNewBox}${counter}" aria-hidden="true"  style="margin-top: -5%;"  data-target='#responsesBody${addNewBox}' onclick='responsesCollapse(this)'></i>
            </div>
            <div id='responses${addNewBox}${counter}'class='responses${addNewBox}${counter}' style="background: #FFFFFF; margin-top: -5%;">
                <div id="responsesBody${addNewBox}${totalBoxes}" style="padding-top:1%;"></div>
                <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%;"  >
                    <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${totalBoxes}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='btnGroupVerticalDrop4' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='dropdownBtn(this)'>
                        <i class="fa fa-plus"></i>
                        <div class="dropdown-menu drop${addNewBox}${totalBoxes} " aria-labelledby="btnGroupVerticalDrop2">
                        <a class='dropdown-item ${addNewBox}${totalBoxes}' onclick='textFunction(this)'>
                            <i class="fa fa-fw fa-envelope-o mr-5"></i>Text
                        </a>
                        <div class="dropdown-divider"></div>
                            <a class="dropdown-item ${addNewBox}${totalBoxes}" onclick='imageFunction(this)'>
                                <i class="fa fa-file-image-o mr-5" aria-hidden="true"></i> Picture
                            </a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item ${addNewBox}${totalBoxes}" onclick='delayFunction(this)'>
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
        <div  id="block"style="margin-left:-10px;margin-right:-10px;margin-top:-5px;">
            <div class="block-header" style="background:#bbdcf7;">
                <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;;"><b>User Inputs</b></p>
                <i class="fa fa-caret-down fa-sm ${counter}" aria-hidden="true"  style="margin-top: -5%;"  data-target="#userInput" onclick='colapseUserInputs(this)'></i>
            </div>
            <div id='userInput${counter}' style="background: #FFFFFF; margin-top: -5%;">
                <div id="userInputBody${addNewBox}${counter}" style="padding-top:1%;"></div>
                <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%; ">
                    <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${counter}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='btnGroupVerticalDrop4' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='userInputDropdownBtn(this)'>
                        <i class="fa fa-plus"></i>
                        <div class="dropdown-menu dropdown${addNewBox}${counter}" aria-labelledby="btnGroupVerticalDrop2">
                            <a id='fallDropdown${addNewBox}' class="dropdown-item ${addNewBox} ${addNewBox}${counter} ${totalBoxes} btn" id='fall${totalBoxes}' onclick='addFallback(this)'>
                                FallBack
                            </a>
                            <div id='falling${totalBoxes}'>
                            <div class="dropdown-divider " id='generalCounter'></div>
                            </div>
                            <a id='genDropdown${addNewBox}' class="dropdown-item ${addNewBox} ${addNewBox}${counter}" onclick='addGenral(this)'>
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
  $('#tgen').data('text',($('#fallCount').data('text')+addNewBox))

}
//////////////////////////////////////////////////////////
//        FUNCTION CREATES NEW FALL BACK BOX           //
////////////////////////////////////////////////////////
function createNewBox(number){
    console.log(addNewBox)
    var a=$('#fallCount').data('text')+addNewBox
    $('#colum'+number).append(`
    <div id='tgen'></div>
    <div id='responsesChilds${addNewBox}${totalBoxes}' data-text='0'></div>
    <div id='isFallback${addNewBox}${totalBoxes}' data-text='true'></div>
    <div id='id${addNewBox}${totalBoxes}'></div>
    <div id='parent${addNewBox}${totalBoxes}'></div>

    <div class="hypermodel-grid ${a}" id="model-n${totalBoxes}" >
        <div class="hypermodel-header" style="background:#3f9ce8; ">
            <h3 style="margin-left:-5%;color:white;" id='title${counter}'>Property</h3>
        </div>
        <!-- Responses Part -->
        <div class="hypermodel-body">
            <div  id='block${addNewBox}' style="margin-left:-10px;margin-right:-10px;margin-top:-5px;">
                <div class="block-header" style="background:#bbdcf7;">
                    <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;;"><b>Responses</b></p>
                    <i class="fa fa-caret-down fa-sm ${addNewBox}${counter}" aria-hidden="true"  style="margin-top: -5%;"  data-target='#responsesBody${addNewBox}' onclick='responsesCollapse(this)'></i>
                </div>
                <div id='responses${addNewBox}${counter}'class='responses${addNewBox}${counter}' style="background: #FFFFFF; margin-top: -5%;">
                    <div id="responsesBody${addNewBox}${totalBoxes}" style="padding-top:1%;"></div>
                    <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%;"  >
                        <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${totalBoxes}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='btnGroupVerticalDrop4' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='dropdownBtn(this)'>
                            <i class="fa fa-plus"></i>
                            <div class="dropdown-menu drop${addNewBox}${totalBoxes} " aria-labelledby="btnGroupVerticalDrop2">
                            <a class='dropdown-item ${addNewBox}${totalBoxes}' onclick='textFunction(this)'>
                                <i class="fa fa-fw fa-envelope-o mr-5"></i>Text
                            </a>
                            <div class="dropdown-divider"></div>
                                <a class="dropdown-item ${addNewBox}${totalBoxes}" onclick='imageFunction(this)'>
                                    <i class="fa fa-file-image-o mr-5" aria-hidden="true"></i> Picture
                                </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item ${addNewBox}${totalBoxes}" onclick='delayFunction(this)'>
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
            <div  id="block"style="margin-left:-10px;margin-right:-10px;margin-top:-5px;">
                <div class="block-header" style="background:#bbdcf7;">
                    <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;;"><b>User Inputs</b></p>
                    <i class="fa fa-caret-down fa-sm ${counter}" aria-hidden="true"  style="margin-top: -5%;"  data-target="#userInput" onclick='colapseUserInputs(this)'></i>
                </div>
                <div id='userInput${counter}' style="background: #FFFFFF; margin-top: -5%;">
                    <div id="userInputBody${addNewBox}${counter}" style="padding-top:1%;"></div>
                    <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%; ">
                        <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${counter}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='btnGroupVerticalDrop4' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='userInputDropdownBtn(this)'>
                            <i class="fa fa-plus"></i>
                            <div class="dropdown-menu dropdown${addNewBox}${counter}" aria-labelledby="btnGroupVerticalDrop2">
                                <a id='fallDropdown${addNewBox}' class="dropdown-item ${number} ${addNewBox}${counter} ${totalBoxes} btn" id='fall${totalBoxes}' onclick='addFallback(this)'>
                                    FallBack
                                </a>
                                <div class="dropdown-divider" id='generalCounter'></div>
                                <a id='genDropdown${addNewBox}' class="dropdown-item ${number} ${addNewBox}${counter}" onclick='addGenral(this)'>
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
    $('#tgen').data('text',($('#fallCount').data('text')+addNewBox))
}
////////////////////////////////////////////////////////////
//                  FUNCTION CREATES NEW GENRAL ROW       //
////////////////////////////////////////////////////////////
function createNewGenralRow(){
    addNewBox++;
    var a=$('#gCount').data('text')+addNewBox;
    $('#AppendDiv').append(`
    <div id='tgen'></div>
    <div id='child${addNewBox}${totalBoxes}' data-text='1'></div>
    <div id='isFallback${addNewBox}${totalBoxes}' data-text='false'></div>
    <div id='id${addNewBox}${totalBoxes}'></div>
    <div id='parent${addNewBox}${totalBoxes}'></div>
    <div class="hypermodel-column" id='colum${addNewBox}' >
        <div id='model-n${totalBoxes}' class="hypermodel-grid ${a}">
            <div class="hypermodel-header" style="background:#3f9ce8; ">
                <h3 style="margin-left:-5%;color:white;" id='title${addNewBox}${totalBoxes}'>Property</h3>
            </div>
        <div class="hypermodel-body" id='mainModel${addNewBox}'>
            <!-- User Says -->
            <div  id="block"style="margin-left:-10px;margin-right:-10px;margin-top:-5px;">
                <div class="block-header" style="background:#bbdcf7;">
                    <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;"><b>User Says</b></p>
                    <i class="fa fa-caret-down fa-sm ${addNewBox}${counter}" aria-hidden="true"  style="margin-top: -5%;"  data-target="#dynamicUserSays" onclick='userSaysCollapse(this)'></i>
                </div>
            <div id='collapse${addNewBox}${counter}' style="background:white;margin-top: -5%;margin-bottom: -5%;">
                <div id='UserSaysBody${addNewBox}${totalBoxes}'>
                    <div class="col-md-12 " id='TraningPhasediv${counter}'  style="padding-top: 3%;">
                        <div class="hypermodel-item">
                            <div class="TraningPhaseSpan ${addNewBox}${totalBoxes}" id='TraningPhasediv${addNewBox}${totalBoxes}1' style="float:left; width:80%;" onclick="onClick(this)">
                                <span style="font-size: 90%;" id='TraningPhasediv${addNewBox}${totalBoxes}1Span' data-text='Add text here'>Add text here</span>
                            </div>
                        </div>
                    </div>   
                </div>
                <div id="model-n1000" style="margin-top: 3%; margin-bottom: 3%; padding-bottom: 3%;">
                    <div class="col-md-12">
                        <div class="hypermodel-item">
                            <div class="row ${addNewBox}${totalBoxes}" style="padding-bottom: 5%;" id='plus' onclick='addnewTraningPhaseCard(this)' >
                                <button type="button" class="btn btn-xs btn-alt-default"  style="margin-left:40%;color: #3f9ce8;">
                                    <i class="fa fa-plus"></i>
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
                <div class="block-header" style="background:#bbdcf7;">
                    <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;;"><b>Responses</b></p>
                    <i class="fa fa-caret-down fa-sm ${addNewBox}${counter}" aria-hidden="true"  style="margin-top: -5%;"  data-target='#responsesBody${addNewBox}' onclick='responsesCollapse(this)'></i>
                </div>
                <div id='responses${addNewBox}${counter}'class='responses${addNewBox}${counter}' style="background: #FFFFFF; margin-top: -5%;">
                    <div id="responsesBody${addNewBox}${totalBoxes}" style="padding-top:1%;"></div>
                    <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%;"  >
                        <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${totalBoxes}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='btnGroupVerticalDrop4' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='dropdownBtn(this)'>
                            <i class="fa fa-plus"></i>
                            <div class="dropdown-menu drop${addNewBox}${totalBoxes} " aria-labelledby="btnGroupVerticalDrop2">
                            <a class='dropdown-item ${addNewBox}${totalBoxes}' onclick='textFunction(this)'>
                                <i class="fa fa-fw fa-envelope-o mr-5"></i>Text
                            </a>
                            <div class="dropdown-divider"></div>
                                <a class="dropdown-item ${addNewBox}${totalBoxes}" onclick='imageFunction(this)'>
                                    <i class="fa fa-file-image-o mr-5" aria-hidden="true"></i> Picture
                                </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item ${addNewBox}${totalBoxes}" onclick='delayFunction(this)'>
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
        <div id='userInputChilds${addNewBox}${totalBoxes}' data-text='0'></div>
            <div  id="block"style="margin-left:-10px;margin-right:-10px;margin-top:-5px;">
                <div class="block-header" style="background:#bbdcf7;">
                    <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;;"><b>User Inputs</b></p>
                    <i class="fa fa-caret-down fa-sm ${counter}" aria-hidden="true"  style="margin-top: -5%;"  data-target="#userInput" onclick='colapseUserInputs(this)'></i>
                </div>
                <div id='userInput${counter}' style="background: #FFFFFF; margin-top: -5%;">
                    <div id="userInputBody${addNewBox}${counter}" style="padding-top:1%;"></div>
                    <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%; ">
                        <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${counter}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='btnGroupVerticalDrop4' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='userInputDropdownBtn(this)'>
                            <i class="fa fa-plus"></i>
                            <div class="dropdown-menu dropdown${addNewBox}${counter}" aria-labelledby="btnGroupVerticalDrop2">
                                <a id='fallDropdown${addNewBox}' class="dropdown-item ${addNewBox} ${addNewBox}${counter} ${totalBoxes} btn" id='fall${totalBoxes}' onclick='addFallback(this)'>
                                    FallBack
                                </a>
                                <div class="dropdown-divider" id='generalCounter'></div>
                                <a id='genDropdown${addNewBox}' class="dropdown-item ${addNewBox} ${addNewBox}${counter}" onclick='addGenral(this)'>
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
      $('#tgen').data('text',($('#gCount').data('text')+addNewBox));
    //   prepareJsonForUserSays();
}
/////////////////////////////////////////////////////////////
//                     CREATE NEW GENRAL BOX              //
///////////////////////////////////////////////////////////
function createNewGenralBox(number){
    var a=$('#gCount').data('text')+addNewBox;
    var b=$('#gCount').data('text');
    console.log('this is the new general box :'+a);
    $('#colum'+number).append(`
    <div id='tgen'></div>
    <div id='child${addNewBox}${totalBoxes}' data-text='1'></div>
    <div id='isFallback${addNewBox}${totalBoxes}' data-text='false'></div>
    <div id='id${addNewBox}${totalBoxes}' data-text=${a}></div>
    <div id='parent${addNewBox}${totalBoxes}' data-text=${b}></div>
    <div class="hypermodel-grid ${a}" id="model-n${totalBoxes}">
    <div class="hypermodel-header" style="background:#3f9ce8; ">
        <h3 style="margin-left:-5%;color:white;" id='title${addNewBox}${totalBoxes}'>Property</h3>
    </div>
<div class="hypermodel-body" id='mainModel${addNewBox}'>
    <!-- User Says -->
    <div  id="block"style="margin-left:-10px;margin-right:-10px;margin-top:-5px;">
        <div class="block-header" style="background:#bbdcf7;">
            <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;"><b>User Says</b></p>
            <i class="fa fa-caret-down fa-sm ${addNewBox}${counter}" aria-hidden="true"  style="margin-top: -5%;"  data-target="#dynamicUserSays" id='dynamicColapse' onclick='userSaysCollapse(this)'></i>
        </div>
    <div id='collapse${addNewBox}${counter}' style="background:white;margin-top: -5%;margin-bottom: -5%;">
        <div id='UserSaysBody${addNewBox}${totalBoxes}'>
            <div class="col-md-12 " id='TraningPhasediv${counter}'  style="padding-top: 3%;">
                <div class="hypermodel-item">
                    <div class="TraningPhaseSpan ${addNewBox}${totalBoxes}" id='TraningPhasediv${addNewBox}${totalBoxes}1' style="float:left; width:80%;" onclick="onClick(this)">
                        <span style="font-size: 90%;" id='TraningPhasediv${addNewBox}${totalBoxes}1Span' data-text='Add text here'>Add text here</span>
                    </div>
                </div>
            </div>   
        </div>
        <div id="model-n1000" style="margin-top: 3%; margin-bottom: 3%; padding-bottom: 3%;">
            <div class="col-md-12">
                <div class="hypermodel-item" >
                    <div class="row ${addNewBox}${totalBoxes}" style="padding-bottom: 5%;" id='plus' onclick='addnewTraningPhaseCard(this)' >
                        <button type="button" class="btn btn-xs btn-alt-default"  style="margin-left:40%;color: #3f9ce8;">
                            <i class="fa fa-plus"></i>
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
        <div class="block-header" style="background:#bbdcf7;">
            <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;;"><b>Responses</b></p>
            <i class="fa fa-caret-down fa-sm ${addNewBox}${counter}" aria-hidden="true"  style="margin-top: -5%;"  data-target='#responsesBody${addNewBox}' onclick='responsesCollapse(this)'></i>
        </div>
        <div id='responses${addNewBox}'class='responses${addNewBox}${counter}'style="background: #FFFFFF; margin-top: -5%;">
            <div id="responsesBody${addNewBox}${totalBoxes}" style="padding-top:1%;"></div>
            <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%;"  >
                <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${totalBoxes}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='btnGroupVerticalDrop4' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='dropdownBtn(this)'>
                    <i class="fa fa-plus"></i>
                    <div class="dropdown-menu drop${addNewBox}${totalBoxes} " aria-labelledby="btnGroupVerticalDrop2">
                    <a class='dropdown-item ${addNewBox}${totalBoxes}' onclick='textFunction(this)'>
                        <i class="fa fa-fw fa-envelope-o mr-5"></i>Text
                    </a>
                    <div class="dropdown-divider"></div>
                        <a class="dropdown-item ${addNewBox}${totalBoxes}" onclick='imageFunction(this)'>
                            <i class="fa fa-file-image-o mr-5" aria-hidden="true"></i> Picture
                        </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item ${addNewBox}${totalBoxes}" onclick='delayFunction(this)'>
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
<div  id="block"style="margin-left:-10px;margin-right:-10px;margin-top:-5px;">
    <div class="block-header" style="background:#bbdcf7;">
        <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;;"><b>User Inputs</b></p>
        <i class="fa fa-caret-down fa-sm ${counter}" aria-hidden="true"  style="margin-top: -5%;"  data-target="#userInput" onclick='colapseUserInputs(this)'></i>
    </div>
    <div id='userInput${counter}' style="background: #FFFFFF; margin-top: -5%;">
        <div id="userInputBody${addNewBox}${totalBoxes}" style="padding-top:1%;"></div>
        <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%; ">
            <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${totalBoxes}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='btnGroupVerticalDrop4' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='userInputDropdownBtn(this)'>
                    <i class="fa fa-plus"></i>
                <div class="dropdown-menu dropdown${addNewBox}${totalBoxes}" aria-labelledby="btnGroupVerticalDrop2">
                    <a id='fallDropdown${addNewBox}' class="dropdown-item ${number} ${addNewBox}${totalBoxes} ${totalBoxes} btn" id='fall${totalBoxes}'  onclick='addFallback(this)'>
                        FallBack
                    </a>
                    <div class="dropdown-divider"></div>
                    <a id='genDropdown${addNewBox}' class="dropdown-item ${number} ${addNewBox}${totalBoxes} " onclick='addGenral(this)'>
                        General
                    </a>
                                                                        
                </div>      
            </div>
        </div>
    </div> 
</div>
</div>

      `)
      $('#tgen').data('text',($('#gCount').data('text')+addNewBox));
    //   prepareJsonForUserSays();
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

}

function dropdownBtn(e){
    $('.drop'+e.classList[5]).collapse('toggle')
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
function appendGeneral(genCounter, addnewBox,totalboxes,count,newCounter,btnclass){
    var gen=0;
    if(genCounter==0){
        gen=`div${count}`
    }
    else{
        gen=`div${genCounter}${counter}`;
    }
   if(addNewBox != btnclass){
    $('#userInputBody'+genCounter).append(`
    <div class="col-md-12 ${addnewBox}"  style="margin-top:3%;" id='div${count}' >
        <div class="hypermodel-item ui-sortable-handle" data-target='${totalboxes}'>
            <div style="float:left; width:80%;" id="generalDiv${addnewBox}${totalboxes}" onclick="updateGeneralName(this)" data-text="Sample text">
                <span id='generalDiv${addnewBox}${totalboxes}Span' style="font-size: 90%; " > </span>
            </div>
            <div class="buttonClass btn ${count} btnbtn ${gen} ${addNewBox} genral" style="width:5%;color:#CD5C5C; float: right;" onclick="RemoveFallback(this)">
                <i class="fa fa-times fa-xs" aria-hidden="true"></i>
            </div>
        </div>
     </div>
     <div id='gCount'></div>
     <div id='gCount${btnclass}${newCounter}'></div>
    `
    )
   }
   else{
       var newBox=parseInt(addnewBox+1)
        $('#userInputBody'+genCounter).append(`
        <div class="col-md-12 ${addnewBox}"  style="margin-top:3%;" id='div${count}' >
            <div class="hypermodel-item ui-sortable-handle" data-target='${totalboxes}'>
                <div style="float:left; width:80%;" id="generalDiv${newBox}${totalboxes}" onclick="updateGeneralName(this)" data-text="Sample text">
                    <span id='generalDiv${newBox}${totalboxes}Span' style="font-size: 90%; " > </span>
                </div>
                <div class="buttonClass btn ${count} btnbtn ${gen} ${newBox} genral" style="width:5%;color:#CD5C5C; float: right;" onclick="RemoveFallback(this)">
                    <i class="fa fa-times fa-xs" aria-hidden="true"></i>
                </div>
            </div>
        </div>
        <div id='gCount'></div>
        <div id='gCount${btnclass}${newCounter}'></div>
        `
        )
   }
   $('#gCount').data('text',gen);
   $(`#gCount${btnclass}${newCounter}`).data('text',totalBoxes)

}
function appendFallback(fallCounter, addnewBox,totalboxes,count){
    var c='';
    if(fallCounter==0){
         c=`div${count}`
    }
    else{
        c=`div${fallCounter}${counter}`
    }
    $('#userInputBody'+fallCounter).append(`
    <div class="col-md-12 ${addnewBox}"  style="margin-top:3%;" id='div${count}' >
        <div class="hypermodel-item ui-sortable-handle" data-target='${totalboxes}'>
            <div style="float:left; width:80%;" id="fallbackDiv${count}" onclick="updateFallbackName(this)" data-text="Sample text">
                <span id='fallbackDiv${count}Span' style="font-size: 90%; " > </span>
            </div>
            <div class="buttonClass btn ${count} ${addnewBox} ${c} fallback" id='try' style="width:5%;color:#CD5C5C; float: right;" onclick="RemoveFallback(this)">
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
    // console.log("this is the clicked class :"+e.classList[4]);
    //checking on which class user click 
    //classes start with this class
    var removeClasses=classarray.filter(num=>num.startsWith(e.classList[4]));
    //getting parent id 
    var parentId=e.parentNode.parentNode.parentNode.id;
    //removing elements
    for(var i=0; i<removeClasses.length; i++){
        $('.'+removeClasses[i]).remove();
        //getting disable button id
        if(e.classList[5]=='fallback'){
            var disableButtonId=e.parentNode.parentNode.parentNode.parentNode.children.button.children.btnGroupVerticalDrop4.children[1].children[0].id;
            $('#'+disableButtonId).removeClass('disabled')
        }
    }
    //checking if user click on first remove button
    if(parentId=='userInputBody0'){
        $('.'+removeClasses[0]).remove();
        //getting disable button id
        if(e.classList[5]=='fallback'){
            var disableButtonId=e.parentNode.parentNode.parentNode.parentNode.children.button.children.btnGroupVerticalDrop4.children.fallbackCounter.children[0].id;
            $('#'+disableButtonId).removeClass('disabled')
        }
       
    }
    
    //Removing the card span 
    $('#'+"div"+e.classList[2]).remove();
    Refresh();
    // $('.'+e.classList[4]).removeClass('disabled')
    deleteJson();
}
// function deleteJson(){
//     for(var i=0 ;i<=addNewBox; i++){
//         for(var j=0; j<totalBoxes; j++){
//             if($(`#child${i}${j}`).length && $(`#responsesChilds${i}${j}`).length){
//                 // prepareOneBoxJSON(i+""+j)
//             }
//         }
//     }
// }
function deleteJson(){
    JsonObject=[];
    var usersays=[];
    var responses=[];
    var name;
    var isFallback;
    var id;
    var parent;
    var myObject=[];
    for(var i=0; i<=addNewBox; i++){
        for(var j=0; j<=totalBoxes; j++){
            myObject[j]=new Object();
            if($(`#child${i}${j}`).length){
                usersays=[];name='';isFallback='';id='';parent='';
                var count=$(`#child${i}${j}`).data('text');
                isFallback=$(`#isFallback${i}${j}`).data('text');
                id=$(`#id${i}${j}`).data('text');
                parent=$(`#parent${i}${j}`).data('text');
                if($(`#title${i}${j}`).length){
                    name=$(`#title${i}${j}`).data('text');
                }
                for(var k=0; k<=count;k++){
                    if($(`#TraningPhasediv${i}${j}${k}Span`).length){
                        usersays.push($(`#TraningPhasediv${i}${j}${k}Span`).data('text'))
                    }

                }

            }
            if($(`#responsesChilds${i}${j}`).length)
            {
                responses=[];
                var count2=$(`#responsesChilds${i}${j}`).data('text');
                for(var l=0; l<=count2; l++){
                    if($(`#ResponseDiv${i}${j}${l}Span`).length){
                        responses.push($(`#ResponseDiv${i}${j}${l}Span`).data('text'))
                    }
                    if($(`#imagediv${i}${j}${l}Span`).length){
                        responses.push($(`#imagediv${i}${j}${l}Span`).data('text'))
                    }
                    if($(`#delayDiv${i}${j}${l}Span`).length){
                        responses.push($(`#delayDiv${i}${j}${l}Span`).data('text'))
                    }
                }
            }
            if(name != '' && name != null){
                myObject[j].name=name;
                myObject[j].TraningPhrases=usersays;
                myObject[j].Responses=responses;
                myObject[j].isFallback=isFallback;
                myObject[j].id=id;
                myObject[j].parent=parent;
                if(myObject[j].name != null){
                    // console.log(i+''+j)
                    // JsonObject[i+''+j]=myObject[j];
                }
            }
        }
    }
    // jsonstring=JSON.stringify(JsonObject);
    // console.log(jsonstring);
}

function prepareOneBoxJSON(boxno){
    var counts=0;
    var responses=0;
    var id='';
    var parent='';
    var isFallback='';
    var trainingPhrase=[];
    var response=[];
    var name='';
    var obj=new Object();
    var counts=$(`#child${boxno}`).data('text');
    responses=($(`#responsesChilds${boxno}`).data('text'));
    id=$(`#id${boxno}`).data('text');
    parent=$(`#parent${boxno}`).data('text');
    isFallback=$(`#isFallback${boxno}`).data('text');
    name=$(`#title${boxno}`).data('text');
    for(var k=0; k<=counts;k++){
         if($(`#TraningPhasediv${boxno}${k}Span`).length){
            trainingPhrase.push($(`#TraningPhasediv${boxno}${k}Span`).data('text'));
         }
    }
    for(var l=0; l<=responses; l++){
        if($(`#ResponseDiv${boxno}${l}Span`).length){
            response.push($(`#ResponseDiv${boxno}${l}Span`).data('text'))
        }
        if($(`#imagediv${boxno}${l}Span`).length){
            response.push($(`#imagediv${boxno}${l}Span`).data('text'))
        }
        if($(`#delayDiv${boxno}${l}Span`).length){
            response.push($(`#delayDiv${boxno}${l}Span`).data('text'))
        }
    }
    // console.log('title :'+name)
    obj.trainingPhrase=trainingPhrase;
    obj.responses=response;
    obj.id=id
    obj.parent=parent;
    obj.isFallback=isFallback;
    obj.name=name;
    JsonObject[boxno]=obj;
    jsonstring=JSON.stringify(JsonObject);
    console.log(jsonstring);
}