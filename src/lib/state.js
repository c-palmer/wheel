import { reactive } from 'vue'
import { randomNumber } from './aux_functions'

const initialSpeed = 30
const initialAngle = randomNumber(0, 360)

const s = reactive({
  wedges: [],
  wheelIsRotating: false,
  winner: '',
  initialSpeed,
  speed: initialSpeed,
  duration: 30_000,
  timeElapsed: 0,
  wheelAngle: initialAngle,
})

export default s