-- Create Exec table with year support for multiple years
CREATE TABLE IF NOT EXISTS public."Exec" (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  bio TEXT,
  photo TEXT,
  "year" INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM NOW()),
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on year for faster filtering
CREATE INDEX IF NOT EXISTS idx_exec_year ON public."Exec"("year");

-- Create index on order for sorting
CREATE INDEX IF NOT EXISTS idx_exec_order ON public."Exec"("order");

-- Enable RLS
ALTER TABLE public."Exec" ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for public read access
CREATE POLICY "Allow public read access" ON public."Exec"
  FOR SELECT
  USING (true);

-- Create RLS policy for authenticated write access
CREATE POLICY "Allow authenticated users to write" ON public."Exec"
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update" ON public."Exec"
  FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete" ON public."Exec"
  FOR DELETE
  USING (auth.role() = 'authenticated');
