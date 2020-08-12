'use strict';
console.debug(`Decision ROBOT [B] 手牌牌型${手牌牌型}` );
if (自己的牌场上最大) {
    console.debug(`Decision ROBOT [B] 自己的牌场上最大,场上没有人看牌${场上没有人看牌},可比牌${可比牌}`);
    if (场上没有人看牌) {
        return { 跟注:70, 加注:30 };
    }
    if (可比牌) {
console.debug('Decision ROBOT [B] 可比牌');
        if (手牌牌型 > 对子) {
            return { 比牌:5, 加注:85, 跟注:10 };
        }
        if (手牌牌型 == 对子) {
            return { 比牌:20, 跟注:20, 加注:60 };
        }
        return { 比牌:70, 跟注:20, 加注:10 };
    }
    if (手牌牌型 > 对子) {
        return { 加注:80, 跟注:20 };
    }
    if (手牌牌型 >= 对子) {
        return { 跟注:30, 加注:70 };
    }
console.debug(`Decision ROBOT [B] 加注的值${加注}` );
    if (上家操作 == 加注) {
        if(自己已经看牌){
            return {跟注:60,加注:35,弃牌:5};
        }
        return {跟注:90,加注:10};
    }
    console.debug('Decision ROBOT [B] retrun');
    return { 跟注:70, 加注:30 };
}
if (自己已经看牌) {
console.debug(`Decision ROBOT [B] 自己已经看牌,牌型${手牌牌型},最大手牌值${最大手牌值},上家操作${上家操作}`);
    if (手牌牌型 == 高牌 && 最大手牌值 < 0xc) {
        if(上家操作==加注){
            return {弃牌:95,跟注:5};
        }
        return {弃牌:75,跟注:25};
    }
    if (手牌牌型 == 高牌 && 上家操作 == 加注) {
        return {弃牌:90,跟注:10};
    }
}
if (场上没有人看牌) {
    return { 跟注:70, 加注:30 };
}
if (可比牌) {
    console.debug('Decision ROBOT [B] 可比牌');
    if (手牌牌型 >= 对子) {
        return { 比牌:80, 跟注:10, 加注:10 };
    }
    return { 比牌:90, 跟注:10 };
}
if (手牌牌型 >= 对子) {
console.debug('Decision ROBOT [B]  手牌牌型 >= 对子');
    return { 跟注:40, 加注:60 };
}
console.debug('Decision ROBOT [B]  return');
return { 跟注:90, 加注:10 };