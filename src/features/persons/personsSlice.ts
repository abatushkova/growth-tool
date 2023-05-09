import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type PersonId = number;
export type Person = {
  personId: PersonId;
  personName: string;
}
type PersonsState = {
  list: Person[];
}

const initialState: PersonsState = {
  list: []
};

export const personsSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    addPerson(
      state: PersonsState,
      action: PayloadAction<Person>
    ) {
      state.list.push(action.payload);
    },
    deletePerson(
      state: PersonsState,
      action: PayloadAction<PersonId>
    ) {
      state.list = state.list.filter(({ personId }) => personId !== action.payload);
    },
    editPerson(
      state: PersonsState,
      action: PayloadAction<Person>
    ) {
      const index = state.list.findIndex(({ personId }) => personId === action.payload.personId);

      if (index !== undefined) {
        state.list[index].personName = action.payload.personName;
      }
    },
  }
});

export const {
  addPerson,
  deletePerson,
  editPerson,
} = personsSlice.actions;

export const personsReducer = personsSlice.reducer;
export const selectTodos = (state: RootState) => state.persons.list;
