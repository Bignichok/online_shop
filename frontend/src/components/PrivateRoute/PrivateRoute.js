import { Navigate, useLocation } from 'react-router-dom';

import pathNamesConfig from 'routes/pathNamesConfig';

const PrivateRoute = ({ children }) => {
    const loggedIn = true;
    const location = useLocation();

    if (!loggedIn) {
        return (
            <Navigate
                to={pathNamesConfig.login}
                state={{ from: location }}
                replace
            />
        );
    }

    return children;
};

export default PrivateRoute;
