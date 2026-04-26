import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  ChevronDown,
  Facebook,
  Globe,
  GraduationCap,
  Heart,
  Lightbulb,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Star,
  Stethoscope,
  TrendingUp,
  Twitter,
  Users,
  X,
  Youtube,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { MemberRole } from "./backend.d";
import {
  useGetAllNewsItems,
  useGetForumStatistics,
  useRegisterMember,
  useSubmitContactMessage,
} from "./hooks/useQueries";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors position="top-right" />
      <MainSite />
    </QueryClientProvider>
  );
}

function MainSite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Leadership", href: "#leadership" },
    { label: "Key Pillars", href: "#pillars" },
    { label: "Vision 2047", href: "#vision" },
    { label: "News", href: "#news" },
    { label: "Join Forum", href: "#join" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Top Header Strip */}
      <header
        className="bg-white border-b border-border py-3 px-4"
        data-ocid="header.section"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
          <img
            src="/assets/generated/ashoka-emblem-transparent.dim_200x200.png"
            alt="Ashoka Emblem"
            className="h-16 w-16 object-contain"
          />
          <div className="text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
              भारत सरकार | Government of India
            </p>
            <h1 className="text-xl md:text-2xl font-bold text-navy leading-tight">
              Viksit Bharat Development Forum
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
              Apex Advisory Body | Article 49 of the Indian Constitution
            </p>
          </div>
          <img
            src="/assets/generated/ashoka-emblem-transparent.dim_200x200.png"
            alt="Forum Emblem"
            className="h-16 w-16 object-contain hidden md:block"
          />
        </div>
      </header>

      {/* Navigation */}
      <nav
        className={`sticky top-0 z-50 nav-gradient shadow-md transition-shadow duration-300 ${
          scrolled ? "shadow-lg" : ""
        }`}
        data-ocid="nav.section"
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-12">
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white text-sm font-medium px-3 py-1.5 rounded hover:bg-white/20 transition-colors"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-1"
              aria-label="Toggle menu"
              data-ocid="nav.toggle"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
          <a
            href="#join"
            className="ml-auto lg:ml-0 bg-white text-navy font-bold text-sm px-4 py-1.5 rounded hover:bg-saffron hover:text-white transition-colors"
            data-ocid="nav.register_button"
          >
            REGISTER
          </a>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-navy/95 overflow-hidden"
            >
              <div className="flex flex-col py-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white text-sm font-medium px-6 py-2.5 hover:bg-white/10 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* About Section */}
      <AboutSection />

      {/* Key Pillars Section */}
      <KeyPillarsSection />

      {/* Vision 2047 Section */}
      <Vision2047Section />

      {/* Leadership Section */}
      <LeadershipSection />

      {/* CTA Banner */}
      <CTABanner />

      {/* News Section */}
      <NewsSection />

      {/* Join Forum Section */}
      <JoinForumSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <FooterSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[600px] flex flex-col items-center justify-center overflow-hidden"
      data-ocid="hero.section"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/india-parliament.dim_1600x800.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-navy/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 py-16 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-saffron text-sm font-semibold uppercase tracking-widest mb-3">
            सत्यमेव जयते | Satyamev Jayate
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
            Building a Developed India
            <br />
            <span className="text-saffron">by 2047</span>
          </h2>
          <p className="text-lg md:text-xl text-white/85 max-w-3xl mx-auto mb-8">
            Viksit Bharat Development Forum — a national apex platform
            empowering every citizen to contribute to India's holistic
            transformation, guided by the philosophy of{" "}
            <em>Vasudeva Kutumbakam</em>.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="#join"
              className="bg-saffron hover:bg-amber-500 text-white font-bold px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
              data-ocid="hero.primary_button"
            >
              Join the Forum <ArrowRight size={18} />
            </a>
            <a
              href="#about"
              className="border-2 border-white text-white hover:bg-white hover:text-navy font-bold px-6 py-3 rounded-lg transition-colors"
              data-ocid="hero.secondary_button"
            >
              Learn More
            </a>
          </div>
        </motion.div>
      </div>

      {/* Two-column band below hero */}
      <div className="relative z-10 w-full bg-white/10 backdrop-blur-sm border-t border-white/20">
        <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
          {/* Left: Prof. Sinha quote */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex gap-4 items-start"
          >
            <img
              src="/assets/generated/prof-sinha.dim_400x400.jpg"
              alt="Prof. Ripu Ranjan Sinha"
              className="w-20 h-20 rounded-full object-cover border-4 border-saffron shrink-0"
            />
            <div>
              <p className="text-white/90 text-sm italic leading-relaxed">
                "Our mission is to build India as a nation where every
                citizen—regardless of background—can access world-class
                healthcare, quality education, and opportunities to innovate.
                Together, we embody Vasudeva Kutumbakam: the world is one
                family."
              </p>
              <p className="text-saffron font-semibold text-sm mt-2">
                — Prof. Ripu Ranjan Sinha
              </p>
              <p className="text-white/70 text-xs">
                Founder & Visionary Leader, VBDF
              </p>
            </div>
          </motion.div>

          {/* Right: Mission panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="border-l border-white/30 pl-6"
          >
            <h3 className="text-saffron font-bold text-sm uppercase tracking-widest mb-2">
              MISSION:
            </h3>
            <p className="text-white/90 text-sm leading-relaxed mb-4">
              To establish India as a fully developed nation by 2047, aligned
              with PM Modi's Viksit Bharat vision and the African Union Agenda
              2063 — ensuring dignity, ethics, and prosperity for all citizens.
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href="#vision"
                className="bg-saffron text-white text-xs font-semibold px-4 py-2 rounded hover:bg-amber-500 transition-colors"
                data-ocid="hero.vision_button"
              >
                Vision 2047
              </a>
              <a
                href="#pillars"
                className="bg-india-green text-white text-xs font-semibold px-4 py-2 rounded hover:opacity-90 transition-opacity"
                data-ocid="hero.pillars_button"
              >
                Key Pillars
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50"
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
}

function StatsSection() {
  const { data: stats } = useGetForumStatistics();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const statItems = [
    {
      label: "Total Members",
      value: stats ? Number(stats.totalMembers) : 1240,
      icon: <Users size={28} />,
    },
    {
      label: "Policy Makers",
      value: stats ? Number(stats.policyMakers) : 380,
      icon: <Building2 size={28} />,
    },
    {
      label: "Entrepreneurs",
      value: stats ? Number(stats.entrepreneurs) : 290,
      icon: <TrendingUp size={28} />,
    },
    {
      label: "Youth Members",
      value: stats ? Number(stats.youth) : 420,
      icon: <Star size={28} />,
    },
    {
      label: "Civil Societies",
      value: stats ? Number(stats.civilSociety) : 150,
      icon: <Globe size={28} />,
    },
  ];

  return (
    <section className="bg-navy py-10" ref={ref} data-ocid="stats.section">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {statItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-saffron mb-2 flex justify-center">
                {item.icon}
              </div>
              <div className="text-3xl font-bold text-white">
                {visible ? item.value.toLocaleString() : "0"}+
              </div>
              <div className="text-white/70 text-sm mt-1">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-16 bg-white" data-ocid="about.section">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="section-heading">About the Forum</h2>
          <span className="section-heading-accent" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-navy mb-3">Our Purpose</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Viksit Bharat Development Forum (VBDF) is a national apex
              advisory body constituted under Article 49 of the Indian
              Constitution, dedicated to realizing India's ambition of becoming
              a fully developed nation by 2047 — the centenary of Independence.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Under the visionary leadership of{" "}
              <strong className="text-navy">Prof. Ripu Ranjan Sinha</strong>,
              the Forum serves as a collaborative platform bringing together
              policy makers, entrepreneurs, youth, and civil society
              organizations to co-create a blueprint for India's holistic
              transformation.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Guided by the philosophy of{" "}
              <em className="text-saffron font-semibold">
                Vasudeva Kutumbakam
              </em>
              ("the world is one family"), we believe in a developed India that
              leaves no citizen behind — ethically sound, culturally rich, and
              economically prosperous.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="bg-light-gray rounded-xl p-5 border-l-4 border-saffron">
              <h4 className="font-bold text-navy mb-2 flex items-center gap-2">
                <BookOpen size={18} className="text-saffron" /> Constitutional
                Basis
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Constituted under Article 49 of the Constitution of India, the
                Forum serves as an apex advisory body providing strategic
                counsel on national development, policy formulation, and citizen
                engagement frameworks.
              </p>
            </div>
            <div className="bg-light-gray rounded-xl p-5 border-l-4 border-india-green">
              <h4 className="font-bold text-navy mb-2 flex items-center gap-2">
                <Globe size={18} className="text-india-green" /> Global
                Alignment
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                VBDF aligns with PM Shri Narendra Damodar Das Modi's{" "}
                <strong>Viksit Bharat 2047</strong> vision and the{" "}
                <strong>African Union Agenda 2063</strong>, recognizing the
                interconnected destiny of developing nations toward shared
                prosperity.
              </p>
            </div>
            <div className="bg-light-gray rounded-xl p-5 border-l-4 border-navy">
              <h4 className="font-bold text-navy mb-2 flex items-center gap-2">
                <Award size={18} className="text-navy" /> Core Philosophy
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We work with the unwavering commitment that all machinery of
                governance and society must function ethically, culturally
                richly, without disparity or imbalance — rooted in dignity for
                every citizen.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function KeyPillarsSection() {
  const pillars = [
    {
      icon: <Stethoscope size={36} />,
      title: "World-Class Healthcare",
      color: "text-red-500",
      bg: "bg-red-50",
      border: "border-red-200",
      desc: "Ensuring every Indian citizen — regardless of location or economic status — has access to quality, affordable, and dignified healthcare services.",
    },
    {
      icon: <GraduationCap size={36} />,
      title: "Quality Education",
      color: "text-saffron",
      bg: "bg-amber-50",
      border: "border-amber-200",
      desc: "Empowering citizens through education that nurtures creativity, critical thinking, and the ability to convert ideas into products and services that contribute to national income.",
    },
    {
      icon: <Lightbulb size={36} />,
      title: "Entrepreneurship & Innovation",
      color: "text-india-green",
      bg: "bg-green-50",
      border: "border-green-200",
      desc: "Building an ecosystem where innovators, entrepreneurs, and startups thrive — transforming India into a global hub of ethical business and technological innovation.",
    },
    {
      icon: <Heart size={36} />,
      title: "Vasudeva Kutumbakam",
      color: "text-navy",
      bg: "bg-blue-50",
      border: "border-blue-200",
      desc: "Upholding the ancient Indian philosophy that all of humanity is one family — fostering cultural richness, ethical governance, and social harmony without disparity.",
    },
  ];

  return (
    <section
      id="pillars"
      className="py-16 bg-light-gray"
      data-ocid="pillars.section"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="section-heading">Our Key Pillars</h2>
          <span className="section-heading-accent" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The four foundational pillars upon which a truly developed Bharat
            will be built.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              data-ocid={`pillars.item.${i + 1}`}
            >
              <Card
                className={`h-full pillar-card border ${pillar.border} hover:scale-105 transition-transform duration-300`}
              >
                <CardHeader className="pb-3">
                  <div
                    className={`${pillar.bg} ${pillar.color} w-16 h-16 rounded-xl flex items-center justify-center mb-3`}
                  >
                    {pillar.icon}
                  </div>
                  <CardTitle className="text-base font-bold text-navy">
                    {pillar.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Vision2047Section() {
  return (
    <section id="vision" className="py-16 bg-white" data-ocid="vision.section">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-saffron text-sm font-bold uppercase tracking-widest mb-2">
              Aligned Visions
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4 leading-tight">
              Viksit Bharat 2047 &<br />
              <span className="text-india-green">AU Agenda 2063</span>
            </h2>
            <div className="w-12 h-1 bg-saffron mb-6" />
            <p className="text-muted-foreground leading-relaxed mb-4">
              Hon'ble Prime Minister Shri Narendra Damodar Das Modi's{" "}
              <strong className="text-navy">Viksit Bharat 2047</strong> vision
              charts India's path to becoming a fully developed nation by the
              centenary of independence. This encompasses a $30 trillion
              economy, zero poverty, world-class infrastructure, and a leading
              position in science and technology.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Forum also aligns with the{" "}
              <strong className="text-india-green">
                African Union's Agenda 2063
              </strong>{" "}
              — recognizing the shared destiny of the Global South in building
              prosperous, united, and self-reliant nations. Together, these
              frameworks represent the aspirations of over 2 billion people.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              VBDF bridges vision with action — translating national aspirations
              into grassroots programs, policy recommendations, and citizen-led
              initiatives that touch every district, every village, and every
              family across Bharat.
            </p>
            <a
              href="#join"
              className="bg-navy text-white font-bold px-6 py-3 rounded-lg hover:bg-navy/90 transition-colors inline-flex items-center gap-2"
              data-ocid="vision.primary_button"
            >
              Contribute to the Vision <ArrowRight size={18} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Visualization graphic */}
            <div className="bg-navy rounded-2xl p-8 text-white">
              <div className="text-center mb-6">
                <img
                  src="/assets/generated/ashoka-emblem-transparent.dim_200x200.png"
                  alt="Ashoka Chakra"
                  className="w-20 h-20 mx-auto mb-4 object-contain brightness-200"
                />
                <h3 className="text-xl font-bold">Development Goals</h3>
              </div>
              <div className="space-y-4">
                {[
                  {
                    label: "Healthcare Access",
                    value: 85,
                    color: "bg-red-400",
                  },
                  {
                    label: "Education Quality",
                    value: 75,
                    color: "bg-saffron",
                  },
                  {
                    label: "Innovation Index",
                    value: 65,
                    color: "bg-blue-400",
                  },
                  {
                    label: "Economic Growth",
                    value: 90,
                    color: "bg-india-green",
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/80">{item.label}</span>
                      <span className="text-saffron font-bold">
                        {item.value}%
                      </span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className={`h-full ${item.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-white/20 grid grid-cols-2 gap-3 text-center text-sm">
                <div>
                  <div className="text-2xl font-bold text-saffron">2047</div>
                  <div className="text-white/70">Viksit Bharat Target</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-india-green">
                    2063
                  </div>
                  <div className="text-white/70">AU Agenda Target</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LeadershipSection() {
  return (
    <section
      id="leadership"
      className="py-16 bg-light-gray"
      data-ocid="leadership.section"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="section-heading">Meet Our Leadership</h2>
          <span className="section-heading-accent" />
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
          {/* Primary leader card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            data-ocid="leadership.item.1"
            className="flex-1 max-w-sm"
          >
            <Card className="text-center shadow-card hover:shadow-card-hover transition-shadow duration-300 border-0">
              <CardContent className="pt-8 pb-6 px-6">
                <div className="relative mx-auto mb-4 w-32 h-32">
                  <img
                    src="/assets/generated/prof-sinha.dim_400x400.jpg"
                    alt="Prof. Ripu Ranjan Sinha"
                    className="w-32 h-32 rounded-full object-cover border-4 border-saffron"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-saffron rounded-full p-1.5">
                    <Star size={14} className="text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-navy">
                  Prof. Ripu Ranjan Sinha
                </h3>
                <p className="text-saffron text-sm font-semibold mt-1">
                  Founder & Visionary Leader
                </p>
                <p className="text-muted-foreground text-xs mt-0.5">
                  Viksit Bharat Development Forum
                </p>
                <div className="w-10 h-0.5 bg-saffron mx-auto my-3" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A distinguished academician, policy strategist, and
                  nation-builder with decades of experience in public
                  governance, education reform, and socio-economic development.
                  Prof. Sinha envisions an India that leads the world in human
                  values and economic prowess.
                </p>
                <div className="mt-4 flex justify-center gap-3">
                  <div className="bg-navy/10 text-navy text-xs px-3 py-1 rounded-full font-medium">
                    Policy Expert
                  </div>
                  <div className="bg-saffron/10 text-saffron text-xs px-3 py-1 rounded-full font-medium">
                    Academician
                  </div>
                  <div className="bg-india-green/10 text-india-green text-xs px-3 py-1 rounded-full font-medium">
                    Reformist
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Two supporting leaders */}
          {[
            {
              name: "Dr. Priya Sharma",
              role: "Director — Healthcare Policy",
              bio: "Former advisor to Ministry of Health with expertise in public health systems, universal healthcare access, and rural medicine infrastructure.",
              badges: ["Healthcare", "Policy"],
            },
            {
              name: "Shri Arjun Mehta",
              role: "Director — Education & Youth",
              bio: "Pioneer in education technology and skill development with a vision to bridge India's education gap and empower the next billion innovators.",
              badges: ["Education", "Innovation"],
            },
          ].map((leader, i) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i + 1) * 0.15 }}
              data-ocid={`leadership.item.${i + 2}`}
              className="flex-1 max-w-xs"
            >
              <Card className="text-center shadow-card hover:shadow-card-hover transition-shadow duration-300 border-0">
                <CardContent className="pt-6 pb-5 px-5">
                  <div className="w-24 h-24 rounded-full bg-navy/10 mx-auto mb-3 flex items-center justify-center">
                    <Users size={36} className="text-navy/40" />
                  </div>
                  <h3 className="text-lg font-bold text-navy">{leader.name}</h3>
                  <p className="text-saffron text-xs font-semibold mt-1">
                    {leader.role}
                  </p>
                  <div className="w-8 h-0.5 bg-saffron mx-auto my-2" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {leader.bio}
                  </p>
                  <div className="mt-3 flex justify-center gap-2">
                    {leader.badges.map((b) => (
                      <span
                        key={b}
                        className="bg-navy/10 text-navy text-xs px-2 py-0.5 rounded-full font-medium"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="bg-navy py-12 px-4" data-ocid="cta.section">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Join the Movement — <span className="text-saffron">Jai Hind!</span>
          </h2>
          <p className="text-white/75 mb-6 max-w-2xl mx-auto">
            Whether you are a policy maker, entrepreneur, youth leader, or civil
            society organization — your voice and contribution matter. Be part
            of shaping a Viksit Bharat.
          </p>
          <a
            href="#join"
            className="bg-saffron hover:bg-amber-500 text-white font-bold px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2 text-lg"
            data-ocid="cta.primary_button"
          >
            Register Now <ArrowRight size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

const SAMPLE_NEWS = [
  {
    id: 1n,
    title: "VBDF Launches National Healthcare Access Initiative",
    date: BigInt(Date.now()),
    summary:
      "The Forum announces a comprehensive program to extend quality healthcare to 500 rural districts, targeting zero out-of-pocket expenditure for BPL families by 2026.",
    category: "Healthcare",
  },
  {
    id: 2n,
    title: "Youth Entrepreneurship Conclave 2026 — New Delhi",
    date: BigInt(Date.now() - 86400000 * 7),
    summary:
      "Over 5,000 young innovators gathered at the national conclave to present solutions for India's development challenges, with top ventures receiving seed funding and policy mentorship.",
    category: "Entrepreneurship",
  },
  {
    id: 3n,
    title: "Policy Forum on Education Reform Tables Key Recommendations",
    date: BigInt(Date.now() - 86400000 * 14),
    summary:
      "VBDF's Education Policy Forum has submitted 12 landmark recommendations to the Ministry of Education, focusing on skill-based learning, digital access, and quality teachers in Tier-3 cities.",
    category: "Education",
  },
];

function NewsSection() {
  const { data: newsItems, isLoading } = useGetAllNewsItems();
  const displayItems =
    newsItems && newsItems.length > 0 ? newsItems.slice(0, 3) : SAMPLE_NEWS;

  return (
    <section id="news" className="py-16 bg-white" data-ocid="news.section">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="section-heading">Latest News & Updates</h2>
          <span className="section-heading-accent" />
        </motion.div>

        {isLoading ? (
          <div
            className="flex justify-center py-12"
            data-ocid="news.loading_state"
          >
            <Loader2 className="animate-spin text-saffron" size={36} />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6" data-ocid="news.list">
            {displayItems.map((item, i) => (
              <motion.div
                key={String(item.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                data-ocid={`news.item.${i + 1}`}
              >
                <Card className="h-full shadow-card hover:shadow-card-hover transition-shadow duration-300 border-0 overflow-hidden">
                  <div className="h-2 bg-saffron" />
                  <CardContent className="p-5">
                    <span className="text-xs font-bold uppercase tracking-widest text-saffron bg-amber-50 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-navy mt-3 mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {item.summary}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {new Date(
                          Number(item.date) / 1_000_000,
                        ).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <button
                        type="button"
                        className="text-saffron text-xs font-semibold hover:underline"
                      >
                        Read More →
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function JoinForumSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "" as MemberRole | "",
    organization: "",
    state: "",
    message: "",
  });
  const { mutate, isPending } = useRegisterMember();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.role) {
      toast.error("Please fill in all required fields.");
      return;
    }
    mutate(
      { ...form, role: form.role as MemberRole },
      {
        onSuccess: () => {
          toast.success(
            "Registration successful! Welcome to Viksit Bharat Development Forum. Jai Hind!",
          );
          setForm({
            name: "",
            email: "",
            role: "",
            organization: "",
            state: "",
            message: "",
          });
        },
        onError: () => toast.error("Registration failed. Please try again."),
      },
    );
  };

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
    "Jammu & Kashmir",
    "Ladakh",
    "Andaman & Nicobar",
    "Chandigarh",
    "Dadra & Nagar Haveli",
    "Lakshadweep",
    "Puducherry",
  ];

  return (
    <section id="join" className="py-16 bg-light-gray" data-ocid="join.section">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="section-heading">Join the Forum</h2>
          <span className="section-heading-accent" />
          <p className="text-muted-foreground max-w-xl mx-auto">
            Register as a member and contribute your expertise to India's
            development journey. Every citizen's voice matters.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-card border-0">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="join-name"
                      className="font-semibold text-navy text-sm"
                    >
                      Full Name *
                    </Label>
                    <Input
                      id="join-name"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      className="mt-1"
                      data-ocid="join.input"
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="join-email"
                      className="font-semibold text-navy text-sm"
                    >
                      Email Address *
                    </Label>
                    <Input
                      id="join-email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      className="mt-1"
                      data-ocid="join.input"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label className="font-semibold text-navy text-sm">
                    Your Role *
                  </Label>
                  <Select
                    value={form.role}
                    onValueChange={(v) =>
                      setForm((p) => ({ ...p, role: v as MemberRole }))
                    }
                  >
                    <SelectTrigger className="mt-1" data-ocid="join.select">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={MemberRole.policy_maker}>
                        Policy Maker
                      </SelectItem>
                      <SelectItem value={MemberRole.entrepreneur}>
                        Entrepreneur
                      </SelectItem>
                      <SelectItem value={MemberRole.youth}>Youth</SelectItem>
                      <SelectItem value={MemberRole.civil_society}>
                        Civil Society
                      </SelectItem>
                      <SelectItem value={MemberRole.other}>Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="join-org"
                      className="font-semibold text-navy text-sm"
                    >
                      Organization
                    </Label>
                    <Input
                      id="join-org"
                      placeholder="Your organization/institution"
                      value={form.organization}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, organization: e.target.value }))
                      }
                      className="mt-1"
                      data-ocid="join.input"
                    />
                  </div>
                  <div>
                    <Label className="font-semibold text-navy text-sm">
                      State
                    </Label>
                    <Select
                      value={form.state}
                      onValueChange={(v) =>
                        setForm((p) => ({ ...p, state: v }))
                      }
                    >
                      <SelectTrigger className="mt-1" data-ocid="join.select">
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60 overflow-y-auto">
                        {indianStates.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="join-msg"
                    className="font-semibold text-navy text-sm"
                  >
                    How would you like to contribute?
                  </Label>
                  <Textarea
                    id="join-msg"
                    placeholder="Share your vision, expertise, or how you wish to contribute to Viksit Bharat..."
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    className="mt-1 min-h-[100px]"
                    data-ocid="join.textarea"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-saffron hover:bg-amber-500 text-white font-bold py-3 text-base"
                  data-ocid="join.submit_button"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Registering...
                    </>
                  ) : (
                    "Register as Forum Member"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { mutate, isPending } = useSubmitContactMessage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    mutate(form, {
      onSuccess: () => {
        toast.success(
          "Message sent successfully. We will respond within 48 hours.",
        );
        setForm({ name: "", email: "", subject: "", message: "" });
      },
      onError: () => toast.error("Failed to send message. Please try again."),
    });
  };

  return (
    <section
      id="contact"
      className="py-16 bg-white"
      data-ocid="contact.section"
    >
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="section-heading">Contact Us</h2>
          <span className="section-heading-accent" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-navy mb-4">Get in Touch</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We welcome inquiries from policy makers, researchers, civil
              society organizations, and citizens who wish to engage with the
              Forum's work.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-saffron mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-navy text-sm">
                    Registered Office
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Viksit Bharat Development Forum,
                    <br />
                    New Delhi — 110 001, India
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-saffron shrink-0" />
                <div>
                  <p className="font-semibold text-navy text-sm">Email</p>
                  <p className="text-sm text-muted-foreground">
                    contact@viksitbharatforum.in
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-saffron shrink-0" />
                <div>
                  <p className="font-semibold text-navy text-sm">Helpline</p>
                  <p className="text-sm text-muted-foreground">
                    +91 11 2345 6789
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="shadow-card border-0">
              <CardContent className="p-5">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <Label
                        htmlFor="c-name"
                        className="text-sm font-semibold text-navy"
                      >
                        Name *
                      </Label>
                      <Input
                        id="c-name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                        className="mt-1"
                        data-ocid="contact.input"
                        required
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="c-email"
                        className="text-sm font-semibold text-navy"
                      >
                        Email *
                      </Label>
                      <Input
                        id="c-email"
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, email: e.target.value }))
                        }
                        className="mt-1"
                        data-ocid="contact.input"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label
                      htmlFor="c-sub"
                      className="text-sm font-semibold text-navy"
                    >
                      Subject *
                    </Label>
                    <Input
                      id="c-sub"
                      placeholder="Subject of your inquiry"
                      value={form.subject}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, subject: e.target.value }))
                      }
                      className="mt-1"
                      data-ocid="contact.input"
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="c-msg"
                      className="text-sm font-semibold text-navy"
                    >
                      Message *
                    </Label>
                    <Textarea
                      id="c-msg"
                      placeholder="Your message..."
                      value={form.message}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, message: e.target.value }))
                      }
                      className="mt-1 min-h-[100px]"
                      data-ocid="contact.textarea"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-navy hover:bg-navy/90 text-white font-bold"
                    data-ocid="contact.submit_button"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy text-white" data-ocid="footer.section">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img
                src="/assets/generated/ashoka-emblem-transparent.dim_200x200.png"
                alt="Emblem"
                className="h-10 w-10 object-contain brightness-200"
              />
              <h3 className="font-bold text-sm">
                Viksit Bharat
                <br />
                Development Forum
              </h3>
            </div>
            <p className="text-white/60 text-xs leading-relaxed">
              An apex advisory body under Article 49 of the Indian Constitution,
              dedicated to building a developed, ethical, and prosperous India
              by 2047.
            </p>
            <p className="text-saffron text-xs font-semibold mt-3 italic">
              वसुधैव कुटुम्बकम् — Vasudeva Kutumbakam
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-saffron mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs text-white/70">
              {[
                ["Home", "#home"],
                ["About Us", "#about"],
                ["Key Pillars", "#pillars"],
                ["Vision 2047", "#vision"],
                ["Leadership", "#leadership"],
                ["News & Updates", "#news"],
                ["Join Forum", "#join"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="hover:text-saffron transition-colors"
                    data-ocid="footer.link"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Vision */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-saffron mb-4">
              Our Vision
            </h3>
            <div className="space-y-2 text-xs text-white/70">
              <p>🇮🇳 Viksit Bharat 2047</p>
              <p>🌍 African Union Agenda 2063</p>
              <p>🏛 Article 49, Constitution of India</p>
              <p>⚖️ Ethical & Cultural Excellence</p>
              <p>🏥 Universal Healthcare Access</p>
              <p>📚 Quality Education for All</p>
              <p>💡 Innovation & Entrepreneurship</p>
            </div>
          </div>

          {/* Contact + Social */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-saffron mb-4">
              Connect With Us
            </h3>
            <div className="space-y-2 text-xs text-white/70 mb-5">
              <div className="flex items-center gap-2">
                <Mail size={13} /> contact@viksitbharatforum.in
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} /> +91 11 2345 6789
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={13} /> New Delhi, India — 110 001
              </div>
            </div>
            <h4 className="text-xs font-semibold text-white/80 mb-2">
              Follow Us
            </h4>
            <div className="flex gap-3">
              {[
                { icon: <Facebook size={16} />, label: "Facebook" },
                { icon: <Twitter size={16} />, label: "Twitter/X" },
                { icon: <Linkedin size={16} />, label: "LinkedIn" },
                { icon: <Youtube size={16} />, label: "YouTube" },
              ].map((social) => (
                <button
                  type="button"
                  key={social.label}
                  aria-label={social.label}
                  className="bg-white/10 hover:bg-saffron text-white p-2 rounded transition-colors"
                  data-ocid="footer.link"
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {year} Viksit Bharat Development Forum. All Rights Reserved.</p>
          <p className="text-white/60 font-medium">
            सत्यमेव जयते | Satyamev Jayate | Jai Hind 🇮🇳
          </p>
          <p>
            Built with <Heart size={12} className="inline text-red-400" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-saffron hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
