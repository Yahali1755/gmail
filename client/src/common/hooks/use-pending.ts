import { useState } from "react";

export const usePending = () => {
    const [isPending, setIsPending] = useState(true);

    const pend = <T>(promise: Promise<T>) => 
        promise.then(() => {
            setIsPending(false)
        }) 

    return { 
        pend, 
        isPending
    }
}