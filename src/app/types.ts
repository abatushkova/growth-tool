export interface SelectFunc {
  (...S: string[]): void;
}

export type PersonId = string;

export type Person = {
  personId: PersonId;
  personName: string;
};

type Guest = {
  guestId: PersonId
};

export type Meeting = {
  meetingId: string;
  title: string;
  createdAt: string;
  // closedAt: string;
  plannedAt: string;
  ownerId: PersonId;
  guests: Guest[];
};
