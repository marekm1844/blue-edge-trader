import { PromptTemplate } from 'langchain/prompts';

const formatInstructions = 'Format instructions: \n';

export const SUMMARY_PROMPT = new PromptTemplate({
  template: `
  You are an equity analyst focused on Netflix and the streaming industry. Your task is to analyze articles, i.e. news stories and reports and extract scores on the following metrics. 
 
   1. overallSentimentScore: Overall sentiment score (from 1 to 10), but only as it relates to Netflix’s stock price or financials
  2. relevance: Relevance to Netflix stock price and financials. An article can have a high relevance score if it relates to a competitor, but it must have direct impact on Netflix. If the article is not directly relevant to Netflix’s prospects as a business or its competitors, then the relevance score should be below 5. 
  3. pricing: Impact on Netflix's overall pricing (ie how much can it charge subscribers, which is good for profits) and within this any improvement in the penetration of advert supported pricing plans (ie number of users opting for ad supported plans) is positive for pricing, as is reduction in password sharing
  4. subscribers: Subscriber growth (for example, more high quality content, or strong reviews of content likely correlate well with new subscriber growth) 
  5. competition: Competition - for example, if HBO have cut prices, this is bad for Netflix profits as they will have to respond by cutting prices and/or will likely lose market share. 
  6. costs: for example are they cutting costs and as part of that are they cutting or increasing content spending?
 
Prioritise content about the futures prospects of Netflix over content referring to past issues (e.g. comments about future pricing improvement are more relevant than comments about pricing issues in the past) 
  
  Each category in 1 to 5 above should be given a score from 1 (bad) to 10 (excellent). Note that for costs, higher costs are bad.
 
If the article does not mention anything relevant to the metric (e.g nothing is said that is relevant to pricing dynamics) then score that metric as ‘N/A’
 
  You also need to extract a Quality score using the following criteria. For many articles from Yahoo finance, the article is actually referring to another publication. In that case, use the original publication as the determinant of the quality score:
 
1) Company announcement = 5
2) Comments from management, for example at a conference = 4
3) Comments from an investment bank broker report = 3
4) high quality global journalism like the Wall St Journal, or Financial Times = 2
5) Yahoo = 1.5
6) other news articles (eg Zacks, ZeroHedge, Benzinga, Yahoo) = 1
 
  Finally give a comment summarizing the scores given across sentiment, relevance, pricing, subscriber growth and competition. Explain why the score has been given based on the input.
 
Article source: {articleSource}  
News story to analyze: 
{newsStory}
 
From the provided above news story pick information and data only relevant to Netflix and the streaming industry.
If there are financial data,exact values or percentages, in the news story, please include them all in your summary.
 
Analyze each story without looking at the other stories.
 
{formatInstructions}
 
Here are some examples of how to summarize and score the news story:
 
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
 
· Summary: Verizon Communications Inc is launching a unique $10 streaming package that includes Netflix. This could increase Netflix's reach and subscriber base.
· Scores: Overall Sentiment - 8, Relevance - 7, Pricing - 4, Subscribers - 8, Competition – 7, Costs N/A
· Quality: 1 (as the article is from Benzinga)
· Comment: Netflix is being offered as a bundle to Verizon customers, which is likely to expand its subscriber base but might impact pricing strategy due to the discounted rate.
 
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
·Scores: Overall Sentiment - 7, Relevance – 2, Pricing N/A, Subscribers N/A, Competition N/A, Costs N/A
·Quality: 1 (as the article is from Zacks)
·Comment: Very low-quality article with no new information relevant to Netflix's business or financials. Very little incremental information so most of the scores were N/A
 
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
·Scores: Overall Sentiment – N/A, Relevance –0, Pricing N/A, Subscribers N/A, Competition N/A, Costs N/A 
·Quality: 1 (as the article is from Benzinga) 
·Comment: Irrelevant to Netflix’s stock price.
 
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
·Scores: Overall Sentiment - 8, Relevance - 7, Pricing - 4, Subscribers - 8, Competition – 7, Costs N/A.
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
·Scores: Overall Sentiment - 4, Relevance - 3, Pricing - N/A, Subscribers - N/A, Competition – 6, Costs – N/A,
·Quality: 2 (as the article is from the South China Morning Post, a respected global newspaper) 
·Comment: Low relevance as it pertains to technical problems at a competitor's service, not directly impacting Netflix.
 
Source: "https://finance.yahoo.com/news/red-bull-racing-boss-christian-112724769.html"
Title: Red Bull Racing boss Christian Horner facing probe over alleged ‘inappropriate behavior’
 
Full article: “Christian Horner, the Red Bull Racing chief and one of the stars of Netflix hit documentary series 'Drive to Survive', is facing an internal investigation by the F1 team’s parent company after the group received allegations about his conduct toward a female colleague.
Red Bull has launched a probe after the Dutch newspaper de Telegraaf reported Horner had been accused of “inappropriate behavior,” citing people familiar with the matter.
Horner rejects the accusations, which have not been described in detail.
“I completely deny these claims,” Horner told outlets including https://www.theguardian.com/sport/2024/feb/05/christian-horner-under-investigation-at-red-bull-formula-one and the https://www.bbc.co.uk/sport/formula1/68205305.
Red Bull confirmed to multiple outlets that it had launched an internal investigation into the allegations against Horner.
“After being made aware of certain recent allegations, the ­company launched an ­independent investigation,” a Red Bull spokesperson told Fortune. “This ­process, which is already under way, is being carried out by an external specialist barrister.
“The company takes these ­matters extremely seriously and the ­investigation will be completed as soon as practically possible. It would not be appropriate to comment further at this time.”
https://www.thetimes.co.uk/article/be89efd2-e3e6-48c1-b6be-144fbefe98a1?shareToken=5bde52278c6515275f045e5075e3b147 chief sports writer Owen Slot says he was told by an “F1 insider” that it would be “a considerable surprise if Horner survives this.”
Horner’s road to success
Horner has been in charge of Red Bull Racing since its inception in 2005 after the drinks company bought out Jaguar, where Horner was previously boss.
He is the longest-serving team principal out of the 10 current F1 constructors.
Under Horner’s guidance, the F1 team has gone on a remarkable run of success since a controversial victory in 2021 helped star racer Max Verstappen snatch the title from Mercedes’ Lewis Hamilton.
The team won 21 of 22 possible races last year, taking the Constructer’s Championship while Verstappen won the Driver’s Championship. Verstappen took a record 10 consecutive race wins last season.
As investment has flowed into F1 in recent years, Red Bull Racing has climbed to a valuation of $2.6 billion, according to https://www.forbes.com/sites/mikeozanian/2023/07/19/formula-1s-most-valuable-teams-2023/?sh=ff9b0322adbf.
Horner became more widely known following the release of the Netflix series Drive to Survive, which showed his quarrels with rival team principals including Mercedes’ Toto Wolff.
It also documented his marriage to Geri Halliwell, a former Spice Girl whom he married in 2015.
The new F1 season will kick off at the start of March, where Red Bull and Verstappen are again expected to lead the field.
It was reported in October last year that Horner had been in an alleged https://www.skysports.com/f1/news/12433/12987822/max-verstappen-red-bull-driver-insists-christian-horner-and-helmut-marko-must-stay-at-team-after-feud-claims with Red Bull advisor Helmut Marko, which prompted Verstappen to assure the media neither of the pair were leaving.
This story was originally featured on https://fortune.com/europe/2024/02/06/christian-horner-red-bull-racing-internal-probe-inappropriate-behavior/”
 
·Summary: Christian Horner, Red Bull Racing chief and star of Netflix's 'Drive to Survive', faces internal investigation over conduct allegations
 
·Scores: Overall Sentiment – N/A, Relevance - 1, Pricing - N/A, Subscribers - N/A, Competition – N/A, Costs – N/A,
·Quality: 1.5 (as the article is from Yahoo) 
·Comment: Low relevance as it relates to events impacting a Netflix documentary and no impact on Netflix’s business prospects.
 
 
 
 
Source: “https://www.investorschronicle.co.uk/ideas/2023/12/07/unsubscribe-from-this-streaming-giant/”
Title: Unsubscribe from this streaming giant
 
Full article: Unsubscribe from this streaming giant
This beloved couch companion has had an impressive run, but its share price asks too much
To anyone who has ever curled up on the sofa and binge-watched Squid Game, Tiger King or Bojack Horseman, Netflix (US:NFLX) needs no introduction. The US giant practically invented video streaming as we know it and has signed up a quarter of a billion subscribers to its enormous library of films, TV shows and documentaries. In doing so, the company has made a lot of money and generated a healthy return for those who invested early. Today, the promise of even greater returns has driven its share price to dizzying heights.
 
However, while we do not believe Netflix is a bad company, there are many reasons to question whether it will be as successful an investment over the next decade. FactSet-compiled consensus forecasts suggest Netflix will grow its subscriber base from 247mn as of 30 September this year to over 316mn by the end of 2027, a 28 per cent jump. Much of the stock’s valuation is based on the assumption it will do so handily, while increasing average user revenues and boosting profits.
We are more pessimistic, and therefore see Netflix’s shares as heavily overvalued. Those holding the stock should take their profits and unsubscribe from the rampant growth narrative.
Turn-offs
First, Netflix’s first-mover advantage is eroding fast. While it was once revolutionary in convincing people to pay for an on-demand online streaming service and using that cash to develop original and award-winning films and television, it is now one of many. The most serious of these rivals is Disney (US:DIS), which joined the fray with Disney+ in late 2019. The Magic Kingdom also owns streaming platforms Hulu – whose remaining minority stake it is acquiring from Comcast (US:CMCSA) – and ESPN+, which it bought in 2016 and rebranded as the streaming service it is today in 2018. Although Disney was late to the party, its existing back catalogue instantly rivalled the content Netflix had spent years building up.
In addition to its vast vault of classic films and TV shows, Disney has spent significantly more than Netflix for several years on adding content to its digital war chest. Indeed, Disney was a film and TV powerhouse before it launched Disney+, so even when its only competition with Netflix was ESPN+, it was still outspending it. Subsequently, Disney almost doubled Netflix’s annual spend on licensing and producing additional content in 2020 and 2022. Hot on the heels of both is Amazon (US:AMZN), which matched Netflix’s spend in 2022.
 

Then there is Disney and Amazon’s history of eyebrow-raising M&A activity. As well as Hulu and ESPN, Disney has gobbled up the Marvel and Star Wars franchises, as well as 21st Century Fox over the past two decades. Not to be outdone, Amazon snapped up MGM, the studio behind the James Bond film series and other intellectual property, last year. These megadeals add thousands of hours of well-known films and TV shows to their arsenals. Netflix has also been a buyer, including the rights to Roald Dahl’s universe, but the sum of its dealmaking looks small by comparison.
There are countless other rivals, too. And switching between them is easy. For the end user, in the US, for example, there is little difference between using Netflix, Apple TV, Peacock, Max, NOW, Dazn, Heyu, Hulu, BritBox, or any other service, except price and content. This is great for the consumer, but tough for the companies competing for eyeballs.
The recent Hollywood writers’ strike adds to Netflix’s content production woes. Although the industrial action is now over, it is likely to reduce television and film output for years. This happened the last time there was a strike, in 2007-08, and which lasted around 100 days. This year’s strike, by contrast lasted around 150 days.
This lag will hurt other streamers too, but few are as dependent on original content as Netflix. Thanks to its mega mergers and age, Disney has a deep locker of films and TV, including anything and everything related to Marvel, Pixar Studios, The Simpsons and Star Wars, which it can sit on while still acquiring subscriptions. By contrast, Netflix’s appeal to subscribers is fresh, cutting-edge television and film. It has well-loved content in its coffers, but not to the same extent as Disney.
Given all this, it is hard to see how Netflix will convince another 69mn subscribers to sign up over the next four years. US and Canada subscriber numbers are flatlining, implying the region is now ex-growth. It is a worrying prospect as they are among the largest and most television-loving economies in the world, and it leaves Netflix’s fortunes in the hands of countries where it has yet to become as much of a household name and whose content tastes could be wildly different. 
In short, we do not know if the rest of the world will like Netflix, whose content is geared to North American audiences. The international appeal of Stranger Things, House of Cards and Breaking Bad reruns is more of an unknown than the multi-decade-old staples owned by the competition, such as Disney and James Bond films. International expansion is also likely to mean thinner margins, as consumers in countries with lower incomes than the US will be more price-sensitive. This is especially true now, as many economies lumber through prolonged periods of economic stagnation.
Disney’s subscriber numbers should both concern and encourage Netflix investors. On the one hand, Disney's streaming subscribers, including EPSN+ and Hulu customers, went from practical nonexistence in 2018 to briefly surpassing Netflix’s count in 2022. However, Netflix reclaimed the top spot after Disney haemorrhaged millions of Indian subscribers earlier this year, blaming its loss of Indian Premier League rights in the cricket-loving subcontinent. Disney’s enforcement of account-sharing policies and price increases were also part of the problem.
Netflix could celebrate this win, but it also looks like a warning of the difficulties of international expansion, price rises and password crackdowns. And Disney could yet overtake Netflix again. It remains a close second after four years of unprecedented subscriber growth.

 
'Peak TV' or weak TV?
But perhaps the biggest issue for Netflix’s projected subscriber growth is not competition or international markets but the notion that we are past 'peak' TV. Netflix was very much a beneficiary of the pandemic, of a captive audience with nothing to do but stay inside and watch, but now many of those customers want time away from screens (or at least, their TV screens). 
Meanwhile, on the production side, higher interest rates mean there is no ‘free money’ to spend on great television in the way there was during the 2010s. That Netflix's net debt is larger than its total equity does not help in this regard either. Add to this the $14.2bn in off-balance-sheet debt Netflix has in the form of “content obligations”, as in money it has already committed to future projects, and it is difficult to see how the company will have enough financial firepower to keep all its rivals at bay.
Netflix and its defenders will point to the 22.6mn subscribers it acquired this year as evidence of its post-pandemic appeal, but that jump was likely to be at least partly the result of its password-sharing crackdown, which is a trick it cannot repeat twice. If Netflix does not grow its subscriber count, it could squeeze its existing subscribers for more cash or push more advertising on them, but that would make it no better than the cable providers it replaced.
There are positives to Netflix. Its model is profit-making, while Disney's streaming arm is not, and it remains the market leader. But to justify a forward price/earnings multiple of 29, it must prove itself as a growth stock. Similarly valued companies are associated with world-beating technologies. That was Netflix 10 years ago. Today, it is just another streaming app desperate for viewers. It managed to pivot from a DVD-by-post rental model into something completely new, so transformation is not beyond its remit. But we would recommend investors watch something else.
 
·Scores: Overall Sentiment – 3, Relevance - 9, Pricing - 3, Subscribers - 3, Competition – 2, Costs – 3
·Quality: 2 (as the article is from Investors’ Chronicle, a respected online magazine about investing) 
·Comment: This is a highly relevant article. The content is overall fairly negative, pointing out that Netflix will struggle for future growth, and competition is fierce, with competitors spending aggressively on content and also being highly acquisitive (ie doing M&A) which adds to their content library. It also mentions that when Disney cracked down on password sharing (which Netflix is now doing), this contributed to problems at its streaming business. It also mentions that estimates for another 69m subscribers in 4 years are optimistic. 
 
 
 
Source: https://finance.yahoo.com/m/d2e7555b-8166-32c1-8c9b-805957275c1a/is-netflix-stock-a-buy-now%3F.html

 
Title: Is Netflix Stock a Buy Now?
 
Full article: After its rapid ascent over most of the past decade thanks to its dominance in the burgeoning streaming landscape, Netflix (NASDAQ: NFLX) hit a bit of a rough batch. Slower revenue and subscriber growth caused the shares to tank 51% in 2022.
But investors have sat back, relaxed, and pressed fast-forward. Now this top https://www.fool.com/investing/stock-market/market-sectors/communication/media-stocks/streaming-service-stocks/?utm_source=yahoo-host-full&utm_medium=feed&utm_campaign=article&referring_guid=a7f36026-cafb-4a85-b5d0-6a652697c9f4 is up 91% since the start of 2023 (as of Feb. 2). Credit goes to remarkable momentum with the underlying business.
Should you buy Netflix shares now?
Strong Q4 results
Netflix blew past estimates in the fourth quarter of last year. The business added 13.1 million net new members, helping push revenue up 12.5% year over year to $8.8 billion. This was the most customers Netflix was able to sign up in a fourth quarter ever. And it means the subscriber base expanded by an impressive 29.5 million in 2023, returning to Netflix's typical rate of roughly 25 million to 30 million additions per year.
Management called out success in the company's efforts to crack down on password sharing as a driver of the strong growth. And Netflix is benefiting from huge demand for the cheaper ad-supported subscription tier. Membership was up 70% on a sequential basis.
Even in the more mature U.S. and Canada markets, Netflix's customer base grew. The business raised its prices once again in the important U.S. market late last year, which helped propel a 3% gain in https://www.fool.com/terms/a/average-revenue-per-user/?utm_source=yahoo-host-full&utm_medium=feed&utm_campaign=article&referring_guid=a7f36026-cafb-4a85-b5d0-6a652697c9f4. The fact that Netflix's churn rate, at 2% in December, is consistently well below that of its peers indicates that customers still find huge value in the service. This means there could be untapped pricing power going forward.
Winning the streaming wars
Taking our attention away from the latest quarter and zooming out a bit, it's not hard to understand just how dominant Netflix has become. It appears to be winning the streaming wars by a wide margin right now.
By having a first-mover's advantage in the industry, Netflix was able to scale up rapidly during the 2010s when competition was limited. Now with 260.3 million subscribers and annual revenue of $33.7 billion, the business has the ability to spend a planned $17 billion on content this year, which is likely more than any other rival.
At the same time, Netflix is able to generate impressive profitability. Executives raised the outlook in 2024, and are now expecting an operating margin of 24% for the full year. This figure would be a massive increase from 13% in 2019.
One of Netflix's most formidable opponents, Walt Disney, reported an operating loss of $420 million in its direct-to-consumer operations, which includes Disney+, in the 2023 fiscal fourth quarter. It continues to be an uphill battle to get to positive profits.
The deciding factor
Because the shares have been going parabolic for nearly two years, they are trading at a richer valuation. The current price-to-earnings ratio sits at 47. On a forward basis, it's at 33.1 thanks to the earnings base, which is quickly rising. Nonetheless, some investors might be hesitant to get in at these levels.
Yes, the valuation is far more expensive than it was about 21 or so months ago. But the company is also firing on all cylinders right now. It's the leader in the industry, it still has huge growth potential, and it is seeing profitability expand.
Investors who have a long-term mindset should consider starting a position in Netflix today. Should the business continue its pace of double-digit earnings gains over the next few years, the stock has a shot at outperforming the overall market.
Should you invest $1,000 in Netflix right now?
Before you buy stock in Netflix, consider this:
The Motley Fool Stock Advisor analyst team just identified what they believe are the https://api.fool.com/infotron/infotrack/click?apikey=35527423-a535-4519-a07f-20014582e03e&impression=2f475199-f5de-4b88-a850-a418b6e9493a&url=https%3A%2F%2Fwww.fool.com%2Fmms%2Fmark%2Fe-foolcom-sa-bbn-dyn%3Faid%3D8867%26amp%253Bsource%3Disaeditxt0010870%26ftm_cam%3Dsa-bbn-evergreen%26ftm_veh%3Darticle_pitch_feed_yahoo%26ftm_pit%3D13620&utm_source=yahoo-host-full&utm_medium=feed&utm_campaign=article&referring_guid=a7f36026-cafb-4a85-b5d0-6a652697c9f4 for investors to buy now… and Netflix wasn’t one of them. The 10 stocks that made the cut could produce monster returns in the coming years.
Stock Advisor provides investors with an easy-to-follow blueprint for success, including guidance on building a portfolio, regular updates from analysts, and two new stock picks each month. The Stock Advisor service has more than tripled the return of S&P 500 since 2002*.
 
·Scores: Overall Sentiment – 7, Relevance - 7, Pricing - 8, Subscribers - 9, Competition – 7, Costs – N/A
·Quality: 1.5 (as the article is from Yahoo) 
·Comment: This is a positive article discussing the high level revenue trends and competitive dynamics. However, the content is generally referring to past results and does not focus much on future results, which is why it only scores a 6 for relevance. It discusses problems in 2022 but as this was over a year ago this is not that relevance. It also mentions high valuation, which is negative and reduces the sentiment a little.
  `,
  inputVariables: ['newsStory', 'articleSource'],
  partialVariables: { formatInstructions },
});

