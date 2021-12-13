import math

# 挂单
# Game.market.createOrder({type: ORDER_SELL, resourceType: RESOURCE_ENERGY, price: 100000, totalAmount: 1, roomName: "W1N1"});
# Game.market.createOrder({type: ORDER_BUY, resourceType: PIXEL, price: 0.001, totalAmount: 500});
# Game.market.deal('61b16f06ebc38e038fa8c5ba', 1900);

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


# Game.market.deal('619e599afed6578c0788eb8e', 30056, 'W47S14');
# Game.rooms['W47S14'].terminal.send(RESOURCE_ENERGY, 20000, 'W41S11', 'free')

# 卖的实际价格
# 3.374/(1+(Game.market.calcTransactionCost(10000, 'W41S11', 'W33S21')/10000))

# 买的实际价格
# 3.374/(1-(Game.market.calcTransactionCost(10000, 'W41S11', 'W33S21')/10000))


 
# [下午7:26:24][shard3]incoming
# [下午7:26:24][shard3]33380975 Sokranotes energy 100000 W47S14 W48S12 free
# [下午7:26:24][shard3]33363442 Sokranotes energy 100000 W47S14 W48S12 free
# [下午7:26:24][shard3]33202938 Sokranotes energy 50000 W47S14 W48S12 free
# [下午7:26:24][shard3]33134369 Sokranotes energy 50000 W47S14 W48S12 free
# [下午7:26:24][shard3]32909026 Nemophilist power 9900 W41S41 W47S14 null
# [下午7:26:24][shard3]32908983 Nemophilist power 8900 W41S41 W47S14 null
# [下午7:26:24][shard3]32896855 Sokranotes energy 40789 W48S12 W47S14 free
# [下午7:26:24][shard3]32691511 mikumikumiku XZHO2 1361 W44S2 W47S14 null
# [下午7:26:24][shard3]32691465 mikumikumiku XLHO2 4100 W44S2 W47S14 null
# [下午7:26:24][shard3]32668410 superbitch XKHO2 20000 E39S51 W47S14 null
# [下午7:26:24][shard3]32668279 superbitch LH2O 20000 E39S51 W47S14 null
# [下午7:26:24][shard3]32667972 RayAidas essence 5 E13N8 W47S14 null
# [下午7:26:24][shard3]32667958 RayAidas machine 5 E13N8 W47S14 null
# [下午7:26:24][shard3]32610114 Sokranotes energy 100000 W47S14 W48S12 t
# [下午7:26:24][shard3]31853423 MiHack energy 262551 W48S18 W47S14 W48S18

# outgoing

