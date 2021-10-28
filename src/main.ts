// 引入外部依赖
import { errorMapper } from './modules/errorMapper'
import { mainSokranotes } from './Sokranotes/mainSokranotes';
import { mainUniversal } from './Universal/mainUniversal';
import "./modules/超级移动优化"

export const loop = errorMapper(() => {
    if (Game.shard.name == 'shard2'){
        if(Game.cpu.bucket == 10000) {
            Game.cpu.generatePixel();
        }
        return
    }
    if (Game.flags.Appassionata){
        if(Game.cpu.bucket == 10000) {
            Game.cpu.generatePixel();
        }
        mainUniversal()
    }
    else{
        mainSokranotes()
    }
    // if (Game.flags.test){
    //     // todo
    //     Game.flags.test.remove()
    // }
})