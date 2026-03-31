export interface Question {
  id: number
  question: string
  blockType: "personality" | "title" | "execution" | "overstepping" | "expertise"
  options: { text: string; score: number }[]
}

export interface Block {
  id: string
  name: string
  belief: string
  description: string
  identity: {
    label: string
    description: string
    impact: string
  }
  strength: {
    label: string
    belief: string
    description: string
    howColleaguesSeeYou: string
    howLeadershipSeesYou: string
    careerBenefit: string
  }
  perception: {
    low: string
    medium: string
    high: string
  }
  perceptionDetails: {
    howColleaguesSeeYou: string
    howLeadershipSeesYou: string
    careerImpact: string
    whatYouMiss: string
  }
  changeActions: string[]
  coaching: {
    quote: string
    beliefToChallenge: string
    discussWithCoach: string[]
    newBeliefToAdopt: string
  }
  benchmarks: {
    low: { label: string; behavior: string }
    average: { label: string; behavior: string }
    aboveAverage: { label: string; behavior: string }
    executive: { label: string; behavior: string }
    elite: { label: string; behavior: string }
  }
}

export interface BlockScore {
  block: Block
  percentage: number
  score: number
}

export const blocks: Block[] = [
  {
    id: "personality",
    name: "Personality Block",
    belief: "I'm not bold or extroverted enough to be a leader.",
    description: "You believe leadership requires a specific personality type you don't have.",
    identity: {
      label: "The Invisible Contributor",
      description: "You've internalized the belief that leadership belongs to louder, more charismatic people. You see yourself as someone who works behind the scenes, contributing value quietly without expecting recognition or influence.",
      impact: "This identity keeps you safe from judgment but invisible to opportunity. You'll be passed over for leadership roles not because you lack capability, but because no one knows you want them — or that you're capable of filling them."
    },
    strength: {
      label: "Authentic Leadership Presence",
      belief: "Leadership comes in many forms, and my style is valid.",
      description: "You understand that leadership isn't about being the loudest voice in the room. You lead through thoughtful action, measured contributions, and genuine impact rather than performative presence.",
      howColleaguesSeeYou: "Your colleagues see you as someone who speaks with intention. When you contribute, people listen because they know your words carry weight. You're respected for substance over volume.",
      howLeadershipSeesYou: "Senior leaders recognize you as someone who doesn't need to dominate airtime to add value. They see you as thoughtful, strategic, and capable of leading through influence rather than force.",
      careerBenefit: "You'll be trusted with nuanced, high-stakes situations where calm leadership is essential. Your style attracts followers who value depth over charisma, and you build lasting influence rather than superficial attention."
    },
    perception: {
      low: "Others see you as someone who leads through thoughtful action rather than volume. Your measured approach commands respect.",
      medium: "Colleagues notice your potential but wish you'd share your perspective more often. You're seen as capable but underutilized.",
      high: "Others may interpret your quietness as disinterest or lack of confidence. Your valuable insights go unheard."
    },
    perceptionDetails: {
      howColleaguesSeeYou: "Your colleagues see you as someone who fades into the background. They may assume you have nothing to add or that you're content being overlooked. Even when you have the answer, no one knows to ask you.",
      howLeadershipSeesYou: "Senior leaders simply don't notice you. In a room of voices competing for attention, your silence reads as absence. They don't see someone ready to lead — they see someone comfortable following.",
      careerImpact: "You're passed over for visible projects and leadership opportunities because no one thinks of you. Your contributions go unrecognized while louder colleagues advance.",
      whatYouMiss: "You miss the chance to shape decisions, build your reputation, and demonstrate your leadership capacity. Others fill the vacuum your silence creates."
    },
    changeActions: [
      "Speak up at least once in every meeting — even if it's just to reinforce a point you agree with",
      "Share your perspective proactively in written communications, not just when asked",
      "Volunteer to present work or lead discussions, even in small settings",
      "Remind yourself daily: quiet is not the same as weak, and leadership has many forms"
    ],
    coaching: {
      quote: "Your voice matters not because it's loud, but because it carries truth. The room is waiting to hear from you — and your silence is being interpreted as absence, not depth.",
      beliefToChallenge: "I believe leadership requires a bold, extroverted personality that I don't have.",
      discussWithCoach: [
        "Explore where this belief originated — was it a past experience, a specific person, or cultural messaging?",
        "Identify moments when your quieter style actually created impact — and why you dismissed them",
        "Discuss what 'leadership presence' means to you and whether that definition serves your goals",
        "Create a practice plan for speaking up in low-stakes environments to build confidence"
      ],
      newBeliefToAdopt: "Leadership is about impact, not volume. My thoughtful style is an asset that earns trust and respect."
    },
    benchmarks: {
      low: { label: "Low Leadership Identity", behavior: "Stays silent in meetings, defers to others constantly, believes their voice doesn't matter, avoids visibility at all costs, and assumes leadership is for 'other types' of people." },
      average: { label: "Average Professional", behavior: "Speaks up occasionally when directly asked, contributes ideas but doesn't advocate strongly, comfortable in supporting roles, and rarely volunteers for visible assignments." },
      aboveAverage: { label: "Above Average", behavior: "Contributes regularly in meetings, shares opinions when they feel confident, starting to recognize their style as valid, and occasionally volunteers for visible work." },
      executive: { label: "Executive Level", behavior: "Speaks with purpose and timing, knows when silence is strategic vs. limiting, uses their natural style as a strength, and commands attention through substance rather than volume." },
      elite: { label: "Elite Leader", behavior: "Has fully integrated their authentic style into their leadership brand, mentors others with similar styles, influences through presence not performance, and is sought out for their perspective." }
    }
  },
  {
    id: "title",
    name: "Title Block",
    belief: "Once I get promoted, I'll lead. I need a title first.",
    description: "You're waiting for formal authority before taking initiative, missing opportunities to demonstrate leadership.",
    identity: {
      label: "The Permission Seeker",
      description: "You've attached leadership to formal authority. You believe that leading without a title is overstepping, so you wait. You do your job well and assume that one day, someone will notice and give you the role you've been waiting for.",
      impact: "This identity creates a catch-22: you won't lead until you have a title, but you won't get a title until you lead. You end up waiting indefinitely while others who take initiative move past you."
    },
    strength: {
      label: "Initiative-Driven Leader",
      belief: "I lead through action, not authority.",
      description: "You don't wait for permission to make things better. You understand that titles follow leadership behavior, and you demonstrate leadership through initiative, ownership, and impact.",
      howColleaguesSeeYou: "Your colleagues see you as someone who makes things happen. They come to you for direction even without formal authority because they trust your judgment and your willingness to take responsibility.",
      howLeadershipSeesYou: "Senior leaders notice your initiative. They see someone who acts like a leader before being given the title — which is exactly what makes them confident you're ready for more responsibility.",
      careerBenefit: "You accelerate your career by demonstrating readiness. Promotions come faster because you've already been doing the job. Your track record of initiative makes every leadership opportunity feel like a natural next step."
    },
    perception: {
      low: "Others see you as someone who naturally takes ownership. They look to you for direction regardless of your title.",
      medium: "Colleagues notice that you have good ideas but often wait to be asked. They wish you'd take more initiative.",
      high: "Others see you as someone waiting to be told what to do. Your hesitation reads as lack of ambition or capability."
    },
    perceptionDetails: {
      howColleaguesSeeYou: "Your colleagues see you as someone who waits for permission. They may respect your work but don't look to you for leadership. When problems arise, they turn to people who act without being asked.",
      howLeadershipSeesYou: "Senior leaders see someone who executes but doesn't lead. They wonder if you have the drive to step up. When considering who to promote, they think of people who already act like leaders.",
      careerImpact: "You're seen as a reliable contributor but not a future leader. Promotions go to those who demonstrate leadership before having the title.",
      whatYouMiss: "You miss opportunities to build your reputation, develop leadership skills, and show decision-makers what you're capable of."
    },
    changeActions: [
      "Identify one problem on your team and propose a solution without being asked",
      "Take ownership of something outside your job description — even something small",
      "Stop asking for permission and start asking for forgiveness (within reason)",
      "Reframe your mindset: titles follow leadership behavior, not the other way around"
    ],
    coaching: {
      quote: "No one handed you permission to add value, yet you add it every day. Why are you waiting for permission to lead when you already know how to contribute?",
      beliefToChallenge: "I believe I need a formal title or role before I can lead or take initiative.",
      discussWithCoach: [
        "Examine why you've linked leadership to authority — what experiences shaped this belief?",
        "Identify times you held back waiting for permission and what the cost was",
        "Discuss what 'overstepping' really means versus what you've made it mean in your head",
        "Create a plan to take one initiative this week that doesn't require anyone's approval"
      ],
      newBeliefToAdopt: "Titles follow leadership behavior. I demonstrate readiness by leading now, not by waiting to be chosen."
    },
    benchmarks: {
      low: { label: "Low Leadership Identity", behavior: "Waits for explicit permission for everything, never acts beyond their job description, sees leadership as something granted by others, and stays frozen until promoted." },
      average: { label: "Average Professional", behavior: "Takes some initiative within their defined role, occasionally steps up when explicitly invited, comfortable leading only when formally asked, and waits for clarity before acting." },
      aboveAverage: { label: "Above Average", behavior: "Takes initiative on smaller projects, starting to act before being asked, recognizes that waiting isn't always necessary, and shows emerging ownership mindset." },
      executive: { label: "Executive Level", behavior: "Acts on opportunities without waiting for permission, takes ownership beyond their title, builds influence through action not authority, and is trusted because they've already demonstrated leadership." },
      elite: { label: "Elite Leader", behavior: "Creates opportunities for others to lead without titles, builds systems that reward initiative, influences organizational culture around ownership, and is known for developing future leaders." }
    }
  },
  {
    id: "execution",
    name: "Execution Block",
    belief: "Let me just do my part really well. My job is to execute.",
    description: "You focus purely on task completion without considering how to shape direction or influence outcomes.",
    identity: {
      label: "The Reliable Workhorse",
      description: "You've built your identity around being excellent at what you're assigned. You take pride in execution and believe that hard work will be recognized. You see your value in what you produce, not in what you influence.",
      impact: "This identity makes you indispensable as a doer — but invisible as a leader. You'll be given more work, but not more responsibility. Your excellence becomes a trap that keeps you exactly where you are."
    },
    strength: {
      label: "Strategic Contributor",
      belief: "My role is to shape direction, not just complete tasks.",
      description: "You balance excellent execution with strategic influence. You don't just do the work — you think about why the work matters and how to make it better. You see the bigger picture while delivering results.",
      howColleaguesSeeYou: "Your colleagues see you as someone who delivers AND thinks strategically. They value your perspective on priorities, not just your output. You're the person who improves how things get done, not just someone who does them.",
      howLeadershipSeesYou: "Senior leaders see you as someone ready for more responsibility. They notice that you think beyond your tasks, anticipate problems, and contribute to direction — all signs of leadership readiness.",
      careerBenefit: "You break free from the 'excellent executor' ceiling. Instead of being rewarded with more work, you're rewarded with more influence. Your combination of reliability and strategic thinking makes you a natural choice for leadership roles."
    },
    perception: {
      low: "Others see you as someone who shapes outcomes, not just completes tasks. They value your strategic thinking as much as your output.",
      medium: "Colleagues value your work but may not see you as a strategic thinker. You're the 'go-to' for execution but not for direction.",
      high: "Others see you as a task-completer, not a leader. They give you more work but not more responsibility or influence."
    },
    perceptionDetails: {
      howColleaguesSeeYou: "Your colleagues see you as incredibly reliable but limited in scope. They know you'll deliver but don't expect you to shape what gets built. You're the person who does, not the person who decides.",
      howLeadershipSeesYou: "Senior leaders see you as valuable but not strategic. They appreciate your output but don't think of you when they need someone to drive direction. You're too good at executing to move into leading.",
      careerImpact: "You're rewarded with more work, not more responsibility. Your excellence keeps you stuck because you're too valuable in your current role to be promoted.",
      whatYouMiss: "You miss the opportunity to shape what gets done, not just how. You forfeit influence over priorities, strategy, and the bigger picture."
    },
    changeActions: [
      "Ask yourself before every task: 'What's the bigger picture here, and how can I shape it?'",
      "Share your perspective on strategy, not just status updates",
      "Push back thoughtfully when you're given work that doesn't align with team priorities",
      "Spend 20% of your energy on visibility and influence, not just execution"
    ],
    coaching: {
      quote: "Excellence without visibility is invisibility. Your work speaks, but it whispers. Learn to make it heard before someone else takes credit for what you built in silence.",
      beliefToChallenge: "I believe my job is to execute well and that hard work will naturally be recognized.",
      discussWithCoach: [
        "Explore where your identity as 'the executor' came from and what it's cost you",
        "Identify situations where you had strategic insight but stayed quiet because 'that wasn't your job'",
        "Discuss the difference between being valuable and being valued — and why one doesn't guarantee the other",
        "Create a plan to contribute strategically, not just tactically, in one meeting this week"
      ],
      newBeliefToAdopt: "Execution is table stakes. Influence comes from shaping what gets executed, not just doing it well."
    },
    benchmarks: {
      low: { label: "Low Leadership Identity", behavior: "Focuses exclusively on completing assigned tasks, never questions priorities, sees their value only in output, believes hard work alone will get them noticed, and avoids strategic conversations." },
      average: { label: "Average Professional", behavior: "Executes well and occasionally offers input on process, may suggest improvements within their scope, speaks up when asked but doesn't volunteer strategic perspective." },
      aboveAverage: { label: "Above Average", behavior: "Balances strong execution with occasional strategic input, starting to think beyond tasks, asks 'why' more often, and beginning to connect work to bigger picture." },
      executive: { label: "Executive Level", behavior: "Balances execution with influence, shapes what gets built not just how, regularly contributes to strategic decisions, and is valued for thinking as much as doing." },
      elite: { label: "Elite Leader", behavior: "Defines the agenda, sets priorities for others, delegates execution while owning outcomes, spends most time on direction and influence, and is sought out for strategic vision." }
    }
  },
  {
    id: "overstepping",
    name: "Overstepping Block",
    belief: "I don't want to cross a line or step on anyone's toes.",
    description: "Fear of conflict or being seen as pushy prevents you from taking necessary initiative.",
    identity: {
      label: "The Careful Observer",
      description: "You've learned to prioritize harmony over impact. You hold back opinions, defer to others, and avoid taking bold positions. You believe that being respectful means being quiet, and that speaking up might create friction you're not prepared to handle.",
      impact: "This identity protects relationships but erodes respect. People begin to see you as someone without strong convictions — pleasant to work with, but not someone who moves things forward. Your agreeableness becomes a liability."
    },
    strength: {
      label: "Courageous Contributor",
      belief: "Speaking up with conviction is how I add value.",
      description: "You understand that healthy conflict leads to better outcomes. You voice your perspective confidently, knowing that respect comes from standing for something — not from agreeing with everything.",
      howColleaguesSeeYou: "Your colleagues see you as someone with backbone. They know where you stand and trust that you'll speak up when it matters. They respect you because you bring real opinions to the table, not just agreement.",
      howLeadershipSeesYou: "Senior leaders see you as someone with conviction and courage. They trust you to challenge ideas constructively and to advocate for the right outcome, even when it's uncomfortable. This is exactly what they look for in future leaders.",
      careerBenefit: "You're included in important decisions because people value your honest perspective. Your willingness to voice dissent makes you indispensable in high-stakes situations, and you build a reputation as someone with integrity and leadership presence."
    },
    perception: {
      low: "Others see you as someone with conviction who speaks up constructively. They trust you to be honest and value your perspective.",
      medium: "Colleagues notice you sometimes hold back. They wish you'd share your real opinions more often instead of staying neutral.",
      high: "Others see you as conflict-averse or without strong opinions. They may stop asking for your input or assume you agree with everything."
    },
    perceptionDetails: {
      howColleaguesSeeYou: "Your colleagues see you as agreeable but without substance. They know you won't rock the boat, but they also don't look to you for honest feedback or strong direction. You're pleasant but forgettable.",
      howLeadershipSeesYou: "Senior leaders see someone who avoids conflict. They wonder if you have the courage to make hard calls, push back on bad ideas, or stand firm under pressure. Leaders need backbone, and they're not sure you have it.",
      careerImpact: "You're overlooked for roles that require difficult conversations or strong positions. Your niceness is seen as weakness, and you're not trusted with high-stakes situations.",
      whatYouMiss: "You miss the chance to shape decisions, stop bad ideas, and build a reputation as someone who stands for something. Others fill the leadership vacuum you leave."
    },
    changeActions: [
      "Practice voicing disagreement in low-stakes situations to build your confidence",
      "Reframe conflict as collaboration — differing perspectives improve outcomes",
      "Set a goal to share one dissenting or challenging viewpoint per week",
      "Remember: people respect those who stand for something, not those who agree with everything"
    ],
    coaching: {
      quote: "Harmony without honesty is just silence wearing a mask. The room doesn't need your agreement — it needs your perspective. Give it, or watch someone else shape the future you'll have to live with.",
      beliefToChallenge: "I believe that speaking up might damage relationships or make me seem pushy or difficult.",
      discussWithCoach: [
        "Examine the cost of your silence — what decisions were made that you disagreed with but didn't challenge?",
        "Explore the origin of your conflict avoidance — is it a learned behavior or a fear of specific consequences?",
        "Discuss the difference between being respected and being liked — and which one advances careers",
        "Practice one difficult conversation this week with your coach's support and feedback"
      ],
      newBeliefToAdopt: "Healthy disagreement is how good decisions are made. Speaking up is a contribution, not a confrontation."
    },
    benchmarks: {
      low: { label: "Low Leadership Identity", behavior: "Avoids conflict at all costs, never voices disagreement, goes along with every decision even when they know it's wrong, and prioritizes being liked over being effective." },
      average: { label: "Average Professional", behavior: "Voices concerns privately but not in group settings, occasionally pushes back when stakes are low, tends to soften feedback to avoid discomfort, and picks battles carefully." },
      aboveAverage: { label: "Above Average", behavior: "Starting to voice concerns in smaller group settings, pushes back more often when confident, learning to separate disagreement from conflict, and building courage over time." },
      executive: { label: "Executive Level", behavior: "Speaks up respectfully but firmly, challenges ideas without attacking people, is known for honest feedback, and builds trust through directness." },
      elite: { label: "Elite Leader", behavior: "Creates psychological safety for others to dissent, welcomes challenge to their own ideas, models productive conflict, and is sought out specifically because they will tell the truth." }
    }
  },
  {
    id: "expertise",
    name: "Expertise Block",
    belief: "I need more expertise first. I don't know enough to lead.",
    description: "You believe you need complete knowledge before you can guide others or make decisions.",
    identity: {
      label: "The Eternal Student",
      description: "You've tied your readiness to lead to your level of knowledge. You believe you need to know more before you can guide others, so you keep learning instead of acting. You see leadership as something you'll earn once you've mastered enough.",
      impact: "This identity creates an endless cycle of preparation. There's always more to learn, so you're never ready. Meanwhile, people with less knowledge but more decisiveness pass you by — not because they're smarter, but because they're willing to lead through uncertainty."
    },
    strength: {
      label: "Decisive Action-Taker",
      belief: "I can lead through uncertainty — perfect knowledge isn't required.",
      description: "You understand that leadership is about direction, not omniscience. You make decisions with the information available, course-correct when needed, and move forward with confidence rather than waiting for certainty that never comes.",
      howColleaguesSeeYou: "Your colleagues see you as decisive and action-oriented. They trust you to make calls and keep things moving, even in ambiguous situations. Your willingness to decide earns their confidence and respect.",
      howLeadershipSeesYou: "Senior leaders see you as someone who can handle uncertainty — a critical leadership trait. They trust you with ambiguous, high-stakes situations because they know you'll make progress rather than getting stuck in analysis.",
      careerBenefit: "You're given opportunities others aren't because you demonstrate the ability to lead without perfect information. Your decisiveness accelerates everything — projects, promotions, and your reputation as someone who gets things done."
    },
    perception: {
      low: "Others see you as decisive and confident. They trust you to lead through ambiguity and make things happen.",
      medium: "Colleagues see you as knowledgeable but sometimes hesitant. They wish you'd make decisions faster with the information available.",
      high: "Others see you as someone who overthinks and delays. Your need for more information holds the team back and frustrates those waiting for direction."
    },
    perceptionDetails: {
      howColleaguesSeeYou: "Your colleagues see you as someone who's always preparing but never ready. They've learned not to wait for you to make decisions because it takes too long. They may respect your knowledge but not your ability to act on it.",
      howLeadershipSeesYou: "Senior leaders see someone who lacks decisiveness. They wonder if you can handle the ambiguity that leadership requires. When they need someone to make a call, they think of people who move forward, not people who need more time.",
      careerImpact: "You're passed over for leadership roles because decision-making is core to leading. Your thoughtfulness is interpreted as indecision, and others get the opportunities that require confidence under uncertainty.",
      whatYouMiss: "You miss the chance to build your reputation as a decisive leader. Every delay reinforces the perception that you're not ready for more responsibility."
    },
    changeActions: [
      "Set a deadline for decisions and stick to it — imperfect action beats perfect inaction",
      "Practice making recommendations with 70% confidence, not 100%",
      "Remind yourself that leaders aren't the smartest in the room — they're the ones who move the room forward",
      "Embrace 'good enough' — your high standards are often higher than necessary"
    ],
    coaching: {
      quote: "Knowledge is not the door to leadership — courage is. You already know enough. What you lack is not expertise, but the willingness to lead before you feel ready.",
      beliefToChallenge: "I believe I need to know more before I'm qualified to guide others or make important decisions.",
      discussWithCoach: [
        "Explore what 'enough expertise' would actually look like — and whether that bar keeps moving",
        "Identify decisions you've delayed waiting for more information and what it cost you",
        "Discuss the difference between competence and confidence — and why the latter matters more for leadership",
        "Create a practice of making one decision this week with only 70% certainty"
      ],
      newBeliefToAdopt: "Leadership is about direction, not omniscience. I can guide others while still learning myself."
    },
    benchmarks: {
      low: { label: "Low Leadership Identity", behavior: "Believes they need complete knowledge before acting, constantly delays decisions to gather more information, defers to 'experts' even when they know enough, and stays stuck in perpetual preparation mode." },
      average: { label: "Average Professional", behavior: "Makes decisions when they feel 80-90% confident, occasionally asks for more time to research, comfortable leading in areas of deep expertise, hesitant in unfamiliar territory." },
      aboveAverage: { label: "Above Average", behavior: "Making decisions with 75% confidence more often, learning to be comfortable with uncertainty, starting to trust their judgment, and building momentum through action." },
      executive: { label: "Executive Level", behavior: "Decides with 70% confidence and course-corrects, comfortable saying 'I don't know but here's what I think', surrounds themselves with experts without abdicating leadership, and moves forward through uncertainty." },
      elite: { label: "Elite Leader", behavior: "Makes decisions with incomplete information as a core skill, teaches others how to lead through ambiguity, is known for decisiveness, and creates clarity from chaos for entire organizations." }
    }
  }
]

