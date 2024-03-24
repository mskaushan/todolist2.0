'use strict';

function onPageLoaded() {
    const input = document.querySelector('.input-text');
    const add = document.querySelector('.input-button');
    const items = document.querySelector('.items');
    let list = [];
    let changeButton = true;
    let index = null;
    
    const addItem = () => {
        if (input.value == '') {
            return false;
        } else if (changeButton === true) {
            render(input.value);
            clearInput();
        } else if (changeButton === false) {
            editItem();
        }
    }

    const render = (elem) => {
        const item = document.createElement('div');
        item.classList.add('item');
        const itemP = document.createElement('div');
        itemP.classList.add('itemP');
        const p = document.createElement('p');
        p.classList.add('p');
        const itemEdit = document.createElement('button');
        const itemImg = document.createElement('div');
        itemImg.classList.add('itemImg');
        const a = document.createElement('a');
        a.classList.add('a');
        a.href = '##';
        const icon = document.createElement('i');
        icon.classList.add('fa', 'fa-trash-o');
        item.append(itemP, itemEdit, itemImg);
        itemP.append(p);
        itemImg.append(a);
        a.append(icon);
        p.append(elem);
        items.prepend(item);
        saveList();
    }

    const changeList = () => {
        items.addEventListener('click', (e) => {
            let a = e.target.closest('a');
            let b = e.target.closest('button');
    
            if (a && changeButton) {
                a.parentElement.parentElement.remove();
                saveList();
            } else if (b) {
                let itemFromList = b.parentElement.firstChild.firstChild.innerHTML;
                input.value = itemFromList;
                changeButton = false;
                index = list.indexOf(itemFromList);
            }
        });
    }   
    changeList();

    const saveList = () => {
        let p = items.querySelectorAll('.p');
        list = [];
        for (let elem of p) {
            list.push(elem.innerHTML);
        }
        localStorage.toDoList = JSON.stringify({list: list});
    }

    const editItem = () => {
        list[index] = input.value;
        items.replaceChildren();
        for (let elem of list.reverse()) {
            render(elem);
        }
        changeButton = true;
        index = null;
        clearInput();
    };

    const getList = () => {
        if (localStorage.getItem('toDoList')) {
            let listFromLocalStorage = JSON.parse(localStorage.toDoList);
            for (let elem of listFromLocalStorage.list.reverse()) {
                render(elem);
            }
        }
    }
    getList();
    
    (() => {
        input.addEventListener('keydown', (e) => {
            if (e.keyCode === 13) {
                addItem();
            }
        });
    })();

    const clearInput = () => {
        input.value = '';
    }

    add.addEventListener('click', addItem);
}
document.addEventListener('DOMContentLoaded', onPageLoaded);