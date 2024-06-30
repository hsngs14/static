document.addEventListener('DOMContentLoaded', () => {
    const btnPrimary = document.querySelector('.btn-primary');
    const btnSecondary = document.querySelector('.btn-secondary');
    const userList = document.getElementById('userList');

    function navigateTo(page) {
        window.location.href = page;
    }

    if (btnPrimary) {
        btnPrimary.addEventListener('click', () => {
            alert('Get Started clicked!');
        });
    }

    if (btnSecondary) {
        btnSecondary.addEventListener('click', () => {
            navigateTo('newpage.html');
        });
    }

    const users = [
        { username: 'user1', amount: 1000, rank: 1 },
        { username: 'user2', amount: 900, rank: 2 },
        { username: 'user3', amount: 800, rank: 3 },
        { username: 'user4', amount: 700, rank: 4 },
        { username: 'user5', amount: 600, rank: 5 },
        { username: 'user6', amount: 500, rank: 6 },
        { username: 'user7', amount: 400, rank: 7 },
        { username: 'user8', amount: 300, rank: 8 },
        { username: 'user9', amount: 200, rank: 9 },
        { username: 'user10', amount: 100, rank: 10 }
    ];

    if (userList) {
        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<span>${user.rank}. ${user.username}</span><span>${user.amount}</span>`;
            userList.appendChild(listItem);
        });

        // Display winner after 5 seconds
        setTimeout(() => {
            const winner = users[0]; // Assuming the first user is the winner
            const prize = (Math.random() * 1000).toFixed(2); // Random prize amount
            const winnerElement = document.getElementById('winner');
            winnerElement.innerHTML = `BOOOM! ${winner.username} wins $${prize}!`;
            winnerElement.style.display = 'block';
        }, 5000);
    }
});
