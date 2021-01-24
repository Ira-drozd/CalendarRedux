import React from "react";
import { DataProps, NotesProps } from "../../../store/type";
import { connect } from "react-redux";

interface NotebookProps {
  setEditMode: (time: string, message: string) => void;
  intervalMode: Boolean;
}

interface StoreProps {
  intervalNotes: NotesProps[] | null;
  notes: NotesProps | null;
  selectedKey: string;
}

const Notebook: React.FC<NotebookProps & StoreProps> = ({
  selectedKey,
  notes,
  setEditMode,
  intervalMode,
  intervalNotes,
}) => {
  const getNotes = () => {
    if (notes && notes.hasOwnProperty(selectedKey)) {
      return Object.entries(notes[selectedKey])
        .sort()
        .map((item) => (
          <div className="noteItem" key={item[0]}>
            <div
              onClick={() => setEditMode(item[0], item[1])}
              className="noteData"
            >
              <div className="noteDate">{item[0]}</div>
              <div>Edit</div>
            </div>
            <div className="noteMessage">{item[1]}</div>
          </div>
        ));
    } else {
      return <div className="noteItem">Empty...</div>;
    }
  };

  const contentIntervalNotes = () => {
    if (intervalNotes) {
      return intervalNotes.map((dayObj, index) => (
        <div key={index}>
          {Object.keys(dayObj)[0]}
          {Object.entries(Object.values(dayObj)[0])
            .sort()
            .map((item) => (
              <div className="noteItem" key={item[0]}>
                <div className="noteData">
                  <div className="noteDate">{item[0]}</div>
                </div>
                <div className="noteMessage">{item[1]}</div>
              </div>
            ))}
        </div>
      ));
    } else return <div className="noteItem">Empty...</div>;
  };

  return (
    <div className="notebookContainer">
      {intervalMode ? contentIntervalNotes() : getNotes()}
    </div>
  );
};

const mapStatesToProps = (state: DataProps): StoreProps => ({
  intervalNotes: state.intervalNotes,
  notes: state.notes,
  selectedKey: state.selectedDay.selectedKey,
});

export default connect(mapStatesToProps)(React.memo(Notebook));
