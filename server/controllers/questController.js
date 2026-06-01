import Quest from '../models/Quest.js';
import User from '../models/User.js';

export const createQuest = async (req, res) => {
    try {
        const { title, description, pickupLocation, deliveryLocation, reward, status } = req.body;

        const newQuest = await Quest.create({
            postedBy: req.user.id,
            title: title,
            description: description,
            pickupLocation: pickupLocation,
            deliveryLocation: deliveryLocation,
            reward: reward,
            status: status
        });

        if (!newQuest) {
            return res.status(400).json({ message: 'Task was not created successfully.' });
        }

        res.status(200).json(newQuest);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
}

export const acceptQuest = async (req, res) => {
    try {
        const quest = await Quest.findById(req.params.id);

        if (!quest) {
            return res.status(404).json({ message: 'Quest not found.' });
        }

        if (quest.status !== 'open') {
            return res.status(400).json({ message: 'Quest is no longer available.' });
        }

        if (quest.postedBy.toString() === req.user.id) {
            return res.status(400).json({ message: 'Cannot accept own quest.' });
        }

        const updatedQuest = await Quest.findByIdAndUpdate(
            req.params.id,
            {
                acceptedBy: req.user.id,
                status: 'in-progress'
            },
            { new: true }
        );

        res.status(200).json({ quest: updatedQuest });
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

export const displayAllQuests = async (req, res) => {
    try {
        const quests = await Quest.find({
            status: 'open',
            postedBy: { $ne: req.user.id }
        }).populate('postedBy', 'username');

        if (quests.length === 0) {
            return res.status(404).json({ message: 'No open quests available' });
        }

        res.status(200).json(quests);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
}

export const displayUserTakenQuests =  async (req, res) => {
    try {
        const takenQuests = await Quest.find({
            acceptedBy: req.user.id,
            status: 'in-progress'
        }).populate([
            { path: 'acceptedBy', select: 'username'},
            { path: 'postedBy', select: 'username' }
        ]);

        if (!takenQuests) {
            return res.status(400).json({ message: 'No accepted quests' });
        }

        res.status(200).json(takenQuests);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
}

export const displayUserCompletedQuests = async (req, res) => {
    try {
        const completedQuests = await Quest.find({
            acceptedBy: req.user.id,
            status: 'completed'
        }).populate([
            { path: 'acceptedBy', select: 'username' },
            { path: 'postedBy', select: 'username' }
        ]);

        if (!completedQuests) {
            return res.status(400).json({ message: 'No completed quests.' });
        }

        res.status(200).json(completedQuests);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
}

export const displayUserCancelledQuests = async (req, res) => {
    try {
        const cancelledQuests = await Quest.find(
            { acceptedBy: req.user.id, isDeleted: true, status: 'cancelled' }
        ).populate([
            { path: 'acceptedBy', select: 'username' },
            { path: 'postedBy', select: 'username' } 
        ]);

        if (!cancelledQuests) {
            return res.status(400).json({ message: 'No cancelled quests' });
        }

        res.status(200).json(cancelledQuests);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const completeQuest = async (req, res) => {
    try {
        const completedQuest = await Quest.findOneAndUpdate(
            { _id: req.params.id, acceptedBy: req.user.id , status: 'in-progress' },
            { $set: {status: 'completed' } },
            { new: true, runValidators: true }
        )

        if (!completedQuest) {
            return res.status(400).json({ message: 'Quest completion cannot be done' });
        }

        res.status(200).json(completedQuest);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
}

export const cancelAcceptedQuest = async (req, res) => {
    try {
        const deletedQuest = await Quest.findOneAndUpdate(
            { _id: req.params.id, acceptedBy: req.user.id },
            { 
                $set: {
                    isDeleted: true,
                    deletedAt: new Date(),
                    status: 'cancelled'
                }
            },
            { new: true, runValidators: true }
        )

        if (!deletedQuest) {
            return res.status(400).json({ message: 'Quest cannot be cancelled.' });
        }

        res.status(200).json(deletedQuest);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
}

export const updateUserQuest = async (req, res) => {
    try {
        const { title, description, pickupLocation, deliveryLocation, reward } = req.body;

        const updatedFields = {}

        if (title) updatedFields.title = title;

        if (description) updatedFields.description = description;

        if (pickupLocation) updatedFields.pickupLocation = pickupLocation;

        if (deliveryLocation) updatedFields.deliveryLocation = deliveryLocation;

        if (reward) updatedFields.reward = reward;

        const updatedQuest = await Quest.findOneAndUpdate(
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
        const deletedQuest = await Quest.findOneAndDelete(
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