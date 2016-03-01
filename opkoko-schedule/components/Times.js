import React from 'react'
import {timeToSize, formatTime} from '../helpers'

export default ({ start, hours }) => {
  let times = [];
  const startSize = timeToSize(start);
  for(let i = 0; i < hours*2; i++) {
    let n = startSize + i * 30;
    times.push(n);
  }
  return (<div>
    {times.map((t, i) => (
       <div key={t} className="time time--half">{formatTime(t)}</div>
     ))}
  </div>)
}
