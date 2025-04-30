
import Konva from 'konva'

export default class CanvasClass {
    constructor(container, width, height) {
        this.container = container
        this.width = width
        this.height = height

        this.stage = new Konva.Stage({
            container: container,
            width: this.width,
            height: this.height,
        })

        this.layer = new Konva.Layer()
        this.stage.add(this.layer)
    }

    addShape(shape) {
        this.layer.add(shape)

        return shape
    }

    removeShape(shape) {
        shape.destroy()

        return null
    }

    cleanUp() {
        this.stage.destroy()
    }
}