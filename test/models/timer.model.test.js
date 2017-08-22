
const expect = require('chai').expect;
const conn = require('../../models/_db')
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
    let timer1, timer2, timer3;
    beforeEach(()=> {
      return Promise.all([
        Timer.addNewTimer({
          minute: "56",
          second: "32",
          options: {
            weekdays: "true",
            weekends: "false"
          },
          name: "timer1"
        }),
        Timer.addNewTimer({
          minute: "56",
          second: "32",
          name: "timer2"
        }),
        Timer.addNewTimer({
          name: "timer1"
        })
      ]).then(timers=> {
        timer1 = timers[0];
        timer2 = timers[1];
        timer3 = timers[2];
      })
    })

    it('a timer by url', ()=> {
      return Timer.getTimerData(timer1.url)
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
        name: "My@@    awesome*!$ timer   +)_"
      }).then(timer=> {
        expect(timer).to.be.ok;
      })
    })

    it('deletes a timer by id', ()=> {
      return Timer.addNewTimer({
        name: "My@@    awesome*!$ timer   +)_"
      }).then(timer=> {
        return Timer.deleteOne(timer.id)
      }).then(timer=> {
        expect(timer).to.be.ok;
      })
    })
  })
})
