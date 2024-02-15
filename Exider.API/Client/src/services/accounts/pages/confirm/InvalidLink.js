import React from 'react';
import { Link } from 'react-router-dom';
import Content from "../../widgets/content/Content";
import Line from "../../shared/line/Line";

const InvalidLink = () => {

    return (

        <Content title="Confirm Email Address">
            <h1>The link is not <span className="selected-text">valid</span></h1>
            <p>We apologize but the link to confirm your email is not valid</p>
            <Line />
            <div className='external-links'>
                <div className='external-link'>
                    <p>Didn't receive a confirmation?</p>
                </div>
                <div className='external-link'>
                    <Link to='/account/login'>Go back to main page</Link>
                </div>
            </div>
        </Content>

    );

}

export default InvalidLink;