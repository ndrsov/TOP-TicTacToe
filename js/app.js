const App = {
  // All elected HTML Elements
  $: {
    menu: document.querySelector('.menu'),
    menuItems: document.querySelector('.items'),
  },

  init() {
    App.$.menu.addEventListener('click', () => {
      App.$.menuItems.classList.toggle('hidden');
    });
  },
};

window.addEventListener('load', App.init);
