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

export interface DrawCanvasPartProps extends DrawCanvasProps {
    resources: ResourcesProps
}

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
        const bg = resources.bg5;
        const calculateShift = shift % (bg.width / 2);

        ctx.drawImage(bg, 0 - calculateShift, 0, bg.width, ctx.canvas.height);
    }

    drawHero({ ctx, resources, keyPress }: DrawCanvasPartProps) {
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

    drawCanvas({
        ctx,
        resources,
        ...restOptions
    }: DrawCanvasProps) {
        if (!resources) return;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.drawBg({
            ctx,
            resources,
            ...restOptions,
        });
        this.drawHero({
            ctx,
            resources,
            ...restOptions,
        });
    }
}
