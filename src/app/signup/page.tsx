
'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import SignUpForm from '@/components/signup-form';

const SwishLogo = () => (
  <div className="flex items-baseline gap-3">
    <h1 className="text-4xl font-bold text-yellow-400">swish</h1>
    <p className="text-sm text-white/80">
      10-minute
      <br />
      food delivery
    </p>
  </div>
);

export default function SignUpPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full flex-col bg-stone-500">
        <div className="flex-1 p-8 text-white relative flex flex-col justify-center">
            <div className="absolute top-8 left-8">
                <SwishLogo />
            </div>
             <div className="space-y-4">
                <h2 className="text-5xl font-extrabold text-yellow-400 leading-tight">
                    JOIN THE
                    <br />
                    DELIVERY
                    <br />
                    REVOLUTION
                </h2>
             </div>
        </div>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="bg-white rounded-t-3xl p-2 shadow-2xl"
      >
        <SignUpForm />
      </motion.div>
    </div>
  );
}
