import { Copy, Check, Gift, HandCoins } from 'lucide-react';
import { useState } from 'react';
import Reveal from './Reveal';

const methods = [
  {
    name: 'Orange Money',
    number: '+237 694 48 87 80',
    raw: '694488780',
    holder: 'Josue DOUMBE KOOH',
    logo: '/image copy.png',
    bg: 'from-orange-50 to-orange-100/50',
    border: 'border-orange-200',
  },
  {
    name: 'MTN Mobile Money',
    number: '+237 671 70 43 06',
    raw: '671704306',
    holder: 'Lysette Yanne Sharonne MANDJOULA',
    logo: '/117a6463-ff0e-4d4d-9de8-1242d862a961.png',
    bg: 'from-yellow-50 to-yellow-100/50',
    border: 'border-yellow-200',
  },
];

export default function DonationsSection() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (value: string) => {
    navigator.clipboard?.writeText(value).then(() => {
      setCopied(value);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <section
      id="dons"
      className="py-24 px-4"
      style={{ background: 'linear-gradient(160deg, #f0f7f7 0%, #e8f4f0 100%)' }}
    >
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 text-leaf-500 font-semibold text-sm uppercase tracking-widest">
            <Gift size={14} />
            Soutenez notre action
          </span>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold text-brand-500">
            Faire un don
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 bg-leaf-500 rounded-full"></div>
          <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-lg">
            Votre soutien nous permet de poursuivre nos actions sur le terrain auprès des
            communautés vulnérables de l'Extrême-Nord du Cameroun. Chaque contribution compte.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-6">
          {methods.map((m, index) => (
            <Reveal key={m.name} delay={index * 120}>
              <div
                className={`bg-gradient-to-br ${m.bg} rounded-3xl p-7 border ${m.border} flex flex-col gap-4 h-full hover:-translate-y-1 hover:shadow-xl transition-all duration-300`}
              >
              <div className="flex items-center gap-4">
                <div className="w-20 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center overflow-hidden p-1.5 flex-shrink-0">
                  <img
                    src={m.logo}
                    alt={m.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-brand-500">{m.name}</h3>
                  <p className="text-xs text-gray-500">Mobile Money</p>
                </div>
              </div>

              <div className="bg-white/70 rounded-2xl p-4 space-y-3">
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">
                    Numéro
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-gray-800 text-lg">{m.number}</span>
                    <button
                      onClick={() => copy(m.raw)}
                      className="p-2 rounded-lg text-gray-400 hover:text-brand-500 hover:bg-brand-500/5 transition-colors"
                      title="Copier le numéro"
                    >
                      {copied === m.raw ? (
                        <Check size={16} className="text-leaf-500" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">
                    Au nom de
                  </p>
                  <p className="text-sm font-medium text-gray-700">{m.holder}</p>
                </div>
              </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 flex items-center justify-center gap-2 text-center text-sm text-gray-500 max-w-xl mx-auto">
          <HandCoins size={16} className="text-leaf-500 flex-shrink-0" />
          Merci pour votre générosité. Vos dons alimentent directement nos programmes
          humanitaires et de développement.
        </p>
      </div>
    </section>
  );
}
