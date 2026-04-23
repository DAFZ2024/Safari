'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormTab = 'summit' | 'calendar';

export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [activeTab, setActiveTab] = useState<FormTab>('summit');
  const [submitted, setSubmitted] = useState(false);
  const [calendarSubmitted, setCalendarSubmitted] = useState(false);

  const [summitForm, setSummitForm] = useState({
    firstName: '',
    email: '',
    experience: '',
    smsAlerts: false,
  });

  const [calendarEmail, setCalendarEmail] = useState('');

  // Prevent body scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Reset on close
      setTimeout(() => {
        setSubmitted(false);
        setCalendarSubmitted(false);
      }, 300);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSummitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submit handler — connect to backend/email service here
    setSubmitted(true);
  };

  const handleCalendarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submit handler — connect to backend/email service here
    setCalendarSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay bg-black/70"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-content relative w-full max-w-lg bg-canopy border border-khaki/20 rounded-2xl overflow-hidden shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-khaki/10 flex items-center justify-center text-khaki/60 hover:text-coral hover:bg-coral/10 transition-all z-10"
          aria-label="Close modal"
        >
          <Icon name="XMarkIcon" size={16} variant="outline" />
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-khaki/10">
          <p className="mono-label text-coral mb-2">Virtual Summit 2026</p>
          <h2 className="text-2xl font-bold text-khaki tracking-tight leading-tight">
            Tanzania Planning Summit
          </h2>
          <p className="text-sm text-khaki/50 mt-1 font-mono">March 14–16, 2026 · East Africa Time</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-khaki/10">
          <button
            onClick={() => setActiveTab('summit')}
            className={`flex-1 py-3 text-sm font-semibold transition-all duration-300 ${
              activeTab === 'summit' ?'text-coral border-b-2 border-coral bg-coral/5' :'text-khaki/50 hover:text-khaki'
            }`}
          >
            Reserve a Seat
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex-1 py-3 text-sm font-semibold transition-all duration-300 ${
              activeTab === 'calendar' ?'text-coral border-b-2 border-coral bg-coral/5' :'text-khaki/50 hover:text-khaki'
            }`}
          >
            Free Migration Calendar
          </button>
        </div>

        {/* Summit Form */}
        {activeTab === 'summit' && (
          <div className="px-8 py-6">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-coral/20 flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckIcon" size={32} variant="outline" className="text-coral" />
                </div>
                <h3 className="text-xl font-bold text-khaki mb-2">Basecamp Reserved.</h3>
                <p className="text-khaki/60 text-sm leading-relaxed">
                  Your seat is confirmed. Check your inbox for the summit link and pre-event route-building worksheet.
                </p>
                <p className="mono-label text-coral/70 mt-4">March 14 · 08:00 EAT</p>
              </div>
            ) : (
              <form onSubmit={handleSummitSubmit} className="space-y-4">
                <div>
                  <label className="mono-label text-khaki/50 block mb-2">First Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Amara"
                    value={summitForm.firstName}
                    onChange={(e) => setSummitForm({ ...summitForm, firstName: e.target.value })}
                    className="safari-input w-full px-4 py-3 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="mono-label text-khaki/50 block mb-2">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="you@adventure.com"
                    value={summitForm.email}
                    onChange={(e) => setSummitForm({ ...summitForm, email: e.target.value })}
                    className="safari-input w-full px-4 py-3 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="mono-label text-khaki/50 block mb-2">Experience Level</label>
                  <select
                    required
                    value={summitForm.experience}
                    onChange={(e) => setSummitForm({ ...summitForm, experience: e.target.value })}
                    className="safari-input safari-select w-full px-4 py-3 rounded-lg text-sm"
                  >
                    <option value="">Select your level</option>
                    <option value="first-safari">First Safari — I&apos;m just starting to plan</option>
                    <option value="returning">Returning Traveler — I&apos;ve been before</option>
                    <option value="resident">Resident / Overlander — I live this</option>
                  </select>
                </div>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      checked={summitForm.smsAlerts}
                      onChange={(e) => setSummitForm({ ...summitForm, smsAlerts: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 rounded border border-khaki/30 bg-transparent peer-checked:bg-coral peer-checked:border-coral transition-all flex items-center justify-center">
                      {summitForm.smsAlerts && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="#0F1A12" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-khaki/50 leading-relaxed group-hover:text-khaki/70 transition-colors">
                    Send me SMS route alerts — dry-season openings, migration windows, and road condition updates.
                  </span>
                </label>

                <button
                  type="submit"
                  className="cta-coral w-full py-4 rounded-full text-sm font-bold mt-2"
                >
                  Reserve Your Seat at Basecamp
                </button>
                <p className="text-center text-xs text-khaki/30 mono-label">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        )}

        {/* Calendar Form */}
        {activeTab === 'calendar' && (
          <div className="px-8 py-6">
            {calendarSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-moss/30 flex items-center justify-center mx-auto mb-4">
                  <Icon name="DocumentArrowDownIcon" size={32} variant="outline" className="text-moss" />
                </div>
                <h3 className="text-xl font-bold text-khaki mb-2">Calendar Incoming.</h3>
                <p className="text-khaki/60 text-sm leading-relaxed">
                  Check your inbox for the 2026 Great Migration Timing Calendar — 12 months of optimal windows, dry-season dates, and Serengeti circuit coordinates.
                </p>
              </div>
            ) : (
              <div>
                <div className="float-animation bg-canopy border border-khaki/15 rounded-xl p-5 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-coral/20 flex items-center justify-center flex-shrink-0">
                      <Icon name="CalendarDaysIcon" size={24} variant="outline" className="text-coral" />
                    </div>
                    <div>
                      <p className="font-bold text-khaki text-sm">2026 Great Migration Calendar</p>
                      <p className="text-xs text-khaki/50 mt-1 leading-relaxed">
                        12-month migration timing guide with dry-season windows, river crossing dates, and Serengeti circuit coordinates. Built with data from 8 resident guides.
                      </p>
                      <p className="mono-label text-coral mt-2">Free Download · PDF</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleCalendarSubmit} className="space-y-4">
                  <div>
                    <label className="mono-label text-khaki/50 block mb-2">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="you@adventure.com"
                      value={calendarEmail}
                      onChange={(e) => setCalendarEmail(e.target.value)}
                      className="safari-input w-full px-4 py-3 rounded-lg text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full text-sm font-bold bg-moss text-sand hover:bg-moss/80 transition-all duration-300"
                  >
                    Send Me the Migration Calendar
                  </button>
                  <p className="text-center text-xs text-khaki/30 mono-label">
                    One email. Your calendar. Done.
                  </p>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}