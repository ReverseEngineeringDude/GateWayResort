import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Calendar, Users, Home, MessageCircle, CheckCircle } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

interface BookingForm {
  state: string;
  place: string;
  members: number;
  rooms: number;
  roomType: 'AC' | 'Non-AC';
  name: string;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
}

const Booking = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submittedData, setSubmittedData] = useState<BookingForm | null>(null);
  const { addBooking } = useBooking();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<BookingForm>();

  const onSubmit = (data: BookingForm) => {
    // Add booking to context
    addBooking({
      id: Date.now().toString(),
      ...data,
      timestamp: new Date().toISOString(),
    });

    setSubmittedData(data);
    setShowConfirmation(true);

    // Send to WhatsApp
    const message = `New Booking Enquiry from GateWay Resort Website:\n\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nState: ${data.state}\nPlace: ${data.place}\nMembers: ${data.members}\nRooms: ${data.rooms}\nRoom Type: ${data.roomType}\nCheck-in: ${data.checkIn}\nCheck-out: ${data.checkOut}`;

    const whatsappUrl = `https://wa.me/918590319003?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    reset();
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
    setSubmittedData(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-12"
    >
      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-bold mb-6"
          >
            Book Your Stay
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl opacity-90"
          >
            Experience the luxury and comfort of GateWay Resort
          </motion.p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Make a Reservation
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    {...register('phone', { required: 'Phone number is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Location Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    {...register('state', { required: 'State is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your state"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Place *
                  </label>
                  <input
                    type="text"
                    {...register('place', { required: 'Place is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your place/city"
                  />
                  {errors.place && (
                    <p className="text-red-500 text-sm mt-1">{errors.place.message}</p>
                  )}
                </div>
              </div>

              {/* Booking Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="inline h-4 w-4 mr-1" />
                    Members *
                  </label>
                  <input
                    type="number"
                    min="1"
                    {...register('members', { required: 'Number of members is required', min: 1 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="0"
                  />
                  {errors.members && (
                    <p className="text-red-500 text-sm mt-1">{errors.members.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Home className="inline h-4 w-4 mr-1" />
                    Rooms *
                  </label>
                  <input
                    type="number"
                    min="1"
                    {...register('rooms', { required: 'Number of rooms is required', min: 1 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="0"
                  />
                  {errors.rooms && (
                    <p className="text-red-500 text-sm mt-1">{errors.rooms.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Type *
                  </label>
                  <select
                    {...register('roomType', { required: 'Room type is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select</option>
                    <option value="AC">AC</option>
                    <option value="Non-AC">Non-AC</option>
                  </select>
                  {errors.roomType && (
                    <p className="text-red-500 text-sm mt-1">{errors.roomType.message}</p>
                  )}
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Check-in Date *
                  </label>
                  <input
                    type="date"
                    {...register('checkIn', { required: 'Check-in date is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  />
                  {errors.checkIn && (
                    <p className="text-red-500 text-sm mt-1">{errors.checkIn.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Check-out Date *
                  </label>
                  <input
                    type="date"
                    {...register('checkOut', { required: 'Check-out date is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  />
                  {errors.checkOut && (
                    <p className="text-red-500 text-sm mt-1">{errors.checkOut.message}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Send Booking Enquiry via WhatsApp
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={closeConfirmation}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Booking Enquiry Sent!
              </h3>
              <p className="text-gray-600 mb-6">
                Your booking enquiry has been sent via WhatsApp. We'll get back to you shortly!
              </p>
              <button
                onClick={closeConfirmation}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Booking;