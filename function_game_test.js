'use strict';

/*testing main function game()
using assert from nodejs
function shift() depends on game(),
so there is no need in testing input data in shift()
*/

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><div>field</div>`);
const field = dom.window.document.querySelector('.field');

const assert = require('assert').strict

const size = 5;

if(size === 0) {
    throw Error('size cannot be 0')
}

const matrix = Math.pow(size, 2);
const numbers = [...Array(matrix - 1).keys()].sort(() => Math.random() - 0.5);
const cells = [];

const game = (n, oneCellSize)  => {

    const checkGame = typeof n === 'number' && typeof oneCellSize === 'number';
    
    if (checkGame) {
    } else {
        return 'values are expected to be numbers';
    };
    if(oneCellSize === 0) {
        return 'cannot create cell if size is 0';
    };
    if(n === 1) {
        return 'you will have only one cell';
    };
    if(n >= 8) {
        return 'the field is too big';
    };
    if(oneCellSize > 200) {
        return 'the size of one cell is too big';
    };

    //field.style.width = `${size*oneCellSize}px`;
    //field.style.height = `${size*oneCellSize}px`;

    for (let i = 1; i <= (Math.pow(n, 2) - 1); i++) {
        const cell = dom.window.document.createElement('div');
        const value = numbers[i - 1] + 1;
        cell.className = 'cell';
        cell.innerHTML = value;

        cell.style.width = `${oneCellSize}px`;
        cell.style.height = `${oneCellSize}px`;

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

        //field.append(cell);

        /*cell.addEventListener('click', () => {
            console.log(shift(i, n, oneCellSize));
        })*/
    };

    return 'game has started'
};

//tests

const testGame_NaN = () => {
    const n = game('5', 100) // if size == '5'
    assert.equal(n, 'values are expected to be numbers');
}
const testGame_NaN1 = () => {
    const n = game([], 100) // if size == []
    assert.equal(n, 'values are expected to be numbers');
}
const testGame_NaN2 = () => {
    const n = game(5, '100') // if onecellsize == '100'
    assert.equal(n, 'values are expected to be numbers');
}
const testGame_NaN3 = () => {
    const n = game({}, 100) // if size == {}
    assert.equal(n, 'values are expected to be numbers');
}
const testGame_NaN4 = () => {
    const n = game(false, 100) // if size == false
    assert.equal(n, 'values are expected to be numbers');
}
const testGame_bigsize = () => {
    const n = game(10, 100) // if size == '10'
    assert.equal(n, 'the field is too big');
}
const testGame_bigsizecell = () => {
    const n = game(5, 300) // if onecellsize == '300'
    assert.equal(n, 'the size of one cell is too big');
}
const testGame_onecell = () => {
    const n = game(1, 100) // if size == '1'
    assert.equal(n, 'you will have only one cell')
}
const testGame_success= () => {
    const n = game(5, 100) // if size == 5
    assert.equal(n, 'game has started');
}


const tests = [
    testGame_NaN,
    testGame_NaN1,
    testGame_NaN2,
    testGame_NaN3,
    testGame_NaN4,
    testGame_bigsize,
    testGame_bigsizecell,
    testGame_onecell,
    testGame_success,
  ];
  
for (const test of tests) {
    try {
      test();
    } catch (err) {
      console.log(err);
    }
}
