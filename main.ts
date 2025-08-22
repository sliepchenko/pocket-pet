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
    healthPoints += 30
    music.stopMelody(MelodyStopOptions.Background)
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
        healthPoints += -5
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
    healthPoints += 60
    isIddle = true
})
let isSleep = false
let isDied = false
let isIddle = false
let healthPoints = 10000
isIddle = true
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
// Dying
loops.everyInterval(1000, function () {
    if (isDied == false && isSleep == false) {
        healthPoints += -1
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
            healthPoints += 1
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
