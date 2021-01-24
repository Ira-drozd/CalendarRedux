import * as actionTypes from "./actionTypes";
import { NoteItem, NotesProps } from "./type";
import { store } from "../index";

const getDayOfWeek = (selectedDay: Date) => {
  const date = selectedDay;
  return date.getDay();
};

const getLastDay = (month: number, year: number) => {
  const date = new Date(year, month + 1, 0);
  return date.getDate();
};

const setCalendar = (
  month: number,
  year: number,
  firstDayOfWeek: number,
  lastDatePrevMonth: Date,
  firstDateNextMonth: Date
) => {
  const calendarSize = 42;
  const calendar: Date[] = [
    ...Array.from(Array(getLastDay(month, year)).keys()),
  ].map((day) => new Date(year, month, day + 1));

  if (firstDayOfWeek > 1 || firstDayOfWeek === 0) {
    let mondayDate =
      firstDayOfWeek === 0
        ? lastDatePrevMonth.getDate() - 5
        : lastDatePrevMonth.getDate() - firstDayOfWeek + 2;

    const prevDays: Date[] = [
      ...Array.from(
        Array(firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1).keys()
      ),
    ].map(
      () =>
        new Date(
          lastDatePrevMonth.getFullYear(),
          lastDatePrevMonth.getMonth(),
          mondayDate++
        )
    );
    calendar.unshift(...prevDays);
  }

  if (calendarSize - calendar.length !== 0) {
    const countDays = 42 - calendar.length;
    const nextDays: Date[] = [...Array.from(Array(countDays).keys())].map(
      (day) =>
        new Date(
          firstDateNextMonth.getFullYear(),
          firstDateNextMonth.getMonth(),
          day + 1
        )
    );
    calendar.push(...nextDays);
  }

  return calendar;
};

export const switchMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return {
    type: actionTypes.SWITCH_MONTH,
    payload: {
      year: year,
      month: month,
      calendar: setCalendar(
        month,
        year,
        getDayOfWeek(new Date(year, month, 1)),
        new Date(year, month, 0),
        new Date(year, month + 1, 1)
      ),
    },
  };
};

export const addNewNote = (key: string, time: string, message: string) => {
  const note: NoteItem = { [time]: message };
  let notes: NotesProps | null;
  const allNotes = store.getState().notes;
  if (allNotes !== null && allNotes.hasOwnProperty(key)) {
    notes = { [key]: Object.assign({ ...allNotes[key] }, note) };
  } else {
    notes = { [key]: note };
  }
  return {
    type: actionTypes.ADD_NEW_NOTE,
    payload: { notes },
  };
};

export const removeSelectNote = (key: string, time: string) => {
  const notes = { ...store.getState().notes };
  const note: NoteItem = notes[key];
  delete note[time];

  const day = { [key]: note };

  if (Object.keys(note).length === 0) {
    delete notes[key];
  } else {
    Object.assign(notes, day);
  }
  return {
    type: actionTypes.REMOVE_NOTE,
    payload: { notes },
  };
};

export const setNewSelectedDay = (date: Date, selectedKey: string) => {
  const selectedDay = { date, selectedKey };
  return {
    type: actionTypes.SET_SELECTED_DAY,
    payload: { selectedDay },
  };
};

export const setSelectedDays = (date: Date, selectedKey: string) => {
  let selectedDays = [...store.getState().selectedDays];
  if (date > selectedDays[1].date) {
    selectedDays[1].date = date;
    selectedDays[1].selectedKey = selectedKey;
  } else if (date < selectedDays[0].date) {
    selectedDays[0].date = date;
    selectedDays[0].selectedKey = selectedKey;
  } else {
    selectedDays[1].date = date;
    selectedDays[1].selectedKey = selectedKey;
    selectedDays[0].date = date;
    selectedDays[0].selectedKey = selectedKey;
  }
  return {
    type: actionTypes.SET_SELECTED_DAYS,
    payload: { selectedDays },
  };
};

const getKeyNote = (date: Date) => {
  return (
    date.getFullYear().toString() +
    date.getMonth().toString() +
    date.getDate().toString()
  );
};

const getAllKeys = (dateStart: Date, dateEnd: Date) => {
  const allDates = [];
  if (dateStart === dateEnd) {
    allDates.push(getKeyNote(dateStart));
  } else {
    allDates.push(getKeyNote(dateStart));
    let i = new Date(dateStart);
    let j = new Date(dateEnd);

    if (i <= j) {
      for (let d = i; d <= j; d.setDate(d.getDate() + 1)) {
        allDates.push(getKeyNote(d));
      }
    }
  }
  return allDates.filter(
    (value, index, array) => array.indexOf(value) === index
  );
};

export const getIntervalNotes = (dateStart: Date, dateEnd: Date) => {
  const allKeys: string[] = getAllKeys(dateStart, dateEnd);
  const notes = { ...store.getState().notes };
  let intervalNotes = null;
  if (notes) {
    const allNotes = allKeys
      .map((value, index) => {
        if (notes[allKeys[index]]) {
          return { [value]: notes[allKeys[index]] };
        }
      })
      .filter((value, index, array) => value !== undefined);
    if (allNotes.length) {
      intervalNotes = allNotes;
    } else {
      intervalNotes = null;
    }
  } else {
    intervalNotes = null;
  }
  return {
    type: actionTypes.SET_INTERVAL_NOTES,
    payload: { intervalNotes },
  };
};
