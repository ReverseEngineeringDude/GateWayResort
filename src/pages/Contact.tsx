import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle, Clock } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      details: 'GateWay Resort, Kadalundi, Kozhikode District, Kerala 673302, India',
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+91 8590319003',
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'info@gatewayresort.com',
    },
    {
      icon: Clock,
      title: 'Reception Hours',
      details: '24/7 Available',
    },
  ];

  const handleWhatsAppClick = () => {
    const message = 'Hello! I would like to know more about GateWay Resort.';
    const whatsappUrl = `https://wa.me/918590319003?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24"
    >
      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-primary-dark text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-playfair font-bold mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl opacity-90 font-lato"
          >
            Get in touch with us for bookings and inquiries
          </motion.p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 bg-primary text-accent">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <motion.h2
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="text-3xl font-playfair font-bold text-white mb-8"
              >
                Get In Touch
              </motion.h2>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-6 bg-glass backdrop-blur-xs rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-playfair font-semibold text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="font-lato">{item.details}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* WhatsApp Button */}
              <motion.button
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                onClick={handleWhatsAppClick}
                className="mt-8 w-full py-4 bg-secondary text-primary font-semibold rounded-xl hover:bg-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat with us on WhatsApp
              </motion.button>
            </div>

            {/* Google Map */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="h-96 lg:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.007815513694!2d75.7684983147895!3d11.26189199210049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba6595b81144033%3A0x291c9953a6ee734!2sThe%20Gateway%20Hotel%20Beach%20Road%20Calicut!5e0!3m2!1sen!2sin!4v1678273769749!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="GateWay Resort Location"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4 bg-primary-dark">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-playfair font-bold text-white mb-8"
          >
            Ready to Book Your Stay?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.a
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              href="/booking"
              className="block p-8 bg-glass backdrop-blur-xs rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105$1"
            >
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-playfair font-semibold text-white mb-2">
                Make a Reservation
              </h3>
              <p className="text-accent font-lato">
                Book your stay online with our easy booking system
              </p>
            </motion.a>

            <motion.button
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              onClick={handleWhatsAppClick}
              className="block p-8 bg-glass backdrop-blur-xs rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105$1"
            >
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-playfair font-semibold text-white mb-2">
                Instant Support
              </h3>
              <p className="text-accent font-lato">
                Get immediate assistance via WhatsApp chat
              </p>
            </motion.button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;