// Gaming
input.onButtonPressed(Button.A, function () {
    isIddle = false
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Nyan), music.PlaybackMode.InBackground)
    basic.showLeds(`
        . . . . .
        . # . . .
        . . . . .
        . . . . .
        # . . . .
        `)
    basic.showLeds(`
        . . . . .
        . # . . .
        . . . . .
        # . . . .
        # . . . .
        `)
    basic.showLeds(`
        . . . . .
        . # . . .
        # . . . .
        # . . . .
        # . . . .
        `)
    basic.showLeds(`
        . . . . .
        # # . . .
        # . . . .
        # . . . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        # # . . .
        # . . . .
        # . . # .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        # # # . .
        # . . . .
        . . . # .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        # # # # .
        . . . . .
        . . . # .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . # # # .
        . . . # .
        . . . # .
        . . . . .
        `)
    basic.showLeds(`
        . . . . #
        . . # # .
        . . . # .
        . . . # .
        . . . # .
        `)
    basic.showLeds(`
        . . . . #
        . . . # .
        . . . # .
        . . . # .
        . . . # #
        `)
    basic.showLeds(`
        . . . . #
        . . . . .
        . . . # .
        . . . # #
        . . . # #
        `)
    basic.showLeds(`
        . . . . #
        . . . . .
        . . . . #
        . . . # #
        . . . # #
        `)
    basic.showLeds(`
        . . . . #
        . . . . #
        . . . . #
        . . . . #
        . . . # #
        `)
    basic.showLeds(`
        . . . . #
        . . . . #
        . . . . #
        . . . . #
        . . . . #
        `)
    basic.showLeds(`
        . . . . #
        . . . . #
        . . . . #
        . . . . #
        . . . . .
        `)
    basic.showLeds(`
        . . . . #
        . . . . #
        . . . . #
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . #
        . . . . #
        . . . . .
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . #
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    healthPoints += HEALTH_GAME_ADDITION
    music.stopMelody(MelodyStopOptions.Background)
    isIddle = true
})
// Status
input.onButtonPressed(Button.AB, function () {
    isIddle = false
    displayHealth(healthPoints)
    isIddle = true
})
// Abusing
input.onGesture(Gesture.Shake, function () {
    if (isDied == false && isIddle == true) {
        led.stopAnimation()
        isSleep = false
        isIddle = false
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerDown), music.PlaybackMode.InBackground)
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            # # # # #
            # # # # #
            `)
        basic.pause(1000)
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            . # # # .
            . . . . .
            `)
        basic.pause(10000)
        healthPoints += HEALTH_SHAKE_DEDUCTION
        isIddle = true
    }
})
// Feeding
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    isIddle = false
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerUp), music.PlaybackMode.InBackground)
    for (let index = 0; index < 2; index++) {
        basic.showLeds(`
            . # . # .
            . . . . .
            . # # # .
            . # . # .
            . . # . .
            `)
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            . # # # .
            . . . . .
            `)
    }
    healthPoints += HEALTH_EAT_ADDITION
    isIddle = true
})
function displayHealth (hp: number) {
    healthPerCell = HEALTH_MAX / 25
    fullCells = Math.floor(hp / healthPerCell)
    remainder = hp % healthPerCell
    basic.clearScreen()
    for (let y = 0; y <= 4; y++) {
        for (let x = 0; x <= 4; x++) {
            cellIndex = x + y * 5
            if (cellIndex < fullCells) {
                led.plotBrightness(x, y, 255)
            } else if (cellIndex == fullCells && remainder > 0) {
                led.plotBrightness(x, y, Math.floor(remainder / healthPerCell * 255))
            } else {
                led.plotBrightness(x, y, 0)
            }
        }
    }
    basic.pause(2000)
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        . # # # .
        . . . . .
        `)
}
let cellIndex = 0
let remainder = 0
let fullCells = 0
let healthPerCell = 0
let isSleep = false
let isDied = false
let isIddle = false
let healthPoints = 0
let HEALTH_SHAKE_DEDUCTION = 0
let HEALTH_GAME_ADDITION = 0
let HEALTH_EAT_ADDITION = 0
let HEALTH_MAX = 0
let maxBrightness = 0
HEALTH_MAX = 10000
HEALTH_EAT_ADDITION = 60
HEALTH_GAME_ADDITION = 30
let HEALTH_SLEEP_ADDITION = 1
HEALTH_SHAKE_DEDUCTION = -30
let HEALTH_DEFAULT_DEDUCTION = -1
healthPoints = HEALTH_MAX
isIddle = false
music._playDefaultBackground(music.builtInPlayableMelody(Melodies.JumpUp), music.PlaybackMode.InBackground)
basic.showLeds(`
    . # . # .
    . . . . .
    # # # # #
    # . . . #
    . # # # .
    `)
basic.pause(1000)
basic.showLeds(`
    . . . . .
    . # . # .
    . . . . .
    . # # # .
    . . . . .
    `)
isIddle = true
// Dying
loops.everyInterval(1000, function () {
    if (isDied == false && isSleep == false) {
        healthPoints += HEALTH_DEFAULT_DEDUCTION
        if (healthPoints < 0) {
            basic.showLeds(`
                . . . . .
                . # . # .
                . . . . .
                . # # # .
                # . . . #
                `)
            music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Dadadadum), music.PlaybackMode.InBackground)
            isDied = true
        }
    }
})
// Iddling
loops.everyInterval(600000, function () {
    if (isDied == false && isSleep == false) {
        if (isIddle == false) {
            basic.showLeds(`
                . . . . .
                . # . # .
                . . . . .
                . # # # .
                . . . . .
                `)
        } else {
            basic.showLeds(`
                . . . . .
                . # . # .
                . . . . .
                . # # # .
                . . . . .
                `)
            basic.pause(10000)
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
            basic.showLeds(`
                . . . . .
                . # . # .
                . . . . .
                . # # # .
                . . . . .
                `)
            basic.pause(2000)
            basic.showLeds(`
                . . . . .
                # # . # #
                . . . . .
                . . # . .
                . . . . .
                `)
            basic.pause(2000)
            basic.showLeds(`
                . . . . .
                . # . # .
                . . . . .
                . # # # .
                . . . . .
                `)
        }
    }
})
// Sleeping
loops.everyInterval(500, function () {
    if (isDied == false && isIddle == true) {
        if (input.lightLevel() <= 10) {
            isSleep = true
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
            healthPoints += HEALTH_SLEEP_ADDITION
        } else {
            if (isSleep == true) {
                basic.showLeds(`
                    . # . # .
                    . . . . .
                    . # # # .
                    . # . # .
                    . # # # .
                    `)
                music.play(music.builtinPlayableSoundEffect(soundExpression.yawn), music.PlaybackMode.UntilDone)
                basic.showLeds(`
                    . . . . .
                    . # . # .
                    . . . . .
                    . # # # .
                    . . . . .
                    `)
                isSleep = false
            }
        }
    }
})
