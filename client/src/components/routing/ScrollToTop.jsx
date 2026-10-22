import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const location = useLocation();

  // Reset scroll to top when pathname or search parameters change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  // Handle same-page link clicks
  useEffect(() => {
    const handleSamePageLinkClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor || !anchor.href) return;

      try {
        const targetUrl = new URL(anchor.href, window.location.origin);
        const currentUrl = window.location;

        // Check if the link points to the same page without a hash anchor
        if (
          targetUrl.origin === currentUrl.origin &&
          targetUrl.pathname === currentUrl.pathname &&
          targetUrl.search === currentUrl.search &&
          !targetUrl.hash
        ) {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
      } catch {
        // Ignore invalid URLs
      }
    };

    document.addEventListener('click', handleSamePageLinkClick);
    return () => document.removeEventListener('click', handleSamePageLinkClick);
  }, []);

  return null;
}

