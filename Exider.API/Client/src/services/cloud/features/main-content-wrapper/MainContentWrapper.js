import React from 'react';
import styles from './main.module.css';

const MainContentWrapper = ({children}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                {(children)}
            </div>
        </div>
    );
 };

export default MainContentWrapper;