//Including the js plumb file
//#region
var jsPlumb = document.createElement("script");
jsPlumb.type = "text/javascript";
jsPlumb.src = "./jsplumb.min.js";

let json = 0;

//checking how many time user click on the zoom In button and zoom Out buttton
let zoom = 0;

//front end url import from config.json File
let frontEndUrl;

//counters
let counter = 0;
let addNewBox = 0;
let addFallBack = 0;
let totalBoxes = 0;

//JSON Array
let JsonArray = [];

//const veriables import from const file
let zoomWidthIncreaseDescrease;
let charactersLimitOnCard;
let showCharactersOnCard;
let oneSmsCharacterLimit
//#endregion
//setting values from const file
//#region
$(document).ready(function(){
    $.getJSON('./const.json',function(data){
        charactersLimitOnCard = data.charactersLimitOnCard;
        showCharactersOnCard = data.showCharactersOnCard;
        oneSmsCharacterLimit = data.oneSmsCharacterLimit;
        zoomWidthIncreaseDescrease = data.zoomWidthIncreaseDescrease
        
     })
})
//#endregion
//#region
//adding new traning Phrase
// When user click on the plus button of user says
function addTraningPhraseCard(e){
    counter++;
    // fetching total old childs length
    let boxOldCounter = $(`#child${e.classList[1]}`).data('text');
    //incresaing child length with one
    let boxNewCounter = parseInt(boxOldCounter+1);
    //getting row number
    let row = e.classList[2];
    //setting new child counter in data text of the box
    $(`#child${e.classList[1]}`).data('text',boxNewCounter);

    // Appending Body of the box with new card
    $(`#UserSaysBody${e.classList[1]}`).append(`
    <div class="col-md-12 ${counter}"  style="margin-top:3%;" id='div${counter}'>
       <div class="hypermodel-item ui-sortable-handle">
           <div style="float:left; width:80%;" class='TraningPhraseSpan ${e.classList[1]} ${row}' id="TraningPhrasediv${e.classList[1]}${boxNewCounter}" onclick="editTraningPhrase(this)" data-text="Sample text">
               <span id='TraningPhrasediv${e.classList[1]}${boxNewCounter}Span' style="font-size: 90%;" data-text='Add text here' >Add text here</span>
           </div>
           <div class="buttonClass btn ${counter} ${e.classList[1]} ${row}"  style="width:5%;color:#CD5C5C;float: right;" onclick="removeCard(this)">
               <i class="fa fa-times fa-xs" aria-hidden="true"></i>
           </div>
       </div>
    </div>
    `
    );

   //preparing json for this box
    prepareJson(e.classList[1],row);
    //Refreshing Dom
    refreshDom();
}

// when user click on tranning Phrase traning Phrase on click
function editTraningPhrase(e) {
    // toggle Model
    $('#modal-trainingPhrase').modal('toggle');
    //empty old text
    $('#addTraningPhrase').text('')
    //getting span id
    let id=e.id+'Span';
    //setting data-text in div text
    $("#text").data('text',id)

    //setting value in modal like box Number row
    $('#addTraningPhrase').val($('#'+id).data('text'));

    $('#modal-trainingPhrase').data('text',e.classList[1]);

    $('#modalContent').data('text',e.classList[2]);
}


// Adding text on Traning Phrase Span
$('#addTraning').click(function(){
    //getting the box number
    let boxNo=$('#modal-trainingPhrase').data('text');
    //getting row number
    let row=$('#modalContent').data('text');
    //getting value from modal
    let id=$('#text').data('text');
    //setting  div data-text
    $('#'+id).data('text',$('.trainingPhrase').val())
    //getting data-text value
    let text=$('#'+id).data('text');
    //checking length
    //checking if user enter some thing or not
    if(text.length >0){
        //if user enter someThing on the Model
        //checking the length of the entered text
        //if the length pf the entered text is more than the limit
        if(text.length >charactersLimitOnCard){
            //set value on the card 
        $('#' + id).text(text.slice(0,showCharactersOnCard)+(' . . .'));
    }
    else{$('#'+id).text(text);}
    }
    else{
        let text=$('#'+id).data('text','Add text here');
        $('#'+id).text('Add text here')
    }
    prepareJson(boxNo,row);
    refreshDom();
})
//#endregion
//#region
// Remove Card when user click on the cross button
function removeCard(e) {
    //getting row of the clicked button
    let row=e.classList[4];
    //removing the clicked class
    $('#'+"div"+e.classList[2]).remove();
    //preparing json the clicked box again
    prepareJson(e.classList[3],row);
    //refreshDom the dom 
    refreshDom();
}
//#endregion
// ///////////////////////////////////////////////////////////
//                     Responses                           //
////////////////////////////////////////////////////////////
//#region
// when user click on text from drop down for adding text response
function addTextResponse(e){
    //toggle the text modal
    $('#modal-text').modal('toggle');
    //emtpy old text from text area
    $('#addTextArea').val('')

    //adding row box number values on the modal
    $('#modal-text').data('text',e.classList[1])
    $('#modalContent').data('text',e.classList[2]);

    $(".dropdown").dropdown('toggle');
    //setting text 
    $('#length').text('SMS (0/0)');
}

