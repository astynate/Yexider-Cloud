import { useRef } from 'react';
import styles from './main.module.css';
import { ButtonEffectHandler } from '../../../../../../utils/ui/ButtonEffectHandler';

const MainMessageButton = ({
        image, 
        callback = () => {}, 
        onMouseEnter = () => {},
        onMouseLeave = () => {},
    }) => {
    
    const ref = useRef();

    return (
        <button 
            ref={ref}
            className={styles.button} 
            onClick={(event) => {
                ButtonEffectHandler(ref, event);
                callback(event);
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <img src={image} draggable="false" />
        </button>
    );
}

export default MainMessageButton;