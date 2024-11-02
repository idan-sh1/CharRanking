import { useState, useEffect } from 'react';
import RankItems from './RankItems';
import PropTypes from 'prop-types';

const RankItemsContainer = ({ dataType, imgArr, userId }) => {
    const onePieceLocalStorageKey = "onepiece";
    const dragonBallLocalStorageKey = "dragonball";

    const [onePieceItems, setOnePieceItems] = useState(() => {
        return JSON.parse(localStorage.getItem(onePieceLocalStorageKey)) || []; // Default to an empty array
    });
    const [dragonBallItems, setDragonBallItems] = useState(() => {
        return JSON.parse(localStorage.getItem(dragonBallLocalStorageKey)) || []; // Default to an empty array
    });

    const getDataFromApi = () => {
        fetch(`rankings/${dataType}&${userId}`)
            .then((results) => {
                if (!results.ok) {
                    throw new Error('Network response was not ok');
                }
                return results.json();
            })
            .then(data => {
                setFunc(data); // Set the state with fetched data
                localStorage.setItem(localStorageKey, JSON.stringify(data)); // Store data in localStorage
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    };

    let data = [];
    let setFunc = null;
    let localStorageKey = "";

    if (dataType === 1) {
        data = onePieceItems;
        setFunc = setOnePieceItems;
        localStorageKey = onePieceLocalStorageKey;
    } else if (dataType === 2) {
        data = dragonBallItems;
        setFunc = setDragonBallItems;
        localStorageKey = dragonBallLocalStorageKey;
    }

    // Reload items from database only when leaving page
    useEffect(() => {
        getDataFromApi();
    }, [window.location.href]);

    return (
        <RankItems
            items={Array.isArray(data) ? data : []} // Ensure data is always an array
            setItems={setFunc}
            dataType={dataType}
            imgArr={imgArr}
            localStorageKey={localStorageKey}
            userId={userId}
        />
    );
};

RankItemsContainer.propTypes = {
    dataType: PropTypes.number.isRequired,
    imgArr: PropTypes.array.isRequired,
    userId: PropTypes.string.isRequired
};

export default RankItemsContainer;
