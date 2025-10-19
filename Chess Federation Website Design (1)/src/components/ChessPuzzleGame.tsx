import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lightbulb, RotateCcw, Trophy, CheckCircle, XCircle, Crown, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

// Chess piece unicode characters
const PIECES = {
  K: '♔', Q: '♕', R: '♖', B: '♗', N: '♘', P: '♙', // White pieces
  k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟', // Black pieces
};

interface ChessPuzzle {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  fen: string; // Simplified board position
  solution: string[]; // Sequence of moves
  description: string;
}

const DAILY_PUZZLES: ChessPuzzle[] = [
  {
    id: '1',
    title: 'Checkmate in 2',
    difficulty: 'Easy',
    fen: '4k3/8/8/8/8/8/4Q3/4K3',
    solution: ['e2-e8', 'checkmate'],
    description: 'White to move. Find the checkmate!'
  },
  {
    id: '2',
    title: 'Fork Attack',
    difficulty: 'Medium',
    fen: '4k3/8/8/3r4/8/2N5/8/4K3',
    solution: ['c3-b5', 'fork'],
    description: 'White knight can fork the king and rook!'
  },
  {
    id: '3',
    title: 'Queen Sacrifice',
    difficulty: 'Hard',
    fen: '6k1/5ppp/8/8/8/8/5PPP/3Q2K1',
    solution: ['d1-d8', 'sacrifice'],
    description: 'Sometimes the boldest move wins!'
  },
];

interface ChessPuzzleGameProps {
  onExit: () => void;
}

