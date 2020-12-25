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
        // Group {cards , point , type , need}
        // const cardGroups = _.groupBy(this.cards.sort(), card => card >> 8);
        // 1. 先选出纯顺子
        let i = 0;
        let purArr = [];
        let restArr = [];
        const cards = this.cards.sort();
        purArr[i] = [cards[0]];
        cards.reduce((pre, cur) => {
            if (cur - pre === 0) restArr.push(cur);
            else cur - pre === 1 ? purArr[i].push(cur) : purArr[++i] = [cur];
            return cur;
        });
        // 过滤牌组小于3的组合
        purArr = purArr.filter(p => {
            if (p.length < 3) restArr.push(...p);
            else return true;
        });
        console.log(`purArr: ${JSON.stringify(purArr)} , restArr: ${JSON.stringify(restArr)}`);

        // if(纯顺子.length < 2) if(纯顺子.length==1 && 纯顺子[0].length> = 6) 拆纯顺子 else 拼装非纯顺子 
        
        // 纯顺子后 要不要把赖子抽出来先？

        // 2. set
        const setFunc = cards => {
            const setArr = _.groupBy(cards, card => card & 0xF);
            console.log(`setArr: ${JSON.stringify(setArr)}`);
            return setArr;
        };
        

        if (!restArr.length) return;

        // 3. 纯顺子/set > 3  + 散牌 + 赖子  ==> 组合
        
        // 计算需要多少赖子的组合 大于3无效   2X3 2X4 2X5 2X6
        // 23 X 5 X 89 X J
        // 23 X 5 X 7

        
        restArr.reduce((pre, cur) => { 

        });


        // if(hasWild) {
            
        // }
        // 


    }

    // AI出牌 
    discard() { }

    // 返回纯顺子
    getNeedCards(cards) {
        // _.
    }
}

module.exports = UserCards;