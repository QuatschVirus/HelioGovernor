from flask import Flask, render_template, request, redirect, url_for
from os import environ
from dotenv import load_dotenv

from flask_socketio import SocketIO

load_dotenv()

app = Flask(__name__)
app.config['SECRET'] = environ.get("APP_SECRET")
socketio = SocketIO(app, async_mode='gevent')


@app.route('/')
def index():
	return render_template('index.html')


if __name__ == '__main__':
	socketio.run(app, host='0.0.0.0', port=5000, debug=True)
