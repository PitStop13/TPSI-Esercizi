$(document).ready(function () {
    const images = [
        'img/img0.png', 'img/img1.png', 'img/img2.png', 'img/img3.png',
        'img/img4.png', 'img/img5.png', 'img/img6.png', 'img/img7.png'
    ];
    let deck = [...images, ...images];
    let openedCards = [];
    let matchedPairs = 0;
    let time = 0;
    let timer;

    deck.sort(() => 0.5 - Math.random());

    deck.forEach((imgSrc) => {
        $('#game-board').append(`
            <div class="col-3 mb-3 d-flex justify-content-center">
                <div class="memory-card" data-img="${imgSrc}">
                    <img src="img/retro.jpg" alt="Memory Card" class="img-fluid">
                </div>
            </div>
        `);
    });

    timer = setInterval(() => {
        time++;
        $('#timer').text('Time: ' + time + 's');
    }, 1000);

    $('.memory-card').on('click', function () {
        let $this = $(this);

        if (openedCards.length === 2 || $this.hasClass('flipped')) return;

        $this.addClass('flipped');
        $this.find('img').attr('src', $this.data('img'));
        openedCards.push($this);

        if (openedCards.length === 2) {
            let card1 = openedCards[0];
            let card2 = openedCards[1];

            if (card1.data('img') === card2.data('img')) {
                openedCards = [];
                matchedPairs++;
                card1.addClass('matched');
                card2.addClass('matched');
                if (matchedPairs === images.length) {
                    clearInterval(timer);
                    setTimeout(() => alert('Hai vinto in ' + time + ' secondi!'), 500);
                }
            } else {
                // NO MATCH: Aspetta 1 secondo e girale di nuovo
                setTimeout(() => {
                    card1.removeClass('flipped').find('img').attr('src', 'img/retro.jpg');
                    card2.removeClass('flipped').find('img').attr('src', 'img/retro.jpg');
                    openedCards = [];
                }, 1000);
            }
        }
    });
});