import { Stage, Layer, Rect } from 'react-konva'

export default ({ width, height }) => {
  return (
    <Stage width={width} height={height}>
      <Layer>
        <Rect
          x={20}
          y={20}
          width={100}
          height={100}
          fill="red"
          draggable
        />
      </Layer>
    </Stage>
  )
}