import { applySnapshot, getSnapshot, onSnapshot } from 'mobx-state-tree';
import GlobalStore from './todo';

var store = GlobalStore;


var states: any[] = [];
var currentFrame = 0

states.push(getSnapshot(store));

onSnapshot(store, snapshot => {

    
    if (currentFrame === states.length - 1) {
        currentFrame++
        states.push(snapshot)
        console.log(currentFrame, states)
    }
})

export function previousState() {
    if (currentFrame === 0) return

    --currentFrame
    applySnapshot(store, states[currentFrame]);
    states.splice(states.length - 1, 1);
    console.log(currentFrame, states)
}

export function nextState() {
    if (currentFrame === states.length - 1) return

    currentFrame++
    console.log(currentFrame, states[currentFrame])
    applySnapshot(store, states[currentFrame])
}