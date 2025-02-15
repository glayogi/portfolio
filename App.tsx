import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Linkedin, Mail, User, GraduationCap, Code, Menu, X, Send, Loader2, FileDown, Home, Award, Brain } from 'lucide-react';

function Section({ children, className = '', id = '' }: { children: React.ReactNode; className?: string; id?: string }) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={className}
      id={id}
    >
      {children}
    </motion.div>
  );
}

function SkillBar({ name, percentage }: { name: string; percentage: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-gray-300">{name}</span>
        <span className="text-blue-400">{percentage}%</span>
      </div>
      <div className="h-2 bg-[#1e293b] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.9, 1]);
  const headerBlur = useTransform(scrollY, [0, 100], [8, 12]);
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(2, 6, 23, 0.8)', 'rgba(15, 23, 42, 0.95)']
  );
  const headerBorder = useTransform(
    scrollY,
    [0, 100],
    ['rgba(30, 41, 59, 0)', 'rgba(59, 130, 246, 0.2)']
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id || 'home');
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px',
      }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    setFormStatus('submitting');

    const data = {
      ...formData,
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbwgwfp2KNT1C2o97UoFx_vznOynYraXrd06lXuG7H0gay6MCpRoMlnYhB18zKPOcal0/exec', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors'
      });

      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
      
      window.open('https://media1.tenor.com/m/Q5-0X8P9aXIAAAAC/thank-you-for-your-time-jamie-kellett.gif', '_blank');
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
      alert('There was an error submitting the form. Please try using the Google Form link below.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const navItems = [
    { href: '#', text: 'Home', icon: Home, id: 'home' },
    { href: '#about', text: 'About', icon: User, id: 'about' },
    { href: '#education', text: 'Education', icon: GraduationCap, id: 'education' },
    { href: '#skills', text: 'Skills', icon: Brain, id: 'skills' },
    { href: '#projects', text: 'Projects', icon: Code, id: 'projects' },
    { href: '#certificates', text: 'Certificates', icon: Award, id: 'certificates' },
    { href: '#contact', text: 'Contact', icon: Mail, id: 'contact' },
  ];

  const skills = [
    { name: 'Python & EDA', percentage: 80 },
    { name: 'PowerBI & Excel', percentage: 95 },
    { name: ' SQL & Snowflake & Tableau', percentage: 90 },
    { name: 'Problem Solving & Quick Learner', percentage: 80 },
    { name: 'Effective Communication', percentage: 80 },
    { name: 'Leadership and Team Management', percentage: 80 },
  ];

  const certificates = [
    {
      title: "Machine Learning",
      issuer: "Stanford(Coursera)",
      date: "2024",
      link: "https://www.coursera.org/account/accomplishments/specialization/certificate/JJRAMM9DTSYR"
    },
    {
      title: "SQL(Basic)",
      issuer: "HackerRank",
      date: "2024",
      link: "https://www.hackerrank.com/certificates/bce87c01b6db"
    },
    {
      title: "Python(Basic)",
      issuer: "HackerRank",
      date: "2025",
      link: "https://www.hackerrank.com/certificates/3c55aaef2b58"
    },
    {
      title: "Foundation Associate",
      issuer: "Oracle",
      date: "2023",
      link: "https://drive.google.com/file/d/1zqCbxJLTsXiJcrTqs-7TiU-9CYk-H1S4/view"
    },
    {
      title: "Data Analyst",
      issuer: "Udemy",
      date: "2025",
     link: "https://www.udemy.com/certificate/UC-c02aaf34-404b-444c-adc4-cc58ca5b6939/" 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020617] to-[#0f172a] text-white">
      <motion.header
        style={{
          opacity: headerOpacity,
          backdropFilter: `blur(${headerBlur}px)`,
          backgroundColor: headerBg,
          borderBottom: useTransform(headerBorder, (color) => `1px solid ${color}`),
        }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.a
              href="https://yogendra-singh-portfolio.netlify.app/"
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              PORTFOLIO
            </motion.a>

            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>

            <nav className="hidden md:flex gap-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-1 transition-all duration-300 relative ${
                      isActive
                        ? 'text-blue-400 scale-110 font-medium'
                        : 'text-gray-300 hover:text-white'
                    }`}
                    onClick={() => setActiveSection(item.id)}
                    whileHover={{ scale: isActive ? 1.1 : 1.05 }}
                  >
                    <item.icon className={`w-4 h-4 transition-colors duration-300 ${
                      isActive ? 'text-blue-400' : 'text-gray-400'
                    }`} />
                    {item.text}
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-400"
                        layoutId="underline"
                      />
                    )}
                  </motion.a>
                );
              })}
            </nav>
          </div>
        </div>

        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-[#1e293b]/95 backdrop-blur-lg border-t border-blue-500/10"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-3 transition-all relative ${
                    isActive
                      ? 'text-blue-400 bg-[#2d3748]/50 font-medium'
                      : 'text-gray-300 hover:text-white hover:bg-[#2d3748]/30'
                  }`}
                  onClick={() => {
                    setIsMenuOpen(false);
                    setActiveSection(item.id);
                  }}
                  whileHover={{ x: 4 }}
                >
                  <item.icon className={`w-4 h-4 transition-colors duration-300 ${
                    isActive ? 'text-blue-400' : 'text-gray-400'
                  }`} />
                  {item.text}
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-400"
                      layoutId="mobileLine"
                    />
                  )}
                </motion.a>
              );
            })}
          </motion.nav>
        )}
      </motion.header>

      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover bg-center opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/50 to-[#020617]" />
        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.img
              src="https://avatars.githubusercontent.com/u/92726759?s=400&u=5f496d07c0243898e73bc0bba6bb0b7098765df5&v=4"
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-8 object-cover border-4 border-blue-400 animate-float shadow-xl shadow-blue-500/60"
              initial={{ scale: 0 }}
              animate={{ scale: 2 }}
              transition={{ type: "inertia", velocity: 50, bounceStiffness: 300 }}
            />
            <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 shadow-l shadow-blue-500/50 animate-pulse-slow">
              YOGENDRA SINGH
            </h1>
            <p className="text-xl text-gray-300 mb-8">DATA ANALYST ( OPEN TO WORK )</p>
            
            <motion.a
              href="https://drive.google.com/file/d/1kl3qayAF10Avmwd162huEAnI3dwNL81Q/view"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-500 transition-colors mb-8 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileDown className="w-5 h-5 group-hover:animate-bounce transition-transform duration-300 ease-in-out scale-110" />
              Download Resume
            </motion.a>
            
            <div className="flex justify-center gap-4">
              <motion.a
                href="https://github.com/yogendra-gla"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#0f172a]/50 rounded-full hover:bg-[#1e293b] transition-colors border border-[#1e293b] hover:border-blue-500 shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/yogendra-singh-0100741b7/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#0f172a]/50 rounded-full hover:bg-[#1e293b] transition-colors border border-[#1e293b] hover:border-blue-500 shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="mailto:rawatyogendra689@gmail.com"
                className="p-3 bg-[#0f172a]/50 rounded-full hover:bg-[#1e293b] transition-colors border border-[#1e293b] hover:border-blue-500 shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-6 h-6" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Section id="about" className="py-20 bg-[#0f172a]/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 justify-center">
              <User className="w-8 h-8 text-blue-400" />
              About Me
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              I'm Yogendra Singh, a problem solver with a passion for learning and growth. I thrive in dynamic environments, quickly adapt to challenges, and stay focused under pressure. Whether working with data, coding, or leading a team, I bring a strong work ethic and a mindset geared toward continuous improvement.
              What sets me apart is my attention to detail, curiosity, and ability to think ahead. I don't just complete tasks—I find smarter, more efficient ways to get things done. I believe in embracing challenges, staying curious, and always striving to make a meaningful impact wherever I go.
            </p>
          </div>
        </div>
      </Section>

      <Section id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-2 justify-center">
            <Brain className="w-8 h-8 text-blue-400" />
            Skills & Expertise
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-6 text-blue-400">Technical Skills</h3>
              {skills.slice(0, 3).map((skill) => (
                <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} />
              ))}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6 text-blue-400">Professional Skills</h3>
              {skills.slice(3).map((skill) => (
                <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="projects" className="py-20 bg-[#0f172a]/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-2 justify-center">
            <Code className="w-8 h-8 text-blue-400" />
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "UPI transaction data analysis ",
                description: "Designed Power BI dashboards, analyzed UPI data, identified trends, optimized processes",
                image: "https://www.mindgate.solutions/wp-content/uploads/2023/10/empowering-transactions-the-upi-revolution-and-its-game-changing-impact-on-credit-thumb.png.webp",
                tech: ["POWER BI"],
                github: "https://github.com/yogendra-gla?tab=repositories"
              },
              {
                title: "Student Depression Data Analysis",
                description: "Analyzed student depression data, created dashboards, and provided actionable insights",
                image: "https://i.ndtvimg.com/i/2017-02/depression-istock_650x400_51487909764.jpg?downsize=773:435",
                tech: ["SQL","TABLEAU"],
                github: "https://github.com/yogendra-gla?tab=repositories"
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                className="bg-[#0f172a]/30 rounded-xl overflow-hidden hover:transform group relative border border-[#1e293b] hover:border-blue-500 transition-all duration-300"
                whileHover={{ y: -10 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-[#0f172a]/50 rounded-full text-sm text-blue-400 border border-blue-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    View Details
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="education" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-2 justify-center">
            <GraduationCap className="w-8 h-8 text-blue-400" />
            Education
          </h2>
          <motion.div
            className="bg-[#0f172a]/30 p-8 rounded-xl border border-[#1e293b] hover:border-blue-500 transition-all duration-300 max-w-3xl mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Bachelor of Computer Science
            </h3>
            <p className="text-blue-400 mb-4">GLA University | 2021 - 2025</p>
            <p className="text-gray-300">
              71.8 %
            </p>
          </motion.div>
          
          <motion.div
            className="bg-[#0f172a]/30 p-8 rounded-xl border border-[#1e293b] hover:border-blue-500 transition-all duration-300 max-w-3xl mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Intermediate
            </h3>
            <p className="text-blue-400 mb-4">Gyan Deep Public School</p>
            <p className="text-gray-300">
              78 %
            </p>
          </motion.div>
          <motion.div
            className="bg-[#0f172a]/30 p-8 rounded-xl border border-[#1e293b] hover:border-blue-500 transition-all duration-300 max-w-3xl mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              High School
            </h3>
            <p className="text-blue-400 mb-4">Gyan Deep Public School</p>
            <p className="text-gray-300">
              7.6 
            </p>
          </motion.div>
        </div>
      </Section>

      <Section id="certificates" className="py-20 bg-[#0f172a]/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-2 justify-center">
            <Award className="w-8 h-8 text-blue-400" />
            Certificates
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {certificates.map((cert, index) => (
              <motion.a
                key={index}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0f172a]/30 p-6 rounded-xl border border-[#1e293b] hover:border-blue-500 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <Award className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  {cert.title}
                </h3>
                <p className="text-gray-300">{cert.issuer}</p>
                <p className="text-blue-400 text-sm mt-2">{cert.date}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </Section>

      <Section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-2 justify-center">
            <Mail className="w-8 h-8 text-blue-400" />
            Contact Me
          </h2>
          <div className="max-w-2xl mx-auto">
            <motion.form
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#0f172a]/30 border border-[#1e293b] focus:border-blue-500 rounded-lg text-white outline-none transition-colors"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#0f172a]/30 border border-[#1e293b] focus:border-blue-500 rounded-lg text-white outline-none transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-[#0f172a]/30 border border-[#1e293b] focus:border-blue-500 rounded-lg text-white outline-none transition-colors"
                  placeholder="Your message..."
                  required
                />
              </div>
              <motion.button
                type="submit"
                disabled={formStatus === 'submitting'}
                className={`w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:from-blue-500 hover:to-purple-500 transition-all ${
                  formStatus === 'submitting' ? 'opacity-75 cursor-not-allowed' : ''
                }`}
                whileHover={{ scale: formStatus === 'submitting' ? 1 : 1.02 }}
                whileTap={{ scale: formStatus === 'submitting' ? 1 : 0.98 }}
              >
                {formStatus === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : formStatus === 'success' ? (
                  <>
                    Message Sent!
                  </>
                ) : formStatus === 'error' ? (
                  <>
                    Mention not your detail saved by google form
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </motion.form>
            <div className="text-center mt-8">
              <p className="text-gray-300"></p>
              <motion.a
                href="https://media1.tenor.com/m/Q5-0X8P9aXIAAAAC/thank-you-for-your-time-jamie-kellett.gif"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mt-2"
                whileHover={{ scale: 1.05 }}
              >
                <Mail className="w-4 h-4" />
                
              </motion.a>
            </div>
          </div>
        </div>
      </Section>

      <footer className="py-8 bg-[#020617]">
        <div className="container mx-auto px-4 text-center text-gray-300">
          <p>I am yogendra singh hereby declare that all the above-mentioned information is true and correct to the best of my knowledge.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
