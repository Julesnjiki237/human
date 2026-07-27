import { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Facebook,
  Send,
  Loader2,
  CheckCircle,
  MessageCircle,
} from 'lucide-react';
import Reveal from './Reveal';

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

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

const empty: FormState = { firstName: '', lastName: '', email: '', subject: '', message: '' };

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(empty);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.firstName || !form.lastName || !form.email || !form.message) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    setSubmitting(true);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          subject: form.subject
            ? `[HUMAN-DEV] ${form.subject}`
            : 'Nouveau message depuis le site HUMAN-DEV',
          from_name: `${form.firstName} ${form.lastName}`,
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          message: form.message,
        }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message ?? 'Échec de l\'envoi.');
      }
      setSent(true);
      setForm(empty);
    } catch {
      setError("L'envoi a échoué. Merci de réessayer ou de nous contacter directement par email.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    'w-full bg-sand-100 rounded-lg border border-transparent px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-brand-500/40 focus:ring-2 focus:ring-brand-500/10 transition';

  return (
    <section id="contact" className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Reveal className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 text-leaf-500 font-semibold text-sm uppercase tracking-widest">
            <MessageCircle size={14} />
            Restons connectés
          </span>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold text-brand-500">
            Contactez-nous
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 bg-leaf-500 rounded-full"></div>
          <p className="mt-6 text-gray-500 text-base max-w-xl mx-auto">
            Vous souhaitez en savoir plus sur nos activités, devenir partenaire ou bénévole ?
            <br />
            N'hésitez pas à nous contacter.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left — Coordinates */}
          <Reveal className="space-y-8">
            <h3 className="text-xl font-bold text-gray-800">Nos Coordonnées</h3>

            <div className="space-y-4">
              {/* Siege */}
              <div className="group flex items-start gap-4 bg-white rounded-2xl p-4 border border-gray-100 hover:border-brand-100 hover:shadow-md transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-500 transition-colors duration-300">
                  <MapPin size={18} className="text-brand-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Siège Social</p>
                  <p className="text-brand-500 text-sm mt-0.5">
                    Maroua, Région de l'Extrême-Nord, Cameroun
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="group flex items-start gap-4 bg-white rounded-2xl p-4 border border-gray-100 hover:border-brand-100 hover:shadow-md transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-500 transition-colors duration-300">
                  <Phone size={18} className="text-brand-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Téléphone</p>
                  <p className="text-brand-500 text-sm mt-0.5">(+237) 694 488 780</p>
                  <p className="text-brand-500 text-sm">(+237) 698 064 271</p>
                </div>
              </div>

              {/* Email */}
              <div className="group flex items-start gap-4 bg-white rounded-2xl p-4 border border-gray-100 hover:border-brand-100 hover:shadow-md transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-500 transition-colors duration-300">
                  <Mail size={18} className="text-brand-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Email</p>
                  <a
                    href="mailto:humandevong25@gmail.com"
                    className="text-brand-500 text-sm hover:underline mt-0.5 block"
                  >
                    humandevong25@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <p className="font-bold text-gray-800 mb-3">Suivez-nous</p>
              <div className="flex items-center gap-3">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:border-brand-500 hover:text-brand-500 hover:bg-brand-50 transition-colors"
                  >
                    <Icon size={15} />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl bg-sand-100 p-8 flex flex-col items-center justify-center gap-3 min-h-[160px] border border-sand-200">
              <MapPin size={36} className="text-brand-500" strokeWidth={1.5} />
              <p className="font-bold text-brand-500 text-base">Maroua, Cameroun</p>
              <p className="text-sm text-gray-500">Région de l'Extrême-Nord</p>
            </div>
          </Reveal>

          {/* Right — Form */}
          <Reveal delay={150} className="bg-sand-50 rounded-3xl border border-gray-100 p-7 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Envoyez-nous un message</h3>

            {sent ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <CheckCircle size={48} className="text-leaf-500" />
                <p className="font-semibold text-gray-800 text-lg">Message envoyé !</p>
                <p className="text-sm text-gray-500 max-w-xs">
                  Merci pour votre message. Nous vous répondrons dans les meilleurs délais.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-2 text-sm text-brand-500 font-medium hover:underline"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Prénom
                    </label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={set('firstName')}
                      placeholder="Votre prénom"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom</label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={set('lastName')}
                      placeholder="Votre nom"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    placeholder="votre@email.com"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Sujet</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={set('subject')}
                    placeholder="Sujet de votre message"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={set('message')}
                    placeholder="Votre message..."
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-500 text-white font-semibold py-3 rounded-xl hover:bg-brand-600 disabled:opacity-60 transition-colors"
                >
                  {submitting ? (
                    <Loader2 size={17} className="animate-spin" />
                  ) : (
                    <Send size={17} />
                  )}
                  Envoyer le message
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
