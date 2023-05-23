export type PersonId = string;

export type Person = {
  personId: PersonId;
  personName: string;
};

export interface SelectFunc {
  (...S: string[]): void;
}


