import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Github, Linkedin, Mail, ExternalLink, Code, Smartphone, Bot, Wrench, DollarSign, Menu, X } from 'lucide-react';

function Navigation({ activeSection, setActiveSection }: { activeSection: string; setActiveSection: (section: string) => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="font-bold text-xl text-gray-900 cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            Ashutosh Kumar
          </div>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.id 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                    activeSection === item.id 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection({ setActiveSection }: { setActiveSection: (section: string) => void }) {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center px-4">
      <div className="text-center text-white max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Ashutosh Kuamr
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-blue-200">
          Web & AI Developer
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
          I build fast, functional websites and automate tasks using AI.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg"
            onClick={() => setActiveSection('projects')}
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 text-lg"
          >
            See My Work
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={() => setActiveSection('contact')}
            className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 text-lg"
          >
            Hire Me
          </Button>
        </div>

        <div className="flex justify-center space-x-6">
          <a href="https://github.com/ashutosh7856" className="text-white hover:text-blue-200 transition-colors">
            <Github size={32} />
          </a>
          <a href="https://linkedln.com/ashutosh7856" className="text-white hover:text-blue-200 transition-colors">
            <Linkedin size={32} />
          </a>
          <a href="mailto:ashutoshkkr60@gmail.com" className="text-white hover:text-blue-200 transition-colors">
            <Mail size={32} />
          </a>
        </div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Tailwind CSS', 'OpenAI APIs', 'Stripe'];
  const tools = ['VSCode', 'GitHub', 'ChatGPT', 'Midjourney', 'Notion'];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">My Journey</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              I discovered my passion for development when I realized how technology could solve real-world problems. 
              What started as curiosity about how websites work has evolved into a career focused on creating 
              meaningful digital experiences.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Today, I specialize in building modern web applications and implementing AI automation solutions 
              that help businesses streamline their operations and grow their online presence.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>My goal:</strong> To help businesses grow using modern tech + AI solutions that are both 
              powerful and easy to use.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Tools I Use</h4>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <Badge key={tool} variant="outline" className="px-3 py-1">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ setActiveSection }: { setActiveSection: (section: string) => void }) {
  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Custom Portfolio Website",
      price: "$100",
      description: "Professional, responsive portfolio website tailored to showcase your work and attract clients."
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Landing Page with Stripe Payment",
      price: "$120",
      description: "High-converting landing page with integrated payment processing for your products or services."
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "ChatGPT FAQ Bot for Business",
      price: "$80",
      description: "AI-powered chatbot to handle customer inquiries and provide instant support 24/7."
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Task Automation Tool",
      price: "$90",
      description: "Custom automation solutions to streamline your business processes and save time."
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Website Bug Fixes / Optimization",
      price: "$40",
      description: "Quick fixes and performance improvements for your existing website."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Services</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional web development and AI automation services to help your business grow
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                  {service.icon}
                </div>
                <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                <div className="text-3xl font-bold text-blue-600">{service.price}</div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">{service.description}</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => setActiveSection('contact')}
                >
                  Request Quote
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}


function ProjectsSection() {
  const projects = [
    {
      title: "E-commerce Dashboard",
      description: "Modern admin dashboard with analytics, inventory management, and payment processing.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"]
    },
    {
      title: "AI Content Generator",
      description: "Web application that generates marketing content using OpenAI GPT models.",
      tech: ["React", "OpenAI API", "Express", "PostgreSQL"]
    },
    {
      title: "Task Automation Platform",
      description: "Custom automation tool that integrates multiple APIs to streamline business workflows.",
      tech: ["Node.js", "API Integration", "Webhooks", "MongoDB"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Projects</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Here are some examples of my recent work
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="text-white text-lg font-semibold">Project Preview</div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Github className="w-4 h-4 mr-2" />
                  Source
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: 'success',
          message: data.message
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Something went wrong. Please try again.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600">
            Ready to start your project? Let's discuss how I can help you grow your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-gray-600">ashutosh@ashudev.live</span>
              </div>
              <div className="flex items-center">
                <Github className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-gray-600">github.com/ashutosh7856</span>
              </div>
              <div className="flex items-center">
                <Linkedin className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-gray-600">linkedin.com/in/ashutosh7856</span>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Send me a message</CardTitle>
              <CardDescription>I'll get back to you within 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              {submitStatus.type && (
                <div className={`mb-4 p-3 rounded-md ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {submitStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    disabled={isSubmitting}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    disabled={isSubmitting}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    disabled={isSubmitting}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Startup Founder",
      content: "Ashutosh delivered an amazing website that perfectly captured our brand. The AI integration has saved us countless hours!"
    },
    {
      name: "Mike Chen",
      role: "Small Business Owner",
      content: "Professional, fast, and affordable. The ChatGPT bot has transformed our customer service. Highly recommended!"
    },
    {
      name: "Emily Rodriguez",
      role: "Freelance Designer",
      content: "Working with Ashutosh was a breeze. She understood exactly what I needed and delivered beyond expectations."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Clients Say</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}


function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Ashutosh Kumar</h3>
        <p className="text-gray-400 mb-6">Web & AI Developer</p>
        <div className="flex justify-center space-x-6 mb-6">
          <a href="https://github.com/ashutosh7856" className="text-gray-400 hover:text-white transition-colors">
            <Github size={24} />
          </a>
          <a href="https://linkedln.com/ashutosh7865" className="text-gray-400 hover:text-white transition-colors">
            <Linkedin size={24} />
          </a>
          <a href="mailto:ashutoshkkr60@gmail.com@gmail.com" className="text-gray-400 hover:text-white transition-colors">
            <Mail size={24} />
          </a>
        </div>
        <p className="text-gray-400 text-sm">
          © 2025 Ashutosh Kumar. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="App">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {activeSection === 'home' && <HeroSection setActiveSection={setActiveSection} />}
      {activeSection === 'about' && <AboutSection />}
      {activeSection === 'services' && <ServicesSection setActiveSection={setActiveSection} />}
      {activeSection === 'projects' && <ProjectsSection />}
      {activeSection === 'contact' && <ContactSection />}
      
      {activeSection !== 'home' && <TestimonialsSection />}
      
      <Footer />
    </div>
  );
}

export default App;