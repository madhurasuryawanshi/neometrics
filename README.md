# neometrics
A basic version of data pipeline constructed using open source tools Kafka and Streamsets. A JS file that collects data from website and writes data to Kafka using producer. A kafka consumer is then initialized in Streamsets which directs data through transformation and ultimately stores all the filtered data in BigQuery. 

All the data in streamsets is filtered using Jython wherever necessary. To make this work everything was hosted on AWS.
