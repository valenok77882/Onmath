// Открытие/закрытие выпадающего меню при нажатии на кнопку "Меню"
function menuButtonClick() {
  const menu = document.body.querySelector('.dropout-menu');
  menu.innerHTML = menu.innerHTML ? '' : `<a href="/articles" class="dropout-menu-button articles-button">
    <img src="/img/article-icon.png"> Статьи
  </a>
  <a href="/" class="dropout-menu-button main-page-button">
    <img src="/img/home-icon.png"> Главная
  </a>
  <button class="dropout-menu-button tests-button">
    <img src="/img/test-icon.png"> Тесты
  </button>`;
}