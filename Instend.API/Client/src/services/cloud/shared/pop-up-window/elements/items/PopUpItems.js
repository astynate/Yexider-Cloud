import React, { useRef, useState } from "react";
import styles from './main.module.css';
import next from './images/next.png';

const PopUpItems = ({items}) => {
    const [active, setActive] = useState(0);
    const ref = useRef();

    return (
        <>
            <div className={styles.items}>
                {items.map((element, index) => {
                    return (
                        <div 
                            className={styles.item} 
                            key={index} 
                            id={active === index ? "active" : null}
                            onClick={() => setActive(index)}
                        >
                            <span>{element.title}</span>
                        </div>
                    );
                })}
                {/* <div className={styles.item} id="next">
                    <img src={next} draggable="false" />
                </div> */}
            </div>
            <div className={styles.element} ref={ref}>
                {React.cloneElement(items[active].element, {wrapper: ref})}
            </div>
        </>
    );
}

export default PopUpItems;