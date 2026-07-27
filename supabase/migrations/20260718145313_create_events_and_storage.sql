/*
# Create events table and image storage

1. Purpose
- Allow an administrator to publish event photos with a title and description.
- Visitors (anon) can read/view events but cannot create, edit, or delete them.
- Only authenticated users (the admin) can manage events.

2. New Tables
- `events`
  - `id` (uuid, primary key)
  - `title` (text, not null) — short event title
  - `description` (text, not null) — longer description of the event
  - `image_url` (text) — URL to the stored image (public bucket)
  - `image_path` (text) — storage path used for cleanup on delete
  - `created_at` (timestamptz, default now())
  - `user_id` (uuid, not null, default auth.uid()) — the admin who published it

3. Storage
- Create a public bucket `event-images` so event photos are publicly viewable.
- Storage policies allow anyone to read, but only authenticated users to upload/delete.

4. Security
- Enable RLS on `events`.
- SELECT: public (anon + authenticated) — anyone visiting the site can view events.
- INSERT / UPDATE / DELETE: authenticated only — only a signed-in admin can manage events.
- Storage: public read, authenticated write/delete.
*/

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  image_path text,
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_events" ON events;
CREATE POLICY "public_select_events"
  ON events FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "admin_insert_events" ON events;
CREATE POLICY "admin_insert_events"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "admin_update_events" ON events;
CREATE POLICY "admin_update_events"
  ON events FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "admin_delete_events" ON events;
CREATE POLICY "admin_delete_events"
  ON events FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Storage bucket for event images (public read)
INSERT INTO storage.buckets (id, name, public)
VALUES ('event-images', 'event-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: anyone can read, only authenticated can upload/delete
DROP POLICY IF EXISTS "public_read_event_images" ON storage.objects;
CREATE POLICY "public_read_event_images"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'event-images');

DROP POLICY IF EXISTS "auth_upload_event_images" ON storage.objects;
CREATE POLICY "auth_upload_event_images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'event-images');

DROP POLICY IF EXISTS "auth_delete_event_images" ON storage.objects;
CREATE POLICY "auth_delete_event_images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'event-images');
