const Gameboard = (() => {
  let gameBoard = ['0', 'X', 'X', '0', '0', 'X', '0', 'X', 'X'];

  const addBoardToDOM = function (selector) {
    let boardHTML = ``;
    gameBoard.forEach((box, index) => {
      boardHTML += `<span class="box" data-id=${index + 1}>${box}</span>`;
      if ((index + 1) % 3 === 0) boardHTML += `<br>`;
    });
    document.querySelector(selector).innerHTML = boardHTML;
  };

  return { addBoardToDOM };
})();

const Players = () => {
  let p1, p2;

  return { p1, p2 };
};

const Game = (() => {})();

Gameboard.addBoardToDOM('.board');
