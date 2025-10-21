import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface CrosswordCell {
  row: number;
  col: number;
  letter: string;
  number?: number;
  clueId?: number;
}

interface Clue {
  id: number;
  direction: 'across' | 'down';
  number: number;
  question: string;
  answer: string;
  startRow: number;
  startCol: number;
}

const clues: Clue[] = [
  { id: 1, direction: 'across', number: 1, question: 'Кто отправил царевну в лес?', answer: 'ЧЕРНАВКА', startRow: 0, startCol: 0 },
  { id: 2, direction: 'down', number: 2, question: 'Сколько богатырей нашли царевну?', answer: 'СЕМЬ', startRow: 0, startCol: 4 },
  { id: 3, direction: 'across', number: 3, question: 'Кто был женихом царевны?', answer: 'ЕЛИСЕЙ', startRow: 2, startCol: 1 },
  { id: 4, direction: 'down', number: 4, question: 'Что дала царице мачеха в подарок?', answer: 'ЯБЛОКО', startRow: 2, startCol: 1 },
  { id: 5, direction: 'across', number: 5, question: 'Кто помог Елисею найти царевну?', answer: 'ВЕТЕР', startRow: 4, startCol: 2 },
  { id: 6, direction: 'across', number: 6, question: 'С кем разговаривала злая царица?', answer: 'ЗЕРКАЛО', startRow: 6, startCol: 0 },
  { id: 7, direction: 'down', number: 7, question: 'Кто охранял дом богатырей?', answer: 'ПЕС', startRow: 4, startCol: 6 },
  { id: 8, direction: 'across', number: 8, question: 'В чем лежала мертвая царевна?', answer: 'ГРОБ', startRow: 8, startCol: 3 },
];

const Index = () => {
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [completedClues, setCompletedClues] = useState<Set<number>>(new Set());
  const [showCongrats, setShowCongrats] = useState(false);
  const { toast } = useToast();

  const checkAnswer = (clueId: number) => {
    const clue = clues.find(c => c.id === clueId);
    if (!clue) return;

    const userAnswer = (userAnswers[clueId] || '').toUpperCase().trim();
    if (userAnswer === clue.answer) {
      setCompletedClues(new Set([...completedClues, clueId]));
      toast({
        title: '🎉 Правильно!',
        description: 'Отличная работа!',
      });
    } else {
      toast({
        title: '❌ Неверно',
        description: 'Попробуй ещё раз!',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    if (completedClues.size === clues.length) {
      setShowCongrats(true);
    }
  }, [completedClues]);

  const handleInputChange = (clueId: number, value: string) => {
    setUserAnswers({
      ...userAnswers,
      [clueId]: value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-50 py-8 px-4 relative overflow-hidden">
      <div className="absolute top-10 left-10 text-6xl animate-float">✨</div>
      <div className="absolute top-20 right-20 text-5xl animate-float" style={{ animationDelay: '0.5s' }}>⭐</div>
      <div className="absolute bottom-20 left-1/4 text-4xl animate-float" style={{ animationDelay: '1s' }}>🌙</div>
      <div className="absolute bottom-40 right-1/3 text-5xl animate-float" style={{ animationDelay: '1.5s' }}>👑</div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4 font-heading">
            Волшебный кроссворд 
          </h1>
          <p className="text-xl text-purple-700 font-semibold">
            Сказка о мёртвой царевне и семи богатырях
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Icon name="BookOpen" className="text-secondary" size={24} />
            <span className="text-lg text-purple-600">
              Отгадано: {completedClues.size} из {clues.length}
            </span>
          </div>
        </div>

        {showCongrats && (
          <Card className="mb-8 p-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-bounce-in">
            <div className="text-center">
              <div className="text-6xl mb-4">🎊🏆🎊</div>
              <h2 className="text-4xl font-heading font-bold mb-2">Поздравляем!</h2>
              <p className="text-xl">Ты разгадал весь кроссворд! Молодец!</p>
            </div>
          </Card>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Card className="p-6 bg-white/90 backdrop-blur shadow-xl">
              <h2 className="text-2xl font-heading font-bold text-primary mb-4 flex items-center gap-2">
                <Icon name="HelpCircle" size={28} className="text-secondary" />
                Вопросы
              </h2>
              <div className="space-y-4">
                {clues.map((clue) => (
                  <div
                    key={clue.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      completedClues.has(clue.id)
                        ? 'bg-green-100 border-green-400'
                        : 'bg-purple-50 border-purple-200 hover:border-purple-400'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                        {clue.number}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 mb-2 font-semibold">{clue.question}</p>
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            placeholder="Твой ответ..."
                            value={userAnswers[clue.id] || ''}
                            onChange={(e) => handleInputChange(clue.id, e.target.value)}
                            disabled={completedClues.has(clue.id)}
                            className="flex-1"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                checkAnswer(clue.id);
                              }
                            }}
                          />
                          <Button
                            onClick={() => checkAnswer(clue.id)}
                            disabled={completedClues.has(clue.id)}
                            className="bg-secondary hover:bg-secondary/90"
                          >
                            {completedClues.has(clue.id) ? (
                              <Icon name="Check" size={20} />
                            ) : (
                              <Icon name="Send" size={20} />
                            )}
                          </Button>
                        </div>
                        {completedClues.has(clue.id) && (
                          <p className="text-green-600 font-bold mt-2 flex items-center gap-1">
                            <Icon name="CheckCircle" size={16} />
                            Ответ: {clue.answer}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-6 bg-white/90 backdrop-blur shadow-xl sticky top-8">
              <h2 className="text-2xl font-heading font-bold text-primary mb-4 flex items-center gap-2">
                <Icon name="Grid3x3" size={28} className="text-accent" />
                Подсказки
              </h2>
              <div className="space-y-3 text-gray-700">
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="font-semibold text-purple-700 mb-1">💡 Совет:</p>
                  <p>Вспомни главных героев сказки и их поступки!</p>
                </div>
                <div className="p-3 bg-pink-50 rounded-lg border border-pink-200">
                  <p className="font-semibold text-pink-700 mb-1">📖 Подсказка:</p>
                  <p>Царевна была отравлена яблоком, а спас её королевич Елисей</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="font-semibold text-orange-700 mb-1">🎯 Помни:</p>
                  <p>Все ответы нужно писать ЗАГЛАВНЫМИ буквами</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="font-semibold text-purple-700 mb-1">🌟 Интересно:</p>
                  <p>Эту сказку написал великий поэт Александр Сергеевич Пушкин в 1833 году</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
                <p className="text-center font-bold flex items-center justify-center gap-2">
                  <Icon name="Star" size={20} className="animate-sparkle" />
                  <span>Удачи, юный сказочник!</span>
                  <Icon name="Star" size={20} className="animate-sparkle" style={{ animationDelay: '0.5s' }} />
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
