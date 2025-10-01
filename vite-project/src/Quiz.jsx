import React, { useEffect, useState } from "react";
let questionsCache = [];


const styles = {
    container: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6B73FF 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif'
    },

    backgroundBlob1: {
        position: 'absolute',
        top: '-160px',
        right: '-160px',
        width: '320px',
        height: '320px',
        background: 'rgba(139, 92, 246, 0.2)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'pulse 4s ease-in-out infinite'
    },

    backgroundBlob2: {
        position: 'absolute',
        bottom: '-160px',
        left: '-160px',
        width: '320px',
        height: '320px',
        background: 'rgba(59, 130, 246, 0.2)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'pulse 4s ease-in-out infinite 2s'
    },

    backgroundBlob3: {
        position: 'absolute',
        top: '160px',
        left: '160px',
        width: '240px',
        height: '240px',
        background: 'rgba(99, 102, 241, 0.2)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'pulse 4s ease-in-out infinite 1s'
    },

    mainContainer: {
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '600px'
    },

    header: {
        textAlign: 'center',
        marginBottom: '32px'
    },

    title: {
        fontSize: '3rem',
        fontWeight: 'bold',
        background: 'linear-gradient(135deg, #00f5ff, #a855f7)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '16px',
        textShadow: '0 4px 8px rgba(0,0,0,0.2)'
    },

    titleUnderline: {
        width: '96px',
        height: '4px',
        background: 'linear-gradient(135deg, #00f5ff, #a855f7)',
        borderRadius: '2px',
        margin: '0 auto'
    },

    card: {
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '24px',
        padding: '32px',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
        color: 'white'
    },

    resultCard: {
        textAlign: 'center'
    },

    trophyIcon: {
        fontSize: '4rem',
        marginBottom: '16px'
    },

    resultTitle: {
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '8px'
    },

    resultMessage: {
        fontSize: '1.125rem',
        color: '#d1d5db',
        marginBottom: '32px'
    },

    scoreDisplay: {
        fontSize: '3.5rem',
        fontWeight: 'bold',
        marginBottom: '8px'
    },

    progressBarContainer: {
        width: '100%',
        backgroundColor: 'rgba(55, 65, 81, 0.5)',
        borderRadius: '8px',
        height: '16px',
        marginBottom: '16px',
        overflow: 'hidden'
    },

    progressBar: {
        height: '16px',
        background: 'linear-gradient(135deg, #00f5ff, #a855f7)',
        borderRadius: '8px',
        transition: 'width 1s ease-out'
    },

    scorePercentage: {
        color: '#d1d5db',
        marginBottom: '32px'
    },

    resetButton: {
        position: 'relative',
        padding: '16px 32px',
        background: 'linear-gradient(135deg, #00f5ff, #a855f7)',
        borderRadius: '16px',
        fontWeight: '600',
        color: 'white',
        fontSize: '1.125rem',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        transform: 'scale(1)',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },

    progressHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px'
    },

    progressText: {
        fontSize: '0.875rem',
        fontWeight: '500',
        color: '#d1d5db'
    },

    questionProgressBar: {
        width: '100%',
        backgroundColor: 'rgba(55, 65, 81, 0.5)',
        borderRadius: '4px',
        height: '8px',
        marginBottom: '24px',
        overflow: 'hidden'
    },

    questionProgress: {
        height: '8px',
        background: 'linear-gradient(135deg, #00f5ff, #a855f7)',
        borderRadius: '4px',
        transition: 'width 0.5s ease-out'
    },

    questionTitle: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        lineHeight: '1.6',
        marginBottom: '32px'
    },

    optionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    },

    optionButton: {
        position: 'relative',
        width: '100%',
        padding: '20px 24px',
        borderRadius: '16px',
        fontWeight: '500',
        textAlign: 'left',
        fontSize: '1.125rem',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: 'scale(1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    optionDefault: {
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        color: 'white'
    },

    optionCorrect: {
        background: 'rgba(16, 185, 129, 0.2)',
        border: '2px solid #10b981',
        color: '#6ee7b7',
        boxShadow: '0 0 25px rgba(16, 185, 129, 0.25)'
    },

    optionWrong: {
        background: 'rgba(239, 68, 68, 0.2)',
        border: '2px solid #ef4444',
        color: '#fca5a5',
        boxShadow: '0 0 25px rgba(239, 68, 68, 0.25)'
    },

    optionDisabled: {
        background: 'rgba(75, 85, 99, 0.3)',
        border: '1px solid #6b7280',
        color: '#9ca3af',
        cursor: 'not-allowed'
    },

    feedbackIcon: {
        fontSize: '1.5rem',
        marginLeft: '16px'
    },

    feedbackMessage: {
        marginTop: '24px',
        textAlign: 'center',
        fontSize: '1.125rem',
        fontWeight: '600'
    },

    feedbackCorrect: {
        color: '#1b8b66ff'
    },

    feedbackWrong: {
        color: '#ef4444'
    }
};

