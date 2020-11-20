'use strict';
const _ = require('lodash');
module.exports = class Card {
    constructor() {
        const SMALL_JOKER = 0x0500; // 小王
        const BIG_JOKER   = 0x0600; // 大王
        const NORMAL_CARDS = [
            0x0102, 0x0103, 0x0104, 0x0105, 0x0106, 0x0107, 0x0108, 0x0109, 0x010a, 0x010b, 0x010c, 0x010d, 0x010e, // 黑桃
            0x0202, 0x0203, 0x0204, 0x0205, 0x0206, 0x0207, 0x0208, 0x0209, 0x020a, 0x020b, 0x020c, 0x020d, 0x020e, // 红心
            0x0302, 0x0303, 0x0304, 0x0305, 0x0306, 0x0307, 0x0308, 0x0309, 0x030a, 0x030b, 0x030c, 0x030d, 0x030e, // 梅花
            0x0402, 0x0403, 0x0404, 0x0405, 0x0406, 0x0407, 0x0408, 0x0409, 0x040a, 0x040b, 0x040c, 0x040d, 0x040e, // 方片
        ];
        this.allCards    = [].concat(NORMAL_CARDS, SMALL_JOKER, BIG_JOKER);
        this.normalCards = NORMAL_CARDS;
        this.rummyCards  = [].concat(NORMAL_CARDS, BIG_JOKER, BIG_JOKER);
        this.rummyCircleCards = [].concat(NORMAL_CARDS, BIG_JOKER);
    }

    /**
     * 获取牌
     * @param {int} pieces 几幅牌
     * @param {int} cardsType 牌类型 1:normal(无大小王)  2:rummy(普通牌+大王)
     */
    getCards(pieces = 1, cardsType = 1) {
        let returnCards = [];
        let cards = [];
        switch (cardsType) {
            case 1:
                cards = this.normalCards;
                break;
            case 2:
                cards = this.rummyCards;
                break;
            case 3:
                cards = this.rummyCircleCards;
                break;
            default:
                cards = this.allCards;
                break;
        }
        for (let i = 0; i < pieces; i++) {
            returnCards = returnCards.concat(cards);
        }
        return _.shuffle(returnCards);
    }

    /**
     * 根据牌组选出希望牌型
     * @param {*} cards
     * @param {*} pick_policy
     */
    cheatPickCards(cards, pick_policy) {
        const userCards = this.getCardCombination(cards);
        if (!userCards) return;
        const pkInfo = this.cardsPKForKing(userCards, true);
        const score = pkInfo.score;
        const tps = pkInfo.tps;
        let findIndex = 0;
        let minTps = 10;
        switch (pick_policy) {
            case 1:
                Object.keys(score).forEach(index => {
                    if (score[index] >= 400000)  {
                        findIndex = index;
                    }
                });
                break;
            case 2:
            default:
                Object.keys(tps).forEach(index => {
                    if (Math.min(tps[index], minTps) != minTps) {
                        findIndex = index;
                        minTps  = tps[index];
                    }
                });
        }
        return userCards[findIndex];
    }

    /**
     * 从牌组中选出一个纯顺子 ( for Rummy )
     *
     * @param cards
     * @return {Array}
     */
    pickPureSequence(cards) {
        if (!Array.isArray(cards) || cards.length < 3) return [];

        const pureSequence = [];

        let leftCards = _.uniq(cards);
        leftCards = leftCards.filter(c => (c >> 8) <= 4);

        leftCards.sort((a, b) => {
            const colorA = this.getCardColor(a);
            const colorB = this.getCardColor(b);
            if (colorA !== colorB) return colorA - colorB;
            const valueA = this.getCardVal(a);
            const valueB = this.getCardVal(b);
            return valueA - valueB;
        });

        const length = leftCards.length;
        const randomStart = _.random(0, Math.floor(length / 2));
        for (let i = randomStart; i <= length - 3; i++) {
            const card1 = leftCards[ i ];
            const card2 = leftCards[ i + 1 ];
            const card3 = leftCards[ i + 2 ];

            if (this.getCardColor(card1) === this.getCardColor(card2) &&
                this.getCardColor(card2) === this.getCardColor(card3) &&
                this.getCardVal(card1) + 1 === this.getCardVal(card2) &&
                this.getCardVal(card2) + 1 === this.getCardVal(card3)) {

                pureSequence.push(card1, card2, card3);
                break;
            }
        }

        return pureSequence;
    }

    display(card) {
        const fun = this.display.bind(this);
        if (_.isArray(card)) {
            return card.map(fun);
        }
        if (_.isObject(card)) {
            const obj = {};
            for (const k in card) {
                obj[k] = this.display(card[k]);
            }
            return obj;
        }
        const numbers = '王,1,2,3,4,5,6,7,8,9,10,J,Q,K,A'.split(',');
        const number = numbers[card & 0x000f];
        const colors = '*,♠,♥,♣,♦,小,大'.split(',');
        const color = colors[(card & 0x0f00) >> 8];
        return color + number;
    }

    /**
     * 将 display 的结果逆转成对应的牌值
     *
     * @param cardString
     * @return {*}
     */
    parseToCard(cardString) {
        const fun = this.parseToCard.bind(this);
        if (_.isArray(cardString)) {
            return cardString.map(fun);
        }

        if (!_.isString(cardString)) return cardString;

        const numbers = '王,1,2,3,4,5,6,7,8,9,10,J,Q,K,A'.split(',');
        const colors = '*,♠,♥,♣,♦,小,大'.split(',');

        const color = cardString.slice(0, 1);
        const num = cardString.slice(1);

        const colorIndex = colors.indexOf(color);
        const numIndex = numbers.indexOf(num);

        return (colorIndex << 8) + (numIndex || 0x0000);
    }

    /**
     * 获取牌的点数
     *
     * @param card
     * @return {*}
     */
    getCardVal(card) {
        const retCard = [];
        if (Array.isArray(card)) {
            for (const i in card) {
                retCard[ i ] = card[ i ] & 0x000f;
            }
            return retCard;
        }
        return card & 0x000f;
    }

    /**
     * 获取牌的花色
     *
     * @param card
     * @return {*}
     */
    getCardColor(card) {
        if (Array.isArray(card)) {
            for (const i in card) {
                card[ i ] = card[ i ] >> 8;
            }
            return card;
        }
        return card >> 8;
    }

    /**
     * 计算牌型类型
     * 标准牌:A K Q J 10 9 8 7 6 5 4 3 2
     * 游戏牌:A K Q J 10 9 8 7 6
     * 黑桃 1
     * 红心 2
     * 梅花 3
     * 方块 4
     * 花色:黑桃（Spade）、红心（Heart）、梅花（Club）及方块（Diamond）
     * #游戏使用一副除去大小王的扑克牌，共4个花色52张牌
        1、豹子（AAA最大，222最小）
        2、同花顺（AKQ，A23, KQJ）
        3、同花（AKJ最大，352最小）
        4、顺子（AKQ，A23, KQJ）
        5、对子（AAK最大，223最小）
        6、单张（AKJ最大，352最小）
        返回win_pos, lost_pos

        豹子 >顺金 >顺子 >金花 >对子 >单张；
        顺金、顺子按照顺序比点。AKQ >A23>KQJ>...234；
        单牌大小比较：A>K>Q…..>2。
        对子大小比较：先比对，对同等大再比单牌；
        当豹子存在时，特殊牌型235 >豹子；
        比牌牌型等大，先开为负。

    * @param  {array} card         [description]
    * @return {object}             [description]
    *
    * 豹子: 6
    * 顺金: 5
    * 顺子: 4
    * 金花: 3
    * 对子: 2
    * 单张: 1
    *
    */
    getCardType(card) {
        let sum = 0;
        let i = 0;
        let n = 0;
        const types = {
            number       : [],    // 牌点数
            max          : 0,     // 最大牌
            min          : 0,     // 最小牌
            tp           : 0,     // 类型
            score        : 0,     // 分值
            cardsMapping : {}, // 点数与花色映射
        };

        if (!Array.isArray(card)) return types;
        if (card.length != 3)     return types;

        // 豹子
        const min          = 0x000F;
        const tmp          = {};
        const pairVal      = {};
        let cc             = 0;     // 花色数量
        let cardNum        = 0;     // 单张牌点数
        let pairs          = 0;
        let tmpColor       = 0;
        let runOrNot       = false; // 是否顺子
        let suitOrNot      = false; // 是否同花

        for (i = 0, n = card.length; i < n; i++) {
            cardNum = card[i] & min;
            types.number.push(cardNum);
            tmp[cardNum]  = 1;
            types.max     = Math.max(types.max, cardNum);
            pairVal[cardNum] = pairVal[cardNum] || [];
            pairVal[cardNum].push(card[i]);

            if (pairVal[cardNum].length == 2) pairs = cardNum; // 一对

            const color = card[i] >> 8;
            if (!types.cardsMapping[cardNum]) types.cardsMapping[cardNum] = [];
            types.cardsMapping[cardNum].push(color);
            if (color != tmpColor) cc++;
            tmpColor = color;
            types.cardsMapping[cardNum].sort((a, b) => a > b);
        }

        types.number = types.number.sort(function(min, max) { return max > min; });
        sum = 0;
        types.number.reduce((p, c) => {
            sum += p * c;
            p /= 10;
            return p;
        }, 100);
        types.score += sum;


        // 三条
        if (Object.keys(tmp).length == 1) {
            types.tp = 6;
            types.score += 600000;
            return types;
        }

        // 顺子
        if (card.length == 3) {
            if (types.number[0] - 1 == types.number[1] && types.number[1] - 1 == types.number[2]) {
                runOrNot = true;
            } else if (types.number[0] == 14 && types.number[1] == 3 && types.number[2] == 2) {
                runOrNot = true;
            }
        }

        // 同花
        if (cc == 1) suitOrNot = true;
        // 顺金
        if (suitOrNot && runOrNot) {
            types.tp = 5;
            types.score += 500000;
            return types;
        }

        if (runOrNot) {
            types.tp = 4;
            types.score += 400000;
            return types;
        }

        if (suitOrNot) {
            types.tp = 3;
            types.score += 300000;
            return types;
        }

        // 对子
        if (Object.keys(tmp).length == 2) {
            types.tp = 2;
            types.score += 200000 + pairs * 1000;
            return types;
        }

        types.tp = 1;
        return types;
    }

    // 计算牌型类型包括花色
    getCardTypeWithColor(cards) {
        const ret = {
            number: [],     // 牌点数
            max: 0,         // 最大点数
            min: 999,       // 最小点数
            tp: 0,          // 牌型
            score: 0,        // 分数
            cardsMapping: {},
        };

        if (!Array.isArray(cards) || cards.length !== 3) return ret;

        const colorWeightMap = {
            1: 4,
            2: 3,
            3: 1,
            4: 2,
        };

        cards.sort((cardA, cardB) => {
            const pointA = cardA & 0x000F;
            const pointB = cardB & 0x000F;
            const diff = pointB - pointA;
            if (diff !== 0) return diff;
            const colorA = cardA >> 8;
            const colorB = cardB >> 8;
            return colorWeightMap[colorB] - colorWeightMap[colorA];
        });

        let colorScore = 0;
        let pointScore = 0;
        const pointSet = new Set();
        const colorSet = new Set();
        const points = [];
        let maxPoint = 0;
        let minPoint = Number.MAX_SAFE_INTEGER;
        for (const card of cards) {
            const pointWeight = card & 0x000F;
            if (!ret.cardsMapping[pointWeight]) ret.cardsMapping[pointWeight] = [];
            const color = card >> 8;
            const colorWeight = colorWeightMap[color];
            pointScore *= 10;
            pointScore += pointWeight;
            pointSet.add(pointWeight);
            colorSet.add(colorWeight);
            points.push(pointWeight);
            ret.cardsMapping[pointWeight].push(color);
            // 取最大的牌的花色作为花色比较的参考依据
            if (pointWeight > maxPoint) {
                maxPoint = pointWeight;
                colorScore = colorWeight;
            }
            if (pointWeight < minPoint) {
                minPoint = pointWeight;
            }
        }

        const pointSize = pointSet.size;
        let tp = 1;

        if (pointSize === 1) {
            tp = 6; // 豹子
        } else {
            const hasSameColor = colorSet.size === 1;
            // A23也是顺子
            const isSeq = (points[0] - points[1] === 1 && points[1] - points[2] === 1) || (points[0] === 14 && points[1] === 3 && points[2] === 2);
            if (isSeq && hasSameColor) {
                tp = 5;
            } else if (isSeq) {
                tp = 4;
            } else if (hasSameColor) {
                tp = 3;
            } else if (pointSize === 2) {
                tp = 2;
                // 对子取中间
                const pairWeight = points[1];
                let single = 0;
                for (const point of pointSet) {
                    if (point !== pairWeight) {
                        single = point;
                        break;
                    }
                }
                pointScore = pairWeight * 100 + single;
            }
        }

        // 牌型 + 点数分数（3-6位）+ 花色分数（1位）
        const score = tp * 1e6 + pointScore * 10 + colorScore;
        // console.log('牌型', tp, 'score', score, pointScore, colorScore, colorSet, points);
        ret.score = score;
        ret.tp = tp;
        ret.max = maxPoint;
        ret.min = minPoint;
        ret.number = [ ...pointSet ].sort((a, b) => a > b);
        return ret;
    }

    /**
     * 比牌
     *
     * 这里只会判断出最大的牌组，对于第二、第三... 的顺序无法保证
     *
     * @param userCard
     * @param compareColor
     * @return {{tps: {}, max: {}, score: {}, hicards: {}, cardsMapping: {}}}
     */
    cardsPKForKing(userCard, compareColor = false) {
        const typeInfo = {
            tps          : {},
            max          : {},
            score        : {},
            hicards      : {},
            cardsMapping : {},
        };
        const cards = _.cloneDeep(userCard);
        for (let seatid in cards) {
            seatid = seatid | 0;
            const cardTypeInfo            = this.getCardType(cards[seatid]);
            typeInfo.tps[seatid]          = cardTypeInfo.tp;
            typeInfo.max[seatid]          = cardTypeInfo.max;
            typeInfo.score[seatid]        = cardTypeInfo.score;
            typeInfo.hicards[seatid]      = cardTypeInfo.number;
            typeInfo.cardsMapping[seatid] = cardTypeInfo.cardsMapping;
        }
        const scores = {};
        // 花色权重：黑桃>红心>方片>梅花
        const colorWeightMap = {
            1: 4,
            2: 3,
            3: 1,
            4: 2,
        };
        let maxScore = 0;
        scores[0] = [];
        Object.keys(typeInfo.score).forEach(seatid => {
            const s = typeInfo.score[seatid];
            if (!scores[s]) scores[s] =  [];
            scores[s].push(seatid | 0);
            maxScore = Math.max(s, maxScore);
        });
        const maxCount = scores[maxScore].length || 1;
        if (!compareColor || compareColor && maxCount <= 1) return typeInfo;
        // 走比花色逻辑
        const sortedUserCard = {};
        const pkSeatIds = [];
        scores[maxScore].forEach(seatid => {
            sortedUserCard[seatid] =  typeInfo.cardsMapping[seatid];
            pkSeatIds.push(seatid);
        });
        let winSeats    = new Set();
        const loseSeats = new Set();
        // 根据当前结果最大分数的牌型分类pk
        switch (typeInfo.tps[pkSeatIds[0]]) {
            case 1:
                // 高牌
                for (let seatid in cards) {
                    seatid = seatid | 0;
                    const cardTypeInfo            = this.getCardTypeWithColor(cards[seatid]);
                    typeInfo.tps[seatid]          = cardTypeInfo.tp;
                    typeInfo.max[seatid]          = cardTypeInfo.max;
                    typeInfo.score[seatid]        = cardTypeInfo.score;
                    typeInfo.hicards[seatid]      = cardTypeInfo.number;
                    typeInfo.cardsMapping[seatid] = cardTypeInfo.cardsMapping;
                }
                return typeInfo;
            case 2:
                // 对子
                for (let seatid in cards) {
                    seatid = seatid | 0;
                    const cardTypeInfo            = this.getCardTypeWithColor(cards[seatid]);
                    typeInfo.tps[seatid]          = cardTypeInfo.tp;
                    typeInfo.max[seatid]          = cardTypeInfo.max;
                    typeInfo.score[seatid]        = cardTypeInfo.score;
                    typeInfo.hicards[seatid]      = cardTypeInfo.number;
                    typeInfo.cardsMapping[seatid] = cardTypeInfo.cardsMapping;
                }
                return typeInfo;
            case 3:
                // 同花
                for (let seatid in cards) {
                    seatid = seatid | 0;
                    const cardTypeInfo            = this.getCardTypeWithColor(cards[seatid]);
                    typeInfo.tps[seatid]          = cardTypeInfo.tp;
                    typeInfo.max[seatid]          = cardTypeInfo.max;
                    typeInfo.score[seatid]        = cardTypeInfo.score;
                    typeInfo.hicards[seatid]      = cardTypeInfo.number;
                    typeInfo.cardsMapping[seatid] = cardTypeInfo.cardsMapping;
                }
                return typeInfo;
            case 4:
                // 顺子
                for (let i = 0; i < 3; i++) {
                    // 先拟定一个当前最大的花色
                    let maxColorWeight = 1;
                    winSeats =  new Set();
                    // 几个人最大就几个人pk
                    for (let j = 0; j < maxCount; j++) {
                        const seatid = pkSeatIds[j];
                        // 已经淘汰了就忽略
                        if (loseSeats.has(parseInt(seatid))) continue;

                        const tmpColor = maxColorWeight;
                        const num = typeInfo.hicards[seatid][i];
                        const cardColor = typeInfo.cardsMapping[seatid][num][0];
                        maxColorWeight = Math.max(maxColorWeight, colorWeightMap[cardColor]);
                        if (tmpColor < maxColorWeight) { // 当前最大花色更变了，就重新录入拥有最大花色的人
                            for (const seatid of winSeats) {
                                // 已经不是最大花色，淘汰
                                loseSeats.add(parseInt(seatid));
                            }
                            winSeats =  new Set();
                            winSeats.add(parseInt(seatid));
                        } else if (colorWeightMap[cardColor] == maxColorWeight) {
                            winSeats.add(parseInt(seatid));
                        } else {
                            // 已经不是最大花色，淘汰
                            loseSeats.add(parseInt(seatid));
                        }
                    }
                    if (winSeats.size == 1) break;
                }
                for (const seatid of winSeats) {
                    typeInfo.score[seatid] += 5;
                }
                return typeInfo;
            case 5: {
                // 顺金
                // 顺金的情况只要对比一个花色即可
                let maxColorWeight = 1;
                for (let j = 0; j < maxCount; j++) {
                    const tmpColor = maxColorWeight;
                    const num = typeInfo.hicards[pkSeatIds[j]][0];
                    const cardColorList = typeInfo.cardsMapping[pkSeatIds[j]][num];
                    maxColorWeight = Math.max(maxColorWeight, colorWeightMap[cardColorList[0]]);

                    if (tmpColor < maxColorWeight) { // 当前最大花色更变了，就重新录入拥有最大花色的人
                        for (const seatid of winSeats) {
                            // 已经不是最大花色，淘汰
                            loseSeats.add(parseInt(seatid));
                        }
                        winSeats =  new Set();
                        winSeats.add(parseInt(pkSeatIds[j]));
                    } else if (colorWeightMap[cardColorList[0]] == maxColorWeight) {
                        winSeats.add(parseInt(pkSeatIds[j]));
                    } else {
                        // 已经不是最大花色，淘汰
                        loseSeats.add(parseInt(pkSeatIds[j]));
                    }
                }
                for (const seatid of winSeats) {
                    typeInfo.score[seatid] += 5;
                }
                return typeInfo;
            }
            case 6:
                // 豹子
                for (let i = 0; i < 3; i++) { // 三张手牌 逐一对比花色
                    // 先拟定一个当前最大的花色
                    let maxColorWeight = 1;
                    winSeats =  new Set();
                    // 几个人最大就几个人pk
                    for (let j = 0; j < maxCount; j++) {
                        // 已经淘汰了就忽略
                        if (loseSeats.has(parseInt(pkSeatIds[j]))) continue;

                        const tmpColor = maxColorWeight;
                        const num = typeInfo.hicards[pkSeatIds[j]][i];
                        const cardColorList = typeInfo.cardsMapping[pkSeatIds[j]][num];
                        maxColorWeight = Math.max(maxColorWeight, colorWeightMap[cardColorList[i]]);
                        if (tmpColor < maxColorWeight) { // 当前最大花色更变了，就重新录入拥有最大花色的人
                            for (const seatid of winSeats) {
                                // 已经不是最大花色，淘汰
                                loseSeats.add(parseInt(seatid));
                            }
                            winSeats =  new Set();
                            winSeats.add(parseInt(pkSeatIds[j]));
                        } else if (colorWeightMap[cardColorList[i]] == maxColorWeight) {
                            winSeats.add(parseInt(pkSeatIds[j]));
                        } else {
                            // 已经不是最大花色，淘汰
                            loseSeats.add(parseInt(pkSeatIds[j]));
                        }
                    }
                    if (winSeats.size == 1) break;
                }
                for (const seatid of winSeats) {
                    typeInfo.score[seatid] += 5;
                }
                return typeInfo;
            default:
                return typeInfo;
        }
    }

    // 从若干张牌中任意选择3张,所有可能的组合
    getCardCombination(cards) {
        if (!Array.isArray(cards)) return;
        const len = cards.length;
        if (len < 3) return;
        let count = 0;
        const userCards = {};
        for (let i = 0; i < len; i++) {
            for (let j = i + 1; j < len; j++) {
                for (let k = j + 1; k < len; k++) {
                    userCards[count++] = [ cards[i], cards[j], cards[k] ];
                }
            }
        }
        return userCards;
    }

    // 从若干张牌中任意选择N张,返回所有可能组合的迭代器
    * getCardCombinationIterator(cards) {
        if (!Array.isArray(cards)) return;
        const len = cards.length;
        if (len < 3) return;
        for (let i = 0; i < len; i++) {
            for (let j = i + 1; j < len; j++) {
                for (let k = j + 1; k < len; k++) {
                    yield [ cards[i], cards[j], cards[k] ];
                }
            }
        }
    }

    /**
     * 3patti生成特定的一组用户手牌(可能重复)
     * 1高牌 2对子 3同花 4顺子 5同花顺 6豹子 不传表示随机
     * @param {array} types 数组:特定的类型,不传表示随机
     */
    generateCardByType(types) {
        const CARD_ALL = require('./../config/card_all.json').items; // 按照分数降序排列的所有牌
        let tp = types;
        if (Array.isArray(types)) {
            const index = Math.floor(Math.random() * types.length);
            tp = types[index];
        }
        if (!types) tp = app.__.rand(1, 6);

        let index = Math.floor(Math.random() * 22100);
        switch (tp) {
            case 1:
                index = Math.floor(Math.random() * 16440 + 3744 + 1096 + 52 + 48 + 720);
                break;
            case 2:
                index = Math.floor(Math.random() * 3744 + 1096 + 52 + 48 + 720);
                break;
            case 3:
                index = Math.floor(Math.random() * 1096 + 52 + 48 + 720);
                break;
            case 4:
                index = Math.floor(Math.random() * 720 + 52 + 48);
                break;
            case 5:
                index = Math.floor(Math.random() * 48 + 52);
                break;
            case 6:
                index = Math.floor(Math.random() * 52);
                break;
            default:
                break;
        }

        return CARD_ALL[index];
    }

    /**
     * 选出所需牌型以上的牌
     * @param {array} cardsPool 牌组
     * @param {int} tp 所需要的牌型
     */
    getCardsGreaterThanPair(cardsPool, tp = 2) {
        tp = parseInt(tp);
        const len = cardsPool.length;
        for (let i = 0; i < len; i++) {
            for (let j = i + 1; j < len; j++) {
                for (let k = j + 1; k < len; k++) {
                    const card   = [ cardsPool[i], cardsPool[j], cardsPool[k] ];
                    const cardTp = this.getCardType(card);
                    if (cardTp.tp >= tp) return card;
                }
            }
        }
        return cardsPool.slice(0, 3);
    }

    /**
     * 从若干张牌选出牌型最大的组合
     *
     * @param cards
     * @param needCards 是否需要原有牌组
     * @return {{cards: *, hCardAll: *, tp: number, score: number}}
     */
    getMaxCards(cards, needCards = true) {
        const result = {
            cards,                  // 传入的若干牌
            hCardAll: cards,        // 最大牌型的组合
            tp: 0,                  // 最大牌型
            score: 0,               // 最大牌型的分值
        };

        if (!needCards) delete result.cards;

        const userCards = this.getCardCombination(cards);

        if (userCards) {
            const pkInfo = this.cardsPKForKing(userCards, true);

            const score = pkInfo.score;
            const tps = pkInfo.tps;
            let findIndex = 0;
            let maxScore = 0;
            Object.keys(score)
                .forEach(index => {
                    if (Math.max(score[ index ], maxScore) !== maxScore) {
                        findIndex = index;
                        maxScore = score[ index ];
                    }
                });

            result.hCardAll = userCards[findIndex];
            result.tp = tps[findIndex];
            result.score = score[findIndex];
        }

        return result;
    }

    /**
     * 从若干张牌中，选出大于指定分数的一个组合
     *
     * @param {Array} publicCards 可用牌
     * @param {int} score 牌组分数
     * @param {int} maxTps 能获取的最大牌组
     * @return {{handCards: Array, publicCards: *, cardTypeInfo: {}}} or undefined
     */
    getBiggerCardByScore(publicCards, score, maxTps = 4) {
        if (!Array.isArray(publicCards)) return;

        const iterator = this.getCardCombinationIterator(publicCards);
        for (let iter = iterator.next(); !iter.done; iter = iterator.next()) {
            const cards = iter.value;
            const cardTypeInfo = this.getCardType(cards, true);
            if (cardTypeInfo.tp <= maxTps && cardTypeInfo.score > score) {
                return cards;
            }
        }
    }
};
