# import folium
# from flask import Flask, render_template, send_from_directory

# app = Flask(__name__)


# @app.route(rule="/")
# def index():
#     # Create a map centered on a specific location
#     start_coords: list[float] = [37.7749, -122.4194]  # Coordinates for San Francisco
#     folium_map = folium.Map(location=start_coords, zoom_start=12)

#     # Add a marker (example: a landmark in your community)
#     folium.Marker(location=[37.7749, -122.4194], popup="Golden Gate Bridge").add_to(
#         parent=folium_map
#     )

#     # Save the map as an HTML file
#     folium_map.save(outfile="templates/map.html")

#     return render_template(template_name_or_list="index.html")


# # Create a route to serve the map.html file
# @app.route("/map")
# def map_view():
#     return send_from_directory(directory="templates", path="map.html")


# if __name__ == "__main__":
#     app.run(debug=True)

# import folium
# from flask import Flask, render_template, send_from_directory

# app = Flask(__name__)


# @app.route("/")
# def index():
#     # Create a map centered on a specific location (e.g., San Francisco)
#     start_coords = [37.7749, -122.4194]  # Coordinates for San Francisco
#     folium_map = folium.Map(location=start_coords, zoom_start=12)

#     # Example locations
#     # locations = [
#     #     {"name": "Golden Gate Bridge", "coords": [37.8199, -122.4783]},
#     #     {"name": "Coit Tower", "coords": [37.8024, -122.4058]},
#     #     {"name": "Lombard Street", "coords": [37.8021, -122.4187]},
#     #     {"name": "Fisherman's Wharf", "coords": [37.8080, -122.4177]},
#     # ]

#     # Add markers for each location
#     # for loc in locations:
#     #     folium.Marker(location=loc["coords"], popup=loc["name"]).add_to(folium_map)

#     # Save the map as an HTML file
#     folium_map.save("templates/map.html")

#     return render_template("index.html")


# # Create a route to serve the map.html file
# @app.route("/map")
# def map_view():
#     return send_from_directory("templates", "map.html")


# if __name__ == "__main__":
#     app.run(debug=True)

import folium
from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    # Initialize a map centered on a specific location
    start_coords = [37.7749, -122.4194]  # San Francisco
    folium_map = folium.Map(location=start_coords, zoom_start=12)

    # Save the map to an HTML file
    folium_map.save("templates/map.html")

    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
