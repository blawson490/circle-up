// app/ui/PageViewTracker.tsx
'use client'

import { useEffect, useRef } from 'react'
import { logPageView } from '@/app/lib/actions'

interface PageViewTrackerProps {
  path: string;
  isSSR: boolean;
}

export default function PageViewTracker({ path, isSSR }: PageViewTrackerProps) {
  const hasLogged = useRef(false);

  useEffect(() => {
    const trackPageView = async () => {
      if (hasLogged.current) return;
      hasLogged.current = true;
      const loadTime = Math.round(performance.now())
      await logPageView({
        page: path,
        url: window.location.href,
        userAgent: window.navigator.userAgent,
        loadTime,
        isSSR,
      })
    }

    trackPageView()
  }, [path, isSSR])

  return null
}