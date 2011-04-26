var compatible = (document.getElementsByTagName && document.createElement);
var selectDivs = new Array("sort_select","productsPerPage_select","search_sort");

function initNavigation() {
	var lists = document.getElementsByTagName('ul');
	for (var i=0;i<lists.length;i++) {
		if (lists[i].className != 'menutree') continue;
		lists[i].onmouseover = navMouseOver;
		lists[i].onmouseout = navMouseOut;
		var listItems = lists[i].getElementsByTagName('li');
		for (var j=0;j<listItems.length;j++) {
			var test = listItems[j].getElementsByTagName('ul')[0];
			if (test) {
				listItems[j].firstChild.onfocus = navMouseOver;
				listItems[j].relatedItem = test;
			}
		}
	}
}

var currentlyOpenedMenus = new Array();
var currentlyFocusedItem;

function navMouseOver(e) {
	var evt = e || window.event;
	var evtTarget = evt.target || evt.srcElement;
	if (evtTarget.nodeName == 'UL') return;
	while (evtTarget.nodeName != 'LI')
		evtTarget = evtTarget.parentNode;
	foldMenuIn(evtTarget);
	if (evtTarget.relatedItem && !evtTarget.relatedItem.opened) {
		if(window.ie6){
			changeSelect(selectDivs,true);
		}
		if(evtTarget.className=='noselectselectAccross')
		  evtTarget.className = 'highlightone';
		else
   		  evtTarget.className = 'highlight';
		evtTarget.relatedItem.className = 'foldOut';
		evtTarget.relatedItem.opened = true;
		currentlyOpenedMenus.push(evtTarget.relatedItem);

	}
}

function navMouseOut(e) {
	var evt = e || window.event;
	var relatedNode = evt.relatedTarget || evt.toElement;
	foldMenuIn(relatedNode);
}

function foldMenuIn(targetNode) {
	if (!targetNode) return;
	var newCurrentlyOpenedMenus = new Array();
	for (var i=0;i<currentlyOpenedMenus.length;i++) {
		if (!containsElement(currentlyOpenedMenus[i],targetNode)) {
			currentlyOpenedMenus[i].className = '';
			if(currentlyOpenedMenus[i].parentNode.className=='highlightone')
			   currentlyOpenedMenus[i].parentNode.className = 'noselectselectAccross';
		    else
			   currentlyOpenedMenus[i].parentNode.className = 'noselect';
			currentlyOpenedMenus[i].opened = false;
			if(window.ie6){
				changeSelect(selectDivs,false);
			}
		}
		else
			newCurrentlyOpenedMenus.push(currentlyOpenedMenus[i]);
	}
	currentlyOpenedMenus = newCurrentlyOpenedMenus;
}

function containsElement(obj1,obj2) {
	while (obj2.nodeName != 'HTML') {
		if (obj2 == obj1) return true;
		obj2 = obj2.parentNode;
	}
	return false;
}

addEventSimple(window,"load",initNavigation);

function addEventSimple(obj,evt,fn) {
	if (obj.addEventListener)
		obj.addEventListener(evt,fn,false);
	else if (obj.attachEvent)
		obj.attachEvent('on'+evt,fn);
}

function removeEventSimple(obj,evt,fn) {
	if (obj.removeEventListener)
		obj.removeEventListener(evt,fn,false);
	else if (obj.detachEvent)
		obj.detachEvent('on'+evt,fn);
}

/** PUSH AND SHIFT FOR IE5 **/

function Array_push() {
	var A_p = 0
	for (A_p = 0; A_p < arguments.length; A_p++) {
		this[this.length] = arguments[A_p]
	}
	return this.length
}

if (typeof Array.prototype.push == "undefined") {
	Array.prototype.push = Array_push
}

function Array_shift() {
	var A_s = 0
	var response = this[0]
	for (A_s = 0; A_s < this.length-1; A_s++) {
		this[A_s] = this[A_s + 1]
	}
	this.length--
	return response
}

if (typeof Array.prototype.shift == "undefined") {
	Array.prototype.shift = Array_shift
}
