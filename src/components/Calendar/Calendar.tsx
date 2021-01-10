import React, { useEffect, useState } from "react";
import Day from "./Day/Day";
import Notebook from "./Notebook/Notebook";
import Popup from "./Popup";

import { connect } from "react-redux";

import { Dispatch } from "redux";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { DataProps, NotesProps } from "../../store/type";
import {
  switchMonth,
  addNewNote,
  removeSelectNote,
  setNewSelectedDay,
} from "../../store/actionCreators";

interface CalendarProps {}

const Calendar: React.FC<CalendarProps> = () => {
  const [isPopup, setIsPopup] = useState<Boolean>(false);
  const [editTime, setEditTime] = useState<{
    time: string;
    message: string;
  } | null>(null);

  const monthName: String[] = [
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

  const closePopup = () => {
    setIsPopup(false);
    setEditTime(null);
  };

  const dispatch: Dispatch<any> = useDispatch();

  const year: number | null = useSelector(
    (state: DataProps) => state.year,
    shallowEqual
  );
  const month: number | null = useSelector(
    (state: DataProps) => state.month,
    shallowEqual
  );
  const calendar: Date[] | null = useSelector(
    (state: DataProps) => state.calendar,
    shallowEqual
  );
  const notes: NotesProps | null = useSelector(
    (state: DataProps) => state.notes,
    shallowEqual
  );

  const selectedDay: { date: Date; selectedKey: string } = useSelector(
    (state: DataProps) => state.selectedDay,
    shallowEqual
  );

  const setDate = React.useCallback(
    (date: Date) => dispatch(switchMonth(date)),
    [dispatch]
  );

  const createNote = React.useCallback(
    (key: string, time: string, message: string) => {
      dispatch(addNewNote(key, time, message));
      closePopup();
    },
    [dispatch]
  );

  const removeNote = React.useCallback(
    (key: string, time: string) => {
      dispatch(removeSelectNote(key, time));
      closePopup();
    },
    [dispatch]
  );

  const setSelectedDay = React.useCallback(
    (date: Date, selectedKey: string) => {
      dispatch(setNewSelectedDay(date, selectedKey));
    },
    [dispatch]
  );

  useEffect(() => {
    setDate(new Date());
  }, [setDate]);

  const setEditMode = (time: string, message: string) => {
    setEditTime({ time, message });
    setIsPopup(true);
  };

  return (
    <div className="calendarContainer">
      {isPopup ? (
        <Popup
          isOpen={isPopup}
          closePopup={closePopup}
          keyNote={selectedDay.selectedKey}
          addNewNote={createNote}
          removeNote={removeNote}
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
                  onClick={() => setDate(new Date(year, month, 0))}
                  className="arrow prev"
                >
                  &#10094;
                </div>
                <div className="date">
                  <div>{monthName[month]}</div>
                  <div>{year}</div>
                </div>
                <div
                  onClick={() => setDate(new Date(year, month + 1, 1))}
                  className="arrow next"
                >
                  &#10095;
                </div>
              </div>
              <div className="daysName">
                <div>Mo</div>
                <div>Tu</div>
                <div>We</div>
                <div>Th</div>
                <div>Fr</div>
                <div>Sa</div>
                <div>Su</div>
              </div>
              <div className="days">
                {calendar.map((date: Date, index) => (
                  <Day
                    key={date.toString()}
                    date={date}
                    month={month}
                    year={year}
                    selectedDay={selectedDay.date}
                    selectNewDay={setSelectedDay}
                    notes={notes}
                  />
                ))}
              </div>
              <div onClick={() => setIsPopup(true)} className="selectedDate">
                <div>
                  {selectedDay.date.getDate()}{" "}
                  {monthName[selectedDay.date.getMonth()]}{" "}
                  {selectedDay.date.getFullYear()}
                </div>
                <div>Add +</div>
              </div>
            </div>
            <Notebook
              selectedDay={selectedDay.date}
              notes={notes}
              removeNote={removeNote}
              setEditMode={setEditMode}
            />
          </div>
        )
      )}
    </div>
  );
};

export default Calendar;
