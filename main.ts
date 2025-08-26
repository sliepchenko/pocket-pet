class VirtualPet {
    static readonly HEALTH_MAX = 10000;
    static readonly HEALTH_SHAKE_DEDUCTION = -30;
    static readonly HEALTH_GAME_ADDITION = 30;
    static readonly HEALTH_EAT_ADDITION = 60;
    static readonly HEALTH_SLEEP_ADDITION = 1;
    static readonly HEALTH_DEFAULT_DEDUCTION = -1;

    private isSleep = false;
    private isDied = false;
    private isIdle = false;

    private healthPoints = 0;

    constructor() {
        this.healthPoints = VirtualPet.HEALTH_MAX;

        this.onWakeUp();

        input.onButtonPressed(Button.A, () => this.onGame());
        input.onButtonPressed(Button.AB, () => this.onStatus());

        input.onLogoEvent(TouchButtonEvent.Pressed, () => this.onFeed());

        input.onGesture(Gesture.Shake, () => this.onShake());

        loops.everyInterval(1000, () => this.onSleeping());
        loops.everyInterval(1000, () => this.onDying());
        loops.everyInterval(600000, () => this.onIdling());
    }

    private onWakeUp() {
        this.isIdle = false;

        Sounds.WAKEUP();
        Animations.WAKEUP();

        this.isIdle = true;
    }

    private onGame() {
        this.isIdle = false;

        Sounds.GAME();
        Animations.GAME();
        Sounds.STOP();

        basic.pause(1000);

        Animations.HAPPY();
        Sounds.HAPPY();

        this.healthPoints += VirtualPet.HEALTH_GAME_ADDITION;

        this.isIdle = true;
    }

    private onStatus() {
        this.isIdle = false;

        Animations.STATUS(this.healthPoints, VirtualPet.HEALTH_MAX);

        this.isIdle = true;
    }

    private onFeed() {
        this.isIdle = false;

        Sounds.EAT();
        Animations.EAT();

        this.healthPoints += VirtualPet.HEALTH_EAT_ADDITION;

        this.isIdle = true;
    }

    private onShake() {
        if (!this.isDied && this.isIdle) {
            this.isSleep = false;
            this.isIdle = false;

            Sounds.STOP();
            Sounds.SHAKE();
            Animations.SHAKE();
            basic.pause(3000);

            this.healthPoints += VirtualPet.HEALTH_SHAKE_DEDUCTION;

            this.isIdle = true;
        }
    }

    private onSleeping() {
        if (!this.isDied && this.isIdle) {
            if (input.lightLevel() <= 10) {
                this.isSleep = true;

                Animations.SLEEP();

                this.healthPoints += VirtualPet.HEALTH_SLEEP_ADDITION;
            } else {
                if (this.isSleep) {
                    Sounds.WAKEUP();
                    Animations.WAKEUP();

                    this.isSleep = false;
                }
            }
        }
    }

    private onDying() {
        if (!this.isDied && !this.isSleep) {
            this.healthPoints += VirtualPet.HEALTH_DEFAULT_DEDUCTION;

            if (this.healthPoints < 0) {
                this.isIdle = false;
                this.isDied = true;

                Sounds.DEAD();
                Animations.DEAD();
            }
        }
    }

    private onIdling() {
        if (!this.isDied && !this.isSleep) {
            this.isIdle = false;

            basic.pause(3000);
            Animations.LOOK();
            Animations.DEFAULT();
            basic.pause(2000);

            this.isIdle = true;
        }
    }
}

class Animations {
    static SLEEP() {
        basic.showLeds(`
            . # # # #
            . . . # .
            . . # . .
            . # # # #
            . . . . .
        `);
        basic.showLeds(`
            . . . . .
            # # # # .
            . . # . .
            . # . . .
            # # # # .
        `);
    }

