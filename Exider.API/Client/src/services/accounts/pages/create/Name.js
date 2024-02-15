import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../processes/Registration";
import InputText from "../../shared/input/InputText";
import Button from "../../shared/button/Button";
import ValidationHandler from "../../../../utils/handlers/ValidationHandler";

const ValidateNameForm = (name, surname) => {

    return ValidationHandler.ValidateVarchar(name, 31) &&
        ValidationHandler.ValidateVarchar(surname, 31);

}

const Name = () => {

    const user = useContext(UserContext);
    const [name, setName] = useState(user.name);
    const [surname, setSurname] = useState(user.surname);
    const [validationState, setValidationState] = useState(ValidateNameForm(name, surname));

    useEffect(() => {

        user.name = name;
        user.surname = surname;
        setValidationState(ValidateNameForm(name, surname));

    }, [user, name, surname]);

    return (

        <>
            <h1>Creation of <span className="selected-text">Exider ID</span></h1>
            <p>Please enter your name and surname. This is a required fields.</p>
            <InputText placeholder="Name" autofocus={true} defaultValue={name} SetValue={setName} />
            <InputText placeholder="Surname" defaultValue={surname} SetValue={setSurname} />
            <Link to='/account/create/password' className='next'>
                <Button title="Next" disabled={!validationState} />
            </Link>
        </>

    );

}

export default Name;