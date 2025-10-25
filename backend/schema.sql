
CREATE TABLE portfolios (
    user_id uuid NOT NULL, --from Supabase Auth
    symbol  text NOT NULL,
    shares  numeric(18,6) NOT NULL,
    avg_cost numeric(18,6),
    PRIMARY KEY (user_id, symbol)
);

CREATE INDEX idx_portfolios_user ON portfolios(user_id);