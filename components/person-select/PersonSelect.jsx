import { useState, useEffect, useRef } from "react";
import { usePopper } from "react-popper";

import { View, Button } from "@/components";

import PlusVector from "../../assets/icons/plusVector.svg";
import MinusVector from "../../assets/icons/minusVector.svg";
import { useTranslations } from "next-intl";

const Counter = ({ value, onChange }) => {
  const decrement = () => {
    onChange(value - 1);
  };

  const increment = () => {
    onChange(value + 1);
  };

  return (
    <View display="flex" alignItems="center">
      <Button type="button" as="button" disabled={value <= 0} variant="link">
        <MinusVector onClick={decrement}>-</MinusVector>
      </Button>
      <View mx="10px">{value}</View>
      <Button type="button" as="button" variant="link">
        <PlusVector onClick={increment}>+</PlusVector>
      </Button>
    </View>
  );
};

const PersonSelect = ({ children, onChange, value }) => {
  const [open, setOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement);
  const wrapperRef = useRef(null);

  const t = useTranslations();

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleCounterChangeValue = (key, newValue) => {
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

  const getMaxAge = (key) => {
    if (key === "adult") {
      return "18+";
    } else if (key === "child") {
      return "2-12";
    } else if (key === "baby") {
      return "0-2";
    }
  }

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
            marginTop="5px"
            border="1px solid #EFEFEF"
          >
            {Object.entries(value).map(([key, value]) => (
              <View
                key={key}
                display="flex"
                alignItems="center"
                width="100%"
                justifyContent="space-between"
                px="16px"
                py="12px"
              >
                <View display="flex" flexDirection="column" alignItems="start">
                  <span display="inline-block">{t(key)}</span>
                  <span display="inline-block" fontSize="8px">
                    {getMaxAge(key)}
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
