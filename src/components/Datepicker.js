import React, { useState } from "react";

export default function Datepicker({ getSelectedDay }) {
  const date = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date());
  let newDate = date;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const weeklyDates = [];

  for (let i = 0; i < 7; i++) {
    weeklyDates.push(new Date(newDate.getTime()));
    newDate.setDate(newDate.getDate() + 1);
  }

  const activeStyle =
    "flex flex-col text-center bg-blue-500 font-semibold flex-shrink-0 w-10 rounded font-semibold text-gray-100";

  const hoverStyle =
    "flex flex-col flex-shrink-0 w-10 text-center bg-gray-100 border rounded hover:border-blue-500 hover:text-blue-600 transition duration-300 cursor-pointer";

  function selectDateHandler(d) {
    setSelectedDate(new Date(d));
    getSelectedDay(new Date(d));
  }

  return (
    <div>
      <div className="font-bold text-blue-500 my-2">
        {months[date.getMonth()]} {date.getFullYear()}
      </div>
      <div className="flex justify-between ">
        {weeklyDates.map((d, i) => (
          <div
            key={i}
            className={
              selectedDate.getDate() === d.getDate() ? activeStyle : hoverStyle
            }
            onClick={() => selectDateHandler(d)}
          >
            <div>{days[d.getDay()]}</div>
            <div className="text-xl">{d.getDate()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
