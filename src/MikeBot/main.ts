import { createApp } from "./HoHoFramework"

const app = createApp({ roomRunner, creepRunner, powerCreepRunner})

export const loop = app.run