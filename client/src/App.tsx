import React, { FC } from 'react';

import Providers from './Providers';
import Shell from './shell';

const App: FC = () =>
    <Providers>
        <Shell/>
    </Providers>

export default App;