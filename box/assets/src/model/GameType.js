/**
 * Created by bing on 18/04/2018.
 */

module.exports = {
    profabType:cc.Enum({
        BlockBig:0,//大方格
        BlockSmall:1,//小方格
        UIBottom:2,//底部控件
        MarginsBig:3,
        MarginsSmall:4,
        RewardItem:5
    }),
    bottomRadio:cc.Enum({
        Accelerator: 0,//加速
        Tool: 1,//工具
        Efficiency: 2//倍数
    })

};