// when user click on Image from drop down for adding Image response
function addImageResponse(e){
    //if user select the image from dropdown
    $('#img').val('')
    //toggle image modal
    $('#modal-slideright').modal('toggle');
    $('#addImage').addClass('disabled');
    //output div load selected Image
    //first of all empty old loaded image from output div
    $('#output').attr('src','')
    $('#modal-slideright').data('text',e.classList[1])
    $('#modalContent').data('text',e.classList[2]);
    $(".dropdown").dropdown('toggle');

}

// when user click on delay from drop down for adding delay response
function addDelayResponse(e){
    //toggle the delay dropdown
    $('#modal-delay').modal('toggle');
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
  let rowNo = $('#modal-text').data('text');
  let row = $('#modalContent').data('text');

  let oldCounter;
  let newCounter;

  // checking if user input something in the text area
  if($('#addTextArea').val() !== ''){
    //   getting old child counter
    oldCounter=$(`#responsesChilds${rowNo}`).data('text');
    //increasing old child counter
    newCounter=parseInt(oldCounter+1);
    // setting new counter value into the box
    $(`#responsesChilds${rowNo}`).data('text',newCounter);


    //appending responses body with new card
    $('#responsesBody'+rowNo).append(`
    <div class="col-md-12 ${counter}"  style="margin-top:3%;" id='div${counter}'>
        <div class="hypermodel-item ui-sortable-handle">
            <div style="float:left; width:70%;" class='${rowNo} ${row}' id="ResponseDiv${rowNo}${newCounter}" onclick="updateTextResponse(this)" data-text="Sample text">
                <span id='ResponseDiv${rowNo}${newCounter}Span' style="font-size: 90%;" ></span>
            </div>
            <div class="buttonClass btn ${counter} ${rowNo} ${row}" style="width:5%;color:#CD5C5C;  float: right;" onclick="removeCrad(this)">
                <i class="fa fa-times fa-xs" aria-hidden="true"></i>
            </div>
        </div>
     </div>
    `
    )

    //adding text on the responses card
    $(`#ResponseDiv${rowNo}${newCounter}Span`).data('text',$('#addTextArea').val());

    //getting user enetred text length
    let textLength=$(`#ResponseDiv${rowNo}${newCounter}Span`).data('text');

    //checking if user input more than character limit
    if(textLength.length > charactersLimitOnCard){
        //if character text length is more than characters limit
        //setting the limited characters on the card
        $(`#ResponseDiv${rowNo}${newCounter}Span`).text(textLength.slice(0,showCharactersOnCard)+(' . . .'));
    }else{
        //if text is less than 25 characters seetting the same text 
        $(`#ResponseDiv${rowNo}${newCounter}Span`).text($('#addTextArea').val())
    }
}
prepareJson(rowNo,row);
refreshDom();
// jsPlumb.repaintEverything();
})

//when user click on the add image button 
//from jquery modal
$('#addImage').click(function(e){
  counter++;

  let rowNo = $('#modal-slideright').data('text');
  let row = $('#modalContent').data('text');

  let oldCounter;
  let newCounter;
  //getting image source from the image modal 
  //source set in the loadfile() function
  let source=$('#footer').data('text');
  //checking if user load image 
  if(source !='')
  {
    //   getting old child counter
    oldCounter = $(`#responsesChilds${rowNo}`).data('text');
    //   increasing the child counter
    newCounter = parseInt(oldCounter+1);
    //   setting the new counter value in the box
    $(`#responsesChilds${rowNo}`).data('text',newCounter);


    //appending the response body with the image card
    $('#responsesBody'+rowNo).append(`
    <div class="col-md-12 ${counter}"  style="margin-top:3%;" id='div${counter}'>
        <div class="hypermodel-item ui-sortable-handle">
            <div style="float:left; width:70%;" class='${rowNo} ${row}' id="imagediv${rowNo}${newCounter}" onclick="updateImage(this)" data-text="Sample text">
                <span id='imagediv${rowNo}${newCounter}Span' data-text(${source})>  <img src=${source} width='25'  class="rounded" id='imagediv${counter}SpanImage'></span>
            </div>
            <div class="buttonClass btn ${counter} ${rowNo} ${row}" style="width:5%; color:#CD5C5C; float: right;" onclick="removeCard(this)">
                <i class="fa fa-times fa-xs" aria-hidden="true"></i>
            </div>
        </div>
     </div>
    `
    )

    $(`#imagediv${rowNo}${newCounter}Span`).data('text',source)
  }
    prepareJson(rowNo,row);
    refreshDom();
})

