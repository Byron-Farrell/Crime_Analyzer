# Project White Wolf

Overview
This application will be used as a data anyltics tool. it will validate files and the data within those files. Once validation is complete. A data manager will verify the data and push the data from stagging to live. Once this happensthe stagging data will be merged with the live data and the stagging data will be store in a versioning table. Once the data is validated it will be visulized and will have filter options to filter the data and a platform for data scientiests to perform queries of their own. 

# Infrastructure 

Backend 
---
- Django (can handle file upload)
- a way to handle validation process
  - airflow(maybe, seems a bit much for my implementation)
- some sort of visulazation framework
- tool for data scientiest to query and explore data
- postgres (database)
- user management - (ldap) maybe!

Frontend
---
- react, vue or angular 4
- html
- css
- bootstrap

Mapping
---
- Esri GIS or Mapbox

Visualization
---
- charts.js
- d3.js

Dev tools
---
- node/npm (package-management)
- pip3 (module managment)
- pythin virtual evniroment
- eslint (javascript code validation)

User roles
---
- superuser
- admin
- Data owner
- data manager
- viewer

Theme Ideas
---
![alt text](https://d85wutc1n854v.cloudfront.net/live/products/600x375/WB09498FH.png?v=4.1.0)
