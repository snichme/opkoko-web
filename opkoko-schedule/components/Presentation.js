import React, { PropTypes } from 'react'

const Presentation = ({ pres, offset, onSelect, onFav }) => {
  let cls = ["pres", "pres--" + pres.length, "pres--" + pres.type];
  let styles = {
    top: offset + "px"
  }
  const select = (e) => {
    onSelect(pres.title);
  }
  const setFav = (e) => {
    e.preventDefault();
    onFav(pres.title);
  }
  return (
    <div className={cls.join(" ")} style={styles}>
      <a href="" onClick={setFav}>&#2764;</a>
      <div onClick={select} className="pres__title">{pres.start} {pres.title}</div>
      <div className="pres__author">{pres.author}</div>
    </div>
  )
}


Presentation.propTypes = {
  //pres: PropTypes.object.isRequired,
  //offset: PropTypes.number,
  //onSelect: PropTypes.func.isRequired
}

export default Presentation