export default function ChessPuzzleGame({ onExit }: ChessPuzzleGameProps) {
  const [currentPuzzle, setCurrentPuzzle] = useState<ChessPuzzle>(DAILY_PUZZLES[0]);
  const [board, setBoard] = useState<string[][]>([]);
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const [hints, setHints] = useState(3);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Initialize board from FEN (simplified)
  useEffect(() => {
    initializeBoard(currentPuzzle.fen);
    setMoveHistory([]);
    setSolved(false);
    setShowHint(false);
  }, [currentPuzzle]);

  const initializeBoard = (fen: string) => {
    // This is a simplified FEN parser - create 8x8 board
    const newBoard: string[][] = Array(8).fill(null).map(() => Array(8).fill(''));
    
    // Parse FEN string (simplified version)
    const rows = fen.split('/');
    rows.forEach((row, rowIndex) => {
      let colIndex = 0;
      for (const char of row) {
        if (!isNaN(parseInt(char))) {
          // Number means empty squares
          colIndex += parseInt(char);
        } else {
          // It's a piece
          newBoard[rowIndex][colIndex] = char;
          colIndex++;
        }
      }
    });
    
    setBoard(newBoard);
  };

  const handleSquareClick = (row: number, col: number) => {
    if (solved) return;

    const piece = board[row][col];
    
    if (selectedSquare) {
      // Try to move
      const [fromRow, fromCol] = selectedSquare;
      const fromPiece = board[fromRow][fromCol];
      
      // Check if it's a valid move (white pieces only - uppercase)
      if (fromPiece && fromPiece === fromPiece.toUpperCase()) {
        movePiece(fromRow, fromCol, row, col);
      }
      setSelectedSquare(null);
    } else if (piece && piece === piece.toUpperCase()) {
      // Select piece (only white pieces)
      setSelectedSquare([row, col]);
    }
  };

  const movePiece = (fromRow: number, fromCol: number, toRow: number, toCol: number) => {
    const newBoard = board.map(row => [...row]);
    const piece = newBoard[fromRow][fromCol];
    
    // Move the piece
    newBoard[toRow][toCol] = piece;
    newBoard[fromRow][fromCol] = '';
    
    setBoard(newBoard);
    
    const move = `${String.fromCharCode(97 + fromCol)}${8 - fromRow}-${String.fromCharCode(97 + toCol)}${8 - toRow}`;
    const newHistory = [...moveHistory, move];
    setMoveHistory(newHistory);
    
    // Check if puzzle is solved (simplified check)
    checkSolution(newHistory);
  };

  const checkSolution = (history: string[]) => {
    // Simplified solution checking
    if (history.length > 0) {
      // For demo purposes, any move to row 0 or specific positions solves it
      const lastMove = history[history.length - 1];
      
      if (
        lastMove.includes('8') || // Move to back rank
        history.length >= 2 // Or after 2 moves
      ) {
        setSolved(true);
        setScore(score + (currentPuzzle.difficulty === 'Easy' ? 10 : currentPuzzle.difficulty === 'Medium' ? 25 : 50));
        toast.success('🎉 Puzzle Solved!', {
          description: `+${currentPuzzle.difficulty === 'Easy' ? 10 : currentPuzzle.difficulty === 'Medium' ? 25 : 50} points!`
        });
      }
    }
  };

  const resetPuzzle = () => {
    initializeBoard(currentPuzzle.fen);
    setMoveHistory([]);
    setSolved(false);
    setSelectedSquare(null);
    setShowHint(false);
  };

  const useHint = () => {
    if (hints > 0 && !solved) {
      setHints(hints - 1);
      setShowHint(true);
      toast.info('💡 Hint: Look for the most powerful move!');
      setTimeout(() => setShowHint(false), 3000);
    }
  };

  const nextPuzzle = () => {
    const currentIndex = DAILY_PUZZLES.findIndex(p => p.id === currentPuzzle.id);
    const nextIndex = (currentIndex + 1) % DAILY_PUZZLES.length;
    setCurrentPuzzle(DAILY_PUZZLES[nextIndex]);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-500/20';
      case 'Medium': return 'text-amber-400 bg-amber-500/20';
      case 'Hard': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-purple-950 via-blue-950 to-gray-950 z-50 overflow-auto"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 7, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg royal-glow"
            >
              <Crown className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-3xl text-white">Daily Chess Puzzles</h1>
              <p className="text-purple-300">Sharpen your tactical skills</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="glass-royal rounded-lg px-4 py-2 border border-purple-500/30">
              <Trophy className="w-5 h-5 inline-block text-amber-400 mr-2" />
              <span className="text-white">{score} pts</span>
            </div>
            <Button
              onClick={onExit}
              variant="outline"
              className="glass-purple border-red-500/50 text-red-400 hover:bg-red-500/20 hover:border-red-500"
            >
              <X className="w-5 h-5 mr-2" />
              Exit Game
            </Button>
          </div>
        </div>

        {/* Main Game Area */}
        <div className="flex-1 grid lg:grid-cols-3 gap-8 items-start">
          {/* Left Panel - Info */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-4"
          >
            <div className="glass-royal rounded-2xl p-6 border border-purple-500/30 royal-glow">
              <h3 className="text-xl text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Puzzle Info
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Title</p>
                  <p className="text-white">{currentPuzzle.title}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Difficulty</p>
                  <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(currentPuzzle.difficulty)}`}>
                    {currentPuzzle.difficulty}
                  </span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Description</p>
                  <p className="text-purple-300">{currentPuzzle.description}</p>
                </div>
              </div>
            </div>

            <div className="glass-royal rounded-2xl p-6 border border-purple-500/30">
              <h3 className="text-white mb-4">Controls</h3>
              <div className="space-y-3">
                <Button
                  onClick={useHint}
                  disabled={hints === 0 || solved}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 disabled:opacity-50"
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Use Hint ({hints} left)
                </Button>
                <Button
                  onClick={resetPuzzle}
                  variant="outline"
                  className="w-full glass-purple border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Puzzle
                </Button>
                {solved && (
                  <Button
                    onClick={nextPuzzle}
                    className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
                  >
                    <Trophy className="w-4 h-4 mr-2" />
                    Next Puzzle
                  </Button>
                )}
              </div>
            </div>

            <div className="glass-royal rounded-2xl p-6 border border-purple-500/30">
              <h3 className="text-white mb-3">Move History</h3>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {moveHistory.length === 0 ? (
                  <p className="text-gray-500 text-sm">No moves yet</p>
                ) : (
                  moveHistory.map((move, idx) => (
                    <div key={idx} className="text-purple-300 text-sm">
                      {idx + 1}. {move}
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>

          {/* Center - Chess Board */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="lg:col-span-2"
          >
            <div className="relative">
              <div className="glass-royal rounded-2xl p-8 border-4 border-purple-600 royal-glow shadow-2xl">
                {/* Solved Overlay */}
                <AnimatePresence>
                  {solved && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl z-20 flex items-center justify-center"
                    >
                      <div className="text-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1 }}
                        >
                          <CheckCircle className="w-24 h-24 text-green-400 mx-auto mb-4" />
                        </motion.div>
                        <h2 className="text-4xl text-white mb-2">Puzzle Solved!</h2>
                        <p className="text-purple-300 text-xl">Great job! 🎉</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hint Overlay */}
                <AnimatePresence>
                  {showHint && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-amber-500/10 backdrop-blur-sm rounded-2xl z-10 flex items-center justify-center pointer-events-none"
                    >
                      <div className="text-center bg-amber-500/20 px-8 py-4 rounded-xl border border-amber-500/50">
                        <Lightbulb className="w-12 h-12 text-amber-400 mx-auto mb-2 animate-pulse" />
                        <p className="text-amber-300">Think about the most powerful pieces!</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Chess Board */}
                <div className="grid grid-cols-8 gap-0 aspect-square max-w-2xl mx-auto bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                  {board.map((row, rowIndex) =>
                    row.map((piece, colIndex) => {
                      const isLight = (rowIndex + colIndex) % 2 === 0;
                      const isSelected = selectedSquare?.[0] === rowIndex && selectedSquare?.[1] === colIndex;
                      
                      return (
                        <motion.div
                          key={`${rowIndex}-${colIndex}`}
                          onClick={() => handleSquareClick(rowIndex, colIndex)}
                          whileHover={{ scale: solved ? 1 : 1.05 }}
                          whileTap={{ scale: solved ? 1 : 0.95 }}
                          className={`
                            relative aspect-square flex items-center justify-center cursor-pointer
                            ${isLight ? 'bg-amber-100' : 'bg-amber-800'}
                            ${isSelected ? 'ring-4 ring-purple-500 ring-inset' : ''}
                            ${!solved && piece && piece === piece.toUpperCase() ? 'hover:bg-purple-400/30' : ''}
                            transition-colors duration-200
                          `}
                        >
                          {/* Coordinate Labels */}
                          {colIndex === 0 && (
                            <span className="absolute left-1 top-1 text-xs opacity-50 select-none">
                              {8 - rowIndex}
                            </span>
                          )}
                          {rowIndex === 7 && (
                            <span className="absolute right-1 bottom-1 text-xs opacity-50 select-none">
                              {String.fromCharCode(97 + colIndex)}
                            </span>
                          )}
                          
                          {/* Chess Piece */}
                          {piece && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className={`
                                text-5xl md:text-6xl select-none
                                ${piece === piece.toUpperCase() ? 'drop-shadow-[0_2px_4px_rgba(255,255,255,0.5)]' : 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'}
                              `}
                            >
                              {PIECES[piece as keyof typeof PIECES]}
                            </motion.span>
                          )}
                        </motion.div>
                      );
                    })
                  )}
                </div>

                {/* Instructions */}
                <div className="mt-6 text-center">
                  <p className="text-purple-300">
                    Click a white piece to select, then click a square to move
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
