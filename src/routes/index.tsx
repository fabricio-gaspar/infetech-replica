import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import {
  ShieldCheck, Cloud, HardDrive, ArrowRight, Cpu, Code2, BarChart3, Database, Settings2,
  Briefcase, Award, Users, Trophy, Calendar, MessageCircle, User,
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
  { n: "01", t: "Backup and Recovery", d: "This helps protect organizations against data loss", icon: HardDrive },
  { n: "02", t: "Internet & Cyber Security", d: "Offer security tactics to protect users from threats", icon: ShieldCheck },
  { n: "03", t: "Cloud Based Services", d: "Applications, servers, storage, and virtual desktops", icon: Cloud },
];

const services = [
  { t: "Automated Software", d: "It is used in business process management to increase productivity & efficiency.", icon: Cpu },
  { t: "IT Consultancy", d: "Improvement of staff productivity, cost savings, competitive edge, and more.", icon: Briefcase },
  { t: "Market Strategy", d: "We provide a variety of the best marketing strategies to grow your business.", icon: BarChart3 },
  { t: "Data Structuring", d: "Analyze nature of the data and its importance in the larger scheme of things.", icon: Database },
  { t: "Managed IT Services", d: "Our managed IT services include network monitoring, security & virtualization.", icon: Settings2 },
  { t: "Software Develop", d: "An entire process of creating, designing, deploying and supporting software.", icon: Code2 },
];

