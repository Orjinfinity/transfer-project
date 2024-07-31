import { useRouter } from "next/router";
import Cookies from "js-cookie";
import styled from "styled-components";
import { View, Select } from "@/components";
import Icon from "../icon/Icon";

const StyledIcon = styled(Icon)`
  flex-shrink: 0;
`;

const CURRENCIES = [
    { value: "EUR", label: "€ EUR" },
    { value: "USD", label: "$ USD" }
]

const CurrencySelector = () => {
  const router = useRouter();

  const savedCurrency = Cookies.get("currency") || "USD";
  const currencyExists = CURRENCIES.find((c) => c.value === savedCurrency);

  const handleChange = (selectedCurrency) => {
    Cookies.set("currency", selectedCurrency.value, { expires: 7 });
    router.reload();
  };

  return (
    <Select
      center
      value={currencyExists}
      onChange={handleChange}
      buttonProps={{
        p: "0",
        color: "red",
        fontSize: "14px",
      }}
      placeholder="Seçiniz"
      renderSelectToggle={({
        toggleSelect,
        selectedOptions,
        isOpen,
      }) => {
        return (
          <View
            background="rgba(255, 255, 255, 0.2)"
            borderRadius="100px"
            p="4px"
            display="flex"
            alignItems="center"
            onClick={toggleSelect}
          >
            <View
              display="flex"
              alignItems="flex-start"
              flexDirection="column"
              marginLeft="10px"
              color="#fff"
            >
              {selectedOptions?.label || <View color="white">€ EUR</View>}
            </View>
            <StyledIcon
              color="white"
              icon={isOpen ? "chevron-up" : "chevron-down"}
            />
          </View>
        );
      }}
    >
      {CURRENCIES.map((currency) => (
        <Select.Option key={currency.value} value={currency.value} label={currency.label} />
      ))}
    </Select>
  );
};

export default CurrencySelector;
