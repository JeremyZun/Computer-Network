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
    const userAnswers = [];
    
    // 收集用戶答案
    quizData.forEach((item, idx) => {
        const sel = document.querySelector(`input[name="q${idx}"]:checked`);
        const userAns = sel ? parseInt(sel.value) : -1;
        userAnswers.push(userAns);
        
        if (userAns === item.a) correctCnt++;
    });
    
    // 顯示優化後的結果
    showEnhancedResults(correctCnt, userAnswers);
    
    // 防止重複提交
    document.getElementById('submitBtn').disabled = true;
});

// ====================== 優化結果顯示 ======================
function showEnhancedResults(correctCnt, userAnswers) {
    const percent = Math.round((correctCnt / quizData.length) * 100);
    const incorrectCnt = quizData.length - correctCnt;
    
    // 根據分數提供反饋
    let feedback = "";
    if (percent >= 90) {
        feedback = "優秀！你對網路基本概念有很好的理解！";
    } else if (percent >= 70) {
        feedback = "不錯！繼續努力，你可以掌握得更好！";
    } else if (percent >= 50) {
        feedback = "及格！建議複習一下相關概念。";
    } else {
        feedback = "需要加強！建議重新學習網路基本概念。";
    }
    
    // 生成結果HTML
    let resultHTML = `
        <div class="result-summary">
            <div class="score-circle">
                <div class="score">${correctCnt}</div>
                <div class="total">/ ${quizData.length}</div>
            </div>
            <div class="score-percent">${percent}%</div>
            <div class="score-feedback">${feedback}</div>
            <div class="progress-container">
                <div class="progress-bar" style="width: ${percent}%"></div>
            </div>
        </div>
        
        <div class="result-nav">
            <button id="showAllBtn">全部題目</button>
            <button id="showCorrectBtn">答對的題目 (${correctCnt})</button>
            <button id="showIncorrectBtn">答錯的題目 (${incorrectCnt})</button>
        </div>
        
        <div class="result-details">
            <div class="result-section" id="allQuestions">
                <h3>所有題目</h3>
    `;
    
    // 生成所有題目的詳細結果
    quizData.forEach((item, idx) => {
        const userAns = userAnswers[idx];
        const isCorrect = userAns === item.a;
        const userAnswerText = userAns !== -1 ? `(${userAns + 1}) ${item.o[userAns]}` : "未作答";
        const correctAnswerText = `(${item.a + 1}) ${item.o[item.a]}`;
        
        resultHTML += `
            <div class="question-result ${isCorrect ? 'correct' : 'incorrect'}">
                <div class="question-text">${idx + 1}. ${item.q}</div>
                <div class="answer-comparison">
                    <div class="answer-box user-answer">
                        <div class="answer-label">你的答案</div>
                        <div class="answer-text">${userAnswerText}</div>
                    </div>
                    ${!isCorrect ? `
                    <div class="answer-box correct-answer">
                        <div class="answer-label">正確答案</div>
                        <div class="answer-text">${correctAnswerText}</div>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    });
    
    resultHTML += `
            </div>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-value">${correctCnt}</div>
                    <div class="stat-label">答對題數</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${incorrectCnt}</div>
                    <div class="stat-label">答錯題數</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${percent}%</div>
                    <div class="stat-label">正確率</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${quizData.length}</div>
                    <div class="stat-label">總題數</div>
                </div>
            </div>
            
            <div class="retry-container">
                <button id="retryBtn">重新測驗</button>
            </div>
        </div>
    `;
    
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = resultHTML;
    resultDiv.classList.remove('hidden');
    
    // 添加結果導航功能
    setupResultNavigation();
    
    // 添加重新測驗功能
    document.getElementById('retryBtn').addEventListener('click', () => {
        location.reload();
    });
    
    // 滾動到結果區域
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

// ====================== 結果導航功能 ======================
function setupResultNavigation() {
    const allQuestionsSection = document.getElementById('allQuestions');
    const showAllBtn = document.getElementById('showAllBtn');
    const showCorrectBtn = document.getElementById('showCorrectBtn');
    const showIncorrectBtn = document.getElementById('showIncorrectBtn');
    
    // 創建正確和錯誤題目部分
    const correctQuestionsSection = document.createElement('div');
    correctQuestionsSection.className = 'result-section hidden';
    correctQuestionsSection.innerHTML = '<h3>答對的題目</h3>';
    
    const incorrectQuestionsSection = document.createElement('div');
    incorrectQuestionsSection.className = 'result-section hidden';
    incorrectQuestionsSection.innerHTML = '<h3>答錯的題目</h3>';
    
    // 將題目分類到正確的部分
    const questionResults = document.querySelectorAll('.question-result');
    questionResults.forEach(result => {
        if (result.classList.contains('correct')) {
            correctQuestionsSection.appendChild(result.cloneNode(true));
        } else {
            incorrectQuestionsSection.appendChild(result.cloneNode(true));
        }
    });
    
    // 將新部分添加到結果區域
    allQuestionsSection.parentNode.insertBefore(correctQuestionsSection, allQuestionsSection.nextSibling);
    correctQuestionsSection.parentNode.insertBefore(incorrectQuestionsSection, correctQuestionsSection.nextSibling);
    
    // 設置導航按鈕事件
    showAllBtn.addEventListener('click', () => {
        allQuestionsSection.classList.remove('hidden');
        correctQuestionsSection.classList.add('hidden');
        incorrectQuestionsSection.classList.add('hidden');
        
        showAllBtn.disabled = true;
        showCorrectBtn.disabled = false;
        showIncorrectBtn.disabled = false;
    });
    
    showCorrectBtn.addEventListener('click', () => {
        allQuestionsSection.classList.add('hidden');
        correctQuestionsSection.classList.remove('hidden');
        incorrectQuestionsSection.classList.add('hidden');
        
        showAllBtn.disabled = false;
        showCorrectBtn.disabled = true;
        showIncorrectBtn.disabled = false;
    });
    
    showIncorrectBtn.addEventListener('click', () => {
        allQuestionsSection.classList.add('hidden');
        correctQuestionsSection.classList.add('hidden');
        incorrectQuestionsSection.classList.remove('hidden');
        
        showAllBtn.disabled = false;
        showCorrectBtn.disabled = false;
        showIncorrectBtn.disabled = true;
    });
    
    // 初始狀態為顯示所有題目
    showAllBtn.disabled = true;
}