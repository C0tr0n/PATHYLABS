document.addEventListener('DOMContentLoaded', function () {
    const smoothedLineCtx = document.getElementById('smoothedLineChart').getContext('2d');
    const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');

    const smoothedLineChart = new Chart(smoothedLineCtx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'New Activated Users',
                data: [10, 30, 20, 40, 35, 45, 30],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false,
                tension: 0.4
            },
                {
                    label: 'Returning Users',
                    data: [40, 25, 50, 45, 30, 35, 20],
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                    fill: false,
                    tension: 0.4
                }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `New Activated Users: ${context.parsed.y}`;
                        }
                    }
                }
            }
        }
    });

    const doughnutChart = new Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
            labels: ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5'],
            datasets: [{
                label: 'Product Distribution',
                data: [10, 20, 30, 25, 15],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += `${context.raw}`;
                            return label;
                        }
                    }
                }
            }
        }
    });



    const cardContainer = document.querySelector('.card-container');
    const cards = document.querySelectorAll('.card');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    let currentIndex = 0;

    function updateButtons() {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= Math.ceil(cards.length / 3) - 1;
    }

    function slideCards() {
        const cardWidth = cards[0].offsetWidth;
        cardContainer.style.transform = `translateX(-${currentIndex * cardWidth * 3}px)`;

        // Update small title based on currentIndex
        const smallTitle = document.querySelector('.small-title');
        if (currentIndex === 0) {
            smallTitle.textContent = 'Monitizing Solutions';
        } else if (currentIndex === 1) {
            smallTitle.textContent = 'Marketing Solutions';
        } 
    }

    prevButton.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
            slideCards();
            updateButtons();
        }
    });

    nextButton.addEventListener('click', function () {
        if (currentIndex < Math.ceil(cards.length / 3) - 1) {
            currentIndex++;
            slideCards();
            updateButtons();
        }
    });

    updateButtons();
});