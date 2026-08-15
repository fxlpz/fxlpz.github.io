import type { BlogPost } from './blog-data'

export function generateBlogPostStructuredData(post: BlogPost, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `${url}/og-images/${post.slug}.png`,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: 'https://github.com/fxlpz',
    },
    publisher: {
      '@type': 'Person',
      name: 'Felipe da Silva Rosa',
      url: 'https://fxlpz.github.io',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${url}/blog/${post.slug}`,
    },
    articleSection: post.category,
    keywords: post.tags.join(', '),
    timeRequired: post.readTime,
  }
}

export function generateWebsiteStructuredData(url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FXLPZ',
    description: "Especialista em segurança ofensiva, pentest web e bug bounty. Writeups, experimentos e projetos open-source por Felipe da Silva Rosa.",
    url: url,
    author: {
      '@type': 'Person',
      name: 'Felipe da Silva Rosa',
      url: 'https://github.com/fxlpz',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generatePersonStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Felipe da Silva Rosa',
    url: 'https://fxlpz.github.io',
    image: 'https://fxlpz.github.io/developer-portrait.png',
    sameAs: [
      'https://github.com/fxlpz',
      'https://x.com/FelipeBuffer',
      'https://linkedin.com/in/felipe0x01',
      'https://app.hackthebox.com/users/2483868',
      'https://tryhackme.com/p/Fxplz',
    ],
    jobTitle: 'Offensive Security Specialist',
    worksFor: {
      '@type': 'Organization',
      name: 'FXLPZ',
    },
  }
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
