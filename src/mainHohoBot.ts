import { errorMapper } from './modules/errorMapper'

export const loop = errorMapper(() => {
    if (Game.flags.GlennGould){
        if(Game.cpu.bucket == 10000) {
            Game.cpu.generatePixel();
        }
    }
})