import { useEffect } from 'react';
import RankItemsContainer from "../Components/RankItemsContainer.jsx";
import LogoutLink from "../Components/Authentication/LogoutLink.jsx";
import AuthorizeView, { AuthorizedUser, GetUserId } from "../Components/Authentication/AuthorizeView.jsx";
import { Layout } from '../Components/Menu/Layout.jsx';
import PropTypes from 'prop-types';

function Rank({ dataType, imgArr }) {

    useEffect(() => {
        // Store the userId in local storage
        if (GetUserId())
        {
            localStorage.setItem('UserId', GetUserId());
        }
    });

    return (
        <AuthorizeView>
            <span><LogoutLink>Logout <AuthorizedUser value="email" /></LogoutLink></span>
            <Layout>
                <RankItemsContainer dataType={dataType} imgArr={imgArr} userId={localStorage.getItem('UserId')} />
            </Layout>
        </AuthorizeView>
    );
}
Rank.propTypes = {
    dataType: PropTypes.number.isRequired,
    imgArr: PropTypes.array.isRequired
};

export default Rank;