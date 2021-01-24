import React from "react";
import { DataProps, NotesProps } from "../../../store/type";
import {
  setNewSelectedDay,
  setSelectedDays,
} from "../../../store/actionCreators";
import { connect } from "react-redux";

interface DayProps {
  date: Date;
  getKeyNote: (date: Date) => string;
  intervalMode: Boolean;
}
interface StoreProps {
  year: number | null;
  month: number | null;
  selectedKey: string;
  notes: NotesProps | null;
  selectedDays: { date: Date; selectedKey: string }[];
}
interface DispatchProps {
  setNewSelectedDay: (date: Date, selectedKey: string) => void;
  setSelectedDays: (date: Date, selectedKey: string) => void;
}
const Day: React.FC<DayProps & StoreProps & DispatchProps> = ({
  date,
  year,
  month,
  selectedKey,
  setNewSelectedDay,
  notes,
  getKeyNote,
  intervalMode,
  setSelectedDays,
  selectedDays,
}) => {
  const keyNote = getKeyNote(date);

  let classes: string[] = ["day"];

  if (intervalMode) {
    if (
      keyNote === selectedDays[0].selectedKey ||
      keyNote === selectedDays[1].selectedKey ||
      (date > selectedDays[0].date && date < selectedDays[1].date)
    ) {
      classes.push("selectedDay");
    }
  } else {
    if (keyNote === selectedKey) {
      classes.push("selectedDay");
    }
  }
  if (notes && notes.hasOwnProperty(keyNote)) {
    classes.push("settedNotes");
  }
  if (date.getFullYear() === year && date.getMonth() === month) {
    classes.push("activeDate");
  } else {
    classes.push("passiveDate");
  }

  const selectDayHandler = (
    intervalMode: Boolean,
    date: Date,
    keyNote: string
  ) => {
    if (intervalMode) {
      setSelectedDays(date, keyNote);
    } else {
      setNewSelectedDay(date, keyNote);
    }
  };

  return (
    <div
      className={classes.join(" ")}
      onClick={() => selectDayHandler(intervalMode, date, keyNote)}
    >
      {date.getDate()}
    </div>
  );
};

const mapStatesToProps = (state: DataProps): StoreProps => ({
  year: state.year,
  month: state.month,
  notes: state.notes,
  selectedKey: state.selectedDay.selectedKey,
  selectedDays: state.selectedDays,
});
const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  setNewSelectedDay: (date: Date, selectedKey: string) =>
    dispatch(setNewSelectedDay(date, selectedKey)),
  setSelectedDays: (date: Date, selectedKey: string) =>
    dispatch(setSelectedDays(date, selectedKey)),
});
export default connect(mapStatesToProps, mapDispatchToProps)(React.memo(Day));
