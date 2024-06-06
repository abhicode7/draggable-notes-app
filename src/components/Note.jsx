import React, { forwardRef } from 'react'

const Note = ({newRef, content, initialPosition = { x: 0, y: 0 },...props},ref) => {
  return (
    <div ref={newRef} className="absolute border-[2px] border-black cursor-move select-none p-4 w-[300px] bg-yellow-300 text-xl"
    style={{ top: initialPosition.y, left: initialPosition.x }} {...props}>📌 
    {content}</div>
  )
}

export default Note