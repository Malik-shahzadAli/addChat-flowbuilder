//counters 
var counter = 0;
var addNewBox = 0;
var addFallBack = 0;
var totalBoxes = 0;
var count = 0;

//const veriables
let zoomWidthIncreaseDescrease;
let charactersLimitOnCard;
let showCharactersOnCard;
let oneSmsCharacterLimit

//Json Array 
var JsonArray = [];

//getting clicked campaign id From URL
var myid = localStorage.getItem('id');
let searchParams = new URLSearchParams(window.location.search)
var id = searchParams.get('id')

var appUrl;

// button drop down

function addnewTraningPhaseCard(e){
    counter++;
    var boxOldCounter = $(`#child${e.classList[1]}`).data('text');
    var boxNewCounter = parseInt(boxOldCounter+1);
    //e.classList[1] give us the box No
    $(`#child${e.classList[1]}`).data('text',boxNewCounter);
    $(`#UserSaysBody${e.classList[1]}`).append(`
    <div class="col-md-12 ${counter}"  style="margin-top:3%;" id='div${counter}'>
       <div class="hypermodel-item ui-sortable-handle">
           <div style="float:left; width:80%;" class='TraningPhaseSpan ${e.classList[1]}' id="TraningPhasediv${e.classList[1]}${boxNewCounter}" onclick="editTraningPhrase(this)" data-text="Sample text">
               <span id='TraningPhasediv${e.classList[1]}${boxNewCounter}Span' style="font-size: 90%;" data-text='Add text here' >Add text here</span>
           </div>
           <div class="buttonClass btn ${counter} ${e.classList[1]}"  style="width:5%;color:#CD5C5C;float: right;" onclick="removeCard(this)">
               <i class="fa fa-times fa-xs" aria-hidden="true"></i>
           </div>
       </div>
    </div>
    `
    );
    refreshDom();
prepareJson(e.classList[1],0);

}
// traning phase on click
function editTraningPhrase(e) {
    // toggle Model
    jQuery('#modal-trainingPhase').modal('toggle');
    //empty old text
    $('#addTraningPhase').text('')
    //getting span id
    var id = e.id+'Span';
    //setting data-text in div text
    $("#text").data('text',id)
    //setting value in modal
    $('#addTraningPhase').val($('#'+id).data('text'));
    $('#modal-trainingPhase').data('text',e.classList[1]);
}
// Adding text on Traning Phase Span
$('#addTraning').click(function(){
    var boxNo = $('#modal-trainingPhase').data('text');
    //getting value from modal
    var id = $('#text').data('text');
    //setting  div data-text
    $('#'+id).data('text',$('.trainingPhase').val())
    //getting data-text value
    var text = $('#'+id).data('text');
    //checking length
    if(text.length >0){
        if(text.length >charactersLimitOnCard){
        $('#'+id).text(text.slice(0,showCharactersOnCard)+(' . . .'));
    }
    else{
        $('#'+id).text(text);
    }
    }
    else{
        var text = $('#'+id).data('text','Add text here');
        $('#'+id).text('Add text here')
    }
    prepareJson(boxNo,0);
    refreshDom();
})


