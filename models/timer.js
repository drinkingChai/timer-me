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
  let today = new Date(),
    date = new Date(
      data.year || today.getFullYear(),
      data.month || today.getMonth(),
      data.date || today.getDate(),
      data.hours || today.getHours(),
      data.minutes || today.getMinutes(),
      data.seconds || today.getSeconds()
    );

  return Timer.findAll()
  .then(results=> {
    let allUrls = results.map(r=>r.url),
      url = generateUrl(data.title);
    while(allUrls.includes(url)) {
      url = generateUrl(data.title, true)
    }

    return Timer.create({
      expire: date,
      url: url
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
