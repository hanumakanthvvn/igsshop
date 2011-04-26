function submitEnter(event,formName,functionName){
	var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
	if (keyCode == 13){
		if (functionName){
			eval(functionName);
			return false;
		}else{
			document.forms[formName].submit();
		}
	}
}

Element.extend({
    hide: function(){
        this.style.display = 'none';
    },

    show: function(){
        this.style.display = 'block';
    }
});

function getMouseXY(e){

	var mousePos = new Array();
	mousePos['xPos'] = 0;
	mousePos['yPos'] = 0;

	if(window.ie){
		if(window.ie7){
			mousePos['xPos'] = event.clientX + document.documentElement.scrollLeft;
    		mousePos['yPos'] = event.clientY + document.documentElement.scrollTop;
		}else{
			mousePos['xPos'] = event.clientX + document.body.scrollLeft;
    		mousePos['yPos'] = event.clientY + document.body.scrollTop;
		}
	}else{
		mousePos['xPos'] = e.pageX;
		mousePos['yPos'] = e.pageY;
	}
	return mousePos;
}


function changeSelect (ids,on_off) {
	for (var i=0;i<ids.length;i++){
		var tId = ids[i];
		var tPlaceId = ids[i]+"_placeholder";
		if ($(tId)){
			if (on_off){
				$(tId).hide();
				$(tPlaceId).show();
			}else{
				$(tPlaceId).hide();
				$(tId).show();
			}
		}
	}
}

function enterSubmit(evt,form,ccheck) {
	if (evt && evt.keyCode == 13 && clickCounter()){
		if (ccheck == null){
			form.submit();
		}else{
			eval(ccheck);
			counter=0;
		}
	}else{
		return true;
	}
}

var counter = 0;
function clickCounter() {
    counter++;
    if (counter > 1) {
        return false;
    }
    return true;
}

function doClear(theText)
{
     if (theText.value == theText.defaultValue)
 {
         theText.value = ""
     }
 }