// removeCard Code
function removeCard(e) {
    //removing the div${counter}
    $('#'+"div"+e.classList[2]).remove();
    //preparing json again
    prepareJson(e.classList[3],0);
    //refreshDom the dom again
    refreshDom();
}
// //////////////////////////////////////////////////////////////////////////////////
//                                 Responses                                      //
///////////////////////////////////////////////////////////////////////////////////
function addTextResponse(e){

    //toggle the text modal
    jQuery('#modal-text').modal('toggle');
    //emtpy old text from text area
    $('#addTextArea').val('')
    //adding row into the modal text
    $('#modal-text').data('text',e.classList[1])

    $(".dropdown").dropdown('toggle');
    $('#length').text('SMS (0/0)');
}
function addImageResponse(e){
    //if user select the image from dropdown
    $('#img').val('')
    //toggle image modal
    jQuery('#modal-slideright').modal('toggle');
    $('#addImage').addClass('disabled');
    //output div load selected Image
    //first of all empty old loaded image from output div
    $('#output').attr('src','')
    $('#modal-slideright').data('text',e.classList[1])
    $(".dropdown").dropdown('toggle');

}
function addDelayResponse(e){
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
     oldCounter = $(`#responsesChilds${rowNo}`).data('text');
     newCounter = parseInt(oldCounter+1);
    $(`#responsesChilds${rowNo}`).data('text',newCounter);
    //appending responses body with new card
    $('#responsesBody'+rowNo).append(`
    <div class="col-md-12 ${counter}"  style="margin-top:3%;" id='div${counter}'>
        <div class="hypermodel-item ui-sortable-handle">
            <div style="float:left; width:70%;" class='${rowNo}' id="ResponseDiv${rowNo}${newCounter}" onclick="updateTextResponse(this)" data-text="Sample text">
                <span id='ResponseDiv${rowNo}${newCounter}Span' style="font-size: 90%;" ></span>
            </div>
            <div class="buttonClass btn ${counter} ${rowNo}" style="width:5%;color:#CD5C5C;  float: right;" onclick="removeCard(this)">
                <i class="fa fa-times fa-xs" aria-hidden="true"></i>
            </div>
        </div>
     </div>
    `
    )
    //adding text on the responses card
    $(`#ResponseDiv${rowNo}${newCounter}Span`).data('text',$('#addTextArea').val())
    //user input text length
    var textLength = $(`#ResponseDiv${rowNo}${newCounter}Span`).data('text');
    // $(`#addTextArea`).keypress(function(){
    //     console.log('text length :'+textLength.length);
    //     // $("span").text(i += 1);
    //   });
      $("#addTextArea").on("keydown", function(e){
          console.log('here')
      });
    //checking if user input more than charactersLimitOnCard characters
    if(textLength.length > charactersLimitOnCard){
        //adding showCharactersOnCard characters on the card and 3 dots
        $(`#ResponseDiv${rowNo}${newCounter}Span`).text(textLength.slice(0,showCharactersOnCard)+(' . . .'));
    }else{
        //if text is less than charactersLimitOnCard characters seetting the same text 
        $(`#ResponseDiv${rowNo}${newCounter}Span`).text($('#addTextArea').val())
    }
}
refreshDom();
prepareJson(rowNo,0)
})
//when user click on the add image button 
//from jquery modal
$('#addImage').click(function(e){
  counter++;
  var rowNo = $('#modal-slideright').data('text');
  var oldCounter;
  var newCounter;
  //getting image source from the image modal 
  //source set in the loadImageOnTheModal() function
  var source = $('#footer').data('text');
  //checking if user load image 
  if(source !='')
  {
    oldCounter = $(`#responsesChilds${rowNo}`).data('text');
    newCounter = parseInt(oldCounter+1);
    $(`#responsesChilds${rowNo}`).data('text',newCounter);
    //appending the response body with the image card
    $('#responsesBody'+rowNo).append(`
    <div class="col-md-12 ${counter}"  style="margin-top:3%;" id='div${counter}'>
        <div class="hypermodel-item ui-sortable-handle">
            <div style="float:left; width:70%;" class='${rowNo}' id="imagediv${rowNo}${newCounter}" onclick="updateImage(this)" data-text="Sample text">
                <span id='imagediv${rowNo}${newCounter}Span' data-text(${source})>  <img src=${source} width='25'  class="rounded" id='imagediv${counter}SpanImage'></span>
            </div>
            <div class="buttonClass btn ${counter} ${rowNo}" style="width:5%; color:#CD5C5C; float: right;" onclick="removeCard(this)">
                <i class="fa fa-times fa-xs" aria-hidden="true"></i>
            </div>
        </div>
     </div>
    `
    )
    $(`#imagediv${rowNo}${newCounter}Span`).data('text',source)
  }
  refreshDom();
  prepareJson(rowNo,0)
})
//when user click on add delay jquery modal button
//add time Delay on the span
$('#addDelay').click(function(){
counter++;
var rowNo = $('#modal-delay').data('text');
var oldCounter;
var newCounter;
// checking if user input some time
  if($('#delayInput').val() !='')
  {
    oldCounter = $(`#responsesChilds${rowNo}`).data('text');
    newCounter = parseInt(oldCounter+1);
    $(`#responsesChilds${rowNo}`).data('text',newCounter);
    //appending the responses body with delay card
    $('#responsesBody'+rowNo).append(`
    <div class = "col-md-12 ${counter}"  style="margin-top:3%;" id='div${counter}'>
        <div class="hypermodel-item ui-sortable-handle">
            <div style="float:left; width:10%;">
                <i class="fa fa-fw fa-clock-o fa-lg" aria-hidden="true"></i>
            </div>
            <div style="float:left; width:70%;" class='${rowNo}' id="delayDiv${rowNo}${newCounter}" onclick="updateDelayResponse(this)" data-text="Sample text">
                <span id='delayDiv${rowNo}${newCounter}Span' style="font-size: 90%; padding-left:25%;" > </span>
            </div>
            <div class="buttonClass btn ${counter} ${rowNo}" style="width:5%;color:#CD5C5C; float: right;" onclick="removeCard(this)">
                <i class="fa fa-times fa-xs" aria-hidden="true"></i>
            </div>
        </div>
     </div>
    `
    )
    //getting delay input + selected unit
    var delay = $('#delayInput').val()+" "+$('#unit').val();
    //setting data text time and unit
    $(`#delayDiv${rowNo}${newCounter}Span`).data('text',delay)
    //setting time and unit on the span of responses
    $(`#delayDiv${rowNo}${newCounter}Span`).text(delay)
  }
  refreshDom();
  prepareJson(rowNo,0)
})  

                                                    ///////////////////
                                                   //  UPDATE TEXT  //
                                                  ///////////////////

