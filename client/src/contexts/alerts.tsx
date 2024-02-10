import { AlertColor, Alert as MuiAlert, Snackbar } from '@mui/material';
import { useState, createContext, ReactNode, FC, useContext} from 'react'

import { useOpen } from '../common/hooks/use-open';

export interface Alert {
    message: string,
    severity: AlertColor
}

interface AlertContextProps {
    success: (message?: string) => void
    error: (message: string) => void
}

const AlertsContext = createContext<AlertContextProps>({} as AlertContextProps);

export const useAlerts = () => useContext(AlertsContext);

const defaultHideDuration = 5000;

export const AlertsProvider: FC<{children: ReactNode}> = ({ children }) => {
    const [alert, setAlert] = useState<Alert>({severity: "success", message: "Action successfully completed!"});
    const { isOpen, open, close }= useOpen()

    const success = (message = "Action successfully completed!") => {
        setAlert({severity: "success", message})
        open()
    }

    const error = (message: string) => {
        setAlert({severity: "error", message})
        open()
    }

    return (
        <AlertsContext.Provider value={{success, error}}>
            <Snackbar open={isOpen} autoHideDuration={defaultHideDuration} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClose={close}>
                <MuiAlert
                onClose={close}
                severity={alert.severity}
                variant="filled"
                >
                 { alert.message}
                </MuiAlert>
            </Snackbar>
            { children }
        </AlertsContext.Provider>
    );
};