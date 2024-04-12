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
        const item = document.createElement('li');
        item.classList.add('item');
        const itemText = document.createElement('p');
        itemText.classList.add('item__text');
        const itemEdit = document.createElement('a');
        itemEdit.classList.add('item__edit');
        itemEdit.href = '##';
        const iconEdit = document.createElement('i');
        iconEdit.classList.add('fa-solid', 'fa-pen');
        const itemDelete = document.createElement('a');
        itemDelete.classList.add('item__delete');
        itemDelete.href = '##';
        const iconDelete = document.createElement('i');
        iconDelete.classList.add('fa-regular', 'fa-trash-can');
        item.append(itemText, itemEdit, itemDelete);
        itemEdit.append(iconEdit);
        itemDelete.append(iconDelete);
        items.prepend(item);
        itemText.textContent = elem;
    }

    const changeList = () => {
        items.addEventListener('click', (e) => {
            let a = e.target.closest('.a');
            let b = e.target.closest('.aEdit');
            if (a && changeButton) {
                a.parentElement.parentElement.remove();
                saveList();
            } else if (b) {
                let itemFromList = b.parentElement.parentElement.firstChild.firstChild.innerHTML;
                input.value = itemFromList;
                input.focus();
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