import React, { FC } from 'react';
import { CssBaseline } from '@mui/material';

import Providers from './Providers';
import Shell from './shell';
import AppContainer from './AppContainer';

const App: FC = () =>
    <AppContainer>
        <Providers>
            <Shell/>
            <CssBaseline/>
        </Providers>
    </AppContainer>

export default App;