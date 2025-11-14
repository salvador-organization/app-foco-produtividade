                  <Button 
                    className={`w-full ${plan.popular ? 'gradient-primary' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                    onClick={() => handleSubscribe(plan.id)}
                  >
                    Assinar Agora
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>