//when user click on add delay jquery modal button
//add time Delay on the span
$('#addDelay').click(function(){
    counter++;
    //      getting the box number and row no value from the jquery modal
    let rowNo = $('#modal-delay').data('text');
    let row = $('#modalContent').data('text');

    let oldCounter;
    let newCounter;

// checking if user input some time
  if($('#delayInput').val() !='')
  {
    //      getting old child counter value
    oldCounter = $(`#responsesChilds${rowNo}`).data('text');
    //      setting the new counter value
    newCounter = parseInt(oldCounter+1);
    //      setting new counter value on the box
    $(`#responsesChilds${rowNo}`).data('text',newCounter);
    //appending the responses body with delay card


    $('#responsesBody'+rowNo).append(`
    <div class = "col-md-12 ${counter}"  style = "margin-top:3%;" id = 'div${counter}'>
        <div class = "hypermodel-item ui-sortable-handle">
            <div style = "float:left; width:10%;">
                <i class = "fa fa-fw fa-clock-o fa-lg" aria-hidden = "true"></i>
            </div>
            <div style = "float:left; width:70%;" class = '${rowNo} ${row}' id = "delayDiv${rowNo}${newCounter}" onclick = "updateDelayResponse(this)" data-text = "Sample text">
                <span id = 'delayDiv${rowNo}${newCounter}Span' style = "font-size: 90%; padding-left:25%;" > </span>
            </div>
            <div class = "buttonClass btn ${counter} ${rowNo} ${row}" style = "width:5%;color:#CD5C5C; float: right;" onclick = "removeCard(this)">
                <i class = "fa fa-times fa-xs" aria-hidden = "true"></i>
            </div>
        </div>
     </div>
    `
    )

    //getting delay input + selected unit
    let delay = $('#delayInput').val()+" "+$('#unit').val();
    //setting data text time and unit
    $(`#delayDiv${rowNo}${newCounter}Span`).data('text',delay)
    //setting time and unit on the span of responses
    $(`#delayDiv${rowNo}${newCounter}Span`).text(delay)
  }
  prepareJson(rowNo,row);
  refreshDom();
//   jsPlumb.repaintEverything();
})  
//#endregion
// ///////////////////////////////////////////////////////////
//                UPDATE TEXT RESPONSE                     //
////////////////////////////////////////////////////////////
//#region
//adding text on modal when user click on the card of text response
function updateTextResponse(e) {
    //toggle the update text modal
    $('#modal-update').modal('toggle');
    //empty old text from modal
    $('#updateTextArea').text('')
    //getting id on which card user click
    let id = e.id+'Span';
    $("#updateRes").data('text',id)
    //setting value on the jquery modal text area
    $('#updateTextArea').val($('#'+id).data('text'))

    //      setting row and boxNo value on the jquery modal
    $('#modal-update').data('text',e.classList[0])
    $('#modalContent').data('text',e.classList[1]);

    //showing totalcharacters/sms 
    let length = parseInt($('#updateTextArea').val().length)+1;
    $('#updateLength').text(`SMS (${length} /${Math.ceil(length/oneSmsCharacterLimit)})`)
}

//when user click on the update Text button from jquery modal
$('#updateText').click(function(e){
    // getting the box and row 
    // from the jQuery modal
    let rowNo = $('#modal-update').data('text');
    let row = $('#modalContent').data('text');

    //getting card id on which user click
    let spanId =  $("#updateRes").data('text');
    $('#'+spanId).data('text',$('#updateTextArea').val())

    //setting the data text of the card what user update
    let updateText = $('#'+spanId).data('text');
    //checking user enter text length

    //checking user enterd text length and limit
    //after that set the text on the card
    //if user add nothing adding adding add text here on the card

    if(updateText.length >0){

        if(updateText.length > charactersLimitOnCard){

            $('#'+spanId).text(updateText.slice(0,showCharactersOnCard)+(' . . .'));

        }
        else{

            $('#'+spanId).text(updateText)
        }
    }else{
    $('#'+spanId).text('Add text here');
    }
    prepareJson(rowNo,row);
})
//#endregion
// ///////////////////////////////////////////////////////////
//                     UPDATE DELAY                        //
////////////////////////////////////////////////////////////
//#region
//when user click on the card of delay
function updateDelayResponse(e){
    //toggle the update dealy jquery modal
    $('#modal-updateDelay').modal('toggle');
    $('#delayInput').text('');
    //getting id on which span user click
    let id = e.id+'Span';
    //set the id on the jquery modal div #delaydiv
    $('#delayDiv').data('text',id);
    //getting text from card
    let string = $('#'+id).data('text');
    //spliting unit and the time dalay
    let splitText = string.split(" ");
    //time
    let time = splitText[0];
    //unit like minut sec and days
    let unit = splitText[1];
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
    let rowNo = $('#modal-updateDelay').data('text');
    //getting row
    let row = $('#modalContent').data('text');
    //getting the card id on which user click
    let spanId =  $("#delayDiv").data('text');
    //getting the user input and user selected unit
    $('#'+spanId).data('text',($('#updateDelayInput').val()+" "+$('#updateUnit').val()))
    //setting updated text on the span data text
    let updateText = $('#'+spanId).data('text');
    //setting the value on the span card
    $('#'+spanId).text(updateText)
    prepareJson(rowNo,row);
    // jsPlumb.repaintEverything();
})

//load image in modal
function loadImageOnTheModal(e) {
    //getting img from form
    let img = new FormData();
    //getting file from the form data
    let file = (e.target.files[0]);
    let url = destination+'/campaigns/'+myId+'/uploads';
    img.append('img',file);
    //uploading image on the server
    $("#footer").data("text"," ");
    imageAjaxCalls(url,'newImage',img)
};
//#endregion
// ///////////////////////////////////////////////////////////
//                  UPDATE IMAGE                           //
////////////////////////////////////////////////////////////
//#region
//when user click on the image card
function updateImage(e){
    //toggle the update image modal
    $('#modal-updateImage').modal('toggle');
    $('#updateImageBtn').addClass('disabled');
    //removing old loaded values from jQuery modal
    $('#updateOutput').attr('src','')
    $('#updateImage').val('')
    let id = e.id+'Span';
    //setting the span card id box number and row number 
    //values on the jquery modal box
    $('#updateImageBlock').data('text',id);
    $('#modal-updateImage').data('text',e.classList[0]);
    $('#modalContent').data('text',e.classList[1]);
}

