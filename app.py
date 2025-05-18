from flask import Flask, render_template, request, redirect, url_for
from os import environ
from dotenv import load_dotenv

from flask_socketio import SocketIO
from flask import abort

load_dotenv()

app = Flask(__name__)
app.config['SECRET'] = environ.get("APP_SECRET")
socketio = SocketIO(app, async_mode='gevent')

ALLOWED_IP = environ.get("ALLOWED_IP")

@app.before_request
def restrict_ip():
	if ALLOWED_IP:
		if request.remote_addr != ALLOWED_IP:
			abort(403)


@app.route('/')
def index():
	return render_template('index.html')


if __name__ == '__main__':
	socketio.run(app, host='0.0.0.0', port=5000, debug=True)
