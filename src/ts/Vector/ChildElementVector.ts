import Vector from "./Vector";

export default class ChildElementVector extends Vector
{
    public constructor(element: HTMLElement)
    {
        super(element.offsetLeft, element.offsetTop);
    }
}