import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface Clue {
  number: number;
  question: string;
  answer: string;
}

const acrossClues: Clue[] = [
  { number: 1, question: 'Кто отправил царевну в лес?', answer: 'ЧЕРНАВКА' },
  { number: 3, question: 'Кто был женихом царевны?', answer: 'ЕЛИСЕЙ' },
  { number: 5, question: 'Кто помог Елисею найти царевну?', answer: 'ВЕТЕР' },
  { number: 6, question: 'С кем разговаривала злая царица?', answer: 'ЗЕРКАЛО' },
  { number: 8, question: 'В чем лежала мертвая царевна?', answer: 'ГРОБ' },
];

const downClues: Clue[] = [
  { number: 2, question: 'Сколько богатырей нашли царевну?', answer: 'СЕМЬ' },
  { number: 4, question: 'Что дала царице мачеха в подарок?', answer: 'ЯБЛОКО' },
  { number: 7, question: 'Кто охранял дом богатырей?', answer: 'ПЕС' },
];

const PrintableWorksheet = () => {
  const navigate = useNavigate();
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="no-print mb-6 flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <Button
              onClick={handleBack}
              size="lg"
              variant="outline"
              className="border-purple-500 text-purple-700 hover:bg-purple-50"
            >
              <Icon name="ArrowLeft" size={24} className="mr-2" />
              Назад к онлайн версии
            </Button>
            <Button
              onClick={handlePrint}
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white font-bold"
            >
              <Icon name="Printer" size={24} className="mr-2" />
              Распечатать рабочий лист
            </Button>
          </div>
          <p className="text-purple-600">Нажми, чтобы распечатать кроссворд</p>
        </div>

        <div className="print-sheet bg-white p-8 rounded-lg shadow-2xl">
          <div className="text-center mb-6 border-b-4 border-purple-500 pb-4">
            <h1 className="text-4xl font-heading font-bold text-purple-700 mb-2">
              Волшебный кроссворд
            </h1>
            <h2 className="text-2xl font-heading text-purple-600">
              Сказка о мёртвой царевне и семи богатырях
            </h2>
            <p className="text-lg text-gray-600 mt-2">А. С. Пушкин</p>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-heading font-bold text-purple-700 mb-4 flex items-center gap-2">
                <span className="text-2xl">→</span> По горизонтали:
              </h3>
              <div className="space-y-3">
                {acrossClues.map((clue) => (
                  <div key={clue.number} className="flex gap-2">
                    <span className="font-bold text-purple-600 min-w-[24px]">{clue.number}.</span>
                    <p className="text-gray-700">{clue.question}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-heading font-bold text-purple-700 mb-4 flex items-center gap-2">
                <span className="text-2xl">↓</span> По вертикали:
              </h3>
              <div className="space-y-3">
                {downClues.map((clue) => (
                  <div key={clue.number} className="flex gap-2">
                    <span className="font-bold text-purple-600 min-w-[24px]">{clue.number}.</span>
                    <p className="text-gray-700">{clue.question}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="crossword-grid border-4 border-purple-500 p-4 bg-purple-50 rounded-lg">
            <svg viewBox="0 0 450 400" className="w-full h-auto">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <rect width="40" height="40" fill="white" stroke="#9333EA" strokeWidth="1.5"/>
                </pattern>
              </defs>

              <rect width="360" height="40" x="0" y="0" fill="url(#grid)" />
              <text x="5" y="15" fontSize="12" fontWeight="bold" fill="#9333EA">1</text>

              <rect width="40" height="160" x="160" y="0" fill="url(#grid)" />
              <text x="165" y="15" fontSize="12" fontWeight="bold" fill="#9333EA">2</text>

              <rect width="280" height="40" x="40" y="80" fill="url(#grid)" />
              <text x="45" y="95" fontSize="12" fontWeight="bold" fill="#9333EA">3</text>

              <rect width="40" height="240" x="40" y="80" fill="url(#grid)" />
              <text x="45" y="95" fontSize="12" fontWeight="bold" fill="#9333EA">4</text>

              <rect width="200" height="40" x="80" y="160" fill="url(#grid)" />
              <text x="85" y="175" fontSize="12" fontWeight="bold" fill="#9333EA">5</text>

              <rect width="280" height="40" x="0" y="240" fill="url(#grid)" />
              <text x="5" y="255" fontSize="12" fontWeight="bold" fill="#9333EA">6</text>

              <rect width="40" height="120" x="240" y="160" fill="url(#grid)" />
              <text x="245" y="175" fontSize="12" fontWeight="bold" fill="#9333EA">7</text>

              <rect width="160" height="40" x="120" y="320" fill="url(#grid)" />
              <text x="125" y="335" fontSize="12" fontWeight="bold" fill="#9333EA">8</text>
            </svg>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t-2 border-purple-300 pt-6">
            <div className="text-center p-3 bg-purple-50 rounded-lg border-2 border-purple-200">
              <p className="text-sm font-semibold text-purple-700">Имя:</p>
              <div className="border-b-2 border-purple-300 mt-2 h-6"></div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg border-2 border-purple-200">
              <p className="text-sm font-semibold text-purple-700">Класс:</p>
              <div className="border-b-2 border-purple-300 mt-2 h-6"></div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg border-2 border-purple-200">
              <p className="text-sm font-semibold text-purple-700">Дата:</p>
              <div className="border-b-2 border-purple-300 mt-2 h-6"></div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-purple-100 rounded-lg border-2 border-purple-300">
            <p className="text-center text-purple-800 font-semibold">
              ⭐ Все ответы пиши ЗАГЛАВНЫМИ буквами! Удачи! ⭐
            </p>
          </div>

          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Сказка А. С. Пушкина • 4 класс • poehali.dev</p>
          </div>
        </div>

        <Card className="no-print mt-8 p-6 bg-white/90 backdrop-blur">
          <h3 className="text-xl font-heading font-bold text-purple-700 mb-4 flex items-center gap-2">
            <Icon name="Info" size={24} className="text-secondary" />
            Инструкция для учителя
          </h3>
          <div className="space-y-2 text-gray-700">
            <p>✓ Нажмите кнопку "Распечатать" для создания PDF или печати</p>
            <p>✓ Рабочий лист автоматически адаптирован для формата A4</p>
            <p>✓ Все цвета и рамки сохранятся при печати</p>
            <p>✓ Можно раздать ученикам для самостоятельной работы</p>
          </div>
        </Card>
      </div>

      <style>{`
        @media print {
          body {
            background: white !important;
          }
          
          .no-print {
            display: none !important;
          }
          
          .print-sheet {
            box-shadow: none !important;
            border-radius: 0 !important;
            margin: 0 !important;
            padding: 20mm !important;
          }
          
          @page {
            size: A4;
            margin: 15mm;
          }
        }
      `}</style>
    </div>
  );
};

export default PrintableWorksheet;