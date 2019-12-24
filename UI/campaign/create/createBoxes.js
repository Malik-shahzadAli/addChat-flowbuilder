////////////////////////////////////////////////////////////
//                  FUNCTION CREATES NEW GENRAL ROW       //
////////////////////////////////////////////////////////////
function createNewGenralBoxRow(parent,childCounter){
    addNewBox++;
    let a=parent+''+childCounter;
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
                    <i class="fa fa-caret-down fa-sm ${addNewBox}${counter}" aria-hidden="true"  style="margin-top: -10%;"  data-target="#dynamicUserSays" onclick='collapseUserSays(this)'></i>
                </div>
            <div id='collapse${addNewBox}${counter}' style="background:white;margin-top: -5%;margin-bottom: -5%;">
                <div id='UserSaysBody${addNewBox}${totalBoxes}'>
                    <div class="col-md-12 " id='TraningPhrasediv${counter}'  style="padding-top: 3%;">
                        <div class="hypermodel-item">
                            <div class="TraningPhraseSpan ${addNewBox}${totalBoxes} ${addNewBox}" id='TraningPhrasediv${addNewBox}${totalBoxes}1' style="float:left; width:80%;" onclick="editTraningPhrase(this)">
                                <span style="font-size: 90%;" id='TraningPhrasediv${addNewBox}${totalBoxes}1Span' data-text='Add text here'>Add text here</span>
                            </div>
                        </div>
                    </div>   
                </div>
                <div id="model-n1000" style="margin-top: 3%; margin-bottom: 3%; padding-bottom: 3%;">
                    <div class="col-md-12">
                        <div class="hypermodel-item">
                            <div class="row ${addNewBox}${totalBoxes} ${addNewBox}" style="padding-bottom: 5%;" id='plus' onclick='addTraningPhraseCard(this)' >
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
                    <i class="fa fa-caret-down fa-sm ${addNewBox}${counter}" aria-hidden="true"  style="margin-top: -10%;"  data-target='#responsesBody${addNewBox}' onclick='collapseResponses(this)'></i>
                </div>
                <div id='responses${addNewBox}${counter}'class='responses${addNewBox}${counter}' style="background: #FFFFFF; margin-top: -5%;">
                    <div id="responsesBody${addNewBox}${totalBoxes}" style="padding-top:1%;"></div>
                    <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%;"  >
                        <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${totalBoxes}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='btnGroupVerticalDrop4' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='toggleResponseBtnMenu(this)'>
                            <i class="fa fa-plus"></i>
                            <div class="dropdown-menu drop${addNewBox}${totalBoxes} " aria-labelledby="btnGroupVerticalDrop2">
                            <a class='dropdown-item ${addNewBox}${totalBoxes} ${addNewBox}' onclick='addTextResponse(this)'>
                                <i class="fa fa-fw fa-envelope-o mr-5"></i>Text
                            </a>
                            <div class="dropdown-divider"></div>
                                <a class="dropdown-item ${addNewBox}${totalBoxes} ${addNewBox}" onclick='addImageResponse(this)'>
                                    <i class="fa fa-file-image-o mr-5" aria-hidden="true"></i> Picture
                                </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item ${addNewBox}${totalBoxes} ${addNewBox}" onclick='addDelayResponse(this)'>
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
                        <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${counter}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='dropdown' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='toggleUserInputBtnMenu(this)'>
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
    let pare=`Remove${a}`;
    let chil=`a${a}`
     createLine(pare,chil)
}

/////////////////////////////////////////////////////////////
//                     CREATE NEW GENRAL BOX              //
///////////////////////////////////////////////////////////
function createNewGenralBox(number,parent,childCounter){
    let b=$('#gCount').data('text');
    let a=parent+''+childCounter;
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
            <i class="fa fa-caret-down fa-sm ${addNewBox}${counter}" aria-hidden="true"  style="margin-top: -10%;"  data-target="#dynamicUserSays" id='dynamicColapse' onclick='collapseUserSays(this)'></i>
        </div>
    <div id='collapse${addNewBox}${counter}' style="background:white;margin-top: -5%;margin-bottom: -5%;">
        <div id='UserSaysBody${addNewBox}${totalBoxes}'>
            <div class="col-md-12 " id='TraningPhrasediv${counter}'  style="padding-top: 3%;">
                <div class="hypermodel-item">
                    <div class="TraningPhraseSpan ${addNewBox}${totalBoxes} ${number}" id='TraningPhrasediv${addNewBox}${totalBoxes}1' style="float:left; width:80%;" onclick="editTraningPhrase(this)">
                        <span style="font-size: 90%;" id='TraningPhrasediv${addNewBox}${totalBoxes}1Span' data-text='Add text here'>Add text here</span>
                    </div>
                </div>
            </div>   
        </div>
        <div id="model-n1000" style="margin-top: 3%; margin-bottom: 3%; padding-bottom: 3%;">
            <div class="col-md-12">
                <div class="hypermodel-item" >
                    <div class="row ${addNewBox}${totalBoxes} ${number}" style="padding-bottom: 5%;" id='plus' onclick='addTraningPhraseCard(this)' >
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
            <i class="fa fa-caret-down fa-sm ${addNewBox}${counter}" aria-hidden="true"  style="margin-top: -10%;"  data-target='#responsesBody${addNewBox}' onclick='collapseResponses(this)'></i>
        </div>
        <div id='responses${addNewBox}'class='responses${addNewBox}${counter}'style="background: #FFFFFF; margin-top: -5%;">
            <div id="responsesBody${addNewBox}${totalBoxes}" style="padding-top:1%;"></div>
            <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%;"  >
                <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${totalBoxes}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='btnGroupVerticalDrop4' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='toggleResponseBtnMenu(this)'>
                    <i class="fa fa-plus"></i>
                    <div class="dropdown-menu drop${addNewBox}${totalBoxes} " aria-labelledby="btnGroupVerticalDrop2">
                    <a class='dropdown-item ${addNewBox}${totalBoxes} ${number}' onclick='addTextResponse(this)'>
                        <i class="fa fa-fw fa-envelope-o mr-5"></i>Text
                    </a>
                    <div class="dropdown-divider"></div>
                        <a class="dropdown-item ${addNewBox}${totalBoxes} ${number}" onclick='addImageResponse(this)'>
                            <i class="fa fa-file-image-o mr-5" aria-hidden="true"></i> Picture
                        </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item ${addNewBox}${totalBoxes} ${number}" onclick='addDelayResponse(this)'>
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
            <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${totalBoxes}" id='dropdown' style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='btn${addNewBox}' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='toggleUserInputBtnMenu(this)'>
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
      let pare=`Remove${a}`;
      let chil=`a${a}`;
      createLine(pare,chil)
}

