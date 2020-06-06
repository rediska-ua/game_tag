'use strict';

const field = document.querySelector('.field');
const size = 5;

if (size === 0) throw Error('size cannot be 0');
const matrix = Math.pow(size, 2);
let move = 0;

const emptyCell = {
  value: matrix,
  top: size - 1,
  left: size - 1,
};

const cells = [];
cells.push(emptyCell);
const numbers = [...Array(matrix - 1).keys()].sort(() => Math.random() - 0.5);

const shift = (index, n, oneCellSize) => {

  const cell = cells[index];
  const differenceLeft = Math.abs(emptyCell.left - cell.left);
  const differenceTop = Math.abs(emptyCell.top - cell.top);
  if (differenceLeft + differenceTop > 1) return 'are not neighbours';

  move++;
  document.getElementById("move").textContent = `Move: ${move}`;

  cell.element.style.top = `${emptyCell.top * oneCellSize}px`;
  cell.element.style.left = `${emptyCell.left * oneCellSize}px`;

  const emptyLeft = emptyCell.left;
  const emptyTop = emptyCell.top;
  emptyCell.left = cell.left;
  emptyCell.top = cell.top;
  cell.left = emptyLeft;
  cell.top = emptyTop;

  const isFinished = cells.every(cell => {
    console.log(cell.value, cell.top, cell.left);
    return cell.value === cell.top * n + ((cell.left % n) + 1);
  });
  if (isFinished) alert('You won!');

  return 'shifted';
};

const game = (n, oneCellSize)  => {

  const checkGame = typeof n === 'number' && typeof oneCellSize === 'number';

  if (!checkGame) throw Error('values are expected to be numbers');
  if (oneCellSize === 0) throw Error('cannot create cell if size is 0');
  if (n === 1) throw Error('you will have only one cell');
  if (n >= 8) throw Error('the field is too big');
  if (oneCellSize > 200) throw Error('the size of one cell is too big');

  field.style.width = `${size * oneCellSize}px`;
  field.style.height = `${size * oneCellSize}px`;

  for (let i = 1; i <= (Math.pow(n, 2) - 1); i++) {
    const cell = document.createElement('div');
    const valueCell = numbers[i - 1] + 1;
    cell.className = 'cell';
    cell.innerHTML = valueCell;

    cell.style.width = `${oneCellSize}px`;
    cell.style.height = `${oneCellSize}px`;

    const leftCell = (i - 1) % n;
    const topCell = ((i - leftCell) - 1) / n;

    cells.push({
      value: valueCell,
      top: topCell,
      left: leftCell,
      element: cell,
    });

    cell.style.top = `${topCell * oneCellSize}px`;
    cell.style.left = `${leftCell * oneCellSize}px`;

    field.append(cell);

    cell.addEventListener('click', () => {
      console.log(shift(i, n, oneCellSize));
    });
  }

  return 'game has started';
};

console.log(game(size, 100));

let sec = 0;

const tick = () => {
  sec++;
  document.getElementById("time").textContent = `Time: ${sec}`;
};

const init = () => setInterval(tick, 1000);

init();
