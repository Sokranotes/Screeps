// 引入外部依赖
import { errorMapper } from './modules/errorMapper'
import { mainSokranotes } from './Sokranotes/mainSokranotes';
import { mainUniversal } from './Universal/mainUniversal';

export const loop = errorMapper(() => {
    if (Game.flags.Appassionata){
        mainUniversal()
    }
    else{
        mainSokranotes()
    }
})