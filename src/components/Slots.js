import React, { useState } from "react";
import Datepicker from "./Datepicker";

export default function Slots({ data }) {
  const sessions = [];
  const date = new Date();
  const currentDate = `${("0" + date.getDate()).slice(-2)}-${(
    "0" +
    (date.getMonth() + 1)
  ).slice(-2)}-${date.getFullYear()}`;
  const [selectedDate, setSelectedDate] = useState(currentDate);

  data.map((d) => sessions.push(d.sessions));

  const selectedDay = (val) => {
    console.log(val);
    const currentDate = `${("0" + val.getDate()).slice(-2)}-${(
      "0" +
      (val.getMonth() + 1)
    ).slice(-2)}-${val.getFullYear()}`;
    setSelectedDate(currentDate);
  };

  const freeStyle =
    "bg-green-50 text-green-600 rounded px-2 font-semibold inline-block mt-2 mr-2";
  const paidStyle =
    "bg-red-50 text-red-600 rounded px-2 font-semibold inline-block mt-2 mr-2";

  const countGreenStyle =
    "text-2xl bg-green-50 p-2 font-semibold text-green-700 rounded";
  const countRedStyle =
    "text-2xl bg-red-50 p-2 font-semibold text-red-700 rounded";

  return data.length !== 0 ? (
    <div>
      <div className="sticky top-0 bg-white py-4 border-b shadow px-4 rounded-lg border">
        <div className="text-2xl font-semibold">{data[0].district_name}</div>
        <Datepicker getSelectedDay={selectedDay} />
      </div>
      <div>
        {data.map((d, i) =>
          d.sessions.map((s) =>
            s.date === selectedDate ? (
              s.available_capacity ? (
                <div
                  key={i}
                  className="p-2 shadow-sm border rounded my-2 flex justify-between items-center"
                >
                  <div className="flex-shrink-0 w-4/5">
                    <div className="font-semibold">{d.name}</div>
                    <div className="text-sm flex items-center mt-2">
                      <div className="bg-purple-100 text-purple-600 mr-1 px-1 rounded">
                        <i className="far fa-compass"></i>
                      </div>
                      <div>
                        {d.block_name}, {d.pincode}
                      </div>
                    </div>
                    <div
                      className={d.fee_type === "Paid" ? paidStyle : freeStyle}
                    >
                      {d.fee_type}
                    </div>
                    <div className="bg-gray-100 rounded px-2 inline-block mr-2">
                      {s.min_age_limit}+
                    </div>
                    <div className="bg-blue-100 rounded px-2 inline-block lowercase text-blue-600">
                      {s.vaccine}
                    </div>
                  </div>
                  <div
                    className={
                      (s.available_capacity || 0) > 20
                        ? countGreenStyle
                        : countRedStyle
                    }
                  >
                    {Math.floor(s.available_capacity) || 0}
                  </div>
                </div>
              ) : (
                ""
              )
            ) : (
              ""
            )
          )
        )}
      </div>
    </div>
  ) : (
    <div>
      <img
        src="https://cdn.dribbble.com/users/2399102/screenshots/10758756/media/90c33f1064b62c5c32079723fc5cd73c.jpg"
        alt="vaccine"
      />
    </div>
  );
}
