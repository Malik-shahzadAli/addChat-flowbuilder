$(document).ready(function() {
    // console.log('here')
    prepareOneBoxJSON('00')
});
// counter
var counter=0;
var addNewBox=0;
var addFallBack=0;
var totalBoxes=0;
// var Gcount=0;
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
    var boxNewCounter=parseInt(boxOldCounter+1);
    $(`#child${e.classList[1]}`).data('text',boxNewCounter);
    $(`#UserSaysBody${e.classList[1]}`).append(`
    <div class="col-md-12 ${counter}"  style="margin-top:3%;" id='div${counter}'>
       <div class="hypermodel-item ui-sortable-handle">
           <div style="float:left; width:80%;" class='TraningPhaseSpan ${e.classList[1]}' id="TraningPhasediv${e.classList[1]}${boxNewCounter}" onclick="onClick(this)" data-text="Sample text">
               <span id='TraningPhasediv${e.classList[1]}${boxNewCounter}Span' style="font-size: 90%;" data-text='Add text here' >Add text here</span>
           </div>
           <div class="buttonClass btn ${counter} ${e.classList[1]}"  style="width:5%;color:#CD5C5C;float: right;" onclick="Remove(this)">
               <i class="fa fa-times fa-xs" aria-hidden="true"></i>
           </div>
       </div>
    </div>
    `
    );
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
    prepareOneBoxJSON(e.classList[3]);
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
  // checking if user input something in the text area
  if($('#addTextArea').val() !== ''){
     oldCounter=$(`#responsesChilds${rowNo}`).data('text');
     newCounter=parseInt(oldCounter+1);
    $(`#responsesChilds${rowNo}`).data('text',newCounter);
    //appending responses body with new card
    $('#responsesBody'+rowNo).append(`
    <div class="col-md-12 ${counter}"  style="margin-top:3%;" id='div${counter}'>
        <div class="hypermodel-item ui-sortable-handle">
            <div style="float:left; width:70%;" class='${rowNo}' id="ResponseDiv${rowNo}${newCounter}" onclick="ResponseModal(this)" data-text="Sample text">
                <span id='ResponseDiv${rowNo}${newCounter}Span' style="font-size: 90%;" ></span>
            </div>
            <div class="buttonClass btn ${counter} ${rowNo}" style="width:5%;color:#CD5C5C;  float: right;" onclick="Remove(this)">
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
    //appending the response body with the image card
    $('#responsesBody'+rowNo).append(`
    <div class="col-md-12 ${counter}"  style="margin-top:3%;" id='div${counter}'>
        <div class="hypermodel-item ui-sortable-handle">
            <div style="float:left; width:70%;" class='${rowNo}' id="imagediv${rowNo}${newCounter}" onclick="updateImage(this)" data-text="Sample text">
                <span id='imagediv${rowNo}${newCounter}Span' data-text(${source})>  <img src=${source} width='25'  class="rounded" id='imagediv${counter}SpanImage'></span>
            </div>
            <div class="buttonClass btn ${counter} ${rowNo}" style="width:5%; color:#CD5C5C; float: right;" onclick="Remove(this)">
                <i class="fa fa-times fa-xs" aria-hidden="true"></i>
            </div>
        </div>
     </div>
    `
    )
    $(`#imagediv${rowNo}${newCounter}Span`).data('text',source)
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
            <div class="buttonClass btn ${counter} ${rowNo}" style="width:5%;color:#CD5C5C; float: right;" onclick="Remove(this)">
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
  prepareOneBoxJSON(rowNo)
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
}
//when user click on the update Text button from jquery modal
$('#updateText').click(function(e){
    var rowNo=$('#modal-update').data('text');
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
    prepareOneBoxJSON(rowNo)
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
// function addFirstFallback(e){
//     jQuery('#modal-fallBack').modal('toggle');
//     $('#fallbackName').val('');
//     $('#modal-fallBack').data('text',e.classList[1]);
//         //sending 0 fall back
//     $('#createdFallback').data('text',0)
//     //fallbackParentDivid
//     $('#fallbackParentDivid').data('text',e.classList[4])

// }
function addFirstFallback(e){
    jQuery('#modal-fallBack').modal('toggle');
    $('#fallbackName').val('');
    $('#modal-fallBack').data('text',e.classList[1]);
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
    console.log("Parent :"+$('#fallbackParentDivid').data('text'))

}
// function addFallback(e){
//     jQuery('#modal-fallBack').modal('toggle');
//     $('#fallbackName').val('');
//     $('#modal-fallBack').data('text',e.classList[1]);
//     $('#fallbackCounter').data('text',e.classList[2]);
//     //checking if 2 classes have same name
//     if(e.classList[3] != 'btn'){
//         $('#createdFallback').data('text',e.classList[3])
//     }
//     else{
//         //if 2 classes have same name send the first one class
//         $('#createdFallback').data('text',e.classList[1])
//         if(e.classList[1] != e.classList[3]){
//             $('#fallbackParentDivid').data('text',e.classList[4])
//         }
//         else{
//             $('#fallbackParentDivid').data('text',e.classList[4])
//         }
//     }
//     // $('#fallbackParentDivid').data('text',e.classList[5])
// }
function addFallback(e){
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
    //getting fall back name
    var fallBackName=$('#fallbackName').val();
    //user clicked fallback 
     var fallbackCounter=$('#fallbackCounter').data('text')
    //checking user enter fall back name or not
    var parent=$('#fallbackParentDivid').data('text');
    var childCounter=$('#childCounter').data('text');
  
    // console.log('pass parent :'+parent);
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
        //puting name on the box
        $('.modelTitle').text(name);
        var n=$('#createdFallback').data('text');
        // console.log('this is the n:'+n);
        //disable the fall back
        $('#fall'+n).addClass('disabled');
        $(`#fallDropdown${n}`).addClass('disabled');
        $(`#fallDropdown${addNewBox}`).addClass(parent+counter);
        $(`#genDropdown${addNewBox}`).addClass(parent+counter);
        $(`#parent${addNewBox}${totalBoxes}`).data('text',parent);
        $(`#id${addNewBox}${totalBoxes}`).data('text',parent+childCounter)
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
})

/////////////////////////////////
// Creating a new general box //
///////////////////////////////
// function addFirstGenral(e){
//     jQuery('#modal-general').modal('toggle');
//     $('#generalName').val('');
//     $('#modal-general').data('text',e.classList[1]);
//     $('#generalCounter').data('text',-1)
//     $('#parentDivid').data('text',e.classList[3])
//     $('#p00').data('text',e.classList[3])

// }
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
    // console.log('secound class:'+e.classList[2]);
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
    var generalName=$('#generalName').val();
    //getting the addnew box and counter 
    var generalCounter=$('#generalCounter').data('text');
    //getting the parent
    var parent=$('#parentDivid').data('text');
    //getting the child counter from JQuery modal
    var childCounter=$('#childCounter').data('text');
    // console.log('This is the child counter '+childCounter);
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
        totalBoxes++;
        
        console.log('Pass Parent :'+parent); 
        console.log('Pass child :'+childCounter);
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
        else{createNewGenralBox(parseInt(btnClass)+1,parent,childCounter);}
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
        $(`#fallDropdown${addNewBox}`).addClass(parent+counter);
        $(`#parent${addNewBox}${totalBoxes}`).data('text',parent);
        $(`#id${addNewBox}${totalBoxes}`).data('text',parent+childCounter)
    }
    Refresh();
    $('.hypermodel-container').hypermodel('repaint');
    prepareOneBoxJSON(addNewBox+""+totalBoxes);
  
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

    <div class="hypermodel-column " id='colum${addNewBox}'>
    <div id='model-n${totalBoxes}' class="hypermodel-grid ${a}" >
    <div class="hypermodel-header" style="background:#3f9ce8; ">
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
    <div id='ChildCounter${addNewBox}${counter}' data-text='0'></div>
        <div  id="block"style="margin-left:-10px;margin-right:-10px;margin-top:-5px;">
            <div class="block-header" style="padding-top:5%;padding-bottom:0%; background:#bbdcf7;">
                <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;;"><b>User Inputs</b></p>
                <i class="fa fa-caret-down fa-sm ${counter}" aria-hidden="true"  style="margin-top: -10%;"  data-target="#userInput" onclick='colapseUserInputs(this)'></i>
            </div>
            <div id='userInput${counter}' style="background: #FFFFFF; margin-top: -5%;">
                <div id="userInputBody${addNewBox}${counter}" style="padding-top:1%;"></div>
                <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%; ">
                    <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${counter}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='btnGroupVerticalDrop4' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='userInputDropdownBtn(this)'>
                        <i class="fa fa-plus"></i>
                        <div class="dropdown-menu dropdown${addNewBox}${counter}" aria-labelledby="btnGroupVerticalDrop2">
                            <a id='fallDropdown${addNewBox}' class="dropdown-item ${addNewBox} ${addNewBox}${counter} ${totalBoxes} ${a} btn"  onclick='addFallback(this)'>
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

    <div class="hypermodel-grid ${a}" id="model-n${totalBoxes}" >
        <div class="hypermodel-header" style="background:#3f9ce8; ">
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
        <div id='ChildCounter${addNewBox}${counter}' data-text='0'></div>
            <div  id="block"style="margin-left:-10px;margin-right:-10px;margin-top:-5px;">
                <div class="block-header" style="padding-top:5%;padding-bottom:0%; background:#bbdcf7;">
                    <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;;"><b>User Inputs</b></p>
                    <i class="fa fa-caret-down fa-sm ${counter}" aria-hidden="true"  style="margin-top: -10%;"  data-target="#userInput" onclick='colapseUserInputs(this)'></i>
                </div>
                <div id='userInput${counter}' style="background: #FFFFFF; margin-top: -5%;">
                    <div id="userInputBody${addNewBox}${counter}" style="padding-top:1%;"></div>
                    <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%; ">
                        <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${counter}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='btnGroupVerticalDrop4' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='userInputDropdownBtn(this)'>
                            <i class="fa fa-plus"></i>
                            <div class="dropdown-menu dropdown${addNewBox}${counter}" aria-labelledby="btnGroupVerticalDrop2">
                                <a id='fallDropdown${addNewBox}' class="dropdown-item ${number} ${addNewBox}${counter} ${totalBoxes} ${a} btn"  onclick='addFallback(this)'>
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
    $('#tgen').data('text',($('#fallCount').data('text')+addNewBox))
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
    <div class="hypermodel-column" id='colum${addNewBox}' >
        <div id='model-n${totalBoxes}' class="hypermodel-grid ${a}">
            <div class="hypermodel-header" style="background:#3f9ce8; ">
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
                        <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${counter}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='btnGroupVerticalDrop4' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='userInputDropdownBtn(this)'>
                            <i class="fa fa-plus"></i>
                            <div class="dropdown-menu dropdown${addNewBox}${counter}" aria-labelledby="btnGroupVerticalDrop2">
                                <a id='fallDropdown${addNewBox}' class="dropdown-item ${addNewBox} ${addNewBox}${counter} ${totalBoxes} ${a} btn"  onclick='addFallback(this)'>
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
    //   $(`#tgen${gencounter}`).data('text',($(`#gCount${gencounter}`).data('text')+addNewBox));
    //   prepareJsonForUserSays();
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
    <div class="hypermodel-grid ${a}" id="model-n${totalBoxes}">
    <div class="hypermodel-header" style="background:#3f9ce8; ">
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
<div id='ChildCounter${addNewBox}${totalBoxes}' data-text='0'></div>
<div  id="block"style="margin-left:-10px;margin-right:-10px;margin-top:-5px;">
    <div class="block-header" style="padding-top:5%;padding-bottom:0%; background:#bbdcf7;">
        <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;;"><b>User Inputs</b></p>
        <i class="fa fa-caret-down fa-sm ${counter}" aria-hidden="true"  style="margin-top: -10%;"  data-target="#userInput" onclick='colapseUserInputs(this)'></i>
    </div>
    <div id='userInput${counter}' style="background: #FFFFFF; margin-top: -5%;">
        <div id="userInputBody${addNewBox}${totalBoxes}" style="padding-top:1%;"></div>
        <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%; ">
            <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${totalBoxes}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='btn${addNewBox}' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='userInputDropdownBtn(this)'>
                    <i class="fa fa-plus"></i>
                <div class="dropdown-menu dropdown${addNewBox}${totalBoxes}" aria-labelledby="btnGroupVerticalDrop2" >
                    <a id='fallDropdown${addNewBox}' class="dropdown-item ${number} ${addNewBox}${totalBoxes} ${totalBoxes} ${a} btn"   onclick='addFallback(this)'>
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
    //   $(`#tgen${gencounter}`).data('text',($(`#gCount${gencounter}`).data('text')+addNewBox));
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
function appendGeneral(genCounter, addnewBox,totalboxes,count,newCounter,btnclass,childCounter,parent){
    var gen=0;
    if(genCounter==0){
        //in this case childcounter is parent actually
        //in this case btnClass is child counter Actually
        gen=childCounter+''+btnclass;
        // console.log('this is the child counter :'+btnclass);
        // console.log('this is the parent :'+childCounter);
    }
    
    else{
       //parent is the parent class
       //child counter is the appended child number
       gen=parent+''+childCounter;
    }
    // console.log('this is the gen :'+gen)
   if(addNewBox != btnclass){
    $('#userInputBody'+genCounter).append(`
    <div class="col-md-12 ${addnewBox}"  style="margin-top:3%;" id='div${count}' >
        <div class="hypermodel-item ui-sortable-handle" data-target='${totalboxes}'>
            <div style="float:left; width:80%;" id="generalDiv${addnewBox}${totalboxes}" class='${addnewBox}${totalboxes}' onclick="updateGeneralName(this)" data-text="Sample text">
                <span id='generalDiv${addnewBox}${totalboxes}Span' style="font-size: 90%; " > </span>
            </div>
            <div class="buttonClass btn ${count} btnbtn ${gen} ${addNewBox} genral" style="width:5%;color:#CD5C5C; float: right;" onclick="RemoveFallback(this)">
                <i class="fa fa-times fa-xs" aria-hidden="true"></i>
            </div>
        </div>
     </div>
     <div id='parentSpanId${genCounter}'></div>
     <div id='gCount${genCounter}'></div>
     <div id='gCount${btnclass}${newCounter}'></div>
    `
    )
   }
   else{
       var newBox=parseInt(addnewBox+1)
        $('#userInputBody'+genCounter).append(`
        <div class="col-md-12 ${addnewBox}"  style="margin-top:3%;" id='div${count}' >
            <div class="hypermodel-item ui-sortable-handle" data-target='${totalboxes}'>
                <div style="float:left; width:80%;" id="generalDiv${newBox}${totalboxes}" class='${newBox}${totalboxes}' onclick="updateGeneralName(this)" data-text="Sample text">
                    <span id='generalDiv${newBox}${totalboxes}Span' style="font-size: 90%; " > </span>
                </div>
                <div class="buttonClass btn ${count} btnbtn ${gen} ${newBox} genral" style="width:5%;color:#CD5C5C; float: right;" onclick="RemoveFallback(this)">
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
    //checking on which class user click 
    //classes start with this class
    var removeClasses=classarray.filter(num=>num.startsWith(e.classList[4]));
    //getting parent id 
     var parentId=e.parentNode.parentNode.parentNode.id;
    //removing elements
    for(var i=0; i<removeClasses.length; i++){
        deleteJson(removeClasses[i]);
        $('.'+removeClasses[i]).remove();
        //getting disable button id
    }
    // var disableButtonId=$(`#${parentId}`).parent().children()[1].children.btnGroupVerticalDrop4.children[1].children[0].id;
    // $(`#${disableButtonId}`).removeClass('disabled')
    // console.log($(`#${parentId}`).parent().children()[1].children.btnGroupVerticalDrop4.children[1].children[0].id);
   // console.log("console .log "+);
    // console.log(e)
    // if(e.classList[5]=='fallback'){
        // console.log(e.classList[4]);
            // console.log(e.parentNode)
            // var disableButtonId=e.parentNode.parentNode.parentNode.parentNode.children.button.children.btnGroupVerticalDrop4.children[1].children[0].id;
            // $('#'+disableButtonId).removeClass('disabled')
    // }
    //checking if user click on first remove button
    // if(parentId=='userInputBody0'){
        // $('.'+removeClasses[0]).remove();
        //getting disable button id
        // if(e.classList[5]=='fallback'){
            // console.log(e.classList[3]);
            // console.log(e.parentNode)
            // var disableButtonId=e.parentNode.parentNode.parentNode.parentNode.children.button.children.btnGroupVerticalDrop4.children.fallbackCounter.children[0].id;
            // $('#'+disableButtonId).removeClass('disabled')
        // }
       
    //}
    //Removing the card span 
    // console.log('this is parent id :'+parentId);
    // if(e.classList[4] == 'root1'){
    //     $(`#fallDropdown${e.classList[3]}`).removeClass('disabled');
    // }
    // else{
    //     $(`#fallDropdown${e.classList[4]}`).removeClass('disabled');
    // }
    $('#'+"div"+e.classList[2]).remove();
    Refresh();
    
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
    var obj={}
    var responsesObject=[];
    var payload=[];
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
        responsesObject[l]=new Object();
        payload[l]=new Object();
        if($(`#ResponseDiv${boxno}${l}Span`).length){
            // response.push($(`#ResponseDiv${boxno}${l}Span`).data('text'))
            responsesObject[l].type='text'
            responsesObject[l].payload=$(`#ResponseDiv${boxno}${l}Span`).data('text');
            response.push(responsesObject[l])
        }
        if($(`#imagediv${boxno}${l}Span`).length){
            responsesObject[l].type='image'
            responsesObject[l].payload=$(`#imagediv${boxno}${l}Span`).data('text');
            //response.push($(`#imagediv${boxno}${l}Span`).data('text'))
            response.push(responsesObject[l])
        }
        if($(`#delayDiv${boxno}${l}Span`).length){
            responsesObject[l].type='delay'
            var string=$(`#delayDiv${boxno}${l}Span`).data('text');
            var splitText = string.split(" ");
            var unit=splitText[1];
            var duration=splitText[0];
            payload[l].duration=duration;
            payload[l].unit=unit[0];
            responsesObject[l].payload=payload[l];
            response.push(responsesObject[l]);
        }
    }
    obj.trainingPhrase=trainingPhrase;
    obj.responses=response;
    obj.id=id
    obj.parent=parent;
    obj.isFallback=isFallback;
    obj.name=name;
    console.log(obj.id);
    var foundIndex = JsonArray.findIndex(x => obj.id == x.id);
    if(foundIndex == -1){
        JsonArray.push(obj)
    }
    else{
        JsonArray[foundIndex]=obj;
    }
   
   console.log(JsonArray);
}
function deleteJson(id){
    console.log('id:'+id);
    var foundIndex = JsonArray.findIndex(x => id == x.id);
    if(foundIndex != -1){
        JsonArray.splice(foundIndex,1);
    }
    console.log(JsonArray);
}