# Netflix Data Analysis System

## Project Overview
The Netflix Data Analysis System is a web-based dashboard developed to explore and analyze Netflix movies and TV shows. It provides insights into Netflix content through interactive charts, summary statistics, and a title search feature.

## Features
- Displays total Netflix titles, movies, TV shows, and countries.
- Visualizes Movies vs TV Shows.
- Displays the Top 10 Genres.
- Displays the Top 10 Countries.
- Shows titles by release year.
- Allows users to search Netflix titles by name.
- Interactive dashboard with a Netflix-inspired dark theme.

## Technologies Used
- **Python** – Backend programming
- **Flask** – Web framework
- **Pandas** – Data processing and analysis
- **HTML** – Webpage structure
- **CSS** – Styling and design
- **JavaScript** – Frontend functionality
- **Chart.js** – Data visualization

## Project Structure
```text
Netfix_minior_project/
│
├── backend/app.py
│
├── dataset/ netflix_titles.csv
│
├── frontend/index.html
├──frontend/ style.css
├──│frontend/script.js
│
├── database/
│
└── README.md
```

## Dataset
The project uses the Netflix Titles dataset containing information about movies and TV shows, including:
- Title
- Type
- Release Year
- Rating
- Country
- Genre
- Description

## Installation and Setup

1. Install Python on your system.
2. Install the required libraries:

```bash
pip install flask pandas
```

3. Open the project folder in VS Code.
4. Open the backend folder in the terminal.
5. Run the application:

```bash
python app.py
```

6. Open your browser and visit:

```text
http://127.0.0.1:5000
```

## Project Objective
The objective of this project is to analyze Netflix content data and present meaningful insights through an interactive web dashboard.

## Conclusion
This project demonstrates the use of Python, Flask, Pandas, and frontend technologies to build a data analysis web application with interactive visualizations and search functionality.
