import styles from './App.module.css'
import Wheel from './Wheel'
import Wedges from './Wedges'
import { randomColor } from './aux_functions'
import { useState } from 'react'

export default () => {
  const [ wedges, setWedges ] = useState([])

  const onNewWedgeText = newText => {
    const newWedge = { 
      color: randomColor(),
      text: newText
    }

    if (wedges.length === 0) {
      newWedge.id = 1
    } else {
      newWedge.id = wedges[wedges.length - 1].id + 1
    }

    setWedges(wedges => [...wedges, newWedge])
  }

  const onTextChange = (id, newText) => {
    setWedges(wedges.map(wedge => {
      if (wedge.id !== id) return wedge

      wedge.text = newText
      return wedge
    }))
  }

  return (
    <>
      <h1>Wheel</h1>
      <div className={styles.container}>
        <div className={styles.wheel}>
          <Wheel wedges={wedges} />
        </div>
        <Wedges
          wedges={wedges}
          onNewWedgeText={onNewWedgeText}
          onTextChange={onTextChange} />
      </div>
    </>
  )
}