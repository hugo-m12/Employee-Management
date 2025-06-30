import React, { useState } from "react";
import { PropTypes } from "prop-types";
import DatePicker from "react-multi-date-picker";

export default function CalendarComponent({ employee, onVacationDaysChange }) {
  const [, setSelectedDates] = useState(employee.vacationDays);

  const handleDateSelect = (date) => {
    const datesArray = Array.isArray(date) ? date : [date];
    setSelectedDates(datesArray);

    const formattedDates = datesArray.map((date) => date.format("YYYY-MM-DD"));
    onVacationDaysChange(formattedDates);
  };

  CalendarComponent.propTypes = {
    employee: PropTypes.shape({
      vacationDays: PropTypes.arrayOf(PropTypes.string),
    }),
    onVacationDaysChange: PropTypes.func.isRequired,
  };
  return (
  <DatePicker
    value={employee.vacationDays}
    onChange={handleDateSelect}
    multiple
    format="YYYY-MM-DD"
  />
  );
}