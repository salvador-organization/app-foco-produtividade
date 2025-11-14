// Quiz Types
export interface QuizAnswer {
  questionId: number;
  answer: string | string[];
}

export interface QuizResult {
  protocol: 'HyperFocus' | 'CalmFix' | 'DeepFlow' | 'DopamineBoost';
  protocolName: string;
  description: string;
  features: string[];
  techniques: string[];
  frequency: string;
  intensity: string;
  duration: string;
  weeklyGoals: string[];
}

export const questions = [
  {
    id: 1,
    question: 'Qual é a sua maior dificuldade hoje?',
    type: 'multiple',
    options: [
      'Me distraio com qualquer coisa',
      'Começo, mas não termino',
      'Não consigo iniciar tarefas',
      'Fico ansioso(a) e travo',
      'Não consigo manter foco por muito tempo',
      'Minha mente fica acelerada demais',
      'Outro'
    ]
  },
  {
    id: 2,
    question: 'Em qual momento do dia você mais perde o foco?',
    type: 'single',
    options: [
      'Manhã',
      'Tarde',
      'Noite',
      'Todos os horários',
      'Varia muito'
    ]
  },
  {
    id: 3,
    question: 'Onde você geralmente tenta focar?',
    type: 'single',
    options: [
      'No trabalho/escritório',
      'Estudando em casa',
      'No quarto',
      'Em locais movimentados',
      'Biblioteca / coworking',
      'Outro'
    ]
  },
  {
    id: 4,
    question: 'O que mais causa sua distração?',
    type: 'single',
    options: [
      'Celular',
      'Pensamentos aleatórios',
      'Notificações',
      'Ruídos',
      'Falta de energia/motivação',
      'Ansiedade',
      'Redes sociais',
      'Tudo isso'
    ]
  },
  {
    id: 5,
    question: 'Com que frequência você sente que sua mente está "pulando de uma coisa para outra"?',
    type: 'single',
    options: [
      'O tempo todo',
      'Muitas vezes',
      'Às vezes',
      'Raramente'
    ]
  },
  {
    id: 6,
    question: 'Quando você tenta focar, o que mais te atrapalha emocionalmente?',
    type: 'single',
    options: [
      'Ansiedade',
      'Tédio',
      'Falta de motivação',
      'Impulsividade',
      'Preguiça mental',
      'Estresse'
    ]
  },
  {
    id: 7,
    question: 'Você prefere técnicas de...',
    type: 'single',
    options: [
      'Som/ambiente',
      'Meditação guiada',
      'Tarefas divididas em partes',
      'Técnicas rápidas',
      'Exercícios cognitivos',
      'Não sei, quero que o app escolha para mim'
    ]
  },
  {
    id: 8,
    question: 'Qual é o seu estilo de aprendizado?',
    type: 'single',
    options: [
      'Visual',
      'Auditivo',
      'Cinestésico (aprendo fazendo)',
      'Leitura e escrita',
      'Não sei'
    ]
  },
  {
    id: 9,
    question: 'Qual é seu principal objetivo usando o MindFix?',
    type: 'single',
    options: [
      'Focar mais no trabalho',
      'Fazer tarefas domésticas',
      'Estudar melhor',
      'Controlar ansiedade',
      'Controlar impulsividade',
      'Parar de procrastinar',
      'Melhorar minha vida como um todo'
    ]
  },
  {
    id: 10,
    question: 'Por quanto tempo você consegue focar hoje?',
    type: 'single',
    options: [
      'Menos de 5 minutos',
      'Entre 5 e 15 minutos',
      '25 minutos (mais ou menos um pomodoro)',
      'Mais de 1 hora',
      'Depende muito'
    ]
  },
  {
    id: 11,
    question: 'Com qual dessas frases você mais se identifica?',
    type: 'single',
    options: [
      'Quero foco rápido agora.',
      'Quero construir disciplina com o tempo.',
      'Quero reduzir ansiedade para conseguir focar.',
      'Quero parar de perder tempo com distrações.',
      'Quero transformar minha rotina.'
    ]
  }
];

