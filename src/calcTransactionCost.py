import math

# 挂单
# Game.market.createOrder({type: ORDER_SELL, resourceType: RESOURCE_ENERGY, price: 100000, totalAmount: 1, roomName: "W1N1"});


def main():
    distance = 6
    price = 3.33

    amount = 100000

    cost = math.ceil(amount * (1 - pow(math.e, (-1*(distance)/30))))

    print('#######卖')
    print('距离：', distance)
    print('运费：', cost)
    print('出价：', price)
    print('减去运输费之后:')
    print('实价：', (price*amount)/(cost + amount))
    print('差价：', price - (price*amount)/(cost + amount))
    print('占比：', (price - (price*amount)/(cost + amount))/price)

    print('#######买')
    print('距离：', distance)
    print('运费：', cost)
    print('出价：', price)
    print('减去运输费之后:')
    print('实价：', ((price*amount)/(amount-cost)))

if __name__ == "__main__":
    main()

# python src/calcTransactionCost.py

# first order


# Game.market.deal('619314ffc1d596dd34a3b3b5', 16991, 'W47S14');


# 32909026 Nemophilist power 9900 W41S41 W47S14 null
# 32908983 Nemophilist power 8900 W41S41 W47S14 null
# 32896855 Sokranotes energy 40789 W48S12 W47S14 free
# 32691511 mikumikumiku XZHO2 1361 W44S2 W47S14 null
# 32691465 mikumikumiku XLHO2 4100 W44S2 W47S14 null
# 32668410 superbitch XKHO2 20000 E39S51 W47S14 null
# 32668279 superbitch LH2O 20000 E39S51 W47S14 null
# 32667972 RayAidas essence 5 E13N8 W47S14 null
# 32667958 RayAidas machine 5 E13N8 W47S14 null
# 32610114 Sokranotes energy 100000 W47S14 W48S12 t
# 31853423 MiHack energy 262551 W48S18 W47S14 W48S18