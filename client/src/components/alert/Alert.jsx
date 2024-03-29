import React, { useState, useEffect } from 'react';
import './alert.css'

export default function Alert({ msg, type }) {
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (msg) {
            setShow(true);
            setInterval(() => {
                setShow(false);
            }, 3000);
        }
    }, [msg]);

    return (
        <React.Fragment>{show && <div className={`alert alert-${type}`}>{msg}</div>}</React.Fragment>
    )
}