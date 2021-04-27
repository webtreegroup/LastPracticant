export interface SoundsProps {
    [key: string]: GameSound
}

export interface GameSoundConstructorProps {
    autoplay?: boolean
    remote?: boolean
}

export class GameSound {
    sound: HTMLAudioElement;

    constructor(src: string, { remote = false, autoplay = false } = {} as GameSoundConstructorProps) {
        this.sound = document.createElement('audio');
        this.sound.src = src;
        this.sound.setAttribute('preload', 'auto');
        this.sound.setAttribute('controls', 'none');
        this.sound.autoplay = autoplay;
        this.sound.style.display = remote ? 'block' : 'none';

        document.body.appendChild(this.sound);
    }

    play() {
        this.sound.play();
    }

    stop() {
        this.sound.pause();
    }

    reload() {
        this.sound.load();
    }

    trigger() {
        this.reload();
        this.play();
    }

    change(src: string) {
        this.sound.src = src;
        this.reload();
        this.play();
    }

    remove() {
        this.sound.remove();
    }
}
