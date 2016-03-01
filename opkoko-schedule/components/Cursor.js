import React from 'react'

export default  ({offset}) => {
  const styles = {
    top: offset + "px"
  }
  return <div className="schedule__cursor" style={styles} />
}
