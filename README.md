### 一个用于计算信用卡免息期的库

```ts
import CreditCard from "credit-card-free-period";

const billingDate = 10; // 信用卡账单日
const repaymentDate = 4; // 信用卡还款日

console.log(`今日刷卡免息期: ${new CreditCard(10, 4).freePeriod()}`);
```
