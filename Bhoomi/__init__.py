import folium
from flask import Flask, render_template


def main_app() -> Flask:
    app = Flask(import_name=__name__)

    @app.route(rule="/")
    def index():
        return render_template(template_name_or_list="landingpage.html")

    @app.route(rule="/map")
    def map():
        # Initialize a map centered on a specific location
        start_coords: list[float] = [20.5937, 78.9629]
        folium_map = folium.Map(location=start_coords, zoom_start=12)

        # Save the map to an HTML file
        folium_map.save("Bhoomi/templates/map.html")

        return render_template(template_name_or_list="index.html")

    @app.route("/about")
    def about():
        return render_template("about.html")

    @app.route("/contact")
    def contact():
        return render_template("contact.html")

    return app