styles.input = {
    flex: 1,
    minWidth: 0,
    background: 'rgba(255, 255, 255, 0.85)',
    border: '1px solid rgba(0,0,0,0.1)',
    borderRadius: '12px',
    padding: '12px 14px',
    fontSize: '16px',
    outline: 'none'
};
styles.select = {
    flex: 1,
    minWidth: 0,
    background: 'rgba(255,255,255,0.85)',
    border: '1px solid rgba(0,0,0,0.1)',
    borderRadius: '12px',
    padding: '12px 14px',
    fontSize: '16px',
    outline: 'none',
    color: '#111827'
};

// CSS keyframes için style tag ekleme
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes pulse {
    0%, 100% { opacity: 0.2; transform: scale(1); }
    50% { opacity: 0.3; transform: scale(1.05); }
  }
  
  .option-button:hover:not(:disabled) {
    transform: scale(1.02) !important;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2) !important;
  }
  
  .reset-button:hover {
    transform: scale(1.05) !important;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3) !important;
  }
  
  .rotate-icon:hover {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
  }
`;
document.head.appendChild(styleSheet);

export default function QuizApp({ initialName = "", initialCategory = "", autoStart = false }) {
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);
    const [started, setStarted] = useState(!!autoStart);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [questions, setQuestions] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory || "");
    const [difficulties, setDifficulties] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState("");
    const [timeLeft, setTimeLeft] = useState(0);
    const [timerActive, setTimerActive] = useState(false);

    useEffect(() => {
        // kategorileri ve zorlukları yükle
        fetch('/api/categories')
            .then(r => r.json())
            .then(data => setCategories(Array.isArray(data?.categories) ? data.categories : []))
            .catch(() => {});
        fetch('/api/difficulties')
            .then(r => r.json())
            .then(data => setDifficulties(Array.isArray(data?.difficulties) ? data.difficulties : []))
            .catch(() => {});
    }, []);

    useEffect(() => {
        if (!started) return;
        setLoading(true);
        setError("");
        const params = new URLSearchParams();
        if (selectedCategory) params.set('category', selectedCategory);
        if (selectedDifficulty) params.set('difficulty', selectedDifficulty);
        const query = params.toString() ? `?${params.toString()}` : '';
        fetch(`/api/questions${query}`)
            .then(r => r.json())
            .then(data => {
                const qs = Array.isArray(data?.questions) ? data.questions : [];
                questionsCache = qs;
                setQuestions(qs);
                // süre limiti kaldırıldı
                setTimeLeft(0);
                setTimerActive(false);
            })
            .catch(() => setError("Suallar yüklənmədi"))
            .finally(() => setLoading(false));
    }, [started, selectedCategory, selectedDifficulty]);

    // süre limiti kaldırıldığı için timer kullanılmıyor

    const loadLeaderboard = () => {
        const params = new URLSearchParams();
        if (selectedCategory) params.set('category', selectedCategory);
        if (selectedDifficulty) params.set('difficulty', selectedDifficulty);
        const query = params.toString() ? `?${params.toString()}` : '';
        fetch(`/api/scores${query}`)
            .then(r => r.json())
            .then(d => setLeaderboard(Array.isArray(d?.scores) ? d.scores : []))
            .catch(() => {});
    };

    const handleAnswer = (option) => {
        setSelectedAnswer(option);
        setShowFeedback(true);

        if (option === questions[current].answer) {
            setScore(score + 1);
        }

        setTimeout(() => {
            const next = current + 1;
            if (next < questions.length) {
                setCurrent(next);
                setSelectedAnswer(null);
                setShowFeedback(false);
            } else {
                setShowResult(true);
                const token = localStorage.getItem('quiz_token') || undefined;
                fetch('/api/scores', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: playerName || 'Anonim', score, total: questions.length, category: selectedCategory || 'General', difficulty: selectedDifficulty || null, token })
                }).finally(() => loadLeaderboard());
                setTimerActive(false);
            }
        }, 1500);
    };

    const resetQuiz = () => {
        setCurrent(0);
        setScore(0);
        setShowResult(false);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setStarted(false);
        setQuestions([]);
    };

    const getScoreColor = () => {
        const percentage = (score / questions.length) * 100;
        if (percentage >= 80) return '#10b981';
        if (percentage >= 60) return '#f59e0b';
        return '#ef4444';
    };

    const getScoreMessage = () => {
        const percentage = (score / questions.length) * 100;
        if (percentage >= 80) return "Əla nəticə! 🎉";
        if (percentage >= 60) return "Yaxşı nəticə! 👍";
        return "Daha çox çalışmalısınız 💪";
    };

    const getButtonStyle = (option) => {
        let style = { ...styles.optionButton };

        if (showFeedback) {
            if (option === questions[current].answer) {
                style = { ...style, ...styles.optionCorrect };
            } else if (option === selectedAnswer) {
                style = { ...style, ...styles.optionWrong };
            } else {
                style = { ...style, ...styles.optionDisabled };
            }
        } else {
            style = { ...style, ...styles.optionDefault };
        }

        return style;
    };

    return (
        <div style={styles.container}>
            {/* Background Animation */}
            <div style={styles.backgroundBlob1}></div>
            <div style={styles.backgroundBlob2}></div>
            <div style={styles.backgroundBlob3}></div>

            <div style={styles.mainContainer}>
                {/* Header */}
                <div style={styles.header}>
                    <h1 style={styles.title}>Quiz App</h1>
                    <div style={styles.titleUnderline}></div>
                </div>

                {!started ? (
                    <div style={styles.card}>
                        <h2 style={styles.questionTitle}>Başlamaq üçün adınızı daxil edin</h2>
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                            <input
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                                placeholder="Ad"
                                style={styles.input}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                style={styles.select}
                            >
                                <option value="">Bütün kateqoriyalar</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <select
                                value={selectedDifficulty}
                                onChange={(e) => setSelectedDifficulty(e.target.value)}
                                style={styles.select}
                            >
                                <option value="">Tüm zorluklar</option>
                                {difficulties.map((dif) => (
                                    <option key={dif} value={dif}>{dif}</option>
                                ))}
                            </select>
                            <button
                                onClick={() => setStarted(true)}
                                style={styles.resetButton}
                                className="reset-button"
                            >Başla</button>
                        </div>
                        {error && <div style={{ color: '#fecaca' }}>{error}</div>}
                    </div>
                ) : showResult ? (
                    <div style={{ ...styles.card, ...styles.resultCard }}>
                        <div style={styles.trophyIcon}>🏆</div>
                        <h2 style={styles.resultTitle}>Quiz Tamamlandı!</h2>
                        <p style={styles.resultMessage}>{getScoreMessage()}</p>

                        <div style={{ ...styles.scoreDisplay, color: getScoreColor() }}>
                            {score}/{questions.length}
                        </div>

                        <div style={styles.progressBarContainer}>
                            <div
                                style={{
                                    ...styles.progressBar,
                                    width: `${(score / questions.length) * 100}%`
                                }}
                            ></div>
                        </div>

                        <p style={styles.scorePercentage}>
                            Doğru cavab: {((score / questions.length) * 100).toFixed(0)}%
                        </p>

                        <button
                            onClick={resetQuiz}
                            style={styles.resetButton}
                            className="reset-button"
                        >
                            <span className="rotate-icon">🔄</span>
                            <span>Yenidən Başla</span>
                        </button>

                        {leaderboard.length > 0 && (
                            <div style={{ marginTop: '24px', textAlign: 'left' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>Liderlər</h3>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {leaderboard.map((row, idx) => (
                                        <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                            <span>{idx + 1}. {row.name}</span>
                                            <span>{row.score}/{row.total}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <div style={styles.card}>
                        {loading && <div style={{ marginBottom: '16px' }}>Yüklənir...</div>}
                        {!loading && error && <div style={{ marginBottom: '16px', color: '#fecaca' }}>{error}</div>}
                        {!loading && !error && questions.length === 0 && (
                            <div style={{ marginBottom: '16px' }}>Suallar tapılmadı. <button onClick={() => setStarted(false)} style={{ ...styles.resetButton, padding: '8px 16px', fontSize: '0.95rem' }}>Geri</button></div>
                        )}

                        {!loading && !error && questions.length > 0 && (
                            <>
                        <div style={styles.progressHeader}>
                            <span style={styles.progressText}>
                                Sual {current + 1} / {questions.length}
                            </span>
                            <span style={styles.progressText}>
                                Xal: {score}
                            </span>
                        </div>
                        {/* Süre limiti kaldırıldı */}

                        <div style={styles.questionProgressBar}>
                            <div
                                style={{
                                    ...styles.questionProgress,
                                    width: `${((current + 1) / questions.length) * 100}%`
                                }}
                            ></div>
                        </div>

                        <h2 style={styles.questionTitle}>
                                    {questions[current]?.question}
                        </h2>

                        <div style={styles.optionsContainer}>
                                    {questions[current]?.options?.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => !showFeedback && handleAnswer(option)}
                                    disabled={showFeedback}
                                    style={getButtonStyle(option)}
                                    className="option-button"
                                >
                                    <span>{option}</span>
                                    {showFeedback && (
                                        <span style={styles.feedbackIcon}>
                                            {option === questions[current].answer ? "✅" :
                                                option === selectedAnswer ? "❌" : ""}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {showFeedback && (
                            <div
                                style={{
                                    ...styles.feedbackMessage,
                                    ...(selectedAnswer === questions[current].answer ?
                                        styles.feedbackCorrect : styles.feedbackWrong)
                                }}
                            >
                                {selectedAnswer === questions[current].answer ?
                                    "Təbriklər! Doğru cavab! 🎉" :
                                            "Təssüf! Səhv cavab 😔"}
                            </div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}