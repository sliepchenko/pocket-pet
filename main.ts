function ANIMATION_SLEEP () {
    basic.showLeds(`
        . # # # #
        . . . # .
        . . # . .
        . # # # #
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        # # # # .
        . . # . .
        . # . . .
        # # # # .
        `)
}
function ANIMATION_HAPPY () {
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        # . . . #
        . # # # .
        `)
    ANIMATION_DEFAULT()
}
function ANIMATION_EAT () {
    for (let index = 0; index < 2; index++) {
        basic.showLeds(`
            . # . # .
            . . . . .
            . # # # .
            . # . # .
            . . # . .
            `)
        ANIMATION_DEFAULT()
    }
}
function ANIMATION_SHAKE () {
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        # # # # #
        # # # # #
        `)
    basic.pause(1000)
    ANIMATION_DEFAULT()
    basic.pause(3000)
}
function ANIMATION_DEFAULT () {
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        . # # # .
        . . . . .
        `)
}
// Gaming
input.onButtonPressed(Button.A, function () {
    isIddle = false
    if (wormGame.isPaused()) {
        basic.clearScreen()
        wormGame.reset()
wormGame.resume()
    } else {
        wormGame.turnLeft();
    }
})
function ANIMATION_STATUS (hp: number) {
    healthPerCell = HEALTH_MAX / 25
    fullCells = Math.floor(hp / healthPerCell)
    remainder = hp % healthPerCell
    basic.clearScreen()
    for (let y2 = 0; y2 <= 4; y2++) {
        for (let x2 = 0; x2 <= 4; x2++) {
            cellIndex = x2 + y2 * 5
            if (cellIndex < fullCells) {
                led.plotBrightness(x2, y2, 255)
            } else if (cellIndex == fullCells && remainder > 0) {
                led.plotBrightness(x2, y2, Math.floor(remainder / healthPerCell * 255))
            } else {
                led.plotBrightness(x2, y2, 0)
            }
        }
    }
    basic.pause(2000)
    ANIMATION_DEFAULT()
}
function ANIMATION_WAKEUP () {
    basic.showLeds(`
        . # . # .
        . . . . .
        # # # # #
        # . . . #
        . # # # .
        `)
    basic.pause(1000)
    ANIMATION_DEFAULT()
}
// Status
input.onButtonPressed(Button.AB, function () {
    isIddle = false
    ANIMATION_STATUS(healthPoints)
    isIddle = true
})
function ANIMATION_SAD () {
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        . # # # .
        # . . . #
        `)
    ANIMATION_DEFAULT()
}
// Gaming
input.onButtonPressed(Button.B, function () {
    if (wormGame.isRunning()) {
        wormGame.turnRight();
    }
})
// Abusing
input.onGesture(Gesture.Shake, function () {
    if (isDied == false && isIddle == true) {
        isSleep = false
        isIddle = false
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerDown), music.PlaybackMode.InBackground)
        ANIMATION_SHAKE()
        healthPoints += HEALTH_SHAKE_DEDUCTION
        isIddle = true
    }
})
function ANIMATION_DEAD () {
    basic.showLeds(`
        . # . # .
        # # . # #
        . . . . .
        . # # # .
        . # . # .
        `)
}
// Feeding
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    isIddle = false
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerUp), music.PlaybackMode.InBackground)
    ANIMATION_EAT()
    healthPoints += HEALTH_EAT_ADDITION
    isIddle = true
})
function ANIMATION_LOOK () {
    basic.showLeds(`
        . . . . .
        . . # . #
        . . . . .
        . # # # .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        # . # . .
        . . . . .
        . # # # .
        . . . . .
        `)
}
let isSleep = false
let isDied = false
let cellIndex = 0
let remainder = 0
let fullCells = 0
let healthPerCell = 0
let isIddle = false
let HEALTH_SHAKE_DEDUCTION = 0
let HEALTH_EAT_ADDITION = 0
let HEALTH_MAX = 0
let healthPoints = 0
class WormGame {
    static DIRECTIONS = [
        { x: 0, y: -1 }, // up
        { x: 1, y: 0 },  // right
        { x: 0, y: 1 },  // down
        { x: -1, y: 0 }  // left
    ];

    private worm: { x: number, y: number }[] = [];
    private target: { x: number, y: number } = { x: 0, y: 0 };
    private direction: number = 0; // 0: up, 1: right, 2: down, 3: left

    private score: number = 0;
    private isGamePaused: boolean = false;
    private isGameOver: boolean = false;
    private onGameOverCallback: Function;

