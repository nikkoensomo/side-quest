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

    const [errors, setErrors] = useState({
        title: '',
        description: '',
        reward: '',
        pickupLocation: '',
        deliveryLocation: '',
        general: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: "" })
    };

    const validate = () => {
        const newErrors = {};

        if (formData.title.trim() === quest.title) {
            newErrors.title = "Please make changes.";
        }

        if (!formData.pickupLocation.trim()) {
            newErrors.pickupLocation = "Please enter the pickup location.";
        }

        if (!formData.deliveryLocation.trim()) {
            newErrors.deliveryLocation = "Please enter the delivery location.";
        }

        if (!formData.reward) {
            newErrors.reward = "Please enter the reward price.";
        }

        if (!formData.description.trim()) {
            newErrors.description = "Please enter a description.";
        }

        return newErrors;
    }

    const handleSubmit = async () => {
        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setIsLoading(true);
            const updatedForm = await updateQuestService(quest._id, formData);

            console.log('Updated:', updatedForm);

            onSuccess();
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
            {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}

            <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                placeholder={quest.pickupLocation}
                rows="1"
                className="w-3/4 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
            {errors.pickupLocation && <p className="text-red-500 text-xs">{errors.pickupLocation}</p>}

            <input
                type="text"
                name="deliveryLocation"
                value={formData.deliveryLocation}
                onChange={handleChange}
                placeholder={quest.deliveryLocation}
                rows="1"
                className="w-3/4 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
            {errors.deliveryLocation && <p className="text-red-500 text-xs">{errors.deliveryLocation}</p>}

            <input
                type="number"
                name="reward"
                value={formData.reward}
                onChange={handleChange}
                placeholder={quest.reward}
                rows="1"
                className="w-3/4 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
            {errors.reward && <p className="text-red-500 text-xs">{errors.reward}</p>}

            <textarea
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder={quest.description}
                rows="3"
                className="w-3/4 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
            {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}

            <BigBlackButton
                label='Update'
                onClick={handleSubmit}
                isDisabled={isLoading}
            />
        </>
    )
}

export default EditQuestForm;