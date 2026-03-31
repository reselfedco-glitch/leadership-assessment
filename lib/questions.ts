export interface Question {
  id: string
  text: string
  category: string
  options: string[]
  scores: number[]
}

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'When faced with a challenge, I tend to:',
    category: 'Decision Making',
    options: [
      'Take action immediately',
      'Analyze the situation first',
      'Consult with others',
      'Wait to see what happens'
    ],
    scores: [4, 3, 2, 1]
  },
  {
    id: 'q2',
    text: 'In team meetings, I usually:',
    category: 'Communication',
    options: [
      'Lead the discussion',
      'Contribute when asked',
      'Listen and take notes',
      'Check my phone'
    ],
    scores: [4, 3, 2, 1]
  },
  {
    id: 'q3',
    text: 'When someone disagrees with me, I:',
    category: 'Emotional Intelligence',
    options: [
      'Listen to understand their perspective',
      'Defend my position',
      'Avoid the conflict',
      'Get frustrated'
    ],
    scores: [4, 2, 1, 0]
  },
  {
    id: 'q4',
    text: 'My approach to deadlines is:',
    category: 'Accountability',
    options: [
      'Complete well before deadline',
      'Finish on time',
      'Often need extension',
      'Miss deadlines'
    ],
    scores: [4, 3, 1, 0]
  },
  {
    id: 'q5',
    text: 'When team members make mistakes, I:',
    category: 'Coaching',
    options: [
      'Help them learn from it',
      'Point out what went wrong',
      'Let them figure it out',
      'Blame them'
    ],
    scores: [4, 2, 1, 0]
  },
  {
    id: 'q6',
    text: 'My vision for the future is:',
    category: 'Strategic Thinking',
    options: [
      'Clear and inspiring',
      'Somewhat defined',
      'Unclear',
      'Non-existent'
    ],
    scores: [4, 3, 1, 0]
  },
  {
    id: 'q7',
    text: 'I empower my team by:',
    category: 'Delegation',
    options: [
      'Giving autonomy and support',
      'Clear instructions',
      'Micromanaging',
      'Ignoring them'
    ],
    scores: [4, 3, 1, 0]
  },
  {
    id: 'q8',
    text: 'When receiving feedback, I:',
    category: 'Growth Mindset',
    options: [
      'Reflect and implement',
      'Consider it thoughtfully',
      'Dismiss it',
      'Get defensive'
    ],
    scores: [4, 3, 1, 0]
  },
  {
    id: 'q9',
    text: 'My credibility comes from:',
    category: 'Integrity',
    options: [
      'Following through on commitments',
      'Technical expertise',
      'Talking a good game',
      'My title'
    ],
    scores: [4, 3, 1, 0]
  },
  {
    id: 'q10',
    text: 'I handle stress by:',
    category: 'Resilience',
    options: [
      'Staying calm and focused',
      'Taking a break',
      'Venting to others',
      'Avoiding it'
    ],
    scores: [4, 3, 1, 0]
  },
  {
    id: 'q11',
    text: 'When setting team goals, I:',
    category: 'Strategic Thinking',
    options: [
      'Involve the team for buy-in',
      'Consult key members',
      'Decide myself',
      'Let them figure it out'
    ],
    scores: [4, 3, 2, 0]
  },
  {
    id: 'q12',
    text: 'My team would describe me as:',
    category: 'Influence',
    options: [
      'Inspiring and motivating',
      'Competent and fair',
      'Distant but knowledgeable',
      'Confusing'
    ],
    scores: [4, 3, 1, 0]
  },
  {
    id: 'q13',
    text: 'I develop my team by:',
    category: 'Coaching',
    options: [
      'Creating growth opportunities',
      'Providing feedback',
      'Expecting them to self-develop',
      'Not focusing on development'
    ],
    scores: [4, 3, 1, 0]
  },
  {
    id: 'q14',
    text: 'When there is organizational change, I:',
    category: 'Adaptability',
    options: [
      'Lead the transition',
      'Adapt and help others',
      'Resist it',
      'Ignore it'
    ],
    scores: [4, 3, 1, 0]
  },
  {
    id: 'q15',
    text: 'My approach to collaboration is:',
    category: 'Communication',
    options: [
      'Cross-functional and inclusive',
      'Task-focused',
      'Competitive',
      'Isolationist'
    ],
    scores: [4, 2, 1, 0]
  },
  {
    id: 'q16',
    text: 'I inspire confidence in others by:',
    category: 'Presence',
    options: [
      'Clear thinking and decisive action',
      'Competence',
      'Trying hard',
      'Just showing up'
    ],
    scores: [4, 3, 1, 0]
  },
  {
    id: 'q17',
    text: 'My communication style is:',
    category: 'Communication',
    options: [
      'Clear and direct',
      'Sometimes unclear',
      'Often misunderstood',
      'Rarely communicated'
    ],
    scores: [4, 2, 1, 0]
  },
  {
    id: 'q18',
    text: 'I handle conflict by:',
    category: 'Emotional Intelligence',
    options: [
      'Addressing it constructively',
      'Trying to smooth it over',
      'Escalating it',
      'Ignoring it'
    ],
    scores: [4, 2, 1, 0]
  },
  {
    id: 'q19',
    text: 'My impact on organizational culture is:',
    category: 'Influence',
    options: [
      'Strongly positive',
      'Generally positive',
      'Neutral',
      'Negative'
    ],
    scores: [4, 3, 1, 0]
  },
  {
    id: 'q20',
    text: 'I make decisions by:',
    category: 'Decision Making',
    options: [
      'Data-driven and inclusive',
      'Mostly data-driven',
      'Gut feeling',
      'Others decide'
    ],
    scores: [4, 3, 1, 0]
  },
  {
    id: 'q21',
    text: 'My commitment to continuous learning is:',
    category: 'Growth Mindset',
    options: [
      'Very high - always improving',
      'Moderate - learning when needed',
      'Low - satisfied with current skills',
      'None'
    ],
    scores: [4, 2, 1, 0]
  },
  {
    id: 'q22',
    text: 'I address poor performance by:',
    category: 'Accountability',
    options: [
      'Direct conversation and support',
      'Documentation',
      'Criticism',
      'Ignoring it'
    ],
    scores: [4, 3, 1, 0]
  },
  {
    id: 'q23',
    text: 'My relationship with senior leadership is:',
    category: 'Influence',
    options: [
      'Trusted advisor',
      'Productive',
      'Distant',
      'Adversarial'
    ],
    scores: [4, 3, 1, 0]
  },
  {
    id: 'q24',
    text: 'I balance work and personal life by:',
    category: 'Resilience',
    options: [
      'Being intentional about both',
      'Mostly work-focused',
      'Mostly personal-focused',
      'Struggling constantly'
    ],
    scores: [4, 2, 1, 0]
  },
  {
    id: 'q25',
    text: 'My biggest leadership strength is:',
    category: 'Self-awareness',
    options: [
      'I know it and leverage it',
      'I have some ideas',
      'Others tell me',
      'I am not sure'
    ],
    scores: [4, 3, 2, 0]
  }
]

export const CATEGORIES = [
  'Decision Making',
  'Communication',
  'Emotional Intelligence',
  'Accountability',
  'Coaching',
  'Strategic Thinking',
  'Delegation',
  'Growth Mindset',
  'Integrity',
  'Resilience',
  'Influence',
  'Adaptability',
  'Presence',
  'Self-awareness'
]
