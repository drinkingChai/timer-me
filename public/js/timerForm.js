const drawTimerForm = config=> {
  let template = `
    <form action="/" method="POST">
      <div class="name">
        <label for="title">Title</label>
      </div>

      <div class="date">
      Date
      </div>

      <div class="time">
      Time
      </div>

      <div class="options">
        <input name="weekedays" type="checkbox" checked>Weekdays</input>
        <input name="weekends" type="checkbox" checked>Weekends</input>
      </div>

      <input type="submit" value="Gimme a timer!"></input>
    </form>
  `;

  // html inputs are sucky!!!
  // separate dumb inputs
  // options to view
  // defaults date only

  let $html = $(template),
    now = new Date();

  let $date = $html.find('.date'),
    $time = $html.find('.time'),
    $options = $html.find('.options');

  [
    [$html.find('.name'), 'title', 'text'],
    [$date, 'month', null, now.getMonth()],
    [$date, 'day', null, now.getDate()],
    [$date, 'year', null, now.getFullYear()],
    [$time, 'hour', null, now.getHours() % 12],
    [$time, 'minute', null, now.getMinutes()],
    [$time, 'second', null, now.getSeconds()]
  ].forEach(input=> {
    drawInput({
      parent: input[0],
      name: input[1],
      type: input[2] || 'number',
      default: input[3]
    })
  })

  drawOption({
    parent: $time,
    name: 'ampm',
    options: [{ name: 'am', value: 'am' }, { name: 'pm', value: 'pm' }],
    default: now.getHours() >= 12 ? 'pm' : 'am'
  })

  drawViewCheck({
    parent: $options,
    name: 'Show time',
    viewElement: $time
  })

  $(config.parent).append($html);
}

const drawInput = config=> {
  /*
    parent
    type
    name
    default
  */
  let template = `
    <input name="${config.name}" type="${config.type}" value="${config.default ? config.default : ''}"></input>
  `;

  let $html = $(template);
  $(config.parent).append($html);
}

const drawOption = config=> {
  /*
    parent
    name
    options { value, text }
    default
  */
  let template = `
    <select name="${config.name}"></select>
  `;

  let $html = $(template);
  config.options.forEach(option=> {
    $html.append($(`
      <option value=${option.value}>${option.name}</option>
    `))
  })

  if (config.default) $html.val(config.default);
  $(config.parent).append($html);
}

const drawViewCheck = config=> {
  /*
    parent
    name
    viewElement
    default: false
  */
  let template = `
    <input name="${config.name}" type="checkbox" ${config.default ? 'checked' : ''}>${config.name}</input>
  `;

  let $html = $(template);
  !config.default ? $(config.viewElement).hide() : $(config.viewElement).show();
  $html.on('click', function(e) {
    $(config.viewElement).toggle();
  })

  $(config.parent).append($html);
}
