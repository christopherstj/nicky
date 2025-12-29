import Hero from "@/components/Hero";
import NoiseOverlay from "@/components/NoiseOverlay";
import CaseStudy from "@/components/CaseStudy";
import TopNav from "@/components/TopNav";
import LetterCard from "@/components/LetterCard";
import IndexCard from "@/components/IndexCard";
import WaxSeal from "@/components/WaxSeal";
import Flourish from "@/components/Flourish";
import {
  loadAllProjectsWithContent,
  loadPortfolioData,
} from "@/lib/portfolio";

export default function Home() {
  // Load portfolio content
  const portfolioData = loadPortfolioData();
  const projectsWithContent = loadAllProjectsWithContent();
  
  // Prepare external resources for each project (Google Docs links)
  const getMarkdownResources = (projectId: string) => {
    const resources = [];
    
    if (projectId === "sovereign-syndicate") {
      resources.push({
        title: "Period Research: Notes & Inspiration",
        url: "https://docs.google.com/document/d/1J1elDSySZbTRgqrxDvFHPC-MTUISl0YoFgBRDm9bLNk/edit?tab=t.0",
        iconName: "FileText",
      });
      resources.push({
        title: "Lore: Silas, Arsenal Engines & the Sons of Caruso",
        url: "https://docs.google.com/document/d/1FACtrJausk4Gz0TfQKOXOEdBx5j07rzobqW_NvxGxr4/edit?tab=t.0#heading=h.4zifuujagqg6",
        iconName: "BookOpen",
      });
      resources.push({
        title: "NPC Design: Molly of the Hounds",
        url: "https://docs.google.com/document/d/1g_7OIbd7x3jUoWNqrkn9Ob9LedbfSJgfS1SFaGGdumw/edit?tab=t.0#heading=h.8kzhmbt27rm",
        iconName: "Users",
      });
    }
    
    return resources;
  };
  
  // Skill card rotations for messy scatter
  const skillRotations = [-3, 2.5, -1.5, 3, -2, 1.5, -3.5, 2.8];

  return (
    <div className="min-h-screen">
      <NoiseOverlay />
      <TopNav />
      
      <main className="relative z-10 mx-auto flex max-w-5xl flex-col gap-20 px-4 pb-24 pt-6 sm:px-8">
        <Hero />

        {/* About Section - Personal Letter */}
        <section id="about" className="scroll-mt-24 pt-8">
          <div className="max-w-2xl mx-auto">
            <LetterCard rotation={-1.5} showSeal={true} sealInitial="N">
              <p className="text-base leading-relaxed drop-cap">
                With a passion for story-driven narrative games, I&apos;ve been directing the story and narrative structure of sprawling RPGs since 2020. My background in the LA film industry supports my ability to craft compelling and cinematic games—strong scene craft, deliberate pacing, and distinctive character voice.
              </p>
              
              <p className="text-base leading-relaxed">
                My debut title, <em style={{ color: "#8b2500" }}>Sovereign Syndicate</em>, received strong critical praise for its unique Victorian-steampunk setting, complex writing, and character depth—drawing comparisons to <em>Disco Elysium</em>. Reviewers highlighted its innovative tarot-based skill system and rich world-building.
              </p>

              {/* Award highlight */}
              <div 
                className="my-6 p-4 relative"
                style={{ 
                  background: "rgba(139, 37, 0, 0.08)",
                  borderLeft: "3px solid #8b2500"
                }}
              >
                <p className="text-sm font-display font-semibold" style={{ color: "#8b2500" }}>
                  ★ Best Narrative Game Award
                </p>
                <p className="text-sm mt-1" style={{ color: "#5a4a3a" }}>
                  2025 AMPIA Alberta Film and Television Awards (Rosies)
                </p>
              </div>
              
              <p className="text-base leading-relaxed">
                I&apos;ve since led narrative direction on <em>Hunter&apos;s Moon</em>—a critically well-received roguelike deck builder praised for its immersive atmosphere and strong voice acting. Currently, I&apos;m building <em style={{ color: "#8b2500" }}>Sovereign Syndicate 2</em>, a party-based CRPG with tactical combat, and developing <em>Studio Delirium</em>, a game about running a studio chasing the next great Disco-like.
              </p>
              
              <div className="mt-6 pt-4 border-t border-ink/10">
                <p className="text-sm mb-3 font-medium tracking-wide" style={{ color: "#8b2500" }}>Selected titles:</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span><strong>Sovereign Syndicate</strong> — Narrative Director</span>
                    <em style={{ color: "#5a4a3a" }}>2024</em>
                  </div>
                  <div className="flex justify-between">
                    <span><strong>Hunter&apos;s Moon</strong> — Narrative Director</span>
                    <em style={{ color: "#5a4a3a" }}>2025</em>
                  </div>
                  <div className="flex justify-between">
                    <span><strong>Sovereign Syndicate 2</strong> — Narrative Director</span>
                    <em style={{ color: "#5a4a3a" }}>Coming Soon</em>
                  </div>
                  <div className="flex justify-between">
                    <span><strong>Studio Delirium</strong> — Narrative Director</span>
                    <em style={{ color: "#5a4a3a" }}>In Development</em>
                  </div>
                </div>
              </div>
            </LetterCard>
          </div>
        </section>

        {/* Skills Section - Scattered Paper Scraps */}
        <section id="skills" className="scroll-mt-24">
          {/* Section header - red ink */}
          <div className="text-center mb-8">
            <h3 
              className="font-script text-2xl"
              style={{ color: "var(--ink-red)" }}
            >
              Areas of Expertise
            </h3>
          </div>
          
          {/* Scattered paper scraps on the desk */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {portfolioData.skills.map((skill, index) => (
              <IndexCard
                key={skill.name}
                title={skill.name}
                description={skill.description}
                rotation={skillRotations[index % skillRotations.length]}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Case Studies Section - Scattered Documents */}
        <section id="projects" className="scroll-mt-24">
          {/* Section header - red ink */}
          <div className="text-center mb-10">
            <Flourish variant="divider" className="max-w-xs mx-auto mb-4 opacity-40" color="var(--ink-red)" />
            <h2 
              className="font-display text-3xl sm:text-4xl font-bold mb-2"
              style={{ color: "var(--paper)" }}
            >
              Case Studies
            </h2>
            <p className="text-sm max-w-md mx-auto" style={{ color: "var(--paper-dark)" }}>
              Click each dossier to explore dialogue systems, quest architecture, and documentation.
            </p>
            <Flourish variant="divider" className="max-w-xs mx-auto mt-4 opacity-40" color="var(--ink-red)" />
          </div>
          
          {/* Project folders - scattered on desk */}
          <div className="space-y-8">
            {projectsWithContent.map(
              ({ project, excerpts, dialogueScenes }, index) => (
                <CaseStudy
                  key={project.id}
                  project={project}
                  excerpts={excerpts}
                  dialogueScenes={dialogueScenes}
                  defaultOpen={index === 0}
                  markdownResources={getMarkdownResources(project.id)}
                />
              )
            )}
          </div>
        </section>

        {/* Contact CTA - Envelope / Telegram Style */}
        <section id="contact" className="scroll-mt-24">
          <div className="max-w-xl mx-auto">
            {/* Envelope - darker aged paper */}
            <div 
              className="relative p-8 sm:p-12 text-center"
              style={{
                background: `linear-gradient(
                  160deg,
                  var(--paper-aged) 0%,
                  var(--paper-dark) 60%,
                  var(--paper-aged) 100%
                )`,
                clipPath: "polygon(0% 15%, 50% 0%, 100% 15%, 100% 100%, 0% 100%)",
                boxShadow: `
                  4px 6px 25px rgba(0, 0, 0, 0.35),
                  8px 12px 50px rgba(0, 0, 0, 0.25)
                `,
              }}
            >
              {/* Age stains */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-25"
                style={{
                  background: `
                    radial-gradient(ellipse at 75% 25%, rgba(139, 37, 0, 0.15), transparent 45%),
                    radial-gradient(ellipse at 25% 75%, rgba(90, 74, 58, 0.2), transparent 55%)
                  `,
                }}
              />
              
              {/* Envelope flap shadow */}
              <div 
                className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
                style={{
                  background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 100%)",
                }}
              />
              
              {/* Stamp decoration - darker */}
              <div 
                className="absolute top-8 right-6 w-12 h-14 rounded-sm opacity-70"
                style={{
                  background: "linear-gradient(135deg, #6b1a00 0%, #4a1000 100%)",
                  border: "2px dashed rgba(232,220,200,0.25)",
                }}
              >
                <span className="text-[8px] font-display absolute inset-0 flex items-center justify-center" style={{ color: "var(--paper-aged)" }}>
                  REPLY
                </span>
              </div>
              
              {/* Content */}
              <div className="relative pt-8 space-y-4">
                <span 
                  className="inline-block px-3 py-1 text-xs font-medium tracking-wider rounded-sm"
                  style={{ 
                    color: "var(--ink-red)", 
                    border: "1px solid var(--ink-red)",
                    opacity: 0.8
                  }}
                >
                  Available for Opportunities
                </span>
                
                <h2 
                  className="font-display text-2xl sm:text-3xl font-bold"
                  style={{ color: "var(--ink-red)" }}
                >
                  Let&apos;s Build Worlds Together
                </h2>
                
                <p className="max-w-md mx-auto text-sm leading-relaxed" style={{ color: "var(--ink-faded)" }}>
                  Looking for a narrative director who understands both story
                  craft and systems design? Let&apos;s talk about your next
                  project.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <a
                    href="mailto:popkey34@gmail.com"
                    className="group inline-flex items-center gap-3"
                  >
                    <WaxSeal size="sm" initial="✉" />
                    <span 
                      className="font-display font-semibold transition-colors"
                      style={{ color: "var(--ink)" }}
                    >
                      Send a Letter
                    </span>
                  </a>
                </div>
              </div>
              
              {/* Corner flourishes */}
              <Flourish variant="corner-bl" className="absolute bottom-3 left-3 opacity-20" color="var(--ink)" />
              <Flourish variant="corner-br" className="absolute bottom-3 right-3 opacity-20" color="var(--ink)" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
