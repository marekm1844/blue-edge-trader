import { PromptTemplate } from 'langchain/prompts';

const formatInstructions = 'Format instructions: \n';

export const SUMMARY_PROMPT = new PromptTemplate({
  template: `
  You are an equity analyst focused on Netflix and the streaming industry. Your task is to analyze news stories and extract 
  1. overallSentiment: Overall sentiment it can be positive, negative or neutral 
  2. overallSentimentScore: Overall sentiment score (from 1 to 10)
  3. relevance: Relevance to Netflix stock price and financials. If news story is about competition the revelance shoudd be 1 or 2. 
  4. pricing: Impact on Netflix's overall pricing (ie how much can it charge subscribers, which is good for profits) and within this any improvement in the penetration of advert supported pricing plans (ie number of users opting for ad supported plans) is positive for pricing, as is reduction in password sharing
  5. subscribers: Subscriber growth (for example, more high quality content, or strong reviews of content likely correlate well with new subscriber growth) 
  6. competition: Competition - for example, if HBO have cut prices, this is bad for Netflix profits as they will have to respond by cutting prices and/or will likely lose market share. 
  7. costs: for example are they cutting costs and as part of that are they cutting or increasing content spending?
  
  Each category in 1 to 5 above should be given a score from 1 (bad) to 10 (excellent). Note that for costs, higher costs are bad.

  You also need to extract an Quality score using the following criteria:

1) Company announcement = 5
2) Comments from management, for example at a conference = 4
3) Comments from an investment bank broker report = 3
4) high quality global journalism like the Wall St Journal or Financial Times = 2
5) other news articles (eg Zacks, ZeroHedge, Benzinga) = 1

  Finally give a comment summarizing the scores given across sentiment, relevance, pricing, subscriber growth and competition. Explain why the score has been given based on the input.

Article source: {articleSource}  
News story to analyze: 
{newsStory}

From the provided above news story pick information and data only relevant to Netflix and the streaming industry.
If there are financial data,exact values or percentages, in the news story, please include them all in your summary.

Analyze each story without looking at the other stories.

{formatInstructions}


Here are some examples of how to summariz ans score the news story:
1. Source: https://www.benzinga.com/news/23/12/36071567/verizon-unveils-groundbreaking-10-streaming-deal-netflix-max-join-forces
Title: Verizon Unveils Groundbreaking $10 Streaming Deal With Netflix
Full content: 
ZINGER KEY POINTS
Verizon teams up with Netflix and Max for a first-of-its-kind $10 streaming bundle, offering major savings for myPlan customers.
Verizon's myPlan users get exclusive access to Netflix & Max bundle from Dec 7.
Verizon Communications Inc VZ is launching a unique streaming bundle partnership with Netflix, Inc NFLX and Warner Bros. Discovery, Inc WBD Max, offering ad-supported services from these entertainment giants together for the first time. 
Starting December 7, this bundle will be available exclusively for Verizon's myPlan customers at $10 monthly, delivering over 40% savings. 
This offer is part of ten $10 monthly perks within myPlan, which includes options like Apple TV+, Walmart+, and TravelPass.
Customers using myPlan can select perks to add to their unlimited plans, allowing them to enjoy popular services like Netflix and Max at an affordable rate. 
This initiative marks Verizon as the first provider to offer a Netflix & Max (with ads) bundle, enhancing its wireless customers' value through strategic content industry partnerships.
Frank Boulben, Chief Revenue Officer of Verizon Consumer Group, emphasizes that these exclusive deals and bundled content offers through myPlan make it an optimal time to be a Verizon customer. 
The Netflix & Max (with ads) perk will be accessible to Verizon mobile customers on specific unlimited plans starting December 7. 
Additionally, Verizon is presenting a range of holiday deals across various categories, including mobile, home internet, streaming, and gaming, available   at their holiday media hub online.
In October, Verizon reported a third-quarter FY23 sales decline of 2.6% year-on-year to $33.34 billion, beating the consensus of $33.25 billion. Adjusted EPS of $1.22 beat the consensus of $1.18.

·       Summary: Verizon Communications Inc is launching a unique $10 streaming package that includes Netflix. This could increase Netflix's reach and subscriber base.
·       Scores: Overall Sentiment - 8, Relevance - 7, Pricing - 4, Subscribers - 8, Competition - 7.
·       Quality: 1 (as the article is from Benzinga)
·       Comment: Netflix is being offered as a bundle to Verizon customers, which is likely to expand its subscriber base but might impact pricing strategy due to the discounted rate.

2. Source: https://www.zacks.com/stock/news/2192870/investors-heavily-search-netflix-inc-nflx-here-is-what-you-need-to-know
Title: Investors Heavily Search Netflix, Inc. (NFLX)
Full article: "Netflix (NFLX Quick QuoteNFLX - Free Report) has recently been on Zacks.com's list of the most searched stocks. Therefore, you might want to consider some of the key factors that could influence the stock's performance in the near future.
Shares of this internet video service have returned +7.7% over the past month versus the Zacks S&P 500 composite's +8.6% change. The Zacks Broadcast Radio and Television industry, to which Netflix belongs, has gained 11.8% over this period. Now the key question is: Where could the stock be headed in the near term?
Although media reports or rumors about a significant change in a company's business prospects usually cause its stock to trend and lead to an immediate price change, there are always certain fundamental factors that ultimately drive the buy-and-hold decision.
Revisions to Earnings Estimates
Here at Zacks, we prioritize appraising the change in the projection of a company's future earnings over anything else. That's because we believe the present value of its future stream of earnings is what determines the fair value for its stock.
We essentially look at how sell-side analysts covering the stock are revising their earnings estimates to reflect the impact of the latest business trends. And if earnings estimates go up for a company, the fair value for its stock goes up. A higher fair value than the current market price drives investors' interest in buying the stock, leading to its price moving higher. This is why empirical research shows a strong correlation between trends in earnings estimate revisions and near-term stock price movements.
Netflix is expected to post earnings of $2.18 per share for the current quarter, representing a year-over-year change of +1,716.7%. Over the last 30 days, the Zacks Consensus Estimate has changed +0.1%.
The consensus earnings estimate of $12.07 for the current fiscal year indicates a year-over-year change of +21.3%. This estimate has remained unchanged over the last 30 days.
For the next fiscal year, the consensus earnings estimate of $15.93 indicates a change of +31.9% from what Netflix is expected to report a year ago. Over the past month, the estimate has remained unchanged.
With an impressive externally audited track record, our proprietary stock rating tool -- the Zacks Rank -- is a more conclusive indicator of a stock's near-term price performance, as it effectively harnesses the power of earnings estimate revisions. The size of the recent change in the consensus estimate, along with three other factors related to earnings estimates, has resulted in a Zacks Rank #3 (Hold) for Netflix.
The chart below shows the evolution of the company's forward 12-month consensus EPS estimate:
12 Month EPS
Revenue Growth Forecast
While earnings growth is arguably the most superior indicator of a company's financial health, nothing happens as such if a business isn't able to grow its revenues. After all, it's nearly impossible for a company to increase its earnings for an extended period without increasing its revenues. So, it's important to know a company's potential revenue growth.
In the case of Netflix, the consensus sales estimate of $8.7 billion for the current quarter points to a year-over-year change of +10.9%. The $33.6 billion and $38.22 billion estimates for the current and next fiscal years indicate changes of +6.3% and +13.8%, respectively.
Last Reported Results and Surprise History
Netflix reported revenues of $8.54 billion in the last reported quarter, representing a year-over-year change of +7.8%. EPS of $3.73 for the same period compares with $3.10 a year ago.
Compared to the Zacks Consensus Estimate of $8.53 billion, the reported revenues represent a surprise of +0.11%. The EPS surprise was +7.8%.
Over the last four quarters, Netflix surpassed consensus EPS estimates three times. The company topped consensus revenue estimates two times over this period.
Valuation
Without considering a stock's valuation, no investment decision can be efficient. In predicting a stock's future price performance, it's crucial to determine whether its current price correctly reflects the intrinsic value of the underlying business and the company's growth prospects.
Comparing the current value of a company's valuation multiples, such as its price-to-earnings (P/E), price-to-sales (P/S), and price-to-cash flow (P/CF), to its own historical values helps ascertain whether its stock is fairly valued, overvalued, or undervalued, whereas comparing the company relative to its peers on these parameters gives a good sense of how reasonable its stock price is.
The Zacks Value Style Score (part of the Zacks Style Scores system), which pays close attention to both traditional and unconventional valuation metrics to grade stocks from A to F (an An is better than a B; a B is better than a C; and so on), is pretty helpful in identifying whether a stock is overvalued, rightly valued, or temporarily undervalued.
Netflix is graded C on this front, indicating that it is trading at par with its peers. Click here to see the values of some of the valuation metrics that have driven this grade.
Bottom Line
The facts discussed here and much other information on Zacks.com might help determine whether or not it's worthwhile paying attention to the market buzz about Netflix. However, its Zacks Rank #3 does suggest that it may perform in line with the broader market in the near term."

·Summary: Netflix has been one of the stocks most searched by investors, showing heightened interest. 
·Scores: Overall Sentiment - 7, Relevance - 0.
·Quality: 1 (as the article is from Zacks)
·Comment: Very low-quality article with no new information relevant to Netflix's business or financials.

3. Source: https://www.benzinga.com/pressreleases/23/12/n36067969/craig-david-to-headline-global-citizen-forum-charity-gala-2023-with-nile-rodgers-to-present-russel
Title: Craig David to headline Global Citizen Forum Concert
Full Article: "Craig David to headline Global Citizen Forum Charity Gala 2023, with Nile Rodgers to present Russell Peters with the Global Citizen Forum Award
RAS AL KHAIMAH, UAE, Dec. 4, 2023 /PRNewswire/ --The Global Citizen Forum, is delighted to announce that best-selling artist Craig David is set to headline this year's charity gala. Iconic musician/record producer Nile Rodgers will present the celebrated comedian Russell Peters with the Global Citizen Forum Award.
The Earth Age, Global Citizen Forum's second chapter of the Butterfly Effect trilogy, is presented by Ras Al Khaimah Tourism Development Authority (RAKTDA) and will bring global citizens together to discuss the most pressing challenges of our time. In partnership with RAK Properties, the InterContinental Ras Al Khaimah Mina Al Arab Resort & Spa will play host to this year's event. With an international reputation for crafting luxury destinations with sustainability and design at their core, RAK Properties is providing a venue worthy of the grand purpose that underpins the Global Citizen Forum.
Craig David presents TS5 will be the headline performance at the Global Citizen Forum's charity gala. The best-selling musician, who has amassed 20 UK top 40 singles, and has sold 15 million records worldwide, will treat attendees of the charity gala to a spectacular show that is not to be missed. Craig David, who has Afro-Grenadian and British heritage, is a true global citizen, having travelled all over the world throughout his phenomenal career. He has served as a Goodwill Ambassador for the World Health Organisation in the fight against tuberculosis, and also took part in Soccer Aid to help raise funds for UNICEF UK.
The Global Citizen Forum Award is presented to individuals or organizations with an outstanding and consistent contribution to the global citizenship movement. The recipients of the award embody the qualities that are foundational to the creation of a world without borders – human dignity, integrity, and accountability. Past recipients include Hollywood actress and producer Eva Longoria, and R&B star and leading philanthropist Akon.
Nile Rodgers, the iconic American record producer and musician, will present this year's award. Rodgers, co-founder of legendary band Chic, has sold more than 500 million albums, and worked with some of the world's most famous artists including David Bowie, Beyonce, Mick Jagger, Madonna, and Daft Punk. The multi-Grammy-award winning star is also the Co-Founder and Chairman of We Are Family Foundation. The non-profit is dedicated to the vision of creating a global family by founding and supporting programs that promote cultural diversity, while nurturing the vision and talents of the youth leaders positively changing the world. 
On 7th December, two We Are Family Foundation Youth Delegates, Kasha Sequoia Slavner and Jeremiah Thoronka, will host a panel discussion during the Summit. Kasha's film, ""1.5 Degrees of Peace,"" delves into the stories of underrepresented youth grappling with the intersections of the climate crisis, militarization, and conflicts. Jeremiah's innovative device Optim Energy has mitigated the consequences of energy poverty for over 1,500 citizens and 9,000 students across Sierra Leone. Together, Kasha and Jeremiah will explore the narratives connecting climate justice and peacebuilding.
Russell Peters, the recipient of this year's award is a Gemini-award winning stand-up comedian, and has entertained audiences around the world for over 30 years. Born in Canada to Anglo-Indian parents, Russell Peters was one of the first comedians to perform a Netflix stand-up special. Russell is the first truly global comedian of the twenty-first century, having performed to crowds all around the world: from Greenland, to Thailand, to New York. A dedicated philanthropist, Russell set up The Russell Peters North Peel Scholarship, which provides college tuition for disadvantaged, academically gifted students who would otherwise be unable to access higher education. Over the past decade he has paid for more than 20 students to attend college in his hometown of Brampton, Ontario.
""Comedy's influence transcends borders, and has the power to inspire world-changing impact by breaking down the barriers between disparate people,"" said Armand Arton, Founder and Chairman of Global Citizen Forum. ""With so many talented stars attending this year's charity gala, it's sure to be a night to remember.""
This year's gala will see global citizens walk the green carpet, rather than the red carpet, to highlight the sustainable agenda of the event. The gala includes a charity auction, hosted by journalist and broadcaster Jonny Gould, to raise funds for the Yusra Mardini Foundation, and the Global Citizen Cultural Centre for Youth in Antigua and Barbuda. Award-winning DJ and Producer Dany Neville will close off the night's festivities with an eclectic set.
Join the movement. Be part of something bigger and don't miss the event of the year! Secure your place now."

·Summary: This news piece is about Craig David headlining a concert and doesn't seem directly relevant to Netflix.
·Scores: Overall Sentiment - N/A, Relevance - 0.
·Quality: 1 (as the article is from Benzinga) 
·Comment: Irrelevant to Netflix.

4. Source: https://www.benzinga.com/pressreleases/23/12/g36066635/verizon-to-offer-netflix-max-streaming-bundle-as-10-per-month-myplan-perk
Title: Verizon to offer Netflix & Max streaming bundle
Full article: "Verizon to offer Netflix & Max streaming bundle as $10 per month myPlan perk
NEW YORK, Dec. 04, 2023 (GLOBE NEWSWIRE) -- Verizon is partnering with Netflix and Max to offer its customers savings on a first-of-its-kind streaming bundle.
The news: Starting December 7 and for the first time, ad-supported services from entertainment giants Netflix and Max will be offered together – only for Verizon's myPlancustomers – for just $10 per month, providing them with over 40% savings that they can't get anywhere else.
The Netflix & Max (with ads) bundle is among ten $10 monthly perks available to Verizon customers through myPlan, including Apple TV+, +play credits to save on more streaming and content, Walmart+, TravelPass and more.
That means customers can get two content bundles with myPlan perks – the Disney Bundle1 and the Netflix & Max (with ads) bundle2 – which include five streaming services for just $20 per month.
Perks for Verizon customers: With myPlan, Verizon customers choose which perks they want to add to their unlimited plans and, at only $10 per month for each perk, enjoy services they love at a great value, like Netflix and Max. We're offering customers more choice and value than the rigid, competitive plans that force you to pay for things you don't need.
Why it's important: Verizon is the first provider to offer a bundle of Netflix & Max (with ads) and it's available to all myPlan customers. Verizon is using its strategic relationships with the biggest players in the content industry to continue to unlock more value for its wireless customers.
myPlan introduces customer control, so they can now choose what to add to their plan and save big on things they love, like Netflix & Max (with ads).
""The Best Report Bezinga Has Ever Produced""
Massive returns are possible within this market! For a limited time, get access to the Benzinga Insider Report, usually $47/month, for just $0.99! Discover extremely undervalued stock picks before they skyrocket! Time is running out! Act fast and secure your future wealth at this unbelievable discount! Claim Your $0.99 Offer NOW!
What executives are saying: 
Frank Boulben, Chief Revenue Officer, Verizon Consumer Group: ""Customers want unbeatable offers from top partners that deliver the best services and experiences they want, and on the nation's most reliable network. With these only for Verizon deals and first-of-its-kind bundled content offers you can get through myPlan, there's never been a better time to be a Verizon customer.""
Who can get it? The Netflix & Max (with ads) perk will be available December 7 to Verizon mobile customers on our Unlimited Welcome, Unlimited Plus or Unlimited Ultimate plans. Enroll in myPlan and take advantage of the offer by visiting verizon.com/myplan.
More holiday deals from Verizon: Looking for more unbeatable deals and exclusive savings this holiday season? Verizon has you covered with special offers across mobile, home internet, streaming, gaming and more. Head to verizon.com/holidaymediahub to see what we have in store for the holidays.
1. Disney Bundle includes Disney+ (No Ads), Hulu (w/Ads), and ESPN+ (w/Ads). EXISTING DISNEY+, HULU OR ESPN+ subscribers: Offer will not automatically replace existing subscription(s). Managing subscriptions may be required to avoid multiple subscriptions and corresponding charges. Terms apply.
2. Netflix-Max: Netflix & Max (With Ads) perk requires line subscribed to an Unlimited Welcome, Unlimited Plus or Unlimited Ultimate plan. Must be 18 years of age or older to enroll. After enrolling in the Netflix & Max (With Ads) perk, you will need to complete account setup separately for each service. Access content from each service separately. Netflix may be upgraded and downgraded via Netflix. Enrolling in the Netflix & Max (With Ads) perk may affect existing subscriptions to Netflix and Max. Managing subscriptions may be required to avoid multiple subscriptions and corresponding charges. $6.98/mo perk savings based on the current $6.99/mo for Netflix Standard with Ads and $9.99/mo for Max (With Ads plan) less $10/mo perk added to myPlan. One offer per eligible Verizon line. Subject to Netflix Terms of Use and Max Terms of Use.
Verizon Communications Inc. ((NYSE, NASDAQ:VZ) was formed on June 30, 2000 and is one of the world's leading providers of technology and communications services. Headquartered in New York City and with a presence around the world, Verizon generated revenues of $136.8 billion in 2022. The company offers data, video and voice services and solutions on its award-winning networks and platforms, delivering on customers' demand for mobility, reliable network connectivity, security and control."

·Summary: Similar to the first article, focusing on Verizon offering a bundle including Netflix.
·Scores: Overall Sentiment - 8, Relevance - 7, Pricing - 4, Subscribers - 8, Competition - 7.
·Quality: 1 (as the article is from Benzinga) 
·Comment: Repetition of the first news story, indicating a strategic partnership between Verizon and Netflix.

Source: https://www.scmp.com/tech/article/3243799/tencent-apologises-outage-its-netflix-video-streaming-service-latest-example-glitch-big-tech-firm
Title: Tencent apologizes for outage at its Netflix-like service
Full article: "Tencent apologises for outage at its Netflix-like video streaming service, in the latest example of glitch at Big Tech firm
Some users shared screenshots on Weibo of the Tencent Video app displaying ‘failure to retrieve data’ messages
Tencent Video said functions were being restored gradually and apologised for the outage
Chinese tech giant Tencent Holdings reported disruptions to its Netflix-like streaming service Tencent Video on Sunday, just weeks after major outages at Alibaba Group Holding’s cloud service and Didi Chuxing’s ride-hailing app.
Tencent Video said it was “experiencing temporary technical issues” and that its team was working to fix the problems, according to a post published on Sunday evening on its official account on Chinese microblogging service Weibo following user complaints.
Some users shared screenshots on Weibo of the Tencent Video app displaying “failure to retrieve data” messages, while others said their subscription plans had become unusable.
Tencent Video said functions were being restored gradually and apologised for the outage. Tencent did not immediately respond to a request for comment on Monday on the current status of the service.
Tencent Video is engaged in fierce rivalry with other top video streaming sites in China, including Baidu’s iQiyi and Alibaba’s Youku, with the industry facing a new competitive threat from the rise of short video sites.
Tencent’s video streaming service had 117 million subscribers in the third quarter, down 2 per cent year-on-year, and it charges subscription fees for premium content starting at 30 yuan (US$4.21) each month.
The disruptions to Tencent Video come hot on the heels of major outages at Alibaba’s cloud computing unit and the country’s biggest ride-hailing service Didi.
Last week, Didi reported a two-day service breakdown that affected users across major cities, including Beijing, Shanghai and Guangzhou, resulting in chaos for many of its 400 million passengers and drivers.
The ride-hailing app operator, which handles about 30 million orders per day, said in a statement that the breakdown was caused by an “underlying system software failure” and not external attacks.
Alibaba Cloud’s second outage last month – affecting customers in mainland China, Hong Kong and the United States – came just weeks after a service failure hit its Singles’ Day shopping festival. It affected some of Alibaba’s most popular apps, including workplace communications tool DingTalk and second-hand goods trading platform Xianyu, as well as online marketplace Taobao. Alibaba owns the South China Morning Post.
Tencent’s super-app WeChat, an essential tool for messaging, payments and various services with 1.34 billion monthly active users, also experienced a breakdown in March this year caused by a failure of “supporting facilities”. China’s Ministry of Industry and Information Technology later summoned the company for an explanation of the incident and necessary rectification measures.
Separately, Tencent has continued to consolidate its businesses with a plan to shut down Moo, a small music streaming service. The five-year-old app will cease operations on December 31, ending new registrations next Friday.
Moo was launched in 2018 to target the younger generation with niche music offerings and as a supplement to Tencent’s three main music apps – Kugou, Kuwo and QQ Music."

·Summary: Tencent faced technical issues with its streaming service, which is similar to Netflix but not directly related.
·Scores: Overall Sentiment - 3, Relevance - 3, Competition - 6.
·Quality: 2 (as the article is from the South China Morning Post, a respected global newspaper) 
·Comment: Low relevance as it pertains to technical problems at a competitor's service, not directly impacting Netflix.
`,
  inputVariables: ['newsStory', 'articleSource'],
  partialVariables: { formatInstructions },
});

export const ROLLUP_PROMPT = new PromptTemplate({
  template: `

  `,
  inputVariables: ['newsStory'],
  partialVariables: { formatInstructions },
});

export const Q_REPORT_ANALYSIS_PROMPT = new PromptTemplate({
  template: `
  
    `,
  inputVariables: ['newsStory'],
  partialVariables: { formatInstructions },
});