export const CLOUDE_SUMMARY_PROMPT = new PromptTemplate({
  template: `
  <newsarticle>
  Article Source: {articleSource}
  {newsStory}
  </newsarticle>
  
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
  
  News story to analyze is in <newsarticle>
  
  From the provided above news story pick information and data only relevant to Netflix and the streaming industry.
  If there are financial data,exact values or percentages, in the news story, please include them all in your summary.
  
  Analyze each story without looking at the other stories.
  
  {formatInstructions} 
  
  Here are some examples of how to summariz ans score the news:
  <example>
  <news>
  Source: https://www.benzinga.com/news/23/12/36071567/verizon-unveils-groundbreaking-10-streaming-deal-netflix-max-join-forces
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
  </news>
  <answer>
  ·       Summary: Verizon Communications Inc is launching a unique $10 streaming package that includes Netflix. This could increase Netflix's reach and subscriber base.
  ·       Scores: Overall Sentiment - 8, Relevance - 7, Pricing - 4, Subscribers - 8, Competition - 7.
  ·       Quality: 1 (as the article is from Benzinga)
  ·       Comment: Netflix is being offered as a bundle to Verizon customers, which is likely to expand its subscriber base but might impact pricing strategy due to the discounted rate.
  </answer>
  </example>
  <example>
  <news>
  Source: https://www.zacks.com/stock/news/2192870/investors-heavily-search-netflix-inc-nflx-here-is-what-you-need-to-know
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
  </news>
  <answer>
  ·Summary: Netflix has been one of the stocks most searched by investors, showing heightened interest. 
  ·Scores: Overall Sentiment - 7, Relevance - 0.
  ·Quality: 1 (as the article is from Zacks)
  ·Comment: Very low-quality article with no new information relevant to Netflix's business or financials.
  
  </answer>
  </example>
  <example>
  <news>
  Source: https://www.benzinga.com/pressreleases/23/12/n36067969/craig-david-to-headline-global-citizen-forum-charity-gala-2023-with-nile-rodgers-to-present-russel
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
  </news>
  ·Summary: This news piece is about Craig David headlining a concert and doesn't seem directly relevant to Netflix.
  ·Scores: Overall Sentiment - N/A, Relevance - 0.
  ·Quality: 1 (as the article is from Benzinga) 
  ·Comment: Irrelevant to Netflix.
  </answer>
  </example>
  <example>
  <news>
  <example>
  <news>
  Source: https://www.benzinga.com/pressreleases/23/12/g36066635/verizon-to-offer-netflix-max-streaming-bundle-as-10-per-month-myplan-perk
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
  </news>
  <answer>
  ·Summary: Similar to the first article, focusing on Verizon offering a bundle including Netflix.
  ·Scores: Overall Sentiment - 8, Relevance - 7, Pricing - 4, Subscribers - 8, Competition - 7.
  ·Quality: 1 (as the article is from Benzinga) 
  ·Comment: Repetition of the first news story, indicating a strategic partnership between Verizon and Netflix.
  </answer>
  </example>
  <example>
  <news>
  <example>
  <news>
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
  </news>
  <answer>
  ·Summary: Tencent faced technical issues with its streaming service, which is similar to Netflix but not directly related.
  ·Scores: Overall Sentiment - 3, Relevance - 3, Competition - 6.
  ·Quality: 2 (as the article is from the South China Morning Post, a respected global newspaper) 
  ·Comment: Low relevance as it pertains to technical problems at a competitor's service, not directly impacting Netflix.
  </answer>
  </example>
  `,
  inputVariables: ['newsStory', 'articleSource'],
  partialVariables: { formatInstructions },
});

export const ROLLUP_PROMPT = new PromptTemplate({
  template: `
  You are a world class analyst working for a hedge fund. Another analyst (equity analyst 1) reviews news articles on Netflix and summarises them into 
  summaries of the article anf the comment. The summaries are then sent to you for a daily rollup summary of the key points discussed that day.

  Sentiment
  overallSentimentScore(0-10)
  pricing (0-10)
  subscribers (0-10)
  competition (0-10)
  costs (0-10)
  relevance (0-10)
  quality (1-5)
  
  You are an analyst focused on producing a daily rollup summary of these individual article summaries. Create a daily summary of the key points discusses that day with more weight given to higher quality (highest being a score of 5) and higher relevance (highest being a score of 10) articles. The output should be in the form of 3  to 5 main bullet points and one comment.
  If there are financial data,exact values or percentages, in the news story, please include them all in your summary.
  
  Dailt summary of articles:
  {newsStory}

  {formatInstructions}

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
