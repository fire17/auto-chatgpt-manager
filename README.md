A chrome extension (+Server) that allows you to save history of your ChatGPT theads, share them, or Use them as macros
The server is hosted on Vercel and allows new users to register and login using OAuth, with their google and github accounts 

:This repo was generated using chatGPT and is actively maintained by it: 

:The current dir of the project

:The following prompts are used:
"""
There is a website that gives access to an amazing ai chatbot via a chat interface. It's really good but its UX lacks a couple of things, primarily, each session with the ai is a "Thread" with a certian life time. Until the give full user history management I would like to make a free opensource solution to make somethings better.
Write me a python server and a chrome extension that will help me do that. The extension will allow me to export the chat contents, save them locally as an .md file, or sync them to my user history (on the server). The server should store, and sync users data with the client of the extension. Each "Thread" gets an id. The server should have a route that for a given thread id (in the url) it will return a static html page that will show a representation of the chat. This will be used by the extension that adds a Share button to the current thread or another one from the history. This share button will open a new tab, with the server domain url, followed by /share/{thread_id}. When a user shares a thread, he can set if its publicly available, or only private to him when he logs in . The server should manage all the necessary data. Use Redis for the db. The extension also has the ability to turn one or several user prompts into macros. The extension should This is a platform and should allow new users to register. include the latest OAuth, google and github easy signup and login.
"""
