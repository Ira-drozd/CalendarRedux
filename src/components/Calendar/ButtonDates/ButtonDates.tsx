import React from "react";
import { monthName } from "../Calendar";
import { connect } from "react-redux";
import { DataProps } from "../../../store/type";
import { getIntervalNotes } from "../../../store/actionCreators";

interface ButtonDatesProps {
  intervalMode: Boolean;
  setIsPopup: (value: boolean) => void;
}
interface StoreProps {
  selectedDays: { date: Date; selectedKey: string }[];
  selectedDay: { date: Date; selectedKey: string };
}
interface DispatchProps {
  getIntervalNotes: (dateStart: Date, dateEnd: Date) => void;
}

const ButtonDates: React.FC<ButtonDatesProps & StoreProps & DispatchProps> = ({
  intervalMode,
  setIsPopup,
  getIntervalNotes,
  selectedDays,
  selectedDay,
}) => {
  const onClickHandler = () => {
    if (intervalMode) {
      getIntervalNotes(selectedDays[0].date, selectedDays[1].date);
    } else {
      setIsPopup(true);
    }
  };

  return (
    <div onClick={() => onClickHandler()} className="selectedDate">
      {intervalMode ? (
        <div>
          {selectedDays[0].date.getDate()}{" "}
          {monthName[selectedDays[0].date.getMonth()]}{" "}
          {selectedDays[0].date.getFullYear()} —{selectedDays[1].date.getDate()}{" "}
          {monthName[selectedDays[1].date.getMonth()]}{" "}
          {selectedDays[1].date.getFullYear()}
        </div>
      ) : (
        <div>
          {selectedDay.date.getDate()} {monthName[selectedDay.date.getMonth()]}{" "}
          {selectedDay.date.getFullYear()}
        </div>
      )}

      <div>{intervalMode ? "Get notes" : "Add"} +</div>
    </div>
  );
};

const mapStatesToProps = (
  state: DataProps,
  ownProps: ButtonDatesProps
): StoreProps => ({
  selectedDays: state.selectedDays,
  selectedDay: state.selectedDay,
});
const mapDispatchToProps = (
  dispatch: any,
  ownProps: ButtonDatesProps
): DispatchProps => ({
  getIntervalNotes: (dateStart: Date, dateEnd: Date) =>
    dispatch(getIntervalNotes(dateStart, dateEnd)),
});
export default connect(
  mapStatesToProps,
  mapDispatchToProps
)(React.memo(ButtonDates));
