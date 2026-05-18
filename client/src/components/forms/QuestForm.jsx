import { useState } from 'react';
import { createQuestService } from '../../services/questService.js';
import BigBlackButton from '../buttons/BigBlackButton';

const QuestForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        pickupLocation: '',
        deliveryLocation: '',
        reward: '',
        description: '',
    });

    const [errors, setErrors] = useState({
        title: '',
        pickupLocation: '',
        deliveryLocation: '',
        reward: '',
        description: '',
        general: ''
    })

    const [isLoading, setIsLoading] = useState(false);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    }

    function validate() {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = "Please enter a title.";
        }
        
        if (!formData.pickupLocation.trim()) {
            newErrors.pickupLocation = "Please enter the pickup location.";
        }

        if (!formData.deliveryLocation.trim()) {
            newErrors.deliveryLocation = "Please enter the delivery location.";
        }

        if (!formData.reward.trim()) {
            newErrors.reward = "Please enter the reward price.";
        }

        if (!formData.description.trim()) {
            newErrors.description = "Please enter a description.";
        }

        return newErrors;
    }

    async function handleSubmit() {
        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setIsLoading(true);

            const data = await createQuestService(formData);
            console.log(formData);

            onSuccess();
        } catch (error) {
            setErrors({
                ...errors,
                general: error.response?.data?.message || 'Something went wrong.'
            });
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
                placeholder="Title"
                className="w-3/4 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}

            <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                placeholder="Pickup Location"
                rows="1"
                className="w-3/4 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
            {errors.pickupLocation && <p className="text-red-500 text-xs">{errors.pickupLocation}</p>}

            <input
                type="text"
                name="deliveryLocation"
                value={formData.deliveryLocation}
                onChange={handleChange}
                placeholder="Delivery Location"
                rows="1"
                className="w-3/4 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
            {errors.deliveryLocation && <p className="text-red-500 text-xs">{errors.deliveryLocation}</p>}

            <input
                type="number"
                name="reward"
                value={formData.reward}
                onChange={handleChange}
                placeholder="Reward Price"
                rows="1"
                className="w-3/4 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
            {errors.reward && <p className="text-red-500 text-xs">{errors.reward}</p>}

            <textarea
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                rows="3"
                className="w-3/4 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
            {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}

            <BigBlackButton
                label={isLoading ? 'Creating...' : 'Create'}
                onClick={handleSubmit}
                isDisabled={isLoading}
            />
        </>
    )
}

export default QuestForm;