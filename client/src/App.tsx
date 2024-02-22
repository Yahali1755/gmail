import React, { FC } from 'react';

import Providers from './app/contexts';
import Shell from './app/shell';

const App: FC = () =>
    <Providers>
        <Shell/>
    </Providers>

export default App;