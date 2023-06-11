import math

# Game.rooms["W12N15"].find(FIND_STRUCTURES, {filter: s => s.structureType === STRUCTURE_WALL || (s.structureType === STRUCTURE_RAMPART && !s.my)}).forEach(w => w.destroy())
# Game.rooms["W12N15"].find(FIND_STRUCTURES, {filter: s => !s.my}).forEach(w => w.destroy())

# 挂单
# Game.market.createOrder({type: ORDER_SELL, resourceType: RESOURCE_ENERGY, price: 100000, totalAmount: 1, roomName: "W1N1"});
# Game.market.createOrder({type: ORDER_BUY, resourceType: PIXEL, price: 0.001, totalAmount: 500});
# Game.market.deal('62bf0946ed98fd87eda6574c', 2000);
# Game.market.deal('62e64d92061438023297c5a6', 10000);
# Game.market.createOrder({type: ORDER_BUY, resourceType: RESOURCE_ENERGY, price: 0.001, totalAmount: 300000, roomName: "W1N1"});
# Game.market.changeOrderPrice("6231b0122a7a9f518b7ac9fe", 2.62)
# Game.rooms['W47S14'].terminal.send(RESOURCE_ENERGY, 20000, 'W41S11', 'free')
# Game.rooms['W12N15'].terminal.send(RESOURCE_ENERGY, 100000, 'W11N19', 'free')
# Game.rooms['W11N19'].terminal.send(RESOURCE_ENERGY, 50000, 'W14N12', 'free')


# python src/calcTransactionCost.py

import os

def main():
    os.system('cls')
    prices = [2.393, 2.8, 2.3, 6.500, 16.937, 3, 4.012, 3.647, 3.737, 4.033, 0.783, 4.289, 3]
    distances = [21, 25, 54, 20, 6, 10, 15, 15, 6, 18, 37, 56, 13]

    amount = 100000

    if (len(distances) == 1):
        distances = [distances] * len(prices)

    print('---------------------------卖--------------------------')
    print('距离:\t', end='')
    for idx in range(len(prices)):
        print(round(distances[idx], 4), end='\t')
    print()

    # print('运费:', cost)
    print('出价:\t', end='')
    for idx in range(len(prices)):
        print(round(prices[idx], 4), end='\t')
    print()
    # print('减去运输费之后:')
    print('实价:\t', end='')
    for idx in range(len(prices)):
        cost = math.ceil(amount * (1 - pow(math.e, (-1*(distances[idx])/30))))
        print(round((prices[idx]*amount)/(cost + amount), 4), end='\t')
    print()
    
    # print('差价:', price - (price*amount)/(cost + amount))
    # print('占比:', (price - (price*amount)/(cost + amount))/price)

    print('---------------------------买--------------------------')

    print('距离:\t', end='')
    for idx in range(len(prices)):
        print(round(distances[idx], 4), end='\t')
    print()
    # print('运费:', cost)
    print('出价:\t', end='')
    for idx in range(len(prices)):
        print(round(prices[idx], 4), end='\t')
    print()
    # print('减去运输费之后:')
    # print('实价:', ((price*amount)/(amount-cost)))

    print('实价:\t', end='')
    for idx in range(len(prices)):
        cost = math.ceil(amount * (1 - pow(math.e, (-1*(distances[idx])/30))))
        print(round((prices[idx]*amount)/(amount - cost), 4), end='\t')
    print()

if __name__ == "__main__":
    main()

# python src/calcTransactionCost.py

# first order


# Game.market.deal('61cd485b4215337cf7ad2d3f', 30056, 'W47S14');
# Game.rooms['W47S14'].terminal.send(RESOURCE_ENERGY, 20000, 'W41S11', 'free')

# Game.market.deal('62bf0946ed98fd87eda6574c', 10000, 'W14N12');


# 卖的实际价格
# 3.374/(1+(Game.market.calcTransactionCost(10000, 'W41S11', 'W33S21')/10000))

# 买的实际价格
# 3.374/(1-(Game.market.calcTransactionCost(10000, 'W41S11', 'W33S21')/10000))