# [下午1:58:38][shard3]33604693 Sokranotes energy 14165 W47S14 W48S12 free
# [下午1:58:38][shard3]33604590 Sokranotes energy 50000 W47S14 W48S12 free
# [下午1:58:38][shard3]33602090 Sokranotes energy 50000 W47S14 W48S12 free
# [下午1:58:38][shard3]33599690 Sokranotes energy 50000 W47S14 W48S12 free
# [下午1:58:38][shard3]33597290 Sokranotes energy 50000 W47S14 W48S12 free
# [下午1:58:38][shard3]33594597 Sokranotes energy 50000 W47S14 W48S12 free
# [下午1:58:38][shard3]33589302 Sokranotes energy 100000 W47S14 W48S12 free
# [下午1:58:38][shard3]33586890 Sokranotes energy 50000 W47S14 W48S12 free
# [下午1:58:38][shard3]33584090 Sokranotes energy 50000 W47S14 W48S12 free
# [下午1:58:38][shard3]33581590 Sokranotes energy 50000 W47S14 W48S12 free
# [下午1:58:38][shard3]33579290 Sokranotes energy 50000 W47S14 W48S12 free
# [下午1:58:38][shard3]33576590 Sokranotes energy 50000 W47S14 W48S12 free
# [下午1:58:38][shard3]33573893 Sokranotes energy 50000 W47S14 W48S12 free
# [下午1:58:38][shard3]33571590 Sokranotes energy 50000 W47S14 W48S12 free
# [下午1:58:38][shard3]33568990 Sokranotes energy 50000 W47S14 W48S12 free
# [下午1:58:38][shard3]33566390 Sokranotes energy 50000 W47S14 W48S12 free
# [下午1:58:38][shard3]33557224 Sokranotes energy 140000 W47S14 W48S12 free
# [下午1:58:38][shard3]33556790 Sokranotes energy 50000 W47S14 W48S12 free
# [下午1:58:38][shard3]33554090 Sokranotes energy 50000 W47S14 W48S12 free
# [下午1:58:38][shard3]33551990 Sokranotes energy 50000 W47S14 W48S12 free
# [下午1:58:38][shard3]33549290 Sokranotes energy 50000 W47S14 W48S12 free
# [下午1:58:38][shard3]33546390 Sokranotes energy 50000 W47S14 W48S12 free
# [下午1:58:38][shard3]33542693 Sokranotes energy 50000 W47S14 W48S12 free
# [下午1:58:38][shard3]33540090 Sokranotes energy 50000 W47S14 W48S12 free
# [下午1:58:38][shard3]33531835 Sokranotes energy 140000 W47S14 W48S12 free
# [下午1:58:38][shard3]33522861 Sokranotes energy 150000 W47S14 W48S12 free
# [下午1:58:38][shard3]33490094 Sokranotes energy 137769 W47S14 W48S12 free
# [下午1:58:38][shard3]33477499 Sokranotes energy 130000 W47S14 W48S12 free
# [下午1:58:38][shard3]33472793 Sokranotes energy 50000 W47S14 W48S12 free
# [下午1:58:38][shard3]33472781 Sokranotes energy 50000 W47S14 W48S12 free
# [下午1:58:38][shard3]33448655 Sokranotes energy 130000 W47S14 W48S12 free
# [下午1:58:38][shard3]33380975 Sokranotes energy 100000 W47S14 W48S12 free
# [下午1:58:38][shard3]33363442 Sokranotes energy 100000 W47S14 W48S12 free
# [下午1:58:38][shard3]33433729 Sokranotes energy 50000 W47S14 W48S12 free
# [下午1:58:38][shard3]33429108 Sokranotes energy 50000 W47S14 W48S12 free
# [下午1:58:38][shard3]33410088 Sokranotes energy 50000 W47S14 W48S12 free
# [下午1:58:38][shard3]33400698 Sokranotes energy 50000 W47S14 W48S12 free
# [下午1:58:38][shard3]33397858 Sokranotes energy 50000 W47S14 W48S12 free

# [下午1:58:38][shard3]33531090 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33522390 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33521790 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33520590 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33519290 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33517990 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33517290 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33515990 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33514790 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33513490 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33512792 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33511590 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33510390 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33509090 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33508490 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33507290 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33505990 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33504790 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33504090 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33502790 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33501490 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33500390 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33499490 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33473009 Sokranotes energy 27000 W47S14 W46S11 free
# [下午1:58:38][shard3]33472998 Sokranotes energy 50000 W47S14 W46S11 free
# [下午1:58:38][shard3]33472592 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33471091 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33469690 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33468490 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33467290 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33466590 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33465190 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33463890 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33462590 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33461290 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33460490 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33459190 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33457990 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33456690 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33455990 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33448590 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33447290 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33446090 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33437071 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33435904 Sokranotes energy 20000 W47S14 W39S23 free
# [下午1:58:38][shard3]33432392 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33431261 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33411694 Sokranotes XLHO2 4100 W47S14 W46S11 free
# [下午1:58:38][shard3]33411135 Sokranotes energy 40249 W47S14 W41S11 free
# [下午1:58:38][shard3]33411073 Sokranotes energy 50000 W47S14 W41S11 free
# [下午1:58:38][shard3]33410696 Sokranotes energy 78165 W47S14 W46S11 free
# [下午1:58:38][shard3]33406870 Sokranotes energy 20000 W47S14 W41S11 free
# [下午1:58:38][shard3]33405134 Sokranotes energy 20000 W47S14 W39S23 free
# [下午1:58:38][shard3]33385437 Sokranotes energy 50000 W47S14 W46S11 free