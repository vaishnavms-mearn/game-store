import React, { createContext, useState } from 'react'
export const addGameResponseContext = createContext()
export const editGameResponseContext = createContext()


function ContextShare({ children }) {
    const [addGameRes, setAddGameRes] = useState("")
    const [editGameRes, setEditGameRes] = useState("")

    return (
        <>
            <addGameResponseContext.Provider value={{ addGameRes, setAddGameRes }}>
                <editGameResponseContext.Provider value={{ editGameRes, setEditGameRes }}>
                    {children}
                </editGameResponseContext.Provider>
            </addGameResponseContext.Provider>
        </>
    )
}

export default ContextShare