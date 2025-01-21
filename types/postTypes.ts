import { PortableTextBlock, Slug, Image } from 'sanity';

export type PostCategory = 'technology' | 'business' | 'design';

export interface Author {
  _type: 'author';
  _id: string;
  name: string;
  image?: Image;
  bio?: PortableTextBlock[];
}

export interface Post {
  _type: 'post';
  _id: string;
  _createdAt: string;
  title: string;
  subtitle?: string;
  slug: Slug;
  author?: Author;
  bodyContent?: Array<PortableTextBlock | Image>;
  createdAt: string;
  mainImage?: Image;
  category?: PostCategory;
}
