import * as actionTypes from "./actionTypes";
import { CalendarAction, DataProps } from "./type";

const today: Date = new Date();

const initialState: DataProps = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  calendar: null,
  selectedDay: {
    date: today,
    selectedKey:
      today.getFullYear().toString() +
      today.getMonth().toString() +
      today.getDate().toString(),
  },
  notes: null,
  selectedDays: [
    {
      date: today,
      selectedKey:
        today.getFullYear().toString() +
        today.getMonth().toString() +
        today.getDate().toString(),
    },
    {
      date: today,
      selectedKey:
        today.getFullYear().toString() +
        today.getMonth().toString() +
        today.getDate().toString(),
    },
  ],
  intervalNotes: null,
};

const reducer = (
  state: DataProps = initialState,
  action: CalendarAction
): DataProps => {
  switch (action.type) {
    case actionTypes.SWITCH_MONTH:
      return {
        ...state,
        year: action.payload.year,
        month: action.payload.month,
        calendar: action.payload.calendar,
      };
    case actionTypes.SET_SELECTED_DAY:
      return {
        ...state,
        selectedDay: { ...action.payload.selectedDay },
      };
    case actionTypes.ADD_NEW_NOTE:
      return {
        ...state,
        notes: { ...state.notes, ...action.payload.notes },
      };
    case actionTypes.REMOVE_NOTE:
      return {
        ...state,
        notes: { ...action.payload.notes },
      };
    case actionTypes.SET_SELECTED_DAYS:
      return {
        ...state,
        selectedDays: action.payload.selectedDays,
      };
    case actionTypes.SET_INTERVAL_NOTES:
      return {
        ...state,
        intervalNotes: action.payload.intervalNotes,
      };
  }
  return state;
};

export default reducer;
