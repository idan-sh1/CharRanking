import HomePage from "../Components/HomePage.jsx";
import LogoutLink from "../Components/Authentication/LogoutLink.jsx";
import AuthorizeView, { AuthorizedUser } from "../Components/Authentication/AuthorizeView.jsx";
import { Layout } from '../Components/Menu/Layout.jsx';

function Home() {
    return (
        <AuthorizeView>
            <span><LogoutLink>Logout <AuthorizedUser value="email" /></LogoutLink></span>
            <Layout>
                <HomePage />
            </Layout>
        </AuthorizeView>
    );
}

export default Home;