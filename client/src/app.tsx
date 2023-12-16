import { FC } from 'react';
import { CssBaseline } from '@mui/material';
import { RouterProvider } from "react-router-dom";

import { router } from './routes';
import Providers from './Providers';

const App: FC = () =>
    <>
        <Providers>
            <RouterProvider router={router}/>
            <CssBaseline/>
        </Providers>
    </>


export default App;