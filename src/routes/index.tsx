import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { LogoStrip } from "@/components/site/LogoStrip";
import { DarkCTA, PurpleCTA } from "@/components/site/CTAs";
import {
  ShieldCheck, Cloud, HardDrive, ArrowRight, Cpu, Code2, BarChart3, Database, Settings2, LineChart,
  Gamepad2, Briefcase, MonitorSmartphone, Award, Users, Trophy, CheckCircle2, Play,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Infetech — Future Belongs to Technology" },
    { name: "description", content: "Infetech delivers world-class IT solutions, cybersecurity, cloud services and software development for forward-thinking companies." },
    { property: "og:title", content: "Infetech — Future Belongs to Technology" },
  ]}),
  component: HomePage,
});

const heroCards = [
  { n: "01", t: "Backup and Recovery", d: "Reliable backup pipelines that keep your data safe.", icon: HardDrive },
  { n: "02", t: "Internet & Cyber Security", d: "Layered defenses for modern threats and zero trust.", icon: ShieldCheck },
  { n: "03", t: "Cloud Based Services", d: "Scalable cloud infrastructure tuned to your workloads.", icon: Cloud },
];

const services = [
  { t: "Automated Software", d: "Streamline operations with intelligent automation engines.", icon: Cpu },
  { t: "IT Consultancy", d: "Strategic IT roadmaps from senior technology partners.", icon: Briefcase },
  { t: "Market Strategy", d: "Data-driven market plans that scale your business.", icon: BarChart3 },
  { t: "Data Structuring", d: "Organize complex datasets into actionable models.", icon: Database },
  { t: "Managed IT Services", d: "End-to-end management of your IT infrastructure.", icon: Settings2 },
  { t: "Software Develop", d: "Custom software crafted to fit your operations.", icon: Code2 },
];

