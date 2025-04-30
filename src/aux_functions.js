export const randomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

export const randomNumber = (lb, ub) => {
    if (lb > ub) throw Error('lb cannot be grater than ub')
    
    return Math.floor(lb + Math.random() * (ub - lb + 1))
}