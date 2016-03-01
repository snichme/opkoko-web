import React, { PropTypes } from 'react'
import Presentation from './Presentation.js'
import Cursor from './Cursor.js'
import Times from './Times.js'

import {zeroed, formatTime, timeToSize} from '../helpers'


const Schedule = ({ title, start, end, tracks, onPresSelected, onPresFavourited }) => {
  const nowDate = new Date();
  const now = zeroed(nowDate.getHours()) + ":" + zeroed(nowDate.getMinutes());
  const startSize = timeToSize(start);
  const endSize = timeToSize(end);
  const offset = (start) => {
    if(!start) {
      return 0;
    }
    return timeToSize(start) - startSize;
  }
  return (<div className="schedule calendar">
    <table>
        <thead>
          <tr>
            <th></th>
            {tracks.map((track, j) => (
              <th key={"trackh" + j}>
                <div className="track__title">{track.title}</div>
                <div className="track__location">{track.location}</div>
              </th>
            ))}
          </tr>
        </thead>
      <tbody>
        <tr>
          <td className="times">
            <div style={{position: "absolute"}}>
              <Cursor offset={offset(now)} />
            </div>
            <Times start={start} hours={(endSize-startSize)/60} />
          </td>
          {tracks.map((track, j) => (
             <td key={"track" + j}>
               <div style={{position: "absolute"}}>
                 {track.presentations.map((item, i) => (
                    <Presentation onFav={onPresFavourited} onSelect={onPresSelected} key={"pres" + i} offset={offset(item.start)} pres={item} />
                  ))}
               </div>
             </td>
           ))}
        </tr>
      </tbody>
    </table>
  </div>)
}

export default Schedule
