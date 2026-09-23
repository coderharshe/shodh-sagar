"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    message: "",
    captcha: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="relative w-full py-16 bg-brand-section overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-[#1d1d1f] tracking-tight mb-4">
            Contact Us.
          </h2>
          <p className="text-[#86868b] font-sans text-xl">
            If you have a query regarding sales or publications, please complete the form below.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-xs font-sans font-semibold text-[#86868b] uppercase tracking-wider">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="First Name"
                  className="w-full bg-[#f5f5f7] border border-transparent focus:border-[#005b5c] rounded-xl px-5 py-4 text-[#223534] placeholder:text-[#86868b]/50 focus:outline-none focus:ring-1 focus:ring-[#005b5c] transition-all font-sans text-lg"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-xs font-sans font-semibold text-[#86868b] uppercase tracking-wider">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Last Name"
                  className="w-full bg-[#f5f5f7] border border-transparent focus:border-[#005b5c] rounded-xl px-5 py-4 text-[#223534] placeholder:text-[#86868b]/50 focus:outline-none focus:ring-1 focus:ring-[#005b5c] transition-all font-sans text-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="mobile" className="text-xs font-sans font-semibold text-[#86868b] uppercase tracking-wider">Mobile with Country Code</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                placeholder="+919876543210"
                className="w-full bg-[#f5f5f7] border border-transparent focus:border-[#005b5c] rounded-xl px-5 py-4 text-[#223534] placeholder:text-[#86868b]/50 focus:outline-none focus:ring-1 focus:ring-[#005b5c] transition-all font-sans text-lg"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-sans font-semibold text-[#86868b] uppercase tracking-wider">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="info@domain.tld"
                className="w-full bg-[#f5f5f7] border border-transparent focus:border-[#005b5c] rounded-xl px-5 py-4 text-[#223534] placeholder:text-[#86868b]/50 focus:outline-none focus:ring-1 focus:ring-[#005b5c] transition-all font-sans text-lg"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-sans font-semibold text-[#86868b] uppercase tracking-wider">Subject/Question/Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="What would you like to know?"
                className="w-full bg-[#f5f5f7] border border-transparent focus:border-[#005b5c] rounded-xl px-5 py-4 text-[#223534] placeholder:text-[#86868b]/50 focus:outline-none focus:ring-1 focus:ring-[#005b5c] transition-all font-sans text-lg resize-none"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="captcha" className="text-xs font-sans font-semibold text-[#86868b] uppercase tracking-wider">Security Challenge (3 + 6 = ?)</label>
              <div className="flex gap-4">
                <div className="bg-[#e5e5ea] border border-[#d2d2d7] rounded-xl px-6 py-4 flex items-center justify-center font-sans font-bold text-lg text-[#1d1d1f] select-none">
                  3 + 6
                </div>
                <input
                  type="text"
                  id="captcha"
                  name="captcha"
                  value={formData.captcha}
                  onChange={handleChange}
                  required
                  placeholder="?"
                  className="flex-1 bg-[#f5f5f7] border border-transparent focus:border-[#005b5c] rounded-xl px-5 py-4 text-[#223534] placeholder:text-[#86868b]/50 focus:outline-none focus:ring-1 focus:ring-[#005b5c] transition-all font-sans text-lg"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-[#005b5c] hover:bg-[#003f40] text-white font-sans font-medium text-lg px-8 py-5 rounded-xl transition-colors flex items-center justify-center gap-3 shadow-md"
            >
              <Send size={20} />
              Submit Enquiry
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
