import {$} from '@core/dom';

export function resizeHandler($root, event) {
  return new Promise((resolve) => {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = $resizer.data.resize;
    const index = $parent.data[type];
    const sideProp = type === 'col' ? 'bottom': 'right';
    let value;

    $resizer.css({
      [sideProp]: '-2000px',
    });
    if (type === 'col') {
      document.onmousemove = (e) => {
        const delta = e.clientX - coords.right;
        value = coords.width + delta;
        $resizer.css({right: -delta + 'px'});
      };
    } else {
      document.onmousemove = (e) => {
        const delta = e.clientY - coords.bottom;
        value = coords.height + delta;
        $resizer.css({bottom: -delta + 'px'});
      };
    }

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;

      if (type === 'col') {
        $root.all(`[data-col="${index}"]`)
            .forEach((el) => {
              $(el).css({width: value + 'px'});
            });
      } else {
        $root.all(`[data-row="${index}"]`)
            .forEach((el) => {
              $(el).css({height: value + 'px'});
            });
      }
      resolve({
        id: index,
        type,
        value,
      });


      $resizer.css({
        bottom: null,
        right: null,
      });
    };
  });
}
