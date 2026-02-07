'use client';

import { useEffect, useState } from 'react';
import { getTenantKey, setTenantKey } from '../lib/auth';

const tenants = [
  { id: 'acme', label: 'Acme Corp', key: 'acme-demo-key' },
  { id: 'globex', label: 'Globex', key: 'globex-demo-key' },
  { id: 'admin', label: 'Admin', key: 'admin-demo-key' },
];

export function TenantSelector() {
  const [selected, setSelected] = useState<string>(tenants[0].key);

  useEffect(() => {
    const current = getTenantKey(tenants[0].key);
    if (current) {
      setSelected(current);
      setTenantKey(current);
    }
  }, []);

  const handleChange = (key: string) => {
    setSelected(key);
    setTenantKey(key);
    window.location.reload();
  };

  return (
    <select
      className="select"
      value={selected}
      onChange={(event) => handleChange(event.target.value)}
    >
      {tenants.map((tenant) => (
        <option key={tenant.id} value={tenant.key}>
          {tenant.label}
        </option>
      ))}
    </select>
  );
}
