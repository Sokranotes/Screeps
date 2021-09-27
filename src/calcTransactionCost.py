import math

distance = 30
price = 2.125
amount = 20000
cost = math.ceil(amount * (1 - pow(math.e, (-1*(distance)/30))))

print('距离：', distance)
print('运费：', cost)
print('出价：', price)
print('减去运输费之后:')
print('实价：', (price*amount)/(cost + amount))
print('差价：', price - (price*amount)/(cost + amount))
print('占比：', (price - (price*amount)/(cost + amount))/price)


# python calcTransactionCost.py

# first order


# Game.market.deal('6151c78e9efe0cd976d69d18', 15000, 'W47S14');
# 6151c78e9efe0cd976d69d18 id
# 2.122 price
# E56N17
# 32 distance
# 距离： 32
# 运费： 13117
# 出价： 2.122
# 减去运输费之后:
# 实价： 1.2815170456261136
# 差价： 0.8404829543738863
# 占比： 0.3960805628529153

# 交易15000
# 付出energy共：28117
# 得到：31830 cf



# Game.market.deal('6151cc2e9efe0c2284d82df8', 3000, 'W47S14');
# 6151cc2e9efe0c2284d82df8
# 2.125
# W19N15
# 30

# 3000
# 距离： 30
# 运费： 12643
# 出价： 2.125
# 减去运输费之后:
# 实价： 1.3019636675550654
# 差价： 0.8230363324449346
# 占比： 0.3873112152682045