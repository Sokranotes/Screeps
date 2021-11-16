import { errorMapper } from './modules/errorMapper'
import { Sokranotes } from './Sokranotes/Sokranotes';

import "./modules/超级移动优化"

export const loop = errorMapper(() => {
    Sokranotes()
    // for(let name in Memory.creeps) {
    //     if(!Game.creeps[name]) {
    //         delete Memory.creeps[name];
    //     }
    //     else{
    //         Game.creeps[name].suicide()
    //     }
    // }

    // for(let name in Memory.rooms) {
    //     delete Memory.rooms[name];
    // }
    // if (Game.flags.test){
    //     // todo
    //     for (let idx in Game.market.incomingTransactions){
    //         if (Game.market.incomingTransactions[idx].order == undefined){
    //             let tmp = Game.market.incomingTransactions[idx]
    //             console.log(tmp.time, tmp.sender.username, tmp.resourceType, tmp.amount, tmp.from, tmp.to, tmp.description)
    //         }
    //     }
    //     Game.flags.test.remove()
    // }
})