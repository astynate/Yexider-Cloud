import React from 'react';
import styles from './main.module.css';
import PopUpWindow from '../pop-up-window/PopUpWindow';
import Button from '../ui-kit/button/Button';

const PopUpField = (props) => {
  const handleEnterPress = async (event) => {
    if (event.key === 'Enter') {
      if (props.field[0] === '' || props.field[0] === null){
        alert('This field must not be empty');
      } else {
        await props.callback();
        props.close();
      }
    }
  }

  return (
    <PopUpWindow
      open={props.open} 
      close={props.close}
      isHeaderless={false}
      isHeaderPositionAbsulute={true}
    >
      <div className={styles.field}>
        <h1>{props.title}</h1>
        <span>{props.text}</span>
        <input 
          defaultValue={props.field[0]}
          onInput={(event) => props.field[1](event.target.value)}
          onKeyDown={handleEnterPress}
          placeholder={props.placeholder}
          maxLength={50} 
          minLength={1}
          autoFocus={true}
        />
        <Button 
          value={'Next'}
          callback={async () => {
            if (props.field[0] === '' || props.field[0] === null){
              alert('This field must not be empty');
            } else {
              await props.callback();
              props.close();
            }
          }}
        />
      </div>
    </PopUpWindow>
  );
};

export default PopUpField;