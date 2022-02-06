import { useRoutes } from 'react-router-dom';

import { routesConfig } from 'routes/routesConfig';

const AppRouter = () => {
    const routes = useRoutes(routesConfig);

    return routes;
};

export default AppRouter;
