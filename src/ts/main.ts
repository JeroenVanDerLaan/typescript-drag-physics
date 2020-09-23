import ChildElementVector from "./Vector/ChildElementVector";
import Motion from "./Vector/Motion";
import Vector from "./Vector/Vector";

const container = document.getElementById('container');
const control = document.getElementById('control');

let motion: Motion | undefined;
let timeout: number | undefined;

function main(): void
{
    if (null === container) {
        throw new Error('Failed to find container element #container');
    }
    if (null === control) {
        throw new Error('Failed to find control element #control');
    }
    control.addEventListener('mousedown', (event: MouseEvent) => {
        window.clearTimeout(timeout);
        const startingPosition = new ChildElementVector(control);
        const targetPosition = new Vector(event.pageX, event.pageY)
        motion = new Motion(startingPosition, targetPosition);
    });
    control.addEventListener('mousemove', (event: MouseEvent) => {
        if (undefined === motion) {
            return;
        }
        const newTargetPosition = new Vector(event.pageX, event.pageY);
        motion.update(newTargetPosition);
        control.style.left = motion.currentPosition.x + 'px';
        control.style.top = motion.currentPosition.y + 'px';
    });
    control.addEventListener('mouseup', () => {
        if (undefined === motion) {
            return;
        }
        startRolling(control, motion);
        motion = undefined;
    });
    control.addEventListener('mouseleave', () => {
        if (undefined === motion) {
            return;
        }
        startRolling(control, motion);
        motion = undefined;
    });
}

function startRolling(element: HTMLElement, motion: Motion): void
{
    const rollDistance = motion.distance.multiply(motion.velocity);
    let remainingDistance = rollDistance.absolute();
    let currentPosition = motion.currentPosition;

    function continueRolling(): void
    {
        let x = (remainingDistance.x / 20) + 1;
        let y = (remainingDistance.y / 20) + 1;
        x = rollDistance.x < 0 ? 0 - x : x;
        y = rollDistance.y < 0 ? 0 - y : y;

        const distance = new Vector(x, y);
        remainingDistance = remainingDistance.subtract(distance.absolute());
        currentPosition = currentPosition.add(distance);

        element.style.left = currentPosition.x + 'px';
        element.style.top = currentPosition.y + 'px';

        if (currentPosition.x > 0 || currentPosition.y > 0) {
            timeout = window.setTimeout(continueRolling, 10);
        }
    }

    timeout = window.setTimeout(continueRolling, 10);
}

export default main;