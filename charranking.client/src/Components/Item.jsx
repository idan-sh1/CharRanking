import PropTypes from 'prop-types';

const Item = ({ item, drag, itemImgObj }) => {
    return (
        <div className="unranked-cell">
            <img id={`item-${item.id}`} src={itemImgObj.image}
                style={{ cursor: "pointer" }} draggable="true" onDragStart={drag}
            />
        </div>
    )
}
Item.propTypes = {
    item: PropTypes.node,
    drag: PropTypes.func,
    itemImgObj: PropTypes.node
};

export default Item;