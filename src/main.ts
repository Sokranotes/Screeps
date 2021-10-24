// 引入外部依赖
import { errorMapper } from './modules/errorMapper'
import { mainSokranotes } from './Sokranotes/mainSokranotes';
import { mainUniversal } from './Universal/mainUniversal';



if (Game.flags.Appassionata){
    console.log(Game.time, 'Appassionata new push')
}
else{
    console.log(Game.time, 'Sokranotes new push')
}


export const loop = errorMapper(() => {
    if (Game.flags.Appassionata){
        mainUniversal()
    }
    else{
        mainSokranotes()
    }
})