// 25 Questions - 5 per block for more comprehensive assessment
export const questions: Question[] = [
  // Personality Block Questions (5)
  {
    id: 1,
    question: "When you picture a leader, what image comes to mind?",
    blockType: "personality",
    options: [
      { text: "Someone charismatic and commanding who naturally takes charge", score: 4 },
      { text: "Someone who speaks up frequently and confidently in meetings", score: 3 },
      { text: "Someone who inspires others, though their style may vary", score: 2 },
      { text: "Someone who makes clear decisions and communicates well", score: 1 },
      { text: "Anyone who can influence outcomes, regardless of their personal style", score: 0 }
    ]
  },
  {
    id: 2,
    question: "How do you feel about leading a discussion in a room full of extroverts?",
    blockType: "personality",
    options: [
      { text: "I'd avoid it entirely — they're more natural leaders than me", score: 4 },
      { text: "I'd feel very out of place and probably stay quiet", score: 3 },
      { text: "I'd feel uncomfortable but might contribute if directly asked", score: 2 },
      { text: "I'd prepare well and find moments to contribute thoughtfully", score: 1 },
      { text: "My leadership style doesn't depend on being the loudest voice", score: 0 }
    ]
  },
  {
    id: 3,
    question: "Someone describes you as 'quiet' in a meeting. How do you interpret this?",
    blockType: "personality",
    options: [
      { text: "Confirmation that I'm not leadership material", score: 4 },
      { text: "A sign that I need to fundamentally change who I am", score: 3 },
      { text: "A sign I should try to force myself to speak more", score: 2 },
      { text: "Neutral feedback — I speak when I have something valuable to add", score: 1 },
      { text: "Irrelevant to my leadership capacity — impact matters more than airtime", score: 0 }
    ]
  },
  {
    id: 4,
    question: "You notice the most outspoken person in a meeting is often wrong. What do you do?",
    blockType: "personality",
    options: [
      { text: "Stay quiet — they have more presence and authority than me", score: 4 },
      { text: "Keep my thoughts to myself but feel frustrated", score: 3 },
      { text: "Mention my concerns privately to someone else later", score: 2 },
      { text: "Gently offer an alternative perspective when there's an opening", score: 1 },
      { text: "Confidently share my view — volume doesn't equal correctness", score: 0 }
    ]
  },
  {
    id: 5,
    question: "How do you feel about networking events or situations that require self-promotion?",
    blockType: "personality",
    options: [
      { text: "I avoid them — I'm not built for that kind of thing", score: 4 },
      { text: "I attend but stay on the edges and leave early", score: 3 },
      { text: "I find them draining but force myself to participate", score: 2 },
      { text: "I focus on genuine conversations rather than selling myself", score: 1 },
      { text: "I've found my own authentic way to build connections", score: 0 }
    ]
  },

  // Title Block Questions (5)
  {
    id: 6,
    question: "You see a problem in your team's process. What do you do?",
    blockType: "title",
    options: [
      { text: "Wait for a manager to notice and address it — it's not my place", score: 4 },
      { text: "Hope someone with more authority will fix it", score: 3 },
      { text: "Mention it casually but don't push for change", score: 2 },
      { text: "Bring it up with potential solutions attached", score: 1 },
      { text: "Take initiative to propose and champion the fix myself", score: 0 }
    ]
  },
  {
    id: 7,
    question: "When do you think you'll be ready to lead?",
    blockType: "title",
    options: [
      { text: "When I get promoted to a formal leadership position", score: 4 },
      { text: "When someone officially puts me in charge of something", score: 3 },
      { text: "When I feel more confident and established in my role", score: 2 },
      { text: "I'm already leading in small ways within my current scope", score: 1 },
      { text: "I can lead right now by influencing what I can control", score: 0 }
    ]
  },
  {
    id: 8,
    question: "A new initiative needs a leader but no one has been assigned. Your response?",
    blockType: "title",
    options: [
      { text: "Wait for leadership to assign someone — that's their job", score: 4 },
      { text: "Hope someone else volunteers so I can support them", score: 3 },
      { text: "Wait to see if anyone steps up, then maybe volunteer", score: 2 },
      { text: "Volunteer if no one else steps up after a reasonable time", score: 1 },
      { text: "Raise my hand immediately — this is exactly the opportunity I look for", score: 0 }
    ]
  },
  {
    id: 9,
    question: "How do you view people who lead without formal authority?",
    blockType: "title",
    options: [
      { text: "They're overstepping — leadership authority comes with the role", score: 4 },
      { text: "It's risky behavior that could backfire on them", score: 3 },
      { text: "It's impressive but not something I feel comfortable doing", score: 2 },
      { text: "It's the right approach, though I don't always do it myself", score: 1 },
      { text: "That's exactly how real leaders operate — they don't wait for permission", score: 0 }
    ]
  },
  {
    id: 10,
    question: "Your manager asks if you'd like to lead an upcoming project. How do you respond internally?",
    blockType: "title",
    options: [
      { text: "Surprised — I didn't think I was being considered for leadership", score: 4 },
      { text: "Nervous — I'm not sure I'm ready for that responsibility yet", score: 3 },
      { text: "Cautiously interested but worried about taking on too much", score: 2 },
      { text: "Excited but wanting to make sure I have what I need to succeed", score: 1 },
      { text: "Ready — I've been preparing for this kind of opportunity", score: 0 }
    ]
  },

  // Execution Block Questions (5)
  {
    id: 11,
    question: "How do you approach your daily work?",
    blockType: "execution",
    options: [
      { text: "Complete my assigned tasks as efficiently as possible — that's my job", score: 4 },
      { text: "Do my work well and help others with theirs when asked", score: 3 },
      { text: "Focus on delivery but occasionally think about process improvements", score: 2 },
      { text: "Look for ways to improve processes while doing my work", score: 1 },
      { text: "Balance execution with shaping the direction of projects", score: 0 }
    ]
  },
  {
    id: 12,
    question: "A project is going off track. Your response?",
    blockType: "execution",
    options: [
      { text: "Focus on my part and make sure I personally deliver it well", score: 4 },
      { text: "Do my part and mention concerns if someone asks directly", score: 3 },
      { text: "Flag the issue to someone with authority to address it", score: 2 },
      { text: "Offer suggestions on how the team could get back on track", score: 1 },
      { text: "Rally the team and take ownership of redirecting the project", score: 0 }
    ]
  },
  {
    id: 13,
    question: "Your manager asks what you'd do differently if you ran the project. How do you respond?",
    blockType: "execution",
    options: [
      { text: "I haven't really thought about it — I just focus on my assigned tasks", score: 4 },
      { text: "I'm not sure — I trust the current approach", score: 3 },
      { text: "Share a small observation but defer to their judgment", score: 2 },
      { text: "Offer a few thoughtful suggestions based on what I've observed", score: 1 },
      { text: "Present a clear perspective with specific changes I'd make and why", score: 0 }
    ]
  },
  {
    id: 14,
    question: "What's your primary focus at work?",
    blockType: "execution",
    options: [
      { text: "Being excellent at what I'm specifically assigned to do", score: 4 },
      { text: "Doing great work and being a reliable team member", score: 3 },
      { text: "Delivering results while being a positive presence", score: 2 },
      { text: "Delivering results while finding ways to add extra value", score: 1 },
      { text: "Influencing what gets done and how it gets done", score: 0 }
    ]
  },
  {
    id: 15,
    question: "In team planning meetings, what role do you typically play?",
    blockType: "execution",
    options: [
      { text: "I listen and wait for my tasks to be assigned", score: 4 },
      { text: "I ask clarifying questions about my part of the work", score: 3 },
      { text: "I contribute ideas when there's space and I feel confident", score: 2 },
      { text: "I actively participate in shaping priorities and approaches", score: 1 },
      { text: "I help drive the agenda and ensure we make good decisions", score: 0 }
    ]
  },

  // Overstepping Block Questions (5)
  {
    id: 16,
    question: "There's an opportunity to lead a new initiative, but it's slightly outside your role. What do you do?",
    blockType: "overstepping",
    options: [
      { text: "Stay in my lane — I don't want to step on anyone's toes", score: 4 },
      { text: "Assume someone else is better positioned to take it on", score: 3 },
      { text: "Wait to see if someone asks me to help", score: 2 },
      { text: "Express interest but defer to others' judgment on who should lead", score: 1 },
      { text: "Volunteer and take responsibility for making it happen", score: 0 }
    ]
  },
  {
    id: 17,
    question: "You disagree with a decision made by someone senior. How do you respond?",
    blockType: "overstepping",
    options: [
      { text: "Keep my opinion to myself — it's not my place to question them", score: 4 },
      { text: "Vent to peers but don't bring it up with decision-makers", score: 3 },
      { text: "Hope someone else will raise the concern", score: 2 },
      { text: "Respectfully share my perspective in private", score: 1 },
      { text: "Voice my concerns constructively with alternative solutions", score: 0 }
    ]
  },
  {
    id: 18,
    question: "A colleague is struggling with something you could help with, but it's not your responsibility. What do you do?",
    blockType: "overstepping",
    options: [
      { text: "Mind my own business — I don't want to intrude or seem presumptuous", score: 4 },
      { text: "Assume they'd ask if they wanted help", score: 3 },
      { text: "Offer help only if they directly ask me for it", score: 2 },
      { text: "Subtly mention I'm available if they need anything", score: 1 },
      { text: "Proactively offer my help — the team succeeds together", score: 0 }
    ]
  },
  {
    id: 19,
    question: "In a meeting, you notice a blind spot in the strategy being discussed. No one else has raised it. What do you do?",
    blockType: "overstepping",
    options: [
      { text: "Stay silent — I'm not the strategy person and shouldn't overstep", score: 4 },
      { text: "Keep quiet but hope someone with more authority notices it", score: 3 },
      { text: "Mention it vaguely so I don't seem like I'm challenging anyone", score: 2 },
      { text: "Raise it as a question rather than a direct concern", score: 1 },
      { text: "Name the issue clearly and suggest how to address it", score: 0 }
    ]
  },
  {
    id: 20,
    question: "How do you feel when you share a strong opinion and someone pushes back?",
    blockType: "overstepping",
    options: [
      { text: "I regret speaking up — I should have kept quiet", score: 4 },
      { text: "Uncomfortable — I tend to back down quickly", score: 3 },
      { text: "A bit defensive but I try to listen", score: 2 },
      { text: "Open to their perspective while maintaining my view", score: 1 },
      { text: "Engaged — healthy debate leads to better outcomes", score: 0 }
    ]
  },

  // Expertise Block Questions (5)
  {
    id: 21,
    question: "You're asked to lead a project in an area where you're not the expert. How do you feel?",
    blockType: "expertise",
    options: [
      { text: "Unqualified — I should decline until I learn more", score: 4 },
      { text: "Anxious — what if people realize I don't have all the answers?", score: 3 },
      { text: "Hesitant — I might not know enough to guide others effectively", score: 2 },
      { text: "Willing — I can learn as I go and leverage others' expertise", score: 1 },
      { text: "Confident — leadership is about direction, not knowing everything", score: 0 }
    ]
  },
  {
    id: 22,
    question: "How comfortable are you making decisions without complete information?",
    blockType: "expertise",
    options: [
      { text: "Very uncomfortable — I need all the facts before I can decide", score: 4 },
      { text: "I strongly prefer to wait until I have more clarity", score: 3 },
      { text: "I prefer more information but can decide if pressured", score: 2 },
      { text: "I can decide with partial information when needed", score: 1 },
      { text: "I'm comfortable — progress with 70% certainty beats waiting for 100%", score: 0 }
    ]
  },
  {
    id: 23,
    question: "Someone asks for your opinion on something you're only partially familiar with. What do you do?",
    blockType: "expertise",
    options: [
      { text: "Decline to comment — I don't know enough to have a valid opinion", score: 4 },
      { text: "Redirect them to someone more knowledgeable", score: 3 },
      { text: "Give a vague answer to avoid being wrong", score: 2 },
      { text: "Share my perspective while noting the limits of my knowledge", score: 1 },
      { text: "Offer a clear point of view based on what I do know", score: 0 }
    ]
  },
  {
    id: 24,
    question: "You're in a room with people who have more experience than you. How does this affect you?",
    blockType: "expertise",
    options: [
      { text: "I defer to them completely — they clearly know more than me", score: 4 },
      { text: "I feel like I shouldn't speak unless I'm certain", score: 3 },
      { text: "I mostly listen and only speak when directly asked", score: 2 },
      { text: "I participate but feel less confident in my contributions", score: 1 },
      { text: "I contribute my perspective — experience isn't the only form of value", score: 0 }
    ]
  },
  {
    id: 25,
    question: "When facing a complex problem with no clear solution, what's your instinct?",
    blockType: "expertise",
    options: [
      { text: "Research extensively until I find the right answer", score: 4 },
      { text: "Consult experts before forming my own view", score: 3 },
      { text: "Gather some information, then tentatively suggest a direction", score: 2 },
      { text: "Form a hypothesis quickly and test it through action", score: 1 },
      { text: "Make a decision with available info and course-correct as I learn", score: 0 }
    ]
  }
]

export function calculateResults(answers: Record<number, number>) {
  const blockScores: Record<string, number> = {
    personality: 0,
    title: 0,
    execution: 0,
    overstepping: 0,
    expertise: 0
  }
  
  questions.forEach(q => {
    if (answers[q.id] !== undefined) {
      blockScores[q.blockType] += answers[q.id]
    }
  })
  
  // Normalize scores (each block has 5 questions, max score per question is 4)
  const maxPerBlock = 20
  const normalizedScores = Object.entries(blockScores).map(([blockId, score]) => ({
    block: blocks.find(b => b.id === blockId)!,
    percentage: Math.round((score / maxPerBlock) * 100),
    score
  }))
  
  // Sort by percentage descending
  normalizedScores.sort((a, b) => b.percentage - a.percentage)
  
  // Calculate leadership score (inverse of block scores)
  const totalBlockPercentage = normalizedScores.reduce((sum, bs) => sum + bs.percentage, 0)
  const avgBlockPercentage = totalBlockPercentage / normalizedScores.length
  const leadershipScore = Math.round(100 - avgBlockPercentage)
  
  return {
    leadershipScore,
    blockScores: normalizedScores
  }
}
