import ElementMotionRoll from "./Dom/ElementMotionRoll";
import ChildElementVector from "./Vector/ChildElementVector";
import Motion from "./Vector/Motion";
import Vector from "./Vector/Vector";

const container = document.getElementById('container');
const control = document.getElementById('control');

let motion: Motion | undefined;
let roll: ElementMotionRoll | undefined;

function main(): void
{
    if (null === container) {
        throw new Error('Failed to find container element #container');
    }
    if (null === control) {
        throw new Error('Failed to find control element #control');
    }
    control.addEventListener('mousedown', (event: MouseEvent) => {
        if (undefined !== roll) {
            roll.stopRolling();
        }
        const startingPosition = new ChildElementVector(control);
        const targetPosition = new Vector(event.pageX, event.pageY)
        motion = new Motion(startingPosition, targetPosition);
        roll = new ElementMotionRoll(control, motion);
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
        if (undefined !== roll) {
            roll.startRolling();
        }
        motion = undefined;
        roll = undefined;
    });
    control.addEventListener('mouseleave', () => {
        if (undefined === motion) {
            return;
        }
        if (undefined !== roll) {
            roll.startRolling();
        }
        motion = undefined;
        roll = undefined;
    });
}

export default main;