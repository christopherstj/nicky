import Hero from "@/components/Hero";
import NoiseOverlay from "@/components/NoiseOverlay";
import SectionHeading from "@/components/SectionHeading";
import CaseStudy from "@/components/CaseStudy";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  loadAllProjectsWithContent,
  loadPortfolioData,
} from "@/lib/portfolio";
export default function Home() {
  // Load portfolio content
  const portfolioData = loadPortfolioData();
  const projectsWithContent = loadAllProjectsWithContent();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NoiseOverlay />
      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-20 pt-10 sm:px-8">
        <Hero />

        {/* About Section */}
        <section id="about" className="space-y-6">
          <SectionHeading
            eyebrow="About"
            title="Nicholas Popkey"
            kicker="Award-winning narrative director crafting branching stories, systems-driven quests, and character arcs that respond to player agency."
          />
          <Card className="glass border-white/5 bg-transparent rounded-3xl">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <p className="text-lg leading-relaxed text-foreground/90">
                With a passion for story-driven narrative games, I&apos;ve been directing the story and narrative structure of sprawling RPGs since 2020. My background in the LA Film industry supports my ability to craft compelling and cinematic games.
              </p>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="text-sm uppercase tracking-wider text-primary/80 font-semibold">Experience</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-foreground/90">
                      <span className="font-semibold">Narrative Director</span> at Crimson Herring Studios
                    </p>
                    <p className="text-muted-foreground">September 2020 – Present</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 block h-1 w-1 rounded-full bg-primary/70 shrink-0" />
                        Multi-chapter branching narratives with complex variable management
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 block h-1 w-1 rounded-full bg-primary/70 shrink-0" />
                        Onboarding and mentoring writers in narrative pipelines
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm uppercase tracking-wider text-primary/80 font-semibold">Recognition</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <p className="font-semibold text-foreground/90">Best Narrative Game Award</p>
                      <p className="text-muted-foreground text-xs mt-1">
                        2025 AMPIA Alberta Film and Television Awards (Rosies) — Sovereign Syndicate
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 pt-2">
                <div className="space-y-2">
                  <h4 className="text-sm uppercase tracking-wider text-primary/80 font-semibold">Education</h4>
                  <p className="text-sm text-foreground/90">Bachelor of Arts</p>
                  <p className="text-xs text-muted-foreground">Pitzer College, Claremont</p>
                  <p className="text-xs text-muted-foreground">Media Studies & Art, 3.7 GPA</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm uppercase tracking-wider text-primary/80 font-semibold">Languages</h4>
                  <p className="text-sm text-foreground/90">English <span className="text-muted-foreground">(Native)</span></p>
                  <p className="text-sm text-foreground/90">Spanish <span className="text-muted-foreground">(Fluent)</span></p>
                  <p className="text-sm text-foreground/90">French <span className="text-muted-foreground">(Conversational)</span></p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm uppercase tracking-wider text-primary/80 font-semibold">Location</h4>
                  <p className="text-sm text-foreground/90">Boise, ID, USA</p>
                  <p className="text-xs text-muted-foreground">Available for remote work</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Case Studies Section */}
        <section id="projects" className="space-y-8">
          <SectionHeading
            eyebrow="Case Studies"
            title="Narrative Direction in Practice"
            kicker="Click each project to explore dialogue systems, quest architecture, and documentation."
          />
          <div className="space-y-6">
            {projectsWithContent.map(
              ({ project, excerpts, dialogueScenes }, index) => (
                <CaseStudy
                  key={project.id}
                  project={project}
                  excerpts={excerpts}
                  dialogueScenes={dialogueScenes}
                  defaultOpen={index === 0}
                />
              )
            )}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="space-y-6">
          <SectionHeading
            eyebrow="Tools & Process"
            title="Technical Skills"
            kicker="The tools and workflows that power narrative-driven game development."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {portfolioData.skills.map((skill) => (
              <Card
                key={skill.name}
                className="border-white/5 bg-surface/30 rounded-2xl"
              >
                <CardContent className="p-5">
                  <h4 className="font-bold text-foreground mb-1">
                    {skill.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {skill.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="space-y-6">
          <Card className="glass border-white/5 bg-transparent rounded-3xl overflow-hidden">
            <div className="relative p-8 sm:p-12 text-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(179,17,43,0.15),transparent_50%)] pointer-events-none" />
              <div className="relative space-y-4">
                <Badge
                  variant="outline"
                  className="border-primary/50 text-primary"
                >
                  Available for Opportunities
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-black">
                  Let&apos;s Build Worlds Together
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Looking for a narrative director who understands both story
                  craft and systems design? Let&apos;s talk about your next
                  project.
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-4">
                  <a
                    href="mailto:popkey34@gmail.com"
                    className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:shadow-primary/40"
                  >
                    Get in Touch
                  </a>
                  <a
                    href="#projects"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-foreground transition hover:border-primary/60 hover:text-primary"
                  >
                    View Work
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
