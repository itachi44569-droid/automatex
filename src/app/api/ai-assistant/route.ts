import { NextRequest, NextResponse } from "next/server";

// Industry-matched response library — no API key required
const RESPONSES: Array<{ keywords: string[]; response: string }> = [
  {
    keywords: ["ecommerce", "e-commerce", "online store", "shopify", "shop", "orders", "products", "inventory", "woocommerce"],
    response: `Great — e-commerce is one of the highest-ROI automation opportunities. Here's your personalised roadmap:

**🚀 Quick Wins (Week 1-2)**
• **Abandoned Cart Recovery** — Automate 3-email sequences (1hr, 24hr, 72hr) via Klaviyo. Average recovery rate: 15-25% of lost carts. Estimated extra revenue: $2K–$8K/month
• **Order Confirmation & Shipping Alerts** — Auto-trigger SMS + email on purchase, shipment, and delivery. Reduces "where's my order?" support tickets by ~60%
• **Inventory Threshold Alerts** — Auto-notify your supplier when stock drops below X units. Eliminates manual stock-checking

**⚙️ Medium Term (Month 1-2)**
• **Customer Segmentation** — AI tags customers by purchase history (VIP, at-risk, first-time). Send targeted campaigns to each segment
• **Review Request Automation** — Auto-send review request 7 days post-delivery. Boosts review volume 3-4×
• **Return & Refund Workflow** — Automate return label generation + refund processing. Saves 2-3 hrs/day for small teams

**🧠 Strategic AI (Month 3+)**
• **AI Product Recommendations** — GPT-powered "customers also bought" on your site. Increases average order value 18-35%
• **Dynamic Pricing** — Monitor competitor pricing and auto-adjust yours within set rules
• **AI Customer Support Chatbot** — Handles 70-80% of support queries (order status, returns, FAQs) without human intervention

**Tools we recommend:** Klaviyo, Make.com, Shopify Flow, Gorgias, Tidio
**Estimated time saved:** 15-20 hrs/week
**Typical ROI:** 300-600% within 6 months`,
  },
  {
    keywords: ["real estate", "property", "realtor", "agent", "leads", "listings", "housing", "mortgage", "rental"],
    response: `Real estate agencies are leaving massive efficiency gains on the table. Here's exactly what to automate:

**🚀 Quick Wins (Week 1-2)**
• **Lead Response Automation** — New leads get an instant personalised text + email within 60 seconds (vs. industry average of 47 hours). This alone increases conversion by 391%
• **Follow-Up Sequences** — 12-touch nurture sequence over 90 days for cold leads. Most deals close on touch 5-12, which agents never reach manually
• **Listing Alert Emails** — Auto-email matched buyers when a new listing hits your criteria. Keeps you top-of-mind without lifting a finger

**⚙️ Medium Term (Month 1-2)**
• **CRM Data Entry Elimination** — Auto-sync leads from Zillow, Realtor.com, Facebook Ads directly into your CRM with tagged source and property interest
• **Appointment Scheduling** — Self-booking links sent automatically after first contact. Eliminates 80% of back-and-forth scheduling calls
• **Past Client Re-engagement** — AI identifies clients approaching their 2-3 year anniversary (prime re-sale window) and triggers personalised outreach

**🧠 Strategic AI (Month 3+)**
• **AI Market Reports** — Auto-generate personalised neighbourhood market reports for prospects based on their saved searches
• **Predictive Lead Scoring** — AI scores each lead 1-100 based on engagement, budget signals, and behaviour. Your agents focus only on hot leads
• **AI Chatbot on Listings** — Answers property questions 24/7, books viewings, qualifies buyers

**Tools we recommend:** Follow Up Boss, LionDesk, Make.com, Calendly, ChatGPT API
**Estimated time saved:** 20-25 hrs/agent/week
**Typical ROI:** Your agents can handle 2× the clients`,
  },
  {
    keywords: ["saas", "software", "app", "subscription", "churn", "onboarding", "users", "product", "b2b", "platform", "startup"],
    response: `SaaS companies have some of the best automation opportunities. Here's a prioritised playbook:

**🚀 Quick Wins (Week 1-2)**
• **Automated Onboarding Sequences** — 14-day email + in-app drip based on user actions. Reduces time-to-value and increases 30-day retention by 25-40%
• **Failed Payment Recovery** — Auto-retry logic + dunning email sequence recovers 30-50% of failed payments. Often $10K+/month in recovered MRR
• **Trial-to-Paid Conversion Flow** — Score trial users by engagement (logins, features used, team invites) and trigger targeted upgrade offers for high-intent users

**⚙️ Medium Term (Month 1-2)**
• **Churn Prediction & Intervention** — AI flags accounts showing churn signals (declining logins, support tickets, feature abandonment). Auto-trigger a CS check-in before they cancel
• **NPS + Feedback Automation** — Send NPS at day 30, 90, and post-support. Route promoters to leave G2/Capterra reviews. Route detractors to your CS team instantly
• **Usage-Based Upsell Triggers** — When a user hits 80% of their plan limit, auto-send a personalised upgrade prompt with ROI data

**🧠 Strategic AI (Month 3+)**
• **AI Support Chatbot** — Resolves 60-70% of Tier-1 support tickets with zero human touch
• **AI Feature Recommendations** — Analyse usage patterns and surface underused features for each user
• **Automated Competitive Intelligence** — Monitor G2, Reddit, and Twitter for competitor mentions and compile weekly AI-summarised reports

**Tools we recommend:** Intercom, Customer.io, Mixpanel, Make.com, HubSpot, Stripe Radar
**Estimated time saved:** 30-40 hrs/week across CS and sales
**Key metric:** Target < 5% monthly churn`,
  },
  {
    keywords: ["agency", "marketing", "campaigns", "freelance", "design", "creative", "seo", "social media", "ads", "ppc", "content"],
    response: `Digital agencies are perfect for automation — high-repetition work with predictable patterns. Here's your playbook:

**🚀 Quick Wins (Week 1-2)**
• **Automated Client Reporting** — Pull data from Google Analytics, Meta Ads, Google Ads into branded Looker Studio reports. Auto-send every Monday morning. Saves 2-3 days/month
• **New Lead Intake Forms** — Smart forms that capture budget, timeline, goals. Auto-qualify and route to the right team member. Eliminate 90% of discovery call prep
• **Contract & Invoice Automation** — Signed contract → auto-generate invoice → auto-send payment reminder on due date. Gets you paid 2× faster

**⚙️ Medium Term (Month 1-2)**
• **Client Onboarding Workflow** — New client signs → auto-create project → send welcome pack → schedule kickoff → request brand assets. All without a single manual step
• **Content Calendar Automation** — AI drafts social media captions based on your client's brand voice. Human approves, tool schedules. Cut content time by 60%
• **Performance Alert System** — Auto-alert you when an ad campaign drops below target CPA or a website traffic anomaly is detected

**🧠 Strategic AI (Month 3+)**
• **AI Proposal Generator** — Input client industry + goals → AI generates a customised service proposal with pricing. Close more deals faster
• **Automated Competitor Analysis** — Weekly AI report on what your clients' competitors are doing (ads, content, SEO changes)
• **AI Client Health Scoring** — Score each client by engagement, payment history, and results. Identify at-risk clients before they churn

**Tools we recommend:** Make.com, AgencyAnalytics, HubSpot, Notion AI, ClickUp
**Estimated time saved:** 40-60 hrs/month per 10 clients
**Business impact:** Take on 30% more clients without hiring`,
  },
  {
    keywords: ["restaurant", "food", "cafe", "hospitality", "bookings", "reservations", "menu", "delivery", "kitchen", "catering"],
    response: `Restaurants and hospitality businesses can automate more than most owners realise:

**🚀 Quick Wins (Week 1-2)**
• **Reservation Confirmation & Reminders** — Auto-confirm bookings with SMS reminders 24hrs and 2hrs before. Reduces no-shows by 40-60%
• **Review Request Automation** — Auto-SMS customers 2 hours after their visit with a Google/TripAdvisor review link. Most 5-star reviews come from this alone
• **Loyalty Program Automation** — Auto-track visits, auto-send reward notifications, auto-trigger birthday offers

**⚙️ Medium Term (Month 1-2)**
• **Staff Scheduling Alerts** — AI analyses booking patterns to recommend optimal staffing levels. Auto-notify staff of schedule changes
• **Inventory & Ordering Automation** — Auto-generate supplier orders when key ingredients drop below par. Reduces waste and stock-outs
• **Event & Private Dining Pipeline** — Auto-qualify event enquiries, send proposals, collect deposits, and manage the entire booking flow

**🧠 Strategic AI (Month 3+)**
• **AI Chatbot for Reservations** — Handles table bookings, dietary queries, and special requests via website and WhatsApp 24/7
• **Menu Performance Analytics** — AI analyses which dishes drive the most profit and highlights them in digital menus

**Tools we recommend:** OpenTable, Resy, Make.com, Twilio, Toast POS
**Estimated time saved:** 15-20 hrs/week for front-of-house staff`,
  },
  {
    keywords: ["healthcare", "medical", "clinic", "patients", "appointments", "doctor", "dental", "therapy", "wellness", "gym", "fitness"],
    response: `Healthcare and wellness practices have huge automation potential while keeping the human touch where it matters:

**🚀 Quick Wins (Week 1-2)**
• **Appointment Reminders** — Auto SMS + email 48hrs and 2hrs before appointments. Reduces no-shows by 50-70%, saving thousands per month
• **Online Booking System** — Self-scheduling with automatic confirmation, intake form collection, and calendar sync. Frees up receptionist time completely
• **Follow-Up Care Messages** — Auto-send post-appointment care instructions and check-in messages at day 3 and day 7

**⚙️ Medium Term (Month 1-2)**
• **Recall & Re-booking Campaigns** — Auto-identify patients due for annual check-ups and trigger personalised outreach
• **Insurance Verification Workflow** — Auto-collect insurance details via intake forms and route to billing with a pre-filled checklist
• **Review Generation** — Auto-request Google reviews from satisfied patients post-visit

**🧠 Strategic AI (Month 3+)**
• **AI Symptom Triage Chatbot** — Helps patients self-triage, book the right appointment type, and fill out pre-visit information
• **Automated Billing Follow-Up** — AI-driven payment reminder sequences that reduce accounts receivable by 35-50%

**Tools we recommend:** Jane App, Calendly, Twilio, Make.com
**Estimated time saved:** 25-30 hrs/week for admin staff`,
  },
  {
    keywords: ["hr", "hiring", "recruitment", "employees", "payroll", "staff", "people", "talent", "human resources", "workforce"],
    response: `HR and recruitment automation can transform how you hire and manage people:

**🚀 Quick Wins (Week 1-2)**
• **Application Screening Automation** — AI pre-screens CVs against your job requirements and scores candidates 1-100. Your recruiters only review the top 20%. Cut screening time by 80%
• **Interview Scheduling** — Candidates self-book available interview slots. Auto-send calendar invites, video links, and prep materials
• **Rejection & Status Emails** — Auto-send personalised status updates at each stage. Protects employer brand

**⚙️ Medium Term (Month 1-2)**
• **Employee Onboarding Workflow** — New hire signed → auto-provision accounts, send welcome pack, assign buddy, schedule 30/60/90-day check-ins
• **Leave & Absence Management** — Self-service leave requests with auto-approval rules, calendar blocking, and cover notification
• **Performance Review Automation** — Auto-trigger review cycles, collect 360 feedback, compile reports, and schedule manager conversations

**🧠 Strategic AI (Month 3+)**
• **AI Job Description Writer** — Input role requirements → AI generates inclusive, optimised job descriptions in seconds
• **Turnover Risk Prediction** — AI identifies flight-risk employees based on engagement signals before they resign
• **Payroll Anomaly Detection** — Auto-flag unusual payroll entries before processing

**Tools we recommend:** Workable, BambooHR, Make.com, Calendly, Notion AI
**Estimated time saved:** 15-20 hrs/week per recruiter`,
  },
];

