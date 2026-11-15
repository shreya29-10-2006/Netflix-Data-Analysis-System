
from flask import Flask, jsonify, send_from_directory, request
import pandas as pd
import os

app = Flask(__name__)

# Project paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATASET_PATH = os.path.join(
    BASE_DIR, "..", "dataset", "netflix_titles.csv"
)

FRONTEND_DIR = os.path.abspath(
    os.path.join(BASE_DIR, "..", "frontend")
)

# Load Netflix dataset
df = pd.read_csv(DATASET_PATH)

# Main dashboard
@app.route("/")
def home():
    return send_from_directory(FRONTEND_DIR, "index.html")


@app.route("/<path:filename>")
def frontend_files(filename):
    return send_from_directory(FRONTEND_DIR, filename)


# Dashboard summary
@app.route("/api/summary")
def summary():
    return jsonify({
        "total_titles": int(len(df)),
        "total_movies": int((df["type"] == "Movie").sum()),
        "total_tv_shows": int((df["type"] == "TV Show").sum()),
        "total_countries": int(df["country"].nunique())
    })


# Movies vs TV Shows
@app.route("/api/type-data")
def type_data():
    counts = df["type"].value_counts()

    return jsonify({
        "labels": counts.index.tolist(),
        "values": counts.values.tolist()
    })


# Top Genres and Countries
def get_top_values(column, limit=10):
    values = (
        df[column]
        .dropna()
        .str.split(",")
        .explode()
        .str.strip()
    )

    counts = values[values != ""].value_counts().head(limit)

    return {
        "labels": counts.index.tolist(),
        "values": counts.values.tolist()
    }


@app.route("/api/genre-data")
def genre_data():
    return jsonify(get_top_values("listed_in"))


@app.route("/api/country-data")
def country_data():
    return jsonify(get_top_values("country"))


# Titles by Release Year
@app.route("/api/year-data")
def year_data():
    years = df["release_year"].dropna().value_counts().sort_index()

    return jsonify({
        "labels": years.index.astype(int).astype(str).tolist(),
        "values": years.values.tolist()
    })


# Search Movies and TV Shows
@app.route("/api/search")
def search_titles():

    query = request.args.get("q", "").strip()

    if not query:
        return jsonify([])

    results = df[
        df["title"].str.contains(
            query,
            case=False,
            na=False,
            regex=False
        )
    ].head(20)

    columns = [
        "show_id",
        "title",
        "type",
        "release_year",
        "rating",
        "listed_in",
        "description"
    ]

    return jsonify(
        results[columns].fillna("").to_dict(orient="records")
    )


if __name__ == "__main__":
    app.run(debug=True)
