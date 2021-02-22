import { CONTROLS } from './GameCanvas.config';
import { ResourcesProps } from './ResourcesLoader';

export interface DrawCanvasProps {
    ctx: CanvasRenderingContext2D
    frameCount: number
    keyPress?: string | null
    shift?: number
    resources?: ResourcesProps
}

interface MoveOptionsProps {
    pressed: boolean
    count: number
    length: number
    height: number
}

interface MoveProps {
    [key: string]: MoveOptionsProps
}

export interface DrawCanvasPartProps extends DrawCanvasProps {}

export class GamePainter {
    move: MoveProps = {
        jump: {
            pressed: false,
            count: 0,
            length: 50,
            height: 0,
        },
        down: {
            pressed: false,
            count: 0,
            length: 20,
            height: 0,
        },
    };

    explosion = {
        shiftX: 0,
        shiftY: 0,
    };

    heroPositionXY = 210;

    heroSizes = {
        width: 75,
        height: 80,
    };

    constructor() {
        this.drawBg = this.drawBg.bind(this);
        this.drawHero = this.drawHero.bind(this);
        this.drawCanvas = this.drawCanvas.bind(this);
    }

    drawHeroMove(moveKey: string) {
        this.move[moveKey].count++;

        this.move[moveKey].height = 4 * this.move[moveKey].length * Math.sin(
            (Math.PI * this.move[moveKey].count) / this.move[moveKey].length,
        );
    }

    resetHeroMove(moveKey: string) {
        this.move[moveKey].count = 0;
        this.move[moveKey].pressed = false;
        this.move[moveKey].height = 0;
    }

    drawBg({
        ctx,
        resources,
        shift = 0,
    }: DrawCanvasPartProps) {
        if (!resources) return;

        const { bg5 } = resources;

        const calculateShift = shift % (bg5.width / 2);

        ctx.drawImage(bg5, 0 - calculateShift, 0, bg5.width, ctx.canvas.height);
    }

    drawLifes({
        ctx,
        resources,
    }: DrawCanvasPartProps) {
        if (!resources) return;

        const { life } = resources;

        for (let i = 1; i <= 3; i++) {
            ctx.drawImage(life, 50 * i - 20, 30, 40, 35);
        }
    }

    drawIdeas({
        ctx,
        resources,
    }: DrawCanvasPartProps) {
        if (!resources) return;

        const { idea } = resources;

        for (let i = 1; i <= 3; i++) {
            ctx.drawImage(idea, 50 * i - 20, 80, 40, 35);
        }
    }

    drawExplosion({
        ctx,
        resources,
    }: DrawCanvasPartProps) {
        if (!resources) return;

        const { explosion } = resources;

        /** Длина за вычетом 1 кадра. Полная длина 1500. */
        const spriteWidth = 1200;
        /** Длина кадра. */
        const frameWidth = 300;
        /** Высота за вычетом 1 кадра. Полная высота 1000. */
        const spriteHeight = 800;
        /** Высота кадра. */
        const frameHeight = 200;

        if (this.explosion.shiftX === spriteWidth) {
            this.explosion.shiftX = 0;
            this.explosion.shiftY += frameHeight;
        } else {
            this.explosion.shiftX += frameWidth;
        }

        if (this.explosion.shiftY === spriteHeight) {
            this.explosion.shiftY = 0;
        }

        ctx.drawImage(
            explosion,
            this.explosion.shiftX,
            this.explosion.shiftY,
            frameWidth,
            frameHeight,
            500,
            ctx.canvas.height - this.heroPositionXY,
            120,
            90,
        );
    }

    drawHero({ ctx, resources, keyPress }: DrawCanvasPartProps) {
        if (!resources) return;

        const { hero } = resources;

        if (keyPress === CONTROLS.jump) {
            if (!this.move.down.pressed) this.move.jump.pressed = true;
        }

        if (keyPress === CONTROLS.down) {
            if (!this.move.jump.pressed) this.move.down.pressed = true;
        }

        if (this.move.jump.pressed) {
            this.drawHeroMove('jump');
        }

        if (this.move.down.pressed) {
            this.drawHeroMove('down');
        }

        if (this.move.jump.count > this.move.jump.length) {
            this.resetHeroMove('jump');
        }

        if (this.move.down.count > this.move.down.length) {
            this.resetHeroMove('down');
        }

        const heroPositionY = (
            ctx.canvas.height - this.heroPositionXY - this.move.jump.height + this.move.down.height
        );

        ctx.drawImage(
            hero,
            this.heroPositionXY,
            heroPositionY,
            this.heroSizes.width,
            this.heroSizes.height,
        );
    }

    drawCanvas(options: DrawCanvasProps) {
        const { ctx, resources } = options;

        if (!resources) return;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.drawBg(options);
        this.drawHero(options);
        this.drawLifes(options);
        this.drawIdeas(options);
        this.drawExplosion(options);
    }
}
