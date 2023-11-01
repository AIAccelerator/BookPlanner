import React from "react";

// create a context called WizardContext

export const WizardContext = React.createContext({})

// create a provider called WizardProvider

export const WizardProvider = ({ children }) => {
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState({});

  const nextStep = () => setStep(step + 1);
  const previousStep = () => setStep(step - 1);
  const updateData = (key, value) => setData({ ...data, [key]: value });

  const value = {
    step,
    nextStep,
    previousStep,
    data,
    updateData,
  };

  return (
    <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
  );
};

export const useWizard = () => React.useContext(WizardContext);
