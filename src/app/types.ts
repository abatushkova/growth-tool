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

export type MeetingId = string;

export type Meeting = {
  meetingId: MeetingId;
  title: string;
  createdAt: string;
  plannedAt: string;
  closed: boolean;
  ownerId: PersonId;
  guests: Guest[];
};

export type TopicId = string;

export type Topic = {
  topicId: TopicId;
  title: string;
  category: string[];
  createdAt: string;
  comments: Comment[];
};

export enum FormView {
  Comment = 'Comment',
  QA = 'QA',
  Score = 'Score'
}

export type CommentId = string;

export type Comment = {
  commentId: CommentId;
  createdAt: string;
  formView: FormView;
  question?: string;
  comment?: string;
  score?: number;
  meetingId: MeetingId;
  initial?: boolean;
};
