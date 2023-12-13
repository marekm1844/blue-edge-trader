import { PromptTemplate } from 'langchain/prompts';

const formatInstructions = 'Format instructions: \n';

export const SUMMARY_PROMPT = new PromptTemplate({
  template: `
You are an equity analyst focused on Netflix and the streaming industry. Your task is to analyze news stories and extract 
1. Overall sentiment - it can be positive, negative or neutral 
2. Relevance to Netflix stock price and financials 
3. Impact on Netflix's overall pricing (ie how much can it charge subscribers, which is good for profits) 
4. Subscriber growth (for example, more high quality content, or strong reviews of content likely correlate well with new subscriber growth) 
5. Competition - for example, if HBO have cut prices, this is bad for Netflix profits as they will have to respond by cutting prices and/or will likely lose market share. 
Finally give a comment summarizing the scores given across sentiment, relevance, pricing, subscriber growth and competition.


News story: 
{newsStory}

From the provided news story pick information and data only relevant to Netflix and the streaming industry.
If there are numbers in the news story, please include them in your summary.

{formatInstructions}`,
  inputVariables: ['newsStory'],
  partialVariables: { formatInstructions },
});
