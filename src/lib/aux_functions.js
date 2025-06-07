export const toDegrees = rad => rad * (180 / Math.PI)

export const randomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

// returns number [lb, ub]
export const randomNumber = (lb, ub) => {
    return lb + Math.floor(Math.random() * (ub - lb + 1))
}

export const randomChoice = array => {
    const randomIndex = randomNumber(0, array.length - 1)
    return array[randomIndex]
}