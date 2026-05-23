# Content source (authoring reference)

> **Not bundled in the app.** Long-form copy and project narratives used to map content into `src/data/*` and `src/projects/*`.
>
> - **Priority:** explicit user instructions in chat override this file.
> - **When to update:** on content-change requests, keep this file in sync as the mapping reference unless the user specifies different copy.
> - **Runtime source of truth:** `src/data/*` (homepage) and `src/projects/*` (case studies).

---

# **Samples of Portpolios want to follow:** [**https://dang10012000.github.io/Portfolio/**](https://dang10012000.github.io/Portfolio/) 

# **Portfolio Homepage**

## **Hero Section** (new - 2026 redesign)

**Component:** `src/components/Hero.jsx` · **Background:** `<picture>` element with 8 responsive variants from `public/hero-banners/` · **Theme:** charcoal `#1a1a1a` + bronze gold `#c5a47e`

**Kicker:** `Portfolio · 2026` (monospace, bronze, wide letter-spacing)
**Heading:** `Jenny` / `Tang.` (the second word italic + bronze accent - Cormorant Garamond display font)
**Subtitle:** Derived from `profile.role`, with ` · ` separators rendered as ` | ` - i.e. *Media Operations Analyst | Marketing Analytics | Programmatic Optimization | AI Workflow Automation*
**CTA:** `View Projects →` (outline → fills bronze on hover; scrolls to `#work`)

---

## **Hero Section** (legacy mapping)

**Jenny Tang**  
**Media Operations Analyst | Marketing Analytics | Programmatic Optimization | AI Workflow Automation**

I help teams turn complex media performance data into clear business decisions. I am curious, a fast learner, and always excited to learn new things and connect with new people. I enjoy understanding how a business works, identifying complex problems, and using data, creativity, and strategic thinking to help the business solve challenges and grow. My experience spans media operations, business analytics, campaign optimization, reporting automation, and stakeholder management across fintech, financial services, Web3, education, and retail.

Currently, I support ads performance management in the Personal Finance vertical at Gen Digital, working across major banking clients such as Capital One, Wells Fargo, E\*TRADE, Bank of America, SoFi, Truist, and Axos. My work focuses on forecasting, performance reporting, budget pacing, publisher optimization, and network strategy across 30+ publishers and multiple paid media channels.

