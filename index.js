"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardPlayer = void 0;
var date_fns_1 = require("date-fns");
var CardPlayer = /** @class */ (function () {
    /**
     * 计算卡片免息期
     * @param billingDate 每月账单日
     * @param repaymentDate 每月还款日
     */
    function CardPlayer(billingDate, repaymentDate, today) {
        if (today === void 0) { today = date_fns_1.set(new Date(), {
            hours: 12,
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
        }); }
        this.billingDate = billingDate;
        this.repaymentDate = repaymentDate;
        this.today = today;
    }
    // 计算免息期
    CardPlayer.prototype.freePeriod = function () {
        return this.fromBillingDate() + this.fromRepaymentDate();
    };
    Object.defineProperty(CardPlayer.prototype, "isNextBillingInThisMoth", {
        // 判断账单是否会在本月生成
        get: function () {
            var today = date_fns_1.getDate(this.today);
            if (today > this.billingDate) {
                return false;
            }
            else {
                return true;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CardPlayer.prototype, "nextBillingDate", {
        // 下一个账单日
        get: function () {
            // 如果今日已经过了本月的账单，则账单日在下一个月
            if (!this.isNextBillingInThisMoth) {
                return date_fns_1.setDate(date_fns_1.addMonths(this.today, 1), this.billingDate);
            }
            else {
                // 否则在本月的账单日
                return date_fns_1.setDate(this.today, this.billingDate);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CardPlayer.prototype, "nextRepaymentDate", {
        // 具体的还款日
        get: function () {
            var nextBillingDate = this.nextBillingDate; // 订单日
            if (this.billingDate > this.repaymentDate) {
                return date_fns_1.setDate(date_fns_1.addMonths(nextBillingDate, 1), this.repaymentDate);
            }
            else {
                return date_fns_1.setDate(nextBillingDate, this.repaymentDate);
            }
        },
        enumerable: false,
        configurable: true
    });
    // 计算今日起算到账单日的时间
    CardPlayer.prototype.fromBillingDate = function () {
        return Math.abs(date_fns_1.differenceInDays(this.today, this.nextBillingDate));
    };
    // 计算从账单日 - 还款日的时间
    CardPlayer.prototype.fromRepaymentDate = function () {
        return Math.abs(date_fns_1.differenceInDays(this.nextBillingDate, this.nextRepaymentDate));
    };
    return CardPlayer;
}());
exports.CardPlayer = CardPlayer;
exports.default = CardPlayer;
