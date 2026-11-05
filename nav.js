/* PROJECTS 서브 메뉴 — 마우스는 CSS hover로 열리고, 여기서는 터치와 키보드를 처리합니다. */
(function () {
  var item = document.querySelector('.has-sub');
  if (!item) return;

  var trigger = item.querySelector('a');
  var isTouch = window.matchMedia('(hover: none)');

  function close() {
    item.classList.remove('is-open');
  }

  /* 터치 화면: 첫 번째 탭은 서브 메뉴를 열고, 두 번째 탭은 링크로 이동 */
  trigger.addEventListener('click', function (e) {
    if (isTouch.matches && !item.classList.contains('is-open')) {
      e.preventDefault();
      item.classList.add('is-open');
    }
  });

  /* 같은 페이지 안에서 이동해도 메뉴가 열린 채로 남지 않게 닫기 */
  item.querySelectorAll('.submenu a').forEach(function (link) {
    link.addEventListener('click', function () {
      close();
      link.blur();
    });
  });

  document.addEventListener('click', function (e) {
    if (!item.contains(e.target)) close();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    close();
    if (item.contains(document.activeElement)) document.activeElement.blur();
  });
})();