const projects = [
  { t: "Virtual Reality", c: "Design / Ideas", img: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=900&q=80" },
  { t: "Smart Marketing", c: "Ideas", img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&q=80" },
  { t: "Platform Integration", c: "Design", img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&q=80" },
  { t: "Tech Solutions", c: "Ideas", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80" },
  { t: "Smart Visions", c: "Design", img: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=900&q=80" },
  { t: "Web Development", c: "Design / Ideas", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=80" },
];

const industries = [
  { letter: "G", t: "Gaming and Entertainment", d: "Immersive platforms, live operations and engaging entertainment experiences built to scale." },
  { letter: "B", t: "Business and Finance", d: "Secure financial systems, intelligent reporting and modern enterprise platforms." },
  { letter: "T", t: "Information Technology", d: "Cloud-native architectures, DevOps excellence and engineering for IT teams." },
];

const pillars = [
  { i: Users, t: "Experienced", d: "Years of proven experience delivering enterprise IT projects." },
  { i: Award, t: "Convenience", d: "We make working with technology partners simple and seamless." },
  { i: Trophy, t: "Professional", d: "A dedicated team of senior professionals at your service." },
];

const posts = [
  { t: "The different types of data backups", d: "01", m: "MAR", img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80" },
  { t: "A quick solutions for problem", d: "14", m: "MAR", img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80" },
  { t: "What is Staff Augmentation?", d: "22", m: "MAR", img: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=800&q=80" },
];

function HomePage() {
  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative bg-[#f3f1f7] overflow-hidden">
        {/* Full-bleed hero image on the right half */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1400&q=80"
            alt="Tech professional"
            className="w-full h-full object-cover grayscale opacity-90 lg:opacity-100"
          />
          {/* fade overlay on the left edge of the image to blend into bg */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f3f1f7] via-[#f3f1f7]/40 to-transparent lg:via-transparent" />
        </div>

        {/* Circuit decoration on the left */}
        <div
          aria-hidden
          className="hidden md:block absolute left-0 top-0 bottom-0 w-1/3 opacity-[0.35] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(106,38,218,0.55) 1px, transparent 1.5px)",
            backgroundSize: "22px 22px",
            maskImage: "linear-gradient(to right, black, transparent)",
            WebkitMaskImage: "linear-gradient(to right, black, transparent)",
          }}
        />

        <div className="container-x relative pt-24 lg:pt-32 pb-44 lg:pb-56 grid lg:grid-cols-2 gap-10">
          <div className="reveal">
            <div className="inline-flex items-center gap-3 text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-7">
              Welcome to Infetech
            </div>
            <h1 className="font-black text-foreground leading-[1.05] tracking-tight text-[44px] sm:text-[60px] lg:text-[76px]">
              <span className="relative inline-block">
                Future
                <svg className="absolute left-0 -bottom-1 w-[180px] h-3" viewBox="0 0 180 12" fill="none" preserveAspectRatio="none">
                  <path d="M2 8 C 40 2, 90 10, 178 4" stroke="#6A26DA" strokeWidth="4" strokeLinecap="round" fill="none" />
                </svg>
              </span>
              <br />belongs to<br />technology
            </h1>
            <Link to="/about" className="btn-primary mt-10">Learn More</Link>
          </div>

          {/* slider controls on right */}
          <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-10">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`block rounded-full transition-all ${i === 0 ? "w-2.5 h-2.5 bg-primary" : "w-2 h-2 bg-foreground/25"}`}
              />
            ))}
          </div>
        </div>

        {/* overlapping cards */}
        <div className="container-x relative -mt-32 lg:-mt-40 pb-24 grid md:grid-cols-3 gap-6 z-10">
          {heroCards.map((c, i) => (
            <div
              key={c.t}
              className="relative bg-white p-8 pb-10 shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.14)] hover:-translate-y-1.5 transition-all duration-300 reveal"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="absolute top-0 right-0 w-3 h-3 bg-primary" />
              <span className="absolute right-6 bottom-4 text-[70px] font-black leading-none text-foreground/[0.07] select-none">{c.n}</span>
              <h3 className="relative text-[18px] font-black uppercase tracking-wide leading-tight max-w-[180px]">{c.t}</h3>
              <p className="relative mt-5 text-[13px] text-muted-foreground leading-relaxed max-w-[220px]">{c.d}</p>
            </div>
          ))}
        </div>
      </section>


      {/* WHY CHOOSE OUR SERVICES / COMPANY BENEFITS */}
      <section className="section-y bg-white relative overflow-hidden">
        {/* Decorative curved shape top-right */}
        <div
          aria-hidden
          className="absolute -top-10 -right-10 lg:top-[-140px] lg:right-[-120px] w-[360px] h-[360px] lg:w-[520px] lg:h-[520px] rounded-full bg-primary/[0.05] pointer-events-none"
        />
        <div className="container-x relative grid lg:grid-cols-2 gap-14 items-center">
          {/* Left visual composition — photo collage with purple circle/ring */}
          <div className="relative reveal order-2 lg:order-1">
            {/* Large purple ring behind */}
            <div
              aria-hidden
              className="absolute -left-10 lg:-left-16 top-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[400px] md:h-[400px] lg:w-[460px] lg:h-[460px] rounded-full border-[36px] border-primary/[0.10] pointer-events-none"
            />

            {/* Decorative small circle */}
            <div
              aria-hidden
              className="absolute top-4 right-10 lg:right-16 w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-primary/20 pointer-events-none"
            />

            {/* Main image */}
            <div className="relative z-10 ml-8 lg:ml-12">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80"
                alt="Tech professional"
                className="w-full max-w-[480px] h-[360px] md:h-[420px] object-cover"
              />
            </div>

            {/* Overlapping small photo / counter card */}
            <div className="absolute -bottom-8 -left-2 lg:-left-6 z-20 w-44 h-36 lg:w-52 lg:h-40 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80"
                alt="Team working"
                className="w-full h-full object-cover"
              />
              {/* Purple accent corner */}
              <div className="absolute top-0 right-0 w-3 h-3 bg-primary" />
            </div>
          </div>

          <div className="reveal max-w-[560px] order-1 lg:order-2">
            <div className="eyebrow mb-4">Company Benefits</div>
            <h2 className="text-[34px] md:text-[46px] font-black leading-[1.12]">The Best Tech Solutions for Our Clients</h2>
            <p className="mt-6 text-muted-foreground leading-[1.85] text-[15px]">
              Infetech is a provider of IT consulting and software development services. We have helped organizations and companies improve business performance & enhance their competitiveness. We provide unhindered support 24 hours, 7 days to meet all requirements of clients
            </p>

            <div className="mt-10 space-y-8">
              <div className="flex gap-6 items-start">
                <div className="shrink-0">
                  {/* Cloud + circuit icon */}
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M62 44.5H56.5C54.5 44.5 53 43.2 53 41.5C53 40.5 53.5 39.5 54.5 38.9C54.5 38.9 54.5 38.8 54.5 38.7C54.5 32.5 49.5 27.5 43.3 27.5C41.5 27.5 39.8 28 38.2 28.8C36.2 24.6 32 21.5 27 21.5C20 21.5 14.5 27 14.5 34C14.5 34.7 14.5 35.4 14.7 36.1C11.8 37.4 9.5 40.5 9.5 44.5C9.5 49.5 13.5 53.5 18.5 53.5H62C67 53.5 71 49.5 71 44.5C71 39.5 67 35.5 62 35.5V44.5Z"
                      stroke="#6A26DA"
                      strokeWidth="2.2"
                      strokeLinejoin="round"
                    />
                    <circle cx="40" cy="40" r="4" stroke="#6A26DA" strokeWidth="2" />
                    <path d="M40 36V32" stroke="#6A26DA" strokeWidth="2" strokeLinecap="round" />
                    <path d="M43 41H48" stroke="#6A26DA" strokeWidth="2" strokeLinecap="round" />
                    <path d="M32 41H37" stroke="#6A26DA" strokeWidth="2" strokeLinecap="round" />
                    <path d="M38 44L35 48" stroke="#6A26DA" strokeWidth="2" strokeLinecap="round" />
                    <path d="M42 44L45 48" stroke="#6A26DA" strokeWidth="2" strokeLinecap="round" />
                    <path d="M21 66C26 72 54 72 59 66" stroke="#6A26DA" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[20px] font-bold leading-tight">End to End Developement</h4>
                  <p className="mt-2 text-[14px] text-muted-foreground leading-[1.8]">Complete an entire process from creating a design concept and planning to launching a product.</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="shrink-0">
                  {/* Lightbulb + human head icon */}
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M32 58.5V62.5C32 65.5 34.5 68 37.5 68H42.5C45.5 68 48 65.5 48 62.5V58.5"
                      stroke="#6A26DA"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M40 14C28.5 14 22 24 22 34C22 41 25 47 30 51V57.5H50V51C55 47 58 41 58 34C58 24 51.5 14 40 14Z"
                      stroke="#6A26DA"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="40" cy="34" r="9" stroke="#6A26DA" strokeWidth="2" />
                    <path d="M36 43C36 43 38 45 40 45C42 45 44 43 44 43" stroke="#6A26DA" strokeWidth="2" strokeLinecap="round" />
                    <path d="M17 22L20 25" stroke="#6A26DA" strokeWidth="2" strokeLinecap="round" />
                    <path d="M63 22L60 25" stroke="#6A26DA" strokeWidth="2" strokeLinecap="round" />
                    <path d="M40 8V12" stroke="#6A26DA" strokeWidth="2" strokeLinecap="round" />
                    <path d="M21 66C26 72 54 72 59 66" stroke="#6A26DA" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[20px] font-bold leading-tight">Software IT Outsourcing</h4>
                  <p className="mt-2 text-[14px] text-muted-foreground leading-[1.8]">We offer our customers with the truly beneficial solutions and is a professional service provider</p>
                </div>
              </div>
            </div>

            <Link to="/about" className="btn-primary mt-10">Learn More</Link>
          </div>
        </div>
      </section>


      {/* SERVICES GRID 3x2 */}
      <section className="section-y bg-section relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.25] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(106,38,218,0.35) 1px, transparent 1.5px)",
            backgroundSize: "26px 26px",
            maskImage: "radial-gradient(ellipse at center, transparent 30%, black 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, transparent 30%, black 80%)",
          }}
        />
        <div className="container-x relative text-center reveal max-w-3xl mx-auto">
          <div className="eyebrow mb-4 justify-center">What We're Offering to Our Clients</div>
          <h2 className="text-3xl md:text-5xl font-black leading-[1.15]">Real Time Dealing in all Professional<br />IT Solutions &amp; Services</h2>
        </div>
        <div className="container-x relative mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-foreground/10 bg-white">
          {services.map((s, i) => (
            <div
              key={s.t}
              className="relative bg-white p-10 border-r border-b border-foreground/10 min-h-[260px] reveal group hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all"
              style={{ transitionDelay: `${i*70}ms`}}
            >
              <h3 className="font-black text-[22px] tracking-tight">{s.t}</h3>
              <p className="mt-6 text-[14px] text-muted-foreground leading-relaxed max-w-[260px]">{s.d}</p>
              <div className="absolute right-8 bottom-8">
                <div className="relative">
                  <span className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-primary/10" />
                  <s.icon className="relative w-12 h-12 text-primary" strokeWidth={1.4} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERMEDIATE DARK CTA */}
      <section className="circuit-bg text-white">
        <div className="container-x py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <h3 className="text-2xl md:text-3xl font-black">Need IT solutions &amp; services consultation?</h3>
          <Link to="/contact" className="btn-primary">Send a free request now <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>

      {/* PROJECTS CAROUSEL */}
      <section className="section-y bg-white">
        <div className="container-x text-center reveal max-w-3xl mx-auto">
          <div className="eyebrow mb-3 justify-center">Our Completed Projects</div>
          <h2 className="text-3xl md:text-5xl font-black leading-tight">Real Time Dealing in all Professional<br />IT Solutions &amp; Services</h2>
        </div>
        <div className="container-x mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p.t} className="group relative overflow-hidden reveal">
              <img src={p.img} className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110" alt={p.t} />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent" />
              <div className="absolute left-5 right-5 bottom-5">
                <div className="text-[10px] uppercase tracking-widest text-primary font-bold">{p.c}</div>
                <h3 className="mt-1 text-xl font-bold text-white">{p.t}</h3>
              </div>
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-primary grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-10">
          {[0,1,2,3,4,5].map((i) => (
            <button key={i} aria-label={`Go to slide ${i+1}`} className={`h-2.5 rounded-full transition-all ${i===0?'w-8 bg-primary':'w-2.5 bg-foreground/20'}`} />
          ))}
        </div>
      </section>

      {/* BETTER IT SOLUTIONS BLOCK */}
      <section className="bg-section">
        <div className="container-x py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div className="reveal">
            <div className="eyebrow mb-3">IT Solutions</div>
            <h2 className="text-3xl md:text-5xl font-black leading-tight">Better IT Solutions &amp; Services at your Fingertips</h2>
            <p className="mt-5 text-muted-foreground max-w-lg">
              We deliver complete enterprise solutions — from infrastructure to applications — designed to power your business at every stage of growth.
            </p>
            <Link to="/services" className="btn-primary mt-7">Learn More <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="relative reveal">
            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=80" className="w-full h-[380px] object-cover" alt="" />
          </div>
        </div>
      </section>

      {/* INDUSTRIES — G / B / T */}
      <section className="section-y bg-white">
        <div className="container-x grid md:grid-cols-3 gap-6">
          {industries.map((i) => (
            <div key={i.letter} className="group relative bg-white border border-border p-8 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all reveal">
              <div className="w-20 h-20 purple-gradient text-white font-black text-5xl grid place-items-center mb-6 leading-none">{i.letter}</div>
              <h3 className="text-xl font-bold">{i.t}</h3>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{i.d}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-primary">
                Read More <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TECHNOLOGY PATH */}
      <section className="section-y bg-section">
        <div className="container-x text-center reveal max-w-3xl mx-auto">
          <div className="eyebrow mb-3 justify-center">Technology Path</div>
          <h2 className="text-3xl md:text-5xl font-black leading-tight">Trusted IT Solution &amp; Service Business Agency</h2>
        </div>
        <div className="container-x mt-12 grid md:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <div key={p.t} className="card-soft p-8 text-center reveal">
              <div className="w-16 h-16 mx-auto rounded-full purple-gradient text-white grid place-items-center mb-5">
                <p.i className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold">{p.t}</h3>
              <p className="text-sm text-muted-foreground mt-3">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG / NEWS */}
      <section className="section-y bg-white">
        <div className="container-x text-center reveal max-w-2xl mx-auto">
          <div className="eyebrow mb-3 justify-center">What's Happening</div>
          <h2 className="text-3xl md:text-5xl font-black leading-tight">News &amp; Articles</h2>
        </div>
        <div className="container-x mt-12 grid md:grid-cols-3 gap-7">
          {posts.map((p) => (
            <article key={p.t} className="card-soft overflow-hidden reveal">
              <div className="relative overflow-hidden">
                <img src={p.img} className="w-full h-56 object-cover transition-transform duration-700 hover:scale-110" alt={p.t} />
                <div className="absolute top-4 left-4 bg-primary text-white text-center px-3 py-2 leading-none">
                  <div className="text-2xl font-black">{p.d}</div>
                  <div className="text-[10px] font-bold tracking-widest mt-1">{p.m}</div>
                </div>
              </div>
              <div className="p-7">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><User className="w-3 h-3" /> admin</span>
                  <span className="inline-flex items-center gap-1.5"><MessageCircle className="w-3 h-3" /> 0 comments</span>
                </div>
                <h3 className="mt-3 font-bold text-lg leading-snug hover:text-primary transition-colors">{p.t}</h3>
                <Link to="/blog" className="mt-5 inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary hover:gap-3 transition-all">
                  Read More <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
