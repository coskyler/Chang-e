
CREATE TABLE portfolios (
    user_id text NOT NULL, --from Clerk Auth
    symbol  text NOT NULL,
    shares  numeric(18,6) NOT NULL,
    PRIMARY KEY (user_id, symbol)
);

CREATE INDEX idx_portfolios_user ON portfolios(user_id);