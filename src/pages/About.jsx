import React from 'react';
import { ArrowLeft, Users, Target, Heart, Award, Globe, BookOpen, Zap } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const navigateToHome = () => navigate('/home');

  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Founder & CEO',
      description: 'Former special education teacher with 15+ years experience in accessible learning technologies.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      description: 'Software engineer specializing in assistive technologies and audio processing systems.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Head of Accessibility',
      description: 'Accessibility consultant with expertise in WCAG guidelines and inclusive design.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'David Kim',
      role: 'Lead UX Designer',
      description: 'User experience designer focused on creating intuitive interfaces for all users.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Inclusivity First',
      description: 'We believe education should be accessible to everyone, regardless of their abilities.'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Continuously pushing boundaries to create better learning experiences through technology.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a supportive network of learners, educators, and advocates.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering the highest quality educational content and tools.'
    }
  ];

  const milestones = [
    {
      year: '2023',
      title: 'Platform Launch',
      description: 'Initial release with core accessibility features'
    },
    {
      year: '2024',
      title: 'Community Growth',
      description: 'Reached 10,000+ active users and expanded content library'
    },
    {
      year: '2025',
      title: 'Global Expansion',
      description: 'Launching in multiple languages and regions'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="relative border-b border-white/10 backdrop-blur-xl bg-black/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={navigateToHome}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to Home</span>
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              About Garur
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Empowering Learning for Everyone
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Garur is more than just an educational platform. We're a movement dedicated to making quality education 
              accessible to blind and visually impaired learners worldwide through innovative technology and inclusive design.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold text-white mb-6">Our Mission</h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                To break down barriers in education by creating an inclusive learning environment where every student, 
                regardless of their visual abilities, can thrive and achieve their full potential.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                We believe that accessibility isn't just a feature—it's the foundation of everything we build. 
                Every tool, every resource, and every interaction is designed with the needs of visually impaired 
                learners in mind.
              </p>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <Globe className="w-32 h-32 text-purple-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Our Values</h3>
            <p className="text-xl text-gray-400">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="group p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-105 cursor-pointer"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-4 mb-6 group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-200 transition-colors duration-300">
                    {value.title}
                  </h4>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Meet Our Team</h3>
            <p className="text-xl text-gray-400">The passionate individuals behind Garur</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group text-center p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-105 cursor-pointer"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-purple-500/30 group-hover:border-purple-500/60 transition-all duration-500">
                  <img 
                    src={member.avatar} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors duration-300">
                  {member.name}
                </h4>
                <p className="text-purple-300 text-sm mb-3 group-hover:text-purple-200 transition-colors duration-300">
                  {member.role}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="relative py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Our Journey</h3>
            <p className="text-xl text-gray-400">Key milestones in our mission</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="group text-center p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-105 cursor-pointer"
              >
                <div className="text-4xl font-bold text-purple-400 mb-4 group-hover:text-purple-300 transition-colors duration-300">
                  {milestone.year}
                </div>
                <h4 className="text-xl font-semibold text-white mb-4 group-hover:text-purple-200 transition-colors duration-300">
                  {milestone.title}
                </h4>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">Join Our Mission</h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Be part of the movement to make education truly accessible for everyone.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/register"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-xl overflow-hidden transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/50 font-semibold"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
            <Link
              to="/community"
              className="group px-8 py-4 border-2 border-white/20 text-gray-300 hover:text-white rounded-xl hover:bg-white/5 hover:border-purple-400/50 transition-all duration-500 backdrop-blur-xl font-semibold"
            >
              Join Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
