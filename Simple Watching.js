// ==UserScript==
// @name         Simple Watching
// @namespace    http://zkcpku.github.io
// @version      0.1
// @description  simplily find the homework!
// @author       You
// @match        http://cxsjsx.openjudge.cn/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let teacher = "郭";
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
        if(txt.indexOf(teacher) != -1 && thisDiv.parentNode.tagName == "H3" )//确定是未结束的题
        {
            var clone = thisDiv.cloneNode(true);
            myArray.push(clone);
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
            title.parentNode.insertBefore(newElement, title);
        }
    }

    // Your code here...
})();
