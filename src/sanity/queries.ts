import { groq } from "next-sanity";

export interface EventPreview {
  _id: string;
  title_de: string;
  title_en?: string;
  date: string;
  imageUrl?: string;
}

export const upcomingEventsQuery = groq`
  *[_type == "event" && date >= $now] | order(date asc) {
    _id,
    title_de,
    title_en,
    date,
    "imageUrl": image.asset->url,
    description_de,
    description_en,
    signupLink,
    signupType,
    signupUrl,
  }
`;

export const pastEventsQuery = groq`
  *[_type == "event" && date < $now] | order(date desc) {
    _id,
    title_de,
    title_en,
    date,
    "imageUrl": image.asset->url,
    description_de,
    description_en,
    signupLink,
    signupType,
    signupUrl,
  }
`;

export const allEventsQuery = groq`
  *[_type == "event"] | order(date asc) {
    _id,
    title_de,
    title_en,
    date,
    "imageUrl": image.asset->url,
    description_de,
    description_en,
    signupLink,
    signupType,
    signupUrl,
  }
`;
