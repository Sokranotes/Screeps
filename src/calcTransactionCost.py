import math

# Game.rooms["W12N15"].find(FIND_STRUCTURES, {filter: s => s.structureType === STRUCTURE_WALL || (s.structureType === STRUCTURE_RAMPART && !s.my)}).forEach(w => w.destroy())
# Game.rooms["W12N15"].find(FIND_STRUCTURES, {filter: s => !s.my}).forEach(w => w.destroy())

# 挂单
# Game.market.createOrder({type: ORDER_SELL, resourceType: RESOURCE_ENERGY, price: 100000, totalAmount: 1, roomName: "W1N1"});
# Game.market.createOrder({type: ORDER_BUY, resourceType: PIXEL, price: 0.001, totalAmount: 500});
# Game.market.deal('61cdb24c4215334c4fd2a1e5', 2000);
# Game.market.createOrder({type: ORDER_BUY, resourceType: RESOURCE_ENERGY, price: 0.001, totalAmount: 300000, roomName: "W1N1"});
# Game.market.changeOrderPrice("6231b0122a7a9f518b7ac9fe", 2.62)

def main():
    distance =20
    price = 0.7

    amount = 100000

    cost = math.ceil(amount * (1 - pow(math.e, (-1*(distance)/30))))

    print('#######卖')
    print('距离:', distance)
    print('运费:', cost)
    print('出价:', price)
    print('减去运输费之后:')
    print('实价:', (price*amount)/(cost + amount))
    print('差价:', price - (price*amount)/(cost + amount))
    print('占比:', (price - (price*amount)/(cost + amount))/price)

    print('#######买')
    print('距离:', distance)
    print('运费:', cost)
    print('出价:', price)
    print('减去运输费之后:')
    print('实价:', ((price*amount)/(amount-cost)))

if __name__ == "__main__":
    main()

# python src/calcTransactionCost.py

# first order


# Game.market.deal('61cd485b4215337cf7ad2d3f', 30056, 'W47S14');
# Game.rooms['W47S14'].terminal.send(RESOURCE_ENERGY, 20000, 'W41S11', 'free')

# 卖的实际价格
# 3.374/(1+(Game.market.calcTransactionCost(10000, 'W41S11', 'W33S21')/10000))

# 买的实际价格
# 3.374/(1-(Game.market.calcTransactionCost(10000, 'W41S11', 'W33S21')/10000))
