import * as React from "react"
import {Alert} from "../components"
import {usePlantQuery, useDeleteMutation} from "../graphql/types"

export function PlantDetails({
  history,
  match,
}: {
  history: any
  match: any
}): JSX.Element {
  const {data, loading, error} = usePlantQuery({
    variables: {id: match.params.id},
  })
  const [deletePlant] = useDeleteMutation()
  const [alertOpen, setAlertOpen] = React.useState(false)

  function openAlert(): void {
    setAlertOpen(true)
  }

  async function submitDeletePlant(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault()

    await deletePlant({
      variables: {id: data?.plant?.id as string},
    })

    history.push("/")
  }

  return (
    <>
      {loading ? (
        <p>{"Loading..."}</p>
      ) : error ? (
        <p>{"ERROR"}</p>
      ) : (
        <>
          <section>
            <h1 className="page-title">{data?.plant?.name}</h1>
          </section>
          <section className="mb-12">
            <h5 className="data-title">{"Other Names:"}</h5>
            <p className="data-body">
              {data?.plant?.other_names || "No data yet"}
            </p>
            <h5 className="data-title">{"Description:"}</h5>
            <p className="data-body">
              {data?.plant?.description || "No data yet"}
            </p>
            <h5 className="data-title">{"Plant Season:"}</h5>
            <p className="data-body">
              {data?.plant?.plant_season || "No data yet"}
            </p>
            <h5 className="data-title">{"Harvest Season:"}</h5>
            <p className="data-body">
              {data?.plant?.harvest_season || "No data yet"}
            </p>
            <h5 className="data-title">{"Prune Season:"}</h5>
            <p className="data-body">
              {data?.plant?.prune_season || "No data yet"}
            </p>
            <h5 className="data-title">{"Tips:"}</h5>
            <p className="data-body">{data?.plant?.tips || "No data yet"}</p>
          </section>
          <div className="flex justify-center">
            <button
              className="button button-danger"
              type="button"
              onClick={openAlert}
            >
              {"Delete plant"}
            </button>
          </div>
          {alertOpen ? (
            <Alert {...{deletePlant: submitDeletePlant, setAlertOpen}} />
          ) : null}
        </>
      )}
    </>
  )
}