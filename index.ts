import { getDate, setDate, addMonths, differenceInDays, set } from "date-fns";

class CardPlayer {
  /**
   * 计算卡片免息期
   * @param billingDate 每月账单日
   * @param repaymentDate 每月还款日
   */
  constructor(
    private billingDate: number,
    private repaymentDate: number,
    private today = set(new Date(), {
      hours: 12,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    })
  ) {}

  // 计算免息期
  public freePeriod(): number {
    return this.fromBillingDate() + this.fromRepaymentDate();
  }

  // 判断账单是否会在本月生成
  private get isNextBillingInThisMoth(): boolean {
    const today = getDate(this.today);

    if (today > this.billingDate) {
      return false;
    } else {
      return true;
    }
  }
  // 下一个账单日
  private get nextBillingDate(): Date {
    // 如果今日已经过了本月的账单，则账单日在下一个月
    if (!this.isNextBillingInThisMoth) {
      return setDate(addMonths(this.today, 1), this.billingDate);
    } else {
      // 否则在本月的账单日
      return setDate(this.today, this.billingDate);
    }
  }

  // 具体的还款日
  private get nextRepaymentDate(): Date {
    const nextBillingDate = this.nextBillingDate; // 订单日

    if (this.billingDate > this.repaymentDate) {
      return setDate(addMonths(nextBillingDate, 1), this.repaymentDate);
    } else {
      return setDate(nextBillingDate, this.repaymentDate);
    }
  }
  // 计算今日起算到账单日的时间
  private fromBillingDate(): number {
    return Math.abs(differenceInDays(this.today, this.nextBillingDate));
  }
  // 计算从账单日 - 还款日的时间
  private fromRepaymentDate(): number {
    return Math.abs(
      differenceInDays(this.nextBillingDate, this.nextRepaymentDate)
    );
  }
}

export { CardPlayer };
export default CardPlayer;
