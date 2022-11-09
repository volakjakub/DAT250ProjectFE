import React, { createContext, ReactNode, useState } from 'react';

export interface Poll {
    id: number;
    question: string;
    date_from: string;
    date_to: string;
    status: boolean;
    code: string;
}

export const PollContext = createContext({
    setPoll: () => null,
    poll: null,
});

export const PollProvider = ({ children }: { children: ReactNode }) => {
    const [poll, setPoll] = useState(null);
    const value: any = {poll, setPoll};

    return <PollContext.Provider value={value}>{children}</PollContext.Provider>
};