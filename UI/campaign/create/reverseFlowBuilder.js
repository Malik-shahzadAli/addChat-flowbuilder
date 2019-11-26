var theNewScript = document.createElement("script");
theNewScript.type = "text/javascript";
theNewScript.src = "./flowBuilderScript.js";
// const _ = require('lodash');
// document.getElementsByTagName("head")[0].appendChild(theNewScript);
// $(document).ready(function(){
//     console.log(JsonArray);
// })

var JsonArray2=[{
    id: "root",
    boxNo:"00",
    row:"0",
    isFallback: false,
    name: "Start",
    parent: 0,
    responses: [],
    trainingPhrase: ["Add text here"]
},{
    id: "root1",
    boxNo:"11",
    row:"1",
    isFallback: false,
    name: "g1",
    parent: "root",
    responses: []
},{
    id: "root2",
    boxNo:"12",
    row:"1",
    isFallback: false,
    name: "g2",
    parent: "root",
    responses: [],
    trainingPhrase: ["Add text here"]
},{
    id: "root11",
    boxNo:"23",
    row:"2",
    isFallback: false,
    name: "g1f1",
    parent: "root1",
    responses: [],
    trainingPhrase: ["Add text here"]
},{
    id: "root12",
    boxNo:"24",
    row:"2",
    isFallback: false,
    name: "g1g1",
    parent: "root1",
    responses: [],
    trainingPhrase: ["Add text here"]
},{
    id: "root21",
    boxNo:"25",
    row:"2",
    isFallback: false,
    name: "g2g1",
    parent: "root2",
    responses: [],
    trainingPhrase: ["Add text here"]
},{
    id: "root22",
    boxNo:"26",
    row:"2",
    isFallback: true,
    name: "g2f1",
    parent: "root2",
    responses: [],
    trainingPhrase: []
}]
var objArray=[
    {
    parent:"root",
    child:["root1","root2"],
    row:1,
    boxNo:["11","12"],
    name:["g1","g2"]
    },
    {
        parent:"root1",
        child:["root11","root12"],
        row:2,
        boxNo:["23","24"],
        name:["g11","g22"]
    },

]
var obj={}

function parseJson(){
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
            var tBoxes=j;
            addGeneral(a[parent][k].row,a[parent][k].name,a[parent][k].parent,childCounter)
        }
    }
}
parseJson()
function addGeneral(btnClass,generalName,parent,childCounter){
    counter++;
    if(parent == 0){
        generalCounter=-1;
    }
    else{
        generalCounter=btnClass+''+counter;
    }
    newCounter=0;
    $(`#userInputChilds${generalCounter}`).data('text',childCounter);
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
     else{createNewGenralBox(parseInt(btnClass)+1,parent,childCounter);}
     console.log(generalName);
    $(`#title${btnClass}`).data('text',generalName);

    $(`#title${btnClass}`).text(generalName);

        //getting delay input + selected unit
        // var name=$('#generalName').val();
        //setting data text time and unit

        //$(`#generalDiv${addNewBox}${totalBoxes}Span`).data('text',name)

        //setting time and unit on the span of responses

        //$(`#generalDiv${addNewBox}${totalBoxes}Span`).text(name)

        //puting name on the box
        // $('.generalTitleName').text(name);
        // $(`#genDropdown${addNewBox}`).addClass(parent+counter);

                        //$(`#genDropdown${totalBoxes}`).addClass(parent+counter);
                        // $(`#fallDropdown${totalBoxes}`).addClass(parent+counter);

        //$(`#parent${addNewBox}${totalBoxes}`).data('text',parent);

        //$(`#id${addNewBox}${totalBoxes}`).data('text',parent+childCounter)

    // }
    // Refresh();
    // prepareOneBoxJSON(addNewBox+""+totalBoxes);
  
}