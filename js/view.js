export default class View {
  $ = {};
  $$ = {};

  constructor() {
    this.$.menu = this.#qs('[data-id="menu"]');
    this.$.menuItems = this.#qs('[data-id="menu-items"]');
    this.$.menuBtn = this.#qs('[data-id="menu-button"');
    this.$.newRoundBtn = this.#qs('[data-id="new-round-btn"]');
    this.$.resetGameBtn = this.#qs('[data-id="reset-game-btn"]');
    this.$.modal = this.#qs('[data-id="modal"]');
    this.$.modalText = this.#qs('[data-id="modal-text"]');
    this.$.modalBtn = this.#qs('[data-id="modal-btn"]');
    this.$.turn = this.#qs('[data-id="turn"]');
    this.$.p1Wins = this.#qs('[data-id="p1-wins"]');
    this.$.p2Wins = this.#qs('[data-id="p2-wins"]');
    this.$.ties = this.#qs('[data-id="ties"]');
    this.$.roundCounter = this.#qs('[data-id="round-number"]');
    this.$.winWith3 = this.#qs('[data-id="games-3"]');
    this.$.winWith5 = this.#qs('[data-id="games-5"]');
    this.$.winWith7 = this.#qs('[data-id="games-7"]');
    this.$.winWithInfinity = this.#qs('[data-id="games-infinity"]');

    this.$$.squares = this.#qsAll('[data-id="square"]');

    //UI only event listener
    this.$.menuBtn.addEventListener('click', () => {
      this.#toggleMenu();
    });

    [
      this.$.winWith3,
      this.$.winWith5,
      this.$.winWith7,
      this.$.winWithInfinity,
    ].forEach((element) => {
      element.addEventListener('click', () => {
        this.toggleActiveGameOption(element);
      });
    });

    // Setting the game options for 3 wins as the default
    this.toggleActiveGameOption(this.$.winWith3);
  }

  /**
   * Register all the event listeners
   */

  bindNewRoundEvent(handler) {
    this.$.newRoundBtn.addEventListener('click', handler);
    this.$.modalBtn.addEventListener('click', handler);
  }

  bindGameResetEvent(handler) {
    this.$.resetGameBtn.addEventListener('click', handler);
  }

  bindPlayerMoveEvent(handler) {
    this.$$.squares.forEach((square) => {
      square.addEventListener('click', () => handler(square));
    });
  }

  bindGameOptionChange(handler) {
    [
      this.$.winWith3,
      this.$.winWith5,
      this.$.winWith7,
      this.$.winWithInfinity,
    ].forEach((button) => {
      button.addEventListener('click', () => {
        const length =
          button.dataset.id === 'games-infinity'
            ? Infinity
            : parseInt(button.innerText, 10);
        handler(length);
      });
    });
  }

  /**
   * DOM helper methods
   */

  updateScoreboard(p1Wins, p2Wins, ties) {
    this.$.p1Wins.innerText = `${p1Wins} wins`;
    this.$.p2Wins.innerText = `${p2Wins} wins`;
    this.$.ties.innerText = `${ties}`;
  }

  updateRoundCounter(round) {
    this.$.roundCounter.innerText = round;
  }

  toggleActiveGameOption(element) {
    [
      this.$.winWith3,
      this.$.winWith5,
      this.$.winWith7,
      this.$.winWithInfinity,
    ].forEach((el) => el.classList.remove('active'));
    element.classList.add('active');
  }

  openModal(message) {
    this.$.modal.classList.remove('hidden');
    this.$.modalText.innerText = message;
  }

  closeAll() {
    this.#closeModal();
    this.#closeMenu();
  }

  clearMoves() {
    this.$$.squares.forEach((square) => {
      square.replaceChildren();
    });
  }

  initializeMoves(moves) {
    this.$$.squares.forEach((square) => {
      const existingMove = moves.find((move) => move.squareId === +square.id);

      if (existingMove) {
        this.handlePlayerMove(square, existingMove.player);
      }
    });
  }

  #closeModal() {
    this.$.modal.classList.add('hidden');
  }

  #closeMenu() {
    this.$.menuItems.classList.add('hidden');
    this.$.menuBtn.classList.remove('border');

    const icon = this.$.menuBtn.querySelector('i');
    icon.classList.add('fa-chevron-down');
    icon.classList.remove('fa-chevron-up');
  }

  #toggleMenu() {
    this.$.menuItems.classList.toggle('hidden');
    this.$.menuBtn.classList.toggle('border');
    const icon = this.$.menuBtn.querySelector('i');
    icon.classList.toggle('fa-chevron-down');
    icon.classList.toggle('fa-chevron-up');
  }

  handlePlayerMove(squareEl, player) {
    const icon = document.createElement('i');
    icon.classList.add('fa-solid', player.iconClass, player.colorClass);
    squareEl.replaceChildren(icon);
  }

  setTurnIndicator(player) {
    const icon = document.createElement('i');
    const label = document.createElement('p');

    icon.classList.add('fa-solid', player.colorClass, player.iconClass);

    label.classList.add(player.colorClass);
    label.innerText = `${player.name} you're up!`;

    this.$.turn.replaceChildren(icon, label);
  }

  #qs(selector, parent) {
    const el = parent
      ? parent.querySelector(selector)
      : document.querySelector(selector);

    if (!el) throw Error('Could not find elements');

    return el;
  }

  #qsAll(selector) {
    const elList = document.querySelectorAll(selector);

    if (!elList) throw Error('Could not find elements');

    return elList;
  }
}
