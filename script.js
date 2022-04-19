const Gameboard = (() => {
  const gameBoard = ['', '', '', '', '', '', '', '', ''];

  const _addBoardToHTML = (text) => {
    let boardHTML = `<div class="row">`;
    gameBoard.forEach((box, index) => {
      boardHTML += `<div class="box" data-id=${
        index + 1
      } data-disable="false">${text}</div>`;
      if ((index + 1) % 3 === 0 && index !== 8)
        boardHTML += `</div><div class="row">`;
    });
    boardHTML += `</div>`;
    document.querySelector('.board').innerHTML = boardHTML;
  };

  const draw = (value) => {
    _addBoardToHTML(value);
  };

  return { draw, gameBoard };
})();

const Player = () => {
  const _markers = ['O', 'X'];
  const _playerStartingMarker = _markers[Math.floor(Math.random() * 2)];
  let player = _playerStartingMarker;

  const playerName = (id) => {
    return document.getElementById(id);
  };

  return { player, playerName };
};

const Game = (() => {
  let _player = Player().player;
  let _winner,
    _counter = 0;
  let _winnerEl = document.querySelector('.winner');
  let _firstEl = document.querySelector('.first');
  const _resetBtn = document.querySelector('.reset');

  const _toggleMarker = (marker) => {
    return marker === 'O' ? (_player = 'X') : (_player = 'O');
  };

  const _result = (gameArray, value) => {
    if (
      gameArray[0] === value &&
      gameArray[1] === value &&
      gameArray[2] === value
    ) {
      _winner = _player;
    } else if (
      gameArray[3] === value &&
      gameArray[4] === value &&
      gameArray[5] === value
    ) {
      _winner = _player;
    } else if (
      gameArray[6] === value &&
      gameArray[7] === value &&
      gameArray[8] === value
    ) {
      _winner = _player;
    } else if (
      gameArray[0] === value &&
      gameArray[3] === value &&
      gameArray[6] === value
    ) {
      _winner = _player;
    } else if (
      gameArray[1] === value &&
      gameArray[4] === value &&
      gameArray[7] === value
    ) {
      _winner = _player;
    } else if (
      gameArray[2] === value &&
      gameArray[5] === value &&
      gameArray[8] === value
    ) {
      _winner = _player;
    } else if (
      gameArray[0] === value &&
      gameArray[4] === value &&
      gameArray[8] === value
    ) {
      _winner = _player;
    } else if (
      gameArray[2] === value &&
      gameArray[4] === value &&
      gameArray[6] === value
    ) {
      _winner = _player;
    }
  };

  const _reset = () => {
    Gameboard.gameBoard = Gameboard.gameBoard.map((_) => '');
    _player = _winner || Player().player;
    if (!_winner) {
      Player().playerName('playerO').value = 'O';
      Player().playerName('playerX').value = 'X';
    }
    _winner = undefined;
    _counter = 0;

    Game.init();
  };

  _resetBtn.addEventListener('click', () => {
    _reset();
    _winnerEl.textContent = '';
  });

  const action = () => {
    _firstEl.textContent = `"${_player}" will start`;
    document.querySelectorAll('.box').forEach((box, index) => {
      box.addEventListener('click', (e) => {
        _counter++;
        if (!_winner) _winnerEl.textContent = '';
        if (e.target.dataset.disable === 'false') {
          Gameboard.gameBoard[index] = _player;
          e.target.textContent = _player;
          e.target.dataset.disable = 'true';
          _result(Gameboard.gameBoard, _player);
          _toggleMarker(_player);
        }

        if (_winner) {
          const _player1 = Player().playerName('playerO').value;
          const _player2 = Player().playerName('playerX').value;
          let champion = _winner === 'O' ? _player1 : _player2;
          _winnerEl.textContent = `${champion} won`;
          _reset();
        } else if (!_winner && _counter === 9) {
          _winnerEl.textContent = `It's a tie!`;
          _reset();
        }
      });
    });
  };

  const init = () => {
    Gameboard.draw('');
    action();
  };

  return { init };
})();

Game.init();
