import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Amit Sharma',
    role: 'Museum Visitor',
    content:
      'Using HeritageLink was a fantastic experience! No more waiting in long queues. Booking tickets and getting information about exhibits through the chatbot was so convenient.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=33',
  },
  {
    name: 'Radhika Rao',
    role: 'Museum Director',
    content:
      'HeritageLink has greatly enhanced our visitor experience and operational efficiency. The insights provided by the analytics are crucial for our strategic decisions.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=23',
  },
  {
    name: 'Priya Patel',
    role: 'International Tourist',
    content:
      'As someone who prefers Hindi, I was delighted to use the multilingual chatbot. It made planning my visit and booking tickets so much easier and more enjoyable.',
    rating: 4,
    image: 'https://i.pravatar.cc/150?img=41',
  },
  {
    name: 'John Smith',
    role: 'History Enthusiast',
    content:
      'The personalized recommendations from the AI were spot on! It helped me discover hidden gems I might have otherwise missed.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=53',
  },
  {
    name: 'Sarah Lee',
    role: 'School Teacher',
    content:
      'Organizing a school trip was a breeze with HeritageLink. The group booking feature and educational resources are fantastic!',
    rating: 4,
    image: 'https://i.pravatar.cc/150?img=44',
  },
  {
    name: 'Raj Malhotra',
    role: 'Tech Blogger',
    content:
      'The QR code entry system is brilliant! It\'s so satisfying to bypass the lines and enter the museum with just a quick scan.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=63',
  },
  {
    name: 'Emma Watson',
    role: 'Art Student',
    content:
      'The virtual tour option allowed me to preview the exhibits before my visit. It really helped me plan my itinerary effectively.',
    rating: 4,
    image: 'https://i.pravatar.cc/150?img=47',
  },
  {
    name: 'Dr. Arun Kumar',
    role: 'Archaeologist',
    content:
      'The detailed information provided by HeritageLink about each artifact is impressive. It\'s a great tool for both casual visitors and researchers.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=68',
  },
];

const CARD_WIDTH = 400; // px, including gap

export default function TestimonialSection(): React.JSX.Element {
  const firstHalf = testimonials.slice(0, 4);
  const secondHalf = testimonials.slice(4);

  return (
    <section className="py-20 overflow-hidden bg-proj">
      <div className="container px-4 mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-3xl font-bold text-center text-white md:text-4xl"
        >
          What Our Visitors Say
        </motion.h2>
        <div className="flex flex-col gap-12">
          <TestimonialRow testimonials={firstHalf} direction="left" />
          <TestimonialRow testimonials={secondHalf} direction="right" />
        </div>
      </div>
    </section>
  );
}

interface TestimonialRowProps {
  testimonials: Testimonial[];
  direction: 'left' | 'right';
}

const TestimonialRow = ({ testimonials, direction }: TestimonialRowProps): React.JSX.Element => {
  const totalWidth = testimonials.length * CARD_WIDTH;

  return (
    <motion.div
      className="flex gap-8"
      animate={{ x: direction === 'left' ? [0, -totalWidth] : [-totalWidth, 0] }}
      transition={{
        x: { repeat: Infinity, duration: 40, ease: 'linear' },
        opacity: { duration: 0.8 },
      }}
    >
      {testimonials.concat(testimonials).map((testimonial, index) => (
        <TestimonialCard key={`${testimonial.name}-${index}`} testimonial={testimonial} />
      ))}
    </motion.div>
  );
};

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps): React.JSX.Element => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
      className="relative flex-shrink-0 p-6 overflow-hidden bg-white rounded-lg shadow-lg"
      style={{ width: CARD_WIDTH - 32 }} // subtract gap
    >
      <div className="absolute top-0 left-0 w-20 h-20 -translate-x-10 -translate-y-10 bg-blue-200 rounded-full opacity-20" />
      <div className="absolute bottom-0 right-0 w-20 h-20 translate-x-10 translate-y-10 bg-blue-200 rounded-full opacity-20" />
      <FaQuoteLeft className="mb-4 text-3xl text-blue-400" aria-hidden="true" />
      <p className="mb-4 text-sm italic text-gray-700">{testimonial.content}</p>
      <div className="flex items-center gap-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="object-cover w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="font-semibold text-blue-600">{testimonial.name}</h3>
          <p className="text-xs text-gray-600">{testimonial.role}</p>
        </div>
      </div>
      <div className="flex mt-2">
        {Array.from({ length: 5 }, (_, i) => (
          <FaStar
            key={i}
            className={`text-sm ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
            aria-hidden="true"
          />
        ))}
      </div>
    </motion.div>
  );
};
