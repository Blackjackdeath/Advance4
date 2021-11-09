"use strict";
const array = [{ name: 'name1', url: 'url1' }, { name: 'name2', url: 'url2' }, [{ name: 'name31', url: 'url31' }, { name: 'name32', url: 'url32' }], { name: 'name4', url: 'url4' }, [{ name: 'name51', url: 'url51' }, [{ name: 'name521', url: 'url521' }, { name: 'name522', url: 'url522' }]], [{ name: 'name61', url: 'url61' }, [{ name: 'name621', url: 'url621' }, [{ name: 'name6221', url: 'url6221' }, { name: 'name6222', url: 'url6222' }]]]];
let i = 0;
let marginLeft = 35;
let leafs = document.querySelector('.wrapper');
function buildHTML(obj, marginLeft, image, selector) {
    let checkLeaf = '';
    if (image === './plus.png') {
        checkLeaf = 'imageH'
    }
    else {
        checkLeaf = '';
    }
    document.querySelector(selector).innerHTML = document.querySelector(selector).innerHTML + `<div style="margin-left: ${marginLeft}px" class="visibleLeaf"><img src="${image}" alt="" class="${checkLeaf}"><input class="spanLeaf" value="elem${obj}"></input></div>`;
    //console.log(document.getElementsByTagName('img'));

}
function undefindObj(obj, i, selector) {
    if (obj[i] === undefined) {
        return;
    }
    else {
        if (Array.isArray(obj[i])) {
            document.querySelector(selector).innerHTML = document.querySelector(selector).innerHTML+`<div style="margin-left: ${marginLeft}px" class="visibleLeaf"></div>`;
            buildHTML(i + 1, marginLeft, './plus.png', '.wrapper:last-child');
            marginLeft += 35;
            undefindObj(obj[i], 0, selector);
            marginLeft -= 35;
            i++;
            return undefindObj(obj, i, selector);
        }
        else {
            buildHTML(i + 1, marginLeft, './zero.png', selector);
            i++;
            return undefindObj(obj, i, selector);
        }
    }
}
function builfTree() {
    leafs.addEventListener('click', (branch)=>{
        console.log();
        if(branch.target.getAttribute('src')==='./plus.png'){

        }
    });
};
undefindObj(array, i, '.wrapper');
//builfTree();

