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
  BookOpen,
  Zap,
  Linkedin,
  Facebook,
  Sparkles,
  ArrowRight,
  ArrowUp,
  FileCheck2,
} from 'lucide-react';
import { AuthProvider } from './context/AuthContext';
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

const values = [
  { icon: Heart, label: 'Dignité humaine' },
  { icon: HandHeart, label: 'Solidarité active' },
  { icon: Users, label: 'Participation communautaire' },
  { icon: Shield, label: 'Inclusion et équité' },
  { icon: Star, label: 'Transparence et redevabilité' },
  { icon: Zap, label: 'Innovation sociale' },
  { icon: Globe, label: 'Responsabilité locale' },
  { icon: Leaf, label: 'Cohésion sociale' },
];

const actions = [
  {
    icon: BookOpen,
    title: 'Formation',
    description:
      'Renforcement des compétences des communautés et des acteurs locaux pour une autonomie durable.',
  },
  {
    icon: Zap,
    title: 'Autonomisation économique',
    description:
      "Appui aux initiatives génératrices de revenus, notamment pour les jeunes et les femmes.",
  },
  {
    icon: Users,
    title: 'Renforcement des capacités',
    description:
      "Accompagnement des structures communautaires pour améliorer leur efficacité et leur impact.",
  },
  {
    icon: Heart,
    title: 'Résilience communautaire',
    description:
      'Mise en place de mécanismes locaux pour faire face aux crises humanitaires et climatiques.',
  },
];

const heroStats = [
  { icon: Target, value: '4', label: "axes d'intervention" },
  { icon: HandHeart, value: '8', label: 'valeurs fondamentales' },
  { icon: Users, value: '6', label: 'groupes bénéficiaires' },
];

const beneficiaries = [
  { label: 'Jeunes', icon: Users },
  { label: 'Femmes', icon: HeartHandshake },
  { label: 'Personnes déplacées internes', icon: Home },
  { label: 'Réfugiés', icon: Globe2 },
  { label: 'Populations hôtes', icon: Handshake },
  { label: 'Groupes marginalisés', icon: ShieldCheck },
];

const navLinks: [string, string][] = [
  ['À propos', 'about'],
  ['Vision & Mission', 'vision'],
  ['Nos actions', 'actions'],
  ['Valeurs', 'values'],
  ['Évènements', 'events'],
  ['Dons', 'dons'],
  ['Contact', 'contact'],
];

