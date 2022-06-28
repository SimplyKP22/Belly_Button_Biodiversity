# Belly_Button_Biodiversity

## Overview:
	Interactive web visualizations take advantage of javascript, JSON, and HTML to allow us to write a program that will access a dataset and create a dynamic user interface on a website based on that data. The user will be able to conduct their analysis by interacting with certain aspects or features of the site, allowing them to manipulate the portion of the data they see and the reports or visualizations corresponding to that data. 
    
	In this exercise, we have an HTML site that will allow the user to analyze data regarding bellybutton biodiversity. The user can interact with the site using a dropdown menu. The menu will populate a list of the IDs for the study participants. The user will be able to select any test IDs, and the Demographic information, along with the charts, will change based on the related data. This allows the user to conduct their own analysis based on what information is most relevant to them. 

## Instructions

Complete the following steps:

1. Use the D3 library to read in `samples.json` from the URL `https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json`.

2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

  * Use `sample_values` as the values for the bar chart.

  * Use `otu_ids` as the labels for the bar chart.

  * Use `otu_labels` as the hovertext for the chart.

3. Create a bubble chart that displays each sample.

  * Use `otu_ids` for the x values.

  * Use `sample_values` for the y values.

  * Use `sample_values` for the marker size.

  * Use `otu_ids` for the marker colors.

  * Use `otu_labels` for the text values.

4. Display the sample metadata, i.e., an individual's demographic information.

5. Display each key-value pair from the metadata JSON object somewhere on the page.

6. Update all the plots when a new sample is selected. Additionally, you are welcome to create any layout that you would like for your dashboard. 
