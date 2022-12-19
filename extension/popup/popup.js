// Sends a message to the background script to save the chat contents
function saveChatContents() {
  const threadId = Date.now().toString();
  const isPublic = document.querySelector('.share-input').checked;
  chrome.runtime.sendMessage({ action: 'save', threadId: threadId, isPublic: isPublic });
}

// Sends a message to the background script to load the chat contents
function loadChatContents() {
  const threadId = window.prompt('Enter the thread ID:');
  if (threadId) {
    chrome.runtime.sendMessage({ action: 'load', threadId: threadId });
  }
}

// Sends a message to the background script to share the chat contents
function shareChatContents() {
  const threadId = window.prompt('Enter the thread ID:');
  if (threadId) {
    chrome.runtime.sendMessage({ action: 'share', threadId: threadId });
  }
}

// Add listeners to the buttons
document.querySelector('.save-button').addEventListener('click', saveChatContents);
document.querySelector('.load-button').addEventListener('click', loadChatContents);
document.querySelector('.share-button').addEventListener('click', shareChatContents);
