export interface Bip {
    _id: string;
    content: string;
    categories: string[];
    likes: string[];
    liked: boolean;
    picture?: string;
    comments: string[];
    user: string;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
  }