const projects = [
  { t: "Web Development", c: "Design / Ideas", img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&q=80" },
  { t: "Virtual Reality", c: "Design / Ideas", img: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=900&q=80" },
  { t: "Smart Marketing", c: "Design / Ideas", img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&q=80" },
];

const industries = [
  { t: "Gaming and Entertainment", d: "Immersive platforms and live operations at scale.", icon: Gamepad2, img: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&q=80" },
  { t: "Business and Finance", d: "Secure financial systems and intelligent reporting.", icon: Briefcase, img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80" },
  { t: "Information Technology", d: "Cloud-native architectures and DevOps excellence.", icon: MonitorSmartphone, img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
];

const posts = [
  { t: "The different types of data backups", c: "Data Analysis", img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80" },
  { t: "A quick solutions for problem", c: "Consulting", img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80" },
  { t: "What is Staff Augmentation?", c: "Technology", img: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=800&q=80" },
];

function HomePage() {
  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative bg-white overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="container-x pt-20 lg:pt-24 pb-40 grid lg:grid-cols-2 gap-10 items-center relative">
          <div className="reveal">
            <div className="inline-flex items-center gap-3 text-primary text-xs font-semibold uppercase tracking-[0.15em] mb-6">
              <span className="w-8 h-px bg-primary" />
              Welcome to Infetech
            </div>
            <h1 className="font-black text-foreground leading-[1.05] tracking-tight text-[42px] sm:text-[56px] lg:text-[68px]">
              <span className="relative inline-block">
                Future
                <span className="absolute left-0 -bottom-2 w-20 h-[3px] bg-primary" />
              </span>
              <br />belongs to<br />technology
            </h1>
            <p className="mt-8 text-muted-foreground max-w-md leading-[1.75]">
              We help organizations design, build and scale the digital systems that define the next decade of work.
            </p>
            <Link to="/about" className="btn-primary mt-9">Learn More</Link>
          </div>
          <div className="relative reveal">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1100&q=80"
              alt="Tech professional"
              className="relative w-full h-[460px] lg:h-[560px] object-cover grayscale"
            />
            {/* slider arrows */}
            <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 flex-col gap-3">
              <button aria-label="Previous slide" className="w-11 h-11 rounded-full border border-foreground/20 bg-white grid place-items-center text-foreground/70 hover:bg-primary hover:text-white hover:border-primary transition-colors">
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
              <button aria-label="Next slide" className="w-11 h-11 rounded-full border border-foreground/20 bg-white grid place-items-center text-foreground/70 hover:bg-primary hover:text-white hover:border-primary transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            {/* slider dots */}
            <div className="absolute -right-8 bottom-6 hidden lg:flex flex-col gap-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`block rounded-full transition-all ${i === 0 ? "w-2.5 h-2.5 bg-primary" : "w-2 h-2 bg-foreground/20"}`}
                />
              ))}
            </div>
          </div>
        </div>
        {/* overlapping cards */}
        <div className="container-x relative -mt-28 pb-24 grid md:grid-cols-3 gap-6">
          {heroCards.map((c, i) => (
            <div
              key={c.t}
              className="relative bg-white p-8 border-l-[3px] border-primary shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.14)] hover:-translate-y-1.5 transition-all duration-300 reveal"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-primary" />
              <span className="absolute right-5 bottom-3 text-[64px] font-black leading-none text-foreground/[0.06] select-none">{c.n}</span>
              <c.icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
              <h3 className="relative mt-6 text-[17px] font-bold uppercase tracking-wide">{c.t}</h3>
              <p className="relative mt-3 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </section>


      {/* BEST TECH SOLUTIONS */}
      <section className="section-y bg-white">
        <div className="container-x grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative reveal">
            <div className="absolute -left-6 top-6 w-64 h-64 border-[14px] border-primary rounded-full opacity-90" />
            <div className="relative grid grid-cols-2 gap-4 pl-12 pt-12">
              <img src="https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=600&q=80" className="rounded-sm h-56 w-full object-cover" alt="" />
              <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80" className="rounded-sm h-40 w-full object-cover mt-12" alt="" />
              <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80" className="rounded-sm h-40 w-full object-cover" alt="" />
              <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80" className="rounded-sm h-32 w-full object-cover" alt="" />
            </div>
          </div>
          <div className="reveal">
            <div className="eyebrow mb-4">Why Choose Us</div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">The Best Tech Solutions for Our Clients</h2>
            <p className="mt-5 text-muted-foreground">
              Infetech is a provider of IT consulting and software development services. We help organizations and companies improve business performance by combining strategy, design and engineering.
            </p>
            <div className="mt-8 space-y-5">
              {[
                { t: "End to End Development", d: "From product discovery to production delivery, our teams own every layer of the stack." },
                { t: "Software IT Outsourcing", d: "Senior engineers, fully integrated with your team, ready to ship at velocity." },
              ].map((b) => (
                <div key={b.t} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full grid place-items-center bg-accent text-primary shrink-0"><ShieldCheck className="w-5 h-5" /></div>
                  <div>
                    <h4 className="font-bold">{b.t}</h4>
                    <p className="text-sm text-muted-foreground">{b.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/services" className="btn-primary mt-8">Learn More <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* DARK PROJECTS */}
      <section className="circuit-bg py-24 text-white">
        <div className="container-x text-center reveal">
          <div className="eyebrow mb-3 !text-primary">Our Completed Projects</div>
          <h2 className="text-3xl md:text-5xl font-black">Improve & Enhance Our<br />Tech Projects</h2>
        </div>
        <div className="container-x mt-14 grid md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p.t} className="group relative overflow-hidden rounded-sm reveal">
              <img src={p.img} className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110" alt={p.t} />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent" />
              <div className="absolute left-5 right-5 bottom-5">
                <div className="text-xs uppercase tracking-widest text-primary">{p.c}</div>
                <h3 className="mt-1 text-xl font-bold">{p.t}</h3>
              </div>
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-primary grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity"><ArrowRight className="w-4 h-4 text-white" /></div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-10">
          {[0,1,2,3].map((i) => <span key={i} className={`h-1 rounded ${i===0?'w-10 bg-primary':'w-6 bg-white/20'}`} />)}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-y bg-white">
        <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative reveal">
            <div className="absolute -left-12 -bottom-12 w-1/2 h-2/3 bg-primary" />
            <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80" className="relative w-full h-[460px] object-cover" alt="" />
          </div>
          <div className="reveal">
            <div className="eyebrow mb-4">What we offer</div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">Why you Should choose<br />Our Services</h2>
            <p className="mt-5 text-muted-foreground max-w-lg">
              Senior engineers, transparent process, and an obsession with shipping. We work as part of your team, not a vendor.
            </p>
            <div className="mt-8 space-y-6">
              {[
                { t: "Cloud Based Services", d: "Resilient, scalable cloud architectures built on best practices." },
                { t: "Expert Team Members", d: "Battle-tested experts across product, design and engineering." },
              ].map((b) => (
                <div key={b.t} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full grid place-items-center bg-primary text-white shrink-0"><CheckCircle2 className="w-5 h-5" /></div>
                  <div>
                    <h4 className="font-bold">{b.t}</h4>
                    <p className="text-sm text-muted-foreground">{b.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="section-y bg-section">
        <div className="container-x text-center reveal">
          <div className="eyebrow mb-3">What we're offering</div>
          <h2 className="text-3xl md:text-5xl font-black leading-tight">Real Time Dealing in all Professional<br />IT Solutions & Services</h2>
        </div>
        <div className="container-x mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={s.t} className="card-soft p-7 flex items-start justify-between gap-4 reveal" style={{ transitionDelay: `${i*80}ms`}}>
              <div>
                <h3 className="font-bold text-lg">{s.t}</h3>
                <p className="text-sm text-muted-foreground mt-2">{s.d}</p>
              </div>
              <div className="w-12 h-12 rounded-sm grid place-items-center bg-accent text-primary shrink-0"><s.icon className="w-5 h-5" /></div>
            </div>
          ))}
        </div>
      </section>

      {/* MINI CTA */}
      <section className="bg-white">
        <div className="container-x py-6">
          <div className="purple-gradient rounded-sm px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
            <p className="text-sm font-semibold">We'll talk over your business and provide the best IT solutions.</p>
            <a href="/contact" className="btn-light !py-2.5 !px-5">Learn More</a>
          </div>
        </div>
      </section>

      <DarkCTA />

      {/* INDUSTRY CARDS */}
      <section className="section-y bg-white">
        <div className="container-x grid md:grid-cols-3 gap-6">
          {industries.map((i) => (
            <div key={i.t} className="card-soft p-6 flex items-center gap-5 reveal">
              <div className="relative shrink-0">
                <img src={i.img} className="w-20 h-20 rounded-full object-cover" alt="" />
                <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full purple-gradient grid place-items-center text-white"><i.icon className="w-4 h-4" /></div>
              </div>
              <div>
                <h4 className="font-bold">{i.t}</h4>
                <p className="text-sm text-muted-foreground mt-1">{i.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PURPLE TRUST STRIP */}
      <section className="purple-gradient text-white">
        <div className="container-x py-10 grid md:grid-cols-4 gap-8 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest opacity-85">Why infetech</div>
            <h3 className="text-2xl font-black mt-1">Trusted IT Solution &<br />Service Business Agency</h3>
          </div>
          {[
            { i: Users, t: "Experienced Team" },
            { i: Award, t: "Convenience and Trust" },
            { i: Trophy, t: "Professional Team" },
          ].map((b) => (
            <div key={b.t} className="flex items-center gap-3 border-l border-white/20 pl-5">
              <div className="w-12 h-12 rounded-full bg-white/10 grid place-items-center"><b.i className="w-5 h-5" /></div>
              <div className="text-sm font-semibold leading-tight">{b.t}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="section-y bg-white">
        <div className="container-x text-center reveal">
          <div className="eyebrow mb-3">What's new</div>
          <h2 className="text-3xl md:text-5xl font-black">News & Articles</h2>
        </div>
        <div className="container-x mt-12 grid md:grid-cols-3 gap-7">
          {posts.map((p) => (
            <article key={p.t} className="card-soft overflow-hidden reveal">
              <div className="relative overflow-hidden">
                <img src={p.img} className="w-full h-52 object-cover transition-transform duration-700 hover:scale-110" alt={p.t} />
                <div className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-primary text-white">News</div>
              </div>
              <div className="p-6">
                <div className="text-xs text-muted-foreground">By Admin · {p.c}</div>
                <h3 className="mt-2 font-bold text-lg leading-snug">{p.t}</h3>
                <Link to="/blog" className="mt-4 inline-flex text-xs font-bold tracking-widest uppercase text-primary hover:gap-2 gap-1 transition-all">Read More <ArrowRight className="w-3 h-3" /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <LogoStrip />
    </SiteShell>
  );
}
