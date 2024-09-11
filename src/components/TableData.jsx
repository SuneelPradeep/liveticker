import React from 'react'

const TableData = ({firstTableData,secondTableData}) => {

const getRowStyle = (row, index,first) => {
  const previousRow = index > 0 ? firstTableData[index - 1] : null;
  const isGreen = previousRow && row.price > previousRow.price;

  // Dynamically calculate the width based on the price but limit it to 60%
  const widthPercentage = Math.min(60, (row.price % 100) / 1.5);
  return {
    backgroundColor: isGreen ? "rgba(0, 255, 0, 0.6)" : "rgba(255, 0, 0, 0.6)", // Adjust the color and opacity
    width: `${widthPercentage}%`, // Dynamic width based on price, max 60%
    padding: '0.2rem',
    position: 'absolute',
    left: first ? 'auto' : 0,  
    right: first ? 0 : 'auto',
    top: 0,
    bottom: 0,
    transition: "width 0.3s ease-in-out, background-color 0.3s ease-in-out", // Smooth transition
  };
};

  return (
    <div>
      
    <div className="flex flex-col md:flex-row gap-4 items-center bg-table-section">

<div className="flex-1  overflow-x-auto">
<table className="min-w-full border-collapse">
  <thead>
    <tr className="text-gray-400 relative">
    <th className="py-2 px-4 text-left text-xs md:text-sm"></th>
      <th className="py-2 px-4 text-left text-xs md:text-sm">COUNT</th>
      <th className="py-2 px-4 text-left text-xs md:text-sm">AMOUNT</th>
      <th className="py-2 px-4 text-left text-xs md:text-sm">TOTAL</th>
      <th className="py-2 px-4 text-left text-xs md:text-sm">PRICE</th>
    </tr>
  </thead>
  <tbody >
    {firstTableData.map((row, index) => (
       <tr key={index} className="font-bold text-white relative">
       {/* Dynamic bar in the background */}
       <td
         className="py-2 px-4 text-xs md:text-sm "
         style={getRowStyle(row, index,true)}
       ></td>
     
        <td className="py-2 px-4 text-xs md:text-sm relative z-10">{row.count}</td>
        <td className="py-2 px-4 text-xs md:text-sm relative z-10">{row.amount.toFixed(4)}</td>
        <td className="py-2 px-4 text-xs md:text-sm relative z-10">{row.totalPrice.toFixed(2)}</td>
        <td className="py-2 px-4 text-xs md:text-sm relative z-10">{row.price.toFixed(2)}</td>
      </tr>
    ))}
  </tbody>
</table>
</div>


          {/* 2nd table */}
          <div className="flex-1 overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="text-gray-400">
                <th className="py-2 px-4 text-left text-xs md:text-sm"></th>
                  <th className="py-2 px-4 text-left text-xs md:text-sm">PRICE</th>
                  <th className="py-2 px-4 text-left text-xs md:text-sm">TOTAL</th>
                  <th className="py-2 px-4 text-left text-xs md:text-sm">AMOUNT</th>
                  <th className="py-2 px-4 text-left text-xs md:text-sm">COUNT</th>
                </tr>
              </thead>
              <tbody>
                {secondTableData.map((row, index) => (
                  <tr key={index} className="font-bold text-white relative">
                     <td
         className="py-2 px-4 text-xs md:text-sm relative"
         style={getRowStyle(row, index,false)}
       ></td>
                    <td className="py-2 px-4 text-xs md:text-sm">{row.totalPrice.toFixed(2)}</td>
                    <td className="py-2 px-4 text-xs md:text-sm">{row.amount.toFixed(4)}</td>
                    <td className="py-2 px-4 text-xs md:text-sm">{row.price.toFixed(2)}</td>
                    <td className="py-2 px-4 text-xs md:text-sm">{row.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>
  )
}

export default TableData