import React from "react";
import { NotesProps } from "../../../store/type";

interface NotebookProps {
  selectedDay: Date;
  notes: NotesProps | null;
  removeNote: (key: string, time: string, message: string) => void;
  setEditMode: (time: string, message: string) => void;
}

const Notebook: React.FC<NotebookProps> = ({
  selectedDay,
  notes,
  setEditMode,
}) => {
  const keyNote: string =
    selectedDay.getFullYear().toString() +
    selectedDay.getMonth().toString() +
    selectedDay.getDate().toString();

  const getNotes = () => {
    if (notes && notes.hasOwnProperty(keyNote)) {
      return Object.entries(notes[keyNote])
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

  return <div className="notebookContainer">{getNotes()}</div>;
};

export default Notebook;
