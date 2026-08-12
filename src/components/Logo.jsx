import React from 'react'

function Logo({width = '100px'}) {
  return (
    <span
      className="font-display font-bold tracking-tight select-none"
      style={{ fontSize: width === '100%' ? '1.5rem' : '1.25rem' }}
    >
      <span className="text-cyan">◆</span>
      <span className="text-chalk ml-1">Byte</span>
      <span className="text-mist">Log</span>
    </span>
  )
}

export default Logo