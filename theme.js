/* 다크 모드 — <head>에서 바로 불러와 페이지가 그려지기 전에 테마를 적용합니다 (깜빡임 방지).
   처음 방문하면 기기 설정(라이트/다크)을 따르고, 헤더의 버튼을 누르면 선택한 모드가 저장됩니다. */
(function () {
  var KEY = 'theme';
  var root = document.documentElement;
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function current() {
    var s = saved();
    if (s === 'dark' || s === 'light') return s;
    return systemDark.matches ? 'dark' : 'light';
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    var btn = document.querySelector('[data-theme-toggle]');
    if (btn) {
      var dark = theme === 'dark';
      btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
      btn.setAttribute('aria-label', dark ? '라이트 모드로 전환' : '다크 모드로 전환');
      btn.title = dark ? '라이트 모드' : '다크 모드';
    }
  }

  apply(current());

  /* 직접 고른 적이 없으면 기기 설정이 바뀔 때 따라간다 */
  systemDark.addEventListener('change', function () {
    if (!saved()) apply(current());
  });

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;
    apply(current());
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(KEY, next); } catch (e) {}
      apply(next);
    });
  });
})();
