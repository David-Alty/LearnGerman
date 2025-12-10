  // --- GELİŞMİŞ SES SEÇİM SİSTEMİ ---
    let synth = window.speechSynthesis;
    let selectedVoice = null;
    let voices = [];

    // Tüm sesleri al ve dropdown'a doldur
    function populateVoiceList() {
        if (!synth) return;
        
        voices = synth.getVoices().sort(function (a, b) {
            const aname = a.name.toUpperCase();
            const bname = b.name.toUpperCase();
            if (aname < bname) return -1;
            else if (aname == bname) return 0;
            return +1;
        });

        const select = document.getElementById('voice-select');
        select.innerHTML = ''; // Temizle

        // Sadece Almanca sesleri filtrele
        const germanVoices = voices.filter(v => v.lang.startsWith('de'));
        
        if(germanVoices.length === 0) {
            const option = document.createElement('option');
            option.textContent = "Cihazda Almanca Ses Bulunamadı :(";
            select.appendChild(option);
            return;
        }

        // Dropdown'a ekle
        germanVoices.forEach((voice) => {
            const option = document.createElement('option');
            option.textContent = `${voice.name} (${voice.lang})`;
            option.setAttribute('data-name', voice.name);
            option.setAttribute('data-lang', voice.lang);
            select.appendChild(option);
        });

        // OTOMATİK EN İYİ SESİ SEÇME MANTIĞI
        // 1. Google Deutsch (Varsa öncelikli)
        let bestIndex = -1;
        bestIndex = germanVoices.findIndex(v => v.name.includes("Google Deutsch") || v.name.includes("Google German"));
        
        // 2. Yoksa: Anna, Martin, Petra (iOS/Mac Kaliteli Sesler)
        if (bestIndex === -1) {
            bestIndex = germanVoices.findIndex(v => ["Anna", "Martin", "Petra", "Markus"].some(n => v.name.includes(n)));
        }

        // 3. Yine de bulamadıysak ilk sıradakini seç
        if (bestIndex === -1) bestIndex = 0;

        // Seçimi uygula
        select.selectedIndex = bestIndex;
        manualVoiceSelect(); // Değişkeni güncelle
    }

    // Kullanıcı listeden elle seçim yaparsa
    function manualVoiceSelect() {
        const select = document.getElementById('voice-select');
        const selectedOption = select.selectedOptions[0];
        const name = selectedOption.getAttribute('data-name');
        
        // Seçilen ismi voices listesinde bul
        selectedVoice = voices.find(v => v.name === name);
        
        // Test etmek için "Deutsch" de
        // readOutLoud("Deutsch"); // (İstersen açabilirsin ama oyun akışını bozabilir)
    }

    // Tarayıcı sesleri yüklediğinde listeyi güncelle
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    }
    setTimeout(populateVoiceList, 500); // Mobil için yedek tetikleme

    // --- OYUN KODLARI (STANDART) ---
    const UNITS = ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"];
    const TENS = ["", "zehn", "zwanzig", "dreißig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig"];
    
    let currentSpeed = 0.9;
    let lastCorrectAnswer = ""; 

    function setSpeed(val) {
        currentSpeed = parseFloat(val);
        if(lastCorrectAnswer) readOutLoud(lastCorrectAnswer);
    }

    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    if(isMobile()) {
        document.getElementById('instruction-txt').innerText = "Kelimelere dokunarak yukarı taşıyın:";
        document.getElementById('placeholder-msg').innerText = "Dokunarak ekle...";
    }

    function rdm(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateRandomQuestions(count) {
        let newQuestions = [];
        for (let i = 0; i < count; i++) {
            let type = Math.random();
            let num, data;

            if (type < 0.2) num = rdm(0, 12);
            else if (type < 0.4) {
                if (Math.random() > 0.5) num = rdm(13, 19);
                else num = rdm(2, 9) * 10;
            } else if (type < 0.8) {
                num = rdm(21, 99);
                if(num % 10 === 0) num += 1; 
            } else {
                num = rdm(101, 999);
            }

            if(newQuestions.some(q => q.val == num)) { i--; continue; }
            data = decomposeNumber(num);
            newQuestions.push(data);
        }
        return newQuestions;
    }

    function decomposeNumber(n) {
        let parts = [];
        let distractors = [];
        let hint = "";

        if (n <= 12) {
            let word = "";
            if(n===11) word="elf";
            else if(n===12) word="zwölf";
            else if(n===10) word="zehn";
            else word = UNITS[n];
            parts.push(word);
            distractors.push(n === 1 ? "ein" : "eins"); 
            if(n>5) distractors.push("zehn");
            hint = "Temel sayı.";
        }
        else if (n < 20) {
            let unit = n % 10;
            if (n === 16) {
                parts = ["sech", "zehn"]; distractors = ["sechs", "und"]; hint = "Dikkat: 's' düşer!";
            } else if (n === 17) {
                parts = ["sieb", "zehn"]; distractors = ["sieben", "und"]; hint = "Dikkat: 'en' düşer!";
            } else {
                parts = [UNITS[unit], "zehn"]; distractors = ["und", TENS[unit]]; hint = "Önce birlik, sonra onluk.";
            }
        }
        else if (n < 100) {
            let unit = n % 10;
            let ten = Math.floor(n / 10);
            if (unit === 0) {
                parts = [TENS[ten]]; distractors = [UNITS[ten], "und"]; hint = "Tam onluk.";
            } else {
                let unitStr = UNITS[unit];
                if(unit === 1) unitStr = "ein"; 
                parts = [unitStr, "und", TENS[ten]];
                distractors.push(unit === 1 ? "eins" : "ein");
                distractors.push(UNITS[ten]);
                hint = "Ters okuma: Birlik + und + Onluk";
            }
        }
        else {
            let hundreds = Math.floor(n / 100);
            let remainder = n % 100;
            let hStr = (hundreds === 1) ? "ein" : UNITS[hundreds];
            parts.push(hStr); parts.push("hundert");
            distractors.push(hundreds === 1 ? "eins" : "ein"); distractors.push("und");

            if (remainder > 0) {
                let subData = decomposeNumber(remainder);
                subData.parts.forEach(p => parts.push(p));
                subData.distractors.forEach(d => distractors.push(d));
            }
            hint = "Yüzler basamağı önce gelir.";
        }

        distractors = [...new Set(distractors)].filter(d => !parts.includes(d)).slice(0, 3);
        
        return { val: n, parts: parts, distractors: distractors, hint: hint };
    }

    let questions = [];
    let currentQ = 0;
    let currentData = null;
    let draggedItem = null;

    function readOutLoud(text) {
        if (synth) {
            synth.cancel(); 
            const utterance = new SpeechSynthesisUtterance(text);
            
            // Eğer dropdown'dan bir ses seçildiyse onu kullan
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            } else {
                utterance.lang = 'de-DE'; // Fallback
            }
            
            utterance.rate = currentSpeed; 
            synth.speak(utterance);
        }
    }

    function startQuiz() {
        questions = generateRandomQuestions(10);
        document.getElementById('end-screen').style.display = 'none';
        document.getElementById('quiz-screen').style.display = 'block';
        currentQ = 0;
        lastCorrectAnswer = "";
        loadQuestion();
        populateVoiceList();
    }

    function loadQuestion() {
        if(currentQ >= questions.length) {
            document.getElementById('quiz-screen').style.display = 'none';
            document.getElementById('end-screen').style.display = 'block';
            return;
        }

        currentData = questions[currentQ];
        lastCorrectAnswer = "";

        document.getElementById('q-counter').innerText = `Soru ${currentQ + 1} / ${questions.length}`;
        document.getElementById('target-num').innerText = currentData.val;
        document.getElementById('target-hint').innerText = currentData.hint;
        document.getElementById('feedback-msg').innerText = "";
        document.getElementById('drop-zone').className = "construction-zone";
        document.getElementById('preview-text').innerText = "";
        document.getElementById('action-btn').innerText = "Kontrol Et";
        document.getElementById('action-btn').onclick = checkAnswer;
        document.getElementById('action-btn').style.backgroundColor = "var(--success)";

        const zone = document.getElementById('drop-zone');
        zone.innerHTML = '<span style="color:#bdc3c7; pointer-events:none; font-size:0.9em;" id="placeholder-msg">' + (isMobile() ? 'Dokunarak ekle...' : 'Buraya bırakın...') + '</span>';

        const pool = document.getElementById('source-pool');
        pool.innerHTML = '';
        
        let allWords = [...currentData.parts, ...currentData.distractors];
        allWords.sort(() => Math.random() - 0.5);

        allWords.forEach((word, idx) => {
            const el = createChip(word, 'pool-' + idx);
            pool.appendChild(el);
        });

        setupDragAndDrop();
    }

    function createChip(text, id) {
        const div = document.createElement('div');
        div.classList.add('word-chip');
        div.setAttribute('draggable', 'true'); 
        div.innerText = text;
        div.id = id;
        div.dataset.val = text;
        
        div.addEventListener('dragstart', handleDragStart);
        div.addEventListener('dragend', handleDragEnd);
        div.addEventListener('click', () => handleClickTransfer(div));

        return div;
    }

    const zone = document.getElementById('drop-zone');

    function setupDragAndDrop() {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragenter', e => e.preventDefault());
        zone.addEventListener('drop', handleDrop);
    }

    function handleDragStart(e) {
        draggedItem = this;
        setTimeout(() => this.classList.add('dragging'), 0);
        e.dataTransfer.effectAllowed = 'move';
    }

    function handleDragEnd(e) {
        this.classList.remove('dragging');
        draggedItem = null;
        updatePreview();
    }

    function handleDragOver(e) {
        e.preventDefault(); 
        const afterElement = getDragAfterElement(zone, e.clientX);
        const placeholder = document.getElementById('placeholder-msg');
        if(placeholder) placeholder.style.display = 'none';

        const dragging = document.querySelector('.dragging');
        if (afterElement == null) {
            zone.appendChild(dragging);
        } else {
            zone.insertBefore(dragging, afterElement);
        }
    }

    function getDragAfterElement(container, x) {
        const draggableElements = [...container.querySelectorAll('.word-chip:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = x - box.left - box.width / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    function handleDrop(e) { e.preventDefault(); updatePreview(); }

    function handleClickTransfer(el) {
        const parent = el.parentElement;
        const placeholder = document.getElementById('placeholder-msg');
        
        if (parent.id === 'source-pool') {
            if(placeholder) placeholder.style.display = 'none';
            zone.appendChild(el);
        } else {
            document.getElementById('source-pool').appendChild(el);
            if(zone.children.length === 1) { 
                 if(placeholder) placeholder.style.display = 'block';
            }
        }
        updatePreview();
    }

    function updatePreview() {
        const chips = zone.querySelectorAll('.word-chip');
        let text = "";
        chips.forEach(chip => text += chip.dataset.val);
        document.getElementById('preview-text').innerText = text;
        if(chips.length === 0) {
            const ph = document.getElementById('placeholder-msg');
            if(ph) ph.style.display = 'block';
        }
    }

    function resetLevel() { loadQuestion(); }

    function checkAnswer() {
        const chips = zone.querySelectorAll('.word-chip');
        let userAns = "";
        chips.forEach(chip => userAns += chip.dataset.val);
        
        const correctAns = currentData.parts.join('');
        const fb = document.getElementById('feedback-msg');
        const btn = document.getElementById('action-btn');

        if (userAns === correctAns) {
            document.getElementById('drop-zone').className = "construction-zone correct";
            fb.innerText = "Harika! Doğru. 🎉";
            fb.style.color = "var(--success)";
            
            lastCorrectAnswer = userAns;
            readOutLoud(userAns);

            btn.innerText = "Sonraki Soru >>";
            btn.onclick = () => { currentQ++; loadQuestion(); };
        } else {
            document.getElementById('drop-zone').className = "construction-zone wrong";
            setTimeout(() => document.getElementById('drop-zone').className = "construction-zone", 500);
            fb.innerText = "Hatalı sıralama.";
            fb.style.color = "var(--error)";
        }
    }

    startQuiz();