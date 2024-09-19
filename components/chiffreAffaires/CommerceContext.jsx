import React, { createContext, useContext, useState } from 'react';

const CommerceContext = createContext();

export function useCommerceContext() {
  return useContext(CommerceContext);
}

export function CommerceProvider({ children }) {
    const [commerces, setCommerces] = useState([
        { num: 1, address: '', isAddressSet: false, averageBasket: '', totalExpenses: '', globalTurnover: '', selectedFile: null, radius: '' }
    ]);

    const handleSaveCommerce = (index, field, value) => {
        const updatedCommerces = [...commerces];
        updatedCommerces[index][field] = value;
        setCommerces(updatedCommerces);
    };

    return (
        <CommerceContext.Provider value={{ commerces, setCommerces, handleSaveCommerce }}>
        {children}
        </CommerceContext.Provider>
    );
}
