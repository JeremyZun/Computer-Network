// ====================== 題目資料 ======================
const quizData = [
    { q: "網際網路上的主機(host)又稱為", o: ["交換器","端系統(end system)","路由器","以上皆可"], a: 1 },
    { q: "網際網路的功能就是把終端系統連接在一起，所以提供連線服務給終端系統的____，它們也必須彼此相連", o: ["交換器","工作站","ISP","以上皆非"], a: 2 },
    { q: "有能力發送至對方和接收來自對方資訊的軟硬體稱為", o: ["路由器","工作站","ISP","實體(entity)"], a: 3 },
    { q: "IETF 文件稱為建議需求是指 ____，的一種非常重要的標準。", o: ["RFC","ANSI","ITU-T","IEEE"], a: 0 },
    { q: "一個互連的網路可以包含", o: ["LANs","MANs","WANs","以上皆是"], a: 3 },
    { q: "本地迴路傳輸語音時，其頻寛為", o: ["4KHz","8KHz","16KHz","64KHz"], a: 0 },
    { q: "本地廻路雙絞線能夠處理到的頻寬為", o: ["4KHz","8KHz","64KHz","1.104MHz"], a: 3 },
    { q: "PON 的光接取網路是由_____組成", o: ["OLT","ODN","ONU","以上皆是"], a: 3 },
    { q: "_____是光纖與同軸電纜結合起來的一種寬頻接取網路", o: ["PON","HFC","Wi-Fi","以上皆非"], a: 1 },
    { q: "哪一種為無線個人區域網路(WPAN)", o: ["藍牙","ZigBee","UWB","以上皆是"], a: 3 },
    { q: "有需求立即可用的軟體服務稱為", o: ["Iaas","Paas","Saas","以上皆是"], a: 2 },
    { q: "SDN 交換器所用的協定為", o: ["TCP","UDP","OpenFlow","PPP"], a: 2 },
    { q: "SDN 交換器與現今網路交換器最主要不同為", o: ["只能轉發資料","能轉發資料及控制訊號","只能轉發控制訊號","以上都有可能"], a: 0 },
    { q: "OpenFlow 訊息類型共有____大類型", o: ["1","2","3","4"], a: 2 },
    { q: "無線廣域網路(WWAN)可以分為蜂巢式電話系統和____網路", o: ["Wi-Fi","衛星","藍牙","ZigBee"], a: 1 },
    { q: "光纖網路會因用戶所住位置、周邊環境以及需求的不同，而發展出各式各樣不同的光纖接取技術稱為", o: ["FTTH","FTTB","FTTC","FTTx"], a: 3 },
    { q: "下列何者為電腦網路的優點", o: ["遠端遙控","資源可以共享","提升通訊能力","以上皆是"], a: 3 },
    { q: "電腦網路的節點可以是一台", o: ["電腦","交換器","印表機","以上皆是"], a: 3 },
    { q: "電腦與電腦之間或電腦與終端機之間為相互交換資訊的格式和內容而訂定一套規則，稱為", o: ["IP","通訊協定","TCP","以上皆是"], a: 1 },
    { q: "網際網路的發展起源是", o: ["國防之需","學術界之需","商業界之需","以上皆非"], a: 0 }
];

quizData.sort(() => Math.random() - 0.5);

// ====================== 產生題目 ======================
const form = document.getElementById('quizForm');

quizData.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'question';
    div.innerHTML = `<h3>${idx + 1}. ${item.q}</h3>`;

    item.o.forEach((opt, oIdx) => {
        const optId = `q${idx}_o${oIdx}`;
        div.innerHTML += `
            <div class="option">
                <input type="radio" name="q${idx}" value="${oIdx}" id="${optId}">
                <label for="${optId}">(${oIdx + 1}) ${opt}</label>
            </div>`;
    });
    form.appendChild(div);
});

// ====================== 提交 & 計分 ======================
document.getElementById('submitBtn').addEventListener('click', () => {
    let correctCnt = 0;
    let resultHTML = '<h2>測驗結果</h2>';

    quizData.forEach((item, idx) => {
        const sel = document.querySelector(`input[name="q${idx}"]:checked`);
        const userAns = sel ? parseInt(sel.value) : -1;
        const isCorrect = userAns === item.a;

        if (isCorrect) correctCnt++;

        resultHTML += `
            <p>
                <strong>${idx + 1}.</strong> ${item.q}<br>
                <span class="${isCorrect ? 'correct' : 'incorrect'}">
                    ${isCorrect ? '正確' : `錯誤（正確答案：(${item.a + 1}) ${item.o[item.a]}）`}
                </span>
            </p>`;
    });

    const percent = Math.round((correctCnt / quizData.length) * 100);
    resultHTML += `<h3>總分：${correctCnt} / ${quizData.length} （${percent}%）</h3>`;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = resultHTML;
    resultDiv.classList.remove('hidden');

    // 防止重複提交
    document.getElementById('submitBtn').disabled = true;
});
