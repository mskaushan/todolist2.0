'use strict';
function onPageLoaded() {
    const inputWindow = document.querySelector('.input__window');
    const inputAdd = document.querySelector('.input__add');
    const items = document.querySelector('.items');
    let list = [];
    let changeButton = true;
    let index = null;
    
    const addItem = () => {
        if (inputWindow.value == '') {
            return false;
        } else if (changeButton === true) {
            render(inputWindow.value);
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
        saveList();
    }
    const changeList = () => {
        items.addEventListener('click', (e) => {
            if (e.target.parentElement.className == 'item__edit') {
                let itemFromList = e.target.parentElement.parentElement.firstChild.textContent;
                inputWindow.value = itemFromList;
                inputWindow.focus();
                changeButton = false;
                index = list.indexOf(itemFromList);
            } else if (e.target.parentElement.className == 'item__delete' && changeButton) {
                e.target.parentElement.parentElement.remove();
                saveList();
            }
        });
    }   
    changeList();
    const saveList = () => {
        let p = items.querySelectorAll('.item__text');
        list = [];
        for (let elem of p) {
            list.push(elem.textContent);
        }
        localStorage.toDoList = JSON.stringify({list: list});
    }
    const editItem = () => {
        list[index] = inputWindow.value;
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
        inputWindow.addEventListener('keydown', (e) => {
            if (e.keyCode === 13) {
                addItem();
            }
        });
    })();
    const clearInput = () => {
        inputWindow.value = '';
    }
    inputAdd.addEventListener('click', addItem);
}
document.addEventListener('DOMContentLoaded', onPageLoaded);