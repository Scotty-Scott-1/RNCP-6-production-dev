import React from "react";
import styles from "./DateInput.module.css";

const DateInput = ({ value, onChange, label }) => {
  // Extract parts from current date value
  const date = value ? new Date(value) : new Date();

  const handlePartChange = (part, newValue) => {
    const updated = new Date(date);

    if (part === "day") updated.setDate(newValue);
    if (part === "month") updated.setMonth(newValue - 1); // months 0–11
    if (part === "year") updated.setFullYear(newValue);
    if (part === "hour") updated.setHours(newValue);
    if (part === "minute") updated.setMinutes(newValue);

    onChange(updated);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div className={styles.row}>
        <input
          type="number"
          className={styles.input}
          value={date.getDate()}
          min="1"
          max="31"
          onChange={(e) => handlePartChange("day", e.target.value)}
        />
        /
        <input
          type="number"
          className={styles.input}
          value={date.getMonth() + 1}
          min="1"
          max="12"
          onChange={(e) => handlePartChange("month", e.target.value)}
        />
        /
        <input
          type="number"
          className={styles.input}
          value={date.getFullYear()}
          min="1900"
          max="2100"
          onChange={(e) => handlePartChange("year", e.target.value)}
        />
        &nbsp;&nbsp;
        <input
          type="number"
          className={styles.input}
          value={date.getHours()}
          min="0"
          max="23"
          onChange={(e) => handlePartChange("hour", e.target.value)}
        />
        :
        <input
          type="number"
          className={styles.input}
          value={date.getMinutes()}
          min="0"
          max="59"
          onChange={(e) => handlePartChange("minute", e.target.value)}
        />
      </div>
    </div>
  );
};

export default DateInput;
