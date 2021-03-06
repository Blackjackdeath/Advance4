"use strict";
const array = [{ name: 'name1', url: 'url1' }, { name: 'name2', url: 'url2' }, [{ name: 'name31', url: 'url31' }, { name: 'name32', url: 'url32' }], { name: 'name4', url: 'url4' }, [{ name: 'name51', url: 'url51' }, [{ name: 'name521', url: 'url521' }, { name: 'name522', url: 'url522' }]], [{ name: 'name61', url: 'url61' }, [{ name: 'name621', url: 'url621' }, [{ name: 'name6221', url: 'url6221' }, { name: 'name6222', url: 'url6222' }]]]];
let i = 0;
let marginLeft = 35;
let leafs = document.querySelector('.wrapper');
//Побудова HTML дерева
function buildHTML(obj, marginLeft, image, selector) {
    let checkLeaf = '';
    let nameLeaf = '';
    let canvasBranch = '';
    if (image === './plus.png') {
        checkLeaf = 'imageH'
    }
    else {
        checkLeaf = '';
    };
    let elem = document.createElement('div');
    elem.style.marginLeft = marginLeft + 'px';
    elem.style.display = 'none';
    if (obj === ' Folder') {
        nameLeaf = ' Folder';
    }
    else {
        nameLeaf = 'name: ' + obj.name + ' url: ' + obj.url;
    };
    if (image === '0') {
        canvasBranch = `<div class="branch" src="0"></div>`
    }
    else {
        canvasBranch = `<img src="${image}" alt="" class="${checkLeaf}">`
    }
    elem.innerHTML = `${canvasBranch}<input class="spanLeaf" value="${nameLeaf}" "></input>`;
    document.querySelector(selector).appendChild(elem);

};

//Рекурсивна функція перебору масиву з n елементів з невідомою вкладеністю масивів без використання циклів
function undefindObj(obj, i, selector) {
    if (obj[i] === undefined) {
        return;
    }
    else {
        if (Array.isArray(obj[i])) {
            buildHTML(' Folder', marginLeft, './plus.png', selector);
            undefindObj(obj[i], 0, selector + '>div:last-child');
            i++;
            return undefindObj(obj, i, selector);
        }
        else {
            buildHTML(obj[i], marginLeft, '0', selector);
            i++;
            return undefindObj(obj, i, selector);
        };
    };
};

//Функція занурення по DOM дерево для клавіші keyUp
function upDepth(elem) {
    if (elem.nodeName === 'DIV' && elem.children[0].getAttribute('src') === './minus.png') {
        return upDepth(elem.children[elem.children.length - 1]);
    };
    if (elem.nodeName === 'DIV' && elem.children[0].getAttribute('src') === './plus.png') {
        elem.children[1].focus();
    }
    else {
        elem.children[elem.children.length - 1].focus();
        return;
    };
};

// функція бульбашка для піднімання по дом дереву
function bubble(element) {
    element = element.parentElement;
    if (downDepth(element) === null) {
        if (element.classList.contains('wrapper')) {
            return
        }
        bubble(element);
    };
}

//Функція занурення по DOM дерево для клавіші keyDown
function downDepth(elem) {
    if (elem.nextElementSibling === null) {
        return null
    };
    elem.nextElementSibling.children[1].focus();
};
// Функція руху вниз
function downMove(event) {
    if (event.target.parentElement.nextElementSibling === null && event.target.previousElementSibling.getAttribute('src') === './plus.png') {
        return
    }
    else {
        if (event.target.previousElementSibling.getAttribute('src') === './plus.png') {
            event.target.parentElement.nextElementSibling.children[1].focus();
        };
        if (event.target.previousElementSibling.getAttribute('src') === './minus.png') {
            event.target.nextElementSibling.children[1].focus();
        };
        if (event.target.previousElementSibling.getAttribute('src') === '0') {
            if (downDepth(event.target.parentElement) === null) {
                bubble(event.target);
            };
        };
    };
};

//Функція руху вверх
function upMove(event) {
    if (event.target.parentElement.previousElementSibling === null) {
        return
    };
    if (event.target.parentElement.previousElementSibling.nodeName === 'DIV' && event.target.parentElement.previousElementSibling.children[0].getAttribute('src') === './minus.png') {
        upDepth(event.target.parentElement.previousElementSibling);
    }
    else {
        if (event.target.parentElement.previousElementSibling.nodeName === 'DIV') {
            event.target.parentElement.previousElementSibling.children[1].focus();
            return;
        }
        else {
            event.target.parentElement.previousElementSibling.focus();
            return;
        };
    };
};
// Функція кліку миші
function branch(event) {
    if (event.target.getAttribute('src') === './plus.png') {
        for (let i = 0; i < event.target.parentElement.children.length; i++) {
            if (event.target.parentElement.children[i].nodeName === 'DIV') {
                event.target.parentElement.children[i].style.display = 'block';
            };
        };
        event.target.setAttribute('src', './minus.png');
    }
    else {
        if (event.target.getAttribute('src') === './minus.png') {
            for (let i = 0; i < event.target.parentElement.getElementsByTagName('div').length; i++) {
                if (event.target.parentElement.getElementsByTagName('div')[i].classList.contains('branch')) {
                }
                else {
                    event.target.parentElement.getElementsByTagName('div')[i].style.display = 'none';
                    if (event.target.parentElement.getElementsByTagName('div')[i].children[0].getAttribute('src') === './minus.png') {
                        event.target.parentElement.getElementsByTagName('div')[i].children[0].setAttribute('src', './plus.png');
                    };
                }

            };
            event.target.setAttribute('src', './plus.png');
        };
    };
}
//Функція Enter
function enterPush(event) {
    if (event.target.previousElementSibling.getAttribute('src') === './plus.png') {
        console.log(event.target.parentElement.children);
        for (let i = 0; i < event.target.parentElement.children.length; i++) {
            if (event.target.parentElement.children[i].nodeName === 'DIV') {
                event.target.parentElement.children[i].style.display = 'block';
            };
        };
        event.target.previousElementSibling.setAttribute('src', './minus.png');
    }
    else {
        if (event.target.previousElementSibling.getAttribute('src') === './minus.png') {
            for (let i = 0; i < event.target.parentElement.getElementsByTagName('div').length; i++) {
                event.target.parentElement.getElementsByTagName('div')[i].style.display = 'none';
                if (event.target.parentElement.getElementsByTagName('div')[i].children[0].getAttribute('src') === './minus.png') {
                    event.target.parentElement.getElementsByTagName('div')[i].children[0].setAttribute('src', './plus.png');
                };
            };
            event.target.previousElementSibling.setAttribute('src', './plus.png');
        };
    };
}
//Функція привязки подій
function bindEvent() {
    leafs.addEventListener('click', (event) => {
        branch(event);
    });
    leafs.addEventListener('keyup', (event) => {
        if (event.key === 'ArrowUp') {
            upMove(event);
        }
        if (event.key === 'ArrowDown') {
            downMove(event);
        }
        if (event.key === 'Enter') {
            branch(event);
        }
    })
};

//Основна робота програми
undefindObj(array, i, '.wrapper > div');
bindEvent();
document.getElementsByTagName('input')[0].focus();


