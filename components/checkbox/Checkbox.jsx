import { Text } from "components";

const Checkbox = ({ error, id, label, value, onChange, isChecked }) => {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          id={id}
          type="checkbox"
          style={{
            width: "1rem",
            height: "1.25rem",
            opacity: "1",
            marginRight: "5px",
          }}
          value={value}
          checked={isChecked}
          onChange={onChange}
        />
        <label
          style={{ fontSize: "0.8rem", width: "100%", alignItems: "center" }}
          htmlFor={id}
        >
          {label}
        </label>
      </div>
      <div>
        {" "}
        {error?.message ? (
          <Text fontSize="12px" fontWeight="bold" color="#e0c47d">
            {error?.message}
          </Text>
        ) : null}
      </div>
    </>
  );
};

export default Checkbox;
