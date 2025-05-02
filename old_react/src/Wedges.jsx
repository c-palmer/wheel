import { useState } from 'react'
import styles from './Wedges.module.css'

export default ({ wedges, onNewWedgeText, onTextChange }) => {
    const [ newText, setNewText ] = useState('')

    const handleInput = e => {
        setNewText(e.target.value)
    }

    const handleKeyPress = e => {
        if (e.key !== 'Enter' || newText.trim() === '') return

        onNewWedgeText(newText)
        setNewText('')
    }

    return (
        <div className={styles.wedges}>
            <h2>Add Wedge</h2>
            
            <input
                type="text"
                value={newText}
                placeholder="Input text here"
                onKeyUp={handleKeyPress}
                onChange={handleInput}
            />

            {wedges.map(({ id, text }) => (
                <div key={id}>
                    <input type="text" value={text} onChange={e => onTextChange(id, e.target.value)}/>
                </div>
            ))}
        </div>
    )
}