import { Stage, Layer, Text, Rect, Wedge, Group } from 'react-konva'
import { toDegrees } from './aux_functions'

export default function Wheel({ wedges }) {
    const width = 500
    const height = width
    const center = { x: width / 2, y: height / 2 }
    const innerAngle = toDegrees(2 * Math.PI / wedges.length)
    const radius = width / 2

    const WheelWedge = ({ text, color, angle }) => {
        return (
            <Group x={center.x} y={center.y} rotation={angle}>
                <Wedge radius={radius} angle={innerAngle} fill={color} stroke={color} strokeWidth={1} />
                <Group rotation={innerAngle / 2}>
                    <Text text={text} x={100} y={-5} />
                </Group>
            </Group>
        )
    }

    return (
        <>
            <Stage width={500} height={500}>
                <Layer>
                    <Rect x={center.x} y={center.y} width={1} height={1} fill="black" />

                    <Group>
                        {wedges.map(({ id, text, color }, i) => (
                            <WheelWedge key={id} text={text} color={color} angle={i * innerAngle} />
                        ))}
                    </Group>
                </Layer>
            </Stage>
        </>
    )
}