import { createApp } from "./HoHoFramework"
import { roomRunner } from "./roomRunner"
import { creepRunner } from "./creepRunner"
import { init } from "./init/init"
import { pixelManager } from "./pixelManager"
import { mountExtension } from "./mountExtension"
/**
 * 主运行函数
 */
// const app = createApp({ roomRunner, creepRunner, powerCreepRunner})
const app = createApp({ roomRunner, creepRunner })

app.on(init)                           // Memory初始化和扩展挂载

app.on(pixelManager)                   //搓像素

app.on(mountExtension())               // 原型拓展挂载

//  app.on(crossShardAppPlugin)        // 跨shard相关

//  app.on(creepRecycleAndStatistic)   // 爬虫记忆回收及数目统计

//  app.on(squadWarMoudle)             // 四人小队战斗框架
 
//  app.on(ResourceDispatchDelayManager) // 资源调度超时管理器

//  app.on(pixelManager)                 // 搓像素

//  app.on(layoutVisualMoudle)           // 房间布局可视化

//  app.on(towerDataVisual)              // 防御塔数据可视化

//  app.on(statMoudle)           //  数据统计模块

export const loop = app.run