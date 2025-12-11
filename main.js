    /* --- VERİ TABANI --- */
    const UNITS = ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"];
    const TENS = ["", "zehn", "zwanzig", "dreißig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig"];
    
    const DAYS = [
        { tr: "Pazartesi", de: "Montag" }, { tr: "Salı", de: "Dienstag" }, { tr: "Çarşamba", de: "Mittwoch" },
        { tr: "Perşembe", de: "Donnerstag" }, { tr: "Cuma", de: "Freitag" }, { tr: "Cumartesi", de: "Samstag" }, { tr: "Pazar", de: "Sonntag" }
    ];
    const MONTHS = [
        { tr: "Ocak", de: "Januar" }, { tr: "Şubat", de: "Februar" }, { tr: "Mart", de: "März" }, { tr: "Nisan", de: "April" }, { tr: "Mayıs", de: "Mai" }, { tr: "Haziran", de: "Juni" },
        { tr: "Temmuz", de: "Juli" }, { tr: "Ağustos", de: "August" }, { tr: "Eylül", de: "September" }, { tr: "Ekim", de: "Oktober" }, { tr: "Kasım", de: "November" }, { tr: "Aralık", de: "Dezember" }
    ];

    const A1_VOCAB = [
        { tr: "Elma", de: "der Apfel", type: "noun" }, { tr: "Araba", de: "das Auto", type: "noun" },
        { tr: "Kitap", de: "das Buch", type: "noun" }, { tr: "Masa", de: "der Tisch", type: "noun" },
        { tr: "Sandalye", de: "der Stuhl", type: "noun" }, { tr: "Ev", de: "das Haus", type: "noun" },
        { tr: "Kedi", de: "die Katze", type: "noun" }, { tr: "Köpek", de: "der Hund", type: "noun" },
        { tr: "Öğretmen (E)", de: "der Lehrer", type: "noun" }, { tr: "Su", de: "das Wasser", type: "noun" },
        { tr: "Ekmek", de: "das Brot", type: "noun" }, { tr: "Süt", de: "die Milch", type: "noun" },
        { tr: "Pencere", de: "das Fenster", type: "noun" }, { tr: "Kapı", de: "die Tür", type: "noun" },
        { tr: "Gitmek", de: "gehen", type: "verb" }, { tr: "Gelmek", de: "kommen", type: "verb" },
        { tr: "Yemek yemek", de: "essen", type: "verb" }, { tr: "İçmek", de: "trinken", type: "verb" },
        { tr: "Güzel", de: "schön", type: "adj" }, { tr: "İyi", de: "gut", type: "adj" },
        { tr: "Kötü", de: "schlecht", type: "adj" }, { tr: "Büyük", de: "groß", type: "adj" }
    ];

    /* --- YENİ EKLENEN VERİLER (PDF KAYNAKLI) --- */
    
    // 1. Selamlaşma Modülü
    const GREETINGS_DATA = [
        { tr: "Merhaba (Genel)", de: "Hallo", hint: "En yaygın selamlaşma" },
        { tr: "Günaydın", de: "Guten Morgen", hint: "Sabah kullanılır" },
        { tr: "İyi günler", de: "Guten Tag", hint: "Gündüz kullanılır" },
        { tr: "İyi akşamlar", de: "Guten Abend", hint: "Akşam kullanılır" },
        { tr: "İyi geceler", de: "Gute Nacht", hint: "Yatmadan önce, vedalaşırken" },
        { tr: "Selam (Kuzey Almanya)", de: "Moin", hint: "Kuzey bölgelerinde yaygın" },
        { tr: "Merhaba (Güney Almanya)", de: "Grüß Gott", hint: "Bavyera/Avusturya bölgesi" },
        { tr: "Selam sana (Samimi)", de: "Grüß dich", hint: "Sadece 'sen' dediğin kişilere" },
        { tr: "Görüşürüz", de: "Tschüss", hint: "Samimi veda" },
        { tr: "Görüşmek üzere", de: "Auf Wiedersehen", hint: "Resmi veda" }
    ];

    // 2. Diyalog ve Tanışma Modülü
    const DIALOGUE_DATA = [
        { tr: "Nasılsın? (Samimi)", de: "Wie geht es dir?", hint: "Arkadaşına sorarken" },
        { tr: "Nasılsınız? (Resmi)", de: "Wie geht es Ihnen?", hint: "Tanımadığın birine sorarken" },
        { tr: "İyiyim.", de: "Mir geht es gut.", hint: "Standart cevap" },
        { tr: "Benim adım Begi.", de: "Ich heiße Begi.", hint: "İsim söyleme (heißen)" },
        { tr: "Ben Begi.", de: "Ich bin Begi.", hint: "İsim söyleme (sein)" },
        { tr: "Nereden geliyorsun?", de: "Woher kommst du?", hint: "Memleket sorma" },
        { tr: "Türkiye'den geliyorum.", de: "Ich komme aus der Türkei.", hint: "Dikkat: 'der' Türkei" },
        { tr: "Nerede oturuyorsun?", de: "Wo wohnst du?", hint: "İkamet sorma" },
        { tr: "Berlin'de oturuyorum.", de: "Ich wohne in Berlin.", hint: "Şehir ile kullanım" },
        { tr: "Adın ne?", de: "Wie heißt du?", hint: "İsim sorma" }
    ];

    // 3. Gramer Modülü (Haben/Sein & Fiil Çekimi)
    const GRAMMAR_DATA = [
        // Haben vs Sein
        { q: "Ich ___ müde. (Yorgunum)", ans: "bin", alts: ["habe", "bist"], hint: "Durum bildiriyor (sein)" },
        { q: "Ich ___ Hunger. (Açım)", ans: "habe", alts: ["bin", "hat"], hint: "Kalıp ifade: Açlığa sahibim" },
        { q: "Er ___ ein Auto. (Arabası var)", ans: "hat", alts: ["ist", "habe"], hint: "Sahiplik (haben)" },
        { q: "Wir ___ glücklich. (Mutluyuz)", ans: "sind", alts: ["haben", "seid"], hint: "Duygu durumu (sein)" },
        { q: "Du ___ mein Freund. (Arkadaşımsın)", ans: "bist", alts: ["hast", "ist"], hint: "Kimlik (sein)" },
        // Fiil Çekimleri
        { q: "Ich komm__ aus İzmir.", ans: "e", alts: ["st", "t"], hint: "Ben (ich) -> -e eki" },
        { q: "Du wohn__ in Ankara.", ans: "st", alts: ["e", "t"], hint: "Sen (du) -> -st eki" },
        { q: "Er geh__ nach Hause.", ans: "t", alts: ["st", "en"], hint: "O (er) -> -t eki" },
        { q: "Wir heiß__ Yılmaz.", ans: "en", alts: ["t", "e"], hint: "Biz (wir) -> -en eki" },
        // Artikeller
        { q: "___ Stuhl (Sandalye)", ans: "Der", alts: ["Die", "Das"], hint: "Eril isim (Maskulin)" },
        { q: "___ Lampe (Lamba)", ans: "Die", alts: ["Der", "Das"], hint: "Dişil isim (Feminin)" },
        { q: "___ Buch (Kitap)", ans: "Das", alts: ["Der", "Die"], hint: "Nötr isim (Neutral)" }
    ];

    // --- OYUN DEĞİŞKENLERİ ---
    let currentCategory = 'numbers';
    let questions = [];
    let currentQ = 0;
    let currentData = null;
    let currentSpeed = 0.9;
    let lastCorrectText = "";

    // --- SES MOTORU ---
    let synth = window.speechSynthesis;
    let selectedVoice = null;
    let voices = [];

    // --- SAYFA YÖNETİMİ ---
    function showMenu() {
        document.getElementById('menu-screen').style.display = 'block';
        document.getElementById('quiz-screen').style.display = 'none';
        document.getElementById('end-screen').style.display = 'none';
        populateVoiceList();
    }

    function startGame(category) {
        currentCategory = category;
        document.getElementById('menu-screen').style.display = 'none';
        document.getElementById('quiz-screen').style.display = 'block';
        
        let title = "";
        if(category === 'numbers') title = "Sayılar";
        else if(category === 'years') title = "Tarihler";
        else if(category === 'days') title = "Takvim";
        else if(category === 'vocab') title = "A1 Kelimeler";
        else if(category === 'greetings') title = "Selamlaşma"; // Yeni
        else if(category === 'dialogue') title = "Tanışma Diyaloğu"; // Yeni
        else if(category === 'grammar') title = "Temel Gramer"; // Yeni
        
        document.getElementById('game-title').innerText = title;
        populateVoiceList();
        
        questions = generateQuestionsForCategory(category);
        currentQ = 0;
        loadQuestion();
    }

    function restartCurrentGame() {
        startGame(currentCategory);
        document.getElementById('end-screen').style.display = 'none';
    }

    // --- SORU ÜRETİMİ ---
    function generateQuestionsForCategory(cat) {
        let qList = [];
        // Her kategori için 10 soru
        for(let i=0; i<10; i++) {
            let qData;
            if (cat === 'numbers') {
                qData = decomposeNumber(rdm(0, 1000));
            } 
            else if (cat === 'years') {
                let year = (Math.random() > 0.5) ? rdm(1950, 1999) : rdm(2000, 2030);
                qData = decomposeYear(year);
            }
            else if (cat === 'days') {
                qData = getDayMonthQuestion();
            }
            else if (cat === 'vocab') {
                qData = getVocabQuestion();
            }
            // --- YENİ MODÜL MANTIKLARI ---
            else if (cat === 'greetings') {
                qData = getGreetingQuestion();
            }
            else if (cat === 'dialogue') {
                qData = getDialogueQuestion();
            }
            else if (cat === 'grammar') {
                qData = getGrammarQuestion();
            }
            qList.push(qData);
        }
        return qList;
    }

    // --- YENİ MODÜL FONKSİYONLARI ---

    function getGreetingQuestion() {
        let item = GREETINGS_DATA[rdm(0, GREETINGS_DATA.length - 1)];
        // Parçalara ayır: "Guten Morgen" -> ["Guten", "Morgen"]
        let parts = item.de.split(" ");
        // Çeldiriciler
        let distractors = ["Tag", "Abend", "Nacht", "Auf", "Wiedersehen", "Hallo", "Moin"];
        distractors = cleanDistractors(parts, distractors);
        return { val: item.tr, parts: parts, distractors: distractors, hint: item.hint };
    }

    function getDialogueQuestion() {
        let item = DIALOGUE_DATA[rdm(0, DIALOGUE_DATA.length - 1)];
        let parts = item.de.split(" ").filter(p => p.length > 0);
        // Cümledeki noktalamayı temizle (opsiyonel, burada basit tutuyoruz)
        // Çeldiriciler: Yaygın kelimelerden rastgele al
        let commonWords = ["du", "Sie", "ich", "er", "ist", "bist", "wohne", "komme", "aus", "in"];
        let distractors = cleanDistractors(parts, commonWords);
        return { val: item.tr, parts: parts, distractors: distractors, hint: item.hint };
    }

    function getGrammarQuestion() {
        let item = GRAMMAR_DATA[rdm(0, GRAMMAR_DATA.length - 1)];
        // Gramer soruları boşluk doldurma mantığında
        // Soru: "Ich ___ müde." -> Ekranda görünecek metin
        // Cevap Parçası: "bin"
        // Çeldiriciler: ["habe", "bist"]
        
        // Bu modül için 'val' kısmında soruyu gösteriyoruz
        return { 
            val: item.q, 
            parts: [item.ans], 
            distractors: item.alts, 
            hint: item.hint 
        };
    }

    // --- MEVCUT FONKSİYONLAR ---
    function getVocabQuestion() {
        let item = A1_VOCAB[rdm(0, A1_VOCAB.length - 1)];
        let parts = [], distractors = [], hint = "";

        if(item.type === "noun") {
            let split = item.de.split(" ");
            parts = split;
            distractors = ["der", "die", "das"].filter(a => a !== split[0]);
            let randomWord = A1_VOCAB[rdm(0, A1_VOCAB.length-1)].de.split(" ").pop();
            distractors.push(randomWord);
            hint = "Artikeliyle eşleştir.";
        } else {
            parts = [item.de];
            distractors.push(A1_VOCAB[rdm(0, A1_VOCAB.length-1)].de.split(" ").pop());
            distractors.push(A1_VOCAB[rdm(0, A1_VOCAB.length-1)].de.split(" ").pop());
            hint = "Almanca karşılığı.";
        }
        distractors = cleanDistractors(parts, distractors);
        return { val: item.tr, parts: parts, distractors: distractors, hint: hint };
    }

    function decomposeNumber(n) {
        let parts = [], distractors = [], hint = "";
        if (n <= 12) {
            let word = (n===11)?"elf":(n===12)?"zwölf":(n===10)?"zehn":UNITS[n];
            parts.push(word); distractors.push(n===1?"ein":"eins", "zehn"); hint = "Temel sayı";
        } else if (n < 20) {
            let unit = n%10;
            if(n===16) { parts=["sech","zehn"]; distractors=["sechs"]; }
            else if(n===17) { parts=["sieb","zehn"]; distractors=["sieben"]; }
            else { parts=[UNITS[unit],"zehn"]; distractors=[TENS[unit]]; }
            distractors.push("und"); hint = "Onlu sayı";
        } else if (n < 100) {
            let unit=n%10, ten=Math.floor(n/10);
            if(unit===0) { parts=[TENS[ten]]; distractors=[UNITS[ten]]; }
            else { parts=[(unit===1?"ein":UNITS[unit]), "und", TENS[ten]]; distractors.push(unit===1?"eins":"ein", UNITS[ten]); }
            hint = "Ters okuma (Birler + und + Onlar)";
        } else {
            let h = Math.floor(n/100), rem = n%100;
            parts.push(h===1?"ein":UNITS[h], "hundert"); distractors.push("eins", "und");
            if(rem>0) { let sub=decomposeNumber(rem); parts=parts.concat(sub.parts); distractors=distractors.concat(sub.distractors); }
            hint = "Yüzlü Sayı";
        }
        return { val: n, parts, distractors: cleanDistractors(parts, distractors), hint };
    }

    function decomposeYear(y) {
        let parts = [], distractors = ["und", "hundert"], hint = "";
        if (y < 2000) {
            let p1 = Math.floor(y/100), p2 = y%100;
            parts = parts.concat(decomposeNumber(p1).parts, ["hundert"], decomposeNumber(p2).parts);
            hint = "19.. Yılı (İlk ikisi + hundert + son ikisi)";
        } else {
            let rem = y%1000;
            parts = ["zwei", "tausend"].concat(decomposeNumber(rem).parts);
            distractors.push("hundert");
            hint = "2000+ Yılı (Normal okunuş)";
        }
        return { val: y, parts, distractors: cleanDistractors(parts, distractors), hint };
    }

    function getDayMonthQuestion() {
        let isDay = Math.random() > 0.5;
        let list = isDay ? DAYS : MONTHS;
        let idx = rdm(0, list.length-1);
        let item = list[idx];
        let wrong1 = list[(idx+1)%list.length].de;
        let wrong2 = list[(idx+2)%list.length].de;
        return { val: item.tr, parts: [item.de], distractors: [wrong1, wrong2], hint: "Almancasını bul" };
    }

    function rdm(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
    function cleanDistractors(parts, dist) { return [...new Set(dist)].filter(d => !parts.includes(d)).slice(0, 5); }

    // --- OYUN AKIŞI ---
    function loadQuestion() {
        if(currentQ >= questions.length) {
            document.getElementById('quiz-screen').style.display = 'none';
            document.getElementById('end-screen').style.display = 'block';
            return;
        }
        currentData = questions[currentQ];
        // Ses için doğru cevabı kaydet (Gramer modunda parça değil, tam cümle okutulabilir ama şimdilik parçayı okutuyoruz)
        lastCorrectText = currentData.parts.join(' '); 
        
        document.getElementById('q-counter').innerText = `${currentQ + 1} / 10`;
        document.getElementById('target-num').innerText = currentData.val;
        document.getElementById('target-hint').innerText = currentData.hint || "";
        document.getElementById('feedback-msg').innerText = "";
        
        document.getElementById('listen-btn').style.display = 'none';
        
        const zone = document.getElementById('drop-zone');
        zone.className = "construction-zone";
        zone.innerHTML = '<span style="color:#bdc3c7; pointer-events:none; font-size:0.8em;" id="placeholder-msg">Parçaları buraya sürükleyin...</span>';
        
        const pool = document.getElementById('source-pool');
        pool.innerHTML = '';
        
        let allWords = [...currentData.parts, ...currentData.distractors];
        allWords.sort(() => Math.random() - 0.5);
        
        allWords.forEach((word, idx) => {
            const el = document.createElement('div');
            el.className = 'word-chip';
            el.innerText = word;
            el.dataset.val = word;
            el.onclick = () => handleClickTransfer(el); 
            pool.appendChild(el);
        });
        updatePreview();
    }

    function handleClickTransfer(el) {
        const zone = document.getElementById('drop-zone');
        const pool = document.getElementById('source-pool');
        const ph = document.getElementById('placeholder-msg');
        
        if (el.parentElement === pool) {
            if(ph) ph.style.display = 'none';
            zone.appendChild(el); 
        } else {
            pool.appendChild(el); 
            if(zone.children.length <= 1 && ph) ph.style.display = 'block';
        }
        updatePreview();
    }

    function updatePreview() {
        const chips = document.querySelectorAll('#drop-zone .word-chip');
        let text = "";
        let separator = (currentCategory === 'numbers' || currentCategory === 'years') ? "" : " "; 
        // Gramer modunda sadece boşluğa gelen kelimeyi gösteriyoruz, ama önizleme metni genel kalabilir.
        chips.forEach(c => text += c.dataset.val + separator);
        document.getElementById('preview-text').innerText = text.trim();
    }

    function checkAnswer() {
        const chips = document.querySelectorAll('#drop-zone .word-chip');
        let rawParts = [];
        chips.forEach(c => rawParts.push(c.dataset.val));
        
        let correctParts = currentData.parts;
        // Basit string karşılaştırması
        let isCorrect = (rawParts.join('') === correctParts.join(''));

        if (isCorrect) {
            document.getElementById('drop-zone').className = "construction-zone correct";
            document.getElementById('feedback-msg').innerText = "Harika! 🎉";
            document.getElementById('feedback-msg').style.color = "var(--success)";
            
            // Eğer gramer sorusuysa, tam cümleyi okutmak daha eğitici olur
            let textToRead = rawParts.join(' ');
            if (currentCategory === 'grammar') {
                // Gramer sorularında val: "Ich ___ müde" -> Okunacak: "Ich bin müde"
                textToRead = currentData.val.replace('___', rawParts[0]);
            }

            readOutLoud(textToRead);
            lastCorrectText = textToRead; // Dinle butonu için güncelle

            document.getElementById('listen-btn').style.display = 'inline-block';

            document.getElementById('action-btn').innerText = "Sonraki >>";
            document.getElementById('action-btn').onclick = () => { 
                currentQ++; 
                document.getElementById('action-btn').innerText = "Kontrol Et";
                document.getElementById('action-btn').onclick = checkAnswer;
                loadQuestion(); 
            };
        } else {
            document.getElementById('drop-zone').className = "construction-zone wrong";
            setTimeout(() => document.getElementById('drop-zone').className = "construction-zone", 500);
            document.getElementById('feedback-msg').innerText = "Yanlış, tekrar dene.";
            document.getElementById('feedback-msg').style.color = "var(--error)";
        }
    }

    function resetLevel() { loadQuestion(); }

    // --- SES YÖNETİMİ ---
    function populateVoiceList() {
        if (!synth) return;
        voices = synth.getVoices().filter(v => v.lang.startsWith('de'));
        
        ['voice-select-main', 'voice-select-game'].forEach(id => {
            const select = document.getElementById(id);
            if(!select) return;
            select.innerHTML = '';
            
            if(voices.length === 0) {
                let opt = document.createElement('option');
                opt.text = "Almanca Ses Yok";
                select.add(opt);
                return;
            }

            voices.forEach(v => {
                let opt = document.createElement('option');
                opt.text = v.name.substring(0, 25);
                opt.value = v.name;
                select.add(opt);
            });

            if(selectedVoice) select.value = selectedVoice.name;
            else {
                let best = voices.find(v => v.name.includes("Google Deutsch")) || voices[0];
                if(best) { select.value = best.name; selectedVoice = best; }
            }
        });
    }

    function manualVoiceSelect(id) {
        let val = document.getElementById(id).value;
        selectedVoice = voices.find(v => v.name === val);
        let otherId = (id === 'voice-select-main') ? 'voice-select-game' : 'voice-select-main';
        if(document.getElementById(otherId)) document.getElementById(otherId).value = val;
    }

    function readOutLoud(text) {
        if(!synth) return;
        synth.cancel();
        const u = new SpeechSynthesisUtterance(text);
        if(selectedVoice) u.voice = selectedVoice;
        else u.lang = 'de-DE';
        u.rate = currentSpeed;
        synth.speak(u);
    }
    
    function playCurrentAnswer() {
        if(lastCorrectText) readOutLoud(lastCorrectText);
    }

    function setSpeed(v) { currentSpeed = parseFloat(v); }

    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    }
    setTimeout(populateVoiceList, 500);
    showMenu();
