-- ==============================================================================
-- धर्मवीर संभाजी क्रीडा मंडळ (भगवं वादळ)
-- Database Schema & Security Policies for Supabase
-- Run this in your Supabase Project's SQL Editor
-- ==============================================================================

-- Enable UUID extension if not already available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. MEMBERS TABLE (पदाधिकारी)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    names TEXT[], -- Supports combined dual-member cards (e.g. ['सुशील सातदिवे', 'मंगेश थोरात'])
    position TEXT NOT NULL,
    image_url TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    badge TEXT,
    is_memorial BOOLEAN NOT NULL DEFAULT false,
    memorial_note TEXT,
    object_position TEXT DEFAULT 'center 10%',
    scale NUMERIC DEFAULT 1.0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 2. MENTORS TABLE (मार्गदर्शक)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.mentors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT, -- Optional; falls back to generic 'मार्गदर्शक' if empty
    role_title TEXT NOT NULL DEFAULT 'मार्गदर्शक',
    image_url TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    object_position TEXT DEFAULT 'center 10%',
    scale NUMERIC DEFAULT 1.0,
    translate_y TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 3. SPECIAL COOPERATION TABLE (विशेष सहकार्य)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.special_cooperation (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    role_title TEXT NOT NULL DEFAULT 'विशेष सहकार्य',
    image_url TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    object_position TEXT DEFAULT 'center 10%',
    scale NUMERIC DEFAULT 1.0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 4. GALLERY TABLE (गॅलरी & होमपेज स्लाईडशो)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_url TEXT NOT NULL,
    title TEXT,
    caption TEXT,
    category TEXT NOT NULL DEFAULT '2k23', -- '2k23', 'archive', or custom
    year TEXT DEFAULT '२०२३',
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    show_in_slideshow BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 5. SITE SETTINGS TABLE (लोगो, ब्रँडिंग, संपर्क माहिती)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- AUTO-UPDATE UPDATED_AT TRIGGER FUNCTION
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_members_updated_at ON public.members;
CREATE TRIGGER tr_members_updated_at BEFORE UPDATE ON public.members
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS tr_mentors_updated_at ON public.mentors;
CREATE TRIGGER tr_mentors_updated_at BEFORE UPDATE ON public.mentors
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS tr_special_cooperation_updated_at ON public.special_cooperation;
CREATE TRIGGER tr_special_cooperation_updated_at BEFORE UPDATE ON public.special_cooperation
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS tr_gallery_updated_at ON public.gallery;
CREATE TRIGGER tr_gallery_updated_at BEFORE UPDATE ON public.gallery
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS tr_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER tr_site_settings_updated_at BEFORE UPDATE ON public.site_settings
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.special_cooperation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- MEMBERS POLICIES
DROP POLICY IF EXISTS "Public can view active members" ON public.members;
CREATE POLICY "Public can view active members" ON public.members
    FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can insert members" ON public.members;
CREATE POLICY "Admins can insert members" ON public.members
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can update members" ON public.members;
CREATE POLICY "Admins can update members" ON public.members
    FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can delete members" ON public.members;
CREATE POLICY "Admins can delete members" ON public.members
    FOR DELETE USING (auth.role() = 'authenticated');

-- MENTORS POLICIES
DROP POLICY IF EXISTS "Public can view active mentors" ON public.mentors;
CREATE POLICY "Public can view active mentors" ON public.mentors
    FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can insert mentors" ON public.mentors;
CREATE POLICY "Admins can insert mentors" ON public.mentors
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can update mentors" ON public.mentors;
CREATE POLICY "Admins can update mentors" ON public.mentors
    FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can delete mentors" ON public.mentors;
CREATE POLICY "Admins can delete mentors" ON public.mentors
    FOR DELETE USING (auth.role() = 'authenticated');

-- SPECIAL COOPERATION POLICIES
DROP POLICY IF EXISTS "Public can view active cooperation" ON public.special_cooperation;
CREATE POLICY "Public can view active cooperation" ON public.special_cooperation
    FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can insert cooperation" ON public.special_cooperation;
CREATE POLICY "Admins can insert cooperation" ON public.special_cooperation
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can update cooperation" ON public.special_cooperation;
CREATE POLICY "Admins can update cooperation" ON public.special_cooperation
    FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can delete cooperation" ON public.special_cooperation;
CREATE POLICY "Admins can delete cooperation" ON public.special_cooperation
    FOR DELETE USING (auth.role() = 'authenticated');

-- GALLERY POLICIES
DROP POLICY IF EXISTS "Public can view active gallery images" ON public.gallery;
CREATE POLICY "Public can view active gallery images" ON public.gallery
    FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can insert gallery images" ON public.gallery;
CREATE POLICY "Admins can insert gallery images" ON public.gallery
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can update gallery images" ON public.gallery;
CREATE POLICY "Admins can update gallery images" ON public.gallery
    FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can delete gallery images" ON public.gallery;
CREATE POLICY "Admins can delete gallery images" ON public.gallery
    FOR DELETE USING (auth.role() = 'authenticated');

-- SITE SETTINGS POLICIES
DROP POLICY IF EXISTS "Public can read site settings" ON public.site_settings;
CREATE POLICY "Public can read site settings" ON public.site_settings
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage site settings" ON public.site_settings;
CREATE POLICY "Admins can manage site settings" ON public.site_settings
    FOR ALL USING (auth.role() = 'authenticated');

-- ------------------------------------------------------------------------------
-- 6. PERSISTENT STORAGE BUCKET CONFIGURATION (mandal-media)
-- ------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'mandal-media',
    'mandal-media',
    true,
    10485760, -- 10 MB limit
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 10485760,
    allowed_mime_types = ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

-- Storage bucket access policies
DROP POLICY IF EXISTS "Public Read Mandal Media" ON storage.objects;
CREATE POLICY "Public Read Mandal Media" ON storage.objects
    FOR SELECT USING (bucket_id = 'mandal-media');

DROP POLICY IF EXISTS "Admin Upload Mandal Media" ON storage.objects;
CREATE POLICY "Admin Upload Mandal Media" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'mandal-media' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin Update Mandal Media" ON storage.objects;
CREATE POLICY "Admin Update Mandal Media" ON storage.objects
    FOR UPDATE USING (bucket_id = 'mandal-media' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admin Delete Mandal Media" ON storage.objects;
CREATE POLICY "Admin Delete Mandal Media" ON storage.objects
    FOR DELETE USING (bucket_id = 'mandal-media' AND auth.role() = 'authenticated');

-- ------------------------------------------------------------------------------
-- 7. INITIAL BRANDING & LOGO SEED IN SITE_SETTINGS
-- ------------------------------------------------------------------------------
INSERT INTO public.site_settings (key, value)
VALUES
    ('site_logo', jsonb_build_object(
        'url', '/images/branding/mandal-logo.png',
        'alt', 'धर्मवीर संभाजी क्रीडा मंडळ लोगो',
        'updated_at', now()
    )),
    ('contact_info', jsonb_build_object(
        'addressMarathi', 'एन - ६ सिडको, ई सेक्टर, छत्रपती संभाजीनगर, महाराष्ट्र',
        'instagramHandle', '@bhgv__vadal',
        'telegramHandle', '@bhgvvadal',
        'youtubeHandle', '@bhgvvadal',
        'instagramUrl', 'https://instagram.com/bhgv__vadal',
        'youtubeUrl', 'https://youtube.com/@bhgvvadal',
        'telegramUrl', 'https://t.me/bhgvvadal'
    ))
ON CONFLICT (key) DO NOTHING;
