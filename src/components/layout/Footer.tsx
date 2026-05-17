import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Meteor } from '../shared/Meteor';

const socialIcons = [
  { Icon: FaFacebookF, href: '/', label: 'Facebook' },
  { Icon: FaTwitter, href: '/', label: 'Twitter' },
  { Icon: FaInstagram, href: '/', label: 'Instagram' },
  { Icon: FaYoutube, href: '/', label: 'YouTube' },
];

const footerLinks = [
  {
    title: 'HeritageLink',
    links: [
      { label: 'About Us', href: '/' },
      { label: 'Our Mission', href: '/' },
      { label: 'Careers', href: '/' },
      { label: 'Press', href: '/' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Virtual Tours', href: '/' },
      { label: 'Exhibitions', href: '/' },
      { label: 'Collections', href: '/' },
      { label: 'Educational Resources', href: '/' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Donate', href: '/' },
      { label: 'Membership', href: '/' },
      { label: 'Volunteer', href: '/' },
      { label: 'Corporate Partnerships', href: '/' },
    ],
  },
];

interface StarData {
  id: number;
  top: number;
  left: number;
  size: number;
}

function useStars(count: number): StarData[] {
  return useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: Math.round((i * 37.3) % 100 * 10) / 10,
      left: Math.round((i * 53.7) % 100 * 10) / 10,
      size: Math.round((1 + (i % 3) * 0.7) * 10) / 10,
    }));
  }, [count]);
}

const Star = ({ top, left, size }: { top: number; left: number; size: number }) => (
  <div
    className="absolute bg-white rounded-full animate-pulse"
    style={{
      top: `${top}%`,
      left: `${left}%`,
      width: size,
      height: size,
    }}
  />
);

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink = ({ href, children }: FooterLinkProps) => (
  <motion.a
    href={href}
    className="inline-block text-lg transition-colors duration-300 hover:text-blue-300"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.a>
);

export default function Footer(): React.JSX.Element {
  const stars = useStars(50);

  return (
    <footer className="overflow-hidden relative py-16 text-white bg-proj">
      <div className="overflow-hidden absolute inset-0">
        {stars.map((star) => (
          <Star
            key={star.id}
            top={star.top}
            left={star.left}
            size={star.size}
          />
        ))}
      </div>
      <Meteor size={2} duration={2} delay={0} />
      <Meteor size={1} duration={1.5} delay={1} />
      <Meteor size={3} duration={2.5} delay={2} />
      <div className="container relative z-10 px-4 mx-auto">
        <div className="grid gap-12 mb-16 md:grid-cols-2 lg:grid-cols-4">
          {footerLinks.map((column) => (
            <div key={column.title} className="space-y-6">
              <h3 className="text-2xl font-bold">{column.title}</h3>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Connect</h3>
            <div className="flex flex-wrap gap-4">
              {socialIcons.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  className="p-3 text-2xl rounded-full transition-colors duration-300 hover:bg-white hover:text-blue-600"
                  aria-label={label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        <motion.div
          className="pt-8 text-center border-t border-blue-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-lg">&copy; {new Date().getFullYear()} HeritageLink. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
