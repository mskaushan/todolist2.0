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

        const itemEdit = document.createElement('div');
        itemEdit.classList.add('itemEdit');
        const aEdit = document.createElement('a');
        aEdit.classList.add('aEdit');
        aEdit.href = '##';
        const iconEdit = document.createElement('i');
        iconEdit.classList.add('fa-solid');
        iconEdit.classList.add('fa-pen');

        const itemBasket = document.createElement('div');
        itemBasket.classList.add('itemBasket');
        const a = document.createElement('a');
        a.classList.add('a');
        a.href = '##';
        const icon = document.createElement('i');
        icon.classList.add('fa-regular');
        icon.classList.add('fa-trash-can');
        item.append(itemP, itemEdit, itemBasket);
        itemP.append(p);
        itemEdit.append(aEdit);
        itemBasket.append(a);
        aEdit.append(iconEdit);
        a.append(icon);
        p.append(elem);
        items.prepend(item);
        saveList();
    }

    const changeList = () => {
        items.addEventListener('click', (e) => {
            let a = e.target.closest('.a');
            let b = e.target.closest('.aEdit'); // поменять
            if (a && changeButton) {
                a.parentElement.parentElement.remove();
                saveList();
            } else if (b) {
                let itemFromList = b.parentElement.parentElement.firstChild.firstChild.innerHTML;
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