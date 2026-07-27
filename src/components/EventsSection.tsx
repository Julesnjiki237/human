import { useEffect, useState } from 'react';
import {
  Calendar,
  Camera,
  ChevronLeft,
  ChevronRight,
  ImageOff,
  Images,
  Loader2,
  Lock,
  Pencil,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import { supabase, type Event, type EventImage } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import Reveal from './Reveal';

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function sortedImages(event: Event): EventImage[] {
  return [...(event.event_images ?? [])].sort((a, b) => a.position - b.position);
}

export default function EventsSection() {
  const { session } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<Event | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('events')
      .select('*, event_images(*)')
      .order('event_date', { ascending: false });
    if (error) {
      setError('Impossible de charger les évènements.');
    } else {
      setEvents(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (event: Event) => {
    if (!confirm('Supprimer cet évènement ?')) return;
    setDeletingId(event.id);
    const paths = sortedImages(event).map((img) => img.image_path);
    if (paths.length > 0) {
      await supabase.storage.from('event-images').remove(paths);
    }
    const { error } = await supabase.from('events').delete().eq('id', event.id);
    setDeletingId(null);
    if (error) {
      alert('Erreur lors de la suppression.');
    } else {
      setEvents((prev) => prev.filter((e) => e.id !== event.id));
    }
  };

  const today = todayStr();
  const upcoming = events
    .filter((e) => e.event_date >= today)
    .sort((a, b) => a.event_date.localeCompare(b.event_date));
  const past = events
    .filter((e) => e.event_date < today)
    .sort((a, b) => b.event_date.localeCompare(a.event_date));

  const renderCard = (event: Event) => {
    const images = sortedImages(event);
    const cover = images[0];
    const extraCount = images.length - 1;

    return (
      <article
        key={event.id}
        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1 transition-all duration-300 border border-gray-100 hover:border-brand-100"
      >
        <button
          onClick={() => setLightbox(event)}
          className="relative block w-full aspect-[4/3] overflow-hidden bg-gray-100 cursor-zoom-in"
        >
          {cover ? (
            <img
              src={cover.image_url}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <ImageOff size={32} />
            </div>
          )}
          {extraCount > 0 && (
            <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-full">
              <Images size={12} />+{extraCount}
            </span>
          )}
        </button>
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
            <Calendar size={13} />
            {formatDate(event.event_date)}
          </div>
          <h3 className="font-bold text-lg text-brand-500 mb-2 line-clamp-2">{event.title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{event.description}</p>

          {session && (
            <div className="mt-4 flex items-center gap-4">
              <button
                onClick={() => setEditingEvent(event)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-500 hover:text-brand-600"
              >
                <Pencil size={13} />
                Modifier
              </button>
              <button
                onClick={() => handleDelete(event)}
                disabled={deletingId === event.id}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-700 disabled:opacity-50"
              >
                {deletingId === event.id ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  <Trash2 size={13} />
                )}
                Supprimer
              </button>
            </div>
          )}
        </div>
      </article>
    );
  };

  return (
    <section id="events" className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 text-leaf-500 font-semibold text-sm uppercase tracking-widest">
            <Camera size={14} />
            Notre action en images
          </span>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold text-brand-500">
            Galerie des évènements
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 bg-leaf-500 rounded-full"></div>
          <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-lg">
            Découvrez les moments forts de nos actions sur le terrain, partagés par notre équipe.
          </p>
        </Reveal>

        {session && (
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-brand-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/25 hover:-translate-y-0.5 transition-all duration-200 shadow-lg"
            >
              <Plus size={18} />
              Publier un évènement
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin text-brand-500" size={32} />
          </div>
        ) : error ? (
          <p className="text-center text-red-500 py-12">{error}</p>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-gray-400">
            <ImageOff size={40} />
            <p className="text-sm">Aucun évènement publié pour le moment.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {upcoming.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-brand-500 mb-6 flex items-center gap-2">
                  Évènements à venir
                  <span className="text-xs font-semibold bg-leaf-500/10 text-leaf-500 px-2.5 py-1 rounded-full">
                    {upcoming.length}
                  </span>
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcoming.map(renderCard)}
                </div>
              </div>
            )}

            {past.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-brand-500 mb-6 flex items-center gap-2">
                  Évènements passés
                  <span className="text-xs font-semibold bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
                    {past.length}
                  </span>
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{past.map(renderCard)}</div>
              </div>
            )}
          </div>
        )}

        {!session && (
          <p className="mt-10 text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
            <Lock size={12} />
            Espace administrateur réservé à l'équipe HUMAN-DEV.
          </p>
        )}
      </div>

      {showForm && (
        <EventForm
          onClose={() => setShowForm(false)}
          onSaved={() => {
            setShowForm(false);
            fetchEvents();
          }}
        />
      )}

      {editingEvent && (
        <EventForm
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
          onSaved={() => {
            setEditingEvent(null);
            fetchEvents();
          }}
        />
      )}

      {lightbox && <Lightbox event={lightbox} onClose={() => setLightbox(null)} />}
    </section>
  );
}

type NewImage = { file: File; preview: string };

function EventForm({
  event,
  onClose,
  onSaved,
}: {
  event?: Event;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEditing = !!event;
  const [title, setTitle] = useState(event?.title ?? '');
  const [description, setDescription] = useState(event?.description ?? '');
  const [eventDate, setEventDate] = useState(event?.event_date ?? todayStr());
  const [existingImages, setExistingImages] = useState<EventImage[]>(
    event ? sortedImages(event) : []
  );
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [newImages, setNewImages] = useState<NewImage[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const added = Array.from(files).map((file) => ({ file, preview: URL.createObjectURL(file) }));
    setNewImages((prev) => [...prev, ...added]);
  };

  const removeNewImage = (index: number) => {
    setNewImages((prev) => {
      const target = prev[index];
      if (target) URL.revokeObjectURL(target.preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const removeExistingImage = async (image: EventImage) => {
    if (!confirm('Supprimer cette image ?')) return;
    setRemovingId(image.id);
    await supabase.storage.from('event-images').remove([image.image_path]);
    const { error: delErr } = await supabase.from('event_images').delete().eq('id', image.id);
    setRemovingId(null);
    if (delErr) {
      alert("Erreur lors de la suppression de l'image.");
      return;
    }
    setExistingImages((prev) => prev.filter((i) => i.id !== image.id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!title.trim() || !description.trim() || !eventDate) {
      setError('Le titre, la description et la date sont obligatoires.');
      return;
    }
    setSubmitting(true);

    let eventId = event?.id ?? null;

    if (isEditing && event) {
      const { error: updErr } = await supabase
        .from('events')
        .update({ title: title.trim(), description: description.trim(), event_date: eventDate })
        .eq('id', event.id);
      if (updErr) {
        setError("Échec de la mise à jour de l'évènement.");
        setSubmitting(false);
        return;
      }
    } else {
      const { data: inserted, error: insErr } = await supabase
        .from('events')
        .insert({ title: title.trim(), description: description.trim(), event_date: eventDate })
        .select('id')
        .single();
      if (insErr || !inserted) {
        setError("Échec de la publication de l'évènement.");
        setSubmitting(false);
        return;
      }
      eventId = inserted.id;
    }

    if (eventId && newImages.length > 0) {
      const startPosition = existingImages.length;
      for (let i = 0; i < newImages.length; i++) {
        const { file } = newImages[i];
        const ext = file.name.split('.').pop() ?? 'jpg';
        const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from('event-images')
          .upload(path, file, { contentType: file.type });
        if (upErr) {
          setError("Échec de l'envoi d'une image.");
          setSubmitting(false);
          return;
        }
        const { data: pub } = supabase.storage.from('event-images').getPublicUrl(path);
        const { error: imgErr } = await supabase.from('event_images').insert({
          event_id: eventId,
          image_url: pub.publicUrl,
          image_path: path,
          position: startPosition + i,
        });
        if (imgErr) {
          setError("Échec de l'enregistrement d'une image.");
          setSubmitting(false);
          return;
        }
      }
    }

    setSubmitting(false);
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="font-bold text-lg text-brand-500">
            {isEditing ? "Modifier l'évènement" : 'Publier un évènement'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Titre *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={120}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40"
              placeholder="Ex : Distribution de kits à Maroua"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Date de l'évènement *
            </label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            />
            <p className="mt-1 text-xs text-gray-400">
              Une date future place l'évènement dans « à venir », une date passée dans « passés ».
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              maxLength={1000}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40 resize-none"
              placeholder="Décrivez l'évènement, le contexte, les bénéficiaires..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                handleFiles(e.target.files);
                e.target.value = '';
              }}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-500 hover:file:bg-brand-100"
            />

            {(existingImages.length > 0 || newImages.length > 0) && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {existingImages.map((img) => (
                  <div key={img.id} className="relative rounded-xl overflow-hidden border border-gray-100 aspect-square">
                    <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(img)}
                      disabled={removingId === img.id}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 disabled:opacity-50"
                    >
                      {removingId === img.id ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : (
                        <X size={12} />
                      )}
                    </button>
                  </div>
                ))}
                {newImages.map((img, index) => (
                  <div key={img.preview} className="relative rounded-xl overflow-hidden border border-gray-100 aspect-square">
                    <img src={img.preview} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-black/80"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-brand-500 text-white font-semibold px-6 py-2.5 rounded-full hover:bg-brand-600 disabled:opacity-60"
            >
              {submitting && <Loader2 size={16} className="animate-spin" />}
              {isEditing ? 'Enregistrer' : 'Publier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Lightbox({ event, onClose }: { event: Event; onClose: () => void }) {
  const images = sortedImages(event);
  const [index, setIndex] = useState(0);
  const current = images[index];

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((i) => (i - 1 + images.length) % images.length);
  };
  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((i) => (i + 1) % images.length);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-end p-3">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 p-1">
            <X size={22} />
          </button>
        </div>

        <div className="relative">
          {current ? (
            <img
              src={current.image_url}
              alt={event.title}
              className="w-full max-h-[60vh] object-contain bg-black/5"
            />
          ) : (
            <div className="w-full h-64 flex items-center justify-center text-gray-300 bg-black/5">
              <ImageOff size={40} />
            </div>
          )}
          {images.length > 1 && (
            <>
              <button
                onClick={showPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={showNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
              >
                <ChevronRight size={20} />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-white bg-black/50 px-2.5 py-1 rounded-full">
                {index + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
            <Calendar size={13} />
            {formatDate(event.event_date)}
          </div>
          <h3 className="font-bold text-2xl text-brand-500 mb-3">{event.title}</h3>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">{event.description}</p>
        </div>
      </div>
    </div>
  );
}
