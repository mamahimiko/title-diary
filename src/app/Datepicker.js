import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Datepicker({ onDateChange }) {
  const [startDate, setStartDate] = useState(new Date());

  const handleDateChange = (date) => {
    setStartDate(date);
    onDateChange(date);
  };

  return (
    <div className="">
      <h2 className="text-lg mb-2">Select a Date</h2>
      <div className="mb-4">
        <DatePicker
          selected={startDate}
          id="date"
          name="date"
          dateFormat="dd/MM/yyyy"
          onChange={handleDateChange}
          className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
        />
      </div>
    </div>
  );
}
