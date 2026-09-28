import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2 
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const { siteConfig, showToast } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSent(true);
    showToast('বার্তা পাঠানো হয়েছে!', 'আমাদের কাস্টমার কেয়ার টিম দ্রুত আপনার সাথে যোগাযোগ করবে।', 'success');
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="py-10 sm:py-16 bg-[#FAFAF9] font-['Hind_Siliguri',sans-serif] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#0F3E36] tracking-wider uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
            যোগাযোগ ও কাস্টমার কেয়ার
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            আমরা আপনার সেবায় সবসময় প্রস্তুত
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            যেকোনো প্রশ্ন, পণ্যের তথ্য বা সাপোর্টের জন্য আমাদের সাথে নির্দ্বিধায় যোগাযোগ করুন।
          </p>
        </div>

        {/* Contact Info + Message Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Info Card (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              যোগাযোগের মাধ্যম
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-emerald-50 text-[#0F3E36] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">অফিস ও শোরুমের ঠিকানা</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{siteConfig.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-emerald-50 text-[#0F3E36] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">হটলাইন নম্বর</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{siteConfig.hotline}</p>
                  <span className="text-[11px] text-emerald-700 font-semibold block">সকাল ৯টা - রাত ১০টা পর্যন্ত</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-emerald-50 text-[#0F3E36] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">ইমেইল ঠিকানা</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{siteConfig.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-emerald-50 text-[#0F3E36] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">কাস্টমার সাপোর্ট সময়সূচি</h4>
                  <p className="text-xs text-slate-600 mt-0.5">সপ্তাহের ৭ দিনই (শনি - শুক্র)</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Button */}
            <div className="pt-4 border-t border-slate-100">
              <a
                href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                সরাসরি হোয়াটসঅ্যাপে চ্যাট করুন
              </a>
            </div>
          </div>

          {/* Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              আমাদের বার্তা পাঠান
            </h2>

            {isSent ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-emerald-900">
                  বার্তাটি সফলভাবে পৌঁছেছে!
                </h3>
                <p className="text-xs text-slate-600">
                  আমাদের সাপোর্ট টিম অতি দ্রুত আপনার সাথে যোগাযোগ করবে। ধন্যবাদ।
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="px-4 py-2 bg-[#0F3E36] text-white rounded-xl text-xs font-bold"
                >
                  আরেকটি বার্তা পাঠান
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      আপনার পুরো নাম *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="নাম লিখুন"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0F3E36]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      মোবাইল নম্বর *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0F3E36]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ইমেইল ঠিকানা (ঐচ্ছিক)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@mail.com"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0F3E36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    আপনার বার্তা বা অনুসন্ধানের বিবরণ *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="এখানে আপনার প্রশ্ন বা বার্তা বিস্তারিত লিখুন..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0F3E36]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#0F3E36] hover:bg-[#0c2f29] text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  বার্তা পাঠিয়ে দিন
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
