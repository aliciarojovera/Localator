import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default () => {
    
    const [startDate, setStartDate] = useState(new Date());

    let handleColor = time => {
        return time.getHours() >= 0 ? "text-success" : "text-error";
    };

    return (
        <DatePicker
            showTimeSelect
            selected={startDate}
            onChange={date => setStartDate(date)}
            timeClassName={handleColor}
            timeFormat="HH:mm"
            timeIntervals={60}
            dateFormat="MMMM d, yyyy HH:mm "

        />
    );
};
