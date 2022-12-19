:After the intial prompt, and all of the promts to give me the file contents, these were used to help me turn this into a product:
i've uploaded all of this to github, now, how do i locally test my extension ?

:following chatgpt's suggestions i did the following
sudo apt-get install redis-server # to install redis
redis-server # to run redis to confirm
redis-server --daemonize yes # after exiting the prev , to run redis as a background service
redis-cli # to check connectivity
    ping # resolting in PONG which means success

python server.py # to run the server
$ heading to chrome://extensions/ and selecting the extension dir after clicking the "Load Unpacked"

