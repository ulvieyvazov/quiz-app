import React, { useState } from "react";

const questions = [
    {
        question: "Xarici yaddaş qurğularını müəyyən edin:",
        options: [
            "A) 2, 3, 6",
            "B) 1, 4, 5",
            "C) 1, 5, 6",
            "D) 1, 3, 5",
            "E) 2, 4, 6"
        ],
        answer: "B) 1, 4, 5"
    },
    {
        question: "Hansı fikir doğru deyil (MS Word 2019)?",
        options: [
            "A) Seçilmiş mətndən başqa bütün mətni çapa vermək olar",
            "B) CTRL+End kursoru sənədin sonuna aparır",
            "C) Görünüş rejimləri View tabından dəyişdirilir",
            "D) Səhifəyə nömrə Insert tabından qoyulur",
            "E) Fraqmentləri Ctrl ilə seçmək olar"
        ],
        answer: "A) Seçilmiş mətndən başqa bütün mətni çapa vermək olar"
    },
    {
        question: "B2:E9 diapazonunda neçə sütun var (MS Excel 2019)?",
        options: ["A) 12", "B) 8", "C) 3", "D) 32", "E) 4"],
        answer: "E) 4"
    },
    {
        question: "USB nədir?",
        options: [
            "A) Yaddaş qurğusudur",
            "B) Universal portdur",
            "C) Paralel portdur",
            "D) Universal proqramdır",
            "E) Videoadapterdir"
        ],
        answer: "B) Universal portdur"
    },
    {
        question: "CTRL+ENTER düymələr kombinasiyası basıldıqda nə baş verir (MS Word 2019)?",
        options: [
            "A) Mətn yeni səhifədən başlanır",
            "B) Mətn yeni bölmədən başlanır",
            "C) Mətn yeni abzasdan başlanır",
            "D) Mətn yeni sətirdən başlanır",
            "E) Bütöv mətn seçilir"
        ],
        answer: "A) Mətn yeni səhifədən başlanır"
    },
    {
        question: "Utilitlərin yerinə yetirdikləri funksiyalara aiddir:",
        options: [
            "A) 3, 4, 6",
            "B) 1, 4, 5",
            "C) 2, 4, 6",
            "D) 2, 3, 6",
            "E) 1, 2, 5"
        ],
        answer: "D) 2, 3, 6"
    },
    {
        question: "Vektarizator proqramı hansıdır?",
        options: [
            "A) Corel Draw",
            "B) Adobe Illustrator",
            "C) Adobe Stream Line",
            "D) Adobe Photoshop",
            "E) Corel Photo-Paint"
        ],
        answer: "C) Adobe Stream Line"
    },
    {
        question: "Müxtəlif topologiyalı, eyni protokollu şəbəkələri birləşdirən aparat proqram təminatlı qurğu hansıdır?",
        options: [
            "A) Connector (Birləşdirici)",
            "B) Modem",
            "C) Router (Marşrutlaşdırıcı)",
            "D) Transiver",
            "E) Bridge (Körpü)"
        ],
        answer: "C) Router (Marşrutlaşdırıcı)"
    },
    {
        question: "Verilənlər bazasında verilmiş şərtlər əsasında verilənlərin seçimini həyata keçirməyə imkan verən obyekt necə adlanır (MS Access 2019)?",
        options: ["A) Cədvəl", "B) Forma", "C) Makros", "D) Hesabat", "E) Sorğu"],
        answer: "E) Sorğu"
    },
    {
        question: "MS Access 2019 proqramı verilənlər bazasının hansı modelinə uyğundur?",
        options: [
            "A) Relyasiya",
            "B) Obyektyönlü",
            "C) Şəbəkə",
            "D) İyerarxik",
            "E) Semantik"
        ],
        answer: "A) Relyasiya"
    }, {
        question: "File Explorer proqram pəncərəsinin sol kənarındakı ağacvari strukturda göstərilən qovluqların yaranması üçün əməliyyatların ardıcıllığını müəyyən edin (Windows 10).",
        options: [
            "A) 5, 4, 3, 7, 2, 6, 1",
            "B) 4, 1, 2, 6, 5, 3, 7",
            "C) 4, 5, 3, 1, 2, 6, 7",
            "D) 5, 4, 1, 2, 6, 7, 3",
            "E) 3, 4, 2, 7, 5, 1, 6"
        ],
        answer: "B) 4, 1, 2, 6, 5, 3, 7"
    },
    {
        question: "Slayda hansı obyekti əlavə etdikdə Ribbon interfeysində Format alət tabı yaranır (MS PowerPoint 2019)?",
        options: [
            "A) WordArt",
            "B) Table",
            "C) Equation",
            "D) SmartArt",
            "E) Picture"
        ],
        answer: "E) Picture"
    },
    {
        question: "Aşağıdakılardan hansı arxiv faylıdır?",
        options: [
            "A) Ölçüsü azaldılmış və məzmunu dəyişdirilmiş fayllar",
            "B) Məzmunu xüsusi alqoritmlərlə dəyişdirilmiş icra olunan sistem faylları",
            "C) Sıxılmış və sonradan istifadə üçün saxlanılan fayllar",
            "D) Ölçüsü artırılmış və icazəsiz girişdən qorunan fayllar",
            "E) Uzun müddət istifadə olunmayan fayllar"
        ],
        answer: "C) Sıxılmış və sonradan istifadə üçün saxlanılan fayllar"
    },
    {
        question: "Slayd obyektlərinə verilmiş animasiya effektlərinin Start formalarına hansılar aid deyil (MS PowerPoint 2019)?",
        options: [
            "A) 3, 4, 6",
            "B) 1, 4, 6",
            "C) 1, 2, 5",
            "D) 2, 5, 6",
            "E) 2, 3, 5"
        ],
        answer: "B) 1, 4, 6"
    },
    {
        question: "MS Word proqramında mətn cədvələ çevrildikdə alınan cədvəlin 2-ci sütunu hansı olar? (Ayırıcı simvol ;)",
        options: [
            "A) Malın adı, Yanvar, Fevral, Mart",
            "B) Malın adı, Yanvar, Stul, 3",
            "C) Malın adı, Fevral, Mart",
            "D) Malın adı, Stul, Mart",
            "E) Ay, Yanvar, Fevral, 3"
        ],
        answer: "A) Malın adı, Yanvar, Fevral, Mart"
    }
];


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

export default function QuizApp() {
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);

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
            }
        }, 1500);
    };

    const resetQuiz = () => {
        setCurrent(0);
        setScore(0);
        setShowResult(false);
        setSelectedAnswer(null);
        setShowFeedback(false);
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

                {showResult ? (
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
                    </div>
                ) : (
                    <div style={styles.card}>
                        {/* Progress Bar */}
                        <div style={styles.progressHeader}>
                            <span style={styles.progressText}>
                                Sual {current + 1} / {questions.length}
                            </span>
                            <span style={styles.progressText}>
                                Xal: {score}
                            </span>
                        </div>

                        <div style={styles.questionProgressBar}>
                            <div
                                style={{
                                    ...styles.questionProgress,
                                    width: `${((current + 1) / questions.length) * 100}%`
                                }}
                            ></div>
                        </div>

                        {/* Question */}
                        <h2 style={styles.questionTitle}>
                            {questions[current].question}
                        </h2>

                        {/* Options */}
                        <div style={styles.optionsContainer}>
                            {questions[current].options.map((option, index) => (
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

                        {/* Feedback Message */}
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
                                    "Təssüf! Səhv cavab 😔"
                                }
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}