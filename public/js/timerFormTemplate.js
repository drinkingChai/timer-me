const drawTimerForm = config=> {
  let template = `
    <form action="/" method="POST">
      <div class="name">
        <h3>Title</h3>
        <input name="title" type="text" placeholder="my awesome timer" required></input>
      </div>

      <div class="date">
        <h3>Date</h3>
      </div>

      <div class="time row">
        <h3>Time</h3>
      </div>

      <div class="options">
        <h3>Include</h3>
        <div>
          <input name="weekdays" type="checkbox" checked>Weekdays</input>
        </div>
        <div>
          <input name="weekends" type="checkbox" checked>Weekends</input>
        </div>
      </div>

      <div class="submit">
        <input type="submit" value="Gimme a timer!"></input>
      </div>
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

  // ^([1-9]|0[1-9]|[1-2][0-2])\/([1-9]|0[1-9]|1[0-9]|2[0-9]|3[0-1])\/([1-9][0-9]|[1-9][0-9]{2}|[1-9][0-9]{3})$ date
  // ^([1-9]|0[1-9]|1[0-2]):([0-9]|[0-5][0-9])(:([0-5][0-9]|[0-9]))?$ time

  drawRegExInput({
    parent: $date,
    name: 'date',
    regex: /^([1-9]|0[1-9]|[1-2][0-2])\/([1-9]|0[1-9]|1[0-9]|2[0-9]|3[0-1])\/([1-9][0-9]|[1-9][0-9]{2}|[1-9][0-9]{3})$/g,
    placeholder: '12/10/1815'
  })

  drawRegExInput({
    parent: $time,
    name: 'time',
    regex: /^([1-9]|0[1-9]|1[0-2]):([0-9]|[0-5][0-9])(:([0-5][0-9]|[0-9]))?$/g,
    placeholder: '04:08:15',
    class: 'col-8'
  })

  drawOption({
    parent: $time,
    name: 'ampm',
    options: [{ name: 'AM', value: 'am' }, { name: 'PM', value: 'pm' }],
    class: 'col-4'
  })

  $(config.parent).append($html);
}

const drawRegExInput = config=> {
  /*
    parent
    regex
    draws an input
    draws a verification text underneath
  */
  let template = `
    <div class="${config.class}">
      <input type="text" name="${config.name}" placeholder=${config.placeholder} required></input>
      <div></div>
    </div>
  `;

  let $html = $(template),
    $input = $html.find('input'),
    $error = $html.find('div');

  $html.on('keyup', 'input', function() {
    if ($input.val().match(config.regex)) return $error.html('');
    else if (!$error.html().length) $error.html('Invalid format!');
  })

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
    <div class="${config.class}">
      <select name="${config.name}"></select>
    </div>
  `;

  let $html = $(template),
    $select = $html.find('select');
  config.options.forEach(option=> {
    $select.append($(`
      <option value=${option.value}>${option.name}</option>
    `))
  })

  $(config.parent).append($html);
}