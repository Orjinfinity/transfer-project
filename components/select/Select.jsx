import React, { useState } from "react";
import styled from "styled-components";

// Stilleri tanımlıyoruz
const SelectContainer = styled.div`
  position: relative;
  width: 200px;
`;

const SelectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  cursor: pointer;
`;

const SelectList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const SelectListItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

// Select bileşeni
const CustomSelect = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value) => {
    setSelectedValue(value);
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <SelectContainer>
      <SelectHeader onClick={toggleSelect}>
        {selectedValue || "Select an option"}
      </SelectHeader>
      {isOpen && (
        <SelectList>
          {options.map((option) => (
            <SelectListItem
              key={option.value}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </SelectListItem>
          ))}
        </SelectList>
      )}
    </SelectContainer>
  );
};

export default CustomSelect;
