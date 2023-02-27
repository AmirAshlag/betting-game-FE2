import { useState } from "react";
import {
  format,
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks,
} from "date-fns";
import classes from "./WeeklyCalendar.module.css";

const WeeklyCalendar = ({ onClickDay }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState(new Date());

  const changeMonthHandle = (btnType) => {
    if (btnType === "prev") {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
    if (btnType === "next") {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  const changeWeekHandle = (btnType) => {
    //console.log("current week", currentWeek);
    if (btnType === "prev") {
      //console.log(subWeeks(currentMonth, 1));
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (btnType === "next") {
      //console.log(addWeeks(currentMonth, 1));
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
    }
  };

  const onDateClickHandle = (day, dayStr) => {
    setSelectedDate(day);
    onClickDay(day);
  };

  const renderHeader = () => {
    const dateFormat = "MMM yyyy";
    // console.log("selected day", selectedDate);
    return (
      <div
        className={`${classes.header} ${classes.row} ${classes["flex-middle"]}`}
      >
        <div className={`${classes.col} ${classes["col-start"]}`}></div>
        <div className={`${classes.col} ${classes["col-center"]}`}>
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div className={`${classes.col} ${classes["col-end"]}`}></div>
      </div>
    );
  };
  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className={`${classes.col} ${classes["col-center"]}`} key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className={`${classes.days} ${classes.row}`}>{days}</div>;
  };
  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`${classes.col} ${classes.cell} ${
              isSameDay(day, new Date())
                ? "today"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => {
              const dayStr = format(cloneDay, "ccc dd MMM yy");
              onDateClickHandle(cloneDay, dayStr);
            }}
          >
            <span className={`${classes.number}`}>{formattedDate}</span>
            <span className={`${classes.bg}`}>{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div className={`${classes.row}`} key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className={`${classes.body}`}>{rows}</div>;
  };
  const renderFooter = () => {
    return (
      <div
        className={`${classes.header} ${classes.row} ${classes["flex-middle"]}`}
      >
        <div className={`${classes.col} ${classes["col-start"]}`}>
          <div
            className={`${classes.icon}`}
            onClick={() => changeWeekHandle("prev")}
          >
            prev week
          </div>
        </div>
        <div>{currentWeek}</div>
        <div
          className={`${classes.col} ${classes["col-end"]}`}
          onClick={() => changeWeekHandle("next")}
        >
          <div className={`${classes.icon}`}>next week</div>
        </div>
      </div>
    );
  };
  return (
    <div className={`${classes.calendar}`}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {renderFooter()}
    </div>
  );
};

export default WeeklyCalendar;
/**
 * Header:
 * icon for switching to the previous month,
 * formatted date showing current month and year,
 * another icon for switching to next month
 * icons should also handle onClick events to change a month
 */
