import React, { createContext, useContext, useState } from 'react';

// Creer un contexte to share the state of commerce across ocmponents
const CommerceContext = createContext();

// Helper function to access commerceContext
export function useCommerceContext() {
  return useContext(CommerceContext);
}

// Provides the context container for it's children
export function CommerceProvider({ children }) {
    const [commerces, setCommerces] = useState([
        { num: 1, address: '', isAddressSet: false, averageBasket: '', totalExpenses: '', globalTurnover: '', selectedFile: null, radius: '' }
    ]);

    // Updates specific FIELDS of a commerce (INDEX) inside the "commerces" array with VALUE
    const handleSaveCommerce = (index, field, value) => {
        // Create a shallow copy of the "commerces" array to not f up and mutate the state (React state should be treated as immutable)
        const updatedCommerces = [...commerces];

        // Updates the specific FIELD of the commerce at the INDEX
        updatedCommerces[index][field] = value;

        setCommerces(updatedCommerces);
    };

    // Aka contained children will have access to commerces state and handleSaveCommerce
    return (
        <CommerceContext.Provider value={{ commerces, setCommerces, handleSaveCommerce }}>
            {children}
        </CommerceContext.Provider>
    );
}
