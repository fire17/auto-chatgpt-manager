:After the intial prompt, and all of the promts to give me the file contents, these were used to help me turn this into a product:
$ i've uploaded all of this to github, now, how do i locally test my extension ?

:following chatgpt's suggestions i did the following
sudo apt-get install redis-server # to install redis
redis-server # to run redis to confirm
redis-server --daemonize yes --requirepass mypassword # after exiting the prev , to run redis as a background service
redis-cli # to check connectivity
    ping # resolting in PONG which means success

python server.py # to run the server
: got error because the redis env was not setup
$ how to get REDIS_HOST', 'REDIS_PORT', and 'REDIS_PASSWORD' ? echo and save them to environment variables in one line :
export REDIS_HOST=localhost REDIS_PORT=6379 REDIS_PASSWORD=mypassword
python server.py # to run the server
: server is running on http://localhost:5000
: heading to chrome://extensions/ and selecting the extension dir after clicking the "Load Unpacked"
: extension is loaded
$ the extension is loaded, i see a few buttons , save load and share, but when i click on them nothing happens, and the server does not show any outputs. how do i debug my extension?  
: gives me suggestions...
tell me where exactly to edit the extension to show all the useful debugging information
: thread is dead, will export this repo as a big gist and post it back to the ai chatbot thread

