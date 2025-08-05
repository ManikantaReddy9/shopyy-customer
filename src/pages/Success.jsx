import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 px-4">
      <motion.div
        className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-xl w-full"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/3159/3159066.png"
          alt="Success"
          className="mx-auto w-32 mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
        />

        <motion.h1
          className="text-3xl font-bold text-green-600 mb-2"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Order Successful!
        </motion.h1>

        <motion.p
          className="text-gray-700 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Thank you for shopping with <span className="font-semibold">Shopyy</span>. We’ll deliver your items soon!💖
        </motion.p>

        <motion.button
          onClick={() => navigate('/products')}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continue Shopping
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Success;
