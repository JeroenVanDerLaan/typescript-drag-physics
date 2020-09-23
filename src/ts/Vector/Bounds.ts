import Vector from "./Vector";

export default class Bounds
{
    public readonly min: Vector;

    public readonly max: Vector;

    constructor(min: Vector, max: Vector)
    {
        this.min = min;
        this.max = max;
    }
}