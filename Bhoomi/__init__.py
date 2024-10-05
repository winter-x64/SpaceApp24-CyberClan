import folium
from flask import Flask, render_template


def main_app() -> Flask:
    app = Flask(__name__)

    @app.route("/")
    def index():
        return render_template(template_name_or_list="landingpage.html")

    @app.route("/map")
    def map():
        # Initialize a map centered on a specific location
        start_coords = [20.5937, 78.9629]
        folium_map = folium.Map(location=start_coords, zoom_start=12)

        # Save the map to an HTML file
        folium_map.save("templates/map.html")

        return render_template("index.html")

    return app
