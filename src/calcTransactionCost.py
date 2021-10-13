import math

distance = 56
price = 4.750



amount = 2000
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

# python src/calcTransactionCost.py

# first order


# Game.market.deal('6151c78e9efe0cd976d69d18', 15000, 'W47S14');
# 6151c78e9efe0cd976d69d18 id
# 2.122 price
# E56N17
# 32 distance
# 距离： 32
# 运费： 9838
# 出价： 2.122
# 减去运输费之后:
# 实价： 1.2815170456261136
# 差价： 0.8404829543738863
# 占比： 0.3960805628529153

# 交易15000
# 付出energy共：28117
# 得到：31830



# Game.market.deal('6151cc2e9efe0c2284d82df8', 3000, 'W47S14');
# 6151cc2e9efe0c2284d82df8
# 2.125
# W19N15
# 30

# 3000
# 距离： 30
# 运费： 1897
# 出价： 2.125
# 减去运输费之后:
# 实价： 1.3019636675550654
# 差价： 0.8230363324449346
# 占比： 0.3873112152682045

# 交易3000
# 付出energy共：4897
# 得到：6375 cr

# 付出energy共：28117+4897 = 33014
# 账户余额 38205


# Game.market.deal('6159ce259efe0c0d02abeb9d', 10000, 'W47S14')

#######卖
# 距离： 25
# 运费： 16963
# 出价： 2
# 减去运输费之后:
# 实价： 1.2776015160871323
# 差价： 0.7223984839128677
# 占比： 0.3611992419564338