    static HAPPY() {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            # . . . #
            . # # # .
        `);
        Animations.DEFAULT();
    }

    static GAME() {
        basic.showLeds(`
        . . . . .
        . # . . .
        . . . . .
        . . . . .
        # . . . .
        `);
        basic.showLeds(`
        . . . . .
        . # . . .
        . . . . .
        # . . . .
        # . . . .
        `);
        basic.showLeds(`
        . . . . .
        . # . . .
        # . . . .
        # . . . .
        # . . . .
        `);
        basic.showLeds(`
        . . . . .
        # # . . .
        # . . . .
        # . . . .
        . . . . .
        `);
        basic.showLeds(`
        . . . . .
        # # . . .
        # . . . .
        # . . # .
        . . . . .
        `);
        basic.showLeds(`
        . . . . .
        # # # . .
        # . . . .
        . . . # .
        . . . . .
        `);
        basic.showLeds(`
        . . . . .
        # # # # .
        . . . . .
        . . . # .
        . . . . .
        `);
        basic.showLeds(`
        . . . . .
        . # # # .
        . . . # .
        . . . # .
        . . . . .
        `);
        basic.showLeds(`
        . . . . #
        . . # # .
        . . . # .
        . . . # .
        . . . # .
        `);
        basic.showLeds(`
        . . . . #
        . . . # .
        . . . # .
        . . . # .
        . . . # #
        `);
        basic.showLeds(`
        . . . . #
        . . . . .
        . . . # .
        . . . # #
        . . . # #
        `);
        basic.showLeds(`
        . . . . #
        . . . . .
        . . . . #
        . . . # #
        . . . # #
        `);
        basic.showLeds(`
        . . . . #
        . . . . #
        . . . . #
        . . . . #
        . . . # #
        `);
        basic.showLeds(`
        . . . . #
        . . . . #
        . . . . #
        . . . . #
        . . . . #
        `);
        basic.showLeds(`
        . . . . #
        . . . . #
        . . . . #
        . . . . #
        . . . . .
        `);
        basic.showLeds(`
        . . . . #
        . . . . #
        . . . . #
        . . . . .
        . . . . .
        `);
        basic.showLeds(`
        . . . . #
        . . . . #
        . . . . .
        . . . . .
        . . . . .
        `);
        basic.showLeds(`
        . . . . #
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `);
        basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `);
        Animations.DEFAULT();
    }

    static EAT() {
        for (let index = 0; index < 2; index++) {
            basic.showLeds(`
                . # . # .
                . . . . .
                . # # # .
                . # . # .
                . . # . .
            `);
            Animations.DEFAULT();
        }
    }

    static SHAKE() {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            # # # # #
            # # # # #
        `);
        basic.pause(1000);
        Animations.DEFAULT();
    }

    static DEFAULT() {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            . # # # .
            . . . . .
        `);
    }

    static STATUS(hp: number, max: number) {
        const CELL_HP = max / 25;
        const REMAINDER_HP = hp % CELL_HP;
        const FILLED_CELLS = Math.floor(hp / CELL_HP);

        let cellIndex = 0;

        // Clear before drawing
        basic.clearScreen();

        for (let y = 0; y <= 4; y++) {
            for (let x = 0; x <= 4; x++) {
                cellIndex = x + y * 5;

                if (cellIndex < FILLED_CELLS) {
                    led.plotBrightness(x, y, 255);
                } else if (cellIndex == FILLED_CELLS && REMAINDER_HP > 0) {
                    led.plotBrightness(x, y, Math.floor(REMAINDER_HP / CELL_HP * 255));
                } else {
                    led.plotBrightness(x, y, 0);
                }
            }
        }

        // Keep drawing for a 2 sec before clearing
        basic.pause(2000);

        // Return to default animation
        Animations.DEFAULT();
    }

    static WAKEUP() {
        basic.showLeds(`
            . # . # .
            . . . . .
            # # # # #
            # . . . #
            . # # # .
        `);
        basic.pause(1000);
        Animations.DEFAULT();
    }

    static SAD() {
        basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            . # # # .
            # . . . #
        `);
        Animations.DEFAULT();
    }

    static DEAD() {
        basic.showLeds(`
            . # . # .
            # # . # #
            . . . . .
            . # # # .
            . # . # .
        `);
    }

    static LOOK() {
        basic.showLeds(`
            . . . . .
            . . # . #
            . . . . .
            . # # # .
            . . . . .
        `);
        basic.showLeds(`
            . . . . .
            # . # . .
            . . . . .
            . # # # .
            . . . . .
        `);
    }
}

class Sounds {
    static HAPPY() {
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerUp), music.PlaybackMode.InBackground);
    }

    static GAME() {
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Nyan), music.PlaybackMode.InBackground);
    }

    static EAT() {
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerUp), music.PlaybackMode.InBackground);
    }

    static SHAKE() {
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerDown), music.PlaybackMode.InBackground);
    }

    static WAKEUP() {
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.JumpUp), music.PlaybackMode.InBackground);
    }

    static SAD() {
    }

    static DEAD() {
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Dadadadum), music.PlaybackMode.InBackground);
    }

    static STOP() {
        music.stopMelody(MelodyStopOptions.Background);
    }
}

const pet = new VirtualPet();