const FOLLOWUP_RESPONSES: Array<{ keywords: string[]; response: string }> = [
  {
    keywords: ["cost", "price", "how much", "budget", "invest", "expensive", "affordable", "charge", "fee"],
    response: `Great question on pricing. Here's a realistic investment breakdown:

**💰 Typical Project Costs**
• **Starter Automation** (email sequences, CRM setup, booking automation) — **$2,500–$5,000** one-time
• **Growth Package** (multi-step workflows, reporting dashboards, lead scoring) — **$5,000–$15,000**
• **AI-Powered Suite** (custom chatbot, predictive analytics, full automation stack) — **$15,000–$40,000+**

**📈 Expected ROI**
Most clients see full ROI within 3-6 months. A business saving 20 hrs/week at $50/hr saves **$52,000/year** — a $15K automation investment pays back in under 4 months.

**Monthly Retainer** (ongoing management & optimisation): $500–$2,500/month

Want me to build a custom ROI projection for your specific business size and processes?`,
  },
  {
    keywords: ["tool", "software", "platform", "which", "recommend", "use", "stack", "technology", "tech"],
    response: `Here's a breakdown of the best tools by category:

**🔧 Automation Platforms**
• **Make.com** — Best for complex multi-step workflows. Very visual, no-code. From $9/month
• **Zapier** — Easiest to use, largest app library. From $20/month
• **n8n** — Open source, self-hosted option. Free but requires technical setup

**📧 Email & CRM**
• **HubSpot** — Best all-in-one CRM + email automation. Free tier available
• **ActiveCampaign** — Best pure email automation. From $29/month
• **Klaviyo** — Best for e-commerce. Revenue-based pricing

**🤖 AI & Chatbots**
• **Claude API (Anthropic)** — Best for complex, nuanced responses. Superior reasoning
• **ChatGPT API (OpenAI)** — Most popular, huge ecosystem and integrations
• **Voiceflow** — No-code chatbot builder with AI. From $50/month

**📊 Analytics & Reporting**
• **Google Looker Studio** — Free, connects to almost everything
• **Databox** — Beautiful dashboards, from $59/month

**Our recommendation:** Start with Make.com + HubSpot as your foundation — they handle 80% of automation needs. Want a specific stack recommendation for your industry?`,
  },
  {
    keywords: ["time", "long", "quick", "fast", "how soon", "timeline", "when", "start", "begin", "deadline"],
    response: `Here's a realistic implementation timeline:

**Week 1-2: Foundation**
→ Discovery & process mapping (we document every manual task)
→ Tool setup & account configuration
→ First automation live: usually lead capture or email sequences

**Week 3-4: Core Automations**
→ CRM integration and data migration
→ 3-5 key workflow automations running
→ Testing and refinement with real data

**Month 2: Advanced Features**
→ Reporting dashboards live
→ AI chatbot trained on your content
→ Team training and handover documentation

**Month 3: Optimise & Scale**
→ Performance review: what's working, what to add
→ Additional automations based on data
→ Ongoing support and monitoring

**Total time to ROI:** Most clients see measurable time savings within the first 2 weeks.

Want me to map out a specific timeline for your highest-priority automation?`,
  },
];

