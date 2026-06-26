import { useState } from 'react';
import { updateQuestService } from '../../services/questService';
import BigBlackButton from '../buttons/BigBlackButton';

const EditQuestForm = ({ onSuccess, quest, onClose }) => {
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
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
        setError({ general: '' });
    };

    const validate = () => {
        const newError = {};

        const hasChanges =
            formData.title.trim() !== quest.title ||
            formData.description.trim() !== quest.description ||
            formData.pickupLocation.trim() !== quest.pickupLocation ||
            formData.deliveryLocation.trim() !== quest.deliveryLocation ||
            Number(formData.reward) !== Number(quest.reward);

        if (!formData.title.trim()) {
            newError.general = "Please enter a title.";
        } else if (!formData.pickupLocation.trim()) {
            newError.general = "Please enter the pickup location.";
        } else if (!formData.deliveryLocation.trim()) {
            newError.general = "Please enter the delivery location.";
        } else if (!formData.reward) {
            newError.general = "Please enter the reward price.";
        } else if (Number(formData.reward) <= 0) {
            newError.general = "Reward must be greater than zero.";
        } else if (!formData.description.trim()) {
            newError.general = "Please enter a description.";
        } else if (!hasChanges) {
            newError.general = "Please make changes before updating.";
        }

        return newError;
    };

    const handleSubmit = async () => {
        const newError = validate();

        if (Object.keys(newError).length > 0) {
            setError(newError);
            return;
        }

        try {
            setIsLoading(true);

            const updatedQuest = await updateQuestService(quest._id, formData);

            onSuccess(updatedQuest);
        } catch (error) {
            setError({
                general: error.response?.data?.message || 'Failed to update quest.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid gap-4">
            {error.general && (
                <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {error.general}
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
                    placeholder={quest.title}
                    className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-zinc-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-950"
                />
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
                        placeholder={quest.pickupLocation}
                        className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-zinc-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-950"
                    />
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
                        placeholder={quest.deliveryLocation}
                        className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-zinc-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-950"
                    />
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
                    placeholder={String(quest.reward)}
                    min="1"
                    className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-zinc-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-950"
                />
            </div>

            <div>
                <label className="text-sm font-medium text-zinc-900">
                    Description
                </label>

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder={quest.description}
                    rows="4"
                    className="mt-1 w-full resize-none rounded-md border border-gray-300 px-4 py-2 text-sm text-zinc-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-950"
                />
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:justify-end">
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                >
                    Cancel
                </button>

                <BigBlackButton
                    label={isLoading ? 'Updating...' : 'Update Quest'}
                    onClick={handleSubmit}
                    isDisabled={isLoading}
                />
            </div>
        </div>
    );
};

export default EditQuestForm;