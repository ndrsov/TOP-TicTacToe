const App = {
  // All selected HTML Elements
  $: {
    menu: document.querySelector('[data-id="menu"]'),
    menuItems: document.querySelector('[data-id="menu-items"]'),
    resetBtn: document.querySelector('[data-id="reset-btn"]'),
    newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
    squares: document.querySelectorAll('[data-id="square"]'),
  },

  // Main initialization
  init() {
    App.registerEventListener();
  },

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
        console.log(`Square with id ${e.target.id} was clicked`);

        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-x', 'yellow');

        e.target.replaceChildren(icon);
      });
    });
  },
};

window.addEventListener('load', App.init);
