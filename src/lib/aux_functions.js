export const toDegrees = rad => rad * (180 / Math.PI)

export const randomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

export const randomNumber = (lb, ub) => {
    return lb + Math.floor(Math.random() * (ub - lb + 1))
}