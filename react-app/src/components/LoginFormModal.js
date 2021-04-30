import React, { useState, useEffect } from 'react';
import { Modal } from '../context/Modal';
import LoginForm from './auth/LoginForm';

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <button onClick={() =>
                {console.log(showModal)
                setShowModal(true)}}>Log In</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;