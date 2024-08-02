import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const WizardContext = createContext();

export const WizardProvider = ({
  children,
  initialData,
  vehicles,
  additionalServices,
  locale,
  contact,
}) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState({});
  const [selectedVehicle, setSelectedVehicle] = useState({});

  const gotoNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const gotoPrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const changeStep = (stepNumber) => {
    setStep(stepNumber);
  };

  const total = useMemo(() => {
    const vehiclePrice = selectedVehicle?.price || 0;
    const routePrice = initialData?.route?.price || 0;
    const servicePrice = Object.values(selectedService).reduce(
      (acc, service) =>
        acc +
        ((service?.outbound || 0) + service?.return || 0) * (service?.price || 0),
      0
    );

    return vehiclePrice + routePrice + servicePrice;
  }, [initialData.route, selectedService, selectedVehicle]);

  const selectService = (service, type, tripType) => {
    setSelectedService((currentService) => {
      const updatedService = { ...currentService };
      if (!updatedService[service._id]) {
        updatedService[service._id] = { outbound: 0, return: 0, ...service };
      }

      updatedService[service._id][tripType] += type === "increment" ? 1 : -1;
      updatedService[service._id][tripType] = Math.max(
        updatedService[service._id][tripType],
        0
      );

      return updatedService;
    });
  };

  const selectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <WizardContext.Provider
      value={{
        contact,
        locale,
        gotoNextStep,
        gotoPrevStep,
        changeStep,
        step,
        total,
        initialData,
        vehicles,
        additionalServices,
        selectService,
        selectVehicle,
        selectedService,
        selectedVehicle,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export const useWizardContext = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("useWizardContext must be used within a WizardProvider");
  }
  return context;
};
