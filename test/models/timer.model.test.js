
const expect = require('chai').expect;
const conn = require('../../models/_db');
const models = require('../../models').models;
const Timer = models.Timer;

/*
  Timer.addNewTimer(req.body)
  Timer.getTimerData(req.params.url)
  Timer.deleteOne(req.params.id)
*/

describe('Timer', ()=> {

  beforeEach(()=> {
    return conn.sync({ force: true });
  })


  describe('model', ()=> {
    it('exists', ()=> {
      expect(Timer).to.be.ok;
    })
  })


  describe('gets', ()=> {
    let timer1Url, timer2Url, timer3Url;
    beforeEach(()=> {
      return Promise.all([
        Timer.addNewTimer({
          minute: "56",
          second: "32",
          weekdays: "true",
          weekends: "false",
          title: "timer1"
        }),
        Timer.addNewTimer({
          minute: "56",
          second: "32",
          title: "timer2"
        }),
        Timer.addNewTimer({
          title: "timer3"
        })
      ]).then(timerUrls=> {
        timer1Url = timerUrls[0];
        timer2Url = timerUrls[1];
        timer3Url = timerUrls[2];
      })
    })

    it('a timer by url', ()=> {
      return Timer.getTimerData(timer1Url)
        .then(timer=> {
          expect(timer).to.be.ok;
        })
    })
  })


  describe('create and delete', ()=> {
    it('creates a new timer', ()=> {
      return Timer.addNewTimer({
        day: "10",
        month: "8",
        year: "2050",
        hour: "14",
        minute: "56",
        second: "32",
        options: {
          weekdays: "true",
          weekends: "false"
        },
        title: "My@@    awesome*!$ timer   +)_"
      }).then(timerUrl=> {
        expect(timerUrl).to.be.ok;
      })
    })

    it('deletes a timer by id', ()=> {
      return Timer.addNewTimer({
        title: "My@@    awesome*!$ timer   +)_",
      }).then(timerUrl=> {
        return Timer.getTimerData(timerUrl)
      }).then(timer=> {
        return Timer.deleteOne(timer.id)
      }).then(timer=> {
        expect(timer).to.be.ok;
      })
    })
  })
})
