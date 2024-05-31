import View from './view.js';

/* const App = {
  // All selected HTML Elements
  $: {
    menu: document.querySelector('[data-id="menu"]'),
    menuItems: document.querySelector('[data-id="menu-items"]'),
    resetBtn: document.querySelector('[data-id="reset-btn"]'),
    newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
    squares: document.querySelectorAll('[data-id="square"]'),
    modal: document.querySelector('[data-id="modal"]'),
    modalText: document.querySelector('[data-id="modal-text"]'),
    modalBtn: document.querySelector('[data-id="modal-btn"]'),
    turn: document.querySelector('[data-id="turn"]'),
  },

  // Local state
  state: {
    moves: [],
  },

  getGameStatus(moves) {
    const p1Moves = moves
      .filter((move) => move.playerId === 1)
      .map((move) => +move.squareId);
    const p2Moves = moves
      .filter((move) => move.playerId === 2)
      .map((move) => +move.squareId);

    const winningPatters = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 5, 7],
      [3, 6, 9],
      [4, 5, 6],
      [7, 8, 9],
    ];

    let winner = null;

    winningPatters.forEach((pattern) => {
      const p1Wins = pattern.every((v) => p1Moves.includes(v));
      const p2Wins = pattern.every((v) => p2Moves.includes(v));

      if (p1Wins) winner = 1;
      if (p2Wins) winner = 2;
    });

    return {
      status: moves.length === 9 || winner != null ? 'complete' : 'in-progress',
      winner,
    };
  },

  // Main initialization
  init() {
    App.registerEventListener();
  },

  //Main event listener
  registerEventListener() {
    App.$.menu.addEventListener('click', () => {
      App.$.menuItems.classList.toggle('hidden');
    });

    App.$.resetBtn.addEventListener('click', () => {
      console.log('Reset the game');
    });

    App.$.newRoundBtn.addEventListener('click', () => {
      console.log('Add a new round');
    });

    App.$.modalBtn.addEventListener('click', () => {
      App.state.moves = [];
      App.$.squares.forEach((square) => square.replaceChildren());
      App.$.modal.classList.add('hidden');
    });

    App.$.squares.forEach((square) => {
      square.addEventListener('click', (e) => {
        // Check if square has been clicked before
        const hasMove = (squareId) => {
          const existingMove = App.state.moves.find(
            (move) => move.squareId === squareId
          );
          return existingMove !== undefined;
        };

        if (hasMove(+square.id)) {
          return;
        }

        // Determine which player icond to add to the square
        const lastMove = App.state.moves.at(-1);
        const getOppositePlayer = (playerId) => (playerId === 1 ? 2 : 1);
        const currentPlayer =
          App.state.moves.length === 0
            ? 1
            : getOppositePlayer(lastMove.playerId);
        const nextPlayer = getOppositePlayer(currentPlayer);

        const squareIcon = document.createElement('i');
        const turnIcon = document.createElement('i');

        const turnLabel = document.createElement('p');
        turnLabel.innerText = `Player ${nextPlayer}, you're up`;

        if (currentPlayer === 1) {
          squareIcon.classList.add('fa-solid', 'fa-x', 'yellow');
          turnIcon.classList.add('fa-solid', 'fa-o', 'turquoise');
          turnLabel.classList = 'turquoise';
        } else {
          squareIcon.classList.add('fa-solid', 'fa-o', 'turquoise');
          turnIcon.classList.add('fa-solid', 'fa-x', 'yellow');
          turnLabel.classList = 'yellow';
        }

        App.$.turn.replaceChildren(turnIcon, turnLabel);

        App.state.moves.push({
          squareId: +square.id,
          playerId: currentPlayer,
        });

        square.replaceChildren(squareIcon);

        // Check if there is a winner or tie
        const game = App.getGameStatus(App.state.moves);

        if (game.status === 'complete') {
          App.$.modal.classList.remove('hidden');
          let message = '';

          if (game.winner) {
            message = `Player ${game.winner} wins!`;
          } else {
            message = ' Tie!';
          }

          App.$.modalText.textContent = message;
        }
      });
    });
  },
};*/

function init() {
  const view = new View();

  view.bindGameResetEvent((event) => {
    console.log('Reset event');
    console.log(event);
  });
  view.bindNewRoundEvent((event) => {
    console.log('New round event');
    console.log(event);
  });
  view.bindPlayerMoveEvent((event) => {
    console.log('Move event');
    console.log(event);
  });

  console.log(view.$.turn);
}

window.addEventListener('load', init);
