import { AppLifecycleCallbacks } from "./HoHoFramework/types"

const generatePixel = function (): void {
    if (Game.cpu.bucket == 10000) {
        Game.cpu.generatePixel()
    }
}

export const pixelManager: AppLifecycleCallbacks = {
    tickEnd: generatePixel
}