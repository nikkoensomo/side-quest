import { useState } from 'react';
import { updateQuestService } from '../../services/questService';
import BigBlackButton from '../buttons/BigBlackButton';

const EditQuestForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        reward: '',
        pickupLocation: '',
        deliveryLocation: '',
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

    const handleSubmit = async (questId, formData) => {
        try {
            setIsLoading(true);
            const updatedForm = await updateQuestService(questId, formData);

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
                label='Update'
                onClick={handleSubmit}
                isDisabled={isLoading}
            />
        </>
    )
}

export default EditQuestForm;