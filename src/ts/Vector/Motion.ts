import Vector from "./Vector";

export default class Motion
{
    private _startingPosition: Vector;

    private _currentPosition: Vector;

    private _targetPosition: Vector;

    private _startingTime: number;

    private _updateTime: number;

    public constructor(startingPosition: Vector, targetPosition: Vector)
    {
        this._startingPosition = startingPosition;
        this._currentPosition = startingPosition;
        this._targetPosition = targetPosition;
        this._startingTime = (new Date()).valueOf();
        this._updateTime = (new Date()).valueOf();
    }

    public get currentPosition(): Vector
    {
        return this._currentPosition;
    }

    public update(newTargetPosition: Vector): void
    {
        const distance = newTargetPosition.subtract(this._targetPosition);
        this._currentPosition = this._currentPosition.add(distance);
        this._targetPosition = newTargetPosition;
        this._updateTime = (new Date()).valueOf();
    }

    public get distance(): Vector
    {
        return this._currentPosition.subtract(this._startingPosition);
    }

    public get velocity(): Vector
    {
        const distance = this.distance.absolute();
        const time = this.timeSinceStart;
        const x = distance.x / time;
        const y = distance.y / time;
        return new Vector(x, y);
    }

    public get timeSinceStart(): number
    {
        return (new Date()).valueOf() - this._startingTime;
    }

    public get timeSinceUpdate(): number
    {
        return (new Date()).valueOf() - this._updateTime;
    }
}