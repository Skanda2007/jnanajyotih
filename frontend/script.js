document.getElementById('send-button').addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== '') {
        addMessage('user', userInput);
        document.getElementById('user-input').value = '';

        // Simulate bot response
        setTimeout(() => {
            addMessage('bot', 'This is a placeholder response from Sanskrit AI.');
        }, 1000);
    }
});

function addMessage(sender, text) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = text;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}