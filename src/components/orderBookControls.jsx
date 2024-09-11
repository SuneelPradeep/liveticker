import React, { useEffect, useState, useMemo } from "react";
import { connectToBitfinex } from "../utils/websocket";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineZoomOut, MdOutlineZoomIn } from "react-icons/md";
import { FaMinus, FaPlus, FaRegBell } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderBook } from "../slice/orderSlice";
import TableData from "./TableData";

const OrderBookControls = React.memo(() => {
  const Tabledata = useSelector((state) => state.orderBook.rows ) || [];
  const [data, setData] = useState({
    rows: Tabledata,
  });
  const dispatch = useDispatch();
 
  // Connect to Bitfinex WebSocket and set data
  
  useEffect(() => {
    connectToBitfinex(setData)
  }, []);
  
  useEffect(()=>{
      dispatch(updateOrderBook(data?.rows))
  },[data])

  // Memoize table data processing
  const firstTableData = useMemo(() => {
    return data?.rows?.slice(0, 30) || [];
  }, [data]);

  const secondTableData = useMemo(() => {
    return data?.rows?.slice(30, 60) || [];
  }, [data]);


 

  return (
    <div className="bg-indigo-900 p-1 text-white w-full h-full my-6 mx-6">
      <div className="flex flex-col ">
        {/* Header Section */}
        <div className="flex flex-row p-2 shadow-lg justify-between items-center w-full mb-4">
          <span className="flex flex-row items-center gap-2 text-sm md:text-base">
            <IoIosArrowDown />
            ORDER BOOK
            <p className="text-gray-300">BTC/USD</p>
          </span>

          <span className="flex flex-row items-center gap-3 text-sm md:text-base">
            <FaMinus />
            <FaPlus />
            <FaRegBell />
            <IoSettingsOutline />
            <MdOutlineZoomOut />
            <MdOutlineZoomIn />
          </span>
        </div>

        {/* Table Section */}
        <TableData firstTableData={firstTableData} secondTableData={secondTableData} />
      </div>
    </div>
  );
});

export default OrderBookControls;
