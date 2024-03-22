const menu = document.querySelector('.menu');
const menuItems = document.querySelector('.items');

menu.addEventListener('click', () => {
  menuItems.classList.toggle('hidden');
});
