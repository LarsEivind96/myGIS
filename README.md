# myGIS

Live version available at: https://larseivind96.github.io/myGIS/

## About

myGIS is a simple GIS intended for introductory courses in GIS at NTNU, Trondheim, Norway. It was developed as a project in the course "Programming in Geomatics" in the fall of 2020. The goal of the course is to develop a simple GIS application that illustrate important GIS functionality in an attractive way. The application should be easy to understand and use even for beginners.

The application also contains a mission that can be solved, which is displayed once you enter the web application. The mission is meant as a practical task for new geomatics students, which will help them to get acquainted with GIS.

## Frameworks, libraries and packages

### React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### 'react-beautiful-dnd':

Used for drag and drop functionality. When dragging and dropping layers, it is possible to delete layers or rearrange the order of which the layers are drawn on to the map.

### Mapbox GL JS

Mapbox GL JS is a JavaScript library for vector maps on the web. It is well documented, andprovides easy to follow guides on their website.

### 'TurfJS'

Turf is an open source JavaScript library that allows you to do spatial operations in the browser. Turf helps you analyze, aggregate, and transform data.

#### Implemented spatial operations:

- Buffer
- Union
- Intersect
- Difference
