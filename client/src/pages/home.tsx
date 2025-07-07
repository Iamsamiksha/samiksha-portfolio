import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

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
      title: "E-Commerce Platform",
      description: "A modern e-commerce platform built with React and Node.js, featuring user authentication, product catalog, and secure payment integration.",
      technologies: ["React", "Node.js", "MongoDB"],
      liveDemo: "#",
      codeUrl: "#",
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      technologies: ["React", "Socket.io", "Express"],
      liveDemo: "#",
      codeUrl: "#",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A responsive weather dashboard that provides current weather conditions, 5-day forecasts, and location-based weather alerts.",
      technologies: ["JavaScript", "APIs", "CSS3"],
      liveDemo: "#",
      codeUrl: "#",
      gradient: "from-emerald-600 to-teal-600"
    }
  ];

  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend",
      icon: "fas fa-code",
      color: "text-blue-accent",
      skills: [
        { name: "HTML5 & CSS3", level: 4 },
        { name: "JavaScript (ES6+)", level: 4 },
        { name: "React.js", level: 3 },
        { name: "Tailwind CSS", level: 4 }
      ]
    },
    {
      title: "Backend & Tools",
      icon: "fas fa-server",
      color: "text-cyan-accent",
      skills: [
        { name: "Node.js", level: 3 },
        { name: "MongoDB", level: 3 },
        { name: "Git & GitHub", level: 4 },
        { name: "REST APIs", level: 3 }
      ]
    },
    {
      title: "Design & Others",
      icon: "fas fa-palette",
      color: "text-green-accent",
      skills: [
        { name: "Figma", level: 4 },
        { name: "Adobe XD", level: 3 },
        { name: "Responsive Design", level: 4 },
        { name: "UI/UX Principles", level: 3 }
      ]
    }
  ];

  const currentlyLearning = ["TypeScript", "Next.js", "GraphQL", "Docker"];

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
              <span className="text-xl font-bold text-blue-accent font-mono">alex.dev</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {["home", "about", "skills", "projects", "contact"].map((section) => (
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
              {["home", "about", "skills", "projects", "contact"].map((section) => (
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
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-accent to-cyan-accent bg-clip-text text-transparent">
              Alex Johnson
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl text-slate-300 mb-8">
              Frontend Developer & UI/UX Enthusiast
            </h2>
            <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Passionate about creating beautiful, functional web experiences.
              Fresh graduate with a strong foundation in modern web technologies and a keen eye for design.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => scrollToSection("projects")}
              className="bg-blue-accent hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
            >
              View My Work
            </Button>
            <Button
              variant="outline"
              className="border border-slate-600 hover:border-blue-accent text-slate-300 hover:text-blue-accent px-8 py-3 rounded-lg font-medium transition-all duration-200"
            >
              Download CV
            </Button>
          </div>

          <div className="mt-16 flex justify-center space-x-6">
            <a href="#" className="text-slate-400 hover:text-blue-accent transition-colors duration-200 text-2xl">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="text-slate-400 hover:text-blue-accent transition-colors duration-200 text-2xl">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="text-slate-400 hover:text-blue-accent transition-colors duration-200 text-2xl">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-slate-400 hover:text-blue-accent transition-colors duration-200 text-2xl">
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
                    I'm a recent Computer Science graduate with a passion for frontend development and user experience design.
                    My journey began with curiosity about how websites work, and it has evolved into a deep appreciation for
                    clean code and beautiful interfaces.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    When I'm not coding, you can find me exploring new design trends, contributing to open-source projects,
                    or experimenting with the latest web technologies. I believe in continuous learning and staying up-to-date
                    with industry best practices.
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-dark-tertiary border-slate-700">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-accent mb-2">15+</div>
                    <div className="text-slate-400 text-sm">Projects Completed</div>
                  </CardContent>
                </Card>
                <Card className="bg-dark-tertiary border-slate-700">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-cyan-accent mb-2">3+</div>
                    <div className="text-slate-400 text-sm">Years Learning</div>
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
                        <h4 className="font-medium text-slate-200">Frontend Development</h4>
                        <p className="text-slate-400 text-sm">Building responsive and interactive web applications</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="fas fa-palette text-cyan-accent mt-1"></i>
                      <div>
                        <h4 className="font-medium text-slate-200">UI/UX Design</h4>
                        <p className="text-slate-400 text-sm">Creating intuitive and visually appealing interfaces</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="fas fa-mobile-alt text-green-accent mt-1"></i>
                      <div>
                        <h4 className="font-medium text-slate-200">Responsive Design</h4>
                        <p className="text-slate-400 text-sm">Ensuring great experiences across all devices</p>
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
                      <h4 className="font-medium text-slate-200">Bachelor of Computer Science</h4>
                      <p className="text-slate-400 text-sm">University Name • 2020-2024</p>
                      <p className="text-slate-500 text-sm">GPA: 3.8/4.0</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <Card key={index} className="bg-dark-secondary border-slate-700 hover:border-blue-accent/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <i className={`${category.icon} ${category.color} text-2xl mr-3`}></i>
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                  </div>
                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center justify-between">
                        <span className="text-slate-300">{skill.name}</span>
                        {renderSkillLevel(skill.level)}
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
            <Button
              variant="outline"
              className="border border-blue-accent text-blue-accent hover:bg-blue-accent hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-200"
            >
              View All Projects
            </Button>
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
                      <p className="text-slate-200">alex.johnson@example.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-cyan-accent/20 rounded-lg flex items-center justify-center">
                      <i className="fas fa-phone text-cyan-accent"></i>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Phone</p>
                      <p className="text-slate-200">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-accent/20 rounded-lg flex items-center justify-center">
                      <i className="fas fa-map-marker-alt text-green-accent"></i>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Location</p>
                      <p className="text-slate-200">New York, NY</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-6 text-slate-200">Follow Me</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 bg-dark-secondary border border-slate-700 rounded-lg flex items-center justify-center hover:border-blue-accent hover:text-blue-accent transition-all duration-200">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="#" className="w-12 h-12 bg-dark-secondary border border-slate-700 rounded-lg flex items-center justify-center hover:border-blue-accent hover:text-blue-accent transition-all duration-200">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="#" className="w-12 h-12 bg-dark-secondary border border-slate-700 rounded-lg flex items-center justify-center hover:border-blue-accent hover:text-blue-accent transition-all duration-200">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="w-12 h-12 bg-dark-secondary border border-slate-700 rounded-lg flex items-center justify-center hover:border-blue-accent hover:text-blue-accent transition-all duration-200">
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
                © 2024 Alex Johnson. Built with passion and lots of coffee ☕
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-slate-400 hover:text-blue-accent transition-colors duration-200">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-accent transition-colors duration-200">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-accent transition-colors duration-200">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-accent transition-colors duration-200">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
