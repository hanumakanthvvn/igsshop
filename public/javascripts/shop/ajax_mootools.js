/*  Copyright (c) 2007 Novator Systems Ltd.
This uses mooTools for the xmlHttp connection
(see mootools.js - http://mootools.net/)
*/

var callFunction = '';
var responseType = '';

/*  This function called for ajax request) with a FORM:
form:  the form object that calls this function
action:  the form action or action class you want to call
type:  the type of response you want (text / xml)
functionName:  the name of the function you want to pass the response to (do NOT pass as string)
*/
function connect(form, action, type, functionName) {
	document.body.style.cursor="wait";
    var url = action;
	var pars = form;
    callFunction = functionName;
    responseType = type;
	
    var myAjax = new Ajax(
        url,
        {
            method: 'post',
            data: pars,
            onFailure: function (req) {
                    alert("The following error occurred while contacting the server" + req.statusText);
            },
            onSuccess: function (responseText){					
					if (responseType.toLowerCase() == "text") {
						callFunction(Json.evaluate(responseText));
					} else if (callFunction == null) {
						return;
					} else {
						callFunction(Json.evaluate(responseText));
					}
					document.body.style.cursor="auto";
			}
        }).request();
}

/*  This function called for ajax request) with parameters:
params:   parameters passed to function in format (ie: firstname=Jane&lastname=Doe&email=not@real.com)
action:  the form action or action class you want to call
type:  the type of response you want (text / xml)
functionName:  the name of the function you want to pass the response to (do NOT pass as string)

Can used without any params (just to make a server call - in which case, the action should just do nothing and expect no params):
connectSection('', 'action.do', '', '');

*/
function connectSection(params, action, type, functionName) {
    document.body.style.cursor="wait";
    var url = action;
    callFunction = functionName;
    responseType = type;

    var myAjax = new Ajax(
        url,
        {
            method: 'post',
            data: params,
            onFailure: function (req) {
                    alert("The following error occurred while contacting the server" + req.statusText);
            },
            onSuccess: function (responseText){
					if (responseType.toLowerCase() == "text") {
						callFunction(Json.evaluate(responseText));
					} else if (callFunction == null) {
						return;
					} else {
						callFunction(Json.evaluate(responseText));
					}
					document.body.style.cursor="auto";
			}
        }).request();
}


