    /* VERİ SETİ (PDF Kaynaklı) */
    const questions = [
        { val: "13", hint: "Önce birler, sonra onlar (Ters yok)", parts: ["drei", "zehn"], distractors: ["und", "dreißig"] },
        { val: "17", hint: "Dikkat: 'en' düşer! [cite: 65]", parts: ["sieb", "zehn"], distractors: ["sieben", "und"] },
        { val: "21", hint: "Dikkat: 's' düşer! [cite: 73]", parts: ["ein", "und", "zwanzig"], distractors: ["eins", "zwei"] },
        { val: "35", hint: "Ters Mantık: 5 ve 30", parts: ["fünf", "und", "dreißig"], distractors: ["drei", "fünfzig", "zehn"] },
        { val: "1981", hint: "Yıl Okunuşu (19.. 81) [cite: 124]", parts: ["neunzehn", "hundert", "ein", "und", "achtzig"], distractors: ["tausend", "eins"] },
        { val: "2023", hint: "Yıl (2000+) Normal okunur [cite: 134]", parts: ["zwei", "tausend", "drei", "und", "zwanzig"], distractors: ["hundert", "null"] },
        { val: "99", hint: "9 ve 90", parts: ["neun", "und", "neunzig"], distractors: ["neunzehn"] },
        { val: "70", hint: "Dikkat: 'en' düşer [cite: 83]", parts: ["siebzig"], distractors: ["siebenzig", "sieben"] },
        { val: "16", hint: "Dikkat: 's' düşer [cite: 61]", parts: ["sech", "zehn"], distractors: ["sechs", "und"] },
        { val: "105", hint: "Yüz beş (und yok)", parts: ["ein", "hundert", "fünf"], distractors: ["und", "fünfzig"] }
    ];

    let currentQ = 0;
    let currentData = null;
    let draggedItem = null;
    let dragSource = null; // 'pool' or 'zone'

    function startQuiz() {
        document.getElementById('end-screen').style.display = 'none';
        document.getElementById('quiz-screen').style.display = 'block';
        currentQ = 0;
        loadQuestion();
    }

    function loadQuestion() {
        if(currentQ >= questions.length) {
            document.getElementById('quiz-screen').style.display = 'none';
            document.getElementById('end-screen').style.display = 'block';
            return;
        }

        // Rastgele soru seçmiyoruz, sırayla gidiyoruz (veya karıştırılabilir)
        // Burada basitlik için sırayla.
        currentData = questions[currentQ];

        document.getElementById('q-counter').innerText = `Soru ${currentQ + 1} / ${questions.length}`;
        document.getElementById('target-num').innerText = currentData.val;
        document.getElementById('target-hint').innerText = currentData.hint;
        document.getElementById('feedback-msg').innerText = "";
        document.getElementById('drop-zone').className = "construction-zone";
        document.getElementById('preview-text').innerText = "";
        document.getElementById('action-btn').innerText = "Kontrol Et";
        document.getElementById('action-btn').onclick = checkAnswer;
        document.getElementById('action-btn').style.backgroundColor = "var(--success)";

        // Drop Zone Temizle
        const zone = document.getElementById('drop-zone');
        zone.innerHTML = '<span style="color:#bdc3c7; pointer-events:none;" id="placeholder-msg">Parçaları buraya bırakın...</span>';

        // Havuz Oluştur
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
        
        // Desktop Drag Events
        div.addEventListener('dragstart', handleDragStart);
        div.addEventListener('dragend', handleDragEnd);
        
        // Basit tıklama ile taşıma (Mobil/Hızlı kullanım için opsiyonel)
        div.addEventListener('click', () => handleClickTransfer(div));

        return div;
    }

    /* --- DRAG & DROP MANTIĞI (Insert Anywhere) --- */
    
    const zone = document.getElementById('drop-zone');

    function setupDragAndDrop() {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragenter', e => e.preventDefault());
        zone.addEventListener('drop', handleDrop);
    }

    function handleDragStart(e) {
        draggedItem = this;
        dragSource = this.parentElement.id === 'drop-zone' ? 'zone' : 'pool';
        
        // Görsel efekt için gecikme
        setTimeout(() => this.classList.add('dragging'), 0);
        e.dataTransfer.effectAllowed = 'move';
    }

    function handleDragEnd(e) {
        this.classList.remove('dragging');
        draggedItem = null;
        updatePreview();
    }

    function handleDragOver(e) {
        e.preventDefault(); // Drop'a izin ver
        
        // Hangi elemandan sonra ekleyeceğiz?
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

    // Fare pozisyonuna göre en yakın elemanı bulma (INSERT MANTIĞI BURADA)
    function getDragAfterElement(container, x) {
        // Sadece sürüklenmeyen elemanları al
        const draggableElements = [...container.querySelectorAll('.word-chip:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            // Yatay eksende (x) merkeze göre konum
            const offset = x - box.left - box.width / 2;
            
            // Mouse elemanın solundaysa (offset negatif) ve en büyük negatifse (en yakın)
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    function handleDrop(e) {
        e.preventDefault();
        
        // Eğer havuzdan geldiyse, havuzdaki orijinalini "used" yap
        if(dragSource === 'pool') {
            const originalId = draggedItem.id;
            // Biz şu an kopyasını (veya kendisini) taşıdık. 
            // Ancak UI mantığı gereği, havuzda "silik" bir kopyası kalsın istiyorsak:
            // Bu örnekte direkt taşıma yapıyoruz, havuzda kalmıyor.
            // Eğer havuzda kalsın istiyorsan klonlama mantığı gerekir. 
            // Basitlik için direkt taşıma yapıyoruz.
        }
        updatePreview();
    }

    /* --- TIKLAYARAK TAŞIMA (Alternatif) --- */
    function handleClickTransfer(el) {
        const parent = el.parentElement;
        const placeholder = document.getElementById('placeholder-msg');

        if (parent.id === 'source-pool') {
            // Havuzdan Zone'a (Sona ekle)
            if(placeholder) placeholder.style.display = 'none';
            zone.appendChild(el);
        } else {
            // Zone'dan Havuza (Geri gönder)
            const pool = document.getElementById('source-pool');
            pool.appendChild(el);
            if(zone.children.length === 1) { // Sadece placeholder kaldıysa
                 if(placeholder) placeholder.style.display = 'block';
            }
        }
        updatePreview();
    }

    function updatePreview() {
        // Zone içindeki kelimeleri sırayla oku
        const chips = zone.querySelectorAll('.word-chip');
        let text = "";
        chips.forEach(chip => text += chip.dataset.val);
        document.getElementById('preview-text').innerText = text;
        
        if(chips.length === 0) {
            const ph = document.getElementById('placeholder-msg');
            if(ph) ph.style.display = 'block';
        }
    }

    function resetLevel() {
        loadQuestion();
    }

    function checkAnswer() {
        const chips = zone.querySelectorAll('.word-chip');
        let userAns = "";
        chips.forEach(chip => userAns += chip.dataset.val);
        
        const correctAns = currentData.parts.join('');
        const fb = document.getElementById('feedback-msg');
        const btn = document.getElementById('action-btn');

        if (userAns === correctAns) {
            // DOĞRU
            document.getElementById('drop-zone').className = "construction-zone correct";
            fb.innerText = "Harika! Doğru sıralama. 🎉";
            fb.style.color = "var(--success)";
            
            btn.innerText = "Sonraki Soru >>";
            btn.onclick = () => { currentQ++; loadQuestion(); };
        } else {
            // YANLIŞ
            document.getElementById('drop-zone').className = "construction-zone wrong";
            setTimeout(() => document.getElementById('drop-zone').className = "construction-zone", 500);
            
            fb.innerText = "Henüz olmadı. Sıralamayı kontrol et.";
            fb.style.color = "var(--error)";
        }
    }

    // Başlangıç
    startQuiz();
