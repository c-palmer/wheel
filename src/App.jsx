import styles from './App.module.css'
import Canvas from './Canvas'

export default () => {
  return (
    <>
      <h1>Example</h1>
      <div className={styles.canvas}>
        <Canvas width={300} height={300} />
      </div>
    </>
  )
}