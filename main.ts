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
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Nyan), music.PlaybackMode.InBackground)
    ANIMATION_GAME()
    healthPoints += HEALTH_GAME_ADDITION
    music.stopMelody(MelodyStopOptions.Background)
    isIddle = true
})
function ANIMATION_STATUS (hp: number) {
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
function ANIMATION_GAME () {
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
    ANIMATION_HAPPY()
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
let healthPoints = 0
let HEALTH_SHAKE_DEDUCTION = 0
let HEALTH_GAME_ADDITION = 0
let HEALTH_EAT_ADDITION = 0
let HEALTH_MAX = 0
HEALTH_MAX = 10000
HEALTH_EAT_ADDITION = 60
HEALTH_GAME_ADDITION = 30
let HEALTH_SLEEP_ADDITION = 1
HEALTH_SHAKE_DEDUCTION = -30
let HEALTH_DEFAULT_DEDUCTION = -1
healthPoints = HEALTH_MAX
isIddle = false
music._playDefaultBackground(music.builtInPlayableMelody(Melodies.JumpUp), music.PlaybackMode.InBackground)
ANIMATION_WAKEUP()
isIddle = true
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
