import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {

    return (
        <nav className='links'>
            <ul>
                <li>
                    <Link to="/" className='hover-underline-animation'>Home</Link>
                </li>
                <li>
                    <Link to="/general" className='hover-underline-animation'>General</Link>
                </li>
                <li>
                    <Link to="/entertainment" className='hover-underline-animation'>Entertainment</Link>
                </li>
                <li>
                    <Link to="/business" className='hover-underline-animation'>Business</Link>
                </li>
                <li>
                    <Link to="/politics" className='hover-underline-animation'>Politics</Link>
                </li>
                <li>
                    <Link to="/sports" className='hover-underline-animation'>Sports</Link>
                </li>
                <li>
                    <Link to="/tech" className='hover-underline-animation'>Tech</Link>
                </li>
                <li>
                    <Link to="/travel" className='hover-underline-animation'>Travel</Link>
                </li>
            </ul>
        </nav>
    )
};

export default Nav;