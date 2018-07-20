/**
 * Created by bing on 04/05/2018.
 */

    //TODO::replace the image.
let SharePngConfig = require("SharePngConfig");
let sharePng = SharePngConfig['sharePng'];
let newrecordPng = SharePngConfig['newrecordPng'];

let plugin = cc.Class({
    extends: cc.Object,

    //intent  "INVITE" | "REQUEST" | "CHALLENGE" | "SHARE"
    shareFb: function (intent = 'REQUEST', callback) {

        FBInstant.shareAsync({
            intent: intent,
            image: sharePng,
            text: "Click to help me to make a new RECORD,friend!",
            data: {type: 5},
        }).then(function () {
            // continue with the game.
            if (callback) {
                callback();
            }
        });
    },

    shareNewRecord: function (score, callback) {
        FBInstant.shareAsync({
            intent: "REQUEST",
            image: newrecordPng,
            text: 'I got new record ' + score.toString(),
            data: {type: 6},
        }).then(function () {
            // continue with the game.
            if (callback) {
                callback();
            }
        });
    },

    playerName: function () {
        var playerName = FBInstant.player.getName();

        return playerName;
    },

    chooseAsync: function (callback, errorCallback, doallCallback) {
        FBInstant.context
            .chooseAsync()
            .then(function () {
                console.log(FBInstant.context.getID());
                if (callback) {
                    callback(FBInstant.context.getID());
                }
            }).catch(function (e) {
            console.log('chooseAsync error', FBInstant.context.getID(), e);
            if (e.code == "SAME_CONTEXT") {
                if (errorCallback) {
                    errorCallback(FBInstant.context.getID());
                }
            }
            else{
                doallCallback();
            }
        });
    },


    localSameText: function (text) {

        return {
            ak_GH: text,
            am_ET: text,
            ar_AR: text,
            as_IN: text,
            ay_BO: text,
            az_AZ: text,
            be_BY: text,
            bg_BG: text,
            bn_IN: text,
            bp_IN: text,
            br_FR: text,
            bs_BA: text,
            ca_ES: text,
            cb_IQ: text,
            ck_US: text,
            co_FR: text,
            cs_CZ: text,
            cx_PH: text,
            cy_GB: text,
            da_DK: text,
            de_DE: text,
            el_GR: text,
            en_GB: text,
            en_PI: text,
            en_UD: text,
            en_US: text,
            eo_EO: text,
            es_ES: text,
            es_LA: text,
            es_MX: text,
            et_EE: text,
            eu_ES: text,
            fa_IR: text,
            fb_LT: text,
            ff_NG: text,
            fi_FI: text,
            fo_FO: text,
            fr_CA: text,
            fr_FR: text,
            fy_NL: text,
            ga_IE: text,
            gl_ES: text,
            gn_PY: text,
            gu_IN: text,
            gx_GR: text,
            ha_NG: text,
            he_IL: text,
            hi_IN: text,
            hr_HR: text,
            ht_HT: text,
            hu_HU: text,
            hy_AM: text,
            id_ID: text,
            ig_NG: text,
            is_IS: text,
            it_IT: text,
            ja_JP: text,
            ja_KS: text,
            jv_ID: text,
            ka_GE: text,
            kk_KZ: text,
            km_KH: text,
            kn_IN: text,
            ko_KR: text,
            ks_IN: text,
            ku_TR: text,
            ky_KG: text,
            la_VA: text,
            lg_UG: text,
            li_NL: text,
            ln_CD: text,
            lo_LA: text,
            lt_LT: text,
            lv_LV: text,
            mg_MG: text,
            mi_NZ: text,
            mk_MK: text,
            ml_IN: text,
            mn_MN: text,
            mr_IN: text,
            ms_MY: text,
            mt_MT: text,
            my_MM: text,
            nb_NO: text,
            nd_ZW: text,
            ne_NP: text,
            nl_BE: text,
            nl_NL: text,
            nn_NO: text,
            nr_ZA: text,
            ns_ZA: text,
            ny_MW: text,
            or_IN: text,
            pa_IN: text,
            pl_PL: text,
            ps_AF: text,
            pt_BR: text,
            pt_PT: text,
            qc_GT: text,
            qu_PE: text,
            qz_MM: text,
            rm_CH: text,
            ro_RO: text,
            ru_RU: text,
            rw_RW: text,
            sa_IN: text,
            sc_IT: text,
            se_NO: text,
            si_LK: text,
            sk_SK: text,
            sl_SI: text,
            sn_ZW: text,
            so_SO: text,
            sq_AL: text,
            sr_RS: text,
            ss_SZ: text,
            st_ZA: text,
            sv_SE: text,
            sw_KE: text,
            sy_SY: text,
            sz_PL: text,
            ta_IN: text,
            te_IN: text,
            tg_TJ: text,
            th_TH: text,
            tk_TM: text,
            tl_PH: text,
            tl_ST: text,
            tn_BW: text,
            tr_TR: text,
            ts_ZA: text,
            tt_RU: text,
            tz_MA: text,
            uk_UA: text,
            ur_PK: text,
            uz_UZ: text,
            ve_ZA: text,
            vi_VN: text,
            wo_SN: text,
            xh_ZA: text,
            yi_DE: text,
            yo_NG: text,
            zh_CN: text,
            zh_HK: text,
            zh_TW: text,
            zu_ZA: text,
            zz_TR: text
        }
    },

    updateAsync: function (usertext, callback) {

        let text = usertext;

        FBInstant.updateAsync({
            action: 'CUSTOM',
            cta: 'Play',
            image: sharePng,
            text: {
                default: text,
                localizations: this.localSameText(text)
            },
            template: 'play_turn',
            data: {type: 3},
            strategy: 'IMMEDIATE',
            notification: 'NO_PUSH',
        }).then(function () {
            console.log('Message was sent successfully');
            if (callback) {
                callback();
            }
        });
    },


    updateHighAsync: function (usertext, callback) {

        let text = usertext;
        FBInstant.updateAsync({
            action: 'CUSTOM',
            cta: 'Play',
            image: newrecordPng,
            text: {
                default: text,
                localizations: this.localSameText(text)
            },
            template: 'play_turn',
            data: {type: 4},
            strategy: 'IMMEDIATE',
            notification: 'NO_PUSH',
        }).then(function () {
            console.log('Message was sent successfully');
            if (callback) {
                callback();
            }
        });
    },

    updateGiftAsync: function (gifttype, count, callback, errorCallback) {

        let text = "Only 10 players can get the gift in an hour from " + FBInstant.player.getName() + " . ";
        FBInstant.updateAsync({
            action: 'CUSTOM',
            cta: 'Join The Fight',
            image: sharePng,
            text: {
                default: text,
                localizations: this.localSameText(text)
            },
            template: 'send_gift',
            data: {type: 0, gifttype: gifttype, time: Date.now(), count: count, from: FBInstant.player.getName()},
            strategy: 'IMMEDIATE',
            notification: 'NO_PUSH',
        }).then(function () {
            console.log('Message was sent successfully');
            if (callback) {
                callback(FBInstant.context.getID(),gifttype);
            }
        });
    },


    updateCallBackFriendsAsync: function (callback) {

        let text = "Click to help me to make a new RECORD,friend!";
        FBInstant.updateAsync({
            action: 'CUSTOM',
            cta: 'Join The Fight',
            image: sharePng,
            text: {
                default: text,
                localizations: this.localSameText(text)
            },
            template: 'send_gift',
            data: {type: 1, fromid: FBInstant.player.getID(), name: FBInstant.player.getName()},
            strategy: 'IMMEDIATE',
            notification: 'NO_PUSH',
        }).then(function () {
            console.log('Message was sent successfully');
            if (callback) {
                callback(FBInstant.context.getID());
            }
        });
    },


    updateFriendInviteEnterGameAsync: function (gifttype, count, callback, errorCallback) {

        let name = FBInstant.player.getName();
        if (!name) {
            name = "";
        }
        let text = name + " helped you in task today!";
        FBInstant.updateAsync({
            action: 'CUSTOM',
            cta: 'Join The Fight',
            image: sharePng,
            text: {
                default: text,
                localizations: this.localSameText(text)
            },
            template: 'send_gift',
            data: {type: 2},
            strategy: 'IMMEDIATE',
            notification: 'NO_PUSH',
        }).then(function () {
            console.log('Message was sent successfully');
            if (callback) {
                callback(FBInstant.context.getID());
            }
        });
    },

    //跳转到其他游戏。
    switchGameAsync: function (appID, entrypointData, errorCallback) {
        FBInstant.switchGameAsync(appID, entrypointData).catch(function (e) {
            // Handle game change failure
            if (errorCallback) {
                errorCallback();
            }
        });
    },

    entryGameAsync: function (callback) {
        const entryPointData = FBInstant.getEntryPointData();
        if (entryPointData) {

            //type 0 gift
            //1 call back friends
            if (callback) {
                callback(entryPointData);
            }

            //todo::
            // let PopMsgController = require("PopMsgController");
            // PopMsgController.showMsg(JSON.stringify(entryPointData),false);
        }
    },


    createShortCut: function () {
        FBInstant.canCreateShortcutAsync()
            .then(function (canCreateShortcut) {
                if (canCreateShortcut) {
                    FBInstant.createShortcutAsync()
                        .then(function () {
                            // Shortcut created
                        })
                        .catch(function () {
                            // Shortcut not created
                        });
                }
            });
    },

    InterstitialAdAsync: function (callback) {
        let GameConfig = require("GameConfig");
        var ad = null;

        FBInstant.getInterstitialAdAsync(
            GameConfig.InterstitialAdId,
        ).then(function (interstitial) {
            console.log("ad loadAsync:");
            // showlb.string = "ad loadAsync:";
            ad = interstitial;
            return interstitial.loadAsync();
        }).then(function () {
            // Ad loaded
            // showlb.string = "ad loadAsync:";
            console.log("Ad loaded");
            return ad.showAsync();
        }).then(function () {
            // showlb.string = "I don't know what happened";
            console.log("I don't know what happened");
            if (callback) {
                callback();
            }
        });
    },

    isReadyReward: function () {
        if (this.Reward) {
            return true;
        } else {
            this.preLoadRewardedVideoAsync();
            return false;
        }
    },

    preLoadRewardedVideoAsync: function () {
        let GameConfig = require("GameConfig");
        var ad = null;
        FBInstant.getRewardedVideoAsync(
            GameConfig.RewardedVideoId,
        ).then(function (rewardedVideo) {
            this.Reward = rewardedVideo;
            return ad.loadAsync();
        }).then(function () {

        });
    },

    PlayRewardedVideo: function (callback) {
        if (this.Reward) {
            this.Reward.showAsync().then(function () {
                this.Reward = null;
                if (callback) {
                    callback();
                }
            });
        } else {
            this.Reward = null;
            this.RewardedVideoAsync(callback)
        }

    },

    RewardedVideoAsync: function (callback) {
        let GameConfig = require("GameConfig");
        var ad = null;
        FBInstant.getRewardedVideoAsync(
            GameConfig.RewardedVideoId,
        ).then(function (rewardedVideo) {
            ad = rewardedVideo;
            return ad.loadAsync();
        }).then(function () {
            // Ad loaded
            console.log("Ad loaded");
            return ad.showAsync();
        }).then(function () {
            console.log("I don't know what happened");
            if (callback) {
                callback();
            }
        });
    },


    //    game play
    getOrCreateContextId: function () {
        var contextType = FBInstant.context.getType();
        var contextId = FBInstant.context.getID();
        if (contextType == 'SOLO') {
            contextId = FBInstant.player.getID() + '_SOLO';
        }
        return contextId;
    },

    LeaderboardCount: function (leaderName = 'my_leaderboard', callback) {
        FBInstant.getLeaderboardAsync(leaderName)
            .then(function (leaderboard) {
                return leaderboard.getEntryCountAsync();
            })
            .then(function (count) {
                console.log(count);
                if (callback) {
                    callback(ret);
                }
            });
    },

    getFriendLeaderboard: function (leaderName = 'my_leaderboard1', callback) {

        FBInstant.getLeaderboardAsync(leaderName)
            .then(function (leaderboard) {
                return leaderboard.getConnectedPlayerEntriesAsync(100);
            })
            .then(function (entries) {
                //https://developers.facebook.com/docs/games/instant-games/sdk/fbinstant6.2#fbinstant
                let ret = [];
                let entry = null;
                for (let i = 0; i < entries.length; ++i) {
                    entry = entries[i];
                    ret.push({
                        rank: entry.getRank(),
                        score: entry.getScore(),
                        name: entry.getPlayer().getName(),
                        photo: entry.getPlayer().getPhoto()
                    });
                }

                //test data
                // for(let i =0; i < 10; ++i){
                //     ret.push({rank:i+1,
                //         score:(20-i)*3,
                //         name:"world Ma",
                //         photo:"https://lookaside.facebook.com/platform/profilepic/?psid=2063223640372248&height=50&width=50&ext=1528008224&hash=AeRL1ntBbxis94hX"
                //     });
                // }

                if (callback) {
                    callback(ret);
                }
            }).catch(error => console.error(error));
    },

    getWorldLeaderboard: function (leaderName = 'my_leaderboard1', callback) {

        FBInstant.getLeaderboardAsync(leaderName)
            .then(function (leaderboard) {
                console.log(leaderboard.getName()); // my_leaderboard
                console.log(leaderboard.getContextID()); // null

                return leaderboard.getEntriesAsync(100); //offset取消。fb api中如果添加offset会导致如果数据不够，取不到。
            })
            .then(function (entries) {
                let ret = [];
                for (let i = 0; i < entries.length; ++i) {
                    ret.push({
                        rank: entries[i].getRank(),
                        score: entries[i].getScore(),
                        name: entries[i].getPlayer().getName(),
                        photo: entries[i].getPlayer().getPhoto()
                    });
                }
                if (callback) {
                    callback(ret);
                }
            }).catch(error => console.error(error));
    },

    //玩家自己的
    getPlayerLeaderboard: function (leaderName = 'my_leaderboard1', callback) {
        FBInstant.getLeaderboardAsync(leaderName)
            .then(function (leaderboard) {
                console.log(leaderboard.getName()); // my_leaderboard
                console.log(leaderboard.getContextID()); // null

                return leaderboard.getPlayerEntryAsync();
            })
            .then(function (entry) {
                let ret = {
                    rank: entry.getRank(),
                    score: entry.getScore(),
                    name: entry.getPlayer().getName(),
                    photo: entry.getPlayer().getPhoto()
                };
                if (callback) {
                    callback(ret);
                }
            }).catch(error => console.error(error));
    },


    setScoreAsync: function (leaderName = 'my_leaderboard', score, callback) {

        FBInstant.getLeaderboardAsync(leaderName)
            .then(function (leaderboard) {
                return leaderboard.setScoreAsync(score);
            })
            .then(function (entry) {
                console.log(entry.getScore()); // 42
                console.log(entry.getExtraData()); // '{race: "elf", level: 3}'
                if (callback) {
                    callback()
                }
            }).catch(error => console.error(error));
    },


    getPhoto: function () {

        return FBInstant.player.getPhoto();
    },

    getName: function () {

        return FBInstant.player.getName();
    },

    getID: function () {

        return FBInstant.player.getID();
    },

    ConnectedPlayers: function (callback) {
        FBInstant.player.getConnectedPlayersAsync()
            .then(function (players) {
                console.log("players", players);
                let ret = [];
                for (let i = 0; i < players.length; ++i) {
                    ret.push({
                        name: players[i].getName(),
                        photo: players[i].getPhoto(),
                        id: players[i].getID()
                    });
                }

                if (callback) {
                    callback(ret);
                }
            });

    },
});


module.exports = plugin;