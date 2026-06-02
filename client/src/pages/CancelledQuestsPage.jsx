import { useEffect, useState } from 'react';
import { getUserCancelledQuestsService } from '../services/questService';
import QuestList from '../components/cards/QuestList';

const CancelledQuestsPage = () => {

    const [cancelledQuests, setCancelledQuests] = useState(null);
    const [selectedQuest, setSelectedQuest] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function displayCancelledQuests() {
            try {
                setIsLoading(true);

                const quests = await getUserCancelledQuestsService();

                console.log(quests);
                setCancelledQuests(quests);
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        }

        displayCancelledQuests();
    }, []);


    return (
        <>
            <QuestList 
                quests={cancelledQuests}
            />
        </> 
    )
}

export default CancelledQuestsPage;