const GENERIC_RESPONSE = `Thanks for sharing that! Based on what you've described, here are the highest-impact automation opportunities:

**🚀 Quick Wins (Implement in 1-2 weeks)**
• **Lead Capture & Follow-Up** — Automate your lead intake → CRM entry → immediate follow-up email/SMS sequence. Most businesses lose 40-60% of leads from slow response
• **Email & Communication Automation** — Drip sequences for new enquiries, onboarding, and re-engagement. Saves 5-10 hrs/week
• **Appointment/Booking Scheduling** — Replace manual scheduling with self-booking links. Eliminates scheduling back-and-forth completely

**⚙️ Medium-Term Automation (Month 1-2)**
• **Reporting & Analytics Dashboard** — Auto-pull your key metrics into a single live dashboard. Stop building manual reports
• **Invoice & Payment Automation** — Auto-send invoices on project completion, with payment reminders at 7, 14, and 30 days
• **Customer Feedback Collection** — Auto-request reviews post-purchase/service. Most businesses collect 3-5× more reviews this way

**🧠 AI-Powered Automation (Month 2-3)**
• **AI Customer Support Chatbot** — Handle 60-70% of common questions automatically, 24/7, without hiring more support staff
• **AI Content Generation** — Automate social media posts, email newsletters, and blog content using AI trained on your brand voice
• **Predictive Analytics** — Forecast demand, identify best customers, and flag potential churn before it happens

**💡 Next step:** Tell me more about your biggest time-wasters and I'll give you a specific, step-by-step automation plan with exact tools and costs.

**Estimated impact:** Most businesses save 15-25 hrs/week and reduce operational costs by 20-35% within 90 days.`;

