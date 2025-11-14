'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Target, Zap, Award, TrendingUp, LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getCurrentUser, signOut } from '@/lib/supabase';
import { toast } from 'sonner';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Logout realizado com sucesso');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-xl z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" />
              <span className="font-bold text-xl">MindFix</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-2">
            Bem-vindo de volta! 👋
          </h1>
          <p className="text-muted-foreground">
            Pronto para mais um dia de foco intenso?
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Target, label: 'Foco Hoje', value: '0h 0m', color: 'text-primary' },
            { icon: Zap, label: 'Sequência', value: '0 dias', color: 'text-accent' },
            { icon: Award, label: 'Pontos', value: '0', color: 'text-chart-4' },
            { icon: TrendingUp, label: 'Nível', value: '1', color: 'text-chart-2' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-6 glass hover:scale-105 transition-all">
                <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Featured Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Quick Start */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8 glass">
              <h2 className="text-2xl font-bold mb-4">Comece Agora</h2>
              <p className="text-muted-foreground mb-6">
                Escolha uma técnica e comece sua sessão de foco
              </p>
              <div className="space-y-3">
                <Button className="w-full gradient-primary justify-start" size="lg">
                  <Target className="w-5 h-5 mr-2" />
                  Pomodoro MindFix (25 min)
                </Button>
                <Button variant="outline" className="w-full justify-start" size="lg">
                  <Brain className="w-5 h-5 mr-2" />
                  Meditação Rápida (5 min)
                </Button>
                <Button variant="outline" className="w-full justify-start" size="lg">
                  <Zap className="w-5 h-5 mr-2" />
                  HyperFocus Mode (60 min)
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Daily Challenge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-8 glass">
              <h2 className="text-2xl font-bold mb-4">Desafio do Dia</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">Foco de 25 minutos</h3>
                    <span className="text-sm text-primary">+50 pontos</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Complete uma sessão de Pomodoro sem distrações
                  </p>
                  <Button className="w-full gradient-primary">
                    Aceitar Desafio
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-card/50 border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-muted-foreground">Meditação Matinal</h3>
                    <span className="text-sm text-muted-foreground">+30 pontos</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Faça uma meditação de 5 minutos
                  </p>
                  <Button variant="outline" className="w-full">
                    Ver Desafio
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Recommended Techniques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6">Recomendado para Você</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Brown Noise', desc: 'Som de concentração profunda', duration: '30 min' },
              { title: 'Respiração 4-7-8', desc: 'Técnica anti-ansiedade', duration: '5 min' },
              { title: 'DeepFlow Session', desc: 'Foco intenso e prolongado', duration: '90 min' }
            ].map((item, i) => (
              <Card key={i} className="p-6 glass hover:scale-105 transition-all cursor-pointer">
                <div className="w-full h-32 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 mb-4" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item.duration}</span>
                  <Button size="sm" variant="ghost">
                    Iniciar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/80 backdrop-blur-xl md:hidden">
          <div className="flex items-center justify-around p-4">
            <Button variant="ghost" size="sm">
              <Brain className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Target className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Award className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
