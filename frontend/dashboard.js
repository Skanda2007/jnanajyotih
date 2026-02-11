document.addEventListener('DOMContentLoaded', () => {
    loadUserProfile();
    loadConversationHistory();
});

function loadUserProfile() {
    // Placeholder for loading user profile
    const userProfileContainer = document.getElementById('user-profile');
    userProfileContainer.innerHTML = '<p>Your profile details will be displayed here.</p>';
}

function loadConversationHistory() {
    fetch('http://localhost:5000/api/conversations')
        .then(response => response.json())
        .then(data => {
            const historyContainer = document.getElementById('history-container');
            historyContainer.innerHTML = '';
            data.forEach(conversation => {
                const convoDiv = document.createElement('div');
                convoDiv.classList.add('conversation');
                convoDiv.innerHTML = `
                    <p><strong>User:</strong> ${conversation.user_message}</p>
                    <p><strong>Bot:</strong> ${conversation.bot_response}</p>
                `;
                historyContainer.appendChild(convoDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching conversation history:', error);
        });
}