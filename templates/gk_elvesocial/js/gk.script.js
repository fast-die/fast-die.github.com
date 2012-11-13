/*
#------------------------------------------------------------------------
# elvesocial - July 2010 UPDATE - ver. 2.0.2  (for Joomla 1.5)
#
# Copyright (C) 2007-2010 Gavick.com. All Rights Reserved.
# License: Copyrighted Commercial Software
# Website: http://www.gavick.com
# Support: support@gavick.com   
#------------------------------------------------------------------------ 
# Based on T3 Framework
#------------------------------------------------------------------------
# Copyright (C) 2004-2009 J.O.O.M Solutions Co., Ltd. All Rights Reserved.
# @license - GNU/GPL, http://www.gnu.org/copyleft/gpl.html
# Author: J.O.O.M Solutions Co., Ltd
# Websites: http://www.joomlart.com - http://www.joomlancers.com
#------------------------------------------------------------------------
*/

//Call noconflict if detect jquery
//Apply jquery.noConflict if jquery is enabled
if ($defined(window.jQuery) && $type(jQuery.noConflict)=='function') {
	jQuery.noConflict();
	jQuery.noConflict();
}

function switchFontSize (ckname,val){
	var bd = $E('body');
	switch (val) {
		case 'inc':
			if (CurrentFontSize+1 < 7) {
				bd.removeClass('fs'+CurrentFontSize);
				CurrentFontSize++;
				bd.addClass('fs'+CurrentFontSize);
			}		
		break;
		case 'dec':
			if (CurrentFontSize-1 > 0) {
				bd.removeClass('fs'+CurrentFontSize);
				CurrentFontSize--;
				bd.addClass('fs'+CurrentFontSize);
			}		
		break;
		default:
			bd.removeClass('fs'+CurrentFontSize);
			CurrentFontSize = val;
			bd.addClass('fs'+CurrentFontSize);		
	}
	Cookie.set(ckname, CurrentFontSize,{duration:365});
}

function switchTool (ckname, val) {
	createCookie(ckname, val, 365);
	window.location.reload();
}

function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

//addEvent - attach a function to an event
function gkAddEvent(obj, evType, fn){ 
 if (obj.addEventListener){ 
   obj.addEventListener(evType, fn, false); 
   return true; 
 } else if (obj.attachEvent){ 
   var r = obj.attachEvent("on"+evType, fn); 
   return r; 
 } else { 
   return false; 
 } 
}

Fx.Opacity = Fx.Style.extend({initialize: function(el, options){this.now = 1;this.parent(el, 'opacity', options);},toggle: function(){return (this.now > 0) ? this.start(1, 0) : this.start(0, 1);},show: function(){return this.set(1);}});

Fx.Width = Fx.Style.extend({initialize: function(el, options){this.element = $(el);this.element.setStyle('overflow', 'hidden');this.iniWidth = this.element.getStyle('width').toInt();this.parent(this.element, 'width', options);},toggle: function(){var style = this.element.getStyle('width').toInt();if (style > 0) return this.start(style, 0);else return this.start(0, this.iniWidth);},show: function(){return this.set(this.iniWidth);}}); 

Fx.Height = Fx.Style.extend({initialize: function(el, options){this.parent(el, 'height', options);this.element.setStyle('overflow', 'hidden');},toggle: function(){return (this.element.offsetHeight > 0) ? this.custom(this.element.offsetHeight, 0) : this.custom(0, this.element.scrollHeight);},show: function(){return this.set(this.element.scrollHeight);}}); 
 
