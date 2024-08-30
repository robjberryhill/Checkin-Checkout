import { useState } from "react";
import CheckInList from "./CheckInList";

export default function CheckInForm() {
  const [name, setName] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  // Controled inputs
  const [checkInList, setCheckInList] = useState([]);
  // List of checkings

  function onFormSubmit() {
    if (!name || !checkInDate || !checkOutDate) {
      alert("Please fill in all fields");
      return;
    }
    // Alert if there is missing data

    const inDate = new Date(checkInDate).getDate();
    const outDate = new Date(checkOutDate).getDate();
    const days = Math.abs(outDate - inDate) + 1;
    // get the days and add one for the day of.

    // Iterate over the days.
    const dateEntries = new Array(days).fill(null).map((none, index) => {
      let date = new Date(checkInDate);

      // set the next date in the iteration
      date.setDate(date.getDate() + index);

      // format the date
      const finalDate = date.toISOString().split("T")[0];

      // create object
      return { date: finalDate, names: [name] };
    });

    if (!(checkInList.length > 0)) {
      // set initial list if nothing is there.
      setCheckInList([...checkInList, ...dateEntries]);
    } else {
      // if there are already entries
      // Find new entries
      const newEntries = dateEntries.filter(nEntry => {
        return !checkInList.find(cEntry => nEntry.date === cEntry.date);
      });
      // Find all entries that match dates on the new input.
      // As well as left over entries that are not matched.
      const matchedEntries = checkInList.map(entry => {
        const match = dateEntries.find(dEntry => {
          return entry.date === dEntry.date;
        });

        if (match) {
          const newArray = [...entry.names, ...match.names];
          entry.names = newArray;

          return entry;
        }

        return entry;
      });

      // Combine entries.
      const combinedEntries = [...newEntries, ...matchedEntries];

      // Set final list.
      setCheckInList(combinedEntries);
    }

    // Clear entries
    setName("");
    setCheckInDate("");
    setCheckOutDate("");
  }

  // controling inputs directly on each input instead of through a function.
  return (
    <div>
      <div className="flex align-center px-4 sm:px-6 lg:px-8">
        <input
          type="text"
          placeholder="Enter your name"
          className="me-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="date"
          placeholder="Check in date"
          className=" me-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={checkInDate}
          onChange={e => setCheckInDate(e.target.value)}
        />
        <input
          type="date"
          placeholder="Check out date"
          className="me-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={checkOutDate}
          onChange={e => setCheckOutDate(e.target.value)}
        />
        <button
          onClick={onFormSubmit}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </div>
      <CheckInList list={checkInList} />
    </div>
  );
}
