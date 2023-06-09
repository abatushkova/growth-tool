import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { loadState } from "../../app/localStorage";
import { PersonId, Person } from "../../app/types";

type PersonsState = {
  personList: Person[];
  guest: Person;
};

const initialState: PersonsState = {
  personList: loadState() || [],
  guest: loadState() || {},
};

export const personsSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    addPerson(
      state: PersonsState,
      action: PayloadAction<Person>
    ) {
      state.personList.push(action.payload);
    },
    deletePerson(
      state: PersonsState,
      action: PayloadAction<PersonId>
    ) {
      const deletedPerson = action.payload;

      state.personList = state.personList.filter(({ personId }) => (
        personId !== deletedPerson
      ));

      if (state.guest.personId === deletedPerson) {
        state.guest.personId = '';
        state.guest.personName = '';
      }
    },
    editPerson(
      state: PersonsState,
      { payload }: PayloadAction<Person>
    ) {
      const index = state.personList.findIndex(({ personId }) => (
        personId === payload.personId
      ));
      if (index === -1) return;

      state.personList[index].personName = payload.personName;
    },
    setGuest(
      state: PersonsState,
      { payload }: PayloadAction<Person>
    ) {
      state.guest.personId = payload.personId;
      state.guest.personName = payload.personName;
    },
  },
});

export const {
  addPerson,
  deletePerson,
  editPerson,
  setGuest,
} = personsSlice.actions;

export const personsReducer = personsSlice.reducer;
export const selectPersonList = (state: RootState) => state.persons.personList;
export const selectGuest = (state: RootState) => state.persons.guest;
