﻿import Login from '../services/accounts/pages/login/Login';
import Confirm from '../services/accounts/pages/confirm/Confirm';
import { Registration } from '../services/accounts/processes/Registration';
import { PasswordRecovery } from '../services/accounts/processes/PasswordRecovery';
import ValidLink from '../services/accounts/pages/confirm/ValidLink';
import InvalidLink from '../services/accounts/pages/confirm/InvalidLink';

const PublicRoutes = [
    {
        path: 'login',
        element: <Login />
    },
    {
        path: 'create/*',
        element: <Registration />
    },
    {
        path: 'email/confirmation/:id',
        element: <Confirm valid={ValidLink} invalid={InvalidLink} />
    },
    {
        path: 'password/recovery/*',
        element: <PasswordRecovery />
    }
];

export const MainRoutes = ['main']

export default PublicRoutes;
