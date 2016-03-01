import React, { PropTypes } from 'react'

const Presentation = ({ pres }) => {
  let cls = ["pres", "pres--" + pres.type];

  return (
    <div className={cls.join(" ")}>
      <div className="pres__title">{pres.start} {pres.title}</div>
      <div className="pres__author">{pres.author}</div>
      <div className="pres__description">{pres.description}</div>
    </div>
  )
}

const Empty = () => {

  return (
    <div className="pres pres--empty">
      Ingen presentation
    </div>
  )
}
const Currently = ({ tracks }) => {

  const row = (label, tracks, index) => {
    return (
      <tr>
        <td>{label}</td>
        {tracks.map((track, j) => (
        <td key={"ptr" + j}>
          {(track.presentations[index] ? <Presentation pres={track.presentations[index]} /> : <Empty />)}
        </td>))}
      </tr>
    )
  }

  return (<div className="schedule">
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
          {row("Pågående", tracks, 0)}
          {row("Kommande", tracks, 1)}
      </tbody>
    </table>
  </div>)
}


Currently.propTypes = {

}

export default Currently
