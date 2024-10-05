import folium
from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    # Initialize a map centered on a specific location
    start_coords = [20.5937, 78.9629]
    folium_map = folium.Map(location=start_coords, zoom_start=12)

    # Save the map to an HTML file
    folium_map.save("templates/map.html")

    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
