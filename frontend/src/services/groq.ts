import Groq from 'groq-sdk'

const apiKey = import.meta.env.VITE_GROQ_API_KEY

if (!apiKey) {
  console.warn('VITE_GROQ_API_KEY is not set')
}

const groq = new Groq({
  apiKey: apiKey || '',
  dangerouslyAllowBrowser: true,
})

export async function
generateLaunchInsights(
  simulationInput: any
) {

  try {

    const prompt =
`
You are a senior management consultant, product launch strategist, and market intelligence expert.

Analyze this product launch idea realistically like McKinsey, Bain, BCG, or a Fortune 500 strategy consultant.

PRODUCT DETAILS:

Product Name:
${simulationInput.productName}

Category:
${simulationInput.category}

Industry:
${simulationInput.industry}

Target Audience:
${simulationInput.targetAudience}

Price:
${simulationInput.price}

Market Region:
${simulationInput.marketRegion}

Features:
${simulationInput.productFeatures}

Competitors:
${simulationInput.competitors}

Launch Goal:
${simulationInput.launchGoal}

Return ONLY valid JSON.

FORMAT:

{
  "purchaseLikelihood": number,
  "riskScore": number,
  "sentiment": "Positive | Mixed | Negative",
  "confidence": "High | Medium | Low",

  "executiveSummary":
    "2-4 sentence strategic summary",

  "strategicInsights": [
    "insight 1",
    "insight 2",
    "insight 3"
  ],

  "marketRisks": [
    "risk 1",
    "risk 2"
  ],

  "pricingStrategy":
    "pricing recommendation",

  "competitivePositioning":
    "how product should position",

  "goToMarketStrategy":
    "launch recommendation",

  "recommendations": [
    "recommendation 1",
    "recommendation 2",
    "recommendation 3"
  ]
}

STRICT RULES:
- RETURN ONLY VALID JSON
- DO NOT use markdown
- DO NOT write explanations
- ALL arrays MUST have commas
- realistic business reasoning
- product-specific analysis
- region-specific analysis
- competitor-aware insights
- purchaseLikelihood between 1-100
- riskScore between 1-100
- concise premium consulting-quality output
`

    const completion =
      await groq.chat
        .completions
        .create({

          model:
            'llama-3.3-70b-versatile',

          temperature:
            0.4,

          messages: [

            {
              role:
                'user',

              content:
                prompt,
            },
          ],
        })

    const text =
      completion
        .choices?.[0]
        ?.message
        ?.content || ''

    console.log(
      'GROQ RAW RESPONSE:',
      text
    )

    // -----------------------------
    // CLEAN RESPONSE
    // -----------------------------
    const cleanedText =
      text

        .replace(
          /```json/g,
          ''
        )

        .replace(
          /```/g,
          ''

        )

        .trim()

    // -----------------------------
    // TRY NORMAL JSON
    // -----------------------------
    try {

      const parsed =
        JSON.parse(
          cleanedText
        )

      return {

        purchaseLikelihood:
          parsed.purchaseLikelihood ??
          50,

        riskScore:
          parsed.riskScore ??
          50,

        sentiment:
          parsed.sentiment ??
          'Mixed',

        confidence:
          parsed.confidence ??
          'Medium',

        executiveSummary:
          parsed.executiveSummary ??
          'AI summary unavailable.',

        strategicInsights:
          parsed.strategicInsights ??
          [],

        marketRisks:
          parsed.marketRisks ??
          [],

        pricingStrategy:
          parsed.pricingStrategy ??
          'No pricing strategy generated.',

        competitivePositioning:
          parsed.competitivePositioning ??
          'No positioning advice generated.',

        goToMarketStrategy:
          parsed.goToMarketStrategy ??
          'No GTM strategy generated.',

        recommendations:
          parsed.recommendations ??
          [],
      }
    }

    catch (
      parseError
    ) {

      console.error(
        'JSON Parse Failed:',
        parseError
      )

      console.log(
        'BROKEN JSON:',
        cleanedText
      )

      // -----------------------------
      // AUTO FIX COMMON GROQ ISSUES
      // -----------------------------
      const repairedText =
        cleanedText

          // missing commas
          .replace(
            /"\s*\n\s*"/g,
            '",\n"'
          )

          // trailing commas
          .replace(
            /,\s*}/g,
            '}'
          )

          .replace(
            /,\s*]/g,
            ']'
          )

      console.log(
        'REPAIRED JSON:',
        repairedText
      )

      try {

        const repaired =
          JSON.parse(
            repairedText
          )

        return {

          purchaseLikelihood:
            repaired.purchaseLikelihood ??
            50,

          riskScore:
            repaired.riskScore ??
            50,

          sentiment:
            repaired.sentiment ??
            'Mixed',

          confidence:
            repaired.confidence ??
            'Medium',

          executiveSummary:
            repaired.executiveSummary ??
            'AI summary unavailable.',

          strategicInsights:
            repaired.strategicInsights ??
            [],

          marketRisks:
            repaired.marketRisks ??
            [],

          pricingStrategy:
            repaired.pricingStrategy ??
            'No pricing strategy generated.',

          competitivePositioning:
            repaired.competitivePositioning ??
            'No positioning advice generated.',

          goToMarketStrategy:
            repaired.goToMarketStrategy ??
            'No GTM strategy generated.',

          recommendations:
            repaired.recommendations ??
            [],
        }
      }

      catch (
        repairError
      ) {

        console.error(
          'Repair Failed:',
          repairError
        )

        return null
      }
    }
  }

  catch (
    error
  ) {

    console.error(
      'Groq AI failed:',
      error
    )

    return null
  }
}