//adding text on modal when user click on the card of text response
function updateTextResponse(e) {
    //toggle the update text modal
    jQuery('#modal-update').modal('toggle');
    //empty old text from modal
    $('#updateTextArea').text('')
    //getting id on which card user click
    var id = e.id+'Span';
    $("#updateRes").data('text',id)
    //setting value on the jquery modal text area
    $('#updateTextArea').val($('#'+id).data('text'))
    $('#modal-update').data('text',e.classList[0])
   var newLength = $('#updateTextArea').val().length;
   $('#updateLength').text(`SMS (${newLength} / ${Math.ceil(newLength/oneSmsCharacterLimit)})`);
}
//when user click on the update Text button from jquery modal
$('#updateText').click(function(e){
    var rowNo = $('#modal-update').data('text');
    //getting card id on which user click
    var spanId =  $("#updateRes").data('text');
    $('#'+spanId).data('text',$('#updateTextArea').val())
    //setting the data text of the card what user update
    var updateText = $('#'+spanId).data('text');
    //checking user enter text length
    if(updateText.length >0){
        if(updateText.length > charactersLimitOnCard){
            $('#'+spanId).text(updateText.slice(0,showCharactersOnCard)+(' . . .'));
        }else{
            $('#'+spanId).text(updateText)
        }
    }else{
    $('#'+spanId).text('Add text here');
    }
    refreshDom();
    prepareJson(rowNo,0)
})
                                                    /////////////////
                                                   // UPDATE DELAY//
                                                  /////////////////

//when user click on the card of delay
function updateDelayResponse(e){
    //toggle the update dealy jquery modal
    jQuery('#modal-updateDelay').modal('toggle');
    $('#delayInput').text('');
    //getting id on which span user click
    var id = e.id+'Span';
    //set the id on the jquery modal div #delaydiv
    $('#delayDiv').data('text',id);
    //getting text from card
    var string = $('#'+id).data('text');
    //spliting unit and the time dalay
    var splitText = string.split(" ");
    //time
    var time = splitText[0];
    //unit like minut sec and days
    var unit = splitText[1];
    //setting the input field value 
    $('#updateUnit').val(unit)
    //setting unit value on the jquery modal
    $('#updateDelayInput').val(time);
    $('#modal-updateDelay').data('text',e.classList[0])
}
//when user click on the update delay button from jquery modal
$('#updateDelay').click(function(e){
    var rowNo = $('#modal-updateDelay').data('text');
    //getting the card id on which user click
    var spanId =  $("#delayDiv").data('text');
    //getting the user input and user selected unit
    $('#'+spanId).data('text',($('#updateDelayInput').val()+" "+$('#updateUnit').val()))
    //setting updated text on the span data text
    var updateText = $('#'+spanId).data('text');
    //setting the value on the span card
    $('#'+spanId).text(updateText)
    prepareJson(rowNo,0)
})
//load image in modal
function loadImageOnTheModal(e) {
    // $('#addImage').addClass('disabled')
    //checking campaign id 
    // console.log('campaign id :'+myid);
    //getting img from form
    var img = new FormData();
    //getting file from the form data
    var file = (e.target.files[0]);
    let url = destination+'/campaigns/'+myid+'/uploads'
    img.append('img',file);
    //uploading image on the server
    $("#footer").data("text"," ")
    imageAjaxCalls(url,'newImage',img)
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
    var id = e.id+'Span';
    // var src = $('#'+id).text();
    $('#updateImageBlock').data('text',id);
    $('#modal-updateImage').data('text',e.classList[0]);
}
//loading value in Update JQUery modal 
function loadUpdatedImage(e){
    //getting img from form
    var img = new FormData();
    //getting file from the form data
    var file = (e.target.files[0]);
    let url = destination+'/campaigns/'+myid+'/uploads';

    img.append('img',file);
    $("#updateImageFooter").data("text"," ")

    //uploading image on the server
    imageAjaxCalls(url,'updateImage',img)


}

