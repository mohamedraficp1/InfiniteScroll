import React, { useState, useEffect } from 'react';

function DateField({unixTime}) {
  const [date, setDate] = useState(null);

  useEffect(() => {
    let dateValue = new Date(unixTime * 1000);
    setDate(dateValue.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    }));
  }, [unixTime]);

  return (
    <h6>{date}</h6>
  );
}

export default DateField;
