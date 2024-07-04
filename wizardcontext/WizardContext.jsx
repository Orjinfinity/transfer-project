import React, { createContext, useContext, useState } from 'react';

const WizardContext = createContext();

export const WizardProvider = ({ children }) => {
    const [step,setStep] = useState(1);
    const [product1, setProduct1] = useState({ quantity: 1, price: 150 });
    const [product2, setProduct2] = useState({ quantity: 0, price: 150 });
  
    const incrementProduct1 = () => setProduct1({ ...product1, quantity: product1.quantity + 1 });
    const decrementProduct1 = () => {
      if (product1.quantity > 1) {
        setProduct1({ ...product1, quantity: product1.quantity - 1 });
      }
    };
  
    const incrementProduct2 = () => setProduct2({ ...product2, quantity: product2.quantity + 1 });
    const decrementProduct2 = () => {
      if (product2.quantity > 1) {
        setProduct2({ ...product2, quantity: product2.quantity - 1 });
      }
    };
  
    const total = (product1.quantity * product1.price) + (product2.quantity * product2.price);

  
  const gotoNextStep = () => {
        setStep((prevStep) => prevStep + 1)
  }

  const gotoPrevStep = () => {
    setStep((prevStep) => prevStep - 1)
}
 

  return (
    <WizardContext.Provider value={{gotoNextStep,gotoPrevStep,step,setProduct1,product1,setProduct2,product2,incrementProduct1,decrementProduct1,incrementProduct2,decrementProduct2,total }}>
      {children}
    </WizardContext.Provider>
  );
};

export const useWizardContext = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizardContext must be used within a WizardProvider');
  }
  return context;
};