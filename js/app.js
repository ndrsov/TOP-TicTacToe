const App = {
  // All selected HTML Elements
  $: {
    menu: document.querySelector('[data-id="menu"]'),
    menuItems: document.querySelector('[data-id="menu-items"]'),
    resetBtn: document.querySelector('[data-id="reset-btn"]'),
    newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
    squares: document.querySelectorAll('[data-id="square"]'),
  },

  // Local state
  state: {
    currentPlayer: 1,
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

    App.$.squares.forEach((square) => {
      square.addEventListener('click', (e) => {
        // Check if square has been clicked before
        if (square.hasChildNodes()) {
          return;
        }

        const currentPlayer = App.state.currentPlayer;
        const icon = document.createElement('i');

        if (currentPlayer === 1) {
          icon.classList.add('fa-solid', 'fa-x', 'yellow');
        } else {
          icon.classList.add('fa-solid', 'fa-0', 'turquoise');
        }

        App.state.currentPlayer = App.state.currentPlayer === 1 ? 2 : 1;
        square.replaceChildren(icon);

        // Check if there is a winner or tie
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
      });
    });
  },
};

window.addEventListener('load', App.init);
