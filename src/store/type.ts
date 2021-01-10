export interface DataProps {
  year: number;
  month: number;
  calendar: Date[] | null;
  selectedDay: { date: Date; selectedKey: string };
  notes: NotesProps | null;
}

export interface NoteItem {
  [key: string]: string;
}
export interface NotesProps {
  [key: string]: NoteItem;
}

export interface CalendarAction {
  type: string;
  payload: DataProps;
}

export type DispatchType = (args: CalendarAction) => CalendarAction;
