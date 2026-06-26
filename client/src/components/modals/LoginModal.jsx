import { useRef, useEffect } from 'react';

import LoginForm from '../forms/LoginForm';

const LoginModal = ({ isOpen, onClose }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (!isOpen) return;

            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div
                ref={modalRef}
                className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
            >
                <div className="mb-6 flex flex-col items-center text-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-950 text-lg font-bold text-white">
                        SQ
                    </div>

                    <h2 className="text-2xl font-semibold text-zinc-950">
                        Welcome back
                    </h2>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                        Continue managing your quests, accepted tasks, and deliveries.
                    </p>
                </div>

                <LoginForm onSuccess={onClose} />

                <p className="mt-5 text-center text-sm text-gray-500">
                    New to SideQuest? Create an account from the header.
                </p>
            </div>
        </div>
    );
};

export default LoginModal;