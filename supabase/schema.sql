-- Live Feed Items Table
CREATE TABLE IF NOT EXISTS live_feed_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    source TEXT NOT NULL,
    source_label TEXT NOT NULL,
    category TEXT NOT NULL,
    priority TEXT NOT NULL,
    route_target TEXT NOT NULL,
    legal_status TEXT NOT NULL,
    summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Community Chat Messages Table
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nickname TEXT NOT NULL,
    message TEXT NOT NULL,
    topic TEXT NOT NULL DEFAULT 'General',
    status TEXT NOT NULL DEFAULT 'pending',
    moderation_note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Weekly Draw Entries Table
CREATE TABLE IF NOT EXISTS weekly_draw_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nickname TEXT NOT NULL,
    email TEXT,
    comment TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    agreed_rules BOOLEAN DEFAULT FALSE,
    selected_winner BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- REAPER Commands Queue Table
CREATE TABLE IF NOT EXISTS reaper_commands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    input TEXT NOT NULL,
    intent TEXT NOT NULL,
    target_team TEXT NOT NULL,
    risk_level TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'received',
    approval_required BOOLEAN DEFAULT FALSE,
    actions JSONB,
    result_message TEXT,
    warnings JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_chat_status ON chat_messages(status);
CREATE INDEX IF NOT EXISTS idx_live_priority ON live_feed_items(priority);
CREATE INDEX IF NOT EXISTS idx_draw_status ON weekly_draw_entries(status);
CREATE INDEX IF NOT EXISTS idx_reaper_status ON reaper_commands(status);
