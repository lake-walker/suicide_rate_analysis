# Final Project: Suicide Rate vs.

Suicide Rates vs. Happiness and other indexes

Overview: 

•	800,000 people die from suicide every year. That accounts for about 1.4% of total global deaths
•	The trend is moving downward in much of the developed world
•	In some countries suicide is taboo and/or even illegal which seems a bit ridiculous. Those nations that have punishments for attempted suicides tend to be in Asia and Africa. While some do still exist in other parts of the world
•	Because of these negative views on suicide and attempted suicide the rates tend to be underreported as cause of death is covered up or never reported
•	Do nations experience a decrease in suicide rates due to development?
•	The purpose behind this project was to look at different global indexes and see if there is a correlation between these different indexes and suicide rates globally. This could show how developing nations can prioritize certain aspects of their economy and/or society in order to lower suicide rates amongst its population

Variables:

•	Suicides: For this analysis we will be looking at the number of suicides per 100,000 people in the population.

•	HDI: HDI attempts to create an index that looks beyond GDP for determining a countries capabilities. The Human Development Index is a summary of key dimensions in human development. Those dimensions include: life expectancy, education (number of years of education), and standard of living (GNI per Capita). HDI is measure between 0 and 1 with 1 being the highest and most developed and 0 being the least developed nations.

•	Happiness Index: The report is primarily based on individual respondent ratings. This provides some difficulty in gathering data and reports as this index is done entirely by survey. Rated out of 10 with 10 being the happiest life and 0 being the saddest.

•	GDP per capita: GDP or Gross Domestic Product is a measure of a country's economic output. It measures the added value from the production of goods and services in a given country over a certain period of time, typically a year. Per capita means it accounts for each individual in a population.

•	Alcohol consumption: Defined as the annual sales of pure alcohol in litres per person aged 15 years and older. This indicator is meased in litres per capita.

•	Health spending: Measures the final consumption of health care goods and services including personal health care and collective ervices. This indicator is measured as a share of GDP, as a share of total health spending and in USD per capita.

•	Private debt: Measured as a percentage of GDP and taken from the International Monetary Funds website. Described as the total stock of loans and debt securities issued by household and nonfinancial corporations as a share of GDP.

•	I chose these independent variables because GDP is the typical index used for determining a nations worth or capabilities. During economic and policy discussions GDP per capita is used heavily to influence political and economic decisions.

•	The Happiness index and HDI both take a different look at the capabilities of the individuals that make up a country/economy. They are more accurate representations of what day to day life is like in each country. 

•	If there is a correlation between any of these variables and suicides per 100k than that could be used to help guide policy to limit the number of suicides in developed and developing nations.

Visualizations:

•	Bubble chart
  o	Grouping of regions
  o	The outliers and unexpected results
  o	No firm relationship appears for any of the variables
•	Bar Chart
  o	Continues to confirm the regional differences and generalizations we can make about those regions
•	Map
  o	Visualization of how the different indexes layout accross the globe. More regional similarities are shown. 
 
Model

•	Created 4 different models to experiment with the data. One linear regression with a single feature, I choose alcohol consumption because it appeared to have a correlation with suicide rates. Another linear regression this time with all the features. And two deep neural network models, one with a single feature (alcohol consumption) and one with all the features.
•	The two best performing regressions are the linear model and the dnn model. I would’ve thought that the alcohol model would’ve performed the best
•	Comparing the two best performing models we can see they both function well in finding the suicide rates. 
•	LOSS PLOTS:
  o	Linear regression seems to be working well. The model get slightly stuck in the steps but fits the curve well.
  o	DNN regression fits less well. The model gets stuck and overfits the training data.


Findings

MSE vs. MAE

Mean Squared Error: With the nature of the data and using real world data points I think that the MSE is as good as it gets. The line of best fit describes the data best. MSE is going to be influenced by the larger outlier and create a larger error coefficient. While I believe it is the best it can be I don't think that MSE is the best performance indicator for this model. I think mean absolute value is a better indicator of performance.

Mean Absolute Error: Unlike the MSE, MAE is based on the absolute value of the error and not the square. This means the error residual treats both the large and small errors equally. Because there are outliers within the dataset it is important to not over emphasize the errors. This error coefficient is a better fit for real world data where we are likely to experience some large outliers.

If I were to repeat this study again I would drill down into the more detailed data and find specific indicators that drive down the suicide rates. Things like access to healthcare, levels of education, religion, debt to income ratio, and political stability. I think these variables take a deeper dive into how a country treats each individual citizen and the desire to better everyones life within their population. It would also be noteworthy to look at the situations surrounding suicides if that data is accessable. The percentage that happen within a prison system, and how many people commited suicide with undiagnosed and medicated mental health issues. It might be far fetched to think that this kind of data is easily accessible, but I think it's valuable to look at how countries treat their citizens.

Conclusion

•	In conclusion I cannot accept the original hypothesis for this project. There is not correlation between these variables and suicide rates. More in depth and niche data and research would provide a better understanding of how nations can work towards lowering their death by suicide.

•	The Sklearn model produced an R squared value of 0.49. This is rather low and would suggest that the model does not accurately predict suicide rates based off the features explored in this project. The sklearn model account for about half of these variables impacting suicide rates globally. An R2 this low is not a good indication that the model is efficient. It is important to take into consideration real life datasets and the unquantifiable data that impacts this model. I still would not trust this model to produce legitimate results. Running the prediction function returns very different values than the actual test results. Running it with new raw data produces results much higher than what would be expected. 

•	The linear model made using Tensorflow paints a similar picture to that off the sklearn linear model. It produces an mean absolute error of 2.35 and comparing this to the output results it does not instill confidence. Comparing that to the average suicides per 100k at 10.04 we get a better picture of how inaccurate this model. An error margin of 23% is rather high. The model needs more features to be able to perform better. 

• The deep neural network model performed about the same as the linear model, both from Tensorflow. It however, actually has a hihger mean absolute error than the linear model at 2.65. Still not a model that I would say is performing well. Adding more features and layers and continued tweaking of the model should be able to improve its performance. 

• It was difficult obtain the detailed data that including enough countries to be able to train and test these models. I hope over time the organizations involved in gather this data, like the WHO, IMF, and UN, will gain larger datasets so more analysis can be done on what issues truely cause suicide rates to increased. Next for this project is to continue to explore new data streams and change some of the current ones. More work with the models tweaking them to get more improved performance could give me a desirable result.