Resume: [https://docs.google.com/document/d/1RR1YLr08lzdM\_jTmuyGd1mDZOwWY0IBL/edit](https://docs.google.com/document/d/1RR1YLr08lzdM_jTmuyGd1mDZOwWY0IBL/edit)  
Linkedin: [https://www.linkedin.com/in/jenny-tang-26000tbird/](https://www.linkedin.com/in/jenny-tang-26000tbird/) 

Github: 

## **Impact Highlights**

* Supported roughly **$3–4M in monthly ad spend** across Personal Finance campaigns.  
* Contributed to **GBR’s record-high $10M revenue in Q1 2026** while maintaining **58–60% GPM**. (GBR is GoBankingRates and now integrated into MoneyLion under Gen Digital)  
* Helped drive a **$400K monthly revenue lift** through full-funnel campaign optimization for CPC and CPA offers in October 2025  
* Improved operational efficiency by **30–60%** through Excel automation, Tableau reporting, and AI-assisted workflows. (AI Project belows)  
* Built PF Master reporting used across **30+ publishers**, including Google, Facebook, CNN, NAF, DV360, Yahoo DSP, Dianomi, Xandr, AOL, and endemic publishers, providing insightful results from complex datasets for internal and external stakeholders for daily network optimization  
* Developed AI-assisted workflows that reduced monthly retro prep time from **1–2 days to \~15 minutes**.

# **About Me**

I bring four years of experience across business operations, media operations, marketing analytics, and data-driven growth strategy. I enjoy working at the intersection of data, business strategy, and execution \-- especially when the work directly helps teams grow revenue, improve efficiency, and make faster decisions.

One of my strongest skills is building tools and processes from the ground up. In my current role, I noticed many workflows were manual, fragmented, and difficult to scale, so I created dashboards, trackers, and AI-assisted workflows that helped the team monitor performance, identify risks, and optimize campaigns faster.

My work combines analytical depth, problem-solving, stakeholder partnership, and a strong understanding of paid media and financial services performance marketing. I’m especially interested in projects where data is not only used to report performance, but to shape the strategy behind revenue growth.

---

# **Project 1: Winterplace Ski Resort**

## **Marketing Optimization & Revenue Growth Model**

**Project Type:** Marketing Strategy, Revenue Modeling, Budget Optimization  
**Tools / Skills:** Excel, Revenue Modeling, Sensitivity Analysis, Market Research, Channel Performance Analysis

### **Overview**

This project focused on identifying the most effective marketing channels for Winterplace Ski Resort and recommending a more profitable budget allocation strategy. Through channel performance analysis, I found the key insight: **social media was outperforming all other channels despite receiving the lowest budget allocation**.

### **Business Problem**

Winterplace was investing across multiple marketing channels, but the budget was not fully aligned with actual performance. The challenge was to understand which channels were driving the highest return and how the team could reallocate spend to maximize revenue.

### **Approach**

I analyzed channel performance, compared ROI across different marketing investments, and built revenue models to test different budget allocation scenarios. I also used sensitivity analysis to estimate the potential revenue impact if Winterplace shifted more budget toward higher-performing channels.

### **Key Recommendation**

I recommended a **$200K budget shift to LinkedIn** to diversify channel spend, maximize ROI, and support stronger revenue growth.

### **Impact**

The model projected up to **$1.6M in incremental revenue** through a hybrid investment strategy. This project showed how data-driven budget allocation can uncover hidden growth opportunities and help leadership make more confident marketing decisions.

---

# **Project 2: Programmatic Placement Cutover Sheet**

## **Automated Daily Cost Planning & Publisher Allocation Model**

**Project Type:** Programmatic Media Optimization, Budget Allocation, Forecasting  
**Tools / Skills:** Excel, Tableau Data, Yield Plan, Forecasting, Scoring Model, Programmatic Media, Publisher Optimization

### **Overview**

The Programmatic Placement Cutover Sheet was built to create a new-month programmatic traffic plan using the Yield Plan and the last 30 days of historical performance data. The goal was to convert publisher-level offer allocation into a detailed placement-level plan that helps Media Ops and Media Buyers decide where to ramp, slow, pause, or test traffic.

This project focused on programmatic publishers such as **NAF, DV360, Yahoo DSP, Dianomi, and Xandr**, with a planning budget of roughly **$500K–$600K**.

### **Business Problem**

Before this project, programmatic cost planning was highly manual. The team needed to decide how much budget should go to each placement, but performance varied widely by publisher, offer, and placement. Some placements had strong revenue but weak GPM, while others had low eCPA but limited scale. Without a structured model, it was difficult to balance revenue growth, client KPI, and profitability.

### **How the Sheet Works**

The model works in three layers:

### **1\. Placement Breakdown by Publisher**

The first layer identifies how much allocation each offer is expected to run across different placements within each publisher. This helps estimate planned revenue and cost at the placement level.

### **2\. Offer Allocation at Publisher Level**

The second layer summarizes how much each offer is expected to run on each publisher based on the Yield Plan and recent performance. This provides a publisher-level view of estimated revenue, cost, conversions, and pacing.

### **3\. Placement Allocation Within Each Publisher \+ Offer**

The third layer breaks publisher-level allocation down into individual placements. Each placement is scored against other placements in the same publisher \+ offer group using historical data.

### **Scoring Logic**

Each placement receives three normalized scores from 0 to 1:

**Revenue Score:** Measures how much revenue the placement generated compared with other placements in the same publisher \+ offer group. Higher revenue receives a higher score, while placements with zero revenue receive the lowest score.

**GPM Score:** Measures profitability by comparing the placement’s historical GPM against the group range and monthly target GPM. Placements closer to or above target score better.

**Performance Score / eCPA Score:** Measures efficiency against the client KPI. Lower eCPA is better, so placements below or close to KPI receive stronger scores. Placements with zero eCPA due to no conversions are treated as low quality to avoid false positives.

### **Final Placement Weight**

The final placement weight is calculated using:

**Placement Weight \= Revenue Weight × Revenue Score \+ Performance Weight × eCPA Score \+ GPM Weight × GPM Score**

The weights can be adjusted depending on the monthly business priority, such as scale, efficiency, or margin protection.

### **Output**

Once the placement weight is calculated, the sheet projects:

* Planned daily revenue by placement  
* Monthly revenue  
* Monthly cost  
* Projected conversions  
* Estimated GPM  
* Risk status: okay, watch, or risk

### **Impact**

This project helped the team set up traffic more strategically at the beginning of the month instead of reacting after performance issues appeared. It reduced overspending on placements that could not scale profitably and supported a projected **10% GPM improvement**, equal to roughly **$50K in monthly impact**.

---

# **Project 3: Month-over-Month Publisher Trend Analysis**

## **Publisher & Placement Performance Recommendations**

**Project Type:** Performance Analysis, Trend Reporting, Optimization Strategy  
**Tools / Skills:** Tableau, Excel, Publisher Analysis, Revenue Trend Analysis, KPI Reporting

### **Overview**

This project focused on analyzing month-over-month trends across publishers and placements to identify performance shifts and recommend optimization actions.

### **Business Problem**

The team needed a faster way to understand which publishers were improving, declining, or creating risk. Publisher performance could shift month to month due to traffic quality, offer changes, creative changes, placement setup, APY updates, or budget allocation.

### **Metrics Analyzed**

The analysis focused on:

* Impressions  
* Clicks  
* CTR  
* C2C  
* Revenue  
* Conversions  
* RPM  
* eCPA  
* Bank CPM  
* GPM

### **Approach**

I compared publisher and placement performance across current month, previous month, and historical trends. I looked for patterns such as revenue growth, declining conversion quality, rising eCPA, weaker RPM, or shifts in traffic volume.

### **Output**

The final report provided recommendations such as:

* Which publishers should be ramped  
* Which placements should be slowed or paused  
* Which offers should be moved higher in the lineup  
* Which publishers needed further testing  
* Which traffic sources showed efficiency risk

### **Impact**

The report helped Media Ops and Media Buyers make faster network moves and connect performance changes to business actions, instead of only reviewing raw numbers.

---

# **Project 4: PF Master Reporting Dashboard**

## **Centralized Performance Reporting Across 30+ Publishers**

**Project Type:** Dashboarding, Reporting Automation, Media Operations, Data Quality  
**Tools / Skills:** Excel, Tableau Data, Reporting Automation, Publisher Optimization, Data QA

### **Overview**

The PF Master report was built to centralize Personal Finance performance data across 30+ publishers and multiple offers. Before this project, the team had to pull Tableau data and update separate reports for individual publishers, which was manual, time-consuming, and difficult to scale.

I built one centralized Excel report where the team could pull Tableau data once and automatically update multiple reporting views.

### **Key Features**

### **Offer Overview**

I created an offer overview section to track active offers, performance trends, APY changes, promo Okkk changes, and how those changes impacted revenue, conversions, and GPM.

For example, if an offer changed its APY or promo messaging, the team could quickly compare performance before and after the change.

### **Publisher & Offer Lineup View**

I added an offer lineup view under each publisher sheet so the team could easily see which offers were running on each publisher.

For example, for Google, the team could review the current offer lineup and compare it with performance by offer. Based on RPM, revenue, conversions, and GPM, the team could decide whether to keep the lineup, move an offer higher, pause an offer, or replace it.

### **Manual Cost Ingestion**

Some publisher costs were not automatically available in Tableau. For example, DV360 cost could show as zero in Tableau and had to be pulled manually from the platform.

I added a cost ingestion section where the team could input manual platform costs and connect them back to revenue and GPM calculations. This made the report more accurate for pacing and profitability decisions.

### **Placement-Level Management Notes**

At the placement level, I listed all placements under each offer and added notes on how each placement was being managed. For example:

* QL on/off  
* SS  
* Backfill  
* Row 1 / Row 2  
* Paused  
* Testing  
* Ramping

This helped the team understand not only performance, but also the operational setup behind performance.

### **First-Party vs. Third-Party Discrepancy Check**

I added discrepancy checks to catch abnormal traffic issues. For example, when AOL was testing a landing page, there was a large spike in click traffic that looked bot-like because first-party and third-party clicks were not matching.

Since CPC offers like E\*TRADE are highly sensitive to click quality, I flagged the issue quickly so the team could investigate and turn off affected traffic before it caused more budget waste.

### **Impact**

The PF Master report became a daily reference for the team. It helped centralize performance across 30+ publishers and multiple offers, reduced manual reporting work, and improved operational efficiency by around **30%**.

Instead of checking multiple Tableau views, separate publisher files, and platform cost reports, stakeholders could use one report to review performance, track offer changes, monitor cost, check lineups, and make faster decisions on ramping, pausing, or reallocating traffic.

---

# **Project 5: Glean Daily Action Planner**

## **AI-Powered Task Prioritization Workflow**

**Project Type:** AI Workflow Automation, Productivity, Task Prioritization  
**Tools / Skills:** Glean AI, Slack, Jira, Airtable, Confluence, Email, Workflow Design

### **Overview**

The Daily Action Planner was designed to help prioritize daily work across multiple platforms. In Media Ops, priorities can change quickly because offers pause, KPIs change, Tableau data is delayed, traffic spikes, or publishers need urgent updates.

The goal was to use Glean to search across work platforms and return a prioritized task list directly in Slack.

### **Workflow**

The AI Agent searches across:

* Email  
* Slack  
* Jira  
* Airtable  
* Confluence  
* Historical work notes

It then identifies:

* Urgent items  
* Blocked tasks  
* Follow-ups  
* Open requests  
* Tasks tied to revenue, budget, or performance risk  
* Lower-priority items that can wait

### **Output**

The agent returns a daily Slack summary with:

* Top priority tasks  
* Why each task matters  
* Suggested next steps  
* Related owner or stakeholder  
* Any blockers or dependencies

### **Example Use Case**

If a CPC offer is pacing too hot, a publisher cost is missing, or a client KPI changes, the Daily Action Planner can surface that as a high-priority task. Lower-risk items, such as documentation updates or non-urgent reporting improvements, can be moved below revenue-impacting tasks.

### **Impact**

This workflow helps reduce time spent searching across systems and improves daily prioritization. It helps the team focus on the most important work first, especially tasks tied to revenue, GPM, budget risk, and stakeholder deadlines.

---

# **Project 6: AI Stakeholder Update Rewriter**

## **Audience-Based Communication Agent**

**Project Type:** AI Communication Workflow, Stakeholder Management, Reporting Support  
**Tools / Skills:** Glean AI, Prompt Design, Stakeholder Communication, Executive Summaries

### **Overview**

This AI Agent helps turn rough draft updates into polished stakeholder-ready messages. The user inputs a draft update and selects the target audience, such as executive leadership, Media Buyers, Account Strategy, Yield, or internal teammates.

The agent then rewrites the message based on audience, tone, level of detail, and business context.

### **Business Problem**

In Media Ops, the same update often needs to be communicated differently depending on the audience. A Media Buyer may need tactical details about traffic movement, while a manager may need a concise summary of business impact, risk, and next steps.

Manually rewriting each update can take time and create inconsistencies.

### **How It Works**

The agent takes:

* Rough draft update  
* Target audience  
* Desired tone  
* Key business context  
* Required next steps

Then it rewrites the content into a clearer format.

### **Example Output Types**

* Executive summary  
* Slack update  
* Media Buyer action note  
* Manager update  
* Client-facing explanation  
* Retro summary  
* Issue escalation note

### **Impact**

This agent improves communication speed and clarity. It helps convert messy notes into clean business updates, reduces back-and-forth, and ensures each stakeholder receives the right level of information.

**Detail page extras (post-launch):** click-to-zoom lightbox on the two demo screenshots (`public/images/agents/ai-rewriter-input.png` & `…-output.png`); live `AiRewriterDashboard.tsx` embedded via `EmbedSlot`.

---

# **Project 7: Monthly Media Ops Retro Analyst**

## **Auto-generated Monthly Publisher Retro with Wins, Misses & Actions**

**Project Type:** AI Agent, Reporting Automation, Senior-Analyst-Grade Writeup
**Tools / Skills:** AI Agent Design, Performance Analysis, YTD Ranking Logic, Action Planning

### **The Problem**

Writing a monthly publisher cutover retro manually takes ~2 hours of pulling data across spreadsheets, ranking performance, and writing up insights - and the quality varies depending on who does it.

### **What the Agent Does**

The agent ingests two files (12-month publisher history + offer-by-publisher data for the target month), then automatically ranks each publisher's revenue against their YTD history, computes GPM / eCPA / funding / bank CPM trends, flags anyone under $20K as sub-scale, and produces a structured retro table with wins, misses, and action plans that logically follow from the data. It also surfaces scalable offer-level callouts - the kind of insight that usually gets buried in a pivot table.

### **Rules Baked In**

* Revenue is only a "win" if it's top-3 YTD for that publisher.
* eCPA isn't over-indexed for obvious CPA offers.
* High bank CPM → placement cleanup; strong funding + healthy GPM → scale; negative margin → pause.
* Sub-$20K rows are flagged separately so they don't pollute the headline retro.

### **Pipeline (5 Steps)**

1. Load publisher history (12-month revenue, GPM, eCPA, funding, bank CPM).
2. Load offer data (offer-by-publisher table for the target month).
3. Compute YTD rankings (each publisher's month vs. its own YTD history).
4. Generate retro (auto-write wins, misses & action plans from the data).
5. Flag sub-$20K rows separately.

### **Three Tabs of Output**

* **Retro Output** - publisher-by-publisher table with auto-generated wins, misses, action plans; sub-$20K flags; 8 offer-level callouts.
* **Publisher Trends** - 12-month revenue bars + GPM line per publisher; all-publishers overlay.
* **MoM Compare** - March → April comparison table with deltas + color-coded badges.

### **Impact**

Replaces ~2 hours of manual monthly retro work with a senior-analyst-grade write-up produced in seconds. Logic, ranking, and write-up structure mirror what runs against real media ops retros.

**Note:** All data shown in the demo is sample / mock data created for testing the agent.

---

# **Education** (section below Impact)

**Anchor:** `#education` · **Component:** `src/components/Education.jsx` · **Data:** `src/data/education.js`

Reverse-chronological list of graduate programs:

1. **Arizona State University, Thunderbird School of Global Management** - Master of Global Management; Global Digital Transformation. Phoenix, AZ · December 2024 · GPA 4.0/4.0. Honors: Thunderbird Alumni Scholarship; Thunderbird Southeast Asia Scholarship.
2. **National Taiwan University of Science and Technology** - Master of Business Administration; Industrial Management. Taipei, Taiwan · January 2021 · GPA 3.9/4.3. Honors: Full-ride scholarship from NTUST.

---

# **Work Experience** (section below Education)

**Anchor:** `#experience` · **Component:** `src/components/Experience.jsx` · **Data:** `src/data/experience.js`

Resume bullets are merged into flowing paragraphs (per user request - *"em remove bullet point đi là được"*).

### Gen Digital, Inc. - Media Operations Analyst
Tempe, AZ · May 2025 – Present

Optimized full-funnel campaign performance across 30+ publishers and 35+ audience segments by analyzing ROAS, CPO, %ATC, %CTR, %C2C, conversion, revenue, and %GPM; refined SOV to profitable publisher placements, testing thresholds, and traffic allocation across CPC and CPA offers - contributing to a 5–10% return and $400K in monthly revenue lift.

Delivered GBR's record-high revenue of $10M in Q1 2026 while maintaining 58–60% GPM by developing a data-driven budget allocation and pacing strategy across GoBankingRates, CNN, SEM/Google, paid social/Facebook, programmatic platforms, and endemic publishers using historical performance, seasonality trends, and benchmark normalization.

Leveraged AI automation tools (Glean, Copilot, Claude), Excel, and Tableau to automate campaign reporting and performance analysis - improving operational efficiency by 30%, reducing reporting time by 60%, and accelerating optimization against client KPIs and monetization targets.

Supported closing an $800K monthly revenue gap across CPA offers - including SoFi, Truist, Axos, and Bank of America - by resolving ETL-related data delays, coordinating traffic execution, and leading A/B testing on landing pages and APY-driven messaging.

**Banking clients:** Capital One · Wells Fargo · Bank of America · E*TRADE · Betterment · Gainbridge · SoFi · Axos · Truist · Robinhood
**Partners / channels:** Google · Bing · CNN · Facebook · NAF · Yahoo DSP · DV360 · Xandr · MSN · Dianomi · AOL · select SME publishers

### Arizona State University, Thunderbird School of Global Management - Business Operations Analyst
Tempe, AZ · May 2024 – May 2025

Automated transcript processing through OnBase, AI Raptor, and Salesforce - supporting a 30% process improvement while maintaining data integrity. Collaborated cross-functionally to train student workers and improve CRM adoption using data-join techniques for smoother backend-to-frontend integration.

### PlusBlocks Technology L.L.C. - Business Analyst
AI-driven Web3 entertainment platform · Nov 2021 – May 2023

Led market development in Southeast Asia, cultivating relationships with over 1,000 key opinion leaders, guilds, and communities - growing the user base to more than 100,000 in 11 months while maintaining referral costs at $5 per KYC user.

Led an end-to-end partnership project; cross-functional collaboration with Product Development and UI/UX teams to build an ICO/INO/Airdrop platform using Salesforce and SAP - secured the first INO partner, adding 10,000 new users and generating $700,000 in INO funding.

Generated new revenue streams by offering marketing services and tournament hosting for partners, and developed the company's first marketing-agency fee structure to support executive decision-making.

---

# **Project 8: CPA Lineup Intelligence Agent**

**Anchor:** `/projects/cpa-lineup` · **Component:** `src/projects/CpaLineupProject.jsx` · **Embed:** `src/embeds/CpaLineupDashboard.tsx`

## **Auto-surface winners, scale opportunities, and waste across 433 placement-offer combos**

**Scope:** 26 publishers · 6 offers · 433 placement-offer combinations.

### **The problem**

With 433 placement-offer combinations across 26 publishers and 6 offers, deciding what to prioritize, what to cut, and where to shift traffic means digging through spreadsheets, comparing RPMs, eyeballing conversion rates, and trusting gut feel. That is slow, error-prone, and leaves money on the table - running traffic through low-RPM combos while high-performing ones stay underserved.

### **How the AI agent solves it**

1. **Auto-surfaces what matters.** Scans every combo and flags high-RPM winners (MyPoints × Synchrony CD at $1,260 RPM), scale opportunities (strong C2C with low volume), and waste spots (CNN placements at 50M+ impressions with near-zero return).
2. **Builds the lineup for you.** Generates a prioritized lineup sorted by RPM with action tags (MAX PRIORITY / PRIORITIZE / MAINTAIN / TEST MORE).
3. **Answers ad-hoc questions on demand.** The Ask AI tab takes natural-language queries ("what is my best offer for Benzinga?") and returns analyst-style answers grounded in the live data.

### **Impact**

- **Scale revenue.** Top 10 combos run at $30 - $1,260 RPM but carry only a fraction of impression volume. Shifting 10 - 15% of traffic from low-RPM placements into these winners can 2 - 3x revenue output from the same impression pool.
- **Reduce cost.** Hundreds of millions of impressions still flow through combos returning $0.01 - $0.17 RPM or zero conversions - CNN Mobile-Web-Partner-Bin alone burned 148M+ impressions. Identifying and pausing these recovers ad-serving cost and frees budget.
- **Net effect.** Not spending more - spending smarter. Every dollar and impression works harder; "data in spreadsheet" → "actionable lineup decision" goes from hours to seconds.

**Note:** Data in the live dashboard is sample/mock structured to mirror real publisher-offer performance. The Ask AI tab calls `api.anthropic.com` directly without auth - request fails in production; filters/KPIs/charts/ranked lineup all run client-side and work standalone.

---

# **Personal Interest** (section between About and Projects)

**Anchor:** `#personal` · **Component:** `src/components/PersonalInterest.jsx` · **Data:** `src/data/personal.js`

**Eyebrow:** Personal Interest  
**Heading:** A little more about me - outside of work.

**Paragraph 1:**

Something fun about me is I love exploring new places and new cultures. I've traveled to more than 10 countries and over 12 states in the U.S., and every trip makes me more curious about people, food, and how different cultures work. I speak Vietnamese, English, and basic Chinese, and I think that helps me connect with people from different backgrounds more easily.

**Paragraph 2:**

Outside of work, I love cooking, traveling, designing things, and making handmade crafts. I think that creative side helps balance my analytical side because I enjoy both working with data and creating something from scratch.

**Images:** Pinterest-style masonry wall built from `public/images/personal/personal_1.jpeg` … `personal_6.jpeg`. CSS `column-count: 3 / 2 / 1` responsive; hover scales image to 1.05.

---

# **Suggested Website Layout**

## **Homepage Sections**

1. **Hero / About Me**  
   Short intro, role, and value proposition.  
2. **Impact Metrics**  
   Use numbers like $10M Q1 revenue, 58–60% GPM, $400K revenue lift, 30+ publishers, 60% reporting-time reduction.  
3. **About + Skills**  
   Group skills by Analytics, BI Tools, Media Platforms, AI Automation, Business Strategy.  
4. **Personal Interest**  
   Personal copy + Pinterest-style masonry of 6 photos (see `Personal Interest` block below).  
5. **Featured Projects**  
   Show 1 featured + 6 grid cards (7 total). Each card uses an animated banner from `public/banners/<slug>.html`.  
6. **Contact / Resume**  
   Add resume download and LinkedIn link.

---

# **Project Card Format**

You can use this short format for each project preview:

**Project Name**  
One-line description.

**Problem:** What business problem existed?  
**Solution:** What you built or analyzed.  
**Tools:** Excel, Tableau, Glean, Salesforce, etc.  
**Impact:** Revenue, efficiency, accuracy, GPM, time saved.

---

# **Suggested Portfolio Tagline Options**

**Option 1:**  
Turning messy media data into revenue-driving decisions.

**Option 2:**  
Building reporting, automation, and optimization workflows that help teams grow revenue faster.

**Option 3:**  
Media analytics, programmatic optimization, and AI automation for smarter business decisions.

**Option 4:**  
I build data tools that help teams see what matters, act faster, and scale profitably.

---

For the website, avoid uploading internal dashboards, raw data, client screenshots, or confidential publisher details. Use mockups, anonymized screenshots, or simplified sample visuals that show your logic without exposing company data.

