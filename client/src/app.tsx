import { FC } from 'react';
import { CssBaseline } from '@mui/material';

import Providers from './providers';

const App: FC = () =>
    <>
        <Providers>
            <CssBaseline/>
        </Providers>
    </>


export default App;