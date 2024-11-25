export interface Movie {
  id: string;
  title: string;
  year?: string;
  rank?: number;
  actors?: string;
  description?: string;
  poster: string;
  imdbUrl?: string;
  imdbIv?: string;
  aka?: string;
  photoWidth?: number;
  photoHeight?: number;
}

export interface MovieDetails {
  short: {
    '@context': string;
    '@type': string;
    url: string;
    name: string;
    image: string;
    description: string;
    review?: {
      '@type': string;
      itemReviewed: {
        '@type': string;
        url: string;
      };
      author: {
        '@type': string;
        name: string;
      };
      dateCreated: string;
      inLanguage: string;
      name: string;
      reviewBody: string;
      reviewRating: {
        '@type': string;
        worstRating: number;
        bestRating: number;
        ratingValue: number;
      };
    };
    aggregateRating?: {
      '@type': string;
      ratingCount: number;
      bestRating: number;
      worstRating: number;
      ratingValue: number;
    };
    contentRating: string;
    genre: string[];
    datePublished: string;
    keywords: string;
    trailer?: {
      '@type': string;
      name: string;
      embedUrl: string;
      thumbnail: {
        '@type': string;
        contentUrl: string;
      };
      thumbnailUrl: string;
      url: string;
      description: string;
      duration: string;
      uploadDate: string;
    };
    actor?: {
      '@type': string;
      url: string;
      name: string;
    }[];
    director?: {
      '@type': string;
      url: string;
      name: string;
    }[];
    creator?: {
      '@type': string;
      url: string;
    }[];
    duration: string;
  };
}
