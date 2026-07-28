import { useEffect, useState } from 'react';
import {
  Heart,
  Users,
  Globe,
  Globe2,
  Leaf,
  Shield,
  ShieldCheck,
  MapPin,
  ChevronDown,
  Menu,
  X,
  Target,
  Eye,
  Star,
  HandHeart,
  HeartHandshake,
  Handshake,
  Home,
  Zap,
  Linkedin,
  Facebook,
  Sparkles,
  ArrowRight,
  ArrowUp,
  FileCheck2,
  GraduationCap,
  TrendingUp,
  CheckCircle2,
  Languages,
} from 'lucide-react';
import { AuthProvider } from './context/AuthContext';
import { useLanguage } from './context/LanguageContext';
import EventsSection from './components/EventsSection';
import DonationsSection from './components/DonationsSection';
import AdminLogin from './components/AdminLogin';
import ContactSection from './components/ContactSection';
import Reveal from './components/Reveal';

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/human-dev-ong/',
    Icon: Linkedin,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61572016490616',
    Icon: Facebook,
  },
];

const navIds = ['about', 'vision', 'actions', 'zones', 'values', 'events', 'dons', 'contact'];

const valuesIcons = [Heart, HandHeart, Users, Shield, Star, Zap, Globe, Leaf];

const axisTheme = {
  leaf: {
    badge: 'bg-leaf-500',
    iconBg: 'bg-leaf-500/10',
    iconText: 'text-leaf-600',
    accent: 'text-leaf-600',
    border: 'border-leaf-500/40',
    check: 'text-leaf-500',
  },
  blue: {
    badge: 'bg-blue-500',
    iconBg: 'bg-blue-500/10',
    iconText: 'text-blue-600',
    accent: 'text-blue-600',
    border: 'border-blue-500/40',
    check: 'text-blue-500',
  },
  purple: {
    badge: 'bg-purple-500',
    iconBg: 'bg-purple-500/10',
    iconText: 'text-purple-600',
    accent: 'text-purple-600',
    border: 'border-purple-500/40',
    check: 'text-purple-500',
  },
  orange: {
    badge: 'bg-orange-500',
    iconBg: 'bg-orange-500/10',
    iconText: 'text-orange-600',
    accent: 'text-orange-600',
    border: 'border-orange-500/40',
    check: 'text-orange-500',
  },
} as const;

const axesMeta: { icon: typeof GraduationCap; color: keyof typeof axisTheme }[] = [
  { icon: GraduationCap, color: 'leaf' },
  { icon: Users, color: 'blue' },
  { icon: HandHeart, color: 'purple' },
  { icon: TrendingUp, color: 'orange' },
];

const zoneNumbers = [1, 2, 3, 4, 5];

const engagementIcons = [HandHeart, Handshake, Leaf];

const heroStatsMeta = [
  { icon: Target, value: '4' },
  { icon: HandHeart, value: '8' },
  { icon: Users, value: '6' },
];

const beneficiariesIcons = [Users, HeartHandshake, Home, Globe2, Handshake, ShieldCheck];

const aboutCardsIcons = [MapPin, Globe, Users, Heart];