export default function App() {
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

            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
              {navLinks.map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="relative group py-1 hover:text-brand-500 transition-colors duration-200"
                >
                  {label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-leaf-500 rounded-full group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollTo('contact')}
              className="hidden md:inline-flex items-center gap-1.5 bg-brand-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/25 transition-all duration-200"
            >
              Nous rejoindre
              <ArrowRight size={15} />
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-brand-500"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-3 text-sm font-medium text-gray-700 shadow-lg">
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
                Nous rejoindre
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
              Au service de l'humanité
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-500 leading-tight mb-6">
              Association
              <br />
              <span className="text-leaf-500">HUMAN-DEV</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10">
              Une association humanitaire et de développement au service des communautés vulnérables
              de l'Extrême-Nord du Cameroun.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
              <button
                onClick={() => scrollTo('about')}
                className="inline-flex items-center justify-center gap-2 bg-brand-500 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-brand-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Découvrir notre mission
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="border-2 border-brand-500 text-brand-500 font-semibold px-8 py-3.5 rounded-full hover:bg-brand-500/8 transition-all duration-200"
              >
                Nous contacter
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {heroStats.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 bg-white/70 backdrop-blur border border-white shadow-sm rounded-2xl px-5 py-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={17} className="text-brand-500" />
                  </div>
                  <div className="text-left">
                    <p className="font-display font-bold text-brand-500 text-lg leading-none">
                      {value}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{label}</p>
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
                Qui sommes-nous
              </span>
              <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold text-brand-500">
                Présentation de l'organisation
              </h2>
              <div className="mt-4 mx-auto w-16 h-1 bg-leaf-500 rounded-full"></div>
            </Reveal>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <Reveal className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>
                  <strong className="text-brand-500">HUMAN-DEV</strong> est une association
                  humanitaire et de développement intervenant principalement dans la région de
                  l'Extrême-Nord du Cameroun. Elle agit en faveur des communautés vulnérables,
                  notamment les jeunes, les femmes, les personnes déplacées internes, les réfugiés,
                  les populations hôtes et les groupes marginalisés vivant dans des contextes de
                  crise ou de fragilité.
                </p>
                <p>
                  L'association inscrit son intervention à l'intersection de l'urgence humanitaire,
                  du développement communautaire, de l'autonomisation économique et du renforcement
                  de la résilience locale. Elle ambitionne de promouvoir des solutions pratiques,
                  durables et adaptées aux besoins des populations, tout en renforçant les capacités
                  des acteurs communautaires et des structures locales.
                </p>

                <div className="flex items-start gap-3 bg-brand-50 border-l-4 border-brand-500 rounded-r-xl p-5">
                  <FileCheck2 size={20} className="text-brand-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-brand-500 mb-1">Récépissé officiel</p>
                    <p className="text-sm text-gray-500">
                      N°028/2026/RDA/K22/SAAJP du 11 Mars 2026
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={150} className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Siège social', value: 'Maroua', icon: MapPin },
                  { label: 'Région', value: 'Extrême-Nord, Cameroun', icon: Globe },
                  { label: 'Bénéficiaires', value: 'Communautés vulnérables', icon: Users },
                  { label: 'Approche', value: 'Humanitaire & Développement', icon: Heart },
                ].map(({ label, value, icon: Icon }) => (
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
                ))}
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
                Nos engagements
              </span>
              <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold text-white">
                Vision & Mission
              </h2>
              <div className="mt-4 mx-auto w-16 h-1 bg-leaf-500 rounded-full"></div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8">
              <Reveal className="bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-leaf-500/30 flex items-center justify-center">
                    <Eye size={22} className="text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">Notre Vision</h3>
                </div>
                <p className="text-white/85 leading-relaxed text-lg">
                  Construire un monde dans lequel chaque communauté vulnérable dispose des capacités,
                  des ressources et des opportunités nécessaires pour devenir actrice de son propre
                  développement.
                </p>
              </Reveal>

              <Reveal delay={150} className="bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-leaf-500/30 flex items-center justify-center">
                    <Target size={22} className="text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">Notre Mission</h3>
                </div>
                <p className="text-white/85 leading-relaxed text-lg">
                  Proposer des solutions durables, inclusives et contextualisées face aux urgences
                  humanitaires et aux défis du développement, à travers la formation,
                  l'autonomisation économique, le renforcement des capacités locales et la résilience
                  communautaire.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section id="actions" className="py-24 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-16">
              <span className="text-leaf-500 font-semibold text-sm uppercase tracking-widest">
                Ce que nous faisons
              </span>
              <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold text-brand-500">
                Nos domaines d'action
              </h2>
              <div className="mt-4 mx-auto w-16 h-1 bg-leaf-500 rounded-full"></div>
              <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-lg">
                HUMAN-DEV intervient à l'intersection de l'urgence humanitaire et du développement
                durable à travers quatre axes complémentaires.
              </p>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {actions.map(({ icon: Icon, title, description }, index) => (
                <Reveal key={title} delay={index * 100}>
                  <div className="group relative bg-sand-50 hover:bg-brand-500 rounded-3xl p-7 h-full transition-all duration-300 cursor-default hover:-translate-y-1 hover:shadow-xl overflow-hidden">
                    <span className="absolute top-5 right-6 font-display text-4xl font-extrabold text-brand-500/10 group-hover:text-white/15 transition-colors duration-300">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="relative w-12 h-12 rounded-2xl bg-brand-500/10 group-hover:bg-white/20 flex items-center justify-center mb-5 transition-colors duration-300">
                      <Icon
                        size={22}
                        className="text-brand-500 group-hover:text-white transition-colors duration-300"
                      />
                    </div>
                    <h3 className="relative font-bold text-lg text-brand-500 group-hover:text-white mb-3 transition-colors duration-300">
                      {title}
                    </h3>
                    <p className="relative text-gray-500 group-hover:text-white/80 text-sm leading-relaxed transition-colors duration-300">
                      {description}
                    </p>
                  </div>
                </Reveal>
              ))}
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
                Ce qui nous guide
              </span>
              <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold text-brand-500">
                Valeurs fondamentales
              </h2>
              <div className="mt-4 mx-auto w-16 h-1 bg-leaf-500 rounded-full"></div>
              <p className="mt-6 text-gray-500 max-w-xl mx-auto text-lg">
                L'action de HUMAN-DEV repose sur des valeurs fortes qui guident chacune de nos
                interventions.
              </p>
            </Reveal>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {values.map(({ icon: Icon, label }, index) => (
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
              ))}
            </div>
          </div>
        </section>

        {/* Beneficiaries */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-10">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-500">
                Nos bénéficiaires
              </h2>
              <p className="mt-3 text-gray-500">
                Nous intervenons auprès des populations les plus vulnérables.
              </p>
            </Reveal>
            <Reveal className="flex flex-wrap justify-center gap-3">
              {beneficiaries.map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 bg-brand-50 border border-brand-500/20 text-brand-500 font-medium text-sm px-5 py-2.5 rounded-full hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-colors duration-200"
                >
                  <Icon size={15} />
                  {label}
                </span>
              ))}
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
                  <p className="text-xs">Au service de l'humanité</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed">
                Association humanitaire et de développement basée à Maroua, au service des
                communautés vulnérables de l'Extrême-Nord du Cameroun.
              </p>
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
              <p className="text-white font-semibold text-sm mb-4">Navigation</p>
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
              <p className="text-white font-semibold text-sm mb-4">Informations légales</p>
              <p className="text-sm leading-relaxed">
                Récépissé N°028/2026/RDA/K22/SAAJP
                <br />
                Siège social : Maroua, Cameroun
              </p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs">
            <p>&copy; {new Date().getFullYear()} HUMAN-DEV. Tous droits réservés.</p>
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
