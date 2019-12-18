var theNewScript = document.createElement("script");
theNewScript.type = "text/javascript";
theNewScript.src = "./flowBuilderScript.js";
var jsPlumb=document.createElement('script');
jsPlumb.type="text/javascript";
jsPlumb.src="./jsplumb.min.js" 
var frontEndUrl;
$.getJSON('../../config.json',function(data){
    frontEndUrl=data.frontEndUrl;
})
$('#tab_third').click(function(){
    Refresh();
})
$(document).ready(function(){
   let searchParams = new URLSearchParams(window.location.search)
   var id = searchParams.get('id');
   console.log('front end url :'+frontEndUrl)
    $.ajax({
        url: destination+'/campaigns/'+id,
        type:"GET",
        headers: {"Authorization": "Bearer "+localStorage.getItem("token")},
        dataType: 'json',
        contentType: "application/json",
        success : function(response){
            // console.log(response)
            parseJson(response.campaign.flowJSON)
            $('#edit-campaign-name').val(response.campaign.name)
            $('#description').val(response.campaign.description);
          
            // var f = new Date(startDate[2], startDate[1] - 1, startDate[0])
             var date=response.campaign.startDate;
            var newDate=date.substr(0,10)
            var format=newDate.split("-")
            // console.log(format[2]);
            $('#start-date').val(format[2]+"-"+format[1]+"-"+format[0]);
             //console.log(date.getMonth);
            var endDate=response.campaign.endDate;
            var newEndDate=endDate.substr(0,10);
            var endDateformat=newEndDate.split("-")
            $('#end-date').val(endDateformat[2]+"-"+endDateformat[1]+"-"+endDateformat[0])
            // $('#end-date').val(response.campaign.endDate);
            $('#status').val(response.campaign.status);
            $('#platform').val(response.campaign.platform);
            $("#number option:selected").text(response.campaign.twilioNumber);
            $("#number option:selected").val(response.campaign.twilioNumber);
            // $("#ddlCustType option:selected").text();
            // $('#number').val("+14245432422");
            $('#display').removeClass('hide');
            $('#spinner').addClass('hide');
            Refresh();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $('#spinner').addClass('hide');
            window.location.replace(frontEndUrl+"/campaign/list/");
        }
    });
})   
var obj={}
function parseJson(JsonArray2){
    const groupByParent = _.groupBy(JsonArray2,'parent');
    var parentArray=[];
    for(var i=0; i<JsonArray2.length; i++){
        //if parent exists
        if(parentArray.indexOf(JsonArray2[i].parent) === -1) {
            //pushing parent into the parent array
            parentArray.push(JsonArray2[i].parent);
        }
    }
    //a for loop till parent array length
    for(var j=0; j<parentArray.length; j++){
        //parent
        var parent=parentArray[j];
        //checking total child of one parent
        for(var k=0; k<groupByParent[parent].length; k++){
            //increaasing child counter
            var childCounter=k+1;
            //checking if this current box is fall type
            if(groupByParent[parent][k].isFallback){
                // if fall back adding new fall back on the user Inputs span card
                addFallback(groupByParent[parent][k].row,groupByParent[parent][k].name,groupByParent[parent][k].parent,childCounter,groupByParent[parent][k].boxNo,groupByParent[parent][k].id)
                //checking total responses of the current box
                for(var respose=0; respose <groupByParent[parent][k].responses.length;respose++){
                    //adding all responses on the Responses
                    addResponse(groupByParent[parent][k].boxNo,(respose+1),groupByParent[parent][k].responses[respose]);
                }
            }
            else{
                //adding genral card on the user says
                addGeneral(groupByParent[parent][k].row,groupByParent[parent][k].name,groupByParent[parent][k].parent,childCounter,groupByParent[parent][k].boxNo,groupByParent[parent][k].id)
                //getting all trannig phases of the current box 
                for(var l=0; l<groupByParent[parent][k].trainingPhrases.length;l++){
                    //adding one by one all traning phases on the box of user says
                    addTraningPhase(groupByParent[parent][k].boxNo,(l+1),groupByParent[parent][k].trainingPhrases[l])
                }
                //getting all the responses of the current box
                for(var respose=0; respose <groupByParent[parent][k].responses.length;respose++){
                    // adding one by one all responses on the box
                    addResponse(groupByParent[parent][k].boxNo,(respose+1),groupByParent[parent][k].responses[respose]);
                }
                
            }
        }
    }
    //getting user inputs 
    for(var userInput=0; userInput <JsonArray2.length; userInput++){
        //checking if box is genral type 
        if(!JsonArray2[userInput].isFallback){
            // adding genral card
            appendGeneral(JsonArray2[userInput].row,JsonArray2[userInput].name,JsonArray2[userInput].parent,JsonArray2[userInput].id,JsonArray2[userInput].boxNo,(userInput+1),JsonArray2)
        }
        else{
            // adding fall back card on the user inputs types
            appendFallback(JsonArray2[userInput].row,JsonArray2[userInput].name,JsonArray2[userInput].parent,JsonArray2[userInput].id,JsonArray2[userInput].boxNo,(userInput+1),JsonArray2);
        }
      
    }
    Refresh();
    for(var json=0;json < JsonArray2.length; json++){
        //creating json of the current box
        prepareOneBoxJSON(JsonArray2[json].boxNo,JsonArray2[json].row)
    }
}
function addGeneral(btnClass,generalName,parent,childCounter,boxNo,id){
    counter++;
    if(parent != '0'){
        totalBoxes++;
    }
    generalCounter=btnClass+''+counter;
    newCounter=0;
    if( btnClass== addNewBox){
        createNewGenralRow(parent,childCounter,boxNo,id);
        Refresh();
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
        // console.log(response);
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
    // console.log(gen);
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
            <div class="hypermodel-item ui-sortable-handle" data-target='${gen}'>
                <div style="float:left; width:80%;" id="generalDiv${row}${childCounter}" class='${row}${childCounter}' onclick="updateGeneralName(this)" data-text="Sample text">
                    <span id='generalDiv${row}${childCounter}Span' style="font-size: 90%; " > </span>
                </div>
                <div class="buttonClass btn ${counter} btnbtn ${gen} ${row} genral" id='Remove${gen}' style="width:5%;color:#CD5C5C; float: right;" onclick="RemoveFallback(this)">
                    <i class="fa fa-times fa-xs" aria-hidden="true"></i>
                </div>
            </div>
         </div>
      
        `
        )
        var parentId=`Remove${gen}`;
        var child=`a${gen}`;
        createLine(parentId,child);
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
            <div class="hypermodel-item ui-sortable-handle" data-target='${c}'>
                <div style="float:left; width:80%;" id="fallbackDiv${counter}" class='${addNewBox+1}${totalBoxes}' onclick="updateFallbackName(this)" data-text="Sample text">
                    <span id='fallbackDiv${counter}Span' style="font-size: 90%; " > </span>
                </div>
                <div class="buttonClass btn ${counter} ${addNewBox} ${c} fallback" id='Remove${c}' style="width:5%;color:#CD5C5C; float: right;" onclick="RemoveFallback(this)">
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
    $(`#fallbackDiv${counter}Span`).text(name)
    var parentId=`Remove${c}`;
    var child=`a${c}`;
    Refresh();
    createLine(parentId,child);
   
    
   
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
$('#flowbuilder').click(function(){
    jsPlumb.ready(function(){
        setTimeout(jsPlumb.repaintEverything);
    })
});