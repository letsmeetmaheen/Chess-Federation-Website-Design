import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, RotateCcw, Flag, Trophy, Crown, Cpu, User, Settings, Zap, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

// Chess piece unicode
const PIECES = {
  K: '♔', Q: '♕', R: '♖', B: '♗', N: '♘', P: '♙', // White
  k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟', // Black
};

type PieceType = 'K' | 'Q' | 'R' | 'B' | 'N' | 'P' | 'k' | 'q' | 'r' | 'b' | 'n' | 'p' | '';
type Square = [number, number];

interface AIChessGameProps {
  onExit: () => void;
}

// Initial chess board setup
const INITIAL_BOARD: PieceType[][] = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

export default function AIChessGame({ onExit }: AIChessGameProps) {
  const [board, setBoard] = useState<PieceType[][]>(INITIAL_BOARD.map(row => [...row]));
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [validMoves, setValidMoves] = useState<Square[]>([]);
  const [currentTurn, setCurrentTurn] = useState<'white' | 'black'>('white');
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [capturedPieces, setCapturedPieces] = useState<{ white: PieceType[], black: PieceType[] }>({ white: [], black: [] });
  
  // Time controls
  const [timeControl, setTimeControl] = useState<number>(600); // 10 minutes default
  const [whiteTime, setWhiteTime] = useState<number>(600);
  const [blackTime, setBlackTime] = useState<number>(600);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showSettings, setShowSettings] = useState(true);
  
  // Difficulty level
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  
  // Game state
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<'white' | 'black' | 'draw' | null>(null);
  const [checkmate, setCheckmate] = useState(false);
  const [inCheck, setInCheck] = useState<'white' | 'black' | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer effect
  useEffect(() => {
    if (isTimerRunning && gameStarted && !gameOver) {
      timerRef.current = setInterval(() => {
        if (currentTurn === 'white') {
          setWhiteTime(prev => {
            if (prev <= 1) {
              endGame('black', 'timeout');
              return 0;
            }
            return prev - 1;
          });
        } else {
          setBlackTime(prev => {
            if (prev <= 1) {
              endGame('white', 'timeout');
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, currentTurn, gameStarted, gameOver]);

  // AI move effect
  useEffect(() => {
    if (currentTurn === 'black' && !gameOver && gameStarted) {
      setIsTimerRunning(false);
      setTimeout(() => {
        makeAIMove();
      }, 1000); // AI thinks for 1 second
    }
  }, [currentTurn, gameOver, gameStarted]);

  const startGame = () => {
    setWhiteTime(timeControl);
    setBlackTime(timeControl);
    setGameStarted(true);
    setShowSettings(false);
    setIsTimerRunning(true);
    toast.success('Game Started!', { description: 'Good luck!' });
  };

  const resetGame = () => {
    setBoard(INITIAL_BOARD.map(row => [...row]));
    setSelectedSquare(null);
    setValidMoves([]);
    setCurrentTurn('white');
    setMoveHistory([]);
    setCapturedPieces({ white: [], black: [] });
    setWhiteTime(timeControl);
    setBlackTime(timeControl);
    setGameOver(false);
    setWinner(null);
    setCheckmate(false);
    setInCheck(null);
    setGameStarted(false);
    setShowSettings(true);
    setIsTimerRunning(false);
  };

  const endGame = (winner: 'white' | 'black' | 'draw', reason: 'checkmate' | 'timeout' | 'resignation' | 'draw') => {
    setGameOver(true);
    setWinner(winner);
    setIsTimerRunning(false);
    
    if (reason === 'checkmate') {
      setCheckmate(true);
      toast.success(`Checkmate! ${winner === 'white' ? 'You' : 'AI'} won!`);
    } else if (reason === 'timeout') {
      toast.error(`Time's up! ${winner === 'white' ? 'You' : 'AI'} won!`);
    } else if (reason === 'resignation') {
      toast.info(`${winner === 'white' ? 'AI' : 'You'} resigned!`);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isWhitePiece = (piece: PieceType): boolean => {
    return piece !== '' && piece === piece.toUpperCase();
  };

  const isBlackPiece = (piece: PieceType): boolean => {
    return piece !== '' && piece === piece.toLowerCase();
  };

  const getValidMoves = (row: number, col: number, currentBoard: PieceType[][]): Square[] => {
    const piece = currentBoard[row][col];
    if (!piece) return [];

    const moves: Square[] = [];
    const isWhite = isWhitePiece(piece);
    const pieceType = piece.toUpperCase();

    const addMoveIfValid = (r: number, c: number) => {
      if (r < 0 || r > 7 || c < 0 || c > 7) return false;
      const targetPiece = currentBoard[r][c];
      if (!targetPiece) return true;
      if (isWhite && isBlackPiece(targetPiece)) return true;
      if (!isWhite && isWhitePiece(targetPiece)) return true;
      return false;
    };

    // Pawn moves
    if (pieceType === 'P') {
      const direction = isWhite ? -1 : 1;
      const startRow = isWhite ? 6 : 1;
      
      // Forward move
      if (!currentBoard[row + direction]?.[col]) {
        moves.push([row + direction, col]);
        // Double move from start
        if (row === startRow && !currentBoard[row + 2 * direction]?.[col]) {
          moves.push([row + 2 * direction, col]);
        }
      }
      
      // Captures
      [-1, 1].forEach(offset => {
        const newCol = col + offset;
        if (newCol >= 0 && newCol <= 7) {
          const targetPiece = currentBoard[row + direction]?.[newCol];
          if (targetPiece && ((isWhite && isBlackPiece(targetPiece)) || (!isWhite && isWhitePiece(targetPiece)))) {
            moves.push([row + direction, newCol]);
          }
        }
      });
    }

    // Knight moves
    if (pieceType === 'N') {
      const knightMoves = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1]
      ];
      knightMoves.forEach(([dr, dc]) => {
        if (addMoveIfValid(row + dr, col + dc)) {
          moves.push([row + dr, col + dc]);
        }
      });
    }

    // Bishop moves
    if (pieceType === 'B' || pieceType === 'Q') {
      const directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
      directions.forEach(([dr, dc]) => {
        let r = row + dr, c = col + dc;
        while (r >= 0 && r <= 7 && c >= 0 && c <= 7) {
          const targetPiece = currentBoard[r][c];
          if (!targetPiece) {
            moves.push([r, c]);
          } else {
            if ((isWhite && isBlackPiece(targetPiece)) || (!isWhite && isWhitePiece(targetPiece))) {
              moves.push([r, c]);
            }
            break;
          }
          r += dr;
          c += dc;
        }
      });
    }

    // Rook moves
    if (pieceType === 'R' || pieceType === 'Q') {
      const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      directions.forEach(([dr, dc]) => {
        let r = row + dr, c = col + dc;
        while (r >= 0 && r <= 7 && c >= 0 && c <= 7) {
          const targetPiece = currentBoard[r][c];
          if (!targetPiece) {
            moves.push([r, c]);
          } else {
            if ((isWhite && isBlackPiece(targetPiece)) || (!isWhite && isWhitePiece(targetPiece))) {
              moves.push([r, c]);
            }
            break;
          }
          r += dr;
          c += dc;
        }
      });
    }

    // King moves
    if (pieceType === 'K') {
      const kingMoves = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1]
      ];
      kingMoves.forEach(([dr, dc]) => {
        if (addMoveIfValid(row + dr, col + dc)) {
          moves.push([row + dr, col + dc]);
        }
      });
    }

    return moves;
  };

  const handleSquareClick = (row: number, col: number) => {
    if (gameOver || !gameStarted || currentTurn !== 'white') return;

    const piece = board[row][col];

    if (selectedSquare) {
      const [fromRow, fromCol] = selectedSquare;
      const isValidMove = validMoves.some(([r, c]) => r === row && c === col);

      if (isValidMove) {
        makeMove(fromRow, fromCol, row, col);
        setSelectedSquare(null);
        setValidMoves([]);
      } else if (piece && isWhitePiece(piece)) {
        setSelectedSquare([row, col]);
        setValidMoves(getValidMoves(row, col, board));
      } else {
        setSelectedSquare(null);
        setValidMoves([]);
      }
    } else if (piece && isWhitePiece(piece)) {
      setSelectedSquare([row, col]);
      setValidMoves(getValidMoves(row, col, board));
    }
  };

  const makeMove = (fromRow: number, fromCol: number, toRow: number, toCol: number) => {
    const newBoard = board.map(row => [...row]);
    const piece = newBoard[fromRow][fromCol];
    const capturedPiece = newBoard[toRow][toCol];

    // Update captured pieces
    if (capturedPiece) {
      const newCaptured = { ...capturedPieces };
      if (isWhitePiece(piece)) {
        newCaptured.black.push(capturedPiece);
      } else {
        newCaptured.white.push(capturedPiece);
      }
      setCapturedPieces(newCaptured);
    }

    // Make the move
    newBoard[toRow][toCol] = piece;
    newBoard[fromRow][fromCol] = '';

    // Pawn promotion
    if (piece.toUpperCase() === 'P' && (toRow === 0 || toRow === 7)) {
      newBoard[toRow][toCol] = isWhitePiece(piece) ? 'Q' : 'q';
    }

    setBoard(newBoard);

    // Record move
    const from = String.fromCharCode(97 + fromCol) + (8 - fromRow);
    const to = String.fromCharCode(97 + toCol) + (8 - toRow);
    const moveNotation = `${PIECES[piece as keyof typeof PIECES]} ${from}-${to}`;
    setMoveHistory([...moveHistory, moveNotation]);

    // Check for checkmate
    const opponentHasMoves = hasAnyValidMoves(newBoard, currentTurn === 'white' ? 'black' : 'white');
    if (!opponentHasMoves) {
      endGame(currentTurn, 'checkmate');
      return;
    }

    // Switch turn
    setCurrentTurn(currentTurn === 'white' ? 'black' : 'white');
  };

  const hasAnyValidMoves = (currentBoard: PieceType[][], color: 'white' | 'black'): boolean => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = currentBoard[row][col];
        if (piece && ((color === 'white' && isWhitePiece(piece)) || (color === 'black' && isBlackPiece(piece)))) {
          const moves = getValidMoves(row, col, currentBoard);
          if (moves.length > 0) return true;
        }
      }
    }
    return false;
  };

  const evaluateMove = (move: { from: Square, to: Square, piece: PieceType }): number => {
    let score = 0;
    const targetPiece = board[move.to[0]][move.to[1]];
    
    // Piece values
    const pieceValues: { [key: string]: number } = {
      'p': 1, 'n': 3, 'b': 3, 'r': 5, 'q': 9, 'k': 0,
      'P': 1, 'N': 3, 'B': 3, 'R': 5, 'Q': 9, 'K': 0
    };
    
    // Capture value
    if (targetPiece) {
      score += pieceValues[targetPiece] * 10;
    }
    
    // Center control bonus (e4, d4, e5, d5)
    const [toRow, toCol] = move.to;
    if ((toRow === 3 || toRow === 4) && (toCol === 3 || toCol === 4)) {
      score += 3;
    }
    
    // Piece development bonus
    const pieceType = move.piece.toUpperCase();
    if (pieceType === 'N' || pieceType === 'B') {
      if (move.from[0] === 0) score += 2; // Moved from starting position
    }
    
    // Pawn advancement
    if (pieceType === 'P') {
      score += (7 - toRow) * 0.5; // Reward advancing pawns
    }
    
    // Position evaluation
    score += Math.random() * 2; // Add some randomness
    
    return score;
  };

  const makeAIMove = () => {
    // Collect all valid moves
    const allMoves: { from: Square, to: Square, piece: PieceType, score: number }[] = [];
    
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && isBlackPiece(piece)) {
          const moves = getValidMoves(row, col, board);
          moves.forEach(move => {
            const moveData = { from: [row, col] as Square, to: move, piece };
            allMoves.push({
              ...moveData,
              score: evaluateMove(moveData)
            });
          });
        }
      }
    }

    if (allMoves.length === 0) {
      endGame('white', 'checkmate');
      return;
    }

    let selectedMove;

    if (difficulty === 'easy') {
      // Easy: 70% random moves, 30% good moves, sometimes make mistakes
      const shouldMakeMistake = Math.random() < 0.3;
      if (shouldMakeMistake) {
        // Pick a random weak move
        selectedMove = allMoves[Math.floor(Math.random() * allMoves.length)];
      } else {
        // Sort moves and pick from bottom 50%
        allMoves.sort((a, b) => a.score - b.score);
        const weakMoves = allMoves.slice(0, Math.ceil(allMoves.length / 2));
        selectedMove = weakMoves[Math.floor(Math.random() * weakMoves.length)];
      }
    } else if (difficulty === 'medium') {
      // Medium: Balanced play, sometimes captures, considers position
      allMoves.sort((a, b) => b.score - a.score);
      // Pick from top 60% of moves
      const goodMoves = allMoves.slice(0, Math.ceil(allMoves.length * 0.6));
      selectedMove = goodMoves[Math.floor(Math.random() * goodMoves.length)];
    } else {
      // Hard: Always picks best moves, prioritizes captures and tactics
      allMoves.sort((a, b) => b.score - a.score);
      // Pick from top 30% of moves, heavily weighted toward best
      const topMoves = allMoves.slice(0, Math.max(1, Math.ceil(allMoves.length * 0.3)));
      const weights = topMoves.map((_, i) => Math.pow(2, topMoves.length - i));
      const totalWeight = weights.reduce((a, b) => a + b, 0);
      let random = Math.random() * totalWeight;
      
      selectedMove = topMoves[0];
      for (let i = 0; i < topMoves.length; i++) {
        random -= weights[i];
        if (random <= 0) {
          selectedMove = topMoves[i];
          break;
        }
      }
    }

    const [fromRow, fromCol] = selectedMove.from;
    const [toRow, toCol] = selectedMove.to;
    
    makeMove(fromRow, fromCol, toRow, toCol);
    setIsTimerRunning(true);
  };

  const resign = () => {
    endGame('black', 'resignation');
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
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
      </div>

      {/* Game Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="glass-royal border-purple-500/30 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Settings className="w-6 h-6 text-purple-400" />
              Game Settings
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Choose difficulty level and time control before starting
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <label className="text-white">Difficulty Level</label>
              <Select value={difficulty} onValueChange={(v) => setDifficulty(v as 'easy' | 'medium' | 'hard')}>
                <SelectTrigger className="bg-white/5 border-purple-500/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-royal border-purple-500/30">
                  <SelectItem value="easy">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Easy - Beginner friendly
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      Medium - Balanced challenge
                    </div>
                  </SelectItem>
                  <SelectItem value="hard">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      Hard - Expert level
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-400">
                {difficulty === 'easy' && '🟢 AI makes simple moves, great for learning'}
                {difficulty === 'medium' && '🟡 AI plays balanced, fair challenge'}
                {difficulty === 'hard' && '🔴 AI uses advanced tactics, very challenging'}
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-white">Time Control</label>
              <Select value={timeControl.toString()} onValueChange={(v) => setTimeControl(parseInt(v))}>
                <SelectTrigger className="bg-white/5 border-purple-500/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-royal border-purple-500/30">
                  <SelectItem value="300">5 Minutes</SelectItem>
                  <SelectItem value="600">10 Minutes</SelectItem>
                  <SelectItem value="900">15 Minutes</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-400">
                Both you and the AI will have {formatTime(timeControl)} to complete the game
              </p>
            </div>

            <div className="glass-purple rounded-lg p-4 space-y-2">
              <h4 className="text-purple-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                How to Play
              </h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Click a piece to select it</li>
                <li>• Valid moves will be highlighted</li>
                <li>• Click a highlighted square to move</li>
                <li>• Checkmate or run out of time to lose</li>
              </ul>
            </div>

            <Button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              <Zap className="w-4 h-4 mr-2" />
              Start Game
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="relative z-10 container mx-auto px-4 py-6 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg royal-glow"
            >
              <Cpu className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-3xl text-white">AI Chess Practice</h1>
              <p className="text-purple-300">Train against the computer</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setShowSettings(true)}
              variant="outline"
              className="glass-purple border-purple-500/50 text-purple-300"
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button
              onClick={resetGame}
              variant="outline"
              className="glass-purple border-amber-500/50 text-amber-300"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              New Game
            </Button>
            <Button
              onClick={onExit}
              variant="outline"
              className="glass-purple border-red-500/50 text-red-400 hover:bg-red-500/20"
            >
              <X className="w-5 h-5 mr-2" />
              Exit
            </Button>
          </div>
        </div>

        {/* Main Game Area */}
        <div className="flex-1 grid lg:grid-cols-[300px_1fr_300px] gap-6">
          {/* Left Panel - AI Info */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-4"
          >
            <div className="glass-royal rounded-2xl p-6 border border-blue-500/30 royal-glow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white">AI Opponent</h3>
                  <p className="text-blue-300 text-sm">Black Pieces</p>
                </div>
              </div>

              {/* Difficulty Badge */}
              <div className="mb-4">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
                  difficulty === 'easy' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : difficulty === 'medium'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    difficulty === 'easy' ? 'bg-green-500' : difficulty === 'medium' ? 'bg-amber-500' : 'bg-red-500'
                  }`}></span>
                  <span className="capitalize">{difficulty} Mode</span>
                </div>
              </div>
              
              <div className="glass-purple rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Time Remaining</span>
                  <Clock className="w-4 h-4 text-blue-400" />
                </div>
                <div className={`text-3xl ${blackTime < 60 ? 'text-red-400' : 'text-white'}`}>
                  {formatTime(blackTime)}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-gray-400 text-sm mb-2">Captured Pieces</h4>
                <div className="flex flex-wrap gap-1">
                  {capturedPieces.white.length > 0 ? (
                    capturedPieces.white.map((piece, idx) => (
                      <span key={idx} className="text-2xl opacity-50">
                        {PIECES[piece as keyof typeof PIECES]}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">None</span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Center - Chess Board */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col"
          >
            <div className="relative">
              <div className="glass-royal rounded-2xl p-6 border-4 border-purple-600 royal-glow shadow-2xl">
                {/* Game Over Overlay */}
                <AnimatePresence>
                  {gameOver && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-br from-purple-900/95 to-blue-900/95 backdrop-blur-sm rounded-2xl z-20 flex items-center justify-center"
                    >
                      <div className="text-center">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1 }}>
                          {winner === 'white' ? (
                            <Trophy className="w-24 h-24 text-amber-400 mx-auto mb-4" />
                          ) : (
                            <Crown className="w-24 h-24 text-blue-400 mx-auto mb-4" />
                          )}
                        </motion.div>
                        <h2 className="text-4xl text-white mb-2">
                          {winner === 'white' ? 'You Win!' : 'AI Wins!'}
                        </h2>
                        <p className="text-purple-300 text-xl mb-6">
                          {checkmate ? 'Checkmate!' : 'Time expired'}
                        </p>
                        <Button
                          onClick={resetGame}
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        >
                          Play Again
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Turn Indicator */}
                <div className="text-center mb-4">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                    currentTurn === 'white' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {currentTurn === 'white' ? (
                      <>
                        <User className="w-4 h-4" />
                        <span>Your Turn</span>
                      </>
                    ) : (
                      <>
                        <Cpu className="w-4 h-4" />
                        <span>AI Thinking...</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Chess Board */}
                <div className="grid grid-cols-8 gap-0 aspect-square max-w-2xl mx-auto bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                  {board.map((row, rowIndex) =>
                    row.map((piece, colIndex) => {
                      const isLight = (rowIndex + colIndex) % 2 === 0;
                      const isSelected = selectedSquare?.[0] === rowIndex && selectedSquare?.[1] === colIndex;
                      const isValidMove = validMoves.some(([r, c]) => r === rowIndex && c === colIndex);
                      
                      return (
                        <motion.div
                          key={`${rowIndex}-${colIndex}`}
                          onClick={() => handleSquareClick(rowIndex, colIndex)}
                          whileHover={{ scale: gameStarted && !gameOver && currentTurn === 'white' ? 1.05 : 1 }}
                          whileTap={{ scale: gameStarted && !gameOver && currentTurn === 'white' ? 0.95 : 1 }}
                          className={`
                            relative aspect-square flex items-center justify-center cursor-pointer
                            ${isLight ? 'bg-amber-100' : 'bg-amber-800'}
                            ${isSelected ? 'ring-4 ring-purple-500 ring-inset z-10' : ''}
                            ${isValidMove ? 'ring-4 ring-green-500/50 ring-inset' : ''}
                            transition-all duration-200
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
                          
                          {/* Valid Move Indicator */}
                          {isValidMove && !board[rowIndex][colIndex] && (
                            <div className="w-3 h-3 bg-green-500 rounded-full opacity-50" />
                          )}
                          
                          {/* Chess Piece */}
                          {piece && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className={`
                                text-5xl md:text-6xl select-none z-10
                                ${isWhitePiece(piece) 
                                  ? 'drop-shadow-[0_2px_4px_rgba(255,255,255,0.5)]' 
                                  : 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'}
                                ${isValidMove ? 'ring-2 ring-green-500 rounded-lg' : ''}
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
                <div className="mt-4 text-center text-purple-300 text-sm">
                  {!gameStarted ? 'Configure settings and start the game' : 
                   currentTurn === 'white' ? 'Click a piece to select, then click where to move' :
                   'AI is thinking...'}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Panel - Player Info */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-4"
          >
            <div className="glass-royal rounded-2xl p-6 border border-green-500/30 royal-glow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white">You</h3>
                  <p className="text-green-300 text-sm">White Pieces</p>
                </div>
              </div>
              
              <div className="glass-purple rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Time Remaining</span>
                  <Clock className="w-4 h-4 text-green-400" />
                </div>
                <div className={`text-3xl ${whiteTime < 60 ? 'text-red-400' : 'text-white'}`}>
                  {formatTime(whiteTime)}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-gray-400 text-sm mb-2">Captured Pieces</h4>
                <div className="flex flex-wrap gap-1">
                  {capturedPieces.black.length > 0 ? (
                    capturedPieces.black.map((piece, idx) => (
                      <span key={idx} className="text-2xl opacity-50">
                        {PIECES[piece as keyof typeof PIECES]}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">None</span>
                  )}
                </div>
              </div>

              {gameStarted && !gameOver && (
                <Button
                  onClick={resign}
                  variant="outline"
                  className="w-full mt-4 border-red-500/50 text-red-400 hover:bg-red-500/20"
                >
                  <Flag className="w-4 h-4 mr-2" />
                  Resign
                </Button>
              )}
            </div>

            <div className="glass-royal rounded-2xl p-6 border border-purple-500/30">
              <h3 className="text-white mb-3 flex items-center gap-2">
                <span>Move History</span>
                <span className="text-sm text-purple-400">({moveHistory.length})</span>
              </h3>
              <div className="space-y-1 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {moveHistory.length === 0 ? (
                  <p className="text-gray-500 text-sm">No moves yet</p>
                ) : (
                  moveHistory.map((move, idx) => (
                    <div 
                      key={idx} 
                      className={`text-sm px-2 py-1 rounded ${
                        idx % 2 === 0 ? 'bg-white/5 text-white' : 'bg-purple-500/10 text-purple-300'
                      }`}
                    >
                      {Math.floor(idx / 2) + 1}. {move}
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(139, 92, 246, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </motion.div>
  );
}
