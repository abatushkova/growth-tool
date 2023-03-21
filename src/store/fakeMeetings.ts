export const meetings = [
  {
    meetingId: 3,
    title: 'New Meeting',
    createdAt: 'Dec 31, 2022',
    closedAt: '',
    plannedAt: '',
    ownerId: 1,
    guests: [
      {
        guestId: 1,
      },
    ],
    topics: [
      {
        topicId: 1,
        title: 'Topic 1',
        createdAt: '',
        categories: [
          'NPS',
          'GrowthPlan',
          '101',
        ],
        comments: [
          {
            commentId: 1,
            createdAt: '',
            formView: 'Comment',
            comment: 'Useful information',
            question: '',
            score: 0,
            meetingId: 3,
          },
        ],
      },
      {
        topicId: 3,
        title: 'Topic 3',
        createdAt: '',
        categories: [
          'GrowthPlan',
        ],
        comments: [
          {
            commentId: 3,
            createdAt: '',
            formView: 'Score',
            comment: 'Useful information',
            question: '',
            score: 5,
            meetingId: 3,
          },
        ],
      },
    ]
  },
  {
    meetingId: 2,
    title: 'New Meeting',
    createdAt: 'Dec 16, 2022',
    closedAt: 'Dec 20, 2022',
    plannedAt: '',
    ownerId: 1,
    guests: [
      {
        guestId: 1,
      },
    ],
    topics: [
      {
        topicId: 1,
        title: 'Topic 1',
        createdAt: '',
        categories: [
          'NPS',
          'GrowthPlan',
          '101',
        ],
        comments: [
          {
            commentId: 4,
            createdAt: '',
            formView: 'Score',
            comment: 'Useful information',
            question: '',
            score: 8,
            meetingId: 2,
          },
        ],
      },
      {
        topicId: 2,
        title: 'Topic 2',
        createdAt: '',
        categories: [
          '101',
        ],
        comments: [
          {
            commentId: 5,
            createdAt: '',
            formView: 'QA',
            comment: 'Useful answer',
            question: 'Question',
            score: 0,
            meetingId: 2,
          },
        ],
      },
    ],
  },
  {
    meetingId: 1,
    title: 'New Meeting',
    createdAt: 'Nov 25, 2022',
    closedAt: 'Dec 20, 2022',
    plannedAt: '',
    ownerId: 1,
    guests: [
      {
        guestId: 1,
      },
    ],
    topics: [
      {
        topicId: 1,
        title: 'Test rocket in simulator',
        createdAt: '',
        categories: [
          'NPS',
        ],
        comments: [
          {
            commentId: 6,
            createdAt: '',
            formView: 'Score',
            comment: 'Useful information',
            question: '',
            score: 8,
            meetingId: 1,
          },
        ],
      },
    ],
  },
];
