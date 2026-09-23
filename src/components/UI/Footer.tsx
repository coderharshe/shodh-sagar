import React from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#003f40] text-[#d9d6c9] py-16 relative overflow-hidden">
      {/* Subtle warm orb */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(197,152,47,0.06) 0%, transparent 70%)' }} />
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 relative z-10">
        
        {/* Brand & Address */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <Image 
              src="/logo.png" 
              alt="Shodh Sagar Logo" 
              width={60} 
              height={60} 
              className="bg-white rounded p-1"
            />
            <h4 className="text-2xl font-serif font-bold text-white">Shodh Sagar</h4>
          </div>
          
          <ul className="space-y-4 text-sm font-sans text-[#a8c4c4]">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#c5982f] shrink-0 mt-0.5" />
              <span>Shodh Sagar<br/>Gurugram - 122001, Haryana, India</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#c5982f] shrink-0" />
              <span>+91-9812056755 / +91-7206072525</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#c5982f] shrink-0" />
              <a href="mailto:enquiry@shodhsagar.org" className="hover:text-white transition-colors">enquiry@shodhsagar.org</a>
            </li>
            <li className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-[#c5982f] shrink-0" />
              <a href="https://www.shodhsagar.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">www.shodhsagar.org</a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-sans font-semibold text-[#c5982f] mb-6 uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-3 text-sm font-sans text-[#a8c4c4]">
            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="/journals" className="hover:text-white transition-colors">Our Journals</a></li>
            <li><a href="https://events.shodhsagar.org" className="hover:text-white transition-colors">Conferences</a></li>
            <li><a href="https://books.shodhsagar.org" className="hover:text-white transition-colors">Books</a></li>
            <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="text-sm font-sans font-semibold text-[#c5982f] mb-6 uppercase tracking-wider">Connect With Us</h4>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="w-9 h-9 flex items-center justify-center font-bold text-xs bg-[#005b5c] rounded-full hover:bg-[#c5982f] hover:text-[#003f40] transition-colors">FB</a>
            <a href="#" className="w-9 h-9 flex items-center justify-center font-bold text-xs bg-[#005b5c] rounded-full hover:bg-[#c5982f] hover:text-[#003f40] transition-colors">X</a>
            <a href="#" className="w-9 h-9 flex items-center justify-center font-bold text-xs bg-[#005b5c] rounded-full hover:bg-[#c5982f] hover:text-[#003f40] transition-colors">IN</a>
            <a href="#" className="w-9 h-9 flex items-center justify-center font-bold text-xs bg-[#005b5c] rounded-full hover:bg-[#c5982f] hover:text-[#003f40] transition-colors">YT</a>
            <a href="#" className="w-9 h-9 flex items-center justify-center font-bold text-xs bg-[#005b5c] rounded-full hover:bg-[#c5982f] hover:text-[#003f40] transition-colors">IG</a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-[#005b5c] flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans text-[#667573] relative z-10">
        <p>&copy; 2026 Shodh Sagar. All Rights Reserved.</p>
        <div className="flex gap-4">
          <a href="http://www.sysnano.com/" className="hover:text-white transition-colors">Hosted by SysNano Infotech</a>
          <span>|</span>
          <span>Version Yellow Loop 26.03.15</span>
        </div>
      </div>
    </footer>
  );
}

