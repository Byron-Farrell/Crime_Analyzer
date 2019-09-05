

<p align="center"> 
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTroD3q1B2TwnZQ7BR785ZHvEQUZg2loGzJTQmjCsoFOYX0obwz">
</p>

# Project White Wolf

Overview
This application will be used as a data anyltics tool. it will validate files and the data within those files. Once validation is complete. A data manager will verify the data and push the data from stagging to live. Once this happensthe stagging data will be merged with the live data and the stagging data will be store in a versioning table. Once the data is validated it will be visulized and will have filter options to filter the data and a platform for data scientiests to perform queries of their own. 

# Trello

link: https://trello.com/projectwhitewolf1

# Infrastructure 

Backend 
---
- Flask
- a way to handle validation process
  - airflow(maybe, seems a bit much for my implementation)
- some sort of visulazation framework
- tool for data scientiest to query and explore data
- postgres (database)

Frontend
---
- react
- html
- css
- scss
- bootstrap

Mapping
---
- Esri GIS

Visualization
---
- charts.js
- d3.js
- use python and render it with Flask

Dev tools
---
- node/npm (package-management)
- pip3 (module managment)
- python virtual evniroment
- eslint (javascript code validation)
- webpack
- ts-compiler

# Design

Theme Ideas
---
link: http://rubix.sketchpixy.com/app/dashboard
![alt text](https://d85wutc1n854v.cloudfront.net/live/products/600x375/WB09498FH.png?v=4.1.0)

# Datasets 

CRIME DATASET: https://www.kaggle.com/currie32/crimes-in-chicago
