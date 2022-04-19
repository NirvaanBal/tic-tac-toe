const Gameboard = (() => {
  const gameBoard = ['', '', '', '', '', '', '', '', ''];

  const _addBoardToHTML = (text) => {
    let boardHTML = `<div class="row">`;
    gameBoard.forEach((box, index) => {
      boardHTML += `<div class="box" data-id=${index} data-disable="false">${text}</div>`;
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
    _choice,
    _counter = 0,
    _vsComputer = false;
  let _availableIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let _winnerEl = document.querySelector('.winner');
  let _firstEl = document.querySelector('.first');
  const _resetBtn = document.querySelector('.reset');
  const _form = document.querySelector('form');
  const _content = document.querySelector('.content');
  _content.style.display = 'none';

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
    _availableIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    Game.init();
  };

  _resetBtn.addEventListener('click', () => {
    _reset();
    _winnerEl.textContent = '';
  });

  const _action = (against) => {
    if (against === 'computer') _vsComputer = true;
    if (_vsComputer) {
      _form.style.display = 'none';
      _firstEl.style.display = 'none';
    }
    _firstEl.textContent = `"${_player}" will start`;
    document.querySelectorAll('.box').forEach((box, index) => {
      box.addEventListener('click', (e) => {
        if (!_winner) _winnerEl.textContent = '';
        if (e.target.dataset.disable === 'false') {
          _counter++;
          Gameboard.gameBoard[index] = _player;
          if (_vsComputer) {
            _availableIndices = [..._availableIndices].filter(
              (i) => i !== index
            );
          }
          e.target.textContent = _player;
          e.target.dataset.disable = 'true';
          _result(Gameboard.gameBoard, _player);
          _toggleMarker(_player);

          if (_vsComputer && !_winner) {
            _counter++;
            if (_counter !== 10) {
              const pos = Math.floor(Math.random() * _availableIndices.length);
              Gameboard.gameBoard[_availableIndices[pos]] = _player;
              e.target.parentElement.parentElement.querySelector(
                `.box[data-id="${_availableIndices[pos]}"]`
              ).textContent = _player;
              e.target.parentElement.parentElement.querySelector(
                `.box[data-id="${_availableIndices[pos]}"]`
              ).dataset.disable = 'true';
              _availableIndices = [..._availableIndices].filter(
                (i) => i !== _availableIndices[pos]
              );
              _result(Gameboard.gameBoard, _player);
              _toggleMarker(_player);
            }
          }
        }

        if (_winner) {
          const _player1 = Player().playerName('playerO').value || 'O';
          const _player2 = Player().playerName('playerX').value || 'X';
          let champion = _winner === 'O' ? _player1 : _player2;
          if (_vsComputer) champion = _counter % 2 === 0 ? 'Computer' : 'You';
          _winnerEl.textContent = `${champion} won`;
          _reset();
        } else if ((!_winner && _counter === 9) || _counter === 10) {
          _winnerEl.textContent = `It's a tie!`;
          _reset();
        }
      });
    });
  };

  const _displayController = () => {
    if (_choice) {
      _action(_choice);
    } else {
      const ui = document.querySelector('.ui');
      const human = document.getElementById('human');
      const computer = document.getElementById('computer');
      human.addEventListener('click', () => {
        _action(human.value);
        ui.style.display = 'none';
        _content.style.display = 'flex';
        _choice = human.value;
      });
      computer.addEventListener('click', () => {
        _action(computer.value);
        ui.style.display = 'none';
        _content.style.display = 'flex';
        _choice = computer.value;
      });
    }
  };

  const init = (initiate) => {
    Gameboard.draw('');
    _displayController();
  };

  return { init };
})();

Game.init();
