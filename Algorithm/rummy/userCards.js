const _ = require('lodash');

class UserCards {
    constructor(cards, wildCard) {
        if (!Array.isArray(cards)) throw new Error(`Error`);

        this.cards = cards;
        this.wildCard = wildCard;
    }

    // 计算一个Group的分数
    calcPointByGroup() { }

    // 计算一手牌的分数
    calcPoint() { }

    // 排序
    sort() {
        // 1. 先选出纯顺子
        // Group {cards , point , type , need}
        const cardGroups = _.groupBy(this.cards.sort(), card => card >> 8);
        console.log(Object.values(cardGroups));
        const purArr = [];
        const restArr = [];
        let tempArr = [];
        // 连续 并 大于3
        Object.values(cardGroups).forEach(cards => {
            // let start = 0;
            for (let i = 0; i < cards.length; i++) {
                if (tempArr.length == 0) {
                    tempArr.push(cards[i]);
                    continue;
                }

                if (tempArr[tempArr.length - 1] + 1 == cards[i]) {
                    tempArr.push(cards[i]);
                    console.log(i)
                    if (i != cards.length) continue;
                } else if (tempArr.length >= 3) {
                    purArr.push(tempArr);
                } else {
                    console.log(tempArr);
                    restArr.push(...tempArr);
                }
                tempArr = [cards[i]];
            }
        });

        console.log(purArr);
        // console.log(restArr);

        // 2. set
        // 3. 纯顺子/set > 3  + 散牌 + 赖子  ==> 组合
    }

    // AI出牌 
    discard() { }

    // 返回纯顺子
}

module.exports = UserCards;