export default function App() {
  const { lang, toggleLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const navLinks = navIds.map((id, index) => [t.nav.links[index], id] as [string, string]);

  const LangToggle = ({ compact = false }: { compact?: boolean }) => (
    <button
      onClick={toggleLang}
      aria-label="Changer de langue / Switch language"
      title={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
      className={`inline-flex items-center gap-1.5 rounded-full border border-brand-500/20 text-brand-500 font-semibold hover:bg-brand-500/8 transition-colors duration-200 ${
        compact ? 'px-3 py-1.5 text-xs' : 'px-3.5 py-1.5 text-xs'
      }`}
    >
      <Languages size={14} />
      {lang === 'fr' ? 'FR' : 'EN'}
    </button>
  );

  return (
    <AuthProvider>
      <div className="font-sans text-gray-800 bg-white">
        {/* Navigation */}
        <nav
          className={`fixed top-0 left-0 right-0 z-50 backdrop-blur transition-all duration-300 ${
            scrolled ? 'bg-white/95 shadow-md h-16' : 'bg-white/70 h-20'
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-full">
            <button onClick={() => scrollTo('hero')} className="flex items-center gap-2.5">
              <img src="/image.png" alt="Logo HUMAN-DEV" className="h-10 w-10 object-contain" />
              <span className="font-display font-bold text-brand-500 text-lg hidden sm:block">
                HUMAN-DEV
              </span>
            </button>

            <div className="hidden lg:flex items-center gap-5 text-sm font-medium text-gray-600">
              {navLinks.map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="relative group py-1 whitespace-nowrap hover:text-brand-500 transition-colors duration-200"
                >
                  {label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-leaf-500 rounded-full group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <LangToggle />
              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-1.5 bg-brand-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/25 transition-all duration-200"
              >
                {t.nav.cta}
                <ArrowRight size={15} />
              </button>
            </div>

            <div className="lg:hidden flex items-center gap-2">
              <LangToggle compact />
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-brand-500"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="lg:hidden bg-white border-t px-4 py-4 flex flex-col gap-3 text-sm font-medium text-gray-700 shadow-lg">
              {navLinks.map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-left hover:text-brand-500 transition-colors py-1.5"
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('contact')}
                className="mt-2 inline-flex items-center justify-center gap-1.5 bg-brand-500 text-white text-sm font-semibold px-4 py-2.5 rounded-full"
              >
                {t.nav.cta}
                <ArrowRight size={15} />
              </button>
            </div>
          )}
        </nav>

        {/* Hero */}
        <section
          id="hero"
          className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, #f0f7f7 0%, #e8f4f0 40%, #d6ecea 100%)',
          }}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-500/5 animate-float" />
            <div
              className="absolute bottom-10 -left-20 w-72 h-72 rounded-full bg-leaf-500/10 animate-float"
              style={{ animationDelay: '1.5s' }}
            />
            <div
              className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-leaf-500/10 animate-float"
              style={{ animationDelay: '3s' }}
            />
          </div>

          <div className="relative max-w-3xl mx-auto">
            <img
              src="/image.png"
              alt="Association HUMAN-DEV"
              className="mx-auto w-36 h-36 sm:w-48 sm:h-48 object-contain drop-shadow-xl mb-8 animate-float"
            />

            <div className="inline-flex items-center gap-1.5 bg-leaf-500/15 text-leaf-600 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              <Sparkles size={13} />
              {t.hero.badge}
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-500 leading-tight mb-6">
              {t.hero.title1}
              <br />
              <span className="text-leaf-500">{t.hero.title2}</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
              <button
                onClick={() => scrollTo('about')}
                className="inline-flex items-center justify-center gap-2 bg-brand-500 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-brand-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                {t.hero.ctaPrimary}
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="border-2 border-brand-500 text-brand-500 font-semibold px-8 py-3.5 rounded-full hover:bg-brand-500/8 transition-all duration-200"
              >
                {t.hero.ctaSecondary}
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {heroStatsMeta.map(({ icon: Icon, value }, index) => (
                <div
                  key={value}
                  className="flex items-center gap-3 bg-white/70 backdrop-blur border border-white shadow-sm rounded-2xl px-5 py-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={17} className="text-brand-500" />
                  </div>
                  <div className="text-left">
                    <p className="font-display font-bold text-brand-500 text-lg leading-none">
                      {value}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{t.hero.stats[index]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => scrollTo('about')}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-brand-500/60 animate-bounce"
          >
            <ChevronDown size={28} />
          </button>
        </section>

        {/* About */}
        <section id="about" className="py-24 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-16">
              <span className="text-leaf-500 font-semibold text-sm uppercase tracking-widest">
                {t.about.eyebrow}
              </span>
              <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold text-brand-500">
                {t.about.title}
              </h2>
              <div className="mt-4 mx-auto w-16 h-1 bg-leaf-500 rounded-full"></div>
            </Reveal>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <Reveal className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>
                  <strong className="text-brand-500">HUMAN-DEV</strong> {t.about.p1}
                </p>
                <p>{t.about.p2}</p>

                <div className="flex items-start gap-3 bg-brand-50 border-l-4 border-brand-500 rounded-r-xl p-5">
                  <FileCheck2 size={20} className="text-brand-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-brand-500 mb-1">
                      {t.about.receiptLabel}
                    </p>
                    <p className="text-sm text-gray-500">{t.about.receiptValue}</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={150} className="grid grid-cols-2 gap-4">
                {t.about.cards.map(({ label, value }, index) => {
                  const Icon = aboutCardsIcons[index];
                  return (
                    <div
                      key={label}
                      className="group bg-gradient-to-br from-brand-50 to-leaf-50 hover:from-brand-500 hover:to-brand-600 rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="w-10 h-10 rounded-xl bg-brand-500/10 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300">
                        <Icon size={18} className="text-brand-500 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 group-hover:text-white/70 font-medium uppercase tracking-wide transition-colors duration-300">
                          {label}
                        </p>
                        <p className="text-sm font-semibold text-gray-700 group-hover:text-white mt-0.5 transition-colors duration-300">
                          {value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </Reveal>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section
          id="vision"
          className="relative py-24 px-4 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1a6b72 0%, #1a8a72 100%)' }}
        >
          <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />

          <div className="relative max-w-6xl mx-auto">
            <Reveal className="text-center mb-16">
              <span className="text-leaf-100 font-semibold text-sm uppercase tracking-widest">
                {t.vision.eyebrow}
              </span>
              <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold text-white">
                {t.vision.title}
              </h2>
              <div className="mt-4 mx-auto w-16 h-1 bg-leaf-500 rounded-full"></div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8">
              <Reveal className="bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-leaf-500/30 flex items-center justify-center">
                    <Eye size={22} className="text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    {t.vision.visionTitle}
                  </h3>
                </div>
                <p className="text-white/85 leading-relaxed text-lg">{t.vision.visionText}</p>
              </Reveal>

              <Reveal delay={150} className="bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-leaf-500/30 flex items-center justify-center">
                    <Target size={22} className="text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    {t.vision.missionTitle}
                  </h3>
                </div>
                <p className="text-white/85 leading-relaxed text-lg">{t.vision.missionText}</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section id="actions" className="py-24 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-16">
              <span className="text-leaf-500 font-semibold text-sm uppercase tracking-widest">
                {t.actions.eyebrow}
              </span>
              <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold text-brand-500">
                {t.actions.title}
              </h2>
              <div className="mt-4 mx-auto w-16 h-1 bg-leaf-500 rounded-full"></div>
              <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-lg">{t.actions.subtitle}</p>
            </Reveal>

            <div className="space-y-6">
              {t.actions.axes.map(({ title, description, priorities }, index) => {
                const { icon: Icon, color } = axesMeta[index];
                const theme = axisTheme[color];
                return (
                  <Reveal key={title} delay={index * 100}>
                    <div
                      className={`bg-sand-50 rounded-3xl p-6 sm:p-8 border-l-4 ${theme.border} hover:shadow-xl transition-shadow duration-300`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                        <div className="flex sm:flex-col items-center gap-4 sm:w-32 flex-shrink-0">
                          <div
                            className={`w-12 h-12 rounded-2xl ${theme.badge} text-white flex items-center justify-center font-display font-bold text-base flex-shrink-0`}
                          >
                            {String(index + 1).padStart(2, '0')}
                          </div>
                          <div
                            className={`w-12 h-12 rounded-2xl ${theme.iconBg} flex items-center justify-center flex-shrink-0`}
                          >
                            <Icon size={22} className={theme.iconText} />
                          </div>
                        </div>
                        <div className="flex-1">
                          <span
                            className={`text-xs font-bold uppercase tracking-widest ${theme.accent}`}
                          >
                            {t.actions.axisLabel} {index + 1}
                          </span>
                          <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-500 mt-1 mb-2">
                            {title}
                          </h3>
                          <p className="text-gray-500 mb-5">{description}</p>
                          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                            {t.actions.prioritiesLabel}
                          </p>
                          <ul className="grid sm:grid-cols-2 gap-2.5">
                            {priorities.map((p) => (
                              <li key={p} className="flex items-start gap-2 text-sm text-gray-600">
                                <CheckCircle2
                                  size={15}
                                  className={`${theme.check} flex-shrink-0 mt-0.5`}
                                />
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Zones d'intervention */}
        <section
          id="zones"
          className="py-24 px-4"
          style={{ background: 'linear-gradient(160deg, #f7faf9 0%, #eef6f2 100%)' }}
        >
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-10">
              <span className="text-leaf-500 font-semibold text-sm uppercase tracking-widest">
                {t.zones.eyebrow}
              </span>
              <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold text-brand-500">
                {t.zones.title}
              </h2>
              <div className="mt-4 mx-auto w-16 h-1 bg-leaf-500 rounded-full"></div>
              <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-lg">{t.zones.subtitle}</p>
            </Reveal>

            <Reveal delay={100} className="flex flex-wrap items-center justify-center gap-3 mb-14">
              {t.zones.engagement.map(({ label, sub }, index) => {
                const Icon = engagementIcons[index];
                return (
                  <div
                    key={label}
                    className="flex items-center gap-3 bg-white shadow-sm border border-brand-500/10 rounded-2xl px-5 py-3"
                  >
                    <div className="w-9 h-9 rounded-xl bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-brand-500" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-700">{label}</p>
                      {sub && <p className="text-xs text-gray-400">{sub}</p>}
                    </div>
                  </div>
                );
              })}
            </Reveal>

            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
              <Reveal className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={16} className="text-brand-500" />
                  <p className="font-bold text-brand-500 uppercase tracking-wide text-xs">
                    {t.zones.priorityBadge}
                  </p>
                </div>
                <h3 className="font-display text-2xl font-bold text-brand-500 mb-1">
                  {t.zones.priorityTitle}
                </h3>
                <p className="text-gray-500 mb-6">
                  {t.zones.baseLabel} <strong className="text-gray-700">{t.zones.baseValue}</strong>
                </p>
                <div className="space-y-4">
                  {t.zones.list.map(({ name, description }, index) => (
                    <div key={name} className="flex gap-4 items-start">
                      <div className="w-9 h-9 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {zoneNumbers[index]}
                      </div>
                      <div>
                        <p className="font-bold text-gray-700">{name}</p>
                        <p className="text-sm text-gray-500">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={150} className="bg-brand-500 rounded-3xl p-6 sm:p-8 text-white flex flex-col">
                <p className="font-bold uppercase tracking-wide text-xs text-leaf-100 mb-2">
                  {t.zones.expansionBadge}
                </p>
                <p className="text-white/80 text-sm mb-6">{t.zones.expansionIntro}</p>
                <div className="space-y-4 flex-1">
                  {t.zones.expansionList.map(({ name, description }) => (
                    <div key={name} className="bg-white/10 rounded-2xl p-4">
                      <p className="font-semibold text-sm mb-1">{name}</p>
                      <p className="text-white/70 text-xs leading-relaxed">{description}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm text-white/90 italic border-t border-white/20 pt-4">
                  {t.zones.commitment}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Values */}
        <section
          id="values"
          className="py-24 px-4"
          style={{ background: 'linear-gradient(160deg, #f0f7f7 0%, #e8f4f0 100%)' }}
        >
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-16">
              <span className="text-leaf-500 font-semibold text-sm uppercase tracking-widest">
                {t.values.eyebrow}
              </span>
              <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold text-brand-500">
                {t.values.title}
              </h2>
              <div className="mt-4 mx-auto w-16 h-1 bg-leaf-500 rounded-full"></div>
              <p className="mt-6 text-gray-500 max-w-xl mx-auto text-lg">{t.values.subtitle}</p>
            </Reveal>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {t.values.items.map((label, index) => {
                const Icon = valuesIcons[index];
                return (
                  <Reveal key={label} delay={index * 60}>
                    <div className="group bg-white rounded-2xl p-6 flex flex-col items-center text-center gap-3 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                          index % 2 === 0 ? 'bg-brand-500/10' : 'bg-leaf-500/15'
                        }`}
                      >
                        <Icon
                          size={20}
                          className={index % 2 === 0 ? 'text-brand-500' : 'text-leaf-600'}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 leading-snug">
                        {label}
                      </span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Beneficiaries */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-10">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-500">
                {t.beneficiaries.title}
              </h2>
              <p className="mt-3 text-gray-500">{t.beneficiaries.subtitle}</p>
            </Reveal>
            <Reveal className="flex flex-wrap justify-center gap-3">
              {t.beneficiaries.items.map((label, index) => {
                const Icon = beneficiariesIcons[index];
                return (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 bg-brand-50 border border-brand-500/20 text-brand-500 font-medium text-sm px-5 py-2.5 rounded-full hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-colors duration-200"
                  >
                    <Icon size={15} />
                    {label}
                  </span>
                );
              })}
            </Reveal>
          </div>
        </section>

        <EventsSection />

        <DonationsSection />

        <ContactSection />

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-14 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/image.png" alt="HUMAN-DEV" className="h-10 w-10 object-contain opacity-90" />
                <div>
                  <p className="text-white font-bold text-sm">Association HUMAN-DEV</p>
                  <p className="text-xs">{t.footer.tagline}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed">{t.footer.description}</p>
              <div className="flex items-center gap-3 mt-5">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-500 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-white font-semibold text-sm mb-4">{t.footer.navTitle}</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {navLinks.map(([label, id]) => (
                  <button
                    key={id}
                    onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-left hover:text-white transition-colors"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-white font-semibold text-sm mb-4">{t.footer.legalTitle}</p>
              <p className="text-sm leading-relaxed">
                {t.footer.legalReceipt}
                <br />
                {t.footer.legalSiege}
              </p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs">
            <p>
              &copy; {new Date().getFullYear()} HUMAN-DEV. {t.footer.copyright}
            </p>
            <AdminLogin />
          </div>
        </footer>

        <BackToTop />
      </div>
    </AuthProvider>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Retour en haut"
      className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-brand-500 text-white shadow-lg flex items-center justify-center hover:bg-brand-600 hover:-translate-y-0.5 transition-all duration-200"
    >
      <ArrowUp size={18} />
    </button>
  );
}
