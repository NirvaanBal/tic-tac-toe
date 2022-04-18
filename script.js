const Gameboard = (() => {
  const gameBoard = ['', '', '', '', '', '', '', '', ''];

  const _addBoardToHTML = () => {
    let boardHTML = ``;
    gameBoard.forEach((box, index) => {
      boardHTML += `<span class="box" data-id=${
        index + 1
      } data-disable="false">${box}</span>`;
      if ((index + 1) % 3 === 0) boardHTML += `<br>`;
    });
    document.querySelector('.board').innerHTML = boardHTML;
  };

  const draw = () => {
    _addBoardToHTML();
  };

  return { draw, gameBoard };
})();

const Player = () => {
  const _markers = ['O', 'X'];
  const playerStartingMarker = _markers[Math.floor(Math.random() * 2)];

  return { marker: playerStartingMarker };
};

const Game = (() => {
  let _playerMarker = Player().marker;

  const _toggleMarker = (marker) => {
    return marker === 'O' ? (_playerMarker = 'X') : (_playerMarker = 'O');
  };

  const _boxSelected = () => {
    document.querySelectorAll('.box').forEach((box, index) => {
      box.addEventListener('click', (e) => {
        if (e.target.dataset.disable === 'false') {
          Gameboard.gameBoard[index] = _playerMarker;
          e.target.textContent = _playerMarker;
          e.target.dataset.disable = 'true';
          _toggleMarker(_playerMarker);
        }
      });
    });
  };

  const init = () => {
    Gameboard.draw();
    _boxSelected();
  };

  return { init };
})();

Game.init();
