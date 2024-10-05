from flask import Flask

from Bhoomi import main_app

app: Flask = main_app()

if __name__ == "__main__":
    app.run(debug=True)