//when  user click on the jquery modal
$('#updateImageBtn').click(function(e){
    var rowNo = $('#modal-updateImage').data('text')
    //getting clicked span id
    var id = $('#updateImageBlock').data('text');
    //getting updated image source from the jquery modal
    var source = $('#updateImageFooter').data('text');
    //setting new image
    $(`#${id} img`).attr('src',source)
    prepareJson(rowNo,0)
})
/////////////////////////////////////////////////////////////////////////////////////
//                         USER INPUTS                                            //           
///////////////////////////////////////////////////////////////////////////////////
// When user select Fall Back option from dropdown button
function addFallback1(e){
    // console.log(e.parentNode.parentNode.parentNode.parentNode.children[0].children.length)
    var boxCounter = $(`#${e.id}`).data('text');
   // var addCounter = parseInt(boxCounter+1);
    $('#blockContent').data('text',boxCounter)
    // console.log($(`#${e.id}`).data('text'));
    jQuery('#modal-fallBack').modal('toggle');
    $('#fallbackName').val('');
    $('#modal-fallBack').data('text',e.classList[1]);
    $('#fallbackCounter').data('text',e.classList[2]);
   // console.log('Fall counter :'+$('#fallbackCounter').data('text'))
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
      // var oldCounter= $(`#ChildCounter${e.classList[2]}`).data('text');
      var oldCounter = e.parentNode.parentNode.parentNode.parentNode.children[0].children.length;
       //increasing the counter
       var newCounter = parseInt(oldCounter+1);
       //updating counter
       $(`#ChildCounter${e.classList[2]}`).data('text',newCounter);
       //jQuery modal childcounter adding
       $('#childCounter').data('text',newCounter); 
    // $('#fallbackParentDivid').data('text',e.classList[5])
        //setting the parent div root1..etc in the parent div id 
        
    
}
//when user click on add fallback button
$('#addFallback').click(function(){
    // console.log($('#fallbackCounter').data('text'))
    // increasing counter
    counter++;
    //getting the row
    var clickedBtnRow = $('#modal-fallBack').data('text');
    //getting fall back name
    var fallBackName = $('#fallbackName').val();
    //user clicked fallback 
     var fallbackCounter = $('#fallbackCounter').data('text')
    //checking user enter fall back name or not
    var parent = $('#fallbackParentDivid').data('text');
    var childCounter = $('#childCounter').data('text');
    //getting box counter
    var boxCounter = $('#blockContent').data('text')
    if(fallBackName != ''  ){
        let searchParams = new URLSearchParams(window.location.search)
        var urlId = searchParams.get('id')
        $.ajax({
            url: destination+'/campaigns/'+urlId,
            type:"GET",
            headers: {"Authorization": "Bearer "+localStorage.getItem("token")},
            dataType: 'json',
            contentType: "application/json",
            success : function(response){
                addFallBack++;
                //checking same id exists or not
                const a = _.groupBy(response.campaign.flowJSON,'parent');
                if(a[parent]){
                    var oldChildCounter = a[parent].length;
                    var childCounter = parseInt(oldChildCounter)+1;
                }
                else{
                    childCounter = 1;
                }
                var foundIndex = response.campaign.flowJSON.findIndex(x => parent+''+childCounter == x.id);
                //if exists
                if(foundIndex !=-1){
                    //call a Resursive function which return the counter and new id
                    if(childCounter >9){
                        childCounter = 'a'+childCounter;
                    }
                    var arr= Recursion(childCounter,parent,response.campaign.flowJSON)
                    //setting new id
                    var newId = parent+''+arr[0];
                    //adding how many time resursive function call
                    totalBoxes = totalBoxes+arr[1];
                    //again count 0
                    count = 0;
                    CreatingFallBackAfterCheckingDuplicateId(parent,arr[0],clickedBtnRow,newId,fallbackCounter,fallBackName)
                    // CreatingGeneralBoxAfterCheckingDuplicateId(newId,parent,clickedBtnRow,addNewBox,totalBoxes,generalName,arr[0]) ;
                    
                }
                else{
                    totalBoxes++;
                    if(childCounter >9){
                        childCounter='a'+childCounter;
                    }
                    var id = parent+''+childCounter;
                    CreatingFallBackAfterCheckingDuplicateId(parent,childCounter,clickedBtnRow,id,fallbackCounter,fallBackName)
                    // CreatingGeneralBoxAfterCheckingDuplicateId(id,parent,clickedBtnRow,addNewBox,totalBoxes,generalName,childCounter)
                }
         
               // addGeneralCard(generalCounter,totalBoxes,parent,childCounter,generalName,counter,nBox)
                
               
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
        //getting the old counter
        oldCounter = $(`#userInputChilds${generalCounter}`).data('text');
        //increasing the old counter
        newCounter = parseInt(oldCounter+1);
        $(`#userInputChilds${generalCounter}`).data('text',newCounter);  
    }
    
})
//checking duplicate id
function CreatingFallBackAfterCheckingDuplicateId(parent,childCounter,clickedBtnRow,newId,fallbackCounter,fallBackName){
    if( fallbackCounter != -1){
        if(clickedBtnRow == addNewBox){var newBox = parseInt(addNewBox)+1;}
        else{var newBox=addNewBox;}
        appendFallback1(fallbackCounter, newBox,totalBoxes,counter,parent,childCounter)
    }
    else{
        if(clickedBtnRow == addNewBox){var newBox = parseInt(addNewBox)+1;}
        else{var newBox = addNewBox;}
        appendFallback1(clickedBtnRow, newBox,totalBoxes,counter,parent,childCounter)
    }
    if( clickedBtnRow == addNewBox){
        box = parseInt(addNewBox)+1+''+totalBoxes
        createNewFallbackBoxRow(parent,childCounter,box,newId);
        refreshDom();
        var newbox = parseInt(addNewBox)+1;
        //add class on general dropdown
        $(`#genDropdown${newbox}`).addClass(parent+counter);
       
    }
    else{
        box = addNewBox+''+totalBoxes;
        createNewFallbackBox(parseInt(clickedBtnRow)+1,parent,childCounter,box,newId);
        refreshDom();
        $(`#genDropdown${addNewBox}`).addClass(parent+counter);
        
    }

    $(`#title${box}`).text(fallBackName);
    $(`#title${box}`).data('text',fallBackName);
    refreshDom();
    //getting delay input + selected unit
    var name = $('#fallbackName').val();
    //setting data text time and unit
    $(`#fallbackDiv${counter}Span`).data('text',name)
    //setting time and unit on the span of responses
    $(`#fallbackDiv${counter}Span`).text(name)
    //console.log($(`#fallbackDiv${boxCounter}Span`))
   // console.log($(`#fallbackDiv${boxCounter}Span`).parent().parent().parent().parent().parent().children()[1])
   if($(`#fallbackDiv${counter}Span`).length){
    var id = ($(`#fallbackDiv${counter}Span`).parent().parent().parent().parent().parent().children()[1].children.dropdown.children[1].children[0].id);
    //disable the fall back button
    $('#'+id).addClass('disabled');
   }
   else{
    $(`#fallDropdown${boxCounter}`).addClass('disabled')
    //    console.log('this is the box counter :'+boxCounter);
   }
    // $(`#fallbackDiv${counter}Span`).parent().parent().parent().parent().parent().children()[1].children.dropdown.children[1].children[0]('a').addClass('disabled')
    //puting name on the box
    $('.modelTitle').text(name);
    //add class in fallDropdown
     $(`#fallDropdown${totalBoxes}`).addClass(parent+counter);
    // //add class on general dropdown
    // $(`#genDropdown${addNewBox}`).addClass(parent+counter);
    $(`#parent${box}`).data('text',parent);
    $(`#id${box}`).data('text',newId);
    prepareJson(box,clickedBtnRow);

}


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
    var id = e.id+'Span';
    $('#modal-updateFallBack').data('text',e.classList[0]);
    $("#fallback").data('text',id)
    //setting value on the jquery modal text area
    $('#updateFallbackName').val($('#'+id).data('text'))
}
//when user click on the update Text button from jquery modal
$('#updateFallback').click(function(e){
    //getting card id on which user click
    var spanId =  $("#fallback").data('text');
    var boxTitleid = $('#modal-updateFallBack').data('text');

    $('#'+spanId).data('text',$('#updateFallbackName').val())
    //setting the data text of the card what user update
    var updateText = $('#'+spanId).data('text');
    //Adding Span Text 
    $('#'+spanId).text(updateText)
    $('.modelTitle').text(updateText);
    $(`#title${boxTitleid}`).data('text',$('#updateFallbackName').val());
    $(`#title${boxTitleid}`).text($('#updateFallbackName').val());
    prepareJson(boxTitleid,0);
})

/////////////////////////////////
// Creating a new general box //
///////////////////////////////
function addGenral(e){
    // console.log()
    //toggle the JQuery modal
    jQuery('#modal-general').modal('toggle');
    //empty the general name
    $('#generalName').val('');
    //setting the row number in jQuery modal
    $('#modal-general').data('text',e.classList[1]);
    //setting the addNewbox and counter in generalCounter
    $('#generalCounter').data('text',e.classList[2])
    //getting the old counter
    var oldCounter = e.parentNode.parentNode.parentNode.parentNode.children[0].children.length;
    // var oldCounter =  $(`#ChildCounter${e.classList[2]}`).data('text');
    // console.log('This is the old Counter :'+oldCounter);
    //increasing the counter
    // console.log(e.parentNode.parentNode.parentNode.parentNode.children[0].children)
    var newCounter = parseInt(oldCounter+1);
    //updating counter
    $(`#ChildCounter${e.classList[2]}`).data('text',newCounter);
    //jQuery modal childcounter adding
    $('#childCounter').data('text',newCounter); 
    //setting the parent div root1..etc in the parent div id 
    $('#parentDivid').data('text',e.classList[3]);
    // console.log('Passing wrong parent id :'+$('#parentDivid').data('text'));

}
$('#addGeneral').click(function(e){
    counter++;
    //getting the btn class 
    var clickedBtnRow = $('#modal-general').data('text');
    // console.log('btn classs----'+clickedBtnRow)
    //getting the generalname
    var generalName = $('#generalName').val();
    //getting the addnew box and counter 
    var generalCounter = $('#generalCounter').data('text');
    //getting the parent
    var parent = $('#parentDivid').data('text');
    // console.log('this is the wrong parent getting :'+parent);
    //getting the child counter from JQuery modal
    // var childCounter = $('#childCounter').data('text');
    var oldCounter;
    var newCounter;
    if(generalName != ''){
        let searchParams = new URLSearchParams(window.location.search)
        var urlId = searchParams.get('id')
        $.ajax({
            url: destination+'/campaigns/'+urlId,
            type:"GET",
            headers: {"Authorization": "Bearer "+localStorage.getItem("token")},
            dataType: 'json',
            contentType: "application/json",
            success : function(response){

                if( clickedBtnRow== addNewBox){
                    box = parseInt(addNewBox)+1+''+totalBoxes;
                    nBox = parseInt(addNewBox)+1;
                }
                else{
                    nBox = addNewBox;
                    box = addNewBox+''+totalBoxes;
                }

                //checking same id exists or not
                const a = _.groupBy(response.campaign.flowJSON,'parent');
                if(a[parent]){
                    var oldChildCounter = a[parent].length;
                    var childCounter = parseInt(oldChildCounter)+1;
                }
                else{
                    childCounter = 1;
                }
                var foundIndex = response.campaign.flowJSON.findIndex(x => parent+''+childCounter == x.id);
                //if exists
                if(foundIndex !=-1){
                    //call a Resursive function which return the counter and new id
                    if(childCounter >9){
                        childCounter = 'a'+childCounter;
                    }
                    var arr = Recursion(childCounter,parent,response.campaign.flowJSON)
                    //setting new id
                    var newId = parent+''+arr[0];
                    //adding how many time resursive function call
                    totalBoxes = totalBoxes+arr[1];
                    //again count 0
                    count = 0;
                    CreatingGeneralBoxAfterCheckingDuplicateId(newId,parent,clickedBtnRow,addNewBox,totalBoxes,generalName,arr[0]) ;
                    addGeneralCard(generalCounter,totalBoxes,parent,arr[0],generalName,counter,nBox)
  
                    
                }
                else{
                    totalBoxes++;
                    if(childCounter >9){
                        childCounter = 'a'+childCounter;
                    }
                    var id = parent+''+childCounter;
                    CreatingGeneralBoxAfterCheckingDuplicateId(id,parent,clickedBtnRow,addNewBox,totalBoxes,generalName,childCounter)
                    addGeneralCard(generalCounter,totalBoxes,parent,childCounter,generalName,counter,nBox)
                }
            
                
               
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
        //getting the old counter
        oldCounter = $(`#userInputChilds${generalCounter}`).data('text');
        //increasing the old counter
        newCounter = parseInt(oldCounter+1);
        $(`#userInputChilds${generalCounter}`).data('text',newCounter);   
    }
    refreshDom();
    
  
});
function Recursion(number,parent,JsonArray){
    var f_index = JsonArray.findIndex(x => parent+''+number == x.id);
    count++;
    if(f_index == -1){
        // console.log('Return Number :'+number)
        var arr = [number,count]
        return arr;
    }
    else{
        // console.log('Pass Number :'+number)
        // console.log('Recursion')
        Newnumber = parseInt(number)+1;
        var array = JsonArray.slice();
        var newParent = parent;
        return Recursion(Newnumber,newParent,array)
    } 
}
function CreatingGeneralBoxAfterCheckingDuplicateId(id,parent,clickedBtnRow,addNewBox,totalBoxes,generalName,childCounter){
        var box = 0;
        var nBox = 0;
        if( clickedBtnRow== addNewBox){
            box = parseInt(addNewBox)+1+''+totalBoxes;
            nBox = parseInt(addNewBox)+1;
            // refreshDom();
            createNewGenralBoxRow(parent,childCounter,box,id);
            refreshDom(); 
        }
        else{
            nBox = addNewBox;
            box = addNewBox+''+totalBoxes;
            createNewGenralBox(parseInt(clickedBtnRow)+1,parent,childCounter,box,id);
            refreshDom();
        }
        //setting title
        $(`#title${box}`).data('text',generalName);
        $(`#title${box}`).text(generalName);
        var name = $('#generalName').val();
        //setting span card name
        $(`#generalDiv${box}Span`).data('text',name)
        $(`#generalDiv${box}Span`).text(name)
        $(`#genDropdown${totalBoxes}`).addClass(parent+counter);
        $(`#fallDropdown${totalBoxes}`).addClass(parent+counter);
        //setting parent
        $(`#parent${box}`).data('text',parent);
        //seetting id
        $(`#id${box}`).data('text',parent+childCounter);
        refreshDom();
        //preparing json
        prepareJson(box,clickedBtnRow);
        
}
                                                    ////////////////////
                                                   // UPDATE GENERAL //
                                                  ////////////////////
//when user click on the card
function updateGeneralName(e) {
    //  console.log(e);
    //toggle the update text modal
    jQuery('#modal-updateGeneral').modal('toggle');
    //empty old text from modal
    $('#updateGeneralName').val('')
    //getting id on which card user click
    var id = e.id+'Span';
   $('#modal-updateGeneral').data('text',e.classList[0])
    $("#generaldiv").data('text',id)
    //setting value on the jquery modal text area
    $('#updateGeneralName').val($('#'+id).data('text'))
    // $(`#title${e.classList[0]}`).data('text')
}
///when user click on the update general button from the jquery modal
$('#updateGeneral').click(function(e){
    //getting card id on which user click
    var spanId =  $("#generaldiv").data('text');
    var boxTitleid = $('#modal-updateGeneral').data('text');
    $('#'+spanId).data('text',$('#updateGeneralName').val())
    //setting the data text of the card what user update
    var updateText = $('#'+spanId).data('text');
    //Adding Span Text 
    $('#'+spanId).text(updateText)
    $('.generalTitleName').text(updateText);
    $(`#title${boxTitleid}`).data('text',$('#updateGeneralName').val());
    $(`#title${boxTitleid}`).text($('#updateGeneralName').val());
    prepareJson(boxTitleid,0);

})


////////////////////////////////////////////////////////////
//         FUNCTION refreshDom DOM                          //
//////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////
//               functions for toggle and collapse            //
////////////////////////////////////////////////////////////////
//#region

//toggle reponse dropdown button menu
function toggleResponseBtnMenu(e){
    $('.drop'+e.classList[5]).collapse('toggle')
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
    // event.stopPropagation();
    $('#UserSays').collapse('toggle')
    // refreshDom();
})
$('#dynamicColapse').click(function(){
    // event.stopPropagation();
    $('#dynamicUserSays').collapse('toggle')
    // refreshDom();
})
// collapse Responses Button
$('#colapseResponses').click(function(){
    // event.stopPropagation();
    $('#responses').collapse('toggle')
    // refreshDom();
})
// collapse User Input Button
$('#colapseUserInputs').click(function(){
    // event.stopPropagation();
    $('#userInput').collapse('toggle')
  
})

//#endregion
////////////////////////////////////////////////////////////////
//               Append UserInput Body Card                   //
////////////////////////////////////////////////////////////////

function appendFallback1(fallCounter, addnewBox,totalboxes,count,parent,childCounter){
    var c = parent+''+childCounter;
    $('#userInputBody'+fallCounter).append(`
    <div class="col-md-12 ${addnewBox}"  style="margin-top:3%;" id='div${count}' >
        <div class="hypermodel-item ui-sortable-handle" data-target='${c}'>
            <div style="float:left; width:80%;" id="fallbackDiv${count}" class='${addnewBox}${totalBoxes}' onclick="updateFallbackName(this)" data-text="Sample text">
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

function addGeneralCard(boxNo,totalboxes,parent,childCounter,generalName,count,nBox){
    
    // console.log('Add Genral card:')
    var gen = parent+''+childCounter;
    // console.log('passing gen counter'+gen);
    $('#userInputBody'+boxNo).append(`
        <div class="col-md-12 ${addNewBox}"  style="margin-top:3%;" id='div${count}' >
        <div class="hypermodel-item ui-sortable-handle" data-target='${gen}'>
            <div style="float:left; width:80%;" id="fallbackDiv${count}" class='${nBox}${totalBoxes}' onclick="updateGeneralName(this)" data-text="Sample text">
                <span id='fallbackDiv${count}Span' style="font-size: 90%; " > </span>
            </div>
            <div class="buttonClass btn ${count} ${nBox} ${gen} fallback" id='Remove${gen}' style="width:5%;color:#CD5C5C; float: right;" onclick="removeBoxes(this)">
                <i class="fa fa-times fa-xs" aria-hidden="true"></i>
            </div>
        </div>
     </div>
     <div id = 'fallCount'></div>
     <div id = 'parentSpanId${boxNo}'></div>
     <div id = 'gCount${boxNo}'></div>
    `)
    $(`#fallbackDiv${count}Span`).text(generalName)
    $(`#fallbackDiv${count}Span`).data('text',generalName)
    
    var pare = `Remove${gen}`;
    var chil = `a${gen}`
    refreshDom();
    createLine(pare,chil)    
}

////////////////////////////////////////////////////////////////
//               Delete Boxes and and Lines from DOM          //
////////////////////////////////////////////////////////////////

function removeBoxes(e){
    //getting all hypermodal appended classes
    var classarray = $('.hypermodel-grid')
    .map(function() { return this.classList[1];  })
    .get(); //ToArray
    //checking on which class user click 
    //classes start with this class
    var removeClasses = classarray.filter(num=>num.startsWith(e.classList[4]));
    //getting parent id 
     var parentId = e.parentNode.parentNode.parentNode.id;
    //removing elements
    var id = (e.parentNode.children[0].id);
    for(var i = 0; i<= removeClasses.length; i++){
        //Delete JSON of the remove boxes
        deleteJson(removeClasses[i]);
        //Remove the js plumb line from child node
        jsPlumb.remove(`Remove${removeClasses[i]}`);
        //Removing thr JS Plumb line from parent node
        jsPlumb.remove(`a${removeClasses[i]}`);
        //Rempve the Elements from DOM side
        $('.'+removeClasses[i]).remove();
    }
    //Removing the User Input Card
    $('#'+"div"+e.classList[2]).remove();
    //refresh the dom
    refreshDom();
    
}

////////////////////////////////////////////////////////////////
//               Prepare JSON and delete JSON                 //
////////////////////////////////////////////////////////////////

function prepareJson(boxno,row){
    var newRow = parseInt(row)+1;
    var totalChilds = $(`#colum${newRow}`).children()
    var boxNo  =  []
    for (const i of totalChilds) {
        if(i.classList.length !== 0){
            boxNo.push(i.classList)
        }
    }
    var counts = 0;
    var responses = 0;
    var id = '';
    var parent = '';
    var isFallback = '';
    var trainingPhrase = [];
    var response = [];
    var name = '';
    var obj = {}
    var responsesObject = [];
    var payload = [];
    //total appended child counts
    var counts = $(`#child${boxno}`).data('text');
    // console.log('counts :'+counts)
    //getting responses childs
    responses = ($(`#responsesChilds${boxno}`).data('text'));
    //getting box id
    id = $(`#id${boxno}`).data('text');
    // console.log('id...'+id);
    //getting box parent
    parent = $(`#parent${boxno}`).data('text');
    //getting is fallback
    isFallback = $(`#isFallback${boxno}`).data('text');
    //getting box title
    name = $(`#title${boxno}`).data('text');
    //traning phases data
    for(var traningPhase = 0; traningPhase<= counts;traningPhase++){
        //checking if given traning phase id exists
         if($(`#TraningPhasediv${boxno}${traningPhase}Span`).length){
             //pushing traning phrases into the traningPhrase array
            trainingPhrase.push($(`#TraningPhasediv${boxno}${traningPhase}Span`).data('text'));
         }
    }
    //responses 
    for(var res = 0; res<=responses; res++){
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
            var string = $(`#delayDiv${boxno}${res}Span`).data('text');
            //splitting text on the base of space ...
            var splitText  =  string.split(" ");
            //getting unit
            var unit = splitText[1];
            //getting duration
            var duration = splitText[0];
            payload[res].duration = duration;
            payload[res].unit = unit[0];
            responsesObject[res].payload = payload[res];
            response.push(responsesObject[res]);
        }
    }
    // parent = parent.toString();
    obj.trainingPhrases = trainingPhrase;
    obj.responses = response;
    obj.id = id
    obj.parent = parent;
    obj.isFallback = isFallback;
    obj.name = name;
    obj.boxNo = boxno;
    //finding the array index
    var foundIndex = JsonArray.findIndex(x => obj.id == x.id);
    //if no index found push the object at new index
    if(foundIndex == -1){
        obj.row = row;
        JsonArray.push(obj)
        // console.log(JsonArray);
    }
    //if object found than pushing object at the index
    else{
        var oldRow = JsonArray[foundIndex].row;
        obj.row = oldRow;
      JsonArray[foundIndex] = obj;
    }
     console.log(JsonArray);
     createCampaign();
}

function deleteJson(id){
    // console.log('this is the pass id :'+ id)
    //finding the object index
    var foundIndex = JsonArray.findIndex(x => id == x.id);
    //if index found
    if(foundIndex != -1){
        //deleting the object
        JsonArray.splice(foundIndex,1);
    }
    // console.log(JsonArray);
    createCampaign();
}

////////////////////////////////////////////////////////////////
//               AJAX Calls                                   //
////////////////////////////////////////////////////////////////

//sending ajax calls on local db
function createCampaign(){
    let campaignName = $('#edit-campaign-name').val();
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
        twilioNumber : compaignNumber,
        flowJSON : JsonArray
    }
    $.ajax({
        url: destination+'/campaigns/'+myid+'/update',
        type:"PATCH",
        headers: {"Authorization": "Bearer "+localStorage.getItem("token")},
        data: JSON.stringify(body),
        dataType: 'json',
        contentType: "application/json",
        success : function(response){
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
        }
        
    });
}

//call this function when user complete the editing of flow builder
//send call to dilogue bilder
function finishEditing(){
    let campaignName = $('#edit-campaign-name').val();
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
        twilioNumber : compaignNumber,
        flowJSON : JsonArray
    }
    $.ajax({
        url: destination+'/campaigns/'+myid,
        type:"PATCH",
        headers: {"Authorization": "Bearer "+localStorage.getItem("token")},
        data: JSON.stringify(body),
        dataType: 'json',
        contentType: "application/json",
        success : function(response){
            window.location.replace(appUrl+"/campaign/list/");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
        }
        
    });
}

//getting App URL From Config File
$.getJSON('../../config.json',function(data){
    appUrl = data.frontEndUrl;
})

//getting const values from const.json file
$.getJSON('../create/const.json',function(data){
    charactersLimitOnCard = data.charactersLimitOnCard;
    showCharactersOnCard = data.showCharactersOnCard;
    oneSmsCharacterLimit = data.oneSmsCharacterLimit;
    zoomWidthIncreaseDescrease = data.zoomWidthIncreaseDescrease
        
})
function imageAjaxCalls(url,type,img){
    $.ajax({
        url: url,
        type: 'post',
        headers: {"Authorization": "Bearer "+localStorage.getItem("token"),"Accept":"text"},
        data: img,
        contentType: false,
        processData: false,
        success: function(response){
            if(type =='updateImage'){
                //setting the updated values 
                $('#updateOutput').attr('src',response.imageUrl);
                $("#updateImageFooter").data("text",response.imageUrl);
                //removing the disable class from the button 
                $('#updateImageBtn').removeClass('disabled')
            }
            else if(type =='newImage'){
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

////////////////////////////////////////////////////////////////
//               Word counter                                 //
////////////////////////////////////////////////////////////////

function wordCounter(){
    var length = $('#addTextArea').val().length;
    var newLength = parseInt(length)+1;
    $('#length').text(`SMS (${newLength} / ${Math.ceil(newLength/oneSmsCharacterLimit)})`);
}

function updateWordCounter(){
    var length = $('#updateTextArea').val().length;
    var newLength = parseInt(length)+1;
    $('#updateLength').text(`SMS (${newLength} / ${Math.ceil(newLength/oneSmsCharacterLimit)})`);
}

////////////////////////////////////////////////////////////////
//               JSPlumb Create Lines                         //
////////////////////////////////////////////////////////////////
function createLine(parent,child){
    //checking if parent and child id exists on the DOM
    if($(`#${parent}`).length && $(`#${child}`).length){
        //container on which lines creates
         var container = $("#AppendDiv");
         //setting JSplumb container
         jsPlumb.setContainer(container);
         //creating line from child 
         var e1 = jsPlumb.addEndpoint(child, {
             connectionType:"basic",
             width:5,
             isSource:true,
             anchor: "LeftMiddle",
             endpoint:[ "Dot", { radius:2}],
             connector: ["Bezier", { curviness: 90 }]
             }); 
             //parent type
             var e2 = jsPlumb.addEndpoint(parent, {
             isTarget:true,
             anchor:"Right",
             endpoint:[ "Dot", { radius:2 }],
             connector: ["Bezier", { curviness: 90 }]
             });
             //connecting both parent and child
         jsPlumb.connect({ source:e1, target:e2 });
         jsPlumb.setDraggable([e1,e2]);
    }
    else{
       console.log('ID not found')
    }
refreshDom();
}

