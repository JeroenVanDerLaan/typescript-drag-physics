export default class Vector
{
    public readonly x: number;

    public readonly y: number;

    constructor(x: number = 0, y: number = 0)
    {
        this.x = x;
        this.y = y;
    }

    public add(vector: Vector): Vector
    {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    public subtract(vector: Vector): Vector
    {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    public multiply(vector: Vector): Vector
    {
        return new Vector(this.x * vector.x, this.y * vector.y);
    }

    public divide(vector: Vector): Vector
    {
        return new Vector(this.x / vector.x, this.y / vector.y);
    }

    public absolute(): Vector
    {
        return new Vector(Math.abs(this.x), Math.abs(this.y));
    }
}