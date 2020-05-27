'use strict';

const field = document.querySelector('.field');

const sizeCell = 100;

const cellEmpty = {
    top: 0,
    left: 0,
};

const activeCells = [];
activeCells.push(cellEmpty);

const shift = (index) => {
    const cell = activeCells[index];

    cell.element.style.top = `${cellEmpty.top * sizeCell}px`;
    cell.element.style.left = `${cellEmpty.left * sizeCell}px`;

    const emptyLeft = cellEmpty.left;
    const emptyTop = cellEmpty.top;
    cellEmpty.left = cell.left;
    cellEmpty.top = cell.top;
    cell.left = emptyLeft;
    cell.top = emptyTop;

};

for (let i = 1; i <= 24; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.innerHTML = i;

    const top = i % 5;
    const left = (i - top) / 5;

    activeCells.push({
        top: top,
        left: left,
        element: cell,
    })

    cell.style.top = `${top * sizeCell}px`;
    cell.style.left = `${left * sizeCell}px`;


    field.append(cell);

    cell.addEventListener('click', () => {
        shift(i);
    })
};