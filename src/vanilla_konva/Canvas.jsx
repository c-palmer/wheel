import { useEffect, useRef, useState } from 'react'
import CanvasClass from './canvas'
import Konva from 'konva'

export default ({ width, height }) => {
  const konvaContainer = useRef(null)
  const [ shape, setRect ] = useState(null)
  const canvas = useRef(null)

  useEffect(() => {
    canvas.current = new CanvasClass(konvaContainer.current, width, height)

    return () => canvas.current.cleanUp()
  }, [])

  const addShape = () => {
    if (shape) return

    const newTriangle = new Konva.Shape({
      sceneFunc: (ctx, shape) => {
        ctx.beginPath()
        ctx.moveTo(20, 50)
        ctx.lineTo(220, 80)
        ctx.lineTo(100, 150)
        ctx.closePath()
        ctx.fillStrokeShape(shape)
      },
      fill: '#00D2FF',
      stroke: 'black',
      draggable: true
    })

    setRect(newTriangle)
    canvas.current.addShape(newTriangle)
    newTriangle.on('xChange', e => console.log('x change on shape'))
  }

  const removeShape = () => {
    if (!shape) return

    setRect(canvas.current.removeShape(shape))
  }

  return (
    <>
      <div ref={konvaContainer} />
      <button onClick={addShape}>add shape</button>
      <button onClick={removeShape}>remove shape</button>
    </>
  )
}
