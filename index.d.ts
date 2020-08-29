declare class CardPlayer {
    private billingDate;
    private repaymentDate;
    private today;
    /**
     * 计算卡片免息期
     * @param billingDate 每月账单日
     * @param repaymentDate 每月还款日
     */
    constructor(billingDate: number, repaymentDate: number, today?: Date);
    freePeriod(): number;
    private get isNextBillingInThisMoth();
    private get nextBillingDate();
    private get nextRepaymentDate();
    private fromBillingDate;
    private fromRepaymentDate;
}
export { CardPlayer };
export default CardPlayer;
