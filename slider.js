/* 이미지 넘겨보기 — 화살표 버튼과 손가락 밀기(스크롤 스냅)를 함께 지원합니다. */
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  document.querySelectorAll('[data-slider]').forEach(function (slider) {
    var track = slider.querySelector('.slider__track');
    var prev = slider.querySelector('[data-slider-prev]');
    var next = slider.querySelector('[data-slider-next]');
    var count = slider.querySelector('[data-slider-count]');
    var total = track.children.length;
    var index = 0;
    var timer;

    function render() {
      count.textContent = (index + 1) + ' / ' + total;
      prev.disabled = index === 0;
      next.disabled = index === total - 1;
    }

    function go(target) {
      index = Math.max(0, Math.min(total - 1, target));
      track.scrollTo({
        left: index * track.clientWidth,
        behavior: reduceMotion.matches ? 'auto' : 'smooth'
      });
      render();
    }

    prev.addEventListener('click', function () { go(index - 1); });
    next.addEventListener('click', function () { go(index + 1); });

    /* 손가락으로 민 경우: 스크롤이 멈추면 현재 페이지를 다시 계산 */
    track.addEventListener('scroll', function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        index = Math.round(track.scrollLeft / track.clientWidth);
        render();
      }, 120);
    }, { passive: true });

    render();
  });
})();
