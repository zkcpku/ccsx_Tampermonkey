// ==UserScript==
// @name         Simple Watching
// @namespace    http://zkcpku.github.io
// @version      0.1
// @description  simplily find the homework!
// @author       You
// @match        http://cxsjsx.openjudge.cn/
// @grant       GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';
    let teachers = ["郭","不"];
    let allDivs, thisDiv;
    let myArray=[];
    allDivs = document.evaluate(
        '//a[@href]',
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    for (let i = 0; i < allDivs.snapshotLength; i++)
    {
        thisDiv = allDivs.snapshotItem(i);
        let txt = thisDiv.innerHTML;
        //alert(thisDiv.parentNode.tagName);
        for(let j = 0;j <teachers.length; j++)
        {
            let teacher = teachers[j];
            if(txt.indexOf(teacher) != -1 && thisDiv.parentNode.tagName == "H3" )//确定是未结束的题
            {
                var clone = thisDiv.cloneNode(true);
                myArray.push(clone);
            }
        }
    }
    let allTextareas, thisTextarea;
    //寻找标题：程序设计实习
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
    title = title.parentNode.nextElementSibling;
    //创建新的框架：我的作业
    let homework;
    homework = document.createElement("div");
    homework.innerHTML = '<div class="coming-contest label"><h3><span>»</span><a>我的作业</a></h3><ul class="container"><p></p></ul></div>';
    let homeTEXT = homework.childNodes[0].childNodes[0].childNodes[1].innerHTML;
    //alert(homeTEXT);
    //用来判断作业是否都做完了
    title.parentNode.insertBefore(homework, title);
    title = homework.childNodes[0].childNodes[1].childNodes[0];
    let first = true;
    if(title.innerHTML !== undefined)
    {
        while(myArray.length !== 0)
        {
            if(first)
            {
                first = false;
            }
            else
            {
                let br = document.createElement("br");
                title.parentNode.insertBefore(br, title);
            }
            let newElement;
            newElement = myArray.pop();
            //检查是否做完
            let nextHTML = newElement.href;
            GM_xmlhttpRequest({ method: "GET", url: nextHTML,
                               onload: function(responseDetails)
                               {
                                   var parser = new DOMParser();
                                   var dom = parser.parseFromString(responseDetails.responseText,
                                                                    "text/html");
                                   //console.log(dom);
                                   var tbody;
                                   var tbodies = dom.evaluate(
                                       '//tbody[*]',
                                       dom,
                                       null,
                                       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                       null);
                                   if(tbodies.snapshotLength == 1)
                                   {
                                       tbody = tbodies.snapshotItem(0);
                                       let trs =[];
                                       let solve = 0;
                                       for(let i = 0;i<tbody.childNodes.length;i++)
                                       {
                                           if(tbody.childNodes[i].tagName == "TR")
                                           {
                                               trs.push(tbody.childNodes[i]);
                                               let td = tbody.childNodes[i].childNodes[1];
                                               if(td.tagName === "TD" && td.className === "solved" && td.childNodes.length !== 0 && td.childNodes[0].title== "已解决" )
                                               {
                                                   solve = solve + 1;
                                               }
                                           }
                                       }
                                       //alert(trs.length);
                                       newElement.innerHTML = newElement.innerHTML + " " + solve + "/" + trs.length;
                                       if(solve != trs.length)
                                       {
                                           homework.childNodes[0].childNodes[0].childNodes[1].innerHTML = homework.childNodes[0].childNodes[0].childNodes[1].innerHTML + "没做完/(ㄒoㄒ)/~~";
                                      }
                                   }
                               } });
            //将链接插入框架中
            title.parentNode.insertBefore(newElement, title);
        }
    }

    // Your code here...
})();
