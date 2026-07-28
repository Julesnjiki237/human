import { useState } from 'react';
import { Loader2, Lock, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function AdminLogin() {
  const { session, signIn, signOut } = useAuth();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await signIn(email.trim(), password);
    setLoading(false);
    if (error) {
      setError(t.admin.error);
    } else {
      setOpen(false);
      setEmail('');
      setPassword('');
    }
  };

  if (session) {
    return (
      <button
        onClick={() => signOut()}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-red-500 transition-colors"
        title={t.admin.logoutTitle}
      >
        <Lock size={12} />
        {t.admin.logout}
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-brand-500 transition-colors"
        title={t.admin.adminBtnTitle}
      >
        <Lock size={12} />
        {t.admin.adminBtn}
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="font-bold text-lg text-brand-500">{t.admin.modalTitle}</h3>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t.admin.email}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                  placeholder="admin@human-dev.org"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t.admin.password}
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                  placeholder="••••••••"
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-500 text-white font-semibold py-2.5 rounded-full hover:bg-brand-600 disabled:opacity-60"
              >
                {loading && <Loader2 size={16} className="animate-spin" />}
                {t.admin.submit}
              </button>
              <p className="text-xs text-gray-400 text-center pt-1">{t.admin.restricted}</p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
