import os
import redis

from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Connect to the Redis database
redis_client = redis.Redis(host=os.environ['REDIS_HOST'],
                           port=os.environ['REDIS_PORT'],
                           password=os.environ['REDIS_PASSWORD'])

# Route to save the chat contents
@app.route('/save', methods=['POST'])
def save_chat():
  thread_id = request.form['thread_id']
  chat_contents = request.form['chat_contents']
  is_public = request.form['is_public'] == 'true'

  # Save the chat contents to the database
  redis_client.hset(thread_id, 'chat_contents', chat_contents)
  redis_client.hset(thread_id, 'is_public', is_public)

  return redirect(url_for('index'))

# Route to load the chat contents
@app.route('/load', methods=['POST'])
def load_chat():
  thread_id = request.form['thread_id']

  # Load the chat contents from the database
  chat_contents = redis_client.hget(thread_id, 'chat_contents')

  return chat_contents
  
# Route to share the chat contents
@app.route('/share/<thread_id>')
def share_chat(thread_id):
  # Load the chat contents and visibility from the database
  chat_contents = redis_client.hget(thread_id, 'chat_contents')
  is_public = redis_client.hget(thread_id, 'is_public') == b'true'

  if is_public:
    # Parse the chat contents into an array of messages
    messages = []
    for line in chat_contents.decode('utf-8').split('\n'):
      speaker, text = line.split(':', 1)
      messages.append({'speaker': speaker, 'text': text})

    # Render the chat thread template
    return render_template('thread.html', messages=messages)
  else:
    # Return an error message if the chat is not public
    return 'This chat is private and cannot be shared.'


# Route to display the home page
@app.route('/')
def index():
  return 'Welcome to the chat server!'

if __name__ == '__main__':
  app.run()
