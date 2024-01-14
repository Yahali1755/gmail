import React, { FC } from 'react';
import { CssBaseline } from '@mui/material';

import Providers from './providers';
import Shell from './Shell';

const App: FC = () =>
    <>
        <Providers>
            <Shell/>
            <CssBaseline/>
        </Providers>
    </>


export default App;