//loading value in Update JQUery modal 
function loadUpdatedImage(e){
        //getting img from form
        let img = new FormData();
        //getting file from the form data
        let file = (e.target.files[0]);
        let url = destination+'/campaigns/'+myId+'/uploads';
        img.append('img',file);
        //uploading Updated image on the server
        $("#updateImageFooter").data("text"," ")
        imageAjaxCalls(url,'updateImage',img)
}

//when  user click on the jquery modal
$('#updateImageBtn').click(function(e){
    //getting boxNo
    let rowNo = $('#modal-updateImage').data('text');
    //getting row 
    let row = $('#modalContent').data('text');
    //getting clicked span id
    let id = $('#updateImageBlock').data('text');
    //getting updated image source from the jquery modal
    let source = $('#updateImageFooter').data('text');
    //displaying the new image on the response card new image
    $(`#${id} img`).attr('src',source)
    //preparing json of the current box
    prepareJson(rowNo,row);
})
//#endregion
// ///////////////////////////////////////////////////////////
//                         USER INPUTS                     //           
////////////////////////////////////////////////////////////
//#region
// When user select Fall Back option from dropdown button
function addFirstFallback(e){
    let boxCounter = $(`#${e.id}`).data('text');
    //toggle the jquery modal
    $('#modal-fallBack').modal('toggle');
    //empty old fallback name value
    $('#fallbackName').val('');
    //setting values on the modal
    $('#modal-fallBack').data('text',e.classList[1]);
    $('#fallbackCounter').data('text',-1);
    //sending 0 fall back
    $('#createdFallback').data('text',0)
    //fallbackParentDivid
    $('#fallbackParentDivid').data('text',e.classList[4]);
    //getting old counter
    let oldCounter = $(`#ChildCounter${e.classList[2]}`).data('text');
    //new counter
    let newCounter = parseInt(oldCounter+1);
    //modal child counter setting data text new counter after adding one 
    $('#childCounter').data('text',newCounter);
    //again updating child counter
    $(`#ChildCounter${e.classList[2]}`).data('text',newCounter);
    $('#blockContent').data('text',boxCounter)

}

