// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 **/
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // renderStatus(url); // Shows "undefined", because chrome.tabs.query is async.
}
/**
 * @param {string} searchTerm - Search term for Google Image search.
 * @param {function(string,number,number)} callback - Called when an image has
 *   been found. The callback gets the URL, width and height of the image.
 * @param {function(string)} errorCallback - Called when the image is not found.
 *   The callback gets a string that describes the failure reason.
 */

function logout()
{
  var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","https://www.njindiaonline.in/pdesk/logout.fin",true);
    xmlhttp.send();
    
}

function update()
{
  renderHtml('<h2>Save Credentials</h2><form><div class="form-group"><input type="text" class="form-control" id="username" placeholder="Username"></div><div class="form-group"><input type="password" class="form-control" id="password" placeholder="Password"></div><div class="form-group"><button id="save" class="btn btn-danger">Save</button></div></form>');
  document.getElementById('save').addEventListener('click',save_options);
}

function login() {
  chrome.storage.sync.get({
    username : "",
    password: ""
  }, function(items) {
     var username = items.username;
    var password = items.password;
    // return;
    if(username=='')
  {
    //window.renderStatus('Please save username, password from options in extensions page.');
    //window.renderHtml('<input type="text" id="username" placeholder="Username"><input type="password" id="password" placeholder="Password"><div id="status"></div><br><button id="save">Save</button>');
    return;
  }
  else
  {
    renderHtml("<h4>Logging in as " + username + "</h4><br><button class='btn btn-danger'id='updatebtn'>Update details</button>");
      document.getElementById('updatebtn').addEventListener('click',update);
      
      chrome.tabs.executeScript({code: 'document.getElementById("partnerId1").value ="'+ username+'";document.getElementById("password1").value ="'+password+'";onSubmit();function LoadReset(){var frm=document.loginFrom; if(document.getElementById("employeepartner").checked){document.getElementById("employeepartner1").value=""; document.getElementById("employeepartner").value="";}document.getElementById("partnerId1").value=""; document.getElementById("partnerId1").value=""; document.getElementById("password1").value=""; document.getElementById("password").value=""; if(document.getElementById("message")){document.getElementById("message").innerHTML="";}}function showhide(){var frm=document.getElementById("loginFrom"); document.getElementById("partnerEmployeeId1").value=""; document.getElementById("password1").value=""; document.getElementById("partnerEmployeeId").value=""; document.getElementById("password").value=""; if(document.getElementById("partner").checked){document.getElementById("loginIdDiv").style.display="none"; frm.loginFor.value="partner";}else{document.getElementById("loginIdDiv").style.display=""; frm.loginFor.value="employeepartner";}}function hidetop(){document.getElementById("back").style.display="none"; document.getElementById("home").style.display="none"; document.getElementById("logout").style.display="none";}function onSubmit(){var frm=document.getElementById("loginFrom"); document.getElementById("partnerId").value=trimTab(document.getElementById("partnerId1").value); document.getElementById("partnerId").value=trimAll(document.getElementById("partnerId1").value); if(document.getElementById("partnerId1").value.length==0){alert("Please enter valid Partner ID"); document.getElementById("partnerId1").focus(); return false;}if(document.getElementById("employeepartner").checked){document.getElementById("partnerEmployeeId").value=trimTab(document.getElementById("partnerEmployeeId1").value); document.getElementById("partnerEmployeeId").value=trimAll(document.getElementById("partnerEmployeeId1").value); if(document.getElementById("partnerEmployeeId1").value.length==0){alert("Please enter valid Login ID"); document.getElementById("partnerEmployeeId1").focus(); return false;}}document.getElementById("password").value=trimTab(document.getElementById("password1").value); document.getElementById("password").value=trimAll(document.getElementById("password1").value); if(document.getElementById("password1").value.length==0){alert("Please enter valid Password"); document.getElementById("partnerId1").focus(); return false;}if(document.getElementById("recaptcha_response_field")){document.getElementById("recaptcha_response_field").value=trimAll(document.getElementById("recaptcha_response_field").value); if(document.getElementById("recaptcha_response_field").value.length==0){alert("Please enter valid Captcha"); document.getElementById("recaptcha_response_field").focus(); return false;}}if(document.getElementById("app_for")){if(document.getElementById("app_for").value=="mpdesk"){frm.action="mpdesklogin.fin?cmdAction=getCheckCrediantial";}}else{frm.action="login.fin?cmdAction=getCheckCrediantial";}frm.submit();}function window_open(url, winname){var param=getalldata(document.loginFrom); var params=""; params="top=200, left=400,"; params +="width=550"; params +=",height=470"; params +=",menubar=no"; params +=",scrollbars=no"; params +=",resizable=no"; var form=document.createElement("form"); form.setAttribute("method", "post"); form.setAttribute("action", url); form.setAttribute("target", winname); var fparams=param.split("&"); for (var i=0; i < fparams.length; i++){var fparamsProperty=fparams[i].split("="); if (fparamsProperty[0]==="loginFor"){if (Trim(fparamsProperty[1]) !==""){var input=document.createElement("input"); input.type="hidden"; input.name=fparamsProperty[0]; input.value=fparamsProperty[1]; form.appendChild(input);}}}document.body.appendChild(form); newwin=window.open("", winname, params); form.submit(); document.body.removeChild(form); if (window.focus){newwin.focus()}}function window_open_mpdesk(url, winname){var items=new Array(); items.push("loginFor="+document.getElementById("login_for").value); items.push("access_from="+document.getElementById("access_frob1_animm").value); items.push("fromEdesk="+document.getElementById("fromEdesk").value); items.push("partnerEmployeeId="+document.getElementById("partnerEmployeeId").value); items.push("partnerId="+document.getElementById("partnerId").value); items.push("password="+document.getElementById("password").value); items.push("password="+document.getElementById("app_for").value); items.push("appFor="+document.getElementById("login_for").value); var param=items.join("&"); var params=""; params="top=200, left=400,"; params +="width=550"; params +=",height=470"; params +=",menubar=no"; params +=",scrollbars=no"; params +=",resizable=no"; var form=document.createElement("form"); form.setAttribute("method", "post"); form.setAttribute("action", url); form.setAttribute("target", winname); var fparams=param.split("&"); for (var i=0; i < fparams.length; i++){var fparamsProperty=fparams[i].split("="); if (fparamsProperty[0]==="loginFor"){if (Trim(fparamsProperty[1]) !==""){var input=document.createElement("input"); input.type="hidden"; input.name=fparamsProperty[0]; input.value=fparamsProperty[1]; form.appendChild(input);}}}document.body.appendChild(form); newwin=window.open("", winname, params); form.submit(); document.body.removeChild(form); if (window.focus){newwin.focus()}}function trimAll(sString){while (sString.substring(0,1)==" ") sString=sString.substring(1, sString.length); while (sString.substring(sString.length-1, sString.length)==" ") sString=sString.substring(0,sString.length-1); return sString;}function trimTab(sString){while (sString.substring(0,1)=="") sString=sString.substring(1, sString.length); while (sString.substring(sString.length-1, sString.length)=="") sString=sString.substring(0,sString.length-1); return sString;}function isEnterKey(e){var key; if(window.event){key=window.event.keyCode; }else{key=e.which;}if(key==13){onSubmit();}}' });
      
//      setTimeout(function(){
//    self.close();
//},1500);
      
    }
  

  });
}



function renderStatus(statusText) {
    document.getElementById('content')
        .textContent = statusText;
}

function renderHtml(markup) {
    document.getElementById('content')
        .innerHTML = markup;
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    // Put the image URL in Google search.
    //renderStatus('Logging you In ' + url);

    login();
  });
});
