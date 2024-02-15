import React, { FC } from 'react';
import { CssBaseline } from '@mui/material';

import Providers from './Providers';
import Shell from './shell';

const App: FC = () =>
    <Providers>
        <Shell/>
        <CssBaseline/>
    </Providers>

export default App;