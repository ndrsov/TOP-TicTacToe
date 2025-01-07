import Store from './store.js';
import View from './view.js';

const players = [
  { id: 1, name: 'Player 1', iconClass: 'fa-x', colorClass: 'yellow' },
  { id: 2, name: 'Player 2', iconClass: 'fa-o', colorClass: 'turquoise' },
];

function init() {
  const view = new View();
  const store = new Store('tic-tac-toe-key', players);

  function initView() {
    view.closeAll();
    view.clearMoves();
    view.setTurnIndicator(store.game.currentPlayer);
    view.updateScoreboard(
      store.stats.playerWithStats[0].wins,
      store.stats.playerWithStats[1].wins,
      store.stats.ties
    );
    view.initializeMoves(store.game.moves);
    view.updateRoundCounter(store.roundCounter);
  }

  view.bindGameOptionChange((length) => {
    store.setGameLength(length);
    view.toggleActiveGameOption(
      document.querySelector(
        `[data-id="games-${length === Infinity ? 'infinity' : length}"]`
      )
    );
    store.gameReset();
    initView();
  });

  view.bindModalEvent((action) => {
    if (action === 'reset-game') {
      store.gameReset();
      initView();
    } else if (action === 'next-round') {
      store.newRound();
      initView();
    }
  });

  window.addEventListener('storage', () => {
    // Update game in case of game played in another tab
    initView();
  });

  initView();

  view.bindGameResetEvent((event) => {
    store.gameReset();
    view.toggleActiveGameOption(view.$.winWith3);
    initView();
  });

  view.bindNewRoundEvent((event) => {
    store.newRound();
    initView();
  });

  view.bindPlayerMoveEvent((square) => {
    //Check if squre clicked has already been clicked before
    const existingMove = store.game.moves.find(
      (move) => move.squareId === +square.id
    );

    if (existingMove) {
      return;
    }

    // Place correct icon on square clicked
    view.handlePlayerMove(square, store.game.currentPlayer);

    // Update state with latest move from player
    store.playerMove(+square.id);

    // Check if there is a winner
    if (store.game.status.isComplete) {
      if (store.stats.isGameComplete) {
        const winner = store.stats.playerWithStats.find(
          (player) => player.wins >= store.gameLength
        );
        view.showGameOverModal(winner.name); // Display the new modal for the game winner
      } else {
        view.openModal(
          store.game.status.winner
            ? `${store.game.status.winner.name} wins!`
            : 'Tie!'
        );
      }
      return;
    }

    // Update turn indicator
    view.setTurnIndicator(store.game.currentPlayer);
  });
}

window.addEventListener('load', init);
