/////////////////////////////////////////////////////////////////////
//              FUNCTION CREATE NEW FALLBACK ROW                  //
///////////////////////////////////////////////////////////////////
function createNewFallbackBoxRow(parent,childCounter,box,id){
    // console.log('setting wrong parent id on the box button :'+box);
    addNewBox++;

    var newAddNewBox=parseInt(addNewBox)-1;
    var newTotalBoxes=totalBoxes;
    // console.log('trying :'+newAddNewBox+''+newTotalBoxes);
    var a=parent+''+childCounter;
    // console.log('this is the id :'+a);
    $('#AppendDiv').append(`
    <div id='tgen'></div>
    <div id='responsesChilds${box}' data-text='0'></div>
    <div id='isFallback${box}' data-text='true'></div>
    <div id='id${box}'></div>
    <div id='parent${box}'></div>
    <div id='${id}' data-text='${box}'></div>
    <div class="hypermodel-column " id='colum${addNewBox}'>
    <div  class="hypermodel-grid ${id}" >
    <div class="hypermodel-header" style="background:#60a3bc; " id='a${a}'>
        <h3 style="margin-left:-5%;color:white;" id='title${box}'>Property</h3>
    </div>
    <!-- Responses Part -->
    <div class="hypermodel-body">
        <div  id='block${addNewBox}' style="margin-left:-10px;margin-right:-10px;margin-top:-5px;">
            <div class="block-header" style="padding-top:5%;padding-bottom:0%; background:#bbdcf7;">
                <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;;"><b>Responses</b></p>
                <i class="fa fa-caret-down fa-sm ${addNewBox}${counter}" aria-hidden="true"  style="margin-top: -10%;"  data-target='#responsesBody${addNewBox}' onclick='collapseResponses(this)'></i>
            </div>
            <div id='responses${addNewBox}${counter}'class='responses${addNewBox}${counter}' style="background: #FFFFFF; margin-top: -5%;">
                <div id="responsesBody${box}" style="padding-top:1%;"></div>
                <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%;"  >
                    <div class="row btn btn-sm btn-alt-default dropdown ${box}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8; " id='btnGroupVerticalDrop4' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='toggleResponseBtnMenu(this)'>
                        <i class="fa fa-plus"></i>
                        <div class="dropdown-menu drop${box} " aria-labelledby="btnGroupVerticalDrop2">
                        <a class='dropdown-item ${box}' onclick='addTextResponse(this)'>
                            <i class="fa fa-fw fa-envelope-o mr-5"></i>Text
                        </a>
                        <div class="dropdown-divider"></div>
                            <a class="dropdown-item ${box}" onclick='addImageResponse(this)'>
                                <i class="fa fa-file-image-o mr-5" ></i> Picture
                            </a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item ${box}" onclick='addDelayResponse(this)'>
                            <i class="fa fa-fw fa-clock-o fa-lg" ></i> Delay
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
                <div id="userInputBody${box}" style="padding-top:1%;"></div>
                <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%; ">
                    <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${counter}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='dropdown' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='toggleUserInputBtnMenu(this)'>
                        <i class="fa fa-plus"></i>
                        <div class="dropdown-menu dropdown${addNewBox}${counter}" aria-labelledby="btnGroupVerticalDrop2">
                        <div  id='fallbackCounter'></div>
                            <a id='fallDropdown${totalBoxes}' data-text=${totalBoxes} class="dropdown-item ${addNewBox} ${box} ${newTotalBoxes} ${id} btn" onclick='addFallback1(this)'>
                                FallBack
                            </a>
                            <div id='falling${totalBoxes}'>
                            <div class="dropdown-divider " id='generalCounter'></div>
                            </div>
                            <a id='genDropdown${totalBoxes}' class="dropdown-item ${addNewBox} ${box} ${id}" onclick='addGenral(this)'>
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
  var pare=`Remove${id}`;
  var chil=`a${id}`
   createLine(pare,chil)
  $('#tgen').data('text',($('#fallCount').data('text')+addNewBox))

}
//////////////////////////////////////////////////////////
//        FUNCTION CREATES NEW FALL BACK BOX           //
////////////////////////////////////////////////////////
function createNewFallbackBox(number,parent,childCounter,box,id){
    // console.log('this is the box :'+id);
    // console.log(addNewBox+''+totalBoxes);
    var a=parent+''+childCounter;
    var newAddNewBox=parseInt(addNewBox)-1;
    var newTotalBoxes=totalBoxes;
    // console.log('this is the id :'+a);
    // console.log('trying :'+newAddNewBox+''+newTotalBoxes);
    $('#colum'+number).append(`
    <div id='tgen'></div>
    <div id='responsesChilds${box}' data-text='0'></div>
    <div id='isFallback${box}' data-text='true'></div>
    <div id='id${box}'></div>
    <div id='parent${box}'></div>
    <div id='${id}' data-text='${box}'></div>
    <div  class="hypermodel-grid ${id}" >
        <div class="hypermodel-header" style="background:#60a3bc; " id='a${id}'>
            <h3 style="margin-left:-5%;color:white;" id='title${box}'>Property</h3>
        </div>
        <!-- Responses Part -->
        <div class="hypermodel-body">
            <div  id='block${addNewBox}' style="margin-left:-10px;margin-right:-10px;margin-top:-5px;">
                <div class="block-header" style="padding-top:5%;padding-bottom:0%; background:#bbdcf7;">
                    <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;;"><b>Responses</b></p>
                    <i class="fa fa-caret-down fa-sm ${addNewBox}${counter}" aria-hidden="true"  style="margin-top: -10%;"  data-target='#responsesBody${addNewBox}' onclick='collapseResponses(this)'></i>
                </div>
                <div id='responses${addNewBox}${counter}'class='responses${addNewBox}${counter}' style="background: #FFFFFF; margin-top: -5%;">
                    <div id="responsesBody${box}" style="padding-top:1%;"></div>
                    <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%;"  >
                        <div class="row btn btn-sm btn-alt-default dropdown ${box}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='btnGroupVerticalDrop4' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='toggleResponseBtnMenu(this)'>
                            <i class="fa fa-plus"></i>
                            <div class="dropdown-menu drop${box} " aria-labelledby="btnGroupVerticalDrop2">
                            <a class='dropdown-item ${box}' onclick='addTextResponse(this)'>
                                <i class="fa fa-fw fa-envelope-o mr-5"></i>Text
                            </a>
                            <div class="dropdown-divider"></div>
                                <a class="dropdown-item ${box}" onclick='addImageResponse(this)'>
                                    <i class="fa fa-file-image-o mr-5" aria-hidden="true"></i> Picture
                                </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item ${box}" onclick='addDelayResponse(this)'>
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
                    <div id="userInputBody${box}" style="padding-top:1%;"></div>
                    <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%; ">
                        <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${counter}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='dropdown' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='toggleUserInputBtnMenu(this)'>
                            <i class="fa fa-plus"></i>
                            <div class="dropdown-menu dropdown${addNewBox}${counter}" aria-labelledby="btnGroupVerticalDrop2">
                            <div  id='fallbackCounter'></div>
                                <a id='fallDropdown${totalBoxes}' data-text=${totalBoxes}  class="dropdown-item ${number} ${box} ${newTotalBoxes} ${id} btn" data-text(${counter})  onclick='addFallback1(this)'>
                                    FallBack
                                </a>
                                <div class="dropdown-divider "  id='generalCounter'></div>
                                <a id='genDropdown${totalBoxes}' class="dropdown-item ${number} ${box} ${id}" onclick='addGenral(this)'>
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
    var pare=`Remove${id}`;
    var chil=`a${id}`
    createLine(pare,chil)
    $('#tgen').data('text',($('#fallCount').data('text')+addNewBox))
}
////////////////////////////////////////////////////////////
//                  FUNCTION CREATES NEW GENRAL ROW       //
////////////////////////////////////////////////////////////
function createNewGenralBoxRow(parent,childCounter,boxNo,id){
    // console.log('here Thing :'+parent +' c '+childCounter+' bn '+boxNo+' id '+id)
    addNewBox++;
    var newTotalBoxes=totalBoxes;
    // console.log('trying :'+newAddNewBox+''+newTotalBoxes);
    var a=parent+''+childCounter;
    // console.log('this is the id :'+a);
    // console.log('this is the real id :'+id);
    // console.log('this is the parent.......'+parent)
    if(parent=='0'){
        a='root';
    }
    console.log('this is the id :'+id);
    $('#AppendDiv').append(`
    <div id='child${boxNo}' data-text='1'></div>
    <div id='isFallback${boxNo}' data-text='false'></div>
    <div id='id${boxNo}'></div>
    <div id='parent${boxNo}'></div>
    <div id='${id}' data-text='${boxNo}'></div>
    <div class="hypermodel-column" id='colum${addNewBox}' >
        <div  class="hypermodel-grid ${id}">
            <div class="hypermodel-header" style="background:#3f9ce8; " id='a${id}'>
                <h3 style="margin-left:-5%;color:white;" id='title${boxNo}'>Property</h3>
            </div>
        <div class="hypermodel-body" id='mainModel${addNewBox}'>
            <!-- User Says -->
            <div  id="block"style="margin-left:-10px;margin-right:-10px;margin-top:-5px;">
                <div class="block-header" style="padding-top:5%;padding-bottom:0%; background:#bbdcf7;">
                    <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;"><b>User Says</b></p>
                    <i class="fa fa-caret-down fa-sm ${addNewBox}${counter}" aria-hidden="true"  style="margin-top: -10%;"  data-target="#dynamicUserSays" onclick='collapseUserSays(this)'></i>
                </div>
            <div id='collapse${addNewBox}${counter}' style="background:white;margin-top: -5%;margin-bottom: -5%;">
                <div id='UserSaysBody${boxNo}'>
                    <div class="col-md-12 " id='TraningPhasediv${counter}'  style="padding-top: 3%;">
                        <div class="hypermodel-item">
                            <div class="TraningPhaseSpan ${boxNo}" id='TraningPhasediv${boxNo}1' style="float:left; width:80%;" onclick="editTraningPhrase(this)">
                                <span style="font-size: 90%;" id='TraningPhasediv${boxNo}1Span' data-text='Add text here'>Add text here</span>
                            </div>
                        </div>
                    </div>   
                </div>
                <div id="model-n1000" style="margin-top: 3%; margin-bottom: 3%; padding-bottom: 3%;">
                    <div class="col-md-12">
                        <div class="hypermodel-item">
                            <div class="row ${boxNo}" style="padding-bottom: 5%;" id='plus' onclick='addnewTraningPhaseCard(this)' >
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
        <div id='responsesChilds${boxNo}' data-text='0'></div>
            <div  id='block${addNewBox}' style="margin-left:-10px;margin-right:-10px;margin-top:-5px;">
                <div class="block-header" style="padding-top:5%;padding-bottom:0%;background:#bbdcf7;">
                    <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;;"><b>Responses</b></p>
                    <i class="fa fa-caret-down fa-sm ${addNewBox}${counter}" aria-hidden="true"  style="margin-top: -10%;"  data-target='#responsesBody${addNewBox}' onclick='collapseResponses(this)'></i>
                </div>
                <div id='responses${addNewBox}${counter}'class='responses${addNewBox}${counter}' style="background: #FFFFFF; margin-top: -5%;">
                    <div id="responsesBody${boxNo}" style="padding-top:1%;"></div>
                    <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%;"  >
                        <div class="row btn btn-sm btn-alt-default dropdown ${boxNo}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;" id='btnGroupVerticalDrop4' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='toggleResponseBtnMenu(this)'>
                            <i class="fa fa-plus"></i>
                            <div class="dropdown-menu drop${boxNo} " aria-labelledby="btnGroupVerticalDrop2">
                            <a class='dropdown-item ${boxNo}' onclick='addTextResponse(this)'>
                                <i class="fa fa-fw fa-envelope-o mr-5"></i>Text
                            </a>
                            <div class="dropdown-divider"></div>
                                <a class="dropdown-item ${boxNo}" onclick='addImageResponse(this)'>
                                    <i class="fa fa-file-image-o mr-5" ></i> Picture
                                </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item ${boxNo}" onclick='addDelayResponse(this)'>
                                <i class="fa fa-fw fa-clock-o fa-lg" ></i> Delay
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
        <div id='userInputChilds${boxNo}' data-text='0'></div>
            <div  id="block"style="margin-left:-10px;margin-right:-10px;margin-top:-5px;">
                <div class="block-header" style="padding-top:5%;padding-bottom:0%; background:#bbdcf7;">
                    <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;;"><b>User Inputs</b></p>
                    <i class="fa fa-caret-down fa-sm ${counter}" aria-hidden="true"  style="margin-top: -10%;"  data-target="#userInput" onclick='colapseUserInputs(this)'></i>
                </div>
                <div id='userInput${counter}' style="background: #FFFFFF; margin-top: -5%;">
                    <div id="userInputBody${boxNo}" style="padding-top:1%;"></div>
                    <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%; ">
                        <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${counter}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='dropdown' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='toggleUserInputBtnMenu(this)'>
                            <span class="fa fa-plus"></span>
                            <div class="dropdown-menu dropdown${addNewBox}${counter}" aria-labelledby="btnGroupVerticalDrop2">
                            <div id='fallbackCounter'></div>
                                <a id='fallDropdown${totalBoxes}' data-text=${totalBoxes}  class="dropdown-item ${addNewBox} ${boxNo} ${newTotalBoxes} ${id} btn" data-text(${counter})  onclick='addFallback1(this)'>
                                    FallBack
                                </a>
                                <div class="dropdown-divider" id='generalCounter'></div>
                                <a id='genDropdown${totalBoxes}' class="dropdown-item ${addNewBox} ${boxNo} ${id}" onclick='addGenral(this)'>
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
    // refreshDom();
    //parent,childCounter
    var pare=`Remove${id}`;
    var chil=`a${id}`
     createLine(pare,chil)
  
    

}
/////////////////////////////////////////////////////////////
//                     CREATE NEW GENRAL BOX              //
///////////////////////////////////////////////////////////
function createNewGenralBox(number,parent,childCounter,boxNo,id){
    // console.log('this is the child counter :'+childCounter);
    var newAddNewBox=parseInt(addNewBox)-1;
    var newTotalBoxes=totalBoxes;
    // console.log('this is the id :'+id);

    // console.log('trying :'+newAddNewBox+''+newTotalBoxes);
    var b=$('#gCount').data('text');
    var a=parent+''+childCounter;
    // console.log('this is the id :'+a);
    $('#colum'+number).append(`
    <div id='child${boxNo}' data-text='1'></div>
    <div id='isFallback${boxNo}' data-text='false'></div>
    <div id='id${boxNo}' data-text=${a}></div>
    <div id='parent${boxNo}' data-text=${b}></div>
    <div id='${id}' data-text='${boxNo}'></div>
    <div  class="hypermodel-grid ${id}" >
    <div class="hypermodel-header" style="background:#3f9ce8; " id='a${id}'>
        <h3 style="margin-left:-5%;color:white;" id='title${boxNo}'>Property</h3>
    </div>
<div class="hypermodel-body" id='mainModel${addNewBox}'>
    <!-- User Says -->
    <div  id="block"style="margin-left:-10px;margin-right:-10px;margin-top:-5px;">
        <div class="block-header" style="padding-top:5%;padding-bottom:0%; background:#bbdcf7;">
            <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;"><b>User Says</b></p>
            <i class="fa fa-caret-down fa-sm ${addNewBox}${counter}" aria-hidden="true"  style="margin-top: -10%;"  data-target="#dynamicUserSays" id='dynamicColapse' onclick='collapseUserSays(this)'></i>
        </div>
    <div id='collapse${addNewBox}${counter}' style="background:white;margin-top: -5%;margin-bottom: -5%;">
        <div id='UserSaysBody${boxNo}'>
            <div class="col-md-12 " id='TraningPhasediv${counter}'  style="padding-top: 3%;">
                <div class="hypermodel-item">
                    <div class="TraningPhaseSpan ${boxNo}" id='TraningPhasediv${boxNo}1' style="float:left; width:80%;" onclick="editTraningPhrase(this)">
                        <span style="font-size: 90%;" id='TraningPhasediv${boxNo}1Span' data-text='Add text here'>Add text here</span>
                    </div>
                </div>
            </div>   
        </div>
        <div id="model-n1000" style="margin-top: 3%; margin-bottom: 3%; padding-bottom: 3%;">
            <div class="col-md-12">
                <div class="hypermodel-item" >
                    <div class="row ${boxNo}" style="padding-bottom: 5%;" id='plus' onclick='addnewTraningPhaseCard(this)' >
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
    <div id='responsesChilds${boxNo}' data-text='0'></div>
    <div  id='block${addNewBox}' style="margin-left:-10px;margin-right:-10px;margin-top:-5px;">
        <div class="block-header" style="padding-top:5%;padding-bottom:0%; background:#bbdcf7;">
            <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;;"><b>Responses</b></p>
            <i class="fa fa-caret-down fa-sm ${addNewBox}${counter}" aria-hidden="true"  style="margin-top: -10%;"  data-target='#responsesBody${addNewBox}' onclick='collapseResponses(this)'></i>
        </div>
        <div id='responses${addNewBox}'class='responses${addNewBox}${counter}'style="background: #FFFFFF; margin-top: -5%;">
            <div id="responsesBody${boxNo}" style="padding-top:1%;"></div>
            <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%;"  >
                <div class="row btn btn-sm btn-alt-default dropdown ${boxNo}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='btnGroupVerticalDrop4' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='toggleResponseBtnMenu(this)'>
                    <i class="fa fa-plus"></i>
                    <div class="dropdown-menu drop${boxNo} " aria-labelledby="btnGroupVerticalDrop2">
                    <a class='dropdown-item ${boxNo}' onclick='addTextResponse(this)'>
                        <i class="fa fa-fw fa-envelope-o mr-5"></i>Text
                    </a>
                    <div class="dropdown-divider"></div>
                        <a class="dropdown-item ${boxNo}" onclick='addImageResponse(this)'>
                            <i class="fa fa-file-image-o mr-5" aria-hidden="true"></i> Picture
                        </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item ${boxNo}" onclick='addDelayResponse(this)'>
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
<div id='ChildCounter${boxNo}' data-text='0'></div>
<div  id="block"style="margin-left:-10px;margin-right:-10px;margin-top:-5px;">
    <div class="block-header" style="padding-top:5%;padding-bottom:0%; background:#bbdcf7;">
        <p class="block-title" style="margin-left:-5%;margin-top:-5%;font-size: 90%; color: #575757;;"><b>User Inputs</b></p>
        <i class="fa fa-caret-down fa-sm ${counter}" aria-hidden="true"  style="margin-top: -10%;"  data-target="#userInput" onclick='colapseUserInputs(this)'></i>
    </div>
    <div id='userInput${counter}' style="background: #FFFFFF; margin-top: -5%;">
        <div id="userInputBody${boxNo}" style="padding-top:1%;"></div>
        <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%; ">
            <div class="row btn btn-sm btn-alt-default dropdown ${boxNo}" id='dropdown' style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='btn${addNewBox}' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='toggleUserInputBtnMenu(this)'>
                    <span class="fa fa-plus"></span>
                <div class="dropdown-menu dropdown${boxNo}" aria-labelledby="btnGroupVerticalDrop2" >
                    <a id='fallDropdown${totalBoxes}' data-text=${totalBoxes}  class="dropdown-item ${number} ${boxNo} ${newTotalBoxes} ${id} btn"  onclick='addFallback1(this)'>
                        FallBack
                    </a>
                    <div class="dropdown-divider"></div>
                    <a id='genDropdown${totalBoxes}' class="dropdown-item ${number} ${boxNo} ${id}" onclick='addGenral(this)'>
                        General
                    </a>
                                                                        
                </div>      
            </div>
        </div>
    </div> 
</div>
</div>

      `)
    //   if($(`#Remove${addNewBox}${totalBoxes}`).length){
        var pare=`Remove${id}`;
         var chil=`a${id}`
          createLine(pare,chil)
    //   }
}