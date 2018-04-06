// ==UserScript==
// @name         Simple Sign-in
// @namespace    http://zkcpku.github.io
// @version      0.1
// @description  simplily Sign-in!
// @author       You
// @match        http://cxsjsx.openjudge.cn/
// @grant       GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    let top = document.getElementById("headerTop");
    if(top.childNodes[1].childNodes[3].childNodes[1].childNodes[0].innerHTML == "登入")
    {
       let url =  top.childNodes[1].childNodes[3].childNodes[1].childNodes[0].href;
       GM_xmlhttpRequest({ method: "GET", url: url,
                               onload: function(responseDetails)
                               {
                                   var parser = new DOMParser();
                                   var dom = parser.parseFromString(responseDetails.responseText,
                                                                    "text/html");
                                   let signIn = dom.getElementById("pagebody");
                                   console.log(signIn.childNodes[1].childNodes[1].childNodes[1].childNodes[5].childNodes[5]);
                                   let register = signIn.childNodes[1].childNodes[1].childNodes[1].childNodes[5].childNodes[5];
                                   if(register)
                                   {
                                       let br = document.createElement("br");
                                       register.parentNode.replaceChild(br, register);
                                   }
                                   //寻找标题：程序设计实习
                                   let allTextareas, thisTextarea;
                                   let title;
                                   allTextareas = document.getElementsByTagName('h1');
                                   for (let i = 0; i < allTextareas.length; i++) {
                                       thisTextarea = allTextareas[i];
                                       if(thisTextarea.innerHTML == "程序设计实习")
                                       {
                                           title = thisTextarea;
                                           break;
                                       }
                                   }
                                   title = title.parentNode.parentNode;
                                   if(title != undefined)
                                   {
                                       title.parentNode.insertBefore(signIn, title);
                                   }

                               }
                         });
    }
    // Your code here...
})();
