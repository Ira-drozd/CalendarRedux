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
  /*{
    "202103": {
      "00:00": "qwert 3 00",
      "00:01": "qwert 3 01",
      "00:02": "qwert 3 02",
    },
    "2021020": {
      "00:08": "qwert 20 00",
      "00:01": "qwert 20 01",
      "00:02": "qwert 20 02",
    },
    "2020119": {
      "00:00": "qwert 19 00",
      "00:05": "qwert 19 01",
      "00:02": "qwert 19 02",
    },
  },*/
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
  }
  return state;
};

export default reducer;
