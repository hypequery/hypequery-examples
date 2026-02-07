CREATE DATABASE IF NOT EXISTS analytics;

CREATE TABLE IF NOT EXISTS analytics.tenants (
  tenant_id String,
  name String,
  plan String
) ENGINE = MergeTree() ORDER BY tenant_id;

CREATE TABLE IF NOT EXISTS analytics.users (
  id UUID,
  tenant_id String,
  region LowCardinality(String),
  status LowCardinality(String),
  last_active DateTime,
  mrr Float64
) ENGINE = MergeTree()
ORDER BY (tenant_id, last_active);

INSERT INTO analytics.tenants VALUES ('acme', 'Acme Corp', 'enterprise');
INSERT INTO analytics.tenants VALUES ('globex', 'Globex', 'growth');

INSERT INTO analytics.users VALUES (generateUUIDv4(), 'acme', 'us-east', 'active', now(), 1200);
INSERT INTO analytics.users VALUES (generateUUIDv4(), 'acme', 'eu-west', 'churned', now() - 86400, 0);
INSERT INTO analytics.users VALUES (generateUUIDv4(), 'globex', 'us-east', 'active', now(), 800);
