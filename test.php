<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>Build a Full Featured Tinder Like Carousel in Vanilla JavaScript</title>
    <style>
        html,
        body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }

        #board {
            width: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;
            background-color: rgb(245, 247, 250);
        }

        .card {
            width: 320px;
            height: 320px;
            position: absolute;
            top: 50%;
            left: 50%;
            border-radius: 1%;
            box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
            background-color: white;
            transform: translateX(-50%) translateY(-50%) scale(0.95);
        }
    </style>
</head>

<body>
    <div id="board"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js"></script>
    <script>
        /* LikeCarousel (c) 2019 Simone P.M. github.com/simonepm - Licensed MIT */

        class Carousel {

            constructor(element) {

                this.board = element

                // add first two cards programmatically
                this.push()
                this.push()

                // handle gestures
                this.handle()

            }

            handle() {

                // list all cards
                this.cards = this.board.querySelectorAll('.card')

                // get top card
                this.topCard = this.cards[this.cards.length - 1]

                // get next card
                this.nextCard = this.cards[this.cards.length - 2]

                // if at least one card is present
                if (this.cards.length > 0) {

                    // set default top card position and scale
                    this.topCard.style.transform =
                        'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)'

                    // destroy previous Hammer instance, if present
                    if (this.hammer) this.hammer.destroy()

                    // listen for tap and pan gestures on top card
                    this.hammer = new Hammer(this.topCard)
                    this.hammer.add(new Hammer.Tap())
                    this.hammer.add(new Hammer.Pan({
                        position: Hammer.position_ALL,
                        threshold: 0
                    }))

                    // pass events data to custom callbacks
                    this.hammer.on('tap', (e) => {
                        this.onTap(e)
                    })
                    this.hammer.on('pan', (e) => {
                        this.onPan(e)
                    })

                }

            }

            onTap(e) {

                // get finger position on top card
                let propX = (e.center.x - e.target.getBoundingClientRect().left) / e.target.clientWidth

                // get rotation degrees around Y axis (+/- 15) based on finger position
                let rotateY = 15 * (propX < 0.05 ? -1 : 1)

                // enable transform transition
                this.topCard.style.transition = 'transform 100ms ease-out'

                // apply rotation around Y axis
                this.topCard.style.transform =
                    'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(' + rotateY + 'deg) scale(1)'

                // wait for transition end
                setTimeout(() => {
                    // reset transform properties
                    this.topCard.style.transform =
                        'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)'
                }, 100)

            }

            onPan(e) {

                if (!this.isPanning) {

                    this.isPanning = true

                    // remove transition properties
                    this.topCard.style.transition = null
                    if (this.nextCard) this.nextCard.style.transition = null

                    // get top card coordinates in pixels
                    let style = window.getComputedStyle(this.topCard)
                    let mx = style.transform.match(/^matrix\((.+)\)$/)
                    this.startPosX = mx ? parseFloat(mx[1].split(', ')[4]) : 0
                    this.startPosY = mx ? parseFloat(mx[1].split(', ')[5]) : 0

                    // get top card bounds
                    let bounds = this.topCard.getBoundingClientRect()

                    // get finger position on top card, top (1) or bottom (-1)
                    this.isDraggingFrom =
                        (e.center.y - bounds.top) > this.topCard.clientHeight / 2 ? -1 : 1

                }

                // get new coordinates
                let posX = e.deltaX + this.startPosX
                let posY = e.deltaY + this.startPosY

                // get ratio between swiped pixels and the axes
                let propX = e.deltaX / this.board.clientWidth
                let propY = e.deltaY / this.board.clientHeight

                // get swipe direction, left (-1) or right (1)
                let dirX = e.deltaX < 0 ? -1 : 1

                // get degrees of rotation, between 0 and +/- 45
                let deg = this.isDraggingFrom * dirX * Math.abs(propX) * 45

                // get scale ratio, between .95 and 1
                let scale = (95 + (5 * Math.abs(propX))) / 100

                // move and rotate top card
                this.topCard.style.transform =
                    'translateX(' + posX + 'px) translateY(' + posY + 'px) rotate(' + deg + 'deg) rotateY(0deg) scale(1)'

                // scale up next card
                if (this.nextCard) this.nextCard.style.transform =
                    'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(' + scale + ')'

                if (e.isFinal) {

                    this.isPanning = false

                    let successful = false

                    // set back transition properties
                    this.topCard.style.transition = 'transform 200ms ease-out'
                    if (this.nextCard) this.nextCard.style.transition = 'transform 100ms linear'

                    // check threshold and movement direction
                    if (propX > 0.25 && e.direction == Hammer.DIRECTION_RIGHT) {

                        successful = true
                        // get right border position
                        posX = this.board.clientWidth

                    } else if (propX < -0.25 && e.direction == Hammer.DIRECTION_LEFT) {

                        successful = true
                        // get left border position
                        posX = -(this.board.clientWidth + this.topCard.clientWidth)

                    } else if (propY < -0.25 && e.direction == Hammer.DIRECTION_UP) {

                        successful = true
                        // get top border position
                        posY = -(this.board.clientHeight + this.topCard.clientHeight)

                    }

                    if (successful) {

                        // throw card in the chosen direction
                        this.topCard.style.transform =
                            'translateX(' + posX + 'px) translateY(' + posY + 'px) rotate(' + deg + 'deg)'

                        // wait transition end
                        setTimeout(() => {
                            // remove swiped card
                            this.board.removeChild(this.topCard)
                            // add new card
                            this.push()
                            // handle gestures on new top card
                            this.handle()
                        }, 200)

                    } else {

                        // reset cards position and size
                        this.topCard.style.transform =
                            'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)'
                        if (this.nextCard) this.nextCard.style.transform =
                            'translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(0.95)'

                    }

                }

            }

            push() {

                let card = document.createElement('div')

                card.classList.add('card')

                card.style.backgroundImage =
                    "url('https://picsum.photos/320/320/?random=" + Math.round(Math.random() * 1000000) + "')"

                this.board.insertBefore(card, this.board.firstChild)

            }

        }

        let board = document.querySelector('#board')

        let carousel = new Carousel(board)
    </script>
</body>

</html>