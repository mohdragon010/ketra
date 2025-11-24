export const generatePageMetadata = ({
  title,
  description,
  path = '',
  keywords = [],
}) => {
  const baseUrl = 'https://ketra.vercel.app';
  const fullUrl = `${baseUrl}${path}`;
  
  const defaultKeywords = [
    'study dashboard',
    'student productivity',
    'task management',
    'note taking',
    'study planner',
    'education app',
    'student organizer',
  ];

  const allKeywords = [...new Set([...defaultKeywords, ...keywords])];

  return {
    title: title ? `${title} | Ketra` : 'Ketra – Smart Study Dashboard for Students',
    description: description || 'Your ultimate study companion. Organize subjects, manage tasks, take notes, and stay motivated with Ketra.',
    keywords: allKeywords.join(', '),
    openGraph: {
      title: title || 'Ketra – Smart Study Dashboard',
      description: description || 'Your ultimate study companion for better productivity.',
      url: fullUrl,
      siteName: 'Ketra',
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: title || 'Ketra – Smart Study Dashboard',
      description: description || 'Your ultimate study companion for better productivity.',
      creator: 'Mohamed Ayman',
    },
    alternates: {
      canonical: fullUrl,
    },
  };
};

// Page-specific metadata
export const pageMetadata = {
  home: generatePageMetadata({
    title: 'Home',
    description: 'Welcome to Ketra - Your smart study dashboard for organizing subjects, managing tasks, and taking notes.',
    path: '/',
    keywords: ['student dashboard', 'study app', 'productivity tool'],
  }),
  
  dashboard: generatePageMetadata({
    title: 'Dashboard',
    description: 'View your study progress, upcoming tasks, and recent activity all in one place.',
    path: '/dashboard',
    keywords: ['student dashboard', 'progress tracking', 'task overview'],
  }),
  
  subjects: generatePageMetadata({
    title: 'Subjects',
    description: 'Organize and manage all your courses and subjects in one centralized location.',
    path: '/subjects',
    keywords: ['course management', 'subject organization', 'study materials'],
  }),
  
  notes: generatePageMetadata({
    title: 'Notes',
    description: 'Create, edit, and organize your study notes with our powerful rich text editor.',
    path: '/notes',
    keywords: ['note taking', 'study notes', 'rich text editor', 'tiptap'],
  }),
  
  quotes: generatePageMetadata({
    title: 'Quotes',
    description: 'Get inspired with motivational quotes to fuel your study sessions and stay focused.',
    path: '/quotes',
    keywords: ['motivational quotes', 'inspiration', 'study motivation'],
  }),
  
  about: generatePageMetadata({
    title: 'About',
    description: 'Learn more about Ketra, the smart study dashboard built for students by students.',
    path: '/about',
    keywords: ['about ketra', 'student app', 'study tool'],
  }),
};

// Structured data for rich snippets
export const generateStructuredData = (type = 'WebApplication') => {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
    name: 'Ketra',
    description: 'Smart study dashboard for students to organize subjects, manage tasks, and take notes.',
    url: 'https://ketra.vercel.app',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Person',
      name: 'Mohamed Ayman',
    },
  };

  return JSON.stringify(baseData);
};
