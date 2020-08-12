console.debug(`Decision ROBOT [A] 手牌牌型${手牌牌型}` );
if (自己的牌场上最大) {
    console.debug(`Decision ROBOT [A] 自己的牌场上最大,场上没有人看牌${场上没有人看牌},可比牌${可比牌}`);
    if (场上没有人看牌) {
        return { 跟注:80, 加注:20 };
    }
    if (可比牌) {
        if (手牌牌型 > 对子) {
            return { 比牌:5, 加注:65, 跟注:30 };
        }
        if (手牌牌型 == 对子) {
            return { 比牌:20, 跟注:40, 加注:40 };
        }
        return { 比牌:70, 跟注:20, 加注:10 };
    }
    if (手牌牌型 > 对子) {
        return { 加注:60, 跟注:40 };
    }
    if (手牌牌型 >= 对子) {
        return { 跟注:40, 加注:60 };
    }
console.debug(`Decision ROBOT [A] 加注的值${加注}` );
    if (上家操作 == 加注) {
        if(自己已经看牌){
            return {跟注:70,加注:20,弃牌:10};
        }else{
            return {跟注:90,加注:10};
        }
    }
    console.debug('Decision ROBOT [A] retrun');
    return { 跟注:60, 加注:40 };
}
if (自己已经看牌) {
    console.debug(`Decision ROBOT [A]  自己已经看牌,牌型${手牌牌型},最大手牌值${最大手牌值},上家操作${上家操作}`);
    if (手牌牌型 == 高牌 && 最大手牌值 < 0xc) {
        if(上家操作==加注){
            return {弃牌:95,跟注:5};
        }
        return {弃牌:75,跟注:25};    
    }
    if (手牌牌型 == 高牌 && 上家操作 == 加注) {
        return { 弃牌:50, 跟注:50 };
    }
}
if (场上没有人看牌) {
console.debug('Decision ROBOT [A]  场上没有人看牌');
    return { 跟注:60, 加注:40 };
}
if (可比牌) {
    console.debug('Decision ROBOT [A]  可比牌');
    if (手牌牌型 >= 对子) {
        return { 比牌:40, 跟注:30, 加注:30 };
    }
    return { 比牌:70, 跟注:30 };
}
if (手牌牌型 >= 对子) {
console.debug('Decision ROBOT [A]  手牌牌型 >= 对子');
    return { 跟注:60, 加注:40 };
}
console.debug('Decision ROBOT [A]  return');
return { 跟注:90, 加注:10};