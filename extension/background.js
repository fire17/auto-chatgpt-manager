// Extracts the messages from the conversation HTML
function extractMessages(html) {
  const messages = [];

  // Find all the messages in the HTML
  const messageRegex = /<div class="message(?: user| bot)">([\s\S]*?)<\/div>/g;
  let match;
  while ((match = messageRegex.exec(html)) !== null) {
    const message = match[1];

    // Extract the speaker and text from the message
    const speakerRegex = /<div class="speaker">(.*?)<\/div>/;
    const speakerMatch = speakerRegex.exec(message);
    const speaker = speakerMatch[1];

    const textRegex = /<div class="text">(.*?)<\/div>/;
    const textMatch = textRegex.exec(message);
    const text = textMatch[1];

    // Add the message to the array
    messages.push({ speaker: speaker, text: text });
  }

  return messages;
}

// Sends a message to the content script to get the chat contents
function getChatContents(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'save' }, function(response) {
      callback(response.chatContents);
    });
  });
}

// Sends a message to the content script to load the chat contents
function setChatContents(chatContents) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'load', chatContents: chatContents }, function(response) {});
  });
}

// Sends a request to the server to save the chat contents
function saveChatContents(thread_id, chat_contents, is_public) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:5000/save');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function() {
    if (xhr.status === 204) {
      console.log('Chat contents saved');
    }
    else {
      console.error('Error saving chat contents');
    }
  };
  xhr.send(`thread_id=${encodeURIComponent(thread_id)}&chat_contents=${encodeURIComponent(chat_contents)}&is_public=${encodeURIComponent(is_public)}`);
}

// Sends a request to the server to load the chat contents
function loadChatContents(thread_id, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `http://localhost:5000/load/${encodeURIComponent(thread_id)}`);
  xhr.onload = function() {
    if (xhr.status === 200) {
     
callback(JSON.parse(xhr.responseText).chat_contents);
    }
    else {
      console.error('Error loading chat contents');
    }
  };
  xhr.send();
}

// Sends a request to the server to get the chat contents for a given thread ID
function shareChatContents(thread_id) {
  window.open(`http://localhost:5000/share/${encodeURIComponent(thread_id)}`, '_blank');
}

// Listens for messages from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.action) {
    case 'save':
      getChatContents(function(chatContents) {
        const messages = extractMessages(chatContents);
        console.log('Saving chat contents:', messages);

        // Save the chat contents to the server
        saveChatContents(request.threadId, chatContents, request.isPublic);
      });
      break;
    case 'load':
      console.log('Loading chat contents for thread ID:', request.threadId);

      // Load the chat contents from the server
      loadChatContents(request.threadId, function(chatContents) {
        console.log('Loaded chat contents:', chatContents);

        // Set the chat contents in the current tab
        setChatContents(chatContents);
      });
      break;
    case 'share':
      console.log('Sharing chat contents for thread ID:', request.threadId);

      // Share the chat contents on the server
      shareChatContents(request.threadId);
      break;
  }
});
