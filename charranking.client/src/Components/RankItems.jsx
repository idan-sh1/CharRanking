import { useEffect, useState } from 'react';
import RankingGrid from "./RankingGrid";
import ItemCollection from "./ItemCollection";
import PropTypes from 'prop-types';

const RankItems = ({ items, setItems, dataType, imgArr, localStorageKey, userId }) => {

    const [reload, setReload] = useState(false);
    const [message, setMessage] = useState('');

    
    function Reload() {
        setReload(true);
    }

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drop(ev) {

        ev.preventDefault();
        const targetElm = ev.target;
        if (targetElm.nodeName === "IMG") {
            return false;
        }
        if (targetElm.childNodes.length === 0) {
            var data = parseInt(ev.dataTransfer.getData("text").substring(5));
            const transformedCollection = items.map((item) => (item.id === parseInt(data)) ?
                { ...item, ranking: parseInt(targetElm.id.substring(5)) } : { ...item, ranking: item.ranking });
            setItems(transformedCollection);
        }

    }
    useEffect(() => {
        if (items == null) {
            getDataFromApi();
        }

    }, [dataType]);

    function getDataFromApi() {
        fetch(`rankings/${dataType}&${userId}`)
            .then((results) => {
                return results.json();
            })
            .then(data => {

                setItems(data);
            })
    }

    useEffect(() => {
        if (items != null) {
            localStorage.setItem(localStorageKey, JSON.stringify(items));
        }
        setReload(false);
    }, [items])

    // Reload items
    useEffect(() => {
        if (reload === true) {
            reloadRanking();
        }
    }, [reload])

    // Clear message
    useEffect(() => {
        setMessage('');
    }, [window.location.href])

    function updateItemsRanking() {
        fetch(`rankings/${dataType}&${userId}&${JSON.stringify(items)}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Parse JSON if the request is successful
                } else {
                    throw new Error('Request failed with status ' + response.status);
                }
            })
            .then(() => {
                setMessage('Request completed successfully!');
            })
            .catch(error => {
                setMessage('Error: ' + error.message); // Handle any network or parsing errors
            });
    }

    function reloadRanking() {
        fetch(`rankings/reload:${dataType}`)
            .then((results) => {
                return results.json();
            })
            .then(data => {

                setItems(data);
            })
    }

    return (
        (items && items.length > 0) ?
            <main>
                <RankingGrid items={items} imgArr={imgArr} drag={drag} allowDrop={allowDrop} drop={drop} />
                <ItemCollection items={items} drag={drag} imgArr={imgArr} />
                <button onClick={Reload} className="reload" style={{ "marginTop": "10px" }}> <span className="text" >Reload</span > </button>
                <button onClick={updateItemsRanking} className="save" style={{ "marginTop": "10px" }}> <span className="text" >Save</span > </button>
                <p> { message } </p>
            </main>
            :
            <main>
                <p>No items to display.<br></br>
                    Try <b>Populate Ranking Data</b> in the <a href='/'>Homepage</a></p>
            </main>
    )
}

RankItems.propTypes = {
    items: PropTypes.array.isRequired,
    setItems: PropTypes.func,
    dataType: PropTypes.number.isRequired,
    imgArr: PropTypes.array.isRequired,
    localStorageKey: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired
};

export default RankItems;