import { useState } from 'react';
import { updateQuestService } from '../../services/questService';
import BigBlackButton from '../buttons/BigBlackButton';

const EditQuestForm = ({ onSuccess, quest }) => {
    const [formData, setFormData] = useState({
        title: quest.title,
        description: quest.description,
        reward: quest.reward,
        pickupLocation: quest.pickupLocation,
        deliveryLocation: quest.deliveryLocation,
    });

    const [error, setError] = useState({
        general: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setError({ ...error, [e.target.name]: "" })
    };

    const validate = () => {
        const newError = {}

        const newChanges =
            formData.title.trim() !== quest.title ||
            formData.description.trim() !== quest.description ||
            formData.pickupLocation.trim() !== quest.pickupLocation ||
            formData.deliveryLocation.trim() !== quest.deliveryLocation ||
            Number(formData.reward) !== Number(quest.reward);

        if (!newChanges) {
            newError.general = "Please make changes before updating."
        };

        return newError
    }

    const handleSubmit = async () => {
        const newError = validate();

        if (Object.keys(newError).length > 0) {
            setError(newError);
            return;
        }

        try {
            setIsLoading(true);
            const updatedForm = await updateQuestService(quest._id, formData);

            console.log('Updated:', updatedForm);

            onSuccess(updatedForm);
        } catch (error) {
            console.log('error');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder={quest.title}
                className="w-3/4 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
            {error.general && <p className="text-red-500 text-xs">{error.general}</p>}

            <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                placeholder={quest.pickupLocation}
                rows="1"
                className="w-3/4 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
            {error.general && <p className="text-red-500 text-xs">{error.general}</p>}

            <input
                type="text"
                name="deliveryLocation"
                value={formData.deliveryLocation}
                onChange={handleChange}
                placeholder={quest.deliveryLocation}
                rows="1"
                className="w-3/4 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
            {error.general && <p className="text-red-500 text-xs">{error.general}</p>}

            <input
                type="number"
                name="reward"
                value={formData.reward}
                onChange={handleChange}
                placeholder={quest.reward}
                rows="1"
                className="w-3/4 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
            {error.general && <p className="text-red-500 text-xs">{error.general}</p>}

            <textarea
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder={quest.description}
                rows="3"
                className="w-3/4 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
            {error.general && <p className="text-red-500 text-xs">{error.general}</p>}

            <BigBlackButton
                label='Update'
                onClick={handleSubmit}
                isDisabled={isLoading}
            />
        </>
    )
}

export default EditQuestForm;