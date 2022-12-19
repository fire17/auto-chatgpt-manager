// Listens for messages from the background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.action) {
    case 'save':
      console.log('Saving chat contents');

      // Get the chat contents from the page
      const chatContents = document.documentElement.outerHTML;
      sendResponse({ chatContents: chatContents });
      break;
    case 'load':
      console.log('Loading chat contents');

      // Replace the page with the chat contents
      document.open();
      document.write(request.chatContents);
      document.close();
      break;
  }
});
