import { useState, useEffect, useRef } from "react";
import { usePopper } from "react-popper";

import { View } from "@/components";

import PlusVector from "../../assets/icons/plusVector.svg";
import MinusVector from "../../assets/icons/minusVector.svg";
import { Button } from "components";

const Counter = ({ value, onChange }) => {
  const decrement = () => {
    onChange(value - 1);
  };

  const increment = () => {
    onChange(value + 1);
  };

  return (
    <View display="flex" alignItems="center">
      <Button as="button" disabled={value <= 0} variant="link">
        <MinusVector onClick={decrement}>-</MinusVector>
      </Button>
      <View mx="10px">{value}</View>
      <Button as="button" variant="link">
        <PlusVector onClick={increment}>+</PlusVector>
      </Button>
    </View>
  );
};

const PersonSelect = ({ children, onChange, value }) => {
  console.log("value", value);
  const [open, setOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement);
  const wrapperRef = useRef(null);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleCounterChangeValue = (key, newValue) => {
    console.log("key", key, "newValue", newValue);
    onChange({
      ...value,
      [key]: newValue,
    });
  };

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <View position="relative" ref={wrapperRef}>
      <div role="button" ref={setReferenceElement} onClick={handleToggle}>
        {children}
      </div>
      {open ? (
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <View
            display="flex"
            width="220px"
            flexDirection="column"
            alignItems="center"
            backgroundColor="#fff"
          >
            {Object.entries(value).map(([key, value]) => (
              <View
                key={key}
                display="flex"
                alignItems="center"
                width="100%"
                justifyContent="space-between"
                borderBottom="1px solid #ccc"
                px="16px"
                py="12px"
              >
                <View display="flex" flexDirection="column" alignItems="start">
                  <span display="inline-block">Adult</span>
                  <span display="inline-block" fontSize="8px">
                    +13 Age
                  </span>
                </View>
                <Counter
                  value={value}
                  onChange={(newValue) =>
                    handleCounterChangeValue(key, newValue)
                  }
                />
              </View>
            ))}
          </View>
        </div>
      ) : null}
    </View>
  );
};

export default PersonSelect;
