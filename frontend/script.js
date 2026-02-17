const chatContainer = document.getElementById('chat-container');
const chatViewport = document.getElementById('chat-viewport');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const inputForm = document.querySelector('.input-form');

// Auto-resize textarea
userInput.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
    if (this.value === '') {
        this.style.height = 'auto';
    }
});

// Handle enter key to send
userInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Handle form submission
inputForm.addEventListener('submit', function (e) {
    e.preventDefault();
    sendMessage();
});

sendButton.addEventListener('click', function (e) {
    e.preventDefault();
    sendMessage();
});

async function sendMessage() {
    const text = userInput.value.trim();
    if (text === '') return;

    // Add user message
    addMessage('user', text);
    userInput.value = '';
    userInput.style.height = 'auto';

    // Show typing indicator
    showTypingIndicator();
    scrollToBottom();

    try {
        const response = await fetch('http://127.0.0.1:5000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: text })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Remove typing indicator (it's the last child)
        removeTypingIndicator();

        if (data.error) {
            addMessage('bot', 'Error: ' + data.error);
        } else {
            addMessage('bot', data.response);
        }

    } catch (error) {
        console.error('Error:', error);
        removeTypingIndicator();
        addMessage('bot', 'Sorry, I could not connect to the server. Please ensure the backend is running.');
    }
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.classList.add('message', 'bot-message');

    typingDiv.innerHTML = `
        <div class="message-inner">
             <div class="message-avatar">
                <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path><path d="M12 6v6l4 2"></path></svg>
           </div>
            <div class="message-content">
                <p>Thinking...</p>
            </div>
        </div>
    `;

    chatContainer.appendChild(typingDiv);
    scrollToBottom();
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Mobile sidebar toggle
const menuBtn = document.querySelector('.menu-btn');
const sidebar = document.querySelector('.sidebar');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !menuBtn.contains(e.target) && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    }
});

// Load Chat History on Page Load
document.addEventListener('DOMContentLoaded', loadChatHistory);

async function loadChatHistory() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/conversations');
        if (!response.ok) {
            // If backend isn't running or db not connected, just fail silently or log
            console.log('Could not fetch history');
            return;
        }
        const conversations = await response.json();

        // Clear default example messages (optional, if you want a clean slate)
        // chatContainer.innerHTML = ''; 
        // For now, let's just append history or keep it simple. 
        // If we want to replace the hardcoded "Class 12..." examples, we'd clear.
        // But the user might want those as "Examples". 
        // Let's strictly append what's in the DB.

        // Actually, let's clear the middle "examples" if we have history, 
        // but the requirements were just "store data".
        // Let's append retrieved messages to the chat view.

        if (conversations.length > 0) {
            // Optional: Add a divider or just show them
            conversations.forEach(conv => {
                if (conv.user_message) addMessage('user', conv.user_message);
                if (conv.bot_response) addMessage('bot', conv.bot_response);
            });
        }

    } catch (error) {
        console.error('Error fetching history:', error);
    }
}