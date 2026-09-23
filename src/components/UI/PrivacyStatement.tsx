"use client";

import React, { useState } from "react";
import { ChevronDown, Shield } from "lucide-react";

export default function PrivacyStatement() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative w-full max-w-4xl mx-auto px-6 mb-32 z-10">
      <div className="bg-[#f5f5f7] border border-[#d2d2d7]/50 rounded-2xl overflow-hidden transition-all duration-300">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-6 text-left hover:bg-[#e5e5ea]/50 transition-colors focus:outline-none"
        >
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#86868b]" />
            <h3 className="text-[#1d1d1f] font-sans font-medium text-lg">Privacy Statement</h3>
          </div>
          <ChevronDown 
            className={`w-5 h-5 text-[#86868b] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
          />
        </button>

        <div 
          className={`grid transition-all duration-300 ease-in-out ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="p-6 pt-0 border-t border-[#d2d2d7]/50 text-[#86868b] font-sans text-sm leading-relaxed space-y-4">
              <p>
                Shodh Sagar is committed to protecting the privacy of its contributors, readers, reviewers, and website visitors. We may collect personal details such as names, emails, affiliations, and contact information during manuscript submissions, registrations, or communications. This data is used to manage submissions, facilitate peer review, support editorial activities, and improve our services through internal analysis.
              </p>
              <p>
                We take reasonable measures, including secure databases and encryption, to prevent misuse, unauthorized access, or disclosure. Personal information is not shared with third parties except as necessary for publication processes or when required by law, and all partners are bound by strict data protection standards.
              </p>
              <p>
                Users have the right to access and correct their information by contacting us through our website. Our site may use cookies and analytics tools to enhance user experience, which can be managed through browser settings. External links on our site are not covered by this policy.
              </p>
              <p>
                By using our website and submitting information, individuals consent to the practices outlined here. Shodh Sagar may update this Privacy Statement periodically, and changes will be posted on our website.
              </p>
              <p className="text-[#1d1d1f] font-medium pt-2">
                Last modified: July 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
