import Quest from '../models/Quest.js';
import User from '../models/User.js';

export const createQuest = async (req, res) => {
    try {
        const { title, description, location, reward, status } = req.body; 

        const newQuest = await Quest.create({
            postedBy: req.user.id,
            title: title,
            description: description,
            location: location,
            reward: reward,
            status: status
        });

        if (!newQuest) {
            return res.status(400).json({ message: 'Task was not created successfully.' });
        }

        res.status(201).json(newQuest);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
}

export const displayUserQuest = async (req, res) => {
    try {
        const quests = await Quest.find({ postedBy: req.user.id });

        res.status(200).json(quests);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
}

export const updateUserQuest = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        const updatedFields = {}

        if (title) updatedFields.title = title;

        if (description) updatedFields.description = description;

        if (status) updatedFields.status = status;

        const updatedQuest = await Quest.findByIdAndUpdate(
            { _id: req.params.id, postedBy: req.user.id },
            { $set: updatedFields },
            { new: true }
        )

        if (!updatedQuest) {
            return res.status(400).json({ message: 'Update was unsuccessful' });
        }

        res.status(200).json(updatedQuest);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }   
}

export const deleteUserQuest = async (req, res) => {
    try {
        const deletedQuest = await Quest.findByIdAndDelete(
            { _id: req.params.id, postedBy: req.user.id }
        )

        if (!deletedQuest) {
            return res.status(400).json({ message: 'Failed to delete task.' });
        }

        res.status(200).json(deletedQuest);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
}