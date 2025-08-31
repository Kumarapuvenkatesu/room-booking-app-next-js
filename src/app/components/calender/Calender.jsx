import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useDatesContext } from '@/app/(auth-routes)/context/context';



function Calender(){
  const [date,setDate]=useState([{
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }])
  const [showCalender,setShowCalender]=useState(false);
      
   const { updateDates } = useDatesContext();
 

const handleSelectDates=async()=>{
  const startDate=date[0].startDate.toLocaleDateString();
  const endDate=date[0].endDate.toLocaleDateString();
  console.log("Selected dates:",startDate,endDate);
  updateDates(startDate, endDate);

}
  return(

<div>
  <button 
    onClick={()=>setShowCalender(true)} 
    
  >
    Show Calendar
  </button>

  {showCalender && (
    <div >
      <div >
        <button  onClick={()=>{handleSelectDates(),setShowCalender(false)}}>×</button>
            <DateRange
   editableDateInputs={true}
   onChange={item => setDate([item.selection])}
   moveRangeOnFirstSelection={false}
   ranges={date}
 />
      </div>
    </div>
  )}
</div>

  )
}
export default Calender;