### 一个用于计算信用卡免息期的库

```ts
import { CardPlayer } from "card-player";

const billingDate = 10; // 信用卡账单日
const repaymentDate = 4; // 信用卡还款日

console.log(`今日刷卡免息期: ${new CardPlayer(10, 4).freePeriod()}`);
```

## License

The [MIT License](LICENSE)
