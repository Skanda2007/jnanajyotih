document.addEventListener('DOMContentLoaded', () => {
    loadStats();
    loadConversations();
});

function loadStats() {
    // Placeholder for loading statistics
    const statsContainer = document.getElementById('stats-container');
    statsContainer.innerHTML = '<p>Statistics will be displayed here.</p>';
}

function loadConversations() {
    fetch('http://localhost:5000/api/conversations')
        .then(response => response.json())
        .then(data => {
            const conversationsContainer = document.getElementById('conversations-container');
            conversationsContainer.innerHTML = '';
            data.forEach(conversation => {
                const convoDiv = document.createElement('div');
                convoDiv.classList.add('conversation');
                convoDiv.innerHTML = `
                    <p><strong>User:</strong> ${conversation.user_message}</p>
                    <p><strong>Bot:</strong> ${conversation.bot_response}</p>
                `;
                conversationsContainer.appendChild(convoDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching conversations:', error);
        });
}