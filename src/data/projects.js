export const featuredProject = {
  slug: 'winterplace',
  type: 'Marketing Strategy · Revenue Modeling',
  title: 'Winterplace Ski Resort',
  headline: 'Marketing Optimization & Revenue Growth Model',
  subtitle:
    'Identifying the most effective marketing channels and recommending a more profitable budget allocation.',
  description:
    'Through channel performance analysis, I found a key insight: social media was outperforming all other channels despite receiving the lowest budget allocation. I built revenue models with sensitivity analysis to test reallocation scenarios, then recommended a $200K budget shift to LinkedIn to diversify spend and maximize ROI.',
  tools:
    'Excel · Revenue Modeling · Sensitivity Analysis · Market Research · Channel Performance Analysis',
  impact:
    'Up to $1.6M in projected incremental revenue through a hybrid investment strategy.',
  image: '/images/projects/winterplace.jpg',
  link: '/projects/winterplace'
}

export const otherProjects = [
  {
    slug: 'programmatic-cutover',
    type: 'Programmatic Media · Forecasting',
    title: 'Programmatic Placement Cutover Sheet',
    subtitle: 'Automated daily cost planning & publisher allocation model',
    description:
      'A three-layer scoring model that converts publisher-level offer allocation into placement-level plans across NAF, DV360, Yahoo DSP, Dianomi, and Xandr — using normalized revenue, GPM, and eCPA scores to guide ramp, pause, and test decisions.',
    impact: '~10% GPM improvement, ≈ $50K monthly impact',
    image: '/images/projects/programmatic.jpg',
    link: '/projects/programmatic-cutover'
  },
  {
    slug: 'publisher-trend-analysis',
    type: 'Performance Analysis · Reporting',
    title: 'Month-over-Month Publisher Trend Analysis',
    subtitle: 'Publisher & placement performance recommendations',
    description:
      'Analyzed month-over-month shifts across Impressions, CTR, RPM, eCPA, and GPM to surface which publishers should be ramped, slowed, paused, or tested — connecting performance changes to clear business actions.',
    impact: 'Faster network moves, fewer reactive decisions',
    image: '/images/projects/trend-analysis.jpg',
    link: '/projects/publisher-trend-analysis'
  },
  {
    slug: 'pf-master',
    type: 'Dashboarding · Reporting Automation',
    title: 'PF Master Reporting Dashboard',
    subtitle: 'Centralized performance reporting across 30+ publishers',
    description:
      'A single Excel report that consolidates Tableau data across 30+ publishers, with offer overviews, lineup views, manual cost ingestion, placement-level notes, and first-vs-third-party discrepancy checks.',
    impact: '~30% operational efficiency gain',
    image: '/images/projects/pf-master.jpg',
    link: '/projects/pf-master'
  },
  {
    slug: 'glean-planner',
    type: 'AI Workflow · Productivity',
    title: 'Glean Daily Action Planner',
    subtitle: 'AI-powered task prioritization workflow',
    description:
      'A Glean agent that searches across Email, Slack, Jira, Airtable, and Confluence to surface urgent items, blockers, and revenue-impacting tasks — then returns a prioritized daily summary directly in Slack.',
    impact: 'Less context switching, sharper daily focus',
    image: '/images/projects/glean-planner.jpg',
    link: '/projects/glean-planner'
  },
  {
    slug: 'ai-rewriter',
    type: 'AI Communication · Stakeholder Management',
    title: 'AI Stakeholder Update Rewriter',
    subtitle: 'Audience-based communication agent',
    description:
      'Takes a rough draft update and rewrites it for the target audience — executive summary, Media Buyer note, Manager update, client-facing explanation, or escalation note.',
    impact: 'Faster, clearer, more consistent communication',
    image: '/images/projects/ai-rewriter.jpg',
    link: '/projects/ai-rewriter'
  }
]

export function getAllProjects() {
  return [featuredProject, ...otherProjects]
}

export function getProjectCard(slug) {
  return getAllProjects().find((p) => p.slug === slug)
}
