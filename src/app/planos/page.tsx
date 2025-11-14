'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Check, Sparkles, Crown, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { QuizResult } from '@/lib/types';

export default function PlanosPage() {
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    const storedResult = localStorage.getItem('quizResult');
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
  }, []);

  const plans = [
    {
      name: 'Mensal',
      price: 'R$ 31,90',
      period: '/mês',
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Acesso completo ao protocolo personalizado',
        'Todas as técnicas de foco',
        'Sons e meditações guiadas',
        'Gamificação e desafios',
        'Estatísticas detalhadas',
        'Suporte prioritário'
      ],
      popular: false
    },
    {
      name: 'Trimestral',
      price: 'R$ 25,90',
      period: '/mês',
      icon: Crown,
      color: 'from-purple-500 to-pink-500',
      features: [
        'Tudo do plano mensal',
        'Economia de 19%',
        'Protocolo adaptativo',
        'Novos recursos em primeira mão',
        'Comunidade exclusiva',
        'Sessões de coaching mensais'
      ],
      popular: true,
      badge: 'Mais Popular'
    },
    {
      name: 'Anual',
      price: 'R$ 19,90',
      period: '/mês',
      icon: Sparkles,
      color: 'from-orange-500 to-red-500',
      features: [
        'Tudo do plano trimestral',
        'Economia de 38%',
        'Acesso vitalício a atualizações',
        'Protocolo premium personalizado',
        'Mentoria individual mensal',
        'Certificado de conclusão'
      ],
      popular: false,
      badge: 'Melhor Custo-Benefício'
    }
  ];

  const handleSubscribe = (planName: string, price: string) => {
    // Integração com Kirvano - substituir com URL real
    const kirvanoCheckoutUrl = `https://pay.kirvano.com/mindfix?plan=${planName.toLowerCase()}&price=${price}`;
    window.open(kirvanoCheckoutUrl, '_blank');
  };

  return (
    <div className="min-h-screen gradient-hero p-4 py-12">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Brain className="w-8 h-8 text-primary" />
            <span className="font-bold text-2xl">MindFix</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Escolha Seu Plano
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Desbloqueie todo o potencial do seu protocolo personalizado
          </p>
        </motion.div>

        {/* Protocol Summary */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <Card className="p-6 glass max-w-3xl mx-auto">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Seu Protocolo: {result.protocolName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {result.description}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="relative"
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-xs font-semibold text-white shadow-lg">
                    {plan.badge}
                  </div>
                </div>
              )}
              
              <Card
                className={`p-8 glass h-full flex flex-col ${
                  plan.popular
                    ? 'border-primary shadow-2xl shadow-primary/20 scale-105'
                    : ''
                }`}
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  {plan.name !== 'Mensal' && (
                    <p className="text-sm text-primary mt-1">
                      {plan.name === 'Trimestral' ? 'Economize 19%' : 'Economize 38%'}
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  size="lg"
                  className={`w-full ${
                    plan.popular
                      ? 'gradient-primary'
                      : 'bg-card hover:bg-card/80 border border-border'
                  }`}
                  onClick={() => handleSubscribe(plan.name, plan.price)}
                >
                  Assinar Agora
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Card className="p-8 glass max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-semibold text-lg mb-2">
                  Garantia de 7 dias
                </h3>
                <p className="text-muted-foreground">
                  Experimente sem riscos. Se não gostar, devolvemos 100% do seu dinheiro.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12 text-sm text-muted-foreground"
        >
          <p>
            Ao assinar, você concorda com nossos{' '}
            <Link href="/termos" className="text-primary hover:underline">
              termos de uso
            </Link>{' '}
            e{' '}
            <Link href="/privacidade" className="text-primary hover:underline">
              política de privacidade
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
