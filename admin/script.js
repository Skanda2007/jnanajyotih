document.addEventListener('DOMContentLoaded', () => {
    loadStats();
    loadRecentPayments();
});

function loadStats() {
    const stats = [
        { title: 'Team Payments', value: '$5,839' },
        { title: 'Savings', value: '$5,839' },
        { title: 'Income Statistics', value: 'Graph Placeholder' }
    ];

    const statsContainer = document.querySelector('.stats');
    statsContainer.innerHTML = '';

    stats.forEach(stat => {
        const statCard = document.createElement('div');
        statCard.classList.add('stat-card');
        statCard.innerHTML = `
            <h3>${stat.title}</h3>
            <p>${stat.value}</p>
        `;
        statsContainer.appendChild(statCard);
    });
}

function loadRecentPayments() {
    const payments = [
        { name: 'Emma Ryan', amount: '$4,623', status: 'Pending', date: 'Feb 10th, 2023' },
        { name: 'Adrian Dorne', amount: '$3,127', status: 'Completed', date: 'Feb 9th, 2023' },
        { name: 'Rosanne Hills', amount: '$2,790', status: 'Pending', date: 'Feb 8th, 2023' }
    ];

    const paymentsTable = document.querySelector('.recent-payments tbody');
    paymentsTable.innerHTML = '';

    payments.forEach(payment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${payment.name}</td>
            <td>${payment.amount}</td>
            <td>${payment.status}</td>
            <td>${payment.date}</td>
        `;
        paymentsTable.appendChild(row);
    });
}