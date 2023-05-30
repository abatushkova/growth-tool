export type PersonId = string;

export type Person = {
  personId: PersonId;
  personName: string;
};

export interface SelectFunc {
  (...S: string[]): void;
}

export type Meeting = {
  meetingId: string;
  title: string;
  createdAt: Date;
  closedAt: Date;
  plannedAt: Date;
  ownerId: string;
  guests: PersonId[];
};
