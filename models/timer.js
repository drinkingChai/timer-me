const conn = require('./_db');

const generateUrl = (title, random = false)=> {
  // regex!
  return `${title.replace(/([^\w\d ])/g, '').trim().replace(/\s+/g, '_')}${random ? `_${Math.floor(Math.random()*9999)}` : ''}`.toLowerCase();
}

const Timer = conn.define('timer', {
  expire: {
    type: conn.Sequelize.DATE,
    allowNull: false
  },
  url: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  weekdays: {
    type: conn.Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false
  },
  weekends: {
    type: conn.Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false
  }
}, {
  hooks: {
    beforeValidate: (timer, options)=> {
      // options??
      timer.url = timer.url.trim().length ? timer.url : null;
    }
  }
})

Timer.addNewTimer = data=> {
  let datetime = new Date(`${data.date} ${data.time.length <= 2 ? data.time + ':0' : data.time} ${data.ampm}`),
    datetimeUTC = new Date(datetime.toUTCString());

  return Timer.findAll()
  .then(results=> {
    let allUrls = results.map(r=>r.url),
      url = generateUrl(data.title);
    while(allUrls.includes(url)) {
      url = generateUrl(data.title, true)
    }

    return Timer.create({
      expire: datetimeUTC,
      url: url,
      weekdays: data.weekdays,
      weekends: data.weekends
    })
  }).then(timer=> {
    return timer.url;
  });
}

Timer.getTimerData = url=> {
  return Timer.findOne({
    where: { url: url }
  });
}

Timer.deleteOne = id=> {
  return Timer.findOne({
    where: { id: id }
  }).then(result=> {
    return result.destroy();
  });
}

module.exports = Timer;
