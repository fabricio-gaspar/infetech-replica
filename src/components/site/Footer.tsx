import { Link } from "@tanstack/react-router";
import { Twitter, Facebook, Instagram, Linkedin, Send, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="circuit-bg text-white/80 relative">
      <div className="container-x py-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-5">
            <div className="w-9 h-9 grid place-items-center rounded-sm purple-gradient text-white font-black text-lg">S</div>
            <span className="font-display text-2xl font-black text-white">infetech</span>
          </Link>
          <p className="text-sm leading-relaxed text-white/65 max-w-xs">
            We work with a passion of taking challenges and creating new ones in advertising sector.
          </p>
          <div className="flex items-center gap-2 mt-6">
            {[Twitter, Facebook, Linkedin, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 grid place-items-center rounded-full bg-white/5 hover:bg-primary hover:text-white transition-colors">
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-lg mb-5 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-primary">Links</h4>
          <ul className="space-y-2.5 text-sm">
            {["About", "Meet our Team", "News & Media", "Our Projects", "Contact"].map((l) => (
              <li key={l}><Link to="/about" className="hover:text-primary transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-lg mb-5 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-primary">Newsletter</h4>
          <p className="text-sm text-white/65 mb-4">Signup for our latest news & articles. We won't give you spam mails.</p>
          <form className="relative" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" className="w-full bg-white text-foreground rounded-sm px-4 py-3 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            <button className="absolute right-1.5 top-1.5 bottom-1.5 px-3 purple-gradient text-white rounded-sm grid place-items-center"><Send className="w-4 h-4" /></button>
          </form>
          <label className="flex items-center gap-2 mt-3 text-xs text-white/60">
            <span className="w-3 h-3 rounded-full border border-white/40 inline-block" />
            I agree to all terms and policies of the company
          </label>
        </div>

        <div>
          <h4 className="text-white font-bold text-lg mb-5 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-primary">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3"><Phone className="w-4 h-4 mt-0.5 text-primary shrink-0" />+ 88 ( 9800 ) 6802</li>
            <li className="flex items-start gap-3"><Mail className="w-4 h-4 mt-0.5 text-primary shrink-0" />needhelp@infetech.com</li>
            <li className="flex items-start gap-3"><MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />88 Broklyn Golden Road Street New York, USA</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 text-center text-xs text-white/55">© All Copyright {new Date().getFullYear()} by Infetech</div>
      </div>
    </footer>
  );
}
