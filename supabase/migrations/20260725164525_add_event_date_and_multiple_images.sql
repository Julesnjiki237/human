/*
# Add event date and multiple images support

1. Changes to `events`
- Add `event_date` (date, not null, default current_date) — the date the event takes
  place. Independent from `created_at` (publish date), used to distinguish
  upcoming ("à venir") from past ("passé") events.

2. New table `event_images`
- `id` (uuid, primary key)
- `event_id` (uuid, references events, cascade delete)
- `image_url` (text, not null)
- `image_path` (text, not null) — storage path, used for cleanup on delete
- `position` (integer, default 0) — display order within the event
- `created_at` (timestamptz, default now())

3. Data migration
- Copy each event's existing single `image_url` / `image_path` (if any) into
  `event_images` as position 0.
- Drop the now-redundant `image_url` / `image_path` columns from `events`.

4. Security
- Enable RLS on `event_images`.
- SELECT: public (anon + authenticated).
- INSERT / DELETE: authenticated only, and only for events they own.
*/

ALTER TABLE events ADD COLUMN IF NOT EXISTS event_date date NOT NULL DEFAULT CURRENT_DATE;

CREATE TABLE IF NOT EXISTS event_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  image_path text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE event_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_event_images" ON event_images;
CREATE POLICY "public_select_event_images"
  ON event_images FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "admin_insert_event_images" ON event_images;
CREATE POLICY "admin_insert_event_images"
  ON event_images FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = event_images.event_id AND events.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "admin_delete_event_images" ON event_images;
CREATE POLICY "admin_delete_event_images"
  ON event_images FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = event_images.event_id AND events.user_id = auth.uid()
    )
  );

-- Migrate each event's existing single image into event_images
INSERT INTO event_images (event_id, image_url, image_path, position)
SELECT id, image_url, image_path, 0
FROM events
WHERE image_url IS NOT NULL AND image_path IS NOT NULL;

ALTER TABLE events DROP COLUMN IF EXISTS image_url;
ALTER TABLE events DROP COLUMN IF EXISTS image_path;
