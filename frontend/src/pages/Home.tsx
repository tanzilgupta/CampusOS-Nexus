import { useEffect, useRef, useState } from "react";
import { ArrowRight, Trophy, Sparkles, ArrowUpRight, Users2, Cpu, Zap, Shield, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

/* ─── Animated counter hook ─────────────────────────────── */
function useCountUp(target: number, duration = 1800, start = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [start, target, duration]);
    return count;
}

/* ─── Intersection observer hook ────────────────────────── */
function useVisible(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return { ref, visible };
}

/* ─── Floating particle background ──────────────────────── */
function ParticleField() {
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        dur: Math.random() * 8 + 4,
        delay: Math.random() * -6,
        opacity: Math.random() * 0.4 + 0.1,
    }));
    return (
        <div className="particle-field" aria-hidden="true">
            {particles.map(p => (
                <div
                    key={p.id}
                    className="particle"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        opacity: p.opacity,
                        animationDuration: `${p.dur}s`,
                        animationDelay: `${p.delay}s`,
                    }}
                />
            ))}
        </div>
    );
}

/* ─── Stats data ─────────────────────────────────────────── */
const STATS = [
    { label: "Active Collaborators", value: 5000, suffix: "+" },
    { label: "Teams Formed", value: 1200, suffix: "+" },
    { label: "Match Satisfaction", value: 94, suffix: "%" },
    { label: "Project Showcases", value: 350, suffix: "+" },
];

/* ─── Features data ──────────────────────────────────────── */
const FEATURES = [
    {
        icon: <Cpu size={26} />,
        title: "AI-Powered Teammate Match",
        desc: "Get explainable recommendations based on weighted factors: skill overlap, availability, and collaborative chemistry score.",
        color: "var(--primary)",
        glow: "rgba(99,102,241,.2)",
    },
    {
        icon: <Users2 size={26} />,
        title: "Team Formation & Gap Analysis",
        desc: "See a clear skill map of your team. Instantly pinpoint what technologies are missing and auto-invite matches that fill the gap.",
        color: "var(--secondary)",
        glow: "rgba(6,182,212,.2)",
    },
    {
        icon: <Trophy size={26} />,
        title: "Verified Collaboration Portfolios",
        desc: "Turn your work into portfolio assets. Peer ratings, completed tasks, and supervisor reviews verify your real-world contribution.",
        color: "#a855f7",
        glow: "rgba(168,85,247,.2)",
    },
];

/* ─── Steps data ─────────────────────────────────────────── */
const STEPS = [
    {
        n: "01",
        title: "Define Skills & Profile",
        desc: "List your major, code repositories, design portfolios, and set your weekly availability window.",
        icon: <Shield size={22} />,
    },
    {
        n: "02",
        title: "Discover Projects or Teammates",
        desc: "Publish a project proposal with needed roles, or search recommendations for teammates who have missing skills.",
        icon: <Zap size={22} />,
    },
    {
        n: "03",
        title: "Launch, Review, & Showcase",
        desc: "Form your team, track milestones, leave peer feedback reviews, and build a verified collaborative track record.",
        icon: <Star size={22} />,
    },
];

/* ─── Stat card ──────────────────────────────────────────── */
function StatCard({ stat, started }: { stat: typeof STATS[0]; started: boolean }) {
    const count = useCountUp(stat.value, 1800, started);
    return (
        <div className="home-stat-card">
            <strong>{count.toLocaleString()}{stat.suffix}</strong>
            <span>{stat.label}</span>
        </div>
    );
}

