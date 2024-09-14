import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Send, MapPin, Mail, Phone, ArrowRight, User, MessageSquare } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <Navbar />
      <section className="relative py-32 overflow-hidden bg-proj font-body">
        <BackgroundAnimation />
        <BlueMeteor />
        <div className="relative flex flex-col items-center px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:flex-row">
          <motion.div 
            className="w-full lg:w-1/2 lg:pr-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="mb-6 text-4xl font-bold leading-tight text-center text-white sm:text-5xl sm:leading-tight lg:leading-tight lg:text-6xl lg:text-left"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Get in Touch
            </motion.h1>
            <motion.p 
              className="mb-8 text-xl text-center text-blue-100 lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We're here to assist you on your heritage journey. Reach out to us for any queries or support.
            </motion.p>
            <motion.form 
              className="space-y-6"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <InputField
                id="name"
                type="text"
                label="Full Name"
                icon={<User className="text-blue-300" size={20} />}
                value={formData.name}
                onChange={handleChange}
              />
              <InputField
                id="email"
                type="email"
                label="Email Address"
                icon={<Mail className="text-blue-300" size={20} />}
                value={formData.email}
                onChange={handleChange}
              />
              <InputField
                id="phone"
                type="tel"
                label="Phone Number"
                icon={<Phone className="text-blue-300" size={20} />}
                value={formData.phone}
                onChange={handleChange}
              />
              <InputField
                id="message"
                type="textarea"
                label="Your Message"
                icon={<MessageSquare className="text-blue-300" size={20} />}
                value={formData.message}
                onChange={handleChange}
              />
              <Button type="submit">
                Send Message
                <Send className="w-5 h-5 ml-2" />
              </Button>
            </motion.form>
          </motion.div>
          <motion.div
            className="mt-12 lg:w-1/2 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="h-full p-8 text-white rounded-lg bg-white/10 backdrop-blur-md">
              <h3 className="mb-6 text-2xl font-bold">Contact Information</h3>
              <div className="space-y-6">
                <ContactInfo
                  icon={<MapPin className="w-6 h-6 text-yellow-400" />}
                  title="Address"
                  content="Pune, Maharashtra 441101, India"
                />
                <ContactInfo
                  icon={<Mail className="w-6 h-6 text-yellow-400" />}
                  title="Email"
                  content="support@heritagelink.com"
                />
                <ContactInfo
                  icon={<Phone className="w-6 h-6 text-yellow-400" />}
                  title="Phone"
                  content="+91 123 456 7890"
                />
              </div>
              <div className="mt-8">
                <Link
                  to="/"
                  className="inline-flex items-center text-yellow-400 transition-colors hover:text-yellow-300"
                >
                  Back to Home
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
        <ParticleBackground />
      </section>
      <Footer />
    </>
  );
};

const InputField = ({ id, type, label, icon, value, onChange }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      {icon}
    </div>
    {type === "textarea" ? (
      <textarea
        id={id}
        rows={4}
        className="block w-full py-3 pl-10 pr-3 text-white placeholder-gray-400 transition-colors border-gray-300 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        placeholder={label}
        value={value}
        onChange={onChange}
        required
      />
    ) : (
      <input
        type={type}
        id={id}
        className="block w-full py-3 pl-10 pr-3 text-white placeholder-gray-400 transition-colors border-gray-300 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        placeholder={label}
        value={value}
        onChange={onChange}
        required
      />
    )}
  </div>
);

const Button = ({ children, type = "button" }) => (
  <motion.button
    type={type}
    className="flex items-center justify-center w-full px-6 py-3 text-base font-medium text-blue-900 transition-all duration-300 ease-in-out rounded-md bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.button>
);

const ContactInfo = ({ icon, title, content }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0">{icon}</div>
    <div className="ml-3">
      <p className="text-base font-medium">{title}</p>
      <p className="mt-1 text-sm text-blue-100">{content}</p>
    </div>
  </div>
);

const BackgroundAnimation = () => (
  <motion.div
    className="absolute inset-0 opacity-20"
    animate={{
      background: [
        "radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(200,200,255,0.3) 100%)",
        "radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(255,200,200,0.3) 100%)",
        "radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(200,255,200,0.3) 100%)",
      ],
    }}
    transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
  />
);

const ParticleBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-white rounded-full opacity-20"
        style={{
          width: Math.random() * 4 + 1,
          height: Math.random() * 4 + 1,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: Math.random() * 5 + 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

const BlueMeteor = () => (
  <>
    <Meteor size={2} duration={2} delay={0} color="rgba(59, 130, 246, 0.6)" />
    <Meteor size={1} duration={1.5} delay={1} color="rgba(96, 165, 250, 0.6)" />
    <Meteor size={3} duration={2.5} delay={2} color="rgba(37, 99, 235, 0.6)" />
  </>
);

const Meteor = ({ size, duration, delay, color }) => (
  <motion.div
    className="absolute rounded-full shadow-lg"
    style={{
      width: size,
      height: size,
      boxShadow: `0 0 ${size * 2}px ${size / 2}px ${color}`,
      background: color,
    }}
    initial={{ top: '-5%', left: '105%' }}
    animate={{
      top: '105%',
      left: '-5%',
      transition: { duration, delay, repeat: Infinity, repeatDelay: 3 },
    }}
  />
);

export default Contact;