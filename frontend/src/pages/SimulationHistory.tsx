import {
  useEffect,
  useState,
} from 'react'

import {
  useNavigate,
} from 'react-router-dom'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Button,
} from '@/components/ui/button'

import {
  supabase,
} from '@/lib/supabase'

import {
  useAuth,
} from '@/context/AuthContext'

export default function
SimulationHistory() {

  const navigate =
    useNavigate()

  const { user } =
    useAuth()

  const [
    history,
    setHistory,
  ] =
    useState<any[]>(
      []
    )

  const [
    loading,
    setLoading,
  ] =
    useState(
      true
    )

  // -----------------------------
  // FETCH CLOUD HISTORY
  // -----------------------------
  useEffect(() => {

    const fetchHistory =
      async () => {

        if (!user)
          return

        try {

          const {
            data,
            error,
          } =
            await supabase
              .from(
                'simulations'
              )
              .select('*')
              .eq(
                'user_id',
                user.id
              )
              .order(
                'created_at',
                {
                  ascending:
                    false,
                }
              )

          if (error)
            throw error

          setHistory(
            data || []
          )
        }

        catch (
          error
        ) {

          console.error(
            'History fetch failed:',
            error
          )
        }

        finally {

          setLoading(
            false
          )
        }
      }

    fetchHistory()

  }, [user])

  // -----------------------------
  // DELETE SIMULATION
  // -----------------------------
  const deleteSimulation =
    async (
      id: string
    ) => {

      try {

        const {
          error,
        } =
          await supabase
            .from(
              'simulations'
            )
            .delete()
            .eq(
              'id',
              id
            )

        if (error)
          throw error

        setHistory(
          history.filter(
            (
              item
            ) =>
              item.id !==
              id
          )
        )
      }

      catch (
        error
      ) {

        console.error(
          error
        )

        alert(
          'Failed to delete simulation.'
        )
      }
    }

  // -----------------------------
  // OPEN RESULTS
  // -----------------------------
  const openSimulation =
  (
    item: any
  ) => {

    navigate(
      `/app/simulation-results/${item.id}`
    )
  }

    return (
      <div className="space-y-6 p-6">
  
        {/* Header */}
        <div>
  
          <h1 className="text-4xl font-bold">
            Simulation History
          </h1>
  
          <p className="text-muted-foreground">
            View your previous
            cloud-based product
            launch simulations.
          </p>
  
        </div>
  
        {/* Loading */}
        {loading ? (
  
          <Card>
  
            <CardContent className="flex h-[250px] items-center justify-center">
  
              <div className="text-center">
  
                <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
  
                <p className="text-muted-foreground">
                  Loading simulations...
                </p>
  
              </div>
  
            </CardContent>
  
          </Card>
  
        ) : (
  
          <div className="grid gap-6">
  
            {history.length > 0 ? (
  
              history.map(
                (item) => (
  
                  <Card
                    key={item.id}
                    className="transition hover:border-cyan-500/30"
                  >
  
                    <CardHeader>
  
                      <div className="flex items-center justify-between">
  
                        <div>
  
                          <CardTitle className="text-xl">
  
                            {
                              item.product_name
                            }
  
                          </CardTitle>
  
                          <p className="mt-1 text-sm text-muted-foreground">
  
                            {
                              item.created_at
                                ? new Date(
                                    item.created_at
                                  ).toLocaleString()
                                : 'No date'
                            }
  
                          </p>
  
                        </div>
  
                        <div className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">
  
                          {
                            item.market_sentiment
                          }
  
                        </div>
  
                      </div>
  
                    </CardHeader>
  
                    <CardContent>
  
                      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
  
                        {/* Audience */}
                        <div>
  
                          <p className="text-sm text-muted-foreground">
                            Audience
                          </p>
  
                          <p className="font-medium">
                            {
                              item.audience ||
                              'N/A'
                            }
                          </p>
  
                        </div>
  
                        {/* Price */}
                        <div>
  
                          <p className="text-sm text-muted-foreground">
                            Price
                          </p>
  
                          <p className="font-medium">
                            {
                              item.price ||
                              'N/A'
                            }
                          </p>
  
                        </div>
  
                        {/* Launch Score */}
                        <div>
  
                          <p className="text-sm text-muted-foreground">
                            Launch Score
                          </p>
  
                          <p className="font-bold text-green-500">
  
                            {
                              item.launch_score
                            }
                            /100
  
                          </p>
  
                        </div>
  
                        {/* Risk Score */}
                        <div>
  
                          <p className="text-sm text-muted-foreground">
                            Risk Score
                          </p>
  
                          <p className="font-bold text-orange-500">
  
                            {
                              item.risk_score
                            }
                            %
  
                          </p>
  
                        </div>
  
                      </div>
  
                      {/* Action Buttons */}
                      <div className="mt-6 flex flex-wrap gap-3">
  
                        <Button
                          onClick={() =>
                            openSimulation(
                              item
                            )
                          }
                        >
                          View Results
                        </Button>
  
                        <Button
                          variant="secondary"
                          onClick={() =>
                            navigate(
                              '/app/compare'
                            )
                          }
                        >
                          Compare
                        </Button>
  
                        <Button
                          variant="destructive"
                          onClick={() =>
                            deleteSimulation(
                              item.id
                            )
                          }
                        >
                          Delete
                        </Button>
  
                      </div>
  
                    </CardContent>
  
                  </Card>
                )
              )
  
            ) : (
  
              <Card>
  
                <CardContent className="flex h-[250px] items-center justify-center">
  
                  <div className="text-center">
  
                    <h2 className="text-2xl font-semibold">
                      No simulations found
                    </h2>
  
                    <p className="mt-2 text-muted-foreground">
                      Run your first
                      simulation to start
                      building cloud history.
                    </p>
  
                  </div>
  
                </CardContent>
  
              </Card>
            )}
  
          </div>
        )}
  
      </div>
    )
  }