/////////////////////////////////////////////////////////////////////
//              FUNCTION CREATE NEW FALLBACK ROW                  //
///////////////////////////////////////////////////////////////////

function createNewFallbackBoxRow(parent,childCounter){
    addNewBox++;
    let a=parent+''+childCounter;
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
                <i class="fa fa-caret-down fa-sm ${addNewBox}${counter}" aria-hidden="true"  style="margin-top: -10%;"  data-target='#responsesBody${addNewBox}' onclick='collapseResponses(this)'></i>
            </div>
            <div id='responses${addNewBox}${counter}'class='responses${addNewBox}${counter}' style="background: #FFFFFF; margin-top: -5%;">
                <div id="responsesBody${addNewBox}${totalBoxes}" style="padding-top:1%;"></div>
                <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%;"  >
                    <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${totalBoxes}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='btnGroupVerticalDrop4' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='toggleResponseBtnMenu(this)'>
                        <i class="fa fa-plus"></i>
                        <div class="dropdown-menu drop${addNewBox}${totalBoxes} " aria-labelledby="btnGroupVerticalDrop2">
                        <a class='dropdown-item ${addNewBox}${totalBoxes} ${addNewBox}' onclick='addTextResponse(this)'>
                            <i class="fa fa-fw fa-envelope-o mr-5"></i>Text
                        </a>
                        <div class="dropdown-divider"></div>
                            <a class="dropdown-item ${addNewBox}${totalBoxes} ${addNewBox}" onclick='addImageResponse(this)'>
                                <i class="fa fa-file-image-o mr-5" aria-hidden="true"></i> Picture
                            </a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item ${addNewBox}${totalBoxes} ${addNewBox}" onclick='addDelayResponse(this)'>
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
                    <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${counter}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='dropdown' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='toggleUserInputBtnMenu(this)'>
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
  let pare=`Remove${a}`;
  let chil=`a${a}`
   createLine(pare,chil)
  $('#tgen').data('text',($('#fallCount').data('text')+addNewBox))


}

//////////////////////////////////////////////////////////
//        FUNCTION CREATES NEW FALL BACK BOX           //
////////////////////////////////////////////////////////

function createNewFallbackBox(number,parent,childCounter){
    let a=parent+''+childCounter;
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
                    <i class="fa fa-caret-down fa-sm ${addNewBox}${counter}" aria-hidden="true"  style="margin-top: -10%;"  data-target='#responsesBody${addNewBox}' onclick='collapseResponses(this)'></i>
                </div>
                <div id='responses${addNewBox}${counter}'class='responses${addNewBox}${counter}' style="background: #FFFFFF; margin-top: -5%;">
                    <div id="responsesBody${addNewBox}${totalBoxes}" style="padding-top:1%;"></div>
                    <div class="btn-group dropup col-md-12 " role="group" id='button' style="margin-top: 3%; margin-left:6%; width: 87%;"  >
                        <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${totalBoxes}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='btnGroupVerticalDrop4' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='toggleResponseBtnMenu(this)'>
                            <i class="fa fa-plus"></i>
                            <div class="dropdown-menu drop${addNewBox}${totalBoxes} " aria-labelledby="btnGroupVerticalDrop2">
                            <a class='dropdown-item ${addNewBox}${totalBoxes} ${number}' onclick='addTextResponse(this)'>
                                <i class="fa fa-fw fa-envelope-o mr-5"></i>Text
                            </a>
                            <div class="dropdown-divider"></div>
                                <a class="dropdown-item ${addNewBox}${totalBoxes} ${number}" onclick='addImageResponse(this)'>
                                    <i class="fa fa-file-image-o mr-5" aria-hidden="true"></i> Picture
                                </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item ${addNewBox}${totalBoxes} ${number}" onclick='addDelayResponse(this)'>
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
                        <div class="row btn btn-sm btn-alt-default dropdown ${addNewBox}${counter}" style="padding-bottom: 3%; padding-top: 4%; color: #3f9ce8;; " id='dropdown' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick='toggleUserInputBtnMenu(this)'>
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
    let pare=`Remove${a}`;
    let chil=`a${a}`
     createLine(pare,chil)
    $('#tgen').data('text',($('#fallCount').data('text')+addNewBox));
   
}