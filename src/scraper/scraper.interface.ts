export interface IScraper {
  scrapeArticle(url: string): Promise<string>;
}
