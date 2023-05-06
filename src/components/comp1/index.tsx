import styles from "./comp1.module.scss" // global import ./comp1.scss

function Comp1(){
    return (
        <div className={styles.box}>
            <p>component 1</p>
        </div>
    )
}

export default Comp1