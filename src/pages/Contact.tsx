import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone, ArrowRight, User, MessageSquare } from 'lucide-react';
import { BackgroundGradient, Meteor } from '../components/shared/Effects';
import { ParticleBackground } from '../components/shared/ParticleBackground';
import toast from 'react-hot-toast';
import '../styles/shared-input.css';

const Contact = (): React.JSX.Element => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We will get back to you soon.', { duration: 3000 });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section className="relative bg-proj font-body">
      <BackgroundGradient />
      <Meteor size={2} duration={2} delay={0} color="rgba(59, 130, 246, 0.6)" />
      <Meteor size={1} duration={1.5} delay={1} color="rgba(96, 165, 250, 0.6)" />
      <Meteor size={3} duration={2.5} delay={2} color="rgba(37, 99, 235, 0.6)" />
      <div className="flex relative flex-col items-center px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:flex-row lg:py-16">
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
            We&apos;re here to assist you on your heritage journey. Reach out to us for any queries or support.
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
              <Send className="ml-2 w-5 h-5" aria-hidden="true" />
            </Button>
          </motion.form>
        </motion.div>
        <motion.div
          className="mt-12 lg:w-1/2 lg:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="p-8 h-full text-white rounded-lg backdrop-blur-md bg-white/10">
            <h3 className="mb-6 text-2xl font-bold">Contact Information</h3>
            <div className="space-y-6">
              <ContactInfo
                icon={<MapPin className="w-6 h-6 text-yellow-400" aria-hidden="true" />}
                title="Address"
                content="Pune, Maharashtra 441101, India"
              />
              <ContactInfo
                icon={<Mail className="w-6 h-6 text-yellow-400" aria-hidden="true" />}
                title="Email"
                content="support@heritagelink.com"
              />
              <ContactInfo
                icon={<Phone className="w-6 h-6 text-yellow-400" aria-hidden="true" />}
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
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
      <ParticleBackground count={30} />
    </section>
  );
};

interface InputFieldProps {
  id: string;
  type: string;
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const InputField = ({ id, type, label, icon, value, onChange }: InputFieldProps) => (
  <div className="relative">
    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none" aria-hidden="true">{icon}</div>
    {type === 'textarea' ? (
      <textarea
        id={id}
        rows={4}
        className="textarea-base input-with-icon"
        placeholder={label}
        aria-label={label}
        value={value}
        onChange={onChange}
        required
      />
    ) : (
      <input
        type={type}
        id={id}
        className="input-base input-with-icon"
        placeholder={label}
        aria-label={label}
        value={value}
        onChange={onChange}
        required
      />
    )}
  </div>
);

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({ children, type = 'button' }: ButtonProps) => (
  <motion.button
    type={type}
    className="flex justify-center items-center px-6 py-3 w-full text-base font-medium text-blue-900 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-md transition-all duration-300 ease-in-out hover:from-yellow-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.button>
);

interface ContactInfoProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}

const ContactInfo = ({ icon, title, content }: ContactInfoProps) => (
  <div className="flex items-start">
    <div className="flex-shrink-0">{icon}</div>
    <div className="ml-3">
      <p className="text-base font-medium">{title}</p>
      <p className="mt-1 text-sm text-blue-100">{content}</p>
    </div>
  </div>
);

export default Contact;
