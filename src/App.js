import { useState, useEffect } from "react";
import axios from "axios";

import Slots from "./components/Slots";

function App() {
  const [isDistrict, setIsDistrict] = useState(true);
  const [statesData, setStatesData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [districtId, setDistrictId] = useState();
  const [slotsData, setSlotsData] = useState([]);
  const [pincode, setPincode] = useState();

  useEffect(() => {
    async function fetchStatesData() {
      try {
        const response = await axios.get(
          "https://cdn-api.co-vin.in/api/v2/admin/location/states"
        );
        setStatesData(response.data.states);
      } catch (e) {
        console.log(e);
      }
    }
    fetchStatesData();
  }, []);

  async function fetchDistrictData(e) {
    try {
      const response = await axios.get(
        `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${e.target.value}`
      );
      setDistrictData(response.data.districts);
    } catch (e) {
      console.log(e);
    }
  }

  async function fetchSlotsData() {
    const date = new Date();
    const currentDate = `${("0" + date.getDate()).slice(-2)}-${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}-${date.getFullYear()}`;
    const API_DISTRICT = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${districtId}&date=${currentDate}`;
    const API_PINCODE = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${currentDate}`;
    try {
      const response = await axios.get(isDistrict ? API_DISTRICT : API_PINCODE);
      setSlotsData(response.data.centers);
    } catch (e) {
      console.log(e);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetchSlotsData();
  }

  const selectorStyle =
    "w-full text-center border rounded-md py-2 mb-4 cursor-pointer hover:text-blue-600 transition-all duration-200 hover:border-blue-600 hover:font-semibold";
  const selectorActive =
    "w-full text-center border rounded-md py-2 mb-4 cursor-pointer text-blue-600 border-blue-600 font-semibold";

  return (
    <div className="App h-screen flex">
      <div className="m-auto flex h-2/3">
        <div className="p-4 rounded-lg flex-shrink-0 w-96 mx-4">
          <div className="text-4xl font-bold text-gray-700 mb-4">
            <span className="bg-purple-100 px-4 py-3 mr-2 border-purple-200 border text-2xl rounded-lg">
              <i className="fas fa-syringe text-purple-700"></i>
            </span>
            Vaccinator
          </div>
          <div className="w-3/4 mb-4">
            Enter your location • Search for vaccination slots
          </div>

          <div className="flex gap-2">
            <div
              className={isDistrict ? selectorActive : selectorStyle}
              onClick={() => setIsDistrict(!isDistrict)}
            >
              District
            </div>
            <div
              className={!isDistrict ? selectorActive : selectorStyle}
              onClick={() => setIsDistrict(!isDistrict)}
            >
              Pincode
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              {isDistrict ? (
                <div>
                  <div className="mb-4">
                    <select
                      name="cars"
                      id="cars"
                      className="w-full py-2 px-4 border rounded-lg bg-gray-100"
                      onChange={fetchDistrictData}
                    >
                      <option value="" disabled selected>
                        Select State
                      </option>
                      {statesData.map((state) => (
                        <option value={state.state_id} key={state.state_id}>
                          {state.state_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <select
                    name="cars"
                    id="cars"
                    className="w-full py-2 px-4 border rounded-lg bg-gray-100"
                    onChange={(e) => setDistrictId(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Select District
                    </option>
                    {districtData.map((district) => (
                      <option
                        value={district.district_id}
                        key={district.district_id}
                      >
                        {district.district_name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <input
                    type="number"
                    name=""
                    id=""
                    placeholder="Enter pincode"
                    className="w-full py-2 px-4 border rounded-lg bg-gray-100"
                    onChange={(e) => setPincode(e.target.value)}
                  />
                </div>
              )}
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 transition duration-150 w-full rounded-md my-4 py-2 font-semibold text-gray-100"
              >
                Search Slots
              </button>
            </form>
          </div>
        </div>

        <div className="px-4 rounded-lg mx-4 flex-shrink-0 w-96 overflow-y-auto">
          <Slots data={slotsData}></Slots>
        </div>
      </div>
    </div>
  );
}

export default App;
