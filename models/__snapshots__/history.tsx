import { applySnapshot, getSnapshot, onSnapshot } from 'mobx-state-tree';
import GlobalStore from '../todo';

var store = GlobalStore;


var states: any[] = [];
var undoneStates: any[] = [];
var currentFrame = 0
var currentFrameUndone = 0

states.push(getSnapshot(store));

onSnapshot(store, snapshot => {
    if (currentFrame === states.length - 1) {
        currentFrame++
        states.push(snapshot)
    }
})

export function previousState() {
    if (currentFrame === 0) return

    --currentFrame
    applySnapshot(store, states[currentFrame]);
    
    undoneStates.unshift(states[currentFrame]);

    states.splice(states.length - 1, 1);

}
