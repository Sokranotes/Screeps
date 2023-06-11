import { AppLifecycleCallbacks } from "./HoHoFramework/types"

const mountAll = function () {
    
    console.log('拓展挂载完成')
}

export const mountExtension = function (): AppLifecycleCallbacks {
    mountAll()
    return {
        born: () => {}
    }
}