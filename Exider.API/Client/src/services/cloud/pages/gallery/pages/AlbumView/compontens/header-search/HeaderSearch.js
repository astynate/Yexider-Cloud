import React from 'react';
import styles from './main.module.css';
import search from './images/search.png';

const HeaderSearch = ({placeholder}) => {
    return (
        <div className={styles.search}>
            <img 
                src={search} 
                className={styles.icon} 
            />
            <input 
                className={styles.input} 
                placeholder={placeholder}
            />
        </div>
    );
};

export default HeaderSearch;