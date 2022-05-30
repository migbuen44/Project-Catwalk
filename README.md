# Project-catwalk

**Version 1.0.0**

Project-catwalk is a product web page that displays currently selected product along with its corresponding information, such as its description, related items,
product reviews and ratings, and question and answers sections. This project was created during my tenoir at Hack Reactor(coding bootcamp) and was my first large scale project. Three other engineers and myself contributed to the features and four widgets of this project.

## Installation

1. Fork repository into local machine

2. Perform bash commands

```bash
npm install
npm run build
npm start
```

## Features
1. Product Overview
  - Displays currently selected product with images
  - Image carousel to scroll through all images
  - Full screen image viewer on image click
  - Product size select option
2. Related Items
  - Displays all related items
  - On click current item display updates to items clicked
3. Ratings and Reviews
  - Displays product ratins and reviews data
    - Stars rating
    - User inputs
  - Pop up modal form
    - Star ratings options for multiple categories(size, fit, quality, etc.)
    - Custom text input
4. Questions and Answers
  - Displays questions based on their helpfulness rating (higher ratrings displayed at top)
  - Displays answers (default four) based on their helpfulness ratings
  - Show answers button displays all the answers to the question
  - Show questions button displays two more questions
  - Add question and add answers buttons that when clicked display a modal form with text fields for user info and a submit button
  - Report button to report questions and answers
  - Displays user images in answers component and displays images on full screen when clicked