'use client';

import { useEffect, useState } from 'react';
import { PackageType } from '@/types';

export function usePackages(query = '') {
  const [items, setItems] = useState<PackageType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch(`/api/packages${query ? `?${query}` : ''}`)
      .then((res) => res.json())
      .then((data) => {
        if (mounted) setItems(data.data || []);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [query]);

  return { items, loading };
}
