import _ from 'lodash';


export const zeroed = (n) => {
  let nn = "" + n;
  return nn.length === 2 ? nn : '0' + nn;
}

export const formatTime = (t) => {
  return zeroed(Math.floor(t/60)) + ":" + (t%60 > 0 ? "30" : "00");
}

export const timeToSize = (time) => {
  let parts = time.split(":").map((p) => parseInt(p));
  return parts[0]*60 + parts[1];
}

const isOngoing = (now, pres) => {
  let n = timeToSize(now);
  let start = timeToSize(pres.start);
  let end = start + pres.length;
  return start <= n && n <= end;
}

const findCurrentIndex = (now, presses) => {
  var num = presses.length;
  for(let i = 0; i < num; i++) {
    if(isOngoing(now, presses[i])) {
      return i;
    }
  }
  return -1;
}

const current = (day, now) => {
  return _.map(day.tracks, (track) => {
    let currentIndex = findCurrentIndex(now, track.presentations);
    return _.extend({}, track, {
      presentations:  [
        track.presentations[currentIndex],
        track.presentations[currentIndex + 1]
      ]
    });
  });
}

export const nowAsTime = () => {
  const nowDate = new Date();
  return zeroed(nowDate.getHours()) + ":" + zeroed(nowDate.getMinutes());
}

export const currentForDay = (program, day, now) => {
  return _.extend({}, program[day], {
    title: 'Just nu',
    tracks: current(program[day], now)
  });
}


export const createPersonalSchedule = (program, favs) => {
  return _.map(program, function(day) {
    var tracks = _.map(day.tracks, function(track) {
      var presses =  _.filter(track.presentations, function(pres) {
        return _.includes(favs, pres.title);
      });
      return _.extend({}, track, {
        presentations: presses
      })
    });
    return _.extend({}, day, {
      title: day.title + " (Personligt)",
      tracks: tracks
    });
  });
}
