import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Dumbbell, 
  Heart, 
  Timer, 
  Zap, 
  LayoutDashboard, 
  User, 
  Settings,
  ChevronRight,
  Flame,
  Target,
  TrendingUp
} from 'lucide-react';
import { generateGymImage } from './services/geminiService';
import { cn } from './lib/utils';

const GYM_PROMPT = `A futuristic 3D modern gym interior designed for a fitness mobile app interface. The space features sleek architectural lines, matte black steel structures, and polished concrete floors reflecting soft ambient lighting. High-end workout equipment such as treadmills, squat racks, dumbbell stations, and cable machines are arranged in a spacious, organized layout. Large floor-to-ceiling glass windows allow natural light to mix with subtle neon accent lighting in electric blue and crimson red, creating a premium athletic atmosphere. LED strip lights run along the ceiling and floor edges, giving the gym a cinematic glow. Digital fitness displays and holographic workout metrics float subtly in the air, suggesting a smart, AI-powered training environment. Realistic materials, soft shadows, and detailed textures such as rubber flooring, brushed metal, and carbon fiber equipment. Wide-angle cinematic perspective slightly above eye level. Style: ultra-detailed 3D render, modern tech aesthetic, minimalistic but powerful. Lighting: dramatic volumetric lighting with soft fog diffusion. Mood: energetic, futuristic, motivating, premium.`;

export default function App() {
  const [gymImage, setGymImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    async function loadImage() {
      const img = await generateGymImage(GYM_PROMPT);
      setGymImage(img);
      setIsLoading(false);
    }
    loadImage();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-neon-blue/30 overflow-hidden flex flex-col">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black"
            >
              <div className="flex flex-col items-center gap-4">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="w-12 h-12 text-neon-blue" />
                </motion.div>
                <p className="text-sm font-display tracking-widest uppercase opacity-50">Initializing Aura OS...</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              {gymImage ? (
                <img 
                  src={gymImage} 
                  alt="Futuristic Gym" 
                  className="w-full h-full object-cover opacity-60"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-black" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main UI Layer */}
      <main className="relative z-10 flex-1 flex flex-col p-6 max-w-md mx-auto w-full">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 pt-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-neon-blue/20 flex items-center justify-center border border-neon-blue/30 neon-glow-blue">
              <Activity className="w-5 h-5 text-neon-blue" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold tracking-tight text-white">AURA</h1>
              <p className="text-[10px] uppercase tracking-widest opacity-50 font-mono">Elite Performance</p>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors">
            <User className="w-5 h-5" />
          </button>
        </header>

        {/* Hero Section / Stats */}
        <section className="mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-3xl p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Flame className="w-24 h-24 text-neon-red" />
            </div>
            
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-[0.2em] text-neon-blue font-bold mb-2 block">Daily Progress</span>
              <div className="flex items-baseline gap-2 mb-1">
                <h2 className="text-5xl font-display font-bold">2,480</h2>
                <span className="text-lg opacity-50">kcal</span>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 1, delay: 1 }}
                    className="h-full bg-gradient-to-r from-neon-blue to-neon-red"
                  />
                </div>
                <span className="text-xs font-mono opacity-70">75%</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Quick Actions / Grid */}
        <section className="grid grid-cols-2 gap-4 mb-8">
          {[
            { icon: Dumbbell, label: 'Strength', value: '45 min', color: 'neon-blue' },
            { icon: Heart, label: 'Cardio', value: '20 min', color: 'neon-red' },
            { icon: Timer, label: 'Recovery', value: '15 min', color: 'white' },
            { icon: Target, label: 'Goals', value: '3/5', color: 'neon-blue' }
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + (i * 0.1) }}
              whileHover={{ scale: 1.02 }}
              className="glass rounded-2xl p-4 flex flex-col gap-3 cursor-pointer group"
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center",
                item.color === 'neon-blue' ? "bg-neon-blue/20 text-neon-blue" : 
                item.color === 'neon-red' ? "bg-neon-red/20 text-neon-red" : "bg-white/10 text-white"
              )}>
                <item.icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider opacity-50">{item.label}</p>
                <p className="text-sm font-bold">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Live Training Card */}
        <section className="mb-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="glass rounded-3xl p-5 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-blue to-neon-red p-[1px]">
                  <div className="w-full h-full rounded-2xl bg-black flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-neon-red rounded-full border-2 border-black animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-sm">AI Smart Coach</h3>
                <p className="text-xs opacity-50">Next: High Intensity Interval Training</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </motion.div>
        </section>

        {/* Floating Holographic Metric (Simulated) */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/3 right-10 pointer-events-none hidden sm:block"
        >
          <div className="glass rounded-xl p-3 border-neon-blue/20 rotate-6">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-ping" />
              <span className="text-[8px] font-mono uppercase tracking-tighter">Heart Rate</span>
            </div>
            <div className="text-xl font-display font-bold text-neon-blue">142 <span className="text-[10px] opacity-50">BPM</span></div>
          </div>
        </motion.div>
      </main>

      {/* Bottom Navigation */}
      <nav className="relative z-20 glass border-t-0 rounded-t-[32px] px-8 py-6 pb-10">
        <div className="max-w-md mx-auto flex justify-between items-center">
          {[
            { id: 'dashboard', icon: LayoutDashboard },
            { id: 'workouts', icon: Dumbbell },
            { id: 'stats', icon: Activity },
            { id: 'settings', icon: Settings }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative p-2 transition-all duration-300",
                activeTab === tab.id ? "text-neon-blue scale-110" : "text-white/40 hover:text-white/60"
              )}
            >
              <tab.icon className="w-6 h-6" />
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-neon-blue shadow-[0_0_8px_rgba(0,242,255,0.8)]"
                />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
