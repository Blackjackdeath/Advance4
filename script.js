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
    };
    let elem = document.createElement('div');
    elem.style.marginLeft = marginLeft + 'px';
    elem.style.display = 'none';
    elem.innerHTML = `<img src="${image}" alt="" class="${checkLeaf}"><input class="spanLeaf" value="elem${obj}"></input>`;
    document.querySelector(selector).appendChild(elem);

}
function undefindObj(obj, i, selector) {
    if (obj[i] === undefined) {
        return;
    }
    else {
        if (Array.isArray(obj[i])) {
            buildHTML(i + 1, marginLeft, './plus.png', selector);
            undefindObj(obj[i], 0, selector + '>div:last-child');
            i++;
            return undefindObj(obj, i, selector);
        }
        else {
            buildHTML(i + 1, marginLeft, './zero.png', selector);
            i++;
            return undefindObj(obj, i, selector);
        };
    };
};
function upDepth(elem){
    if(elem.nodeName==='DIV' && elem.children[0].getAttribute('src') === './minus.png'){
        return upDepth(elem.children[elem.children.length-1]);
    }
    else{
        elem.children[elem.children.length-1].focus();
        return;
    }
}
function upRecursion(event){
    if(event.target.parentElement.previousElementSibling.nodeName === 'DIV' && event.target.parentElement.previousElementSibling.children[0].getAttribute('src') === './minus.png'){
        upDepth(event.target.parentElement.previousElementSibling);
    }
    else{
        if(event.target.parentElement.previousElementSibling.nodeName === 'DIV'){
            event.target.parentElement.previousElementSibling.children[1].focus();
            return;
        }
        else{
            event.target.parentElement.previousElementSibling.focus();
            return;
        };
    };
}
function bindEvent() {
    leafs.addEventListener('click', (branch) => {
        if (branch.target.getAttribute('src') === './plus.png') {
            for (let i = 0; i < branch.target.parentElement.children.length; i++) {
                if (branch.target.parentElement.children[i].nodeName === 'DIV') {
                    branch.target.parentElement.children[i].style.display = 'block';
                };
            };
            branch.target.setAttribute('src', './minus.png');
        }
        else {
            if (branch.target.getAttribute('src') === './minus.png') {
                for (let i = 0; i < branch.target.parentElement.getElementsByTagName('div').length; i++) {
                    branch.target.parentElement.getElementsByTagName('div')[i].style.display = 'none';
                    if (branch.target.parentElement.getElementsByTagName('div')[i].children[0].getAttribute('src') === './minus.png') {
                        branch.target.parentElement.getElementsByTagName('div')[i].children[0].setAttribute('src', './plus.png');
                    };
                };
                branch.target.setAttribute('src', './plus.png');
            };
        };
    });
    leafs.addEventListener('keyup', (event) => {
        if (event.key === 'ArrowUp') {
            if (event.target.parentElement.previousElementSibling === null){
                return
            };
            upRecursion(event);
            // if(event.target.parentElement.previousElementSibling.nodeName === 'DIV' && event.target.parentElement.previousElementSibling.children[0].getAttribute('src') === './minus.png'){
            //     event.target.parentElement.previousElementSibling.children[event.target.parentElement.previousElementSibling.children.length-1].children[1].focus();
            // }
            // else{
            //     if(event.target.parentElement.previousElementSibling.nodeName === 'DIV'){
            //         event.target.parentElement.previousElementSibling.children[1].focus();
            //     }
            //     else{
            //         event.target.parentElement.previousElementSibling.focus();
            //     };
            // };
        }
        if (event.key === 'ArrowDown') {
            alert('Down');
        }
    })
};
undefindObj(array, i, '.wrapper > div');
bindEvent();
document.getElementsByTagName('input')[0].focus()