window.addEvent('load', function() {
	new SmoothScroll(); 
	
	var login = false;
	var register = false;
	var tools = false;
	var login_fx = null;
	var hlogin_fx = null;
	var register_fx = null;
	var hregister_fx = null;
	var tools_fx = null;
	var link_login_fx = null;
	var link_reg_fx = null;
	
	if($('btn_login')){
		login_fx = new Fx.Opacity($('popup_login'),{duration:300}).set(0);
		hlogin_fx = new Fx.Height($('popup_login'),{duration:300}).set(0);
		
		$('popup_login').setStyle('display','block');
		$('btn_login').addEvent('click', function(e){
			new Event(e).stop();
			if(!login){
				login_fx.start(1);
				hlogin_fx.toggle();
				login = true;	
			}else{
				login_fx.start(0);
				hlogin_fx.start(0);
				login = false;
			}
			if(register){
				register_fx.start(0);
				hregister_fx.start(0);
				register = false;
			}
		});
	}
	
	if($('btn_register')){
		register_fx = new Fx.Opacity($('popup_register'),{duration:300}).set(0);
		hregister_fx = new Fx.Height($('popup_register'),{duration:300}).set(0);
		
		$('popup_register').setStyle('display','block');
		$('btn_register').addEvent('click', function(e){
			new Event(e).stop();
			if(!register){
				register_fx.start(1);
				hregister_fx.toggle();
				register = true;	
			}else{
				register_fx.start(0);
				hregister_fx.start(0);
				register = false;
			}
			if(login){
				login_fx.start(0);
				hlogin_fx.start(0);
				login = false;
			}
		});	
	}
	
	if($('btn_tools')){
		var pos = 20 + $('btn_tools').getCoordinates().width;
		var opened = false;
		if($('btn_login')) link_login_fx = new Fx.Opacity($('btn_login'),{duration:300});
		if($('btn_register')) link_reg_fx = new Fx.Opacity($('btn_register'),{duration:300});
		
		$('popup_tools').getParent().setProperty('class','gk_hide').setStyles({
			'margin-right' : pos+'px',
			'display' : 'block'
		});
		$('popup_tools').setStyle('display', 'block');
		tools_fx = new Fx.Width($('popup_tools').getParent(),{duration:300}).set(0);
		$('btn_tools').addEvent('click', function(e){
			new Event(e).stop();
			if(!window.ie) tools_fx.toggle();
			else tools_fx.start((opened) ? 0 : 60);
			if($('btn_login')) link_login_fx.toggle();
			if($('btn_register')) link_reg_fx.toggle();
			opened = !opened;
		});	
		
		if($E('.gk_popup_close',$('popup_login'))){
			$E('.gk_popup_close',$('popup_login')).addEvent("click", function(){
				if(!login){
					login_fx.start(1);
					hlogin_fx.toggle();
					login = true;	
				}else{
					login_fx.start(0);
					hlogin_fx.start(0);
					login = false;
				}
			});
		}
		if($E('.gk_popup_close',$('popup_register'))){
			$E('.gk_popup_close',$('popup_register')).addEvent("click", function(){
				if(!register){
					register_fx.start(1);
					hregister_fx.toggle();
					register = true;	
				}else{
					register_fx.start(0);
					hregister_fx.start(0);
					register = false;
				}
			});	
		}
	}
	
	//
	if($('stylearea')){
		$A($$('.style_switcher')).each(function(element,index){
			element.addEvent('click',function(event){
				var event = new Event(event);
				event.preventDefault();
				changeStyle(index+1);
			});
		});
		new SmoothScroll();
	}
});

// Function to change styles
function changeStyle(style){
	var file = tmplurl+'/css/style'+style+'.css';
	new Asset.css(file);
	new Cookie.set('gk35_style',style,{duration: 200,path: "/"});
}

// JCaptionCheck
function JCaptionCheck(){ return (typeof(JCaption) == "undefined")?  false: true; }

if(!JCaptionCheck()) {
	var JCaption = new Class({
		initialize: function(selector)
		{
			this.selector = selector;
			var images = $$(selector);
			images.each(function(image){ this.createCaption(image); }, this);
		},

		createCaption: function(element)
		{
			var caption   = document.createTextNode(element.title);
			var container = document.createElement("div");
			var text      = document.createElement("p");
			var width     = element.getAttribute("width");
			var align     = element.getAttribute("align");
			var docMode = document.documentMode;

			//Windows fix
			if (!align)
				align = element.getStyle("float");  // Rest of the world fix
			if (!align) // IE DOM Fix
				align = element.style.styleFloat;

			text.appendChild(caption);
			text.className = this.selector.replace('.', '_');

			if (align=="none") {
				if (element.title != "") {
					element.parentNode.replaceChild(text, element);
					text.parentNode.insertBefore(element, text);
				}
			} else {
				element.parentNode.insertBefore(container, element);
				container.appendChild(element);
				if ( element.title != "" ) {
					container.appendChild(text);
				}
				container.className   = this.selector.replace('.', '_');
				container.className   = container.className + " " + align;
				container.setAttribute("style","float:"+align);

				//IE8 fix
				if (!docMode|| docMode < 8) {
					container.style.width = width + "px";
				}
			}

		}
	});

	document.caption = null;
	window.addEvent('load', function() {
		var caption = new JCaption('img.caption')
		document.caption = caption
	});
}