function addFallback(e){
    //getting the box id
    let boxCounter = $(`#${e.id}`).data('text');
    //getting box counter data text
    $('#blockContent').data('text',boxCounter)
    //toggle the fallback modal
    $('#modal-fallBack').modal('toggle');
    //empty old fallback name value
    $('#fallbackName').val('');
    //setting box number and row values
    $('#modal-fallBack').data('text',e.classList[1]);
    $('#fallbackCounter').data('text',e.classList[2]);
    //checking if 2 classes have same name
    if(e.classList[4] !=  'btn'){   
        $('#createdFallback').data('text',e.classList[3])
        $('#fallbackParentDivid').data('text',e.classList[4])
    }
    else{
        //if 2 classes have same name send the first one class
        $('#createdFallback').data('text',e.classList[1])
        $('#fallbackParentDivid').data('text',e.classList[3])
       
    }
       //getting the old counter
       let oldCounter =  $(`#ChildCounter${e.classList[2]}`).data('text');
       //increasing the counter
       let newCounter = parseInt(oldCounter+1);
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
    let clicedBtnRow = $('#modal-fallBack').data('text');
    //next row
    let row = parseInt(clicedBtnRow)+1;
    //getting fall back name
    let fallBackName = $('#fallbackName').val();
    //user clicked fallback 
     let fallbackCounter = $('#fallbackCounter').data('text')
    //checking user enter fall back name or not
    let parent = $('#fallbackParentDivid').data('text');
    let childCounter = $('#childCounter').data('text');
    if(childCounter >9){
        childCounter = 'a'+childCounter;
    }
    //getting box counter
    let boxCounter = $('#blockContent').data('text')
    if(fallBackName != ''  ){
        addFallBack++;
        totalBoxes++;
        //checking if first fall back 
        if( fallbackCounter != -1){appendFallback(fallbackCounter, addNewBox,totalBoxes,counter,parent,childCounter)}

        else{appendFallback(clicedBtnRow, addNewBox,totalBoxes,counter,parent,childCounter)}

        if( clicedBtnRow== addNewBox){createNewFallbackBoxRow(parent,childCounter)}

        else{createNewFallbackBox(parseInt(clicedBtnRow)+1,parent,childCounter);}

        //setting title data text and value
        $(`#title${addNewBox}${totalBoxes}`).text(fallBackName);
        $(`#title${addNewBox}${totalBoxes}`).data('text',fallBackName);

        //refreshDom the DOM
        refreshDom();

        //getting delay input + selected unit
        let name = $('#fallbackName').val();
        //setting data text time and unit
        $(`#fallbackDiv${counter}Span`).data('text',name)
        //setting time and unit on the span of responses
        $(`#fallbackDiv${counter}Span`).text(name)

        //disable the button of fall back
       if($(`#fallbackDiv${counter}Span`).length){
        let id = ($(`#fallbackDiv${counter}Span`).parent().parent().parent().parent().parent().children()[1].children.dropdown.children[1].children[0].id);
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
    prepareJson(addNewBox+""+totalBoxes,row);
})
//#endregion
// ///////////////////////////////////////////////////////////
//                 UPDATE FALLBACK                         //
////////////////////////////////////////////////////////////
//#region
//adding text on modal when user click on the card of text fallBack
function updateFallbackName(e) {
    //toggle the update text modal
    $('#modal-updateFallBack').modal('toggle');
    //empty old text from modal
    $('#updateFallbackName').val('')
    //getting id on which card user click
    let id = e.id+'Span';
    $('#modal-updateFallBack').data('text',e.classList[0]);
    $("#fallback").data('text',id)
    //setting value on the jquery modal text area
    $('#updateFallbackName').val($('#'+id).data('text'))
}
//when user click on the update Text button from jquery modal
$('#updateFallback').click(function(e){
    //getting card id on which user click
    let spanId =  $("#fallback").data('text');
    let boxTitleid = $('#modal-updateFallBack').data('text');

    $('#'+spanId).data('text',$('#updateFallbackName').val())
    //setting the data text of the card what user update
    let updateText = $('#'+spanId).data('text');
    //Adding Span Text 
    $('#'+spanId).text(updateText)
    $('.modelTitle').text(updateText);
    $(`#title${boxTitleid}`).data('text',$('#updateFallbackName').val());
    $(`#title${boxTitleid}`).text($('#updateFallbackName').val());
    prepareJson(boxTitleid);
    // jsPlumb.repaintEverything();
})
//#endregion
// ///////////////////////////////////////////////////////////
//                Creating a new general box               //
////////////////////////////////////////////////////////////
//#region
function addFirstGenral(e){
    //toggle the jquery modal
    $('#modal-general').modal('toggle');
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
    let oldCounter = $(`#ChildCounter${e.classList[2]}`).data('text');
    //new counter
    let newCounter = parseInt(oldCounter+1);
    //modal child counter setting data text new counter after adding one 
    $('#childCounter').data('text',newCounter);
    //again updating child counter
    $(`#ChildCounter${e.classList[2]}`).data('text',newCounter);
}

function addGenral(e){
    //toggle the JQuery modal
    $('#modal-general').modal('toggle');
    //empty the general name
    $('#generalName').val('');
    //setting the row number in jQuery modal
    $('#modal-general').data('text',e.classList[1]);
    //setting the addNewbox and counter in generalCounter
    $('#generalCounter').data('text',e.classList[2])
    //getting the old counter
    let oldCounter = $(`#ChildCounter${e.classList[2]}`).data('text');
    //increasing the counter
    let newCounter = parseInt(oldCounter+1);
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
    let clicedBtnRow=$('#modal-general').data('text');
    //getting the generalname
    //setting next row
    let row = parseInt(clicedBtnRow)+1;
    let generalName = $('#generalName').val();
    //getting the addnew box and counter 
    let generalCounter = $('#generalCounter').data('text');
    //getting the parent
    let parent = $('#parentDivid').data('text');
    //getting the child counter from JQuery modal
    let childCounter = $('#childCounter').data('text');
    if(childCounter >9){
        childCounter = 'a'+childCounter;
    }
    let oldCounter;
    let newCounter;
    if(generalName != ''){
        //getting the old counter
        oldCounter = $(`#userInputChilds${generalCounter}`).data('text');
        //increasing the old counter
        newCounter = parseInt(oldCounter+1);
        //setting the userInputChilds data new counter
        $(`#userInputChilds${generalCounter}`).data('text',newCounter);
        //increasing total boxes
        let p;
        let child;
        totalBoxes++;

        //checking if the adding first genral
        if(generalCounter != -1){
            appendGeneral(generalCounter, addNewBox,totalBoxes,counter,newCounter,clicedBtnRow,childCounter,parent)
        }

        else if(generalCounter == -1 && totalBoxes != 1){
          appendGeneral(clicedBtnRow, addNewBox,totalBoxes,counter,newCounter,childCounter,parent)
        }
        else{
            appendGeneral(clicedBtnRow, addNewBox+1,totalBoxes,counter,newCounter,childCounter,parent)
        }

        //checking if user clicked button and row are the same
        if( clicedBtnRow== addNewBox){
            createNewGenralBoxRow(parent,childCounter);
        }
        
        else{createNewGenralBox(parseInt(clicedBtnRow)+1,parent,childCounter);
        }

        //setting the title value
        $(`#title${addNewBox}${totalBoxes}`).data('text',generalName);
        $(`#title${addNewBox}${totalBoxes}`).text(generalName);
        //getting delay input + selected unit
        let name = $('#generalName').val();
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
    refreshDom();
    prepareJson(addNewBox+""+totalBoxes,row);
    // jsPlumb.repaintEverything();
  
})
//#endregion
// ///////////////////////////////////////////////////////////
//               UPDATE GENERAL                            //
////////////////////////////////////////////////////////////
//#region
//when user click on the card
function updateGeneralName(e) {
    //toggle the update text modal
    $('#modal-updateGeneral').modal('toggle');
    //empty old text from modal
    $('#updateGeneralName').val('')
    //getting id on which card user click
    let id = e.id+'Span';
   $('#modal-updateGeneral').data('text',e.classList[0])
    $("#generaldiv").data('text',id)
    //setting value on the jquery modal text area
    $('#updateGeneralName').val($('#'+id).data('text'))
    // $(`#title${e.classList[0]}`).data('text')
}

///when user click on the update general button from the j query modal
$('#updateGeneral').click(function(e){
    //getting card id on which user click
    let spanId =  $("#generaldiv").data('text');
    let boxTitleid = $('#modal-updateGeneral').data('text');
    $('#'+spanId).data('text',$('#updateGeneralName').val())
    //setting the data text of the card what user update
    let updateText = $('#'+spanId).data('text');
    //Adding Span Text 
    $('#'+spanId).text(updateText)
    $('.generalTitleName').text(updateText);
    $(`#title${boxTitleid}`).data('text',$('#updateGeneralName').val());
    $(`#title${boxTitleid}`).text($('#updateGeneralName').val());
    prepareJson(boxTitleid);
    // jsPlumb.repaintEverything();

})
//#endregion
// ///////////////////////////////////////////////////////////
//         FUNCTION refreshDom DOM                         //
////////////////////////////////////////////////////////////
//#region
function refreshDom(){
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
//#endregion
// ///////////////////////////////////////////////////////////
//               functions for toggle and collapse         //
////////////////////////////////////////////////////////////
//#region
//toggle reponse dropdown button menu
function toggleResponseBtnMenu(e){
    $('.drop'+e.classList[5]).collapse('toggle')
    refreshDom();
}

//toggle user input dropdown button menu
function toggleUserInputBtnMenu(e){
    $('.dropdown'+e.classList[5]).collapse('toggle')
    refreshDom();
}

//toggle user say's dropdown button menu
function collapseUserSays(e){
    $('#collapse'+e.classList[3]).collapse('toggle')
    refreshDom();

}

//collapse Responses Body
function collapseResponses(e){
    $('.responses'+e.classList[3]).collapse('toggle')
    refreshDom();

}

//collapse UserInput Body
function colapseUserInputs(e){
    $('#userInput'+e.classList[3]).collapse('toggle')
    refreshDom();
}

// button drop down
$(".dropdown").dropdown();

// collapase UserSays Body
$('#UserSays').collapse('show')

//collapase User says body
$('#dynamicUserSays').collapse('show')

//User Responses Body
$('#responses').collapse('show')

//User Input Body
$('#userInput').collapse('show')

//Collapse button of User Says
$('#colapse').click(function(){
    $('#UserSays').collapse('toggle')
    refreshDom();
})

//toggle user says
$('#dynamicColapse').click(function(){
    $('#dynamicUserSays').collapse('toggle');
    refreshDom();
})

// collapse Responses Button
$('#colapseResponses').click(function(){
    $('#responses').collapse('toggle');
    refreshDom();
})

// collapse User Input Button
$('#colapseUserInputs').click(function(){
    $('#userInput').collapse('toggle')
  
})
//#endregion
// ///////////////////////////////////////////////////////////
//               Append UserInput Body Card                //
////////////////////////////////////////////////////////////
//#region
//appending genralcard 
function appendGeneral(genCounter, addnewBox,totalboxes,count,newCounter,clicedBtnRow,childCounter,parent){
    let gen = 0;
    if(genCounter == 0){
        //in this case childcounter is parent actually
        //in this case clicedBtnRow is child counter Actually
        gen = childCounter+''+clicedBtnRow;
    }
    
    else{
       //parent is the parent class
       //child counter is the appended child number
       gen=parent+''+childCounter;
    }
   if(addNewBox != clicedBtnRow){
    $('#userInputBody'+genCounter).append(`
    <div class = "col-md-12 ${addnewBox}"  style = "margin-top:3%;" id = 'div${count}' >
        <div class = "hypermodel-item ui-sortable-handle" data-target = '${totalboxes}'>
            <div style = "float:left; width:80%;" id = "generalDiv${addnewBox}${totalboxes}" class = '${addnewBox}${totalboxes} parent' onclick = "updateGeneralName(this)" data-text = "Sample text">
                <span id = 'generalDiv${addnewBox}${totalboxes}Span' style = "font-size: 90%; " > </span>
            </div>
            <div class = "buttonClass btn ${count} btnbtn ${gen} ${addNewBox} genral" id = 'Remove${gen}' style = "width:5%;color:#CD5C5C; float: right;" onclick="removeBoxes(this)">
                <i class = "fa fa-times fa-xs" aria-hidden="true"></i>
            </div>
        </div>
     </div>
     <div id = 'parentSpanId${genCounter}'></div>
     <div id = 'gCount${genCounter}'></div>
     <div id = 'gCount${clicedBtnRow}${newCounter}'></div>
    `
    )
    refreshDom();  
   }
   else{
       let newBox = parseInt(addnewBox+1)
        $('#userInputBody'+genCounter).append(`
        <div class = "col-md-12 ${addnewBox}"  style = "margin-top:3%;" id = 'div${count}' >
            <div class = "hypermodel-item ui-sortable-handle" data-target = '${totalboxes}'>
                <div style = "float:left; width:80%;" id = "generalDiv${newBox}${totalboxes}" class = '${newBox}${totalboxes} parent' onclick = "updateGeneralName(this)" data-text = "Sample text">
                    <span id = 'generalDiv${newBox}${totalboxes}Span' style = "font-size: 90%; " > </span>
                </div>
                <div class = "buttonClass btn ${count} btnbtn ${gen} ${newBox} genral" id = "Remove${gen}" style = "width:5%;color:#CD5C5C; float: right;" onclick = "removeBoxes(this)">
                    <i class = "fa fa-times fa-xs" aria-hidden = "true"></i>
                </div>
            </div>
        </div>
        <div id = 'parentSpanId${addNewBox}${newCounter}'></div>
        <div id = 'gCount${genCounter}'></div>
        <div id = 'gCount${clicedBtnRow}${newCounter}'></div>
        `
        )
   }
   $(`parentSpanId${addNewBox}${newCounter}`).data('text',gen);
   $(`#gCount${genCounter}`).data('text',gen);
   $(`#gCount${clicedBtnRow}${newCounter}`).data('text',totalBoxes)

}

//appending fallback card
function appendFallback(fallCounter, addnewBox,totalboxes,count,parent,childCounter){
    let c=parent+''+childCounter;
    $('#userInputBody'+fallCounter).append(`
    <div class="col-md-12 ${addnewBox}"  style="margin-top:3%;" id='div${count}' >
        <div class="hypermodel-item ui-sortable-handle" data-target='${totalboxes}'>
            <div style="float:left; width:80%;" id="fallbackDiv${count}" class='${addnewBox+1}${totalBoxes}' onclick="updateFallbackName(this)" data-text="Sample text">
                <span id='fallbackDiv${count}Span' style="font-size: 90%; " > </span>
            </div>
            <div class="buttonClass btn ${count} ${addnewBox} ${c} fallback" id='Remove${c}' style="width:5%;color:#CD5C5C; float: right;" onclick="removeBoxes(this)">
                <i class="fa fa-times fa-xs" aria-hidden="true"></i>
            </div>
        </div>
     </div>
     <div id='fallCount'></div>
    `
    )
    $('#fallCount').data('text',c);
}
//#endregion
// ///////////////////////////////////////////////////////////
//               Delete Boxes and and Lines from DOM       //
////////////////////////////////////////////////////////////
//#region
function removeBoxes(e){
    //getting all hypermodal appended classes
    let classarray = $('.hypermodel-grid')
    .map(function() { return this.classList[1];  })
    .get(); //ToArray
    //checking on which class user click 
    //classes start with this class
    let removeClasses = classarray.filter(num=>num.startsWith(e.classList[4]));
    //getting parent id 
     let parentId = e.parentNode.parentNode.parentNode.id;
    //removing elements
    let id = (e.parentNode.children[0].id);
    let secoundId = ($(`#${id}Span`).parent().parent().parent().parent().parent().children()[1].children.dropdown.children[1].children[0].id)
    $(`#${secoundId}`).removeClass('disabled');
    let oldDeleteCount = localStorage.getItem('DeleteChilds');
    let newDeleteCount = parseInt(oldDeleteCount)+removeClasses.length;
    localStorage.setItem('DeleteChilds',newDeleteCount);
    for(let i=0; i<removeClasses.length; i++){
        deleteJson(removeClasses[i]);
        jsPlumb.remove(`Remove${removeClasses[i]}`);
        $('.'+removeClasses[i]).remove();
        //getting disable button id
    }
    $('#'+"div"+e.classList[2]).remove();
    refreshDom();
    // jsPlumb.repaintEverything();
}
//#endregion
// ///////////////////////////////////////////////////////////
//               Prepare JSON and delete JSON              //
////////////////////////////////////////////////////////////
//#region
function prepareJson(boxno,row){
    //sending row no
    let totalChilds = $(`#colum${row}`).children()
    let boxNo = []
    for (const i of totalChilds) {
        if(i.classList.length !== 0){
            boxNo.push(i.classList)
        }
    }
    let counts = 0;
    let responses = 0;
    let id = '';
    let parent = '';
    let isFallback = '';
    let trainingPhrase = [];
    let response = [];
    let name = '';
    let obj = {}
    let responsesObject = [];
    let payload = [];
    //total appended child counts
    counts = $(`#child${boxno}`).data('text');
    //getting responses childs
    responses = ($(`#responsesChilds${boxno}`).data('text'));
    //getting box id
    id = $(`#id${boxno}`).data('text');
    //getting box parent
    parent = $(`#parent${boxno}`).data('text');
    //getting is fallback
    isFallback = $(`#isFallback${boxno}`).data('text');
    //getting box title
    name = $(`#title${boxno}`).data('text');
    //traning Phrases data
    for(let traningPhrase=0; traningPhrase<=counts;traningPhrase++){
        //checking if given traning Phrase id exists
         if($(`#TraningPhrasediv${boxno}${traningPhrase}Span`).length){
             //pushing traning phrases into the traningPhrase array
            trainingPhrase.push($(`#TraningPhrasediv${boxno}${traningPhrase}Span`).data('text'));
         }
    }
    //responses 
    for(let res=0; res<=responses; res++){
        //creating new response Object
        responsesObject[res] = new Object();
        //creating new pay load object
        payload[res] = new Object();
        //checking if response div id exists
        if($(`#ResponseDiv${boxno}${res}Span`).length){
            //setting response data type text
            responsesObject[res].type = 'text'
            //responses data pushing
            responsesObject[res].payload = $(`#ResponseDiv${boxno}${res}Span`).data('text');
            //pushing data into the response array
            response.push(responsesObject[res])
        }
        //cehcking if given id exists or not 
        if($(`#imagediv${boxno}${res}Span`).length){
            //setting the pay load type
            responsesObject[res].type = 'image'
            //getting the image source
            responsesObject[res].payload = $(`#imagediv${boxno}${res}Span`).data('text');
            //pushing data into the response array
            response.push(responsesObject[res])
        }
        //checking delay div
        if($(`#delayDiv${boxno}${res}Span`).length){
            //setting delay type
            responsesObject[res].type = 'delay'
            //getting text of delay
            let string = $(`#delayDiv${boxno}${res}Span`).data('text');
            //splitting text on the base of space ...
            let splitText = string.split(" ");
            //getting unit
            let unit = splitText[1];
            //getting duration
            let duration = splitText[0];
            payload[res].duration = duration;
            payload[res].unit = unit[0];
            responsesObject[res].payload = payload[res];
            response.push(responsesObject[res]);
        }
    }
    parent = parent.toString();
    obj.trainingPhrases = trainingPhrase;
    obj.responses = response;
    obj.id = id
    obj.parent = parent;
    obj.isFallback = isFallback;
    obj.name = name;
    obj.boxNo = boxno;
    obj.row = row;
    //finding the array index
    let foundIndex = JsonArray.findIndex(x => obj.id == x.id);
    //if no index found push the object at new index
    if(foundIndex == -1){
        JsonArray.push(obj)
    }
    //if object found than pushing object at the index
    else{
        JsonArray[foundIndex] = obj;
    }
    if(json == '0'){
        createFirstCampaign();
    }
    else{
        createCampaign1();
    }
   
}

function loadFirstBoxJson(){
    let compaignNumber = $('#number').find(":selected").val();
    //if user selected any campaign Number
    if(compaignNumber !='2'){
        prepareJson('00','0')
    }
    $.getJSON('../../config.json',function(data){
        frontEndUrl = data.frontEndUrl;
    })
}

function deleteJson(id){
    //finding the object index
    let foundIndex = JsonArray.findIndex(x => id == x.id);
    //if index found
    if(foundIndex != -1){
        //deleting the object
        JsonArray.splice(foundIndex,1);
    }
    createCampaign1();
}
//#endregion
// ///////////////////////////////////////////////////////////
//               AJAX Calls                                //
////////////////////////////////////////////////////////////
//#region
let myId;
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
            myId = response.campaign._id;
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
function finishEditing(){
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
function imageAjaxCalls(url,type,img){
    $.ajax({
        url: url,
        type: 'post',
        headers: {"Authorization": "Bearer "+localStorage.getItem("token"),"Accept":"text"},
        data: img,
        contentType: false,
        processData: false,
        success: function(response){
            if(type == 'updateImage'){
                //setting the updated values 
                $('#updateOutput').attr('src',response.imageUrl);
                $("#updateImageFooter").data("text",response.imageUrl);
                //removing the disable class from the button 
                $('#updateImageBtn').removeClass('disabled')
            }
            else if(type == 'newImage'){
                //setting values of image 
                $('#output').attr('src',response.imageUrl);
                $("#footer").data("text",response.imageUrl);

                //Removing Disable class from the button
                $('#addImage').removeClass('disabled');
                $('#updateImageBtn').removeClass('disabled')
            }
         
        },
    });
}
//#endregion
// ///////////////////////////////////////////////////////////
//               Zoom IN Zoom Out DOM                      //
////////////////////////////////////////////////////////////
//#region

function zoomIn(){
    if(zoom <0){
        zoom++;
        $('.hypermodel-column').width(
            $(".hypermodel-column").width() / zoomWidthIncreaseDescrease
        )
        refreshDom();
    }
}

function  zoomOut() {
    if(zoom > -2){
        zoom--;
        $('.hypermodel-column').width(
            $(".hypermodel-column").width() * zoomWidthIncreaseDescrease
        )
        refreshDom();
    }

}

//#endregion
// ///////////////////////////////////////////////////////////
//               Word counter                              //
////////////////////////////////////////////////////////////
//#region
function wordCounter(){
    let length = $('#addTextArea').val().length;
    let newLength = parseInt(length)+1;
  
    $('#length').text(`SMS (${newLength} / ${Math.ceil(newLength/oneSmsCharacterLimit)})`);
}

function updateWordCounter(){
    let length = $('#updateTextArea').val().length;
    let newLength = parseInt(length)+1;
    $('#updateLength').text(`SMS (${newLength} / ${Math.ceil(newLength/oneSmsCharacterLimit)})`);
}
//#endregion
// ///////////////////////////////////////////////////////////
//               JSPlumb Create Lines                      //
////////////////////////////////////////////////////////////
//#region
function createLine(parent,child){
       if($(`#${parent}`).length && $(`#${child}`).length){
            let container = $("#AppendDiv");
            jsPlumb.setContainer(container);
            let e1 = jsPlumb.addEndpoint(child, {
                connectionType:"basic",
                width:5,
                isSource:true,
                anchor: "LeftMiddle",
                endpoint:[ "Dot", { radius:2}],
                connector: ["Bezier", { curviness: 90 }]
                }); 
                
                let e2 = jsPlumb.addEndpoint(parent, {
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
//#endregion
