export default function CheckInList({ list }) {
  // Rendering items in a function.
  function renderCheckinItems() {
    // Sorting the list by date.
    const sortedList = list.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateA < dateB) return -1;
      if (dateB > dateA) return 1;
      return 0;
    });

    // returning the list. and names
    return sortedList.map((entry, index) => (
      <tr key={index}>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
          {entry.date}
        </td>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
          {entry.names.map((name, index) => {
            return <p key={index}>{name}</p>;
          })}
        </td>
      </tr>
    ));
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Names
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">{renderCheckinItems()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
