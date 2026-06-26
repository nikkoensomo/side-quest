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
    });

    const [isLoading, setIsLoading] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "", general: "" });
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

        if (!formData.reward) {
            newErrors.reward = "Please enter the reward price.";
        }

        if (Number(formData.reward) <= 0) {
            newErrors.reward = "Reward must be greater than zero.";
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

            await createQuestService(formData);

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
        <div className="grid gap-4">
            {errors.general && (
                <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {errors.general}
                </div>
            )}

            <div>
                <label className="text-sm font-medium text-zinc-900">
                    Quest title
                </label>

                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Deliver documents to USC Main"
                    className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-zinc-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-950"
                />

                {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="text-sm font-medium text-zinc-900">
                        Pickup location
                    </label>

                    <input
                        type="text"
                        name="pickupLocation"
                        value={formData.pickupLocation}
                        onChange={handleChange}
                        placeholder="Where to pick up"
                        className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-zinc-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-950"
                    />

                    {errors.pickupLocation && <p className="mt-1 text-xs text-red-500">{errors.pickupLocation}</p>}
                </div>

                <div>
                    <label className="text-sm font-medium text-zinc-900">
                        Delivery location
                    </label>

                    <input
                        type="text"
                        name="deliveryLocation"
                        value={formData.deliveryLocation}
                        onChange={handleChange}
                        placeholder="Where to deliver"
                        className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-zinc-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-950"
                    />

                    {errors.deliveryLocation && <p className="mt-1 text-xs text-red-500">{errors.deliveryLocation}</p>}
                </div>
            </div>

            <div>
                <label className="text-sm font-medium text-zinc-900">
                    Reward
                </label>

                <input
                    type="number"
                    name="reward"
                    value={formData.reward}
                    onChange={handleChange}
                    placeholder="150"
                    min="1"
                    className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-zinc-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-950"
                />

                {errors.reward && <p className="mt-1 text-xs text-red-500">{errors.reward}</p>}
            </div>

            <div>
                <label className="text-sm font-medium text-zinc-900">
                    Description
                </label>

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Add clear instructions for the quest taker"
                    rows="4"
                    className="mt-1 w-full resize-none rounded-md border border-gray-300 px-4 py-2 text-sm text-zinc-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-950"
                />

                {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
            </div>

            <div className="flex justify-end border-t border-gray-200 pt-4">
                <BigBlackButton
                    label={isLoading ? 'Creating...' : 'Create Quest'}
                    onClick={handleSubmit}
                    isDisabled={isLoading}
                />
            </div>
        </div>
    );
};

export default QuestForm;