const GENERIC_FOLLOWUP = `That's a great follow-up. Based on your situation, I'd recommend focusing on this next:

**Immediate Priority**
The fastest path to ROI is automating the single process that takes your team the most time. For most businesses that's:
1. Lead follow-up and nurturing (biggest revenue impact)
2. Manual data entry and reporting (biggest time drain)
3. Customer communication — confirmations, reminders, updates (best customer experience improvement)

**My Recommendation**
Start with a 2-week pilot on your highest-pain process. We build one automation, measure the time saved, then scale from there.

A typical pilot saves 8-15 hours in week one alone — enough to prove ROI before committing to a larger project.

What specific task takes your team the most time right now? I can give you an exact automation blueprint with tools, estimated build time, and projected savings.`;

function generateResponse(messages: Array<{ role: string; content: string }>): string {
  const userMessages = messages.filter((m) => m.role === "user");
  const lastUserMessage = userMessages[userMessages.length - 1]?.content || "";
  const allText = messages.map((m) => m.content).join(" ").toLowerCase();
  const lastLower = lastUserMessage.toLowerCase();
  const isFollowUp = userMessages.length > 1;

  // Follow-up question handling
  if (isFollowUp) {
    for (const { keywords, response } of FOLLOWUP_RESPONSES) {
      if (keywords.some((kw) => lastLower.includes(kw))) {
        return response;
      }
    }
    return GENERIC_FOLLOWUP;
  }

  // First message — match by industry
  for (const { keywords, response } of RESPONSES) {
    if (keywords.some((kw) => allText.includes(kw))) {
      return response;
    }
  }

  return GENERIC_RESPONSE;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    // Simulate realistic thinking delay
    await new Promise((resolve) => setTimeout(resolve, 900 + Math.random() * 600));
    const response = generateResponse(messages);
    return NextResponse.json({ response });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
