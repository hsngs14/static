document.addEventListener('DOMContentLoaded', () => {
    function navigateTo(page) {
        window.location.href = page;
    }

    const messageList = document.getElementById('messageList');

    if (messageList) {
        const messages = [
            { username: 'user1', unread: 5, preview: 'Hey, how are you?' },
            { username: 'user2', unread: 3, preview: 'Can we meet tomorrow?' },
            { username: 'user3', unread: 2, preview: 'Don\'t forget the meeting at 3 PM.' },
            { username: 'user4', unread: 1, preview: 'Happy Birthday!' },
            { username: 'user5', unread: 6, preview: 'Your order has been shipped.' },
            { username: 'user6', unread: 4, preview: 'Let\'s catch up over coffee.' },
            { username: 'user7', unread: 8, preview: 'New project updates are available.' },
            { username: 'user8', unread: 7, preview: 'Congratulations on your promotion!' },
            { username: 'user9', unread: 5, preview: 'Your appointment is confirmed.' },
            { username: 'user10', unread: 3, preview: 'Welcome to the team!' }
        ];

        messages.forEach(message => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div class="user-info">
                    <span class="user-name">${message.username}</span>
                    <span class="unread-messages">${message.unread} unread messages</span>
                    <span class="message-preview">${message.preview}</span>
                </div>`;
            messageList.appendChild(listItem);
        });
    }
});
