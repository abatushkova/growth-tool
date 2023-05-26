import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { loadState } from "../../app/localStorage";
import { PersonId, Person } from "../../app/types";

type PersonsState = {
  personList: Person[];
  activePerson: Person;
};

const initialState: PersonsState = {
  personList: loadState() || [],
  activePerson: loadState() || {},
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

      state.personList = state.personList.filter(
        ({ personId }) => personId !== deletedPerson
      );

      if (state.activePerson.personId === deletedPerson) {
        state.activePerson.personId = '';
        state.activePerson.personName = '';
      }
    },
    editPerson(
      state: PersonsState,
      { payload }: PayloadAction<Person>
    ) {
      const index = state.personList.findIndex(({ personId }) => personId === payload.personId);

      if (index !== undefined) {
        state.personList[index].personName = payload.personName;
      }
    },
    setActivePerson(
      state: PersonsState,
      { payload }: PayloadAction<Person>
    ) {
      state.activePerson.personId = payload.personId;
      state.activePerson.personName = payload.personName;
    },
  },
});

export const {
  addPerson,
  deletePerson,
  editPerson,
  setActivePerson,
} = personsSlice.actions;

export const personsReducer = personsSlice.reducer;
export const selectPersons = (state: RootState) => state.persons.personList;
export const selectPerson = (state: RootState) => state.persons.activePerson;
