'use strict';

function onPageLoaded() {
    const input = document.querySelector('.input-text');
    const add = document.querySelector('.input-button');
    const items = document.querySelector('.items');
    let list = [];
    
    const addItem = () => {
        if (input.value == '') {
            return false;
        } else {
            render(input.value);
            clearInput();
        } 
    }

    const render = (elem) => {
        const item = document.createElement('div');
        item.classList.add('item');
        const itemP = document.createElement('div');
        itemP.classList.add('itemP');
        const p = document.createElement('p');
        p.classList.add('p');
        const itemImg = document.createElement('div');
        itemImg.classList.add('itemImg');
        const a = document.createElement('a');
        a.classList.add('a');
        a.href = '##';
        const icon = document.createElement('i');
        icon.classList.add('fa', 'fa-trash-o');
        item.append(itemP, itemImg);
        itemP.append(p);
        itemImg.append(a);
        a.append(icon);
        p.append(elem);
        items.prepend(item);
        saveList();
    }

    const deleteList = () => {
        items.addEventListener('click', function(e) {
            let a = e.target.closest('a');
            if (!a) {
                return;
            } else if (!items.contains(a)) {
                return;
            } else {
                a.parentElement.parentElement.remove();
                saveList();
            }   
        });
    }    
    deleteList();

    const saveList = () => {
        let p = items.querySelectorAll('.p');
        list = [];
        for (let elem of p) {
            list.push(elem.innerHTML); 
        }
        localStorage.setItem('list', list);
    }

    (function() {
        input.addEventListener('keydown', function(e) {
            if (e.keyCode === 13) {
                addItem();
            }
        });
    })();

    const clearInput = () => {
        input.value = '';
    }

    const getList = () => {
        if (localStorage.getItem('list')) {
            let listFromLocalStorage = localStorage.getItem('list').split(',').reverse();
            for (let elem of listFromLocalStorage) {
                render(elem);
            }
        }
    }
    getList();
    add.addEventListener('click', addItem);
}
document.addEventListener('DOMContentLoaded', onPageLoaded);