var theNewScript = document.createElement("script");
theNewScript.type = "text/javascript";
theNewScript.src = "./flowBuilderScript.js";
$(document).ready(function(){
   var id= localStorage.getItem('id');
   localStorage.removeItem('id');
    $.ajax({
        url: destination+'/campaigns/'+id,
        type:"GET",
        headers: {"Authorization": "Bearer "+localStorage.getItem("token")},
        dataType: 'json',
        contentType: "application/json",
        success : function(response){
            parseJson(response.campaign.flowJSON)
            $('#display').removeClass('hide');
            $('#spinner').addClass('hide');
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
})
var obj={}
function parseJson(JsonArray2){
    const a = _.groupBy(JsonArray2,'parent');
    var parentArray=[];
    for(var i=0; i<JsonArray2.length; i++){
        if(parentArray.indexOf(JsonArray2[i].parent) === -1) {
            parentArray.push(JsonArray2[i].parent);
        }
    }
    for(var j=0; j<parentArray.length; j++){
        var parent=parentArray[j];
        for(var k=0; k<a[parent].length; k++){
            var childCounter=k+1;
            if(a[parent][k].isFallback){
                addFallback(a[parent][k].row,a[parent][k].name,a[parent][k].parent,childCounter,a[parent][k].boxNo,a[parent][k].id)
               
            }
            else{
                addGeneral(a[parent][k].row,a[parent][k].name,a[parent][k].parent,childCounter,a[parent][k].boxNo,a[parent][k].id)
                for(var l=0; l<a[parent][k].trainingPhrase.length;l++){
                    addTraningPhase(a[parent][k].boxNo,(l+1),a[parent][k].trainingPhrase[l])
                }
                for(var respose=0; respose <a[parent][k].responses.length;respose++){
                    addResponse(a[parent][k].boxNo,(respose+1),a[parent][k].responses[respose]);
                }
                
            }
        }
    }
    for(var userInput=0; userInput <JsonArray2.length; userInput++){
        if(!JsonArray2[userInput].isFallback){
            console.log('set ID:'+JsonArray2[userInput].id)
            appendGeneral(JsonArray2[userInput].row,JsonArray2[userInput].name,JsonArray2[userInput].parent,JsonArray2[userInput].id,JsonArray2[userInput].boxNo,(userInput+1),JsonArray2)
        }
        else{
            console.log('set ID:'+JsonArray2[userInput].id)
            appendFallback(JsonArray2[userInput].row,JsonArray2[userInput].name,JsonArray2[userInput].parent,JsonArray2[userInput].id,JsonArray2[userInput].boxNo,(userInput+1),JsonArray2);
        }
      
    }
    Refresh();
    for(var json=0;json < JsonArray2.length; json++){
        prepareOneBoxJSON(JsonArray2[json].boxNo,JsonArray2[json].row)
    }
}
function addGeneral(btnClass,generalName,parent,childCounter,boxNo,id){
    console.log('THIS IS THE ADD GENERAL ID :'+id)
    counter++;
    if(parent != '0'){
        totalBoxes++;
    }
    generalCounter=btnClass+''+counter;
    newCounter=0;
    if( btnClass== addNewBox){
        createNewGenralRow(parent,childCounter,boxNo,id);
    }
    else{createNewGenralBox(parseInt(btnClass)+1,parent,childCounter,boxNo,id);}
    $(`#userInputChilds${generalCounter}`).data('text',childCounter);;
    $(`#ChildCounter${boxNo}`).data('text',childCounter);
    $(`#id${boxNo}`).data('text',id);
    $(`#parent${boxNo}`).data('text',parent);
    $(`#title${boxNo}`).data('text',generalName);
    $(`#title${boxNo}`).text(generalName);
    Refresh();
}
function addFallback(btnClass,fallBackName,parent,childCounter,boxNo,id){
    console.log('THIS IS THE ADD GENERAL ID :'+id)
    totalBoxes++;
    if( btnClass== addNewBox){createNewBoxRow(parent,childCounter,boxNo,id)}
    else{createNewBox(parseInt(btnClass)+1,parent,childCounter,boxNo,id);}
    $(`#id${boxNo}`).data('text',id);
    $(`#parent${boxNo}`).data('text',parent);
    $(`#title${boxNo}`).text(fallBackName);
    $(`#title${boxNo}`).data('text',fallBackName);
    Refresh();
}

function addTraningPhase(boxNo,id,text){
    counter++;
    if(id >1){
    $(`#child${boxNo}`).data('text',id);
    $(`#UserSaysBody${boxNo}`).append(`
    <div class="col-md-12 ${counter}"  style="margin-top:3%;" id='div${counter}'>
       <div class="hypermodel-item ui-sortable-handle">
           <div style="float:left; width:80%;" class='TraningPhaseSpan ${boxNo}' id="TraningPhasediv${boxNo}${id}" onclick="onClick(this)" data-text="Sample text">
               <span id='TraningPhasediv${boxNo}${id}Span' style="font-size: 90%;" data-text='Add text here' >Add text here</span>
           </div>
           <div class="buttonClass btn ${counter} ${boxNo}"  style="width:5%;color:#CD5C5C;float: right;" onclick="Remove(this)">
               <i class="fa fa-times fa-xs" aria-hidden="true"></i>
           </div>
       </div>
    </div>
    `
    );
    }
    $('#TraningPhasediv'+(boxNo+''+id)+'Span').data('text',text)
    if(text.length >0){
        if(text.length >25){
        $('#TraningPhasediv'+(boxNo+''+id)+'Span').text(text.slice(0,22)+(' . . .'));
    }
    else{
        $('#TraningPhasediv'+(boxNo+''+id)+'Span').text(text);
    }
    }
    else{
        var text=$('#TraningPhasediv'+(boxNo+''+id)+'Span').data('text','Add text here');
        $('#TraningPhasediv'+(boxNo+''+id)+'Span').text('Add text here')
    }
}
function addResponse(boxNo,id,response){
    counter++;
    $(`#responsesChilds${boxNo}`).data('text',id);
    if(response.type=='delay'){
        $('#responsesBody'+boxNo).append(`
        <div class="col-md-12 ${counter}"  style="margin-top:3%;" id='div${counter}'>
            <div class="hypermodel-item ui-sortable-handle">
                <div style="float:left; width:10%;">
                    <i class="fa fa-fw fa-clock-o fa-lg" aria-hidden="true"></i>
                </div>
                <div style="float:left; width:70%;" class='${boxNo}' id="delayDiv${boxNo}${id}" onclick="updateDelayModel(this)" data-text="Sample text">
                    <span id='delayDiv${boxNo}${id}Span' style="font-size: 90%; padding-left:25%;" > </span>
                </div>
                <div class="buttonClass btn ${counter} ${boxNo}" style="width:5%;color:#CD5C5C; float: right;" onclick="Remove(this)">
                    <i class="fa fa-times fa-xs" aria-hidden="true"></i>
                </div>
            </div>
         </div>
        `
        )
        var unit;
        if(response.payload.unit == 'S'){
            unit='Seconds'
        }
        if(response.payload.unit == 'M'){
            unit='Minutes'
        }
        if(response.payload.unit == 'H'){
            unit='Hours'
        }
        if(response.payload.unit == 'D'){
            unit='Days'
        }
        
        //getting delay input + selected unit
         var delay=response.payload.duration+" "+unit;
        // //setting data text time and unit
        $(`#delayDiv${boxNo}${id}Span`).data('text',delay)
        // //setting time and unit on the span of responses
        $(`#delayDiv${boxNo}${id}Span`).text(delay)
    }
    else if(response.type=='text'){
        $('#responsesBody'+boxNo).append(`
        <div class="col-md-12 ${counter}"  style="margin-top:3%;" id='div${counter}'>
            <div class="hypermodel-item ui-sortable-handle">
                <div style="float:left; width:70%;" class='${boxNo}' id="ResponseDiv${boxNo}${id}" onclick="ResponseModal(this)" data-text="Sample text">
                    <span id='ResponseDiv${boxNo}${id}Span' style="font-size: 90%;" ></span>
                </div>
                <div class="buttonClass btn ${counter} ${boxNo}" style="width:5%;color:#CD5C5C;  float: right;" onclick="Remove(this)">
                    <i class="fa fa-times fa-xs" aria-hidden="true"></i>
                </div>
            </div>
         </div>
        `
        )
        $(`#ResponseDiv${boxNo}${id}Span`).data('text',response.payload)
        if(response.payload.length > 25){
            //adding 22 characters on the card and 3 dots
            $(`#ResponseDiv${boxNo}${id}Span`).text(response.payload.slice(0,22)+(' . . .'));
        }else{
            //if text is less than 25 characters seetting the same text 
            $(`#ResponseDiv${boxNo}${id}Span`).text(response.payload)
        }

    }
    else if(response.type=='image'){
        //appending the response body with the image card
        $('#responsesBody'+boxNo).append(`
        <div class="col-md-12 ${counter}"  style="margin-top:3%;" id='div${counter}'>
            <div class="hypermodel-item ui-sortable-handle">
                <div style="float:left; width:70%;" class='${boxNo}' id="imagediv${boxNo}${id}" onclick="updateImage(this)" data-text="Sample text">
                    <span id='imagediv${boxNo}${id}Span' data-text(${response.payload})>  <img src=${response.payload} width='25'  class="rounded" id='imagediv${counter}SpanImage'></span>
                </div>
                <div class="buttonClass btn ${counter} ${boxNo}" style="width:5%; color:#CD5C5C; float: right;" onclick="Remove(this)">
                    <i class="fa fa-times fa-xs" aria-hidden="true"></i>
                </div>
            </div>
         </div>
        `
        )
        $(`#imagediv${boxNo}${id}Span`).data('text',response.payload)
    }


}
function appendGeneral(row,name,parent,gen,tBoxes,childCounter,JsonArray2){
    console.log(gen);
    counter++;
    var boxNo;
    for(var i=0; i<JsonArray2.length; i++){
        if(parent==JsonArray2[i].id && parent != '0'){
            boxNo=JsonArray2[i].boxNo;
        }
    }
    if(boxNo){
        $('#userInputBody'+boxNo).append(`
        <div class="col-md-12 ${row}"  style="margin-top:3%;" id='div${counter}' >
            <div class="hypermodel-item ui-sortable-handle" data-target='${childCounter-1}'>
                <div style="float:left; width:80%;" id="generalDiv${row}${childCounter}" class='${row}${childCounter}' onclick="updateGeneralName(this)" data-text="Sample text">
                    <span id='generalDiv${row}${childCounter}Span' style="font-size: 90%; " > </span>
                </div>
                <div class="buttonClass btn ${counter} btnbtn ${gen} ${row} genral" style="width:5%;color:#CD5C5C; float: right;" onclick="RemoveFallback(this)">
                    <i class="fa fa-times fa-xs" aria-hidden="true"></i>
                </div>
            </div>
         </div>
      
        `
        )
        $(`#generalDiv${row}${childCounter}Span`).data('text',name)
        //setting time and unit on the span of responses
        $(`#generalDiv${row}${childCounter}Span`).text(name)
        Refresh();
    }
}
function appendFallback(row,name,parent,c,tBoxes,childCounter,JsonArray2){
    // console.log(c);
    counter++;
    var boxNo;
    for(var i=0; i<JsonArray2.length; i++){
        if(parent==JsonArray2[i].id && parent != '0'){
            boxNo=JsonArray2[i].boxNo;
        }
    }
    if(boxNo){
        $('#userInputBody'+boxNo).append(`
        <div class="col-md-12 ${addNewBox}"  style="margin-top:3%;" id='div${counter}' >
            <div class="hypermodel-item ui-sortable-handle" data-target='${childCounter-1}'>
                <div style="float:left; width:80%;" id="fallbackDiv${counter}" class='${addNewBox+1}${totalBoxes}' onclick="updateFallbackName(this)" data-text="Sample text">
                    <span id='fallbackDiv${counter}Span' style="font-size: 90%; " > </span>
                </div>
                <div class="buttonClass btn ${counter} ${addNewBox} ${c} fallback" id='try${counter}' style="width:5%;color:#CD5C5C; float: right;" onclick="RemoveFallback(this)">
                    <i class="fa fa-times fa-xs" aria-hidden="true"></i>
                </div>
            </div>
        </div>
        <div id='fallCount'></div>
        `
        )
        $('#fallCount').data('text',c);
    }
    $(`#fallbackDiv${counter}Span`).data('text',name)
    //setting time and unit on the span of responses
    $(`#fallbackDiv${counter}Span`).text(name)
    Refresh();
   
}
Refresh();
var zoom=0;
function zoomInFunction(){
    if(zoom <0){
        zoom++;
        // console.log(zoom)
        $('.hypermodel-column').width(
            $(".hypermodel-column").width() / 0.7
        )
        $('.hypermodel-column').height(
            $(".hypermodel-column").height() / 0.7
        )
    }
}
function  zoomOutFunction() {
    if(zoom > -2){
        zoom--;
        // console.log(zoom)
        $('.hypermodel-column').width(
            $(".hypermodel-column").width() * 0.7
        )
        $('.hypermodel-column').height(
            $(".hypermodel-column").height() * 0.7
        )
    }

}
// $(".hypermodel-column").on("mousewheel DOMMouseScroll", function (e) {
// //   console.log(e);
// })
// $('.hypermodel-column').bind('DOMMouseScroll', function(e){
//     if(e.originalEvent.detail > 0) {
//         console.log('Downnn')
//         //scroll down
//         zoomOutFunction();
//     }else {
//         //scroll up
//         zoomInFunction();
//     }

//     //prevent page fom scrolling
//     // return false;
// });