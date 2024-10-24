import { useEffect, useState } from 'react';
import { getAllGamesAPI} from '../Services/allAPI';

const useFetchAllGames = () => {
    const [allGames, setAllGames] = useState([]);

    const fetchAllGames = async () => {
        try {
            const result = await getAllGamesAPI({ "Content-Type": "multipart/form-data" });
            if (result.status === 200) {
                setAllGames(result.data);
            } else {
                throw new Error("Failed to retrieve projects");
            }
        } catch (err) {
            console.error('Error Fetching projects', err);
            alert('Failed to retrieve projects');
        }
    };

    useEffect(() => {
        fetchAllGames();
    }, []);

    return allGames;
};



export default useFetchAllGames;