export interface SoundsProps {
    [key: string]: GameSound
}

export class GameSound {
    sound: HTMLAudioElement;

    constructor(src: string, remote = false) {
        this.sound = document.createElement('audio');
        this.sound.src = src;
        this.sound.setAttribute('preload', 'auto');
        this.sound.setAttribute('controls', 'none');
        this.sound.style.display = remote ? 'block' : 'none';

        document.body.appendChild(this.sound);
    }

    play() {
        this.sound.play();
    }

    stop() {
        this.sound.pause();
    }

    remove() {
        this.sound.remove();
    }
}
