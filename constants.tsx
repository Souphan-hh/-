import React from 'react';
import { Language, GearItem } from './types';

export const APP_NAME = "Ningbo Winter Trails";

export const TRANSLATIONS = {
  en: {
    appName: "Ningbo Winter Trails",
    subtitle: "Family Adventure Planner",
    planYourTrip: "Plan Your Trip",
    childAge: "Child's Age",
    difficulty: "Difficulty Level",
    hikingDuration: "Hiking Duration",
    findAdventure: "Find Adventure",
    findingRoutes: "Finding Routes...",
    years: "years",
    hrs: "hrs",
    difficultyLevels: {
      EASY: "Easy (Relaxed)",
      MODERATE: "Moderate (Active)",
      CHALLENGING: "Challenging (Experienced)"
    },
    routeStyle: "Route Style",
    routeStyles: {
      CLASSIC: "Classic Popular",
      HIDDEN_GEM: "Hidden Gems (VIP)"
    },
    heroTitle: "Discover Winter in Ningbo",
    heroDesc: "Find the perfect child-friendly hiking routes for this weekend. Experience crisp air, bamboo forests, and ancient trails with safety in mind.",
    consulting: "Consulting the Map...",
    consultingDesc: "Searching for the best real-time trail conditions and family-friendly spots near Ningbo.",
    error: "We encountered an issue connecting to the guide service. Please check your connection and try again.",
    winterExpedition: "Winter Expedition",
    yourAdventure: "Your Family Adventure",
    safetyCheck: "Winter Safety Check",
    safetyContent: "Always check the specific weather forecast for Ningbo's mountainous areas before departure. Temperatures drop significantly at higher altitudes. Ensure phones are fully charged as cold drains batteries faster.",
    verifiedSource: "Verified via Google Search",
    viewSource: "View Source",
    // Monetization
    upgradeToPro: "Upgrade to Pro",
    proFeature: "Pro Feature",
    unlockHidden: "Unlock exclusive hidden trails away from crowds.",
    subscribeTitle: "Go Premium",
    subscribeDesc: "Unlock the full experience for the best family adventures.",
    benefit1: "Access to 'Hidden Gem' secluded routes",
    benefit2: "Offline Maps Download (Coming Soon)",
    benefit3: "Ad-free Experience",
    price: "$4.99 / month",
    subscribeBtn: "Subscribe Now",
    restore: "Restore Purchase",
    gearShop: "Recommended Gear",
    buyNow: "Buy Now",
    proBadge: "PRO"
  },
  zh: {
    appName: "宁波冬季徒步指南",
    subtitle: "家庭户外探险规划",
    planYourTrip: "规划您的行程",
    childAge: "孩子年龄",
    difficulty: "难度等级",
    hikingDuration: "徒步时长",
    findAdventure: "寻找探险路线",
    findingRoutes: "正在规划路线...",
    years: "岁",
    hrs: "小时",
    difficultyLevels: {
      EASY: "轻松 (休闲)",
      MODERATE: "适中 (活力)",
      CHALLENGING: "挑战 (经验)"
    },
    routeStyle: "路线风格",
    routeStyles: {
      CLASSIC: "经典热门",
      HIDDEN_GEM: "隐秘小众 (VIP)"
    },
    heroTitle: "探索宁波的冬天",
    heroDesc: "为您寻找这个周末最适合亲子徒步的路线。在确保安全的前提下，体验清新的空气、竹海和古道。",
    consulting: "正在咨询地图...",
    consultingDesc: "正在搜索宁波附近最新的路况和适合家庭的景点。",
    error: "连接向导服务时遇到问题，请检查网络连接并重试。",
    winterExpedition: "冬季探险",
    yourAdventure: "您的家庭冒险计划",
    safetyCheck: "冬季安全提示",
    safetyContent: "出发前请务必查看宁波山区的具体天气预报。高海拔地区气温会显著降低。低温会导致电池耗电加快，请确保手机电量充足。",
    verifiedSource: "经 Google 搜索验证",
    viewSource: "查看来源",
    // Monetization
    upgradeToPro: "开通 VIP 会员",
    proFeature: "会员专属",
    unlockHidden: "解锁避开人流的隐秘绝美路线。",
    subscribeTitle: "升级为会员",
    subscribeDesc: "获取极致的户外体验，探索更多未知。",
    benefit1: "解锁“隐秘小众”绝美路线",
    benefit2: "离线地图下载功能 (即将上线)",
    benefit3: "免广告纯净体验",
    price: "¥18.00 / 月",
    subscribeBtn: "立即开通",
    restore: "恢复购买",
    gearShop: "精选冬季装备",
    buyNow: "去购买",
    proBadge: "VIP"
  }
};

export const RECOMMENDED_GEAR: GearItem[] = [
  {
    id: '1',
    name: 'Kids Thermal Fleece',
    price: '¥199',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=300&q=80',
    link: '#'
  },
  {
    id: '2',
    name: 'Pro Hiking Poles',
    price: '¥258',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=300&q=80',
    link: '#'
  },
  {
    id: '3',
    name: 'Warm Beanie',
    price: '¥89',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=300&q=80',
    link: '#'
  }
];

// Utility to format markdown text to JSX simply (without a heavy library)
export const SimpleMarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  if (!content) return null;

  const lines = content.split('\n');
  
  return (
    <div className="space-y-4 text-slate-700 leading-relaxed">
      {lines.map((line, index) => {
        // Headers
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-xl font-bold text-emerald-800 mt-6 mb-2">{line.replace('## ', '')}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-lg font-semibold text-slate-800 mt-4 mb-1">{line.replace('### ', '')}</h3>;
        }
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-2xl md:text-3xl font-bold text-emerald-900 mb-6 border-b border-emerald-100 pb-4">{line.replace('# ', '')}</h1>;
        }
        
        // List items
        if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
           const text = line.trim().substring(2);
           // Basic bold parsing
           const parts = text.split(/(\*\*.*?\*\*)/g);
           return (
             <li key={index} className="flex items-start ml-4 mb-1">
               <span className="mr-2 text-emerald-500">•</span>
               <span>
                 {parts.map((part, i) => 
                    part.startsWith('**') && part.endsWith('**') 
                    ? <strong key={i} className="text-slate-900">{part.slice(2, -2)}</strong> 
                    : part
                 )}
               </span>
             </li>
           );
        }

        // Bold key-value pairs lines
        if (line.includes('**')) {
           const parts = line.split(/(\*\*.*?\*\*)/g);
            return (
             <p key={index} className="mb-2">
               {parts.map((part, i) => 
                  part.startsWith('**') && part.endsWith('**') 
                  ? <strong key={i} className="text-slate-900">{part.slice(2, -2)}</strong> 
                  : part
               )}
             </p>
           );
        }

        // Empty lines
        if (line.trim() === '') {
          return <div key={index} className="h-2"></div>;
        }

        return <p key={index}>{line}</p>;
      })}
    </div>
  );
};