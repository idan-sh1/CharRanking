import Item from './Item';
import PropTypes from 'prop-types';

const ItemCollection = ({ items, drag, imgArr }) => {

    return (
        <div className="items-not-ranked">
            {
                items.map((item) => (item.ranking === 0)
                    ? <Item key={`item-${item.id}`} item={item} drag={drag}
                        itemImgObj={imgArr.find(o => o.id === item.imageId)} />
                    : null)
            }
        </div>
    )
}
ItemCollection.propTypes = {
    items: PropTypes.array,
    drag: PropTypes.func,
    imgArr: PropTypes.array
};

export default ItemCollection;