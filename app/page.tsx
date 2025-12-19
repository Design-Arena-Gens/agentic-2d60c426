'use client'

import { useState } from 'react'
import { Brain, Sparkles, Target, Award, ArrowRight, Play, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">AI3D</span>
          </div>
          <div className="flex gap-8 items-center">
            <a href="#features" className="text-gray-300 hover:text-white transition">Özellikler</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition">Fiyatlar</a>
            <Link href="/learn" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition">
              Başla
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm">Yapay Zeka Öğreniminde Devrim</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Yapay Zekayı<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              3D ile Öğren
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Soyut AI kavramlarını somut 3D görselleştirmelerle anlayın.
            Neural networkler, derin öğrenme ve makine öğrenimi algoritmalarını interaktif olarak keşfedin.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/learn" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105">
              <Play className="w-5 h-5" />
              Ücretsiz Dene
            </Link>
            <a href="#demo" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg text-lg font-semibold transition backdrop-blur-sm">
              Demo İzle
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">50+</div>
              <div className="text-gray-400">İnteraktif Modül</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">10K+</div>
              <div className="text-gray-400">Öğrenci</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">4.9★</div>
              <div className="text-gray-400">Kullanıcı Puanı</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Neden AI3D?
            </h2>
            <p className="text-xl text-gray-400">
              Geleneksel öğrenme yöntemlerini 3D teknolojisi ile birleştiriyoruz
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: '3D Görselleştirme',
                description: 'Neural networkleri ve algoritmaları gerçek zamanlı 3D ortamda görün ve manipüle edin'
              },
              {
                icon: Target,
                title: 'İnteraktif Öğrenme',
                description: 'Parametreleri değiştirin, sonuçları anında görün. Yaparak öğrenmenin gücünü deneyimleyin'
              },
              {
                icon: Award,
                title: 'Profesyonel Sertifika',
                description: 'Modülleri tamamlayın ve sektörde geçerli sertifikalar kazanın'
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-purple-900/40 to-slate-900/40 p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition cursor-pointer transform hover:scale-105"
                onMouseEnter={() => setHoveredFeature(idx)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <feature.icon className={`w-12 h-12 mb-4 transition ${hoveredFeature === idx ? 'text-purple-400' : 'text-purple-500'}`} />
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Modules Preview */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Öğrenme Modülleri
            </h2>
            <p className="text-xl text-gray-400">
              Temellerden ileri seviyeye kadar kapsamlı AI eğitimi
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Neural Network Temelleri', topics: ['Perceptron', 'Aktivasyon Fonksiyonları', 'Backpropagation'], level: 'Başlangıç' },
              { title: 'Derin Öğrenme', topics: ['CNN', 'RNN', 'Transformer'], level: 'İleri' },
              { title: 'Makine Öğrenimi', topics: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning'], level: 'Orta' },
              { title: 'Computer Vision', topics: ['Image Classification', 'Object Detection', 'Segmentation'], level: 'İleri' }
            ].map((module, idx) => (
              <div key={idx} className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{module.title}</h3>
                  <span className="text-xs bg-purple-500/30 text-purple-300 px-3 py-1 rounded-full">{module.level}</span>
                </div>
                <ul className="space-y-2">
                  {module.topics.map((topic, topicIdx) => (
                    <li key={topicIdx} className="flex items-center gap-2 text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-purple-400" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Basit ve Şeffaf Fiyatlandırma
            </h2>
            <p className="text-xl text-gray-400">
              İhtiyacınıza uygun planı seçin
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Başlangıç',
                price: '₺0',
                period: 'ücretsiz',
                features: ['5 temel modül', '3D görselleştirme', 'Topluluk desteği', 'Temel sertifikalar'],
                cta: 'Başla',
                popular: false
              },
              {
                name: 'Pro',
                price: '₺299',
                period: 'ay',
                features: ['Tüm modüller', 'Gelişmiş 3D simülasyonlar', 'Öncelikli destek', 'Profesyonel sertifikalar', 'Proje çalışmaları'],
                cta: 'Pro\'ya Geç',
                popular: true
              },
              {
                name: 'Kurumsal',
                price: 'Özel',
                period: 'teklif',
                features: ['Özel içerik', 'Ekip yönetimi', '7/24 destek', 'API erişimi', 'Özel eğitimler'],
                cta: 'İletişime Geç',
                popular: false
              }
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`relative bg-gradient-to-br from-slate-800/50 to-purple-900/30 p-8 rounded-2xl border ${
                  plan.popular ? 'border-purple-500 scale-105' : 'border-purple-500/20'
                } transition`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    En Popüler
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-2">/ {plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-semibold transition ${
                  plan.popular
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-purple-600 to-pink-600 p-12 rounded-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Yapay Zeka Yolculuğunuza Başlayın
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Bugün ücretsiz hesap oluşturun ve ilk modülü deneyimleyin
          </p>
          <Link href="/learn" className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105">
            Hemen Başla
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="w-6 h-6 text-purple-400" />
            <span className="text-xl font-bold text-white">AI3D</span>
          </div>
          <p>© 2024 AI3D. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </main>
  )
}
