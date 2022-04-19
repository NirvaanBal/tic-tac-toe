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
  const _playerStartingMarker = _markers[Math.floor(Math.random() * 2)];
  let player = _playerStartingMarker;

  return { player };
};

const Game = (() => {
  let _player = Player().player;
  let winner;

  const _toggleMarker = (marker) => {
    return marker === 'O' ? (_player = 'X') : (_player = 'O');
  };

  const action = () => {
    document.querySelectorAll('.box').forEach((box, index) => {
      box.addEventListener('click', (e) => {
        if (e.target.dataset.disable === 'false') {
          Gameboard.gameBoard[index] = _player;
          e.target.textContent = _player;
          e.target.dataset.disable = 'true';
          result(Gameboard.gameBoard, _player);
          _toggleMarker(_player);
        }
      });
    });
  };

  const result = (gameArray, value) => {
    if (
      gameArray[0] === value &&
      gameArray[1] === value &&
      gameArray[2] === value
    ) {
      winner = _player;
    } else if (
      gameArray[3] === value &&
      gameArray[4] === value &&
      gameArray[5] === value
    ) {
      winner = _player;
    } else if (
      gameArray[6] === value &&
      gameArray[7] === value &&
      gameArray[8] === value
    ) {
      winner = _player;
    } else if (
      gameArray[0] === value &&
      gameArray[3] === value &&
      gameArray[6] === value
    ) {
      winner = _player;
    } else if (
      gameArray[1] === value &&
      gameArray[4] === value &&
      gameArray[7] === value
    ) {
      winner = _player;
    } else if (
      gameArray[2] === value &&
      gameArray[5] === value &&
      gameArray[8] === value
    ) {
      winner = _player;
    } else if (
      gameArray[0] === value &&
      gameArray[4] === value &&
      gameArray[8] === value
    ) {
      winner = _player;
    } else if (
      gameArray[2] === value &&
      gameArray[4] === value &&
      gameArray[6] === value
    ) {
      winner = _player;
    }

    if (winner) console.log(winner);
  };

  const init = () => {
    Gameboard.draw();
    action();
  };

  return { init };
})();

Game.init();
