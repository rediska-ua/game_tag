'use strict';

const field = document.querySelector('.field');

const oneCellSize = 100;

const size = 5;

const matrix = Math.pow(size, 2);

let move = 0;

const emptyCell = {
    value: (matrix),
    top: size - 1,
    left: size -1,
};

const cells = [];
cells.push(emptyCell);

const numbers = [...Array(matrix - 1).keys()].sort(() => Math.random() - 0.5);

const shift = (index, n) => {

    const cell = cells[index];

    const differenceLeft = Math.abs(emptyCell.left - cell.left);
    const differenceTop = Math.abs(emptyCell.top - cell.top);


    if (differenceLeft + differenceTop > 1) {
        return;
    };
    
    move = move + 1;
    document.getElementById("move").textContent = `Move: ${move}`;

    cell.element.style.top = `${emptyCell.top * oneCellSize}px`;
    cell.element.style.left = `${emptyCell.left * oneCellSize}px`;

    

    const emptyLeft = emptyCell.left;
    const emptyTop = emptyCell.top;
    emptyCell.left = cell.left;
    emptyCell.top = cell.top;
    cell.left = emptyLeft;
    cell.top = emptyTop;


    console.log(cells)

    const isFinished = cells.every(cell => {
        console.log(cell.value, cell.top, cell.left)
        return cell.value === cell.top * n + ((cell.left % n) + 1);
    });

    if (isFinished) {
        alert('You won!');
    };

};


const game = (n) => {

    for (let i = 1; i <= (Math.pow(n, 2) - 1); i++) {
        const cell = document.createElement('div');
        const value = numbers[i - 1] + 1;
        cell.className = 'cell';
        cell.innerHTML = value;

        const left = (i - 1) % n;
        const top = ((i - left) - 1) / n;

        cells.push({
            value: value,
            top: top,
            left: left,
            element: cell,
        })

        cell.style.top = `${top * oneCellSize}px`;
        cell.style.left = `${left * oneCellSize}px`;


        field.append(cell);

        cell.addEventListener('click', () => {
            shift(i, n);
        })
    };
};

game(size);

let sec = 0;

const tick = () => {
    sec++;
    document.getElementById("time").textContent = `Time: ${sec}`;

};

const init = () => {
    setInterval(tick, 1000);

}

init();
