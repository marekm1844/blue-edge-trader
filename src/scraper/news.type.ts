export type News = {
  title: string;
  link: string;
  date: string;
  source: string;
};

export type NewsWithArticle = News & {
  article: string;
};
