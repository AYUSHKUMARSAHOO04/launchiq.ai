import {
  generateLaunchInsights,
} from '@/services/groq'

type SimulationResult = {

  purchaseLikelihood:
    number

  riskScore:
    number

  sentiment:
    string

  confidence:
    string

  executiveSummary:
    string

  strategicInsights:
    string[]

  marketRisks:
    string[]

  pricingStrategy:
    string

  competitivePositioning:
    string

  goToMarketStrategy:
    string

  recommendations:
    string[]
}

export async function
runSimulation(
  simulationInput: any
): Promise<SimulationResult> {

  try {

    const aiResult =
      await generateLaunchInsights(
        simulationInput
      )

    console.log(
      'FINAL AI OBJECT:',
      aiResult
    )

    if (!aiResult) {

      throw new Error(
        'No AI response received'
      )
    }

    return {

      purchaseLikelihood:
        aiResult
          .purchaseLikelihood ?? 50,

      riskScore:
        aiResult
          .riskScore ?? 50,

      sentiment:
        aiResult
          .sentiment ?? 'Mixed',

      confidence:
        aiResult
          .confidence ?? 'Medium',

      executiveSummary:
        aiResult
          .executiveSummary ??
        'No executive summary generated.',

      strategicInsights:
        aiResult
          .strategicInsights ?? [],

      marketRisks:
        aiResult
          .marketRisks ?? [],

      pricingStrategy:
        aiResult
          .pricingStrategy ??
        'No pricing strategy available.',

      competitivePositioning:
        aiResult
          .competitivePositioning ??
        'No positioning guidance available.',

      goToMarketStrategy:
        aiResult
          .goToMarketStrategy ??
        'No GTM strategy available.',

      recommendations:
        aiResult
          .recommendations ?? [],
    }
  }

  catch (
    error
  ) {

    console.error(
      'Simulation failed:',
      error
    )

    return {

      purchaseLikelihood:
        50,

      riskScore:
        50,

      sentiment:
        'Mixed',

      confidence:
        'Low',

      executiveSummary:
        'Simulation failed to generate insights.',

      strategicInsights:
        [],

      marketRisks:
        [],

      pricingStrategy:
        'No pricing strategy available.',

      competitivePositioning:
        'No positioning guidance available.',

      goToMarketStrategy:
        'No GTM strategy available.',

      recommendations:
        [
          'Please try again.',
        ],
    }
  }
}