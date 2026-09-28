import React from 'react';
import { Instagram, Heart } from 'lucide-react';

export const SocialGallery: React.FC = () => {
  const photos = [
    {
      url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=500&q=80',
      caption: 'ঐতিহ্যবাহী জামদানি কালেকশন #ShoukhinBazar',
      likes: 245,
    },
    {
      url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=500&q=80',
      caption: 'মাটির মৃৎশিল্পে শান্তির ছোঁয়া #HomeDecor',
      likes: 189,
    },
    {
      url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=500&q=80',
      caption: 'খাঁটি সুন্দরবনের প্রাকৃতিক মধু #Organic',
      likes: 312,
    },
    {
      url: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=500&q=80',
      caption: 'রয়েল পাঞ্জাবি কালেকশন #FestiveVibes',
      likes: 420,
    },
    {
      url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=500&q=80',
      caption: 'প্রিয়জনের জন্য স্পেশাল গিফট হ্যাম্পার #Gifting',
      likes: 178,
    },
    {
      url: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=500&q=80',
      caption: 'হাতে ফোঁড়ানো নকশী কাঁথা #HandmadeArt',
      likes: 290,
    },
  ];

  return (
    <section className="py-12 bg-[#FAFAF9] border-t border-slate-200/80 font-['Hind_Siliguri',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F3E36] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
            <Instagram className="w-3.5 h-3.5" />
            @shoukhinbazar
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            সোশ্যাল গ্যালারি ও গ্রাহক গল্প
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            ইনস্টাগ্রামে আমাদের ট্যাগ করুন #ShoukhinBazar হ্যাশট্যাগ দিয়ে
          </p>
        </div>

        {/* 6 Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {photos.map((item, i) => (
            <div
              key={i}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-200 shadow-xs"
            >
              <img
                src={item.url}
                alt={item.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 text-white">
                <div className="flex justify-end">
                  <Instagram className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <p className="text-[11px] font-medium line-clamp-2 leading-tight">
                    {item.caption}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-rose-300 mt-1">
                    <Heart className="w-3 h-3 fill-rose-400 text-rose-400" />
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
