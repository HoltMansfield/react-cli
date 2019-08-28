/* eslint react-hooks/exhaustive-deps: "off" */
import React, { useEffect, useState } from 'react'
import { useToaster } from 'hooks/core/use-toaster/useToaster'
import { RouteLoading } from 'components/core/routing/route-loading/RouteLoading'
import { use<%= collectionNamePascalCase %> } from 'hooks/core/firebase/collections/use-<%= collectionNameSnakeCase %>/use<%= collectionNamePascalCase %>'
import { <%= collectionNameSingularPascalCase %>Details } from './<%= collectionNameSingularPascalCase %>Details'


export function FetchAndRender<%= collectionNameSingularPascalCase %>Details ({ <%= collectionNameSingular %>Id }) {
  const [<%= collectionNameSingular %>, set<%= collectionNameSingularPascalCase %>] = useState(null)
  const { error } = useToaster()
  const <%= collectionName %> = use<%= collectionNamePascalCase %>()

  const load<%= collectionNameSingularPascalCase %> = async () => {
    const result = await <%= collectionName %>.get(<%= collectionNameSingular %>Id)

    if (result) {
      set<%= collectionNameSingularPascalCase %>(result)
    } else {
      error(`<%= collectionNameSingularPascalCase %> not found`)
      // empty object to stop the spinner from spinning
      set<%= collectionNameSingularPascalCase %>({})
    }
  }

  useEffect(() => {
    load<%= collectionNameSingularPascalCase %>()
  }, [])

  if (!<%= collectionNameSingular %>) {
    return <RouteLoading/>
  }

  return (
    <<%= collectionNameSingularPascalCase %>Details <%= collectionNameSingular %>={<%= collectionNameSingular %>} />
  )
}
