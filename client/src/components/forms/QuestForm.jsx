import { useState } from 'react';
import { createTasksService } from '../../services/taskService';
import BigBlackButton from '../buttons/BigBlackButton';

const QuestForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending'
    });

    const [errors, setErrors] = useState({
        title: '',
        description: '',
        status: 'pending',
        general: ''
    })

    const [isLoading, setIsLoading] = useState(false);

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
        setErrors({...errors, [e.target.name]: ""});
    }

    function validate() {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = "Please enter a title.";
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

            const data = await createTasksService(formData);
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
            <div className="flex flex-col gap-4 px-6">
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}

                <textarea
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    rows="3"
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"
                />
                {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}

                <BigBlackButton
                    label={isLoading ? 'Creating...' : 'Create'}
                    onClick={handleSubmit}
                    isDisabled={isLoading}
                />
            </div>
        </>
    )
}

export default QuestForm;