    constructor() {
        this.reset();

        loops.everyInterval(500, () => this.tick());
    }

    pause() {
        this.isGamePaused = true;
    }

    resume() {
        this.isGamePaused = false;
    }

    reset() {
        // Start worm at a bottom left, length 3, moving up
        this.worm = [
            { x: 0, y: 5 },
            { x: 0, y: 6 },
            { x: 0, y: 7 },
        ];
        this.direction = 0;

        this.spawnTarget();
    }

    onGameOver(callback: Function) {
        this.onGameOverCallback = callback;
    }

    turnLeft() {
        if (this.isGameOver || this.isGamePaused) return;

        this.direction = (this.direction + 3) % 4;
    }

    turnRight() {
        if (this.isGameOver || this.isGamePaused) return;

        this.direction = (this.direction + 1) % 4;
    }

    isRunning() {
        return !this.isGamePaused;
    }

    isPaused() {
        return this.isGamePaused;
    }

    private tick() {
        if (this.isGameOver || this.isGamePaused) return;

        // Calculate new head position
        const head = this.worm[0];
        let newX = (head.x + WormGame.DIRECTIONS[this.direction].x + 5) % 5;
        let newY = (head.y + WormGame.DIRECTIONS[this.direction].y + 5) % 5;

        // Check collision with self
        if (this.worm.some(segment => segment.x === newX && segment.y === newY)) {
            this.isGameOver = true;
            this.isGamePaused = true;

            this.onGameOverCallback(this.score);

            return;
        }

        // Add a new head
        this.worm.unshift({ x: newX, y: newY });

        // Check if target eaten
        if (newX === this.target.x && newY === this.target.y) {
            this.score++;
            this.spawnTarget();
        } else {
            // Remove tail
            this.worm.pop();
        }

        this.draw();
    }

    private spawnTarget() {
        let valid = false;

        while (!valid) {
            const x = Math.randomRange(0, 4);
            const y = Math.randomRange(0, 4);

            if (!this.worm.some(segment => segment.x === x && segment.y === y)) {
                this.target = { x, y };
                valid = true;
            }
        }
    }

    private draw() {
        basic.clearScreen();

        // Draw worm
        for (const segment of this.worm) {
            led.plot(segment.x, segment.y);
        }

        // Draw target
        led.plotBrightness(this.target.x, this.target.y, 100);
    }
}
let wormGame = new WormGame()
wormGame.pause();
HEALTH_MAX = 10000
HEALTH_EAT_ADDITION = 60
let HEALTH_GAME_ADDITION = 30
let HEALTH_SLEEP_ADDITION = 1
HEALTH_SHAKE_DEDUCTION = -30
let HEALTH_DEFAULT_DEDUCTION = -1
healthPoints = HEALTH_MAX
isIddle = false
music._playDefaultBackground(music.builtInPlayableMelody(Melodies.JumpUp), music.PlaybackMode.InBackground)
ANIMATION_WAKEUP()
isIddle = true
wormGame.onGameOver(function (score: number) {
    led.stopAnimation()
    basic.clearScreen()
    basic.showNumber(score)
    basic.pause(3000)
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerUp), music.PlaybackMode.InBackground)
    ANIMATION_HAPPY();
    healthPoints += HEALTH_GAME_ADDITION * score;
})
// Sleeping
loops.everyInterval(1000, function () {
    if (isDied == false && isIddle == true) {
        if (input.lightLevel() <= 10) {
            isSleep = true
            isIddle = false
            ANIMATION_SLEEP()
            healthPoints += HEALTH_SLEEP_ADDITION
            isIddle = true
        } else {
            if (isSleep == true) {
                isIddle = false
                music._playDefaultBackground(music.builtInPlayableMelody(Melodies.JumpUp), music.PlaybackMode.InBackground)
                ANIMATION_WAKEUP()
                isSleep = false
                isIddle = false
            }
        }
    }
})
// Dying
loops.everyInterval(1000, function () {
    if (isDied == false && isSleep == false) {
        healthPoints += HEALTH_DEFAULT_DEDUCTION
        if (healthPoints < 0) {
            music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Dadadadum), music.PlaybackMode.InBackground)
            ANIMATION_DEAD()
            isDied = true
            isIddle = false
        }
    }
})
// Iddling
loops.everyInterval(60000, function () {
    if (isDied == false && isSleep == false) {
        if (isIddle == false) {
            ANIMATION_DEFAULT()
        } else {
            ANIMATION_LOOK()
            ANIMATION_DEFAULT()
            basic.pause(2000)
        }
    }
})
