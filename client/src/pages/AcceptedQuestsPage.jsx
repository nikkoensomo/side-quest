import { useEffect, useState } from 'react';
import { getUserTakenQuestsService } from '../services/questService';
import QuestList from '../components/cards/QuestList';


const AcceptedQuestsPage = () => {
    const [takenQuests, setTakenQuests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getTakenQuests() {
            try {
                setIsLoading(true);
                const quest = await getUserTakenQuestsService();

                console.log(quest);
                setTakenQuests(quest);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        getTakenQuests();
    }, []);

    return (
        <>
            <QuestList 
                quests={takenQuests}

            />

            <p>hello</p>
        </>
    );
}

export default AcceptedQuestsPage;