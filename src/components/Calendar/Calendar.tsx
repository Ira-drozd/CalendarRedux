import React, { useEffect, useState } from "react";
import Day from "./Day/Day";
import Notebook from "./Notebook/Notebook";
import Popup from "./Popup";

import { connect } from "react-redux";
import { DataProps } from "../../store/type";
import {
  switchMonth,
  addNewNote,
  removeSelectNote,
} from "../../store/actionCreators";
import ButtonDates from "./ButtonDates/ButtonDates";

interface CalendarProps {}
interface StoreProps {
  year: number | null;
  month: number | null;
  calendar: Date[] | null;
  selectedDay: { date: Date; selectedKey: string };
}
interface DispatchProps {
  switchMonth: (date: Date) => void;
  addNewNote: (key: string, time: string, message: string) => void;
  removeSelectNote: (key: string, time: string) => void;
}

export const monthName: String[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const daysName: String[] = ["Mo", " Tu", "We", "Th", "Fr", "Sa", "Su"];

const Calendar: React.FC<CalendarProps & StoreProps & DispatchProps> = ({
  selectedDay,
  calendar,
  year,
  month,
  addNewNote,
  removeSelectNote,
  switchMonth,
}) => {
  const [isPopup, setIsPopup] = useState<Boolean>(false);
  const [editTime, setEditTime] = useState<{
    time: string;
    message: string;
  } | null>(null);
  const [intervalMode, setIntervalMode] = useState<Boolean>(false);

  const closePopup = () => {
    setIsPopup(false);
    setEditTime(null);
  };

  useEffect(() => {
    switchMonth(new Date());
  }, [switchMonth]);

  const setEditMode = (time: string, message: string) => {
    setEditTime({ time, message });
    setIsPopup(true);
  };

  const getKeyNote = (date: Date) => {
    return (
      date.getFullYear().toString() +
      date.getMonth().toString() +
      date.getDate().toString()
    );
  };

  const intervalModeHandler = (intervalMode: Boolean) => {
    if (!intervalMode) {
    }
    setIntervalMode(!intervalMode);
  };

  return (
    <div className="calendarContainer">
      {isPopup ? (
        <Popup
          isOpen={isPopup}
          closePopup={closePopup}
          keyNote={selectedDay.selectedKey}
          addNewNote={addNewNote}
          removeNote={removeSelectNote}
          selectNote={editTime}
        />
      ) : (
        calendar !== null &&
        month !== null &&
        year !== null && (
          <div className="content">
            <div className="calendar">
              <div className="navbar">
                <div
                  onClick={() => switchMonth(new Date(year, month, 0))}
                  className="arrow prev"
                >
                  &#10094;
                </div>
                <div className="date">
                  <div>{monthName[month]}</div>
                  <div>{year}</div>
                </div>
                <div
                  onClick={() => switchMonth(new Date(year, month + 1, 1))}
                  className="arrow next"
                >
                  &#10095;
                </div>
              </div>
              <div className="daysName">
                {daysName.map((day, index) => (
                  <div key={index}>{day}</div>
                ))}
              </div>
              <div className="days">
                {calendar.map((date: Date, index) => (
                  <Day
                    key={index}
                    date={date}
                    getKeyNote={getKeyNote}
                    intervalMode={intervalMode}
                  />
                ))}
              </div>
              <div
                className={"switchButton"}
                onClick={() => intervalModeHandler(intervalMode)}
              >
                <div> {intervalMode ? "Interval mode" : "Days mode"}</div>
                <div>Switch + </div>
              </div>
            </div>
            <ButtonDates intervalMode={intervalMode} setIsPopup={setIsPopup} />
            <Notebook setEditMode={setEditMode} intervalMode={intervalMode} />
          </div>
        )
      )}
    </div>
  );
};

const mapStatesToProps = (state: DataProps): StoreProps => ({
  year: state.year,
  calendar: state.calendar,
  month: state.month,
  selectedDay: state.selectedDay,
});
const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  switchMonth: (date: Date) => dispatch(switchMonth(date)),
  addNewNote: (key: string, time: string, message: string) =>
    dispatch(addNewNote(key, time, message)),
  removeSelectNote: (key: string, time: string) =>
    dispatch(removeSelectNote(key, time)),
});
export default connect(
  mapStatesToProps,
  mapDispatchToProps
)(React.memo(Calendar));