/* ─── Home Page ──────────────────────────────────────────── */
function Home() {
    const navigate = useNavigate();

    const statsSection = useVisible(0.2);
    const featuresSection = useVisible(0.1);
    const stepsSection = useVisible(0.1);

    return (
        <div className="home">

            {/* ══ HERO ══════════════════════════════════════════════ */}
            <section className="hero-section">
                <ParticleField />
                <div className="hero-mesh" aria-hidden="true" />

                <div className="hero-content fade-up">
                    <div className="hero-badge">
                        <Sparkles size={13} />
                        <span>The Ultimate Student Collaboration Network</span>
                    </div>

                    <h1 className="hero-title">
                        Build.<br />
                        Collaborate.<br />
                        <span className="hero-title-accent">Innovate Together.</span>
                    </h1>

                    <p className="hero-desc">
                        CampusOS Nexus bridges the gap between ambitious student ideas and skilled collaborators.
                        Find your next co-founder, form complementary project teams, and build a verified technical portfolio.
                    </p>

                    <div className="hero-actions">
                        <Button icon={<ArrowRight size={18} />} onClick={() => navigate("/projects")}>
                            Explore Projects
                        </Button>
                        <Button variant="secondary" onClick={() => navigate("/register")}>
                            Create Profile
                        </Button>
                    </div>
                </div>

                {/* Right visual */}
                <div className="hero-visual-wrap">
                    <div className="hero-visual-ring ring-outer" />
                    <div className="hero-visual-ring ring-mid" />
                    <div className="hero-visual-ring ring-inner" />
                    <div className="hero-orb animate-pulse-glow">
                        <Sparkles size={38} strokeWidth={1.5} />
                        <span>CampusOS<br /><em>Nexus</em></span>
                    </div>
                    <div className="hero-float-card card-tl">
                        <div className="hfc-icon" style={{ background: "rgba(99,102,241,.15)", color: "var(--primary)" }}>🚀</div>
                        <div>
                            <strong>Smart Matching</strong>
                            <p>AI-scored compatibility</p>
                        </div>
                    </div>
                    <div className="hero-float-card card-br">
                        <div className="hfc-icon" style={{ background: "rgba(6,182,212,.15)", color: "var(--secondary)" }}>🤝</div>
                        <div>
                            <strong>Verified Proof</strong>
                            <p>Peer-confirmed portfolios</p>
                        </div>
                    </div>
                    <div className="hero-float-card card-tr">
                        <div className="hfc-icon" style={{ background: "rgba(168,85,247,.15)", color: "#a855f7" }}>⚡</div>
                        <div>
                            <strong>Instant Invite</strong>
                            <p>One-click collaboration</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ STATS ════════════════════════════════════════════ */}
            <section className="home-stats-section" ref={statsSection.ref}>
                <div className="home-stats-inner">
                    {STATS.map((s) => (
                        <StatCard key={s.label} stat={s} started={statsSection.visible} />
                    ))}
                </div>
            </section>

            {/* ══ FEATURES ══════════════════════════════════════════ */}
            <section className="home-section" ref={featuresSection.ref}>
                <div className="home-section-inner">
                    <div className={`home-section-header ${featuresSection.visible ? "section-visible" : "section-hidden"}`}>
                        <div className="section-label"><Sparkles size={12} /> Features</div>
                        <h2 className="section-title">
                            Everything you need to <span>Build Big Ideas</span>
                        </h2>
                        <p className="section-subtitle">
                            CampusOS Nexus simplifies project matching, communication, and performance tracking inside university hubs.
                        </p>
                    </div>

                    <div className="features-grid">
                        {FEATURES.map((f, i) => (
                            <div
                                key={f.title}
                                className={`feature-card-new ${featuresSection.visible ? "section-visible" : "section-hidden"}`}
                                style={{ animationDelay: `${i * 0.12}s`, transitionDelay: `${i * 0.12}s` }}
                            >
                                <div className="fcn-icon-wrap" style={{ background: f.glow, color: f.color }}>
                                    {f.icon}
                                </div>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                                <div className="fcn-glow" style={{ background: f.glow }} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ HOW IT WORKS ══════════════════════════════════════ */}
            <section className="home-section home-section-alt" ref={stepsSection.ref}>
                <div className="home-section-inner">
                    <div className={`home-section-header ${stepsSection.visible ? "section-visible" : "section-hidden"}`}>
                        <div className="section-label">Workflow</div>
                        <h2 className="section-title">How <span>CampusOS Nexus</span> Works</h2>
                        <p className="section-subtitle">A simple, transparent flow from registration to collaborative success.</p>
                    </div>

                    <div className="steps-row">
                        {STEPS.map((s, i) => (
                            <div
                                key={s.n}
                                className={`step-card-new ${stepsSection.visible ? "section-visible" : "section-hidden"}`}
                                style={{ animationDelay: `${i * 0.15}s`, transitionDelay: `${i * 0.15}s` }}
                            >
                                <div className="step-icon-wrap">{s.icon}</div>
                                <span className="step-num">{s.n}</span>
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                                {i < STEPS.length - 1 && <div className="step-connector" aria-hidden="true" />}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ CTA ═══════════════════════════════════════════════ */}
            <section className="home-cta-section">
                <div className="home-cta-inner">
                    <div className="cta-blob cta-blob-1" aria-hidden="true" />
                    <div className="cta-blob cta-blob-2" aria-hidden="true" />
                    <div className="cta-content">
                        <div className="section-label" style={{ justifyContent: "center" }}>
                            <Sparkles size={12} /> Ready to Start?
                        </div>
                        <h2>Launch your next project today</h2>
                        <p>Join thousands of university students building the future of software, hardware, and design.</p>
                        <div className="cta-actions">
                            <Link to="/register" className="cta-btn-primary">
                                Get Started Free <ArrowUpRight size={18} />
                            </Link>
                            <Link to="/login" className="cta-btn-outline">Sign In</Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default Home;
