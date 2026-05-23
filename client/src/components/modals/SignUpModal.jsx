import { useRef, useEffect } from 'react'

import CloseButton from "../buttons/CloseButton";
import ConfirmButton from "../buttons/ConfirmButton";
import OtherOptionButton from '../buttons/sign-up-buttons/OtherOptionButton';

import SignUpForm from "../forms/SignUpForm";

const SignUpModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const modalRef = useRef(null);

    // Closes modal if clicked outside
    useEffect(() => {
        function handleClickOutside(e) {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousdeown", handleClickOutside);
        }
    }, [onClose]);

    return(
        <>
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                    <div className="flex flex-col justify-center items-center mb-4">
                        <h2 className="mb-4">Logo here</h2>
                        <h2 className="text-black text-2xl font-semibold mb-4">Join Our Exclusive Community!</h2>
                        <p className="text-gray-400 text-sm text-center px-6">
                            Become a member to enjoy special content and offers. Sign up now and get 10% off your first
                            purchase with SideQuest
                        </p>
                    </div>

                    <SignUpForm
                        onSuccess={onClose}
                    />

                    <p className="text-gray-400 text-sm text-center mt-4">
                        or continue with
                    </p>

                    <div className="flex justify-center items-center gap-1 mt-4 mb-6">
                        <OtherOptionButton
                            label="Facebook"
                            onClick="" // TODO: create functionality
                        />
                        <OtherOptionButton
                            label="Google"
                            onClick="" // TODO: create functionality
                        />
                        <OtherOptionButton
                            label="Apple"
                            onClick="" // TODO: create functionality
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUpModal;