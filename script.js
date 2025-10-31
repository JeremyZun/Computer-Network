// script.js
document.addEventListener('DOMContentLoaded', () => {
    const quizData = [
        {
            question: "網際網路上的主機(host)又稱為",
            options: ["交換器", "端系統(end system)", "路由器", "以上皆可"],
            answer: 1 // 索引從0開始，所以(2)是1
        },
        {
            question: "網際網路的功能就是把終端系統連接在一起，所以提供連線服務給終端系統的____，它們也必須彼此相連",
            options: ["交換器", "工作站", "ISP", "以上皆非"],
            answer: 2
        },
        {
            question: "有能力發送至對方和接收來自對方資訊的軟硬體稱為",
            options: ["路由器", "工作站", "ISP", "實體(entity)"],
            answer: 3
        },
        {
            question: "IETF 文件稱為建議需求是指 ____，的一種非常重要的標準。",
            options: ["RFC", "ANSI", "ITU-T", "IEEE"],
            answer: 0
        },
        {
            question: "一個互連的網路可以包含",
            options: ["LANs", "MANs", "WANs", "以上皆是"],
            answer: 3
        },
        {
            question: "本地迴路傳輸語音時，其頻寛為",
            options: ["4KHz", "8KHz", "16KHz", "64KHz"],
            answer: 0
        },
        {
            question: "本地廻路雙絞線能夠處理到的頻寬為",
            options: ["4KHz", "8KHz", "64KHz", "1.104MHz"],
            answer: 3
        },
        {
            question: "PON 的光接取網路是由_____組成",
            options: ["OLT", "ODN", "ONU", "以上皆是"],
            answer: 3
        },
        {
            question: "_____是光纖與同軸電纜結合起來的一種寬頻接取網路",
            options: ["PON", "HFC", "Wi-Fi", "以上皆非"],
            answer: 1
        },
        {
            question: "哪一種為無線個人區域網路(WPAN)",
            options: ["藍牙", "ZigBee", "UWB", "以上皆是"],
            answer: 3
        },
        {
            question: "有需求立即可用的軟體服務稱為",
            options: ["Iaas", "Paas", "Saas", "以上皆是"],
            answer: 2
        },
        {
            question: "SDN 交換器所用的協定為",
            options: ["TCP", "UDP", "OpenFlow", "PPP"],
            answer: 2
        },
        {
            question: "SDN 交換器與現今網路交換器最主要不同為",
            options: ["只能轉發資料", "能轉發資料及控制訊號", "只能轉發控制訊號", "以上都有可能"],
            answer: 0
        },
        {
            question: "OpenFlow 訊息類型共有____大類型",
            options: ["1", "2", "3", "4"],
            answer: 2
        },
        {
            question: "無線廣域網路(WWAN)可以分為蜂巢式電話系統和____網路",
            options: ["Wi-Fi", "衛星", "藍牙", "ZigBee"],
            answer: 1
        },
        {
            question: "光纖網路會因用戶所住位置、周邊環境以及需求的不同，而發展出各式各樣不同的光纖接取技術稱為",
            options: ["FTTH", "FTTB", "FTTC", "FTTx"],
            answer: 3
        },
        {
            question: "下列何者為電腦網路的優點",
            options: ["遠端遙控", "資源可以共享", "提升通訊能力", "以上皆是"],
            answer: 3
        },
        {
            question: "電腦網路的節點可以是一台",
            options: ["電腦", "交換器", "印表機", "以上皆是"],
            answer: 3
        },
        {
            question: "電腦與電腦之間或電腦與終端機之間為相互交換資訊的格式和內容而訂定一套規則，稱為",
            options: ["IP", "通訊協定", "TCP", "以上皆是"],
            answer: 1
        },
        {
            question: "網際網路的發展起源是",
            options: ["國防之需", "學術界之需", "商業界之需", "以上皆非"],
            answer: 0
        }
    ];

    const quizForm = document.getElementById('quizForm');
    const submitBtn = document.getElementById('submitBtn');
    const resultDiv = document.getElementById('result');

    // 動態生成題目
    quizData.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `<h3>${index + 1}. ${q.question}</h3>`;
        q.options.forEach((option, optIndex) => {
            questionDiv.innerHTML += `
                <div class="option">
                    <input type="radio" name="q${index}" value="${optIndex}" id="q${index}o${optIndex}">
                    <label for="q${index}o${optIndex}">(${optIndex + 1}) ${option}</label>
                </div>
            `;
        });
        quizForm.appendChild(questionDiv);
    });

    // 提交事件
    submitBtn.addEventListener('click', () => {
        let score = 0;
        let resultHTML = '<h2>測驗結果</h2>';
        quizData.forEach((q, index) => {
            const selected = document.querySelector(`input[name="q${index}"]:checked`);
            const userAnswer = selected ? parseInt(selected.value) : -1;
            const isCorrect = userAnswer === q.answer;
            if (isCorrect) score++;
            resultHTML += `
                <p>${index + 1}. ${q.question} 
                <span class="${isCorrect ? 'correct' : 'incorrect'}">${isCorrect ? '正確' : '錯誤'} (正確答案: (${q.answer + 1}) ${q.options[q.answer]})</span>
                </p>
            `;
        });
        resultHTML += `<h3>總分: ${score} / ${quizData.length} (${Math.round((score / quizData.length) * 100)}%)</h3>`;
        resultDiv.innerHTML = resultHTML;
        resultDiv.style.display = 'block';
        submitBtn.disabled = true; // 防止重複提交
    });
});
