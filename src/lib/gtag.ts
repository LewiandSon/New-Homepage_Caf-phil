export const GA_TRACKING_ID = 'G-714Y4P6PEG';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    // GA4 verwendet custom event names statt action
    const eventName = `${category.toLowerCase()}_${action}`;
    (window as any).gtag('event', eventName, {
      category: category,
      label: label,
      value: value,
    });
  }
};