export function calculateProtocol(answers: QuizAnswer[]): QuizResult {
  // Análise das respostas para determinar o protocolo
  const answer1 = answers[0]?.answer;
  const answer4 = answers[3]?.answer;
  const answer5 = answers[4]?.answer;
  const answer6 = answers[5]?.answer;
  const answer10 = answers[9]?.answer;
  const answer11 = answers[10]?.answer;

  // HyperFocus Mode: distração rápida + impulsividade + pouco foco
  if (
    (Array.isArray(answer1) && answer1.includes('Me distraio com qualquer coisa')) ||
    answer4 === 'Tudo isso' ||
    answer5 === 'O tempo todo' ||
    answer10 === 'Menos de 5 minutos' ||
    answer10 === 'Entre 5 e 15 minutos'
  ) {
    return {
      protocol: 'HyperFocus',
      protocolName: 'HyperFocus Mode',
      description: 'Perfeito para quem se distrai facilmente e precisa de sessões curtas e intensas',
      features: [
        'Sessões curtas e rápidas',
        'Sons focais específicos',
        'Pomodoro adaptado',
        'Desafios diários gamificados',
        'Modo anti-distração ativado',
        'Técnica de respiração pré-sessão'
      ],
      techniques: ['Pomodoro 15min', 'Brown Noise', 'Bloqueio de apps', 'Micro-recompensas'],
      frequency: '6-8 sessões por dia',
      intensity: 'Alta',
      duration: '15-25 minutos por sessão',
      weeklyGoals: [
        'Completar 30 sessões de foco',
        'Reduzir distrações em 40%',
        'Aumentar tempo de foco gradualmente'
      ]
    };
  }

  // CalmFix: ansiedade + mente acelerada
  if (
    answer6 === 'Ansiedade' ||
    answer6 === 'Estresse' ||
    (Array.isArray(answer1) && answer1.includes('Fico ansioso(a) e travo')) ||
    (Array.isArray(answer1) && answer1.includes('Minha mente fica acelerada demais')) ||
    answer11 === 'Quero reduzir ansiedade para conseguir focar.'
  ) {
    return {
      protocol: 'CalmFix',
      protocolName: 'CalmFix',
      description: 'Ideal para quem precisa acalmar a mente antes de focar',
      features: [
        'Meditação guiada de 3 minutos',
        'Sons calmantes',
        'Técnicas anti-estresse',
        'Blocos de foco mais longos',
        'Notificações de pausa consciente'
      ],
      techniques: ['Respiração 4-7-8', 'Meditação guiada', 'White noise', 'Mindfulness'],
      frequency: '3-4 sessões por dia',
      intensity: 'Moderada',
      duration: '30-45 minutos por sessão',
      weeklyGoals: [
        'Praticar meditação diariamente',
        'Reduzir ansiedade em 50%',
        'Aumentar clareza mental'
      ]
    };
  }

  // DeepFlow: foco longo + ambiente calmo
  if (
    answer10 === 'Mais de 1 hora' ||
    answer11 === 'Quero construir disciplina com o tempo.' ||
    answer6 === 'Preguiça mental'
  ) {
    return {
      protocol: 'DeepFlow',
      protocolName: 'DeepFlow',
      description: 'Para trabalho profundo e sessões prolongadas de alta concentração',
      features: [
        'Sessões maiores (45-60 min)',
        'Sons contínuos',
        'Ancoragem mental',
        'Tarefa profunda personalizada'
      ],
      techniques: ['Deep Work', 'Binaural beats', 'Flow state music', 'Time blocking'],
      frequency: '2-3 sessões por dia',
      intensity: 'Muito alta',
      duration: '60-90 minutos por sessão',
      weeklyGoals: [
        'Completar 10 sessões de deep work',
        'Aumentar produtividade em 60%',
        'Dominar estado de flow'
      ]
    };
  }

  // DopamineBoost: falta de motivação + tédio
  return {
    protocol: 'DopamineBoost',
    protocolName: 'Dopamine Boost Routine',
    description: 'Gamificação e recompensas para manter a motivação alta',
    features: [
      'Microtarefas',
      'Desafios de 2 minutos',
      'Gamificação forte',
      'Músicas estimulantes'
    ],
    techniques: ['Micro-tarefas', 'Recompensas imediatas', 'Música energética', 'Desafios diários'],
    frequency: '8-10 sessões por dia',
    intensity: 'Variável',
    duration: '5-15 minutos por sessão',
    weeklyGoals: [
      'Completar 50 micro-tarefas',
      'Ganhar 1000 pontos',
      'Manter streak de 7 dias'
    ]
  };
}
