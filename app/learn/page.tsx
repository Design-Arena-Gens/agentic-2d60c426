'use client'

import { useState } from 'react'
import { Brain, ArrowLeft, BookOpen, Zap } from 'lucide-react'
import Link from 'next/link'
import NeuralNetworkScene from '@/components/NeuralNetworkScene'
import DeepLearningScene from '@/components/DeepLearningScene'
import MLAlgorithmScene from '@/components/MLAlgorithmScene'

const modules = [
  {
    id: 'neural-network',
    title: 'Neural Network Görselleştirme',
    description: 'Yapay sinir ağlarının nasıl çalıştığını 3D ile keşfedin',
    icon: Brain,
    component: NeuralNetworkScene
  },
  {
    id: 'deep-learning',
    title: 'Derin Öğrenme Katmanları',
    description: 'CNN, RNN ve Transformer mimarilerini interaktif olarak anlayın',
    icon: Zap,
    component: DeepLearningScene
  },
  {
    id: 'ml-algorithm',
    title: 'Makine Öğrenimi Algoritmaları',
    description: 'Classification, Regression ve Clustering algoritmalarını görselleştirin',
    icon: BookOpen,
    component: MLAlgorithmScene
  }
]

export default function LearnPage() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [params, setParams] = useState({
    learningRate: 0.01,
    layers: 3,
    neurons: 5,
    activation: 'relu',
    epochs: 10
  })

  const activeModule = modules.find(m => m.id === selectedModule)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-purple-400 transition">
            <ArrowLeft className="w-5 h-5" />
            Ana Sayfa
          </Link>
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">AI3D Öğrenme</span>
          </div>
          <div className="w-20"></div>
        </div>
      </nav>

      <div className="pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {!selectedModule ? (
            /* Module Selection */
            <div>
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-white mb-4">
                  İnteraktif Öğrenme Modülleri
                </h1>
                <p className="text-xl text-gray-300">
                  Yapay zeka kavramlarını 3D görselleştirmelerle öğrenin
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {modules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => setSelectedModule(module.id)}
                    className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/60 transition transform hover:scale-105 text-left group"
                  >
                    <module.icon className="w-16 h-16 text-purple-400 mb-4 group-hover:text-purple-300 transition" />
                    <h2 className="text-2xl font-bold text-white mb-3">{module.title}</h2>
                    <p className="text-gray-400">{module.description}</p>
                    <div className="mt-6 flex items-center text-purple-400 font-semibold">
                      Başla
                      <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Preview Info */}
              <div className="mt-12 bg-purple-500/10 border border-purple-500/30 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  🎓 Öğrenme Deneyiminiz
                </h3>
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div>
                    <div className="text-purple-400 font-bold mb-2">1. İnteraktif 3D</div>
                    <p className="text-gray-300 text-sm">
                      Modelleri döndürün, yakınlaştırın ve her açıdan inceleyin
                    </p>
                  </div>
                  <div>
                    <div className="text-purple-400 font-bold mb-2">2. Parametreler</div>
                    <p className="text-gray-300 text-sm">
                      Öğrenme hızı, katman sayısı gibi parametreleri değiştirin
                    </p>
                  </div>
                  <div>
                    <div className="text-purple-400 font-bold mb-2">3. Gerçek Zamanlı</div>
                    <p className="text-gray-300 text-sm">
                      Değişikliklerin etkisini anında görselleştirin
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Active Module */
            <div>
              <button
                onClick={() => setSelectedModule(null)}
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6 transition"
              >
                <ArrowLeft className="w-5 h-5" />
                Modüllere Dön
              </button>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* 3D Visualization Area */}
                <div className="lg:col-span-2">
                  <div className="bg-slate-900/50 rounded-2xl border border-purple-500/20 overflow-hidden h-[600px]">
                    {activeModule && <activeModule.component params={params} />}
                  </div>
                </div>

                {/* Control Panel */}
                <div className="space-y-6">
                  <div className="bg-slate-800/50 rounded-xl border border-purple-500/20 p-6">
                    <h3 className="text-xl font-bold text-white mb-4">{activeModule?.title}</h3>
                    <p className="text-gray-400 mb-6">{activeModule?.description}</p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-purple-300 mb-2">
                          Öğrenme Hızı (Learning Rate)
                        </label>
                        <input
                          type="range"
                          min="0.001"
                          max="0.1"
                          step="0.001"
                          value={params.learningRate}
                          onChange={(e) => setParams({...params, learningRate: parseFloat(e.target.value)})}
                          className="w-full"
                        />
                        <div className="text-white text-sm mt-1">{params.learningRate}</div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-purple-300 mb-2">
                          Katman Sayısı (Layers)
                        </label>
                        <input
                          type="range"
                          min="2"
                          max="10"
                          value={params.layers}
                          onChange={(e) => setParams({...params, layers: parseInt(e.target.value)})}
                          className="w-full"
                        />
                        <div className="text-white text-sm mt-1">{params.layers}</div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-purple-300 mb-2">
                          Nöron Sayısı (Neurons per Layer)
                        </label>
                        <input
                          type="range"
                          min="3"
                          max="12"
                          value={params.neurons}
                          onChange={(e) => setParams({...params, neurons: parseInt(e.target.value)})}
                          className="w-full"
                        />
                        <div className="text-white text-sm mt-1">{params.neurons}</div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-purple-300 mb-2">
                          Aktivasyon Fonksiyonu
                        </label>
                        <select
                          value={params.activation}
                          onChange={(e) => setParams({...params, activation: e.target.value})}
                          className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-purple-500/30"
                        >
                          <option value="relu">ReLU</option>
                          <option value="sigmoid">Sigmoid</option>
                          <option value="tanh">Tanh</option>
                          <option value="softmax">Softmax</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-purple-300 mb-2">
                          Epoch Sayısı
                        </label>
                        <input
                          type="range"
                          min="5"
                          max="100"
                          step="5"
                          value={params.epochs}
                          onChange={(e) => setParams({...params, epochs: parseInt(e.target.value)})}
                          className="w-full"
                        />
                        <div className="text-white text-sm mt-1">{params.epochs}</div>
                      </div>
                    </div>
                  </div>

                  {/* Info Panel */}
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-white mb-3">💡 İpucu</h4>
                    <p className="text-gray-300 text-sm">
                      Parametreleri değiştirerek neural network'ün davranışını gözlemleyin.
                      Yüksek öğrenme hızı hızlı öğrenme sağlar ama kararsızlığa neden olabilir.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
