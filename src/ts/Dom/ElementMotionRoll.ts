import ChildElementVector from "../Vector/ChildElementVector";
import Motion from "../Vector/Motion";
import Vector from "../Vector/Vector";

export default class ElementMotionRoll
{
    private _element: HTMLElement;

    private _motion: Motion;

    private _totalDistance: Vector;

    private _remainingDistance: Vector;

    private _elementPosition: Vector;

    private _timeout?: number;

    constructor(element: HTMLElement, motion: Motion)
    {
        this._element = element;
        this._motion = motion;
        this._totalDistance = new Vector();
        this._remainingDistance = new Vector();
        this._elementPosition = new ChildElementVector(element);
        this._timeout = undefined;
    }

    public startRolling(): void
    {
        this._totalDistance = this._motion.distance.multiply(this._motion.velocity);
        this._remainingDistance = this._totalDistance.absolute();
        this._elementPosition = this._motion.currentPosition;
        this.startNextTimeout();
    }

    public stopRolling(): void
    {
        window.clearTimeout(this._timeout);
    }

    private continueRolling(): void
    {
        const distance = this.calculateNextRollDistance();
        this._remainingDistance = this._remainingDistance.subtract(distance.absolute());
        this._elementPosition = this._elementPosition.add(distance);
        this.setElementPosition();

        if (this._remainingDistance.x > 0 || this._remainingDistance.y > 0) {
            this.startNextTimeout();
        }
    }

    private calculateNextRollDistance(): Vector
    {
        let x = (this._remainingDistance.x / 20) + 1;
        let y = (this._remainingDistance.y / 20) + 1;
        x = this._totalDistance.x < 0 ? 0 - x : x;
        y = this._totalDistance.y < 0 ? 0 - y : y;
        return new Vector(x, y);
    }

    private setElementPosition(): void
    {
        //@TODO Implement configurable positioning bounds
        this._element.style.left = this._elementPosition.x + 'px';
        this._element.style.top = this._elementPosition.y + 'px';
    }

    private startNextTimeout(): void
    {
        this._timeout = window.setTimeout(() => {
            this.continueRolling();
        }, 10);
    }
}