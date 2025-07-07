import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';


interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  liveDemo: string;
  codeUrl: string;
  gradient: string;
}

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: string;
  color: string;
  skills: Skill[];
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const projects: Project[] = [
    {
      id: 1,
      title: "SkinVision AI",
      description: "Skin age and issue detection web app with AI-powered skincare report generation and personalized recommendations.",
      technologies: ["Python", "OpenCV", "FastAPI", "TensorFlow", "React.js", "Astro"],
      liveDemo: "https://skin-analysis-ui.vercel.app",
      codeUrl: "#",
      gradient: "from-emerald-600 to-teal-600"
      
    },
    {
      id: 2,
      title: "DocuMentor – Contract Analyzer",
      description: "AI tool that extracts insights, risks, and clauses from legal/business documents for better decision making.",
      technologies: ["Express.js", "TypeScript", "MongoDB", "Redis", "Gemini API"],
      liveDemo: "",
      codeUrl: "https://github.com/DocuMentorCo/Version1",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      id: 3,
      title: "Today's Take – Daily Moments as Movie Scenes",
      description: "Streamlit app that turns your daily mood or moment into a cinematic scene title, mood arc, and song using AI.",
      technologies: ["Python", "Streamlit", "Gemini API"],
      liveDemo: "https://todays-take.streamlit.app",
      codeUrl: "https://github.com/Iamsamiksha/todays-take",
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      id: 4,
      title: "ScamShield – AI Spam Detector",
      description: "LSTM-based spam classification system with 98.39% accuracy for detecting malicious messages and emails.",
      technologies: ["Python", "TensorFlow", "FastAPI", "LSTM"],
      liveDemo: "https://v0-professional-react-website-neon.vercel.app/detector",
      codeUrl: "#",
      gradient: "from-red-600 to-orange-600"
    },
    {
      id: 5,
      title: "Superstore Sales Dashboard",
      description: "Interactive Tableau dashboard showcasing key sales metrics, trends, and business insights for data-driven decisions.",
      technologies: ["Tableau", "SQL", "Data Analytics"],
      liveDemo: "https://public.tableau.com/app/profile/samiksha.agrawal5226/viz/Superstore_17428491360290/SuperstoreDashboard?publish=yes",
      codeUrl: "#",
      gradient: "from-indigo-600 to-blue-600"
    },
    {
      id: 6,
      title: "Hey Furry Pals",
      description: "Website for an AI-powered educational plushie built during my internship at Vruksh Ecosystem Foundation.",
      technologies: ["React.js", "Next.js", "UI/UX Design"],
      liveDemo: "https://furry-pals.vercel.app",
      codeUrl: "#",
      gradient: "from-pink-600 to-purple-600"
    }
  ];

  const skillCategories: SkillCategory[] = [
    {
      title: "Languages",
      icon: "fas fa-code",
      color: "text-blue-accent",
      skills: [
        { name: "Java", level: 4 },
        { name: "Python", level: 4 },
        { name: "JavaScript", level: 4 },
        { name: "SQL", level: 4 },
        { name: "C++", level: 3 }
      ]
    },
    {
      title: "Frameworks & Libraries",
      icon: "fas fa-layer-group",
      color: "text-cyan-accent",
      skills: [
        { name: "React.js", level: 4 },
        { name: "Express.js", level: 4 },
        { name: "Next.js", level: 3 },
        { name: "Flask", level: 3 }
      ]
    },
    {
      title: "Databases & Cloud",
      icon: "fas fa-database",
      color: "text-green-accent",
      skills: [
        { name: "MongoDB", level: 4 },
        { name: "MySQL", level: 4 },
        { name: "AWS", level: 3 },
        { name: "Redis", level: 3 }
      ]
    },
    {
      title: "Tools & Platforms",
      icon: "fas fa-tools",
      color: "text-purple-400",
      skills: [
        { name: "Git & GitHub", level: 5 },
        { name: "Tableau", level: 4 },
        { name: "Figma", level: 4 },
        { name: "Jupyter", level: 4 }
      ]
    }
  ];

  const currentlyLearning = [
  "Data Handling & Visualization",
  "AI App Integration",
  "Scalable ML Applications"
];


  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id") || "";
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the form data to your backend
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const renderSkillLevel = (level: number) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i < level ? "bg-blue-accent" : "bg-slate-600"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-dark-primary text-white font-inter">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-primary/90 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-accent font-mono">samiksha.dev</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {["home", "about", "experience", "skills", "projects", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`transition-colors duration-200 capitalize ${
                    activeSection === section
                      ? "text-blue-accent"
                      : "text-slate-300 hover:text-blue-accent"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-300 hover:text-blue-accent"
              >
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-dark-secondary border-t border-slate-800">
              {["home", "about", "experience", "skills", "projects", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left px-3 py-2 text-slate-300 hover:text-blue-accent capitalize"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-accent rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-cyan-accent rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-green-accent rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-8">
            <p className="text-cyan-accent font-mono text-sm md:text-base mb-4">Hello, I'm</p>
            

<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-blue-accent">
  <Typewriter
    words={['Samiksha Agrawal']}
    loop={1}
    cursor
    cursorStyle="|"
    typeSpeed={70}
    deleteSpeed={50}
    delaySpeed={1000}
  />
</h1>


            <h2 className="text-xl md:text-2xl lg:text-3xl text-slate-300 mb-8">
              Software Developer | Data Analyst
            </h2>
            <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Final-year Computer Science (AIML) student with a strong interest in building practical and impactful tech solutions. 
              I enjoy developing web apps, working with data, and applying machine learning to solve real-world problems.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => scrollToSection("projects")}
              className="bg-blue-accent hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
            >
              View My Work
            </Button>
            <a
  href="https://drive.google.com/file/d/1s2pOx72nJ9eE_pdq_p7ZAyDhEzoDk7PT/view?usp=sharing"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button
    variant="outline"
    className="border border-slate-600 hover:border-blue-accent text-slate-300 hover:text-blue-accent px-8 py-3 rounded-lg font-medium transition-all duration-200"
  >
    Download CV
  </Button>
</a>

          </div>

          <div className="mt-16 flex justify-center space-x-6">
            <a href="https://github.com/Iamsamiksha" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-accent transition-colors duration-200 text-2xl">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://linkedin.com/in/samiksha-agrawal24" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-accent transition-colors duration-200 text-2xl">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="mailto:samiksha.code24@gmail.com" className="text-slate-400 hover:text-blue-accent transition-colors duration-200 text-2xl">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <i className="fas fa-chevron-down text-slate-400 text-xl"></i>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-dark-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              About <span className="text-blue-accent">Me</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Get to know more about my journey and what drives me as a developer
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Card className="bg-dark-tertiary border-slate-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-cyan-accent">My Story</h3>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    I enjoy building clean, meaningful products with code. My interests lie in web development, machine learning, 
                    and data analysis. I'm always exploring new tools and techniques to bring ideas to life through tech.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    Previously interned as a Software Developer at Vruksh Ecosystem Foundation; currently a ML Intern at Global Next Consulting India Private Limited,
 I'm gaining hands-on experience in building scalable solutions 
                    and working with real-world datasets.
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-dark-tertiary border-slate-700">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-accent mb-2">10+</div>
                    <div className="text-slate-400 text-sm">Projects Completed</div>
                  </CardContent>
                </Card>
                <Card className="bg-dark-tertiary border-slate-700">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-cyan-accent mb-2">Fresher</div>
                    <div className="text-slate-400 text-sm">Years Experience</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-dark-tertiary border-slate-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-green-accent">What I Do</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <i className="fas fa-code text-blue-accent mt-1"></i>
                      <div>
                        <h4 className="font-medium text-slate-200">Full-Stack Development</h4>
                        <p className="text-slate-400 text-sm">Building web applications with React, Express, and modern frameworks</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="fas fa-chart-line text-cyan-accent mt-1"></i>
                      <div>
                        <h4 className="font-medium text-slate-200">Data Analysis</h4>
                        <p className="text-slate-400 text-sm">Working with datasets and creating insights through data visualization</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="fas fa-brain text-green-accent mt-1"></i>
                      <div>
                        <h4 className="font-medium text-slate-200">Machine Learning</h4>
                        <p className="text-slate-400 text-sm">Developing AI-powered applications and ML models</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-dark-tertiary border-slate-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-cyan-accent">Education</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-slate-200">B.Tech in Computer Science – AIML</h4>
                      <p className="text-slate-400 text-sm">Shri Ramdeobaba College Of Engineering and Management • Nov 2022 – July 2026</p>
                      <p className="text-slate-500 text-sm">CGPA: 9.75/10.00 • Nagpur, Maharashtra</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-dark-primary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Work <span className="text-blue-accent">Experience</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              My professional journey and internship experiences
            </p>
          </div>

          <div className="space-y-8">
            {/* Software Developer Intern */}
            <Card className="bg-dark-secondary border-slate-700">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">🌱 Software Developer Intern</h3>
                    <p className="text-blue-accent font-medium">Vruksh Ecosystem Foundation</p>
                    <p className="text-slate-400 text-sm">Sep 2024 – Feb 2025 | Remote (Pune)</p>
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                  <p className="text-slate-300">
                    • Built the official website for Hey Furry Pals, an AI-powered educational plushie
                  </p>
                  <p className="text-slate-300">
                    • Designed and implemented data dashboards and UI/UX for Echelonify, improving product clarity and usability
                  </p>
                  <p className="text-slate-300">
                    • Contributed to proposal decks, product workflows, and presentation strategies
                  </p>
                  <p className="text-slate-300">
                    • Successfully completed a competitive internship and received a Letter of Recommendation
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-accent/10 text-blue-accent rounded-full text-sm">React.js</span>
                  <span className="px-3 py-1 bg-cyan-accent/10 text-cyan-accent rounded-full text-sm">Next.js</span>
                  <span className="px-3 py-1 bg-green-accent/10 text-green-accent rounded-full text-sm">UI/UX Design</span>
                </div>
                <div className="flex space-x-4">
                  <a 
                    href="https://furry-pals.vercel.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-accent hover:text-blue-400 text-sm"
                  >
                    furry-pals.com↗
                  </a>
                  <a 
                    href="https://www.echelonify.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cyan-accent hover:text-cyan-400 text-sm"
                  >
                    echelonify.com↗
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Machine Learning Intern */}
            <Card className="bg-dark-secondary border-slate-700">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">🤖 Machine Learning Intern</h3>
                    <p className="text-cyan-accent font-medium">Global Next Consulting India Pvt Ltd (GNCIPL)</p>
                    <p className="text-slate-400 text-sm">June 2025 – Present | Remote</p>
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                  <p className="text-slate-300">
                    • Assisting in the development and evaluation of machine learning models for business and client-specific needs
                  </p>
                  <p className="text-slate-300">
                    • Working on data cleaning, exploratory analysis, and model deployment tasks using real-world datasets
                  </p>
                  <p className="text-slate-300">
                    • Enhancing skills in ML workflows, applied AI, and scalable implementation practices
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-accent/10 text-blue-accent rounded-full text-sm">Python</span>
                  <span className="px-3 py-1 bg-cyan-accent/10 text-cyan-accent rounded-full text-sm">Machine Learning</span>
                  <span className="px-3 py-1 bg-green-accent/10 text-green-accent rounded-full text-sm">Data Analysis</span>
                  <span className="px-3 py-1 bg-purple-400/10 text-purple-400 rounded-full text-sm">Model Deployment</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-dark-primary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Technical <span className="text-blue-accent">Skills</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Technologies and tools I work with to bring ideas to life
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {skillCategories.map((category, index) => (
              <Card key={index} className="bg-dark-secondary border-slate-700 hover:border-blue-accent/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <i className={`${category.icon} ${category.color} text-2xl mr-3`}></i>
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                  </div>
                  <div className="space-y-3">
                   {category.skills.map((skill, skillIndex) => (
  <div key={skillIndex} className="text-slate-300">
    {skill.name}
  </div>
))}

                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Currently Learning */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold mb-4 text-slate-300">Currently Learning</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {currentlyLearning.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-dark-secondary border border-slate-700 rounded-full text-sm text-slate-300 font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-dark-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured <span className="text-blue-accent">Projects</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              A showcase of my recent work and personal projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="bg-dark-tertiary border-slate-700 overflow-hidden hover:border-blue-accent/50 transition-all duration-300 group">
                <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-4 left-4 right-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 space-y-2">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="space-y-1">
                        <div className="h-2 bg-white/20 rounded w-3/4"></div>
                        <div className="h-2 bg-white/20 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-slate-200">{project.title}</h3>
                  <p className="text-slate-400 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-accent/20 text-blue-accent text-xs rounded font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href={project.liveDemo}
                      className="text-blue-accent hover:text-blue-300 transition-colors duration-200"
                    >
                      <i className="fas fa-external-link-alt mr-1"></i>Live Demo
                    </a>
                    <a
                      href={project.codeUrl}
                      className="text-slate-400 hover:text-slate-200 transition-colors duration-200"
                    >
                      <i className="fab fa-github mr-1"></i>Code
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
  href="https://github.com/Iamsamiksha"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button
    variant="outline"
    className="border border-blue-accent text-blue-accent hover:bg-blue-accent hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-200"
  >
    View All Projects
  </Button>
</a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-dark-primary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get In <span className="text-blue-accent">Touch</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities and interesting projects
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-6 text-slate-200">Let's Connect</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-accent/20 rounded-lg flex items-center justify-center">
                      <i className="fas fa-envelope text-blue-accent"></i>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Email</p>
                      <p className="text-slate-200">samiksha.code24@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-cyan-accent/20 rounded-lg flex items-center justify-center">
                      <i className="fas fa-phone text-cyan-accent"></i>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Phone</p>
                      <p className="text-slate-200">+91 7770849440</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-accent/20 rounded-lg flex items-center justify-center">
                      <i className="fas fa-map-marker-alt text-green-accent"></i>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Location</p>
                      <p className="text-slate-200">Nagpur, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-6 text-slate-200">Follow Me</h3>
                <div className="flex space-x-4">
                  <a href="https://github.com/Iamsamiksha" className="w-12 h-12 bg-dark-secondary border border-slate-700 rounded-lg flex items-center justify-center hover:border-blue-accent hover:text-blue-accent transition-all duration-200">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/samiksha-agrawal24/" className="w-12 h-12 bg-dark-secondary border border-slate-700 rounded-lg flex items-center justify-center hover:border-blue-accent hover:text-blue-accent transition-all duration-200">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="https://www.instagram.com/bansal_samiksha24/" className="w-12 h-12 bg-dark-secondary border border-slate-700 rounded-lg flex items-center justify-center hover:border-blue-accent hover:text-blue-accent transition-all duration-200">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="bg-dark-secondary border-slate-700">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="block text-slate-300 text-sm font-medium mb-2">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-dark-tertiary border-slate-600 rounded-lg focus:border-blue-accent text-slate-200 placeholder-slate-500"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="block text-slate-300 text-sm font-medium mb-2">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-dark-tertiary border-slate-600 rounded-lg focus:border-blue-accent text-slate-200 placeholder-slate-500"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject" className="block text-slate-300 text-sm font-medium mb-2">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-dark-tertiary border-slate-600 rounded-lg focus:border-blue-accent text-slate-200 placeholder-slate-500"
                      placeholder="What's this about?"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="block text-slate-300 text-sm font-medium mb-2">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-dark-tertiary border-slate-600 rounded-lg focus:border-blue-accent text-slate-200 placeholder-slate-500"
                      placeholder="Tell me about your project..."
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-blue-accent hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-secondary border-t border-slate-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-slate-400 text-sm">
                © 2025 Samiksha Agrawal. Built with passion and lots of coffee ☕
              </p>
            </div>
            
          </div>
        </div>
      </footer>
    </div>
  );
}
