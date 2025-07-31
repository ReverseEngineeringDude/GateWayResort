import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Calendar, Users, Home, TrendingUp, LogOut, Shield } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const Admin = () => {
  const navigate = useNavigate();
  const { bookings } = useBooking();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn');
    if (!loggedIn) {
      navigate('/admin-login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin-login');
  };

  if (!isAuthenticated) {
    return null;
  }

  // Analytics calculations
  const totalBookings = bookings.length;
  const acBookings = bookings.filter(b => b.roomType === 'AC').length;
  const nonAcBookings = bookings.filter(b => b.roomType === 'Non-AC').length;
  const totalMembers = bookings.reduce((sum, b) => sum + b.members, 0);
  const totalRooms = bookings.reduce((sum, b) => sum + b.rooms, 0);

  // State-wise bookings
  const stateData = bookings.reduce((acc: any, booking) => {
    acc[booking.state] = (acc[booking.state] || 0) + 1;
    return acc;
  }, {});
  
  const stateChartData = Object.entries(stateData).map(([state, count]) => ({
    state,
    bookings: count
  }));

  // Room type data
  const roomTypeData = [
    { name: 'AC', value: acBookings, color: '#10B981' },
    { name: 'Non-AC', value: nonAcBookings, color: '#14B8A6' }
  ];

  // Monthly trends (mock data for demonstration)
  const monthlyData = [
    { month: 'Jan', bookings: 12 },
    { month: 'Feb', bookings: 19 },
    { month: 'Mar', bookings: 15 },
    { month: 'Apr', bookings: 22 },
    { month: 'May', bookings: 28 },
    { month: 'Jun', bookings: 35 }
  ];

  const stats = [
    { title: 'Total Bookings', value: totalBookings, icon: Calendar, color: 'from-blue-500 to-blue-600' },
    { title: 'Total Members', value: totalMembers, icon: Users, color: 'from-green-500 to-green-600' },
    { title: 'Total Rooms', value: totalRooms, icon: Home, color: 'from-purple-500 to-purple-600' },
    { title: 'AC Bookings', value: acBookings, icon: TrendingUp, color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-12 px-4"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* State-wise Bookings */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Bookings by State</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stateChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="state" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Room Type Distribution */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Room Type Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={roomTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {roomTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="max-w-7xl mx-auto mb-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Monthly Booking Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="bookings" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Bookings Table */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Bookings</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">State</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Place</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Members</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Rooms</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Check-in</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-500">
                      No bookings yet. Visit the booking page to create test bookings.
                    </td>
                  </tr>
                ) : (
                  bookings.slice().reverse().slice(0, 10).map((booking) => (
                    <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">{booking.name}</td>
                      <td className="py-3 px-4">{booking.state}</td>
                      <td className="py-3 px-4">{booking.place}</td>
                      <td className="py-3 px-4">{booking.members}</td>
                      <td className="py-3 px-4">{booking.rooms}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          booking.roomType === 'AC' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {booking.roomType}
                        </span>
                      </td>
                      <td className="py-3 px-4">{booking.checkIn}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Admin;