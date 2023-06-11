import { random } from "lodash"


// {"createdTimestamp":1647850352490,"type":"buy","amount":66000,"remainingAmount":66000,"resourceType":"energy","price":3.11,"roomName":"E19S21","created":36842413,"id":"623833709da05e63d14087ad"}
export const sell_energy = function(roomName: string, interval: number = 77 + random(0, 10, false), storage_limit: number = undefined, terminal_limit: number = undefined){
    if (Game.rooms[roomName]){
        if (Game.rooms[roomName].controller){
            if (Game.rooms[roomName].controller.my){
                if (Game.rooms[roomName].controller.level != 8){
                    return
                }
            }
        }
    }
    if (Game.time % interval == 0 || Game.flags.show_sell_price != undefined){
        if (storage_limit == undefined) storage_limit = global.storage_limit == undefined ? 300000 : global.storage_limit
        if (terminal_limit == undefined) terminal_limit = global.terminal_limit == undefined ? 50000 : global.terminal_limit
        let room = Game.rooms[roomName]
        if (room.storage && room.terminal){
            if (!(room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > storage_limit && room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > terminal_limit)){
                if (Game.flags.show_sell_price == undefined){
                    return
                }
            }

            let avgPrice = 0
            let stddevPrice = 0
            let sell_avg_rate = 1 // 高于均价这个百分比的订单才会被选中
            let f_sell_avg_rate = 0.95 // 高于均价这个百分比的订单才会被选中，好友有优惠
            
            // let history = Game.market.getHistory(RESOURCE_ENERGY)
            // let historyAvgPrice = 0
            // let historyAvgStddevPrice = 0
            // for (let i = 0; i < history.length; i++){
            //     historyAvgPrice += history[i].avgPrice
            //     historyAvgStddevPrice += history[i].stddevPrice
            // }
            // historyAvgPrice = historyAvgPrice / history.length
            // historyAvgStddevPrice = historyAvgStddevPrice / history.length
            // if (history[history.length - 1].volume > history[history.length - 2].volume*0.2){
            //     avgPrice = history[history.length - 1].avgPrice
            //     stddevPrice = history[history.length - 1].stddevPrice
            // }
            // else{
            //     historyAvgPrice = (historyAvgPrice*history.length - history[history.length - 1].avgPrice) / (history.length - 1)
            //     avgPrice = history[history.length - 2].avgPrice
            //     stddevPrice = history[history.length - 2].stddevPrice
            // }
            // if (stddevPrice > 0.1*avgPrice){ // 修成方差，均价和方差决定最终成交价格的底线。
            //     stddevPrice = 0.1*avgPrice
            // }
            // // 市场出现大幅度降价
            // if (avgPrice < 0.9*historyAvgPrice){
            //     avgPrice = 0.95*historyAvgPrice // 修正均价，防止恶意降价

            //     sell_avg_rate = 0.95
            //     f_sell_avg_rate = 0.9
            //     stddevPrice = 0.15*avgPrice
            // }



            // 是否开启手动指定
            let flag = true
            if (flag){
                sell_avg_rate = 1.2
                f_sell_avg_rate = 1
                stddevPrice = 0
            }

            let buy_orders: orderData[] = Game.market.getAllOrders({type: ORDER_BUY, resourceType: RESOURCE_ENERGY})
            let buysortedOrders: orderData[] = buy_orders.sort((a, b)=>a.price - b.price).reverse()
            let sell_orders: orderData[] = Game.market.getAllOrders({type: ORDER_BUY, resourceType: RESOURCE_ENERGY})
            let sellsortedOrders: orderData[] = sell_orders.sort((a, b)=>a.price - b.price)
            avgPrice = (buysortedOrders[0].price + sellsortedOrders[0].price) / 2
            
            // console.log(roomName, 'avgPrice', avgPrice, 'stddevPrice', stddevPrice)

            if (global.group_friends_rooms == undefined) global.group_friends_rooms = new Set([])
            let orders: orderData[] = Game.market.getAllOrders({type: ORDER_BUY, resourceType: RESOURCE_ENERGY}).filter(order=>((order.price>sell_avg_rate*avgPrice && order.amount >= 10000) || (order=>order.price>f_sell_avg_rate*avgPrice && order.amount >= 10000 && global.group_friends_rooms.has(order.roomName))))
            // console.log(JSON.stringify(orders[0]))
            for (let order of orders){
                order.price = order.price * (100/(Game.market.calcTransactionCost(100, roomName, order.roomName) + 100))
            }
            // 均价太低的不卖
            orders = orders.filter(order=>(order.price>avgPrice-stddevPrice))
            if (Game.flags.show_sell_price != undefined){
                Game.flags.show_sell_price.remove()
                console.log('now avgPrice:', avgPrice, 'avgPrice:', avgPrice, 'stddevPrice:', stddevPrice, "sell_avg_rate:", sell_avg_rate, "sell_avg_rate*avgPrice:", sell_avg_rate*avgPrice, 'f_sell_avg_rate*avgPrice:', f_sell_avg_rate*avgPrice, 'avgPrice-stddevPrice:', avgPrice-stddevPrice)
            }
            if (room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > storage_limit && room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > terminal_limit){
                let sortedOrders: orderData[] = orders.sort((a, b)=>a.price - b.price).reverse()

                let capacity: number = room.terminal.store.getCapacity(RESOURCE_ENERGY)
                for (let order of sortedOrders){
                    if (capacity <= 10000) break
                    if (order.amount == 0) continue
                    let cost = Game.market.calcTransactionCost(order.amount, roomName, order.roomName)
                    if (order.amount > capacity) {
                        if (cost + order.amount > capacity){
                            order.amount = Math.floor(capacity*(order.amount/(order.amount+cost)))
                        }
                    }
                    let code = Game.market.deal(order.id, order.amount, roomName)
                    if (code == OK){
                        capacity = capacity - order.amount
                        console.log(roomName, '\tsell energy by profit:', order.price.toFixed(4), '\tamount:', order.amount, '\t', order.roomName, '\tcost:', cost, '\tincoming:', (order.price*order.amount).toFixed(0), '\tavgPrice:', avgPrice.toFixed(4), '±', stddevPrice.toFixed(4), (avgPrice-stddevPrice).toFixed(4))
                    }
                    else if (code == ERR_INVALID_ARGS) {
                        order.amount = Math.floor(2/3*order.amount)
                        code = Game.market.deal(order.id, order.amount, roomName)
                        if (code == OK){
                            capacity = capacity - order.amount
                            console.log(roomName, '\tsell energy by profit:', order.price.toFixed(4), 'amount:', order.amount, '\t', order.roomName, '\tcost:', cost, '\tincoming:', (order.price*order.amount).toFixed(0), '\tavgPrice:', avgPrice.toFixed(4), '±', stddevPrice.toFixed(4), (avgPrice-stddevPrice).toFixed(4))
                        }
                        else if (code == ERR_INVALID_ARGS) continue
                        else if (code == ERR_FULL) return
                        else if (code == ERR_TIRED) return
                        else if (code == ERR_NOT_ENOUGH_RESOURCES) return
                        else if (code == ERR_NOT_OWNER) return
                    }
                    else if (code == ERR_FULL) return
                    else if (code == ERR_TIRED) return
                    else if (code == ERR_NOT_ENOUGH_RESOURCES) return
                    else if (code == ERR_NOT_OWNER) return
                }
            }
        }
    }
}