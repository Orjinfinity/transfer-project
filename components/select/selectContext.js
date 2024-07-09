import { createContext, useContext, useState, useMemo, useEffect } from "react";

const SelectContext = createContext(null);

export const useSelectContext = () => {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error(
      "Select components are compound component. Must be used inside Select."
    );
  }

  return context;
};

export const SelectContextProviderComponent = ({
  children,
  value: selectedItem = {},
  onChange,
  allSelected,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const multiple = Array.isArray(selectedItem);

  const isEmpty = useMemo(
    () => (multiple ? selectedItem.length === 0 : !selectedItem.value),
    [multiple, selectedItem.length, selectedItem.value]
  );

  useEffect(() => {
    if (
      allSelected?.value &&
      allSelected?.label &&
      allSelected?.defaultSelected &&
      isEmpty
    ) {
      const defaultSelected = {
        label: allSelected.label,
        value: allSelected.value,
      };

      onChange(multiple ? [defaultSelected] : defaultSelected);
    }
  }, [allSelected, isEmpty, multiple, onChange]);

  const toggleSelect = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const openSelect = () => {
    setIsOpen(true);
  };

  const closeSelect = () => {
    setIsOpen(false);
  };

  const getIsSelectedOption = (optionValue) =>
    multiple
      ? selectedItem.some((option) => option.value === optionValue)
      : selectedItem.value === optionValue;

  const setValue = (selectedOption) => {
    if (selectedOption.value === allSelected?.value) {
      onChange(multiple ? [] : {});
    } else {
      const isExistValue = getIsSelectedOption(selectedOption.value);

      if (!multiple) {
        isExistValue ? onChange({}) : onChange(selectedOption);
      } else {
        const filteredSelectedItems = selectedItem.filter(
          (item) => item.value !== allSelected?.value
        );
        isExistValue
          ? onChange(
              filteredSelectedItems.filter(
                (item) => item.value !== selectedOption.value
              )
            )
          : onChange([...filteredSelectedItems, selectedOption]);
      }
    }
  };

  const removeValue = (optionValue) => {
    if (allSelected?.value === optionValue) {
      openSelect();
    } else {
      onChange(selectedItem.filter((item) => item.value !== optionValue));
    }
  };

  const clearSelect = () => {
    onChange(multiple ? [] : {});
  };

  const providerValue = {
    selectedOptions: selectedItem,
    setValue,
    isOpen,
    isEmpty,
    toggleSelect,
    openSelect,
    closeSelect,
    getIsSelectedOption,
    removeValue,
    clearSelect,
    allSelected,
    multiple,
    placeholder,
  };

  return (
    <SelectContext.Provider value={providerValue}>
      {children}
    </SelectContext.Provider>
  );
};

export default SelectContext;
