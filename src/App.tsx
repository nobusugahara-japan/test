import { useState, useEffect } from 'react';
import { Search, X, Clock, Filter, ChevronDown } from 'lucide-react';

// サンプルデータ
const sampleData = [
  { id: 1, title: 'React入門ガイド', category: 'プログラミング', content: 'Reactの基本的な使い方を学ぶための完全ガイド', date: '2024-01-15' },
  { id: 2, title: 'TypeScript実践編', category: 'プログラミング', content: 'TypeScriptを使った実践的な開発手法', date: '2024-02-20' },
  { id: 3, title: 'デザインシステム構築', category: 'デザイン', content: 'コンポーネントベースのデザインシステムの作り方', date: '2024-03-10' },
  { id: 4, title: 'UI/UXベストプラクティス', category: 'デザイン', content: 'ユーザー体験を向上させるための設計原則', date: '2024-01-25' },
  { id: 5, title: 'APIセキュリティ入門', category: 'セキュリティ', content: 'Web APIのセキュリティ対策について', date: '2024-03-05' },
  { id: 6, title: 'パフォーマンス最適化', category: 'プログラミング', content: 'Webアプリケーションの高速化テクニック', date: '2024-02-15' },
  { id: 7, title: 'モバイルファースト設計', category: 'デザイン', content: 'モバイルデバイスを優先したWeb設計', date: '2024-03-20' },
  { id: 8, title: 'データベース設計基礎', category: 'データベース', content: 'RDBMSの基本的な設計パターン', date: '2024-01-30' },
];

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(sampleData);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const categories = ['all', 'プログラミング', 'デザイン', 'セキュリティ', 'データベース'];

  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      
      // 検索履歴に追加
      const newHistory = [searchQuery, ...searchHistory.filter(h => h !== searchQuery)].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));

      // 検索実行（シミュレーション）
      setTimeout(() => {
        const filtered = sampleData.filter(item => {
          const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              item.content.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
          return matchesQuery && matchesCategory;
        });
        setSearchResults(filtered);
        setIsSearching(false);
      }, 500);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (searchQuery) {
      handleSearch();
    } else {
      const filtered = category === 'all' 
        ? sampleData 
        : sampleData.filter(item => item.category === category);
      setSearchResults(filtered);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults(sampleData);
    setSelectedCategory('all');
  };

  const handleHistoryClick = (query: string) => {
    setSearchQuery(query);
    setTimeout(() => handleSearch(), 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 animate-pulse">
            検索システム
          </h1>
          <p className="text-gray-300 text-lg">
            キーワードやカテゴリーで素早く情報を見つけよう
          </p>
        </div>

        {/* 検索バー */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-gray-900 rounded-2xl p-6 backdrop-blur-xl border border-gray-700">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="検索キーワードを入力..."
                    className="w-full pl-12 pr-12 py-3 bg-gray-800 text-white rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none transition-all duration-300"
                  />
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <button
                  onClick={handleSearch}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  検索
                </button>
              </div>

              {/* フィルター */}
              <div className="mt-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  フィルター
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
                
                {showFilters && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                          selectedCategory === category
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        {category === 'all' ? 'すべて' : category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 検索履歴 */}
        {searchHistory.length > 0 && (
          <div className="max-w-3xl mx-auto mb-8">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
              <div className="flex items-center gap-2 text-gray-400 mb-3">
                <Clock className="w-4 h-4" />
                <span className="text-sm">最近の検索</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleHistoryClick(query)}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 検索結果 */}
        <div className="max-w-5xl mx-auto">
          {isSearching ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
              <p className="text-gray-400 mt-4">検索中...</p>
            </div>
          ) : (
            <>
              <div className="text-gray-400 mb-4">
                {searchQuery && (
                  <p>「{searchQuery}」の検索結果: {searchResults.length}件</p>
                )}
              </div>
              
              <div className="grid gap-4">
                {searchResults.map((result, index) => (
                  <div
                    key={result.id}
                    className="group bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 animate-fadeIn"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">
                        {result.title}
                      </h3>
                      <span className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-lg text-sm">
                        {result.category}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-3">{result.content}</p>
                    <p className="text-sm text-gray-500">{result.date}</p>
                  </div>
                ))}
              </div>

              {searchResults.length === 0 && searchQuery && (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">検索結果が見つかりませんでした</p>
                  <p className="text-gray-500 mt-2">別のキーワードで検索してみてください</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
