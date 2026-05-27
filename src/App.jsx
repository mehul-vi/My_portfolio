import React, { useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  ArrowRight,
  Check,
  Send,
  Download,
  Sparkles,
  Copy,
  ArrowUpRight,
  Terminal,
} from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";


// Web3Forms Access Key. Register for free at https://web3forms.com/ to receive contact emails.
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "83a697e0-0a07-4875-a084-685bdb65afd5";

export default function App() {
  const [typedText, setTypedText] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [activeSkillCatIdx, setActiveSkillCatIdx] = useState(0);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springConfig = { stiffness: 400, damping: 28 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  const [cursorHovered, setCursorHovered] = useState(false);

  // --- INTERACTIVE SIMULATOR STATES ---
  const [activeSim, setActiveSim] = useState(null);

  // 1. Lumen Tracker States
  const [lumenTx, setLumenTx] = useState([
    { id: 1, name: "goibibo.com", category: "Travel", date: "Oct 9, 2017", amount: 1524 }
  ]);
  const [lumenOcrUploading, setLumenOcrUploading] = useState(false);
  const [lumenOcrStep, setLumenOcrStep] = useState("");
  const [lumenTxName, setLumenTxName] = useState("");
  const [lumenTxCategory, setLumenTxCategory] = useState("Other");
  const [lumenTxAmount, setLumenTxAmount] = useState("");
  const [lumenActiveTab, setLumenActiveTab] = useState("Dashboard");

  // 2. GenUI Compiler States
  const [genUiPrompt, setGenUiPrompt] = useState("Glassmorphic Pricing Card");
  const [genUiCompiling, setGenUiCompiling] = useState(false);
  const [genUiActiveTab, setGenUiActiveTab] = useState("Preview");
  const [genUiRenderedPrompt, setGenUiRenderedPrompt] = useState("Glassmorphic Pricing Card");

  // 3. AI Code Reviewer States
  const [reviewerCode, setReviewerCode] = useState(
    `function calculateTotal(items) {\n  var total = 0;\n  for(var i=0; i<items.length; i++) {\n    total = total + items[i].price;\n  }\n  return total;\n}`
  );
  const [reviewerScanning, setReviewerScanning] = useState(false);
  const [reviewerAudited, setReviewerAudited] = useState(false);
  const [reviewerQuality, setReviewerQuality] = useState(68);
  const [reviewerFixed, setReviewerFixed] = useState(false);

  // --- SIMULATOR FUNCTIONS ---
  const handleAddLumenTx = (e) => {
    e.preventDefault();
    if (!lumenTxName || !lumenTxAmount) return;
    const amountVal = parseFloat(lumenTxAmount);
    if (isNaN(amountVal) || amountVal <= 0) return;

    const newTx = {
      id: Date.now(),
      name: lumenTxName,
      category: lumenTxCategory,
      date: "Today",
      amount: amountVal
    };

    setLumenTx([newTx, ...lumenTx]);
    setLumenTxName("");
    setLumenTxAmount("");
  };

  const simulateLumenOcr = () => {
    if (lumenOcrUploading) return;
    setLumenOcrUploading(true);
    setLumenOcrStep("Uploading receipt image...");

    setTimeout(() => {
      setLumenOcrStep("Analyzing document with Python OCR...");
      setTimeout(() => {
        setLumenOcrStep("Gemini parsing receipt details...");
        setTimeout(() => {
          const newTx = {
            id: Date.now(),
            name: "Amazon Web Services",
            category: "Tech Stack",
            date: "Today",
            amount: 2450
          };
          setLumenTx([newTx, ...lumenTx]);
          setLumenOcrUploading(false);
          setLumenOcrStep("");
        }, 1000);
      }, 1000);
    }, 1000);
  };

  const handleGenUiCompile = (e) => {
    e.preventDefault();
    if (!genUiPrompt || genUiCompiling) return;
    setGenUiCompiling(true);
    setTimeout(() => {
      setGenUiRenderedPrompt(genUiPrompt);
      setGenUiCompiling(false);
    }, 1500);
  };

  const runCodeReview = () => {
    if (reviewerScanning) return;
    setReviewerScanning(true);
    setTimeout(() => {
      setReviewerScanning(false);
      setReviewerAudited(true);
    }, 1800);
  };

  const autoFixCode = () => {
    if (reviewerFixed) return;
    setReviewerCode(
      `const calculateTotal = (items) => \n  items.reduce((total, item) => total + Math.max(0, item.price), 0);`
    );
    setReviewerQuality(98);
    setReviewerFixed(true);
  };


  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === "BUTTON" ||
        e.target.tagName === "A" ||
        e.target.closest("button") ||
        e.target.closest("a") ||
        e.target.closest(".p-8") ||
        e.target.closest(".p-5")
      ) {
        setCursorHovered(true);
      } else {
        setCursorHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);


  const fullText = "Full Stack & AI Developer";

  // Typing Effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 70);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("mehulkumars315@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText("9770989610");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSending(true);
    setSubmitError(null);

    const accessKey = WEB3FORMS_ACCESS_KEY;

    // If access key is still default/placeholder, use premium simulation demo mode
    if (!accessKey || accessKey.includes("YOUR_ACCESS_KEY_HERE")) {
      setTimeout(() => {
        setFormSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setIsSending(false);
      }, 1200);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact from ${formData.name}`,
          from_name: "Portfolio Site",
        })
      });

      const result = await response.json();
      if (result.success) {
        setFormSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitError(result.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setSubmitError("A connection error occurred. Please check your network and try again.");
    } finally {
      setIsSending(false);
    }
  };

  const projects = [
    {
      title: "Lumen — Finance Tracker",
      subtitle: "MERN Stack + OCR + AI Integration",
      desc: "Enhanced finance tracking application featuring dashboard analytics, OCR receipt scanning, and AI budgeting insights using the MERN stack and Python OCR.",
      tech: ["React", "Node.js", "Express", "MongoDB", "Python"],
      category: "ai",
      screenshot: "/lumen_review.png",
      url: "https://ai-expence-tracker-deploy-y7n7.vercel.app/login"
    },
    {
      title: "AI Code Reviewer",
      subtitle: "MERN Stack + Python + OpenAI API",
      desc: "A powerful platform providing instant computerized code review. Analyzes syntax patterns, security bugs, and performance optimization using OpenAI GPT integrations.",
      tech: ["React", "Node.js", "Express", "MongoDB", "OpenAI API"],
      category: "ai",
      screenshot: "/reviewer_review.png",
      url: "https://review-mu-eight.vercel.app/"
    },
    {
      title: "GenUI — AI Component Generator",
      subtitle: "React.js + Tailwind CSS + Gemini API",
      desc: "AI-powered UI component generator workspace with real-time drag-and-drop or prompt-driven Tailwind CSS styling previews, sandboxed code views, and direct code exports.",
      tech: ["React", "Tailwind CSS", "Gemini API", "Node.js", "Framer Motion"],
      category: "web",
      screenshot: "/genui_review.png",
      url: "https://component-generator-ai-ashen.vercel.app/"
    },
  ];

  const reviews = [
    {
      title: "Lumen — Finance Tracker",
      url: "https://ai-expence-tracker-deploy-y7n7.vercel.app/login",
      shortUrl: "ai-expence-tracker-deploy-y7n7.vercel.app/login",
      screenshot: "/lumen_review.png",
      rating: "9.8",
      highlights: ["AI Budget Forecasting", "OCR Receipt Processing", "Real-Time Cash Analytics"],
      metrics: { latency: "420ms", uptime: "99.99%", audit: "Passed" },
      auditNotes: "Highly secure JWT-validated architecture with optimized Python OCR service pipelines. Passed rigorous performance stress tests with outstanding MERN indexing latency."
    },
    {
      title: "GenUI — AI Component Generator",
      url: "https://component-generator-ai-ashen.vercel.app/",
      shortUrl: "component-generator-ai-ashen.vercel.app",
      screenshot: "/genui_review.png",
      rating: "9.7",
      highlights: ["Gemini Prompt Compiles", "Live Tailwind Sandbox", "Direct Code Exports"],
      metrics: { latency: "380ms", uptime: "100.0%", audit: "Excellent" },
      auditNotes: "Excellent fluid drag-and-drop reactive components utilizing Gemini context guidelines. Extremely light DOM weight resulting in rapid 380ms layout updates."
    },
    {
      title: "AI Code Reviewer",
      url: "https://review-mu-eight.vercel.app/",
      shortUrl: "review-mu-eight.vercel.app",
      screenshot: "/reviewer_review.png",
      rating: "9.6",
      highlights: ["OpenAI Code Diagnostics", "Syntax Bug Highlighter", "Security Auditing Score"],
      metrics: { latency: "510ms", uptime: "99.98%", audit: "Highly Secure" },
      auditNotes: "Flawless API orchestration parsing abstract syntax trees and delivering deep contextual bug explanations. Integrates secure diagnostic caches to prevent review redundancies."
    }
  ];

  const skillCategories = [
    {
      title: "AI & GenAI Ecosystem",
      desc: "Specialized in integrating smart models and designing automated pipelines.",
      skills: [
        { name: "Gemini & OpenAI API", desc: "Integrating GPT and Gemini models for logic generation" },
        { name: "LLM & OCR Integration", desc: "Building document analysis pipelines & context-aware systems" },
        { name: "Prompt Engineering", desc: "Orchestrating prompt templates & response parsing structures" }
      ]
    },
    {
      title: "Full Stack Development",
      desc: "Constructing responsive front-ends and scalable backend infrastructures.",
      skills: [
        { name: "React.js", desc: "Structuring modular state-driven interactive user interfaces" },
        { name: "Node.js & Express", desc: "Architecting solid, modular RESTful CRUD backend services" },
        { name: "MongoDB", desc: "Designing optimized database schemas & aggregation pipelines" },
        { name: "Tailwind CSS", desc: "Styling visually stunning interfaces using utility classes" }
      ]
    },
    {
      title: "Programming & Tools",
      desc: "Core computational foundations and industrial development tools.",
      skills: [
        { name: "JavaScript (ES6+)", desc: "Writing clean, asynchronous state-driven application logic" },
        { name: "Python", desc: "Developing AI scripts, OCR processors, & automation workflows" },
        { name: "Git & GitHub", desc: "Version control and collaborative workflow pipelines" },
        { name: "Docker", desc: "Containerizing applications & managing isolated development ecosystems" }
      ]
    }
  ];

  const hackathons = [
    {
      title: "Hack-a-Sol 4.0",
      organizer: "IIIT Naya Raipur",
      collaboration: "GDG Raipur",
      date: "November 14 - 15, 2025",
      role: "Participant",
      desc: "An intense 36-hour hackathon where we designed and engineered high-performance, real-world solutions under tight timelines. Collaborated closely with teammates to implement modern software architectures and pitched directly to experienced judges from GDG Raipur and IIIT Naya Raipur.",
      tech: ["React.js", "Node.js", "Express", "API Integration", "Tailwind CSS"],
      certificate: "/hackasol_certificate.jpg"
    }
  ];

  const experience = [
    {
      company: "B S Digital Technology",
      role: "MERN Stack Developer",
      period: "May 2025 - June 2025",
      desc: "Enhanced full stack E-Commerce web applications, integrated secure JWT validations, and developed modular Express CRUD endpoints with Postman verification.",
    },
    {
      company: "Zager Digital Services",
      role: "Full Stack Developer",
      period: "Aug 2024 - Sep 2024",
      desc: "Fine-tuned responsive front-ends with React and Tailwind, optimized layout speeds across devices, and collaborated on clean API pipelines.",
    },
  ];

  const education = [
    {
      institution: "Chhatrapati Shivaji Institute of Technology",
      degree: "B.Tech in Computer Science & Engineering",
      period: "2022 - 2026",
      location: "Durg, Chhattisgarh",
      desc: "Specializing in Computer Science, full stack application architectures, generative AI integration workflows, and database aggregation optimizations."
    },
    {
      institution: "Government Higher Secondary School",
      degree: "Senior Secondary (Class 12)",
      period: "2021 - 2022",
      location: "Utai, Chhattisgarh",
      desc: "Focused on Science and Mathematics stream with strong academic outcomes."
    },
    {
      institution: "Government Higher Secondary School",
      degree: "Secondary (Class 10)",
      period: "2019 - 2020",
      location: "Utai, Chhattisgarh",
      desc: "General secondary education foundations."
    }
  ];

  // Animation Variants for Container Parent Elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  // Animation Variants for Individual Cards/Elements
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#F4F4F5] font-sans antialiased selection:bg-white/10 overflow-x-clip relative">

      {/* Deep Ambient Drifting Aurora Nebulas (Very Faint & Subtle for Minimalist Aesthetic) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Electric Blue Nebula */}
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 50, 0],
            scale: [1, 1.3, 0.85, 1],
            rotate: [0, 90, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-sky-500/[0.02] blur-[140px] rounded-full"
        />
        {/* Velvet Indigo/Purple Nebula */}
        <motion.div
          animate={{
            x: [0, -60, 80, 0],
            y: [0, 90, -90, 0],
            scale: [1, 0.8, 1.2, 1],
            rotate: [360, 240, 120, 0],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/4 w-[700px] h-[700px] bg-purple-600/[0.015] blur-[160px] rounded-full"
        />
        {/* Soft Gold/Sunset Amber Nebula */}
        <motion.div
          animate={{
            x: [0, 80, -90, 0],
            y: [0, 100, -50, 0],
            scale: [0.85, 1.15, 0.95, 0.85],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-amber-500/[0.01] blur-[130px] rounded-full"
        />
      </div>

      {/* SOLID LUXE HEADER WITH ENHANCED SIZE */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.05] bg-[#0A0A0C]/80 backdrop-blur-md px-6">
        <div className="max-w-4xl mx-auto h-24 flex items-center justify-between">
          <motion.a
            href="#"
            className="font-bold text-lg tracking-tight text-white hover:opacity-80 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            mehul.sahu
          </motion.a>

          <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-zinc-400 font-sans">
            {["Work", "Overview", "Experience", "Education", "Hackathons", "Skills", "Contact"].map((link) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="hover:text-white transition-colors relative py-1"
                whileHover={{ y: -2 }}
              >
                {link}
              </motion.a>
            ))}
          </nav>

          <motion.a
            href="/Mehul_Resume.pdf"
            download
            className="border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-200 text-sm font-medium px-5 py-2.5 rounded-xl flex items-center gap-2 transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={15} />
            <span>Resume</span>
          </motion.a>
        </div>
      </header>

      {/* MAIN LAYOUT WRAPPER */}
      <main className="max-w-4xl mx-auto px-6 pt-24 md:pt-36 pb-24">

        {/* HERO SECTION WITH MASSIVE TYPOGRAPHY & SMOOTH ENTRY */}
        <motion.section
          className="space-y-8 text-left max-w-3xl mb-40"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.08] text-white">
            Crafting elegant, production-ready <br />
            <span className="text-zinc-500">web applications & AI layers.</span>
          </h1>

          <h2 className="text-lg sm:text-xl font-medium text-zinc-400 font-mono tracking-wide h-8">
            {typedText}
            <span className="animate-pulse ml-0.5 text-white font-bold">|</span>
          </h2>

          <p className="text-base sm:text-lg leading-relaxed text-zinc-400 max-w-2xl pt-2">
            I am a Full Stack Developer specializing in the MERN stack and Generative AI integrations. I build fast, clean, and highly scalable user experiences backed by robust, secure backend pipelines.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4">
            <motion.a
              href="#work"
              className="bg-white hover:bg-zinc-200 text-black font-semibold text-sm px-6 py-4 rounded-xl flex items-center gap-2 transition-all shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View My Work</span>
              <ArrowRight size={16} />
            </motion.a>

            <motion.a
              href="#contact"
              className="text-zinc-300 hover:text-white font-semibold text-sm px-4 py-4 transition-colors"
              whileHover={{ x: 4 }}
            >
              Get in Touch
            </motion.a>
          </div>

          {/* Animated Scroll Indicator Mouse */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0], y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="pt-16 hidden sm:flex items-center justify-start gap-3 text-zinc-500 font-mono text-xs select-none"
          >
            <div className="w-5 h-8 border border-zinc-700 rounded-full flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-1.5 bg-zinc-500 rounded-full"
              />
            </div>
            <span>Scroll down to explore</span>
          </motion.div>

        </motion.section>

        {/* WORK / PROJECTS SHOWCASE WITH RESPONSIVE DEVICE CAROUSEL */}
        <motion.section
          id="work"
          className="space-y-12 mb-40 text-left pt-16 border-t border-white/[0.05]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header with Chevron Logo */}
          <div className="flex items-center gap-3.5">
            <div className="p-2 border border-fuchsia-500/20 bg-fuchsia-500/5 rounded-xl shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-fuchsia-500">
                <path d="M6 4L14 12L6 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13 4L21 12L13 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-60" />
              </svg>
            </div>
            <div className="space-y-0.5">
              <h2 className="text-3xl font-extrabold text-white tracking-tight">Projects</h2>
            </div>
          </div>

          {/* Overlapping Responsive Device Mockups */}
          <div className="relative max-w-3xl mx-auto py-10 px-4 flex items-center justify-center">
            {/* Desktop / Tablet Device Mockup */}
            <div className="w-full relative border border-zinc-800 bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 aspect-[16/10]">
              {/* Toolbar */}
              <div className="h-8 border-b border-zinc-900 bg-zinc-900/40 flex items-center px-3 justify-between">
                <div className="flex gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70 block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70 block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 block" />
                </div>
                <div className="w-3/5 h-5 bg-[#07090e] border border-zinc-900 rounded flex items-center justify-center text-[8px] font-mono text-zinc-500 truncate px-2 select-all leading-none pt-0.5">
                  {projects[activeProjectIdx].url}
                </div>
                <div className="w-8" />
              </div>

              {/* Desktop Screen Image */}
              <div className="w-full h-[calc(100%-2rem)] overflow-hidden bg-[#07090e] relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeProjectIdx}
                    src={projects[activeProjectIdx].screenshot}
                    alt={`${projects[activeProjectIdx].title} Desktop preview`}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                </AnimatePresence>
              </div>
            </div>

            {/* Overlapping Smartphone Device Mockup */}
            <div className="absolute bottom-6 right-0 w-[140px] sm:w-[190px] aspect-[9/18.5] bg-zinc-950 border-[4px] border-zinc-800 rounded-[2.2rem] overflow-hidden shadow-2xl z-10 select-none shadow-black/60">
              {/* Camera Notch */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-14 h-4 bg-zinc-900 rounded-full z-20 flex items-center justify-center border border-zinc-800/40">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-800/60 block mr-1" />
                <span className="w-4 h-1 bg-zinc-800/60 rounded-full block" />
              </div>

              {/* Mobile Screen Image */}
              <div className="w-full h-full overflow-hidden bg-zinc-900 relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeProjectIdx}
                    src={projects[activeProjectIdx].screenshot}
                    alt={`${projects[activeProjectIdx].title} Mobile preview`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover object-left"
                  />
                </AnimatePresence>
              </div>
            </div>

            {/* Carousel Navigation Arrow Button (Right) */}
            <button
              type="button"
              onClick={() => setActiveProjectIdx((prev) => (prev + 1) % projects.length)}
              className="absolute right-[-20px] sm:right-[-40px] top-[45%] w-10 h-10 rounded-full border border-zinc-800 bg-zinc-950/90 text-zinc-400 hover:text-white hover:border-zinc-700 flex items-center justify-center shadow-lg transition-all cursor-pointer hover:scale-105 z-20"
            >
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Carousel Thumbnail Navigation Indicators */}
          <div className="max-w-md mx-auto p-1.5 border border-zinc-900 bg-zinc-950/80 rounded-2xl flex items-center justify-center gap-3.5 shadow-lg">
            {projects.map((proj, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => setActiveProjectIdx(idx)}
                className={`relative aspect-video w-[76px] rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${activeProjectIdx === idx
                    ? "border-fuchsia-500 shadow-[0_0_12px_rgba(217,70,239,0.4)] scale-105"
                    : "border-zinc-800 hover:border-zinc-700 opacity-60 hover:opacity-90"
                  }`}
              >
                {/* Micro preview screenshot */}
                <img src={proj.screenshot} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover pointer-events-none select-none" />

                {/* Number Overlay */}
                <div className={`absolute inset-0 flex items-center justify-center text-[11px] font-mono font-extrabold ${activeProjectIdx === idx ? "bg-fuchsia-950/60 text-fuchsia-300" : "bg-black/60 text-zinc-400"
                  }`}>
                  {idx + 1}
                </div>
              </button>
            ))}
          </div>

          {/* Sliding Project Details Container */}
          <div className="max-w-3xl mx-auto pt-6 text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProjectIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 p-8 border border-zinc-900 bg-zinc-950/40 rounded-3xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono font-bold tracking-widest text-fuchsia-400 uppercase block">
                      {projects[activeProjectIdx].subtitle}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {projects[activeProjectIdx].title}
                    </h3>
                  </div>

                  <motion.a
                    href={projects[activeProjectIdx].url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-black text-xs font-extrabold px-5 py-3 rounded-xl transition-all cursor-pointer shadow-lg shrink-0 mt-1"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <span>Launch Project Code</span>
                    <ExternalLink size={12} />
                  </motion.a>
                </div>

                <p className="text-sm sm:text-base leading-relaxed text-zinc-400 pt-2">
                  {projects[activeProjectIdx].desc}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-900/60">
                  {projects[activeProjectIdx].tech.map((t, index) => (
                    <span key={index} className="text-xs bg-zinc-900 text-zinc-300 px-3 py-1.5 rounded-lg border border-zinc-800/60 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.section>

        {/* INTERACTIVE PROJECTS OVERVIEW SECTION */}
        <motion.section
          id="overview"
          className="space-y-12 mb-40 text-left pt-16 border-t border-white/[0.05]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Projects Overview</h2>
            <p className="text-sm text-zinc-500">Detailed summaries and verified diagnostic highlights of my live deployed applications.</p>
          </div>

          <div className="grid gap-12 pt-4">
            {reviews.map((rev, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-8 border border-zinc-900 bg-zinc-950/20 rounded-3xl space-y-5 text-left"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{rev.title}</h3>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed text-zinc-400 bg-zinc-950/40 p-4 border border-zinc-900 rounded-xl font-medium">
                  {rev.auditNotes}
                </p>

                {/* Highlights Bullet Badges */}
                <div className="flex flex-wrap gap-2">
                  {rev.highlights.map((h, i) => (
                    <span key={i} className="text-xs bg-zinc-900 border border-zinc-800/60 text-zinc-300 px-3 py-1.5 rounded-lg font-mono">
                      {h}
                    </span>
                  ))}
                </div>

                {/* Launch Deploy button */}
                <div className="pt-2">
                  <motion.a
                    href={rev.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-black text-xs font-bold px-5 py-3 rounded-xl transition-all cursor-pointer shadow-lg"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <span>Inspect Live Application</span>
                    <ExternalLink size={12} />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* WORK EXPERIENCE SECTION */}
        <motion.section
          id="experience"
          className="grid md:grid-cols-12 gap-12 text-left mb-40 pt-16 border-t border-white/[0.05]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="md:col-span-4 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Experience</h2>
            <p className="text-sm leading-relaxed text-zinc-500">
              My professional milestones in full stack development and engineering.
            </p>
          </div>

          <div className="md:col-span-8 space-y-6">
            {experience.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ x: 4 }}
                className="p-8 border border-zinc-900 bg-zinc-950/20 rounded-2xl space-y-4 transition-colors hover:border-zinc-800"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-white">{item.company}</h3>
                    <p className="text-sm text-zinc-400 font-medium">{item.role}</p>
                  </div>
                  <span className="text-xs font-mono font-medium text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 shadow-inner">
                    {item.period}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed pt-3 border-t border-zinc-900/50">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* EDUCATION SECTION */}
        <motion.section
          id="education"
          className="grid md:grid-cols-12 gap-12 text-left mb-40 pt-16 border-t border-white/[0.05]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="md:col-span-4 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Education</h2>
            <p className="text-sm leading-relaxed text-zinc-500">
              My academic milestones and computational foundations.
            </p>
          </div>

          <div className="md:col-span-8 space-y-6">
            {education.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ x: 4 }}
                className="p-8 border border-zinc-900 bg-zinc-950/20 rounded-2xl space-y-4 transition-colors hover:border-zinc-800"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-white">{item.institution}</h3>
                    <p className="text-sm text-zinc-400 font-medium">{item.degree}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="text-xs font-mono font-medium text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 shadow-inner">
                      {item.period}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 font-medium">
                      {item.location}
                    </span>
                  </div>
                </div>
                {item.desc && (
                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed pt-3 border-t border-zinc-900/50">
                    {item.desc}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* HACKATHONS SECTION */}
        <motion.section
          id="hackathons"
          className="grid md:grid-cols-12 gap-12 text-left mb-40 pt-16 border-t border-white/[0.05]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="md:col-span-4 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Hackathons</h2>
            <p className="text-sm leading-relaxed text-zinc-500">
              Competitive development arenas where I build, collaborate, and innovate under intense pressure.
            </p>
          </div>

          <div className="md:col-span-8 space-y-6">
            {hackathons.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-8 border border-zinc-900 bg-zinc-950/20 rounded-2xl space-y-6 transition-all duration-300 hover:border-zinc-800 relative group overflow-hidden"
              >
                {/* Visual Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/0 via-transparent to-sky-500/0 group-hover:from-fuchsia-500/[0.02] group-hover:to-sky-500/[0.02] transition-all duration-500 pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono font-bold tracking-widest text-fuchsia-400 uppercase block">
                      {item.role}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-300 font-medium">
                      {item.organizer} <span className="text-zinc-500">in collaboration with</span> {item.collaboration}
                    </p>
                  </div>
                  
                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.tech.map((t, index) => (
                      <span key={index} className="text-xs bg-zinc-900 text-zinc-300 px-3 py-1.5 rounded-lg border border-zinc-800/60 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Clean Click option to View Certificate */}
                  <div className="pt-4 border-t border-zinc-900/50 flex flex-wrap items-center justify-between gap-4 mt-2">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedCertificate(item.certificate)}
                      className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-mono px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-md select-none"
                    >
                      <Sparkles size={12} className="text-fuchsia-400 animate-pulse" />
                      <span>View Certificate of Participation</span>
                    </motion.button>
                    
                    <span className="text-xs font-mono text-zinc-500 font-medium">
                      {item.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CORE SKILLS SECTION WITH BIGGER CARDS */}
        <motion.section
          id="skills"
          className="grid md:grid-cols-12 gap-12 text-left mb-40 pt-16 border-t border-white/[0.05]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="md:col-span-4 space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Capabilities</h2>
              <p className="text-sm leading-relaxed text-zinc-500 font-medium">
                My engineering stack, frameworks, computational foundations, and AI ecosystems elaborated.
              </p>
            </div>

            {/* Interactive Category Tabs List */}
            <div className="flex flex-col gap-2.5 pt-4">
              {skillCategories.map((category, catIdx) => (
                <button
                  type="button"
                  key={catIdx}
                  onClick={() => setActiveSkillCatIdx(catIdx)}
                  className={`w-full text-left p-4 rounded-xl border font-sans font-semibold transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                    activeSkillCatIdx === catIdx
                      ? "bg-white text-black border-white shadow-xl scale-[1.02]"
                      : "bg-zinc-950/40 text-zinc-400 border-zinc-900 hover:border-zinc-800 hover:text-white"
                  }`}
                >
                  <span className="text-sm tracking-wide">{category.title}</span>
                  <div className={`p-1 rounded-lg shrink-0 ${activeSkillCatIdx === catIdx ? "bg-black/10" : "bg-zinc-900 group-hover:bg-zinc-850"}`}>
                    <Sparkles size={12} className={activeSkillCatIdx === catIdx ? "text-black" : "text-sky-500"} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSkillCatIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="p-8 border border-zinc-900 bg-zinc-950/40 rounded-3xl space-y-6"
              >
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                    <Sparkles size={18} className="text-sky-500 animate-pulse" />
                    {skillCategories[activeSkillCatIdx].title}
                  </h3>
                  <p className="text-sm text-zinc-500 font-medium">{skillCategories[activeSkillCatIdx].desc}</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  {skillCategories[activeSkillCatIdx].skills.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.08)" }}
                      className="p-5 border border-zinc-900 bg-zinc-950/60 rounded-2xl flex flex-col justify-between text-left transition-all hover:bg-zinc-900/40"
                    >
                      <span className="text-base font-bold text-zinc-200">{skill.name}</span>
                      <span className="text-xs sm:text-sm text-zinc-500 mt-2.5 leading-relaxed font-medium">{skill.desc}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.section>

        {/* REFINED CLEAN CONTACT VIEW WITH ANIMATED SUBMIT */}
        <motion.section
          id="contact"
          className="border border-zinc-900 bg-zinc-950/40 rounded-3xl overflow-hidden pt-16 border-t border-white/[0.05]"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid md:grid-cols-12 gap-10 p-8 md:p-12 items-start">
            <div className="md:col-span-5 text-left space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Let's Connect.</h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                Have an opening, a role, or a project idea? Feel free to reach out directly or copy my targets below.
              </p>

              <div className="pt-4 flex flex-col gap-3">
                <motion.button
                  onClick={copyEmail}
                  className="px-5 py-3.5 rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:text-white text-sm font-semibold flex items-center gap-3 justify-center transition-colors relative cursor-pointer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail size={15} />
                  <span>Copy Email Address</span>
                  <AnimatePresence>
                    {copiedEmail && (
                      <motion.span
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        className="absolute -top-10 px-3 py-1.5 bg-zinc-800 text-white text-xs font-semibold rounded-lg border border-zinc-700 shadow-xl whitespace-nowrap"
                      >
                        Copied!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                <motion.button
                  onClick={copyPhone}
                  className="px-5 py-3.5 rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:text-white text-sm font-semibold flex items-center gap-3 justify-center transition-colors relative cursor-pointer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone size={15} />
                  <span>Copy Phone Metric</span>
                  <AnimatePresence>
                    {copiedPhone && (
                      <motion.span
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        className="absolute -top-10 px-3 py-1.5 bg-zinc-800 text-white text-xs font-semibold rounded-lg border border-zinc-700 shadow-xl whitespace-nowrap"
                      >
                        Copied!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>

            <div className="md:col-span-7 w-full">
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleFormSubmit}
                    className="space-y-4"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input
                        type="text" required value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-zinc-900 bg-zinc-950 text-sm text-white focus:outline-none focus:border-zinc-700 transition-colors"
                        placeholder="Your Name"
                      />
                      <input
                        type="email" required value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-zinc-900 bg-zinc-950 text-sm text-white focus:outline-none focus:border-zinc-700 transition-colors"
                        placeholder="Your Email"
                      />
                    </div>
                    <textarea
                      required rows={4} value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-zinc-900 bg-zinc-950 text-sm text-white focus:outline-none focus:border-zinc-700 transition-colors resize-none"
                      placeholder="Your Message..."
                    />
                    {submitError && (
                      <div className="text-rose-500 text-xs font-semibold font-mono bg-rose-500/10 border border-rose-500/20 p-3.5 rounded-xl text-left">
                        {submitError}
                      </div>
                    )}
                    <motion.button
                      type="submit"
                      disabled={isSending}
                      className={`w-full py-4 bg-white hover:bg-zinc-200 text-black text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xl ${isSending ? "opacity-50 cursor-not-allowed" : ""}`}
                      whileHover={isSending ? {} : { scale: 1.02 }}
                      whileTap={isSending ? {} : { scale: 0.98 }}
                    >
                      {isSending ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send size={14} />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 text-center space-y-4"
                  >
                    <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center mx-auto rounded-full shadow-lg">
                      <Check size={16} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-white text-base">Message Sent Successfully</h4>
                      <p className="text-zinc-500 text-sm">Thank you! I will review this and respond shortly.</p>
                    </div>

                    {/* Notice to guide the user how to configure their real access key */}
                    {(!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY.includes("YOUR_ACCESS_KEY_HERE")) && (
                      <div className="text-[11px] font-mono text-amber-500/70 border border-amber-500/20 bg-amber-500/5 p-4 rounded-xl max-w-sm mx-auto mt-6 leading-relaxed text-left space-y-2">
                        <div className="font-bold text-amber-400">💡 Configure Real Email Alerts</div>
                        <div>
                          This form is currently running in <strong>Demo Mode</strong>. To receive actual contact messages directly in your email inbox:
                        </div>
                        <ol className="list-decimal pl-4 space-y-1">
                          <li>Get a free access key at <a href="https://web3forms.com/" target="_blank" rel="noreferrer" className="underline hover:text-amber-300 font-semibold">web3forms.com</a>.</li>
                          <li>Open <code className="text-amber-400">src/App.jsx</code>.</li>
                          <li>Replace the placeholder access key on line 21 with your new key.</li>
                        </ol>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.section>
      </main>

      {/* CORE STANDARD FOOTER */}
      <footer className="border-t border-white/[0.05] py-10 px-6 text-sm text-zinc-600">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="font-medium">© {new Date().getFullYear()} Mehul Sahu. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <motion.a whileHover={{ y: -3 }} href="https://github.com/mehul-vi" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Github size={16} /></motion.a>
            <motion.a whileHover={{ y: -3 }} href="https://linkedin.com/in/mehul-kumar-sahu" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Linkedin size={16} /></motion.a>
            <motion.a whileHover={{ y: -3 }} href="mailto:mehulkumars315@gmail.com" className="hover:text-white transition-colors"><Mail size={16} /></motion.a>
          </div>
        </div>
      </footer>

      {/* Sleek Glassmorphic Floating Quick-Contact Dock */}
      <div className="fixed bottom-8 right-8 z-45 flex flex-col gap-3.5">
        {/* WhatsApp Link with Tooltip */}
        <div className="group relative flex items-center justify-end">
          <span className="absolute right-14 px-3 py-1.5 bg-zinc-950/90 border border-zinc-900 text-emerald-400 text-[10px] font-mono font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-[-4px] transition-all duration-300 shadow-xl whitespace-nowrap tracking-wide">
            WhatsApp Me
          </span>
          <motion.a
            href="https://wa.me/919770989610"
            target="_blank"
            rel="noreferrer"
            className="w-12 h-12 rounded-full border border-emerald-500/20 bg-zinc-950/80 backdrop-blur-md text-emerald-400 hover:text-white hover:bg-emerald-500 hover:border-emerald-400 flex items-center justify-center shadow-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] cursor-pointer"
            whileHover={{ y: -4, scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.706 1.459h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
            </svg>
          </motion.a>
        </div>

        {/* GitHub Link with Tooltip */}
        <div className="group relative flex items-center justify-end">
          <span className="absolute right-14 px-3 py-1.5 bg-zinc-950/90 border border-zinc-900 text-zinc-300 text-[10px] font-mono font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-[-4px] transition-all duration-300 shadow-xl whitespace-nowrap tracking-wide">
            GitHub Profile
          </span>
          <motion.a
            href="https://github.com/mehul-vi"
            target="_blank"
            rel="noreferrer"
            className="w-12 h-12 rounded-full border border-white/10 bg-zinc-950/80 backdrop-blur-md text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 flex items-center justify-center shadow-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] cursor-pointer"
            whileHover={{ y: -4, scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
          >
            <Github size={20} />
          </motion.a>
        </div>

        {/* Mail Link with Tooltip */}
        <div className="group relative flex items-center justify-end">
          <span className="absolute right-14 px-3 py-1.5 bg-zinc-950/90 border border-zinc-900 text-sky-400 text-[10px] font-mono font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-[-4px] transition-all duration-300 shadow-xl whitespace-nowrap tracking-wide">
            Send Email
          </span>
          <motion.a
            href="mailto:mehulkumars315@gmail.com"
            className="w-12 h-12 rounded-full border border-sky-500/20 bg-zinc-950/80 backdrop-blur-md text-sky-400 hover:text-white hover:bg-sky-500 hover:border-sky-400 flex items-center justify-center shadow-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] cursor-pointer"
            whileHover={{ y: -4, scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
          >
            <Mail size={20} />
          </motion.a>
        </div>
      </div>

      {/* Dynamic Ambient Spotlight Cursor Follower */}
      <motion.div
        className="hidden md:block pointer-events-none fixed inset-0 z-30"
        style={{
          background: useMotionTemplate`radial-gradient(650px circle at ${cursorX}px ${cursorY}px, rgba(56, 189, 248, 0.045) 0%, rgba(217, 70, 239, 0.02) 45%, transparent 80%)`
        }}
      />

      {/* Lightbox Certificate Zoom Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8"
            onClick={() => setSelectedCertificate(null)}
          >
            {/* Close Button Top Right */}
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer hover:border-zinc-700 shadow-xl transition-all"
              onClick={() => setSelectedCertificate(null)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.button>

            {/* Modal Body Card */}
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative max-w-4xl w-full aspect-[4/3] sm:aspect-[1.414] rounded-2xl overflow-hidden border border-white/10 bg-zinc-950/80 shadow-2xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedCertificate}
                alt="Hackathon Certificate Full View"
                className="w-full h-full object-contain pointer-events-none select-none"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}