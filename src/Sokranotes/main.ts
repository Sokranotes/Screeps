import { errorMapper } from './modules/errorMapper'
import { mainSokranotes } from './Sokranotes/mainSokranotes';

import "./modules/超级移动优化"

export const loop = errorMapper(() => {